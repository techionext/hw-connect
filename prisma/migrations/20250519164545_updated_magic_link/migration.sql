/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `magic_links` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "magic_links_userId_key" ON "magic_links"("userId");
