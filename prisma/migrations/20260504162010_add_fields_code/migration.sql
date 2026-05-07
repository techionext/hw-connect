/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `leads` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `leads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "leads_code_key" ON "leads"("code");
