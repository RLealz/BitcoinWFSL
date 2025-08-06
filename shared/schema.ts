
import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  serial,
  boolean,
  integer,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"), 
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User Profiles with additional information
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
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
  fundType: varchar("fund_type", { length: 50 }).notNull().default("crypto"),
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

// Schema for user insertion - Updated for Replit Auth
export const insertUserSchema = createInsertSchema(users)
.omit({ createdAt: true, updatedAt: true });

export const upsertUserSchema = createInsertSchema(users)
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
})
.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true, 
  convertedToUser: true 
});

// Types - Updated for Replit Auth
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertInvestmentPlan = z.infer<typeof insertInvestmentPlanSchema>;
export type InvestmentPlan = typeof investmentPlans.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const investmentPlanSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  minimumInvestment: z.string(),
  monthlyReturnRate: z.string(),
  durationMonths: z.number(),
  riskLevel: z.enum(["low", "medium", "high"]),
  fundType: z.enum(["crypto", "real-estate", "emerging-tech"]).default("crypto"),
});