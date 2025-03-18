import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { z } from "zod";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  // Secure session settings with strict options
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    name: '__Host-sid', // More secure cookie name
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict', // Strengthened from 'lax'
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/',
    },
    proxy: true // Trust proxy for secure cookies behind reverse proxy
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Enhanced rate limiting
  const rateLimit = new Map<string, { count: number; resetTime: number; consecutiveFailures: number }>();
  const MAX_ATTEMPTS = 5;
  const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  const LOCKOUT_MS = 60 * 60 * 1000; // 1 hour

  function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimit.get(ip);

    if (!record || now > record.resetTime) {
      rateLimit.set(ip, { count: 1, resetTime: now + WINDOW_MS, consecutiveFailures: 0 });
      return true;
    }

    if (record.count >= MAX_ATTEMPTS || record.consecutiveFailures >= 3) {
      // Extend lockout period for multiple consecutive failures
      record.resetTime = now + LOCKOUT_MS;
      return false;
    }

    record.count++;
    return true;
  }

  function updateRateLimitSuccess(ip: string): void {
    const record = rateLimit.get(ip);
    if (record) {
      record.consecutiveFailures = 0;
    }
  }

  function updateRateLimitFailure(ip: string): void {
    const record = rateLimit.get(ip);
    if (record) {
      record.consecutiveFailures++;
    }
  }

  // Input validation schema
  const loginSchema = z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(8).max(255)
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/register", async (req: Request, res, next) => {
    try {
      const ip = req.ip || req.socket.remoteAddress || 'unknown';
      if (!checkRateLimit(ip)) {
        return res.status(429).json({ 
          message: "Too many attempts. Please try again later.",
          retryAfter: Math.ceil((rateLimit.get(ip)?.resetTime || 0 - Date.now()) / 1000)
        });
      }

      // Validate input
      const validatedInput = loginSchema.safeParse(req.body);
      if (!validatedInput.success) {
        updateRateLimitFailure(ip);
        return res.status(400).json({ 
          message: "Invalid input",
          errors: validatedInput.error.errors 
        });
      }

      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        updateRateLimitFailure(ip);
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      updateRateLimitSuccess(ip);
      req.login(user, (err) => {
        if (err) return next(err);
        // Only send necessary user data
        res.status(201).json({ id: user.id, username: user.username });
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/login", (req: Request, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        message: "Too many attempts. Please try again later.",
        retryAfter: Math.ceil((rateLimit.get(ip)?.resetTime || 0 - Date.now()) / 1000)
      });
    }

    // Validate input
    const validatedInput = loginSchema.safeParse(req.body);
    if (!validatedInput.success) {
      updateRateLimitFailure(ip);
      return res.status(400).json({ 
        message: "Invalid input",
        errors: validatedInput.error.errors 
      });
    }

    passport.authenticate("local", (err: Error | null, user: SelectUser | false, info: { message: string } | undefined) => {
      if (err) return next(err);
      if (!user) {
        updateRateLimitFailure(ip);
        return res.status(401).json({ message: info?.message || "Invalid credentials" });
      }

      updateRateLimitSuccess(ip);
      req.login(user, (err) => {
        if (err) return next(err);
        // Only send necessary user data
        res.status(200).json({ id: user.id, username: user.username });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    const sessionID = req.sessionID;
    req.logout((err) => {
      if (err) return next(err);
      // Destroy session for complete cleanup
      req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie('__Host-sid', { path: '/' });
        res.sendStatus(200);
      });
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user;
    // Only send necessary user data
    res.json({ id: user.id, username: user.username });
  });
}