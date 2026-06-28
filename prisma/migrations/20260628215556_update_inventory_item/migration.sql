/*
  Warnings:

  - The values [LOW_STOC] on the enum `InventoryStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InventoryStatus_new" AS ENUM ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK');
ALTER TABLE "public"."InventoryItem" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "InventoryItem" ALTER COLUMN "status" TYPE "InventoryStatus_new" USING ("status"::text::"InventoryStatus_new");
ALTER TYPE "InventoryStatus" RENAME TO "InventoryStatus_old";
ALTER TYPE "InventoryStatus_new" RENAME TO "InventoryStatus";
DROP TYPE "public"."InventoryStatus_old";
ALTER TABLE "InventoryItem" ALTER COLUMN "status" SET DEFAULT 'OUT_OF_STOCK';
COMMIT;
