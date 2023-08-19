/*
  Warnings:

  - The values [repair] on the enum `ExpenseType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExpenseType_new" AS ENUM ('labor', 'hardware', 'management');
ALTER TABLE "Expense" ALTER COLUMN "category" TYPE "ExpenseType_new" USING ("category"::text::"ExpenseType_new");
ALTER TYPE "ExpenseType" RENAME TO "ExpenseType_old";
ALTER TYPE "ExpenseType_new" RENAME TO "ExpenseType";
DROP TYPE "ExpenseType_old";
COMMIT;
