/*
  Warnings:

  - Added the required column `pixelCode` to the `settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pixelId` to the `settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "settings" ADD COLUMN     "pixelCode" TEXT NOT NULL,
ADD COLUMN     "pixelId" TEXT NOT NULL;
