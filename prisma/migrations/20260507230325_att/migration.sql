/*
  Warnings:

  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `file` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leads` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `magic_links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `security_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `two_factors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_settings_favicon_id_fkey";

-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_settings_sharing_image_id_fkey";

-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_userId_fkey";

-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_userId_fkey";

-- DropForeignKey
ALTER TABLE "magic_links" DROP CONSTRAINT "magic_links_userId_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "security_settings" DROP CONSTRAINT "security_settings_userId_fkey";

-- DropForeignKey
ALTER TABLE "two_factors" DROP CONSTRAINT "two_factors_userId_fkey";

-- DropTable
DROP TABLE "addresses";

-- DropTable
DROP TABLE "file";

-- DropTable
DROP TABLE "leads";

-- DropTable
DROP TABLE "logs";

-- DropTable
DROP TABLE "magic_links";

-- DropTable
DROP TABLE "profiles";

-- DropTable
DROP TABLE "security_settings";

-- DropTable
DROP TABLE "settings";

-- DropTable
DROP TABLE "two_factors";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "logAction";

-- DropEnum
DROP TYPE "profileProviders";

-- DropEnum
DROP TYPE "twoFactorMethods";

-- DropEnum
DROP TYPE "twoFactorScope";

-- CreateTable
CREATE TABLE "data" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "data_pkey" PRIMARY KEY ("id")
);
