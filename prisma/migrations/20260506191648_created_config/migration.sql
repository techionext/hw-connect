/*
  Warnings:

  - A unique constraint covering the columns `[settingsFaviconId]` on the table `file` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[settingsSharingImageId]` on the table `file` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "file" ADD COLUMN     "settingsFaviconId" TEXT,
ADD COLUMN     "settingsSharingImageId" TEXT;

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "keywords" TEXT[],
    "description" TEXT,
    "smtpEnabled" BOOLEAN NOT NULL DEFAULT false,
    "smtpSSL" TEXT,
    "smtp" TEXT,
    "email" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "file_settingsFaviconId_key" ON "file"("settingsFaviconId");

-- CreateIndex
CREATE UNIQUE INDEX "file_settingsSharingImageId_key" ON "file"("settingsSharingImageId");

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_settings_favicon_id_fkey" FOREIGN KEY ("settingsFaviconId") REFERENCES "settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_settings_sharing_image_id_fkey" FOREIGN KEY ("settingsSharingImageId") REFERENCES "settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
