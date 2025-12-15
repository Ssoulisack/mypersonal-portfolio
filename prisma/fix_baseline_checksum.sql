-- Fix baseline migration checksum
-- This updates the checksum to match the current migration.sql file

UPDATE "_prisma_migrations" 
SET checksum = '4c26db376a6a69a8f72ded1068b41082c31e875c03902f71afe9cd68f207c2d9'
WHERE migration_name = '20251206012613_baseline';

-- Verify the update
SELECT migration_name, checksum, finished_at 
FROM "_prisma_migrations" 
WHERE migration_name = '20251206012613_baseline';

