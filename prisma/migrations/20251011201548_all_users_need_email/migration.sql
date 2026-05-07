/*
  Warnings:

  - You are about to drop the column `lastMethodUsed` on the `security_settings` table. All the data in the column will be lost.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "security_settings" DROP COLUMN "lastMethodUsed",
ADD COLUMN     "defaultMethod" "twoFactorMethods" NOT NULL DEFAULT 'EMAIL';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;
