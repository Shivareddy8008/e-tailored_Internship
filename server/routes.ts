import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, onboardingFormSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create user (onboarding completion)
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = onboardingFormSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists" });
      }
      
      const user = await storage.createUser(validatedData);
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get user by email
  app.get("/api/users/by-email/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get dashboard stats (mock data for demo)
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = {
        teamMembers: 24,
        activeProjects: 12,
        notifications: 8
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get weekly progress data (mock data for demo)
  app.get("/api/dashboard/weekly-progress", async (req, res) => {
    try {
      const weeklyData = [
        { day: "Mon", completed: 12, planned: 15 },
        { day: "Tue", completed: 19, planned: 20 },
        { day: "Wed", completed: 8, planned: 12 },
        { day: "Thu", completed: 15, planned: 18 },
        { day: "Fri", completed: 22, planned: 25 },
        { day: "Sat", completed: 5, planned: 8 },
        { day: "Sun", completed: 3, planned: 5 }
      ];
      res.json(weeklyData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
