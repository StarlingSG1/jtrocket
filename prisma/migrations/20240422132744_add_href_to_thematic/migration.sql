/*
  Warnings:

  - Added the required column `href` to the `Thematic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thematic" ADD COLUMN     "href" TEXT NOT NULL;
