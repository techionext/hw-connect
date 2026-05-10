-- CreateEnum
CREATE TYPE "dataUsersType" AS ENUM ('INITIATE_CHECKOUT', 'PURCHASE');

-- CreateTable
CREATE TABLE "dataUsers" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "type" "type" NOT NULL DEFAULT 'PURCHASE',
    "success" BOOLEAN NOT NULL DEFAULT false,
    "utmfyUsersId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dataUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "payoutAmount" INTEGER NOT NULL,
    "transactionId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "utmfyUsersId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utmfyUsers" (
    "id" TEXT NOT NULL,
    "tokenUtmfy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "utmfyUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dataUsers" ADD CONSTRAINT "dataUsers_utmfyUsersId_fkey" FOREIGN KEY ("utmfyUsersId") REFERENCES "utmfyUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_utmfyUsersId_fkey" FOREIGN KEY ("utmfyUsersId") REFERENCES "utmfyUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
