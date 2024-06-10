/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Thematic` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Thematic" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Thematic_slug_key" ON "Thematic"("slug");
