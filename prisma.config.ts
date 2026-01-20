import { config } from 'dotenv'
import { defineConfig, env } from 'prisma/config'

// Load .env.local file explicitly
config({ path: '.env.local' })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Use DIRECT_URL for migrations (port 5432), DATABASE_URL for runtime queries (port 6543)
    url: env('DIRECT_URL') || env('DATABASE_URL'),
  },
})