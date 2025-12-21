-- CreateTable
CREATE TABLE "works" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_translations" (
    "id" SERIAL NOT NULL,
    "workId" INTEGER NOT NULL,
    "locale" VARCHAR(10) NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "outcome" TEXT,
    "keyFeatures" JSONB DEFAULT '[]',
    "techStack" JSONB DEFAULT '[]',
    "challenges" JSONB DEFAULT '[]',

    CONSTRAINT "work_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "work_translations_locale_idx" ON "work_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "work_translations_workId_locale_key" ON "work_translations"("workId", "locale");

-- AddForeignKey
ALTER TABLE "work_translations" ADD CONSTRAINT "work_translations_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works"("id") ON DELETE CASCADE ON UPDATE CASCADE;
