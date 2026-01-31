
import { type Report, type InsertReport } from "@shared/schema";

export interface IStorage {
  createReport(report: InsertReport): Promise<Report>;
}

export class MemStorage implements IStorage {
  private reports: Map<number, Report>;
  private currentId: number;

  constructor() {
    this.reports = new Map();
    this.currentId = 1;
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = this.currentId++;
    const report: Report = { ...insertReport, id, status: "pending", createdAt: new Date() };
    this.reports.set(id, report);
    return report;
  }
}

export const storage = new MemStorage();
