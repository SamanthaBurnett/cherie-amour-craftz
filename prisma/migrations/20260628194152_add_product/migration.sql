-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED', 'SOLD_OUT');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('BAG', 'TOP', 'DRESS', 'SET', 'CUSTOM');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "category" "ProductCategory" NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "thumbnailUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
