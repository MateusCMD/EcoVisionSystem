import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTransactionSchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00"),
});

const materialsSchema = z.object({
  cans: z.number().min(0),
  glass: z.number().min(0),
  paper: z.number().min(0),
  plastic: z.number().min(0),
  electronics: z.number().min(0),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Login/Register user
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { name, cpf } = loginSchema.parse(req.body);
      
      let user = await storage.getUserByCpf(cpf);
      if (!user) {
        user = await storage.createUser({ name, cpf });
      }
      
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  });

  // Submit materials
  app.post("/api/materials/submit", async (req, res) => {
    try {
      const { userId, materials } = req.body;
      const { cans, glass, paper, plastic, electronics } = materialsSchema.parse(materials);
      
      // Calculate total credits
      const totalCredits = (cans * 1) + (glass * 2) + (paper * 1) + (plastic * 4) + (electronics * 6);
      
      if (totalCredits === 0) {
        return res.status(400).json({ message: "Adicione pelo menos um material para reciclar" });
      }

      // Create transaction
      const transaction = await storage.createTransaction({
        userId,
        cans,
        glass,
        paper,
        plastic,
        electronics,
        totalCredits,
      });

      // Update user credits
      const updatedUser = await storage.updateUserCredits(userId, totalCredits);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.json({ 
        transaction, 
        user: updatedUser,
        creditsEarned: totalCredits 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  });

  // Get user rankings
  app.get("/api/rankings", async (req, res) => {
    try {
      const rankings = await storage.getUserRankings();
      res.json(rankings);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
