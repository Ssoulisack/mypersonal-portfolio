import { PrismaClient } from '@prisma/client';

// Create Prisma Client (uses DATABASE_URL from environment automatically)
const prisma = new PrismaClient();

export { prisma };

