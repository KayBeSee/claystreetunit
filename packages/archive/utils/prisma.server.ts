import { PrismaClient } from "@prisma/client";

let ontour: PrismaClient;
declare global {
  var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  ontour = new PrismaClient();
  ontour.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  ontour = global.__db;
}

export { ontour };
