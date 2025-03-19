import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, leads } from "@shared/schema";
import fetch from "node-fetch";
import { setupAuth } from "./auth";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Type for structured error responses
interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

// Custom error class for API errors
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Strict type checking for reCAPTCHA response
interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecret) {
    console.error("Missing RECAPTCHA_SECRET_KEY environment variable");
    throw new ApiError("reCAPTCHA configuration error", 500, "RECAPTCHA_CONFIG_ERROR");
  }

  try {
    console.log("Verifying reCAPTCHA token...", { tokenLength: token?.length });
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
    const params = new URLSearchParams({
      secret: recaptchaSecret,
      response: token
    });

    const response = await fetch(verificationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      console.error("reCAPTCHA API error:", response.status, await response.text());
      throw new ApiError("reCAPTCHA verification API error", 500, "RECAPTCHA_API_ERROR");
    }

    const data = await response.json() as RecaptchaResponse;
    console.log("reCAPTCHA verification response:", {
      success: data.success,
      hostname: data.hostname,
      errorCodes: data["error-codes"]
    });

    if (!data.success) {
      console.error("reCAPTCHA verification failed:", data["error-codes"]);
      throw new ApiError(
        "reCAPTCHA verification failed",
        400,
        "RECAPTCHA_VERIFICATION_FAILED",
        data["error-codes"]
      );
    }

    return data.success;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError("Failed to verify reCAPTCHA", 500, "RECAPTCHA_ERROR");
  }
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

// Error handling middleware
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      code: err.code,
      details: err.details,
    });
  }

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message: "Validation error",
      code: "VALIDATION_ERROR",
      details: err.errors,
    });
  }

  // Don't expose internal errors to client
  res.status(500).json({
    message: "Internal server error",
    code: "INTERNAL_ERROR",
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Security middleware with updated CSP
  app.use(helmet({
    contentSecurityPolicy: false, // We'll use the main CSP config from index.ts
  }));

  // Rate limiting for public endpoints
  const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later" }
  });

  // Rate limiting for admin endpoints
  const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later" }
  });

  // Set up authentication
  setupAuth(app);

  // Public routes with rate limiting
  app.post("/api/leads", publicLimiter, async (req, res, next) => {
    try {
      const { captchaToken, ...leadData } = req.body;

      // Validate lead data
      const validatedData = insertLeadSchema.parse(leadData);

      // Verify reCAPTCHA
      if (!captchaToken) {
        throw new ApiError("reCAPTCHA token is required", 400, "MISSING_CAPTCHA");
      }

      const isValidCaptcha = await verifyRecaptcha(captchaToken);
      if (!isValidCaptcha) {
        throw new ApiError("Invalid reCAPTCHA", 400, "INVALID_CAPTCHA");
      }

      // Store lead
      const lead = await storage.createLead(validatedData);
      res.json(lead);
    } catch (error) {
      next(error);
    }
  });

  // Protected routes (admin only) with rate limiting
  app.get("/api/admin/leads", requireAuth, adminLimiter, async (req, res, next) => {
    try {
      console.log("Fetching leads for authenticated user:", req.user);
      const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
      console.log(`Found ${allLeads.length} leads`);
      res.json(allLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      next(error);
    }
  });

  // Add delete endpoint with proper validation
  app.delete("/api/admin/leads/:id", requireAuth, adminLimiter, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new ApiError("Invalid ID", 400, "INVALID_ID");
      }

      const [deletedLead] = await db.delete(leads)
        .where(eq(leads.id, id))
        .returning();

      if (!deletedLead) {
        throw new ApiError("Lead not found", 404, "NOT_FOUND");
      }

      console.log(`Deleted lead with ID: ${id}`);
      res.json(deletedLead);
    } catch (error) {
      console.error("Error deleting lead:", error);
      next(error);
    }
  });

  // Register error handler
  app.use(errorHandler);

  const httpServer = createServer(app);
  return httpServer;
}