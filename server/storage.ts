import { leads, type Lead, type InsertLead } from "@shared/schema";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
}

export class MemStorage implements IStorage {
  private leads: Map<number, Lead>;
  private currentId: number;

  constructor() {
    this.leads = new Map();
    this.currentId = 1;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    console.log("Creating new lead in storage...");
    const id = this.currentId++;
    const lead: Lead = {
      ...insertLead,
      id,
      createdAt: new Date(),
    };
    this.leads.set(id, lead);
    console.log(`Lead created with ID: ${id}`);
    return lead;
  }
}

export const storage = new MemStorage();