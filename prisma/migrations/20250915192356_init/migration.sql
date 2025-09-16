/*
  Warnings:

  - You are about to drop the column `addres` on the `accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `map_url` on the `accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `alt` on the `accommodation_image` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `accommodation_image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `accommodation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."accommodation_latitude_longitude_idx";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."accommodation" DROP COLUMN "addres",
DROP COLUMN "country",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "map_url",
DROP COLUMN "region",
ADD COLUMN     "address" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."accommodation_image" DROP COLUMN "alt",
DROP COLUMN "sortOrder",
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."amenity" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."booking" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."category" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."contact" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."rating" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "public"."category"("name");
