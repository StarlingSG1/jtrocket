/*
  Warnings:

  - Made the column `slug` on table `Thematic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Thematic" ALTER COLUMN "slug" SET NOT NULL;
