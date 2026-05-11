/*
  Warnings:

  - You are about to drop the column `type` on the `dataUsers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_utmfyUsersId_fkey";

-- AlterTable
ALTER TABLE "dataUsers" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "userPixelId" TEXT,
ALTER COLUMN "utmfyUsersId" DROP NOT NULL;

-- DropEnum
DROP TYPE "dataUsersType";

-- CreateTable
CREATE TABLE "dataPixel" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "userPixelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dataPixel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userPixel" (
    "id" TEXT NOT NULL,
    "pixelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userPixel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dataPixel" ADD CONSTRAINT "dataPixel_userPixelId_fkey" FOREIGN KEY ("userPixelId") REFERENCES "userPixel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_utmfyUsersId_fkey" FOREIGN KEY ("utmfyUsersId") REFERENCES "utmfyUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_userPixelId_fkey" FOREIGN KEY ("userPixelId") REFERENCES "userPixel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
