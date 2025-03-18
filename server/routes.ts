import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, leads } from "@shared/schema";
import fetch from "node-fetch";
import { setupAuth } from "./auth";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

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

async function verifyRecaptcha(token: string): Promise<boolean> {
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecret) {
    throw new ApiError("Missing RECAPTCHA_SECRET_KEY", 500, "MISSING_CONFIG");
  }

  try {
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
    const response = await fetch(verificationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${recaptchaSecret}&response=${token}`,
    });

    const data = await response.json() as { success: boolean };
    return data.success;
  } catch (error) {
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

  res.status(500).json({
    message: "Internal server error",
    code: "INTERNAL_ERROR",
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);

  // Public routes
  app.post("/api/leads", async (req, res, next) => {
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

  // Protected routes (admin only)
  app.get("/api/admin/leads", requireAuth, async (req, res, next) => {
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

  // Add delete endpoint
  app.delete("/api/admin/leads/:id", requireAuth, async (req, res, next) => {
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