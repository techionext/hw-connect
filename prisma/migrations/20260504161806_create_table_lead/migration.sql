-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "step" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT,
    "company" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "debtsTotal" TEXT,
    "debtsBanks" INTEGER,
    "debtsSuppliers" INTEGER,
    "debtsWorkers" INTEGER,
    "taxesFederal" INTEGER,
    "taxesState" INTEGER,
    "taxesMunicipal" INTEGER,
    "revenue12Months" INTEGER,
    "revenueLastMonth" INTEGER,
    "stockValue" INTEGER,
    "profitOrLossMonthly" INTEGER,
    "employeesNumber" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);
