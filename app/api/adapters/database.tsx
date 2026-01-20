import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Use connection pooling for runtime queries
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// Create Prisma Client with the pooled connection adapter
const prisma = new PrismaClient({ adapter });

export { prisma };

