import { 
  users, 
  leads, 
  userProfiles, 
  investmentPlans,
  type User, 
  type InsertUser, 
  type Lead, 
  type InsertLead,
  type UserProfile,
  type InsertUserProfile,
  type InvestmentPlan,
  type InsertInvestmentPlan
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // Lead management
  createLead(lead: InsertLead): Promise<Lead>;
  getLeadById(id: number): Promise<Lead | undefined>;
  getLeadByEmail(email: string): Promise<Lead | undefined>;
  markLeadAsConverted(id: number): Promise<Lead | undefined>;
  
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined>;
  
  // User profile management
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile & { userId: number }): Promise<UserProfile>;
  updateUserProfile(userId: number, profileData: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;
  
  // Investment plan management
  getInvestmentPlans(activeOnly?: boolean): Promise<InvestmentPlan[]>;
  getInvestmentPlanById(id: number): Promise<InvestmentPlan | undefined>;
  createInvestmentPlan(plan: InsertInvestmentPlan): Promise<InvestmentPlan>;
  updateInvestmentPlan(id: number, planData: Partial<InsertInvestmentPlan>): Promise<InvestmentPlan | undefined>;
  
  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  // Lead management methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    console.log("Creating new lead in database...");
    const [lead] = await db.insert(leads).values(insertLead).returning();
    console.log(`Lead created with ID: ${lead.id}`);
    return lead;
  }

  async getLeadById(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async getLeadByEmail(email: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.email, email));
    return lead;
  }

  async markLeadAsConverted(id: number): Promise<Lead | undefined> {
    const [lead] = await db
      .update(leads)
      .set({ convertedToUser: true })
      .where(eq(leads.id, id))
      .returning();
    return lead;
  }

  // User management methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  // User profile management methods
  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));
    return profile;
  }

  async createUserProfile(profile: InsertUserProfile & { userId: number }): Promise<UserProfile> {
    const [userProfile] = await db
      .insert(userProfiles)
      .values(profile)
      .returning();
    
    // Mark user's profile as completed
    await db
      .update(users)
      .set({ profileCompleted: true, updatedAt: new Date() })
      .where(eq(users.id, profile.userId));
      
    return userProfile;
  }

  async updateUserProfile(userId: number, profileData: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const [profile] = await db
      .update(userProfiles)
      .set({ ...profileData, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId))
      .returning();
    return profile;
  }

  // Investment plan management methods
  async getInvestmentPlans(activeOnly = true): Promise<InvestmentPlan[]> {
    if (activeOnly) {
      return db
        .select()
        .from(investmentPlans)
        .where(eq(investmentPlans.isActive, true));
    }
    return db.select().from(investmentPlans);
  }

  async getInvestmentPlanById(id: number): Promise<InvestmentPlan | undefined> {
    const [plan] = await db
      .select()
      .from(investmentPlans)
      .where(eq(investmentPlans.id, id));
    return plan;
  }

  async createInvestmentPlan(plan: InsertInvestmentPlan): Promise<InvestmentPlan> {
    const [investmentPlan] = await db
      .insert(investmentPlans)
      .values(plan)
      .returning();
    return investmentPlan;
  }

  async updateInvestmentPlan(id: number, planData: Partial<InsertInvestmentPlan>): Promise<InvestmentPlan | undefined> {
    const [plan] = await db
      .update(investmentPlans)
      .set({ ...planData, updatedAt: new Date() })
      .where(eq(investmentPlans.id, id))
      .returning();
    return plan;
  }
}

export const storage = new DatabaseStorage();