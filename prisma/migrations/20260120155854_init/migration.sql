-- CreateTable
CREATE TABLE "works" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" VARCHAR(255),
    "colorCode" VARCHAR(255),

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

-- CreateTable
CREATE TABLE "toc_items" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "href" VARCHAR(255) NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "icon" VARCHAR(10),
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "toc_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_items" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" VARCHAR NOT NULL,
    "badge" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "timeline_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_translations" (
    "id" SERIAL NOT NULL,
    "timelineItemId" INTEGER NOT NULL,
    "locale" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "timeline_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_infos" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "position" VARCHAR(255),
    "avatar" VARCHAR(255),

    CONSTRAINT "personal_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_info_translations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personalInfoId" INTEGER NOT NULL,
    "locale" VARCHAR(10) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "bio" VARCHAR(255),
    "address" VARCHAR(255),

    CONSTRAINT "personal_info_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socials" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "platform" VARCHAR(50) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(255) NOT NULL,
    "personalInfoId" INTEGER,

    CONSTRAINT "socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "className" VARCHAR(255) NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "work_translations_locale_workId_idx" ON "work_translations"("locale", "workId");

-- CreateIndex
CREATE UNIQUE INDEX "work_translations_workId_key" ON "work_translations"("workId");

-- CreateIndex
CREATE INDEX "timeline_translations_locale_timelineItemId_idx" ON "timeline_translations"("locale", "timelineItemId");

-- CreateIndex
CREATE UNIQUE INDEX "socials_platform_key" ON "socials"("platform");

-- AddForeignKey
ALTER TABLE "work_translations" ADD CONSTRAINT "work_translations_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_translations" ADD CONSTRAINT "timeline_translations_timelineItemId_fkey" FOREIGN KEY ("timelineItemId") REFERENCES "timeline_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_info_translations" ADD CONSTRAINT "personal_info_translations_personalInfoId_fkey" FOREIGN KEY ("personalInfoId") REFERENCES "personal_infos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socials" ADD CONSTRAINT "socials_personalInfoId_fkey" FOREIGN KEY ("personalInfoId") REFERENCES "personal_infos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
