-- Fix baseline migration checksum
-- Run this to update the checksum in the _prisma_migrations table

-- First, let's see the current checksum
SELECT migration_name, checksum FROM "_prisma_migrations" WHERE migration_name = '20251206012613_baseline';

-- Calculate the new checksum (you'll need to run this after getting the file hash)
-- The checksum is SHA256 hash of the migration.sql file content
-- Update it with the correct checksum

-- Example (replace with actual checksum from migration file):
-- UPDATE "_prisma_migrations" 
-- SET checksum = 'NEW_CHECKSUM_HERE'
-- WHERE migration_name = '20251206012613_baseline';

