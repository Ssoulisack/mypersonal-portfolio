# Prisma Workflow Cheat Sheet

This cheat sheet summarizes **safe workflows** for Prisma in **local development** and **production** environments.

---

## 🟢 Local Development Workflow

1. **Edit schema.prisma**

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  age   Int?   // new field
}
```

2. **Create & apply migration**

```bash
npx prisma migrate dev --name add_age_to_user
```

* Generates migration folder in `prisma/migrations/`
* Applies migration to **local DB**
* Regenerates **Prisma Client**
* Shows warnings for potential data loss

3. **Check migration SQL (optional)**

* Review `prisma/migrations/<timestamp>_add_age_to_user/migration.sql`
* Ensure no unexpected drops or destructive changes

4. **Test application locally**

```ts
const users = await prisma.user.findMany();
```

5. **Commit changes**

```
prisma/schema.prisma
prisma/migrations/*
```

6. **Optional: Reset database for testing**

```bash
npx prisma migrate reset
```

* ⚠ **WARNING: This will DROP your entire database and delete all data**
* Reapplies all migrations
* Runs seed script (if any)
* Only for dev/test, **never in production**

7. **Repeat**

* Edit schema → run `migrate dev` → test → commit

---

## 🟢 Production Workflow

1. **Prepare migration locally**

```bash
npx prisma migrate dev --name <migration_name>
```

* Test locally
* Commit `schema.prisma` and migration folders

2. **Deploy code + migrations**

* Pull latest code to production server / CI/CD
* Include migration folders

3. **Apply migrations on production**

```bash
npx prisma migrate deploy
```

* Applies **pending migrations**
* ⚠ **WARNING: Any destructive changes in migration (e.g., DROP TABLE/COLUMN) will affect production data**
* Preserves existing data for non-destructive changes
* Does **not** generate new migrations or reset DB

4. **Generate Prisma Client**

```bash
npx prisma generate
```

* Required to use updated schema in production code

5. **Start / restart application**

* Application now uses latest schema

6. **Optional: Backup database**

### PostgreSQL:

```bash
pg_dump -U <username> -h <host> <database_name> > backup.sql
```

### MySQL:

```bash
mysqldump -u <username> -p -h <host> <database_name> > backup.sql
```

7. **Repeat for future migrations**

* Test locally → create migration → commit → deploy → generate → run app

---

## ✅ Key Notes

| Command                                | Environment  | Purpose                                          | Notes / Warnings                                                                  |
| -------------------------------------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------- |
| `npx prisma migrate dev --name <name>` | Local        | Generate + apply migration, update Prisma Client | Safe for dev only; ⚠ destructive changes will affect local DB                     |
| `npx prisma migrate deploy`            | Production   | Apply existing migrations                        | ⚠ Destructive migrations will modify production data; does not generate migration |
| `npx prisma generate`                  | Both         | Regenerate Prisma Client                         | Needed after schema changes or deploy                                             |
| `npx prisma migrate reset`             | Local / Test | Drops & rebuilds DB                              | ⚠ **Deletes all data**; never run in production                                   |

---

**Tips:**

* Always review migration SQL for destructive changes
* Never edit migration folders already deployed to production
* Commit schema and migrations together for version control
* Backup production database before applying migrations
