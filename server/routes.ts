import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, leads } from "@shared/schema";
import fetch from "node-fetch";
import { setupAuth } from "./auth";
import { db } from "./db";
import { desc } from "drizzle-orm";

async function verifyRecaptcha(token: string): Promise<boolean> {
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecret) {
    throw new Error("Missing RECAPTCHA_SECRET_KEY environment variable");
  }

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
}

function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);

  // Public routes
  app.post("/api/leads", async (req, res) => {
    try {
      console.log("Received lead submission request");
      const { captchaToken, ...leadData } = req.body;

      // Validate lead data
      console.log("Validating lead data...");
      const validatedData = insertLeadSchema.parse(leadData);
      console.log("Lead data validation successful");

      // Verify reCAPTCHA
      if (!captchaToken) {
        console.log("reCAPTCHA token missing");
        return res.status(400).json({ message: "reCAPTCHA token is required" });
      }

      console.log("Verifying reCAPTCHA token...");
      const isValidCaptcha = await verifyRecaptcha(captchaToken);
      if (!isValidCaptcha) {
        console.log("Invalid reCAPTCHA token");
        return res.status(400).json({ message: "Invalid reCAPTCHA" });
      }
      console.log("reCAPTCHA verification successful");

      // Store lead
      console.log("Storing lead data...");
      const lead = await storage.createLead(validatedData);
      console.log("Lead stored successfully:", lead);

      res.json(lead);
    } catch (error) {
      console.error("Lead creation error:", error);
      res.status(400).json({ message: "Invalid lead data" });
    }
  });

  // Protected routes (admin only)
  app.get("/api/admin/leads", requireAuth, async (req, res) => {
    try {
      const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
      res.json(allLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ message: "Error fetching leads" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}