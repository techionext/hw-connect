/*
  Warnings:

  - You are about to alter the column `debtsBanks` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `debtsSuppliers` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `debtsWorkers` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `taxesFederal` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `taxesState` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `taxesMunicipal` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `revenue12Months` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `revenueLastMonth` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `stockValue` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `profitOrLossMonthly` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `employeesNumber` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "leads" ALTER COLUMN "debtsBanks" SET DATA TYPE INTEGER,
ALTER COLUMN "debtsSuppliers" SET DATA TYPE INTEGER,
ALTER COLUMN "debtsWorkers" SET DATA TYPE INTEGER,
ALTER COLUMN "taxesFederal" SET DATA TYPE INTEGER,
ALTER COLUMN "taxesState" SET DATA TYPE INTEGER,
ALTER COLUMN "taxesMunicipal" SET DATA TYPE INTEGER,
ALTER COLUMN "revenue12Months" SET DATA TYPE INTEGER,
ALTER COLUMN "revenueLastMonth" SET DATA TYPE INTEGER,
ALTER COLUMN "stockValue" SET DATA TYPE INTEGER,
ALTER COLUMN "profitOrLossMonthly" SET DATA TYPE INTEGER,
ALTER COLUMN "employeesNumber" SET DATA TYPE INTEGER;
