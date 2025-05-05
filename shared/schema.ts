import { pgTable, text, serial, timestamp, varchar, boolean, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication and profiles
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }),
  isAdmin: boolean("is_admin").default(false),
  profileCompleted: boolean("profile_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User Profiles with additional information
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  phone: varchar("phone", { length: 20 }),
  country: varchar("country", { length: 100 }),
  preferredLanguage: varchar("preferred_language", { length: 50 }).default("en"),
  riskTolerance: varchar("risk_tolerance", { length: 20 }),
  investmentGoals: varchar("investment_goals", { length: 255 }),
  monthlyInvestmentBudget: decimal("monthly_investment_budget", { precision: 12, scale: 2 }),
  prefersDarkMode: boolean("prefers_dark_mode").default(false),
  preferredFontSize: varchar("preferred_font_size", { length: 20 }).default("normal"),
  prefersHighContrast: boolean("prefers_high_contrast").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Investment Plans
export const investmentPlans = pgTable("investment_plans", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  minimumInvestment: decimal("minimum_investment", { precision: 12, scale: 2 }).notNull(),
  monthlyReturnRate: decimal("monthly_return_rate", { precision: 5, scale: 2 }).notNull(),
  durationMonths: integer("duration_months").notNull(),
  riskLevel: varchar("risk_level", { length: 20 }).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Leads table (existing)
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  investmentRange: text("investment_range"),
  message: text("message"),
  convertedToUser: boolean("converted_to_user").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schema for user insertion
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().optional(),
  isAdmin: z.boolean().optional(),
})
.extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
})
.omit({ createdAt: true, updatedAt: true });

// Schema for user profile insertion
export const insertUserProfileSchema = createInsertSchema(userProfiles, {
  phone: z.string().optional(),
  country: z.string().optional(),
  preferredLanguage: z.string().optional(),
  riskTolerance: z.string().optional(),
  investmentGoals: z.string().optional(),
  monthlyInvestmentBudget: z.number().optional(),
  prefersDarkMode: z.boolean().optional(),
  preferredFontSize: z.string().optional(),
  prefersHighContrast: z.boolean().optional(),
})
.omit({ createdAt: true, updatedAt: true });

// Schema for investment plan insertion
export const insertInvestmentPlanSchema = createInsertSchema(investmentPlans, {
  name: z.string().min(1, "Plan name is required"),
  description: z.string().min(1, "Plan description is required"),
  minimumInvestment: z.number().min(1, "Minimum investment must be greater than 0"),
  monthlyReturnRate: z.number().min(0, "Monthly return rate must be non-negative"),
  durationMonths: z.number().int().min(1, "Duration must be at least 1 month"),
  riskLevel: z.string().min(1, "Risk level is required"),
  isActive: z.boolean().optional(),
})
.omit({ createdAt: true, updatedAt: true });

// Schema for lead insertion (existing)
export const insertLeadSchema = createInsertSchema(leads, {
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().nullable(),
  investmentRange: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  convertedToUser: z.boolean().optional(),
})
.pick({
  name: true,
  email: true,
  phone: true,
  investmentRange: true,
  message: true,
})
.omit({ createdAt: true, updatedAt: true, convertedToUser: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertInvestmentPlan = z.infer<typeof insertInvestmentPlanSchema>;
export type InvestmentPlan = typeof investmentPlans.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;