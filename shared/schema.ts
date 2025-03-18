import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Leads table (existing)
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  investmentRange: text("investment_range"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema for user insertion
export const insertUserSchema = createInsertSchema(users)
  .extend({
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
  });

// Schema for lead insertion (existing)
export const insertLeadSchema = createInsertSchema(leads).pick({
  name: true,
  email: true,
  phone: true,
  investmentRange: true,
  message: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().nullable(),
  investmentRange: z.string().nullable(),
  message: z.string().nullable(),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;