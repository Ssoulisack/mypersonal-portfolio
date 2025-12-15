# Fixing Baseline Migration Checksum Issue

## Current Status

✅ **Your data is SAFE** - The `bucket_list` table and all its data are intact.

✅ The `works` table has been created using `prisma db push`.

## The Issue

Prisma tracks a checksum of migration files. When we modified the baseline migration after marking it as applied, Prisma detected the mismatch and wants to reset.

## Solution Options

### Option 1: Fix Checksum in Database (Recommended)

Manually update the checksum in the `_prisma_migrations` table:

```sql
-- Connect to your database
psql $DATABASE_URL

-- Calculate new checksum (you'll need to hash the migration.sql file)
-- Or simply delete and recreate the migration record
DELETE FROM "_prisma_migrations" WHERE migration_name = '20251206012613_baseline';

-- Then mark it as applied again
```

Then run:
```bash
npx prisma migrate resolve --applied 20251206012613_baseline
npx prisma migrate dev --name add_work_model
```

### Option 2: Use db push for Now (Simplest)

Continue using `prisma db push` for schema changes. This bypasses migrations entirely:

```bash
# Make schema changes
# Edit prisma/schema.prisma

# Push changes (no migration files)
npx prisma db push

# Generate client
npx prisma generate
```

**Note**: `db push` doesn't create migration files, so you won't have migration history.

### Option 3: Start Fresh Migration History (⚠️ Only if you can recreate data)

If you can recreate your data:

1. Export your data:
   ```bash
   pg_dump -t bucket_list $DATABASE_URL > bucket_list_backup.sql
   ```

2. Reset migrations:
   ```bash
   # Delete migration folder
   rm -rf prisma/migrations
   
   # Delete migration history from DB
   psql $DATABASE_URL -c "DROP TABLE IF EXISTS _prisma_migrations;"
   ```

3. Create fresh baseline:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Restore data:
   ```bash
   psql $DATABASE_URL < bucket_list_backup.sql
   ```

## Recommended: Quick Fix

Since your data is safe and `works` table is created, the simplest path forward is:

1. **For now**: Use `prisma db push` when you need to change the schema
2. **For production**: Set up proper migrations later when you have time to fix the checksum issue

Your data in `bucket_list` is completely safe - it was never touched!

## Verify Your Data

Check that your data is still there:

```bash
# Using Prisma Studio
npx prisma studio

# Or using a query
psql $DATABASE_URL -c "SELECT * FROM bucket_list;"
```

