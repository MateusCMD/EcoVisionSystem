import { type User, type InsertUser, type Transaction, type InsertTransaction } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByCpf(cpf: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserCredits(id: string, credits: number): Promise<User | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getUserRankings(): Promise<User[]>;
  getAllUsers(): Promise<User[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private transactions: Map<string, Transaction>;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByCpf(cpf: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.cpf === cpf,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, totalCredits: 0 };
    this.users.set(id, user);
    return user;
  }

  async updateUserCredits(id: string, credits: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, totalCredits: user.totalCredits + credits };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = { 
      id,
      userId: insertTransaction.userId,
      cans: insertTransaction.cans ?? 0,
      glass: insertTransaction.glass ?? 0,
      paper: insertTransaction.paper ?? 0,
      plastic: insertTransaction.plastic ?? 0,
      totalCredits: insertTransaction.totalCredits,
      createdAt: new Date().toISOString() 
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getUserRankings(): Promise<User[]> {
    return Array.from(this.users.values())
      .sort((a, b) => b.totalCredits - a.totalCredits)
      .slice(0, 10);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
}

export const storage = new MemStorage();
