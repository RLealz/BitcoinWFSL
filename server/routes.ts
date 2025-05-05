import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertLeadSchema, 
  insertUserProfileSchema, 
  insertInvestmentPlanSchema,
  leads,
  users,
  userProfiles,
  investmentPlans 
} from "@shared/schema";
import fetch from "node-fetch";
import { setupAuth } from "./auth";
import { db } from "./db";
import { desc, eq, and } from "drizzle-orm";
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

  // Rate limiting for user endpoints
  const userLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later" }
  });

  // Set up authentication
  setupAuth(app);

  // Check if user is admin middleware
  function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    next();
  }

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

  // Public routes - Investment plans
  app.get("/api/investment-plans", publicLimiter, async (req, res, next) => {
    try {
      // Only active plans are visible to the public
      const plans = await storage.getInvestmentPlans(true);
      res.json(plans);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/investment-plans/:id", publicLimiter, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new ApiError("Invalid ID", 400, "INVALID_ID");
      }

      const plan = await storage.getInvestmentPlanById(id);
      if (!plan || !plan.isActive) {
        throw new ApiError("Investment plan not found", 404, "NOT_FOUND");
      }

      res.json(plan);
    } catch (error) {
      next(error);
    }
  });

  // User profile routes - For authenticated users
  app.get("/api/user/profile", requireAuth, userLimiter, async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const profile = await storage.getUserProfile(req.user.id);
      res.json(profile || { userId: req.user.id });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/user/profile", requireAuth, userLimiter, async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Validate profile data
      const validatedData = insertUserProfileSchema.parse(req.body);
      
      // Check if profile already exists
      const existingProfile = await storage.getUserProfile(req.user.id);
      
      let profile;
      if (existingProfile) {
        // Update existing profile
        profile = await storage.updateUserProfile(req.user.id, validatedData);
      } else {
        // Create new profile
        profile = await storage.createUserProfile({
          ...validatedData,
          userId: req.user.id
        });
        
        // Update user to mark profile as completed
        await storage.updateUser(req.user.id, { profileCompleted: true });
      }
      
      res.json(profile);
    } catch (error) {
      next(error);
    }
  });

  // Admin routes - Leads management
  app.get("/api/admin/leads", requireAuth, requireAdmin, adminLimiter, async (req, res, next) => {
    try {
      console.log("Fetching leads for admin user:", req.user);
      const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
      console.log(`Found ${allLeads.length} leads`);
      res.json(allLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      next(error);
    }
  });

  app.delete("/api/admin/leads/:id", requireAuth, requireAdmin, adminLimiter, async (req, res, next) => {
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

  // Admin routes - Investment plans management
  app.get("/api/admin/investment-plans", requireAuth, requireAdmin, adminLimiter, async (req, res, next) => {
    try {
      // Admin can see all plans including inactive ones
      const plans = await storage.getInvestmentPlans(false);
      res.json(plans);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/admin/investment-plans", requireAuth, requireAdmin, adminLimiter, async (req, res, next) => {
    try {
      // Validate plan data
      const validatedData = insertInvestmentPlanSchema.parse(req.body);
      
      // Create new plan
      const plan = await storage.createInvestmentPlan(validatedData);
      res.status(201).json(plan);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/admin/investment-plans/:id", requireAuth, requireAdmin, adminLimiter, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new ApiError("Invalid ID", 400, "INVALID_ID");
      }

      // Validate plan data
      // Allow partial updates
      const validatedData = insertInvestmentPlanSchema.partial().parse(req.body);
      
      // Update plan
      const plan = await storage.updateInvestmentPlan(id, validatedData);
      if (!plan) {
        throw new ApiError("Investment plan not found", 404, "NOT_FOUND");
      }
      
      res.json(plan);
    } catch (error) {
      next(error);
    }
  });

  // Admin routes - Users management
  app.get("/api/admin/users", requireAuth, requireAdmin, adminLimiter, async (req, res, next) => {
    try {
      const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
      console.log(`Found ${allUsers.length} users`);
      res.json(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      next(error);
    }
  });

  app.get("/api/admin/users/:id", requireAuth, requireAdmin, adminLimiter, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new ApiError("Invalid ID", 400, "INVALID_ID");
      }

      const user = await storage.getUser(id);
      if (!user) {
        throw new ApiError("User not found", 404, "NOT_FOUND");
      }

      // Get user profile if it exists
      const profile = await storage.getUserProfile(id);
      
      // Combine user and profile data
      res.json({
        ...user,
        profile
      });
    } catch (error) {
      next(error);
    }
  });

  // Register error handler
  app.use(errorHandler);

  const httpServer = createServer(app);
  return httpServer;
}