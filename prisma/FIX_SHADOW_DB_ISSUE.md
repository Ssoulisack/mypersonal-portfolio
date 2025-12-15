# Fix Shadow Database Issue

## Problem
When running `prisma migrate dev`, you get:
```
Error: P3006
Migration failed to apply cleanly to the shadow database.
The underlying table for model `bucket_list` does not exist.
```

## Root Cause
The baseline migration checksum is incorrect, so Prisma can't properly recreate the database structure in the shadow database.

## Solution

### Step 1: Fix Baseline Migration Checksum

Run this SQL command to update the checksum:

```sql
UPDATE "_prisma_migrations" 
SET checksum = '4c26db376a6a69a8f72ded1068b41082c31e875c03902f71afe9cd68f207c2d9'
WHERE migration_name = '20251206012613_baseline';
```

**How to run:**
```bash
psql $DATABASE_URL -c "UPDATE \"_prisma_migrations\" SET checksum = '4c26db376a6a69a8f72ded1068b41082c31e875c03902f71afe9cd68f207c2d9' WHERE migration_name = '20251206012613_baseline';"
```

### Step 2: Update Migration SQL

The migration `20251205184404_add_field_update_and_create` has been updated to make `updatedAt` NOT NULL (matching your schema change).

### Step 3: Test

After fixing the checksum, try:
```bash
npx prisma migrate dev --name test_migration
```

## Alternative: Use db push (Temporary)

If you need to make schema changes immediately without fixing the checksum:

```bash
npx prisma db push
npx prisma generate
```

**Note**: `db push` doesn't create migration files, so you won't have migration history.

## Why This Happens

Prisma uses a "shadow database" to validate migrations. It:
1. Creates a temporary database
2. Applies all migrations in order
3. Compares the result with your schema

If the baseline migration checksum is wrong, Prisma can't properly apply it to the shadow database, causing this error.

