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
