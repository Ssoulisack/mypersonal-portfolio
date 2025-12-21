-- CreateTable
CREATE TABLE "timeline_items" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
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

-- CreateIndex
CREATE INDEX "timeline_translations_locale_timelineItemId_idx" ON "timeline_translations"("locale", "timelineItemId");

-- AddForeignKey
ALTER TABLE "timeline_translations" ADD CONSTRAINT "timeline_translations_timelineItemId_fkey" FOREIGN KEY ("timelineItemId") REFERENCES "timeline_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
