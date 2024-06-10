/*
  Warnings:

  - Added the required column `color` to the `Thematic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thematic" ADD COLUMN     "color" TEXT NOT NULL;
