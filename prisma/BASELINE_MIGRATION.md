# Creating Baseline Migration for Existing Database (No Data Loss)

## Problem
You have an existing database with data in `bucket_list` table, but Prisma doesn't have migration history. Prisma detected "drift" and wants to reset the database.

## Solution: Create Baseline Migration (Safe - No Data Loss)

### Step 1: Ensure Schema Matches Database

Your `schema.prisma` should match your current database structure. Verify that your `BucketList` model matches the actual table:

```prisma
model BucketList {
  id     Int     @id @default(autoincrement())
  title  String  @db.VarChar
  status Boolean @default(false)

  @@map("bucket_list")
}
```

### Step 2: Create Baseline Migration (Without Applying)

```bash
npx prisma migrate dev --create-only --name baseline
```

This creates the migration file but **doesn't apply it** (since your database already has the structure).

### Step 3: Mark Migration as Applied

Since your database already has the `bucket_list` table, tell Prisma that this migration is already applied:

```bash
npx prisma migrate resolve --applied baseline
```

**Note**: Replace `baseline` with the actual migration name (it will be something like `20240101000000_baseline`)

### Step 4: Verify

Check that Prisma recognizes the migration:

```bash
npx prisma migrate status
```

You should see the baseline migration marked as applied, and no drift detected.

### Step 5: Generate Prisma Client

```bash
npx prisma generate
```

## What This Does

- ✅ Creates a migration file that represents your current database state
- ✅ Marks it as "already applied" (since DB already has the structure)
- ✅ **NO SQL is executed** - your data is safe
- ✅ Prisma now knows the baseline state
- ✅ Future migrations will work correctly

## Alternative: If Step 3 Fails

If `prisma migrate resolve` doesn't work, you can manually edit the migration SQL to be empty or just contain comments:

1. Open `prisma/migrations/[timestamp]_baseline/migration.sql`
2. Replace content with:
   ```sql
   -- Baseline migration: Database already has this structure
   -- This migration is marked as applied to establish baseline
   ```
3. Then mark as applied:
   ```bash
   npx prisma migrate resolve --applied [timestamp]_baseline
   ```

## After Baseline

Once baseline is established, you can:
- Add new models (like `Work`)
- Modify existing models
- Use `prisma migrate dev` normally

Your existing data in `bucket_list` will remain untouched!

