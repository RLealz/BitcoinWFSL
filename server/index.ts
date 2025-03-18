import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { doubleCsrf } from "csrf-csrf";
import { randomBytes } from 'crypto';

const app = express();

// Basic security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.google.com/recaptcha/", "https://www.gstatic.com/"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "wss://stream.binance.com", "https://www.google.com/recaptcha/"],
      frameSrc: ["'self'", "https://www.google.com/recaptcha/"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false, // Required for reCAPTCHA
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Required for external resources
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
}));

// Additional security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Add development-specific request validation
app.use((req, res, next) => {
  // Block direct access to development server endpoints except from localhost
  if (process.env.NODE_ENV === 'development' && 
      (req.path.startsWith('/@') || req.path.startsWith('/node_modules'))) {
    const allowedIPs = ['127.0.0.1', '::1', '::ffff:127.0.0.1'];
    const clientIP = req.ip || req.connection.remoteAddress;

    if (!allowedIPs.includes(clientIP)) {
      return res.status(403).json({ message: 'Access Denied' });
    }
  }
  next();
});

// Development-only security controls
if (process.env.NODE_ENV === 'development') {
  // Add whitelist for development tools
  app.use((req, res, next) => {
    const allowedDevPaths = [
      '/node_modules',
      '/@vite',
      '/@fs',
      '/@react-refresh'
    ];

    // Only allow dev tool access from localhost
    if (allowedDevPaths.some(path => req.path.startsWith(path))) {
      const ip = req.ip || req.connection.remoteAddress;
      if (ip !== '127.0.0.1' && ip !== '::1' && ip !== '::ffff:127.0.0.1') {
        return res.status(403).send('Access Denied');
      }
    }
    next();
  });
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CSRF protection setup
const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.SESSION_SECRET || randomBytes(32).toString('hex'), // Fallback for development
  cookieName: "x-csrf-token",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
});

// Apply CSRF protection to all POST endpoints
app.use('/api', doubleCsrfProtection);

// Provide CSRF token to client
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: generateToken(req, res) });
});

// Request logging middleware with sensitive data redaction
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        // Sanitize sensitive data before logging
        const sanitizedResponse = { ...capturedJsonResponse };
        delete sanitizedResponse.password;
        delete sanitizedResponse.token;
        delete sanitizedResponse.csrfToken;
        logLine += ` :: ${JSON.stringify(sanitizedResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // For production, add a proper fallback route for the SPA
  app.use((_req: Request, res: Response) => {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile('index.html', { root: './dist/public' });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();