import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  companyName: text("company_name").notNull(),
  industry: text("industry").notNull(),
  companySize: text("company_size").notNull(),
  theme: text("theme").notNull().default("light"),
  layout: text("layout").notNull().default("grid"),
  completedAt: text("completed_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  firstName: true,
  lastName: true,
  email: true,
  companyName: true,
  industry: true,
  companySize: true,
  theme: true,
  layout: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Onboarding form data schema
export const onboardingFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  theme: z.enum(["light", "dark"]).default("light"),
  layout: z.enum(["grid", "list", "compact"]).default("grid"),
});

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
