import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import fetch from "node-fetch";

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

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);
  return httpServer;
}