import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  cpf: text("cpf").notNull().unique(),
  totalCredits: integer("total_credits").notNull().default(0),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  cans: integer("cans").notNull().default(0),
  glass: integer("glass").notNull().default(0),
  paper: integer("paper").notNull().default(0),
  plastic: integer("plastic").notNull().default(0),
  electronics: integer("electronics").notNull().default(0),
  medicines: integer("medicines").notNull().default(0),
  totalCredits: integer("total_credits").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  cpf: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  userId: true,
  cans: true,
  glass: true,
  paper: true,
  plastic: true,
  electronics: true,
  medicines: true,
  totalCredits: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
