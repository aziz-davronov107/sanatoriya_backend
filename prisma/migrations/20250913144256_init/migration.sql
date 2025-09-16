/*
  Warnings:

  - You are about to drop the column `dissccount` on the `accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `extra_features` on the `accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `accommodation` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `accommodation` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to drop the column `date` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `contact` table. All the data in the column will be lost.
  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `likes` table. All the data in the column will be lost.
  - You are about to alter the column `clean` on the `rating` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(2,1)`.
  - You are about to alter the column `location` on the `rating` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(2,1)`.
  - You are about to alter the column `communicate` on the `rating` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(2,1)`.

*/
-- CreateEnum
CREATE TYPE "public"."PriceUnit" AS ENUM ('PER_NIGHT', 'PER_MONTH', 'TOTAL');

-- CreateEnum
CREATE TYPE "public"."ListingStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- DropIndex
DROP INDEX "public"."likes_user_id_accommodation_id_key";

-- DropIndex
DROP INDEX "public"."likes_user_id_idx";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."accommodation" DROP COLUMN "dissccount",
DROP COLUMN "extra_features",
DROP COLUMN "features",
DROP COLUMN "img",
ADD COLUMN     "city" VARCHAR(255),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" VARCHAR(10) NOT NULL DEFAULT 'UZS',
ADD COLUMN     "discount" DECIMAL(5,2) NOT NULL DEFAULT 0,
ADD COLUMN     "priceUnit" "public"."PriceUnit" NOT NULL DEFAULT 'PER_MONTH',
ADD COLUMN     "region" VARCHAR(255),
ADD COLUMN     "status" "public"."ListingStatus" NOT NULL DEFAULT 'PUBLISHED',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "isActive" SET DEFAULT true,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "build_year" DROP NOT NULL,
ALTER COLUMN "documents" DROP NOT NULL,
ALTER COLUMN "map_url" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE "public".category_id_seq;
ALTER TABLE "public"."category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" SET DEFAULT nextval('"public".category_id_seq');
ALTER SEQUENCE "public".category_id_seq OWNED BY "public"."category"."id";

-- AlterTable
ALTER TABLE "public"."contact" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."likes" DROP CONSTRAINT "likes_pkey",
DROP COLUMN "id",
DROP COLUMN "like",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("user_id", "accommodation_id");

-- AlterTable
ALTER TABLE "public"."rating" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "overall" DECIMAL(2,1),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "clean" SET DATA TYPE DECIMAL(2,1),
ALTER COLUMN "location" SET DATA TYPE DECIMAL(2,1),
ALTER COLUMN "communicate" SET DATA TYPE DECIMAL(2,1);

-- CreateTable
CREATE TABLE "public"."amenity" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."accommodation_image" (
    "id" UUID NOT NULL,
    "accommodationId" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "alt" VARCHAR(255),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accommodation_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."accommodation_amenity" (
    "accommodationId" UUID NOT NULL,
    "amenityId" INTEGER NOT NULL,

    CONSTRAINT "accommodation_amenity_pkey" PRIMARY KEY ("accommodationId","amenityId")
);

-- CreateTable
CREATE TABLE "public"."booking" (
    "id" UUID NOT NULL,
    "accommodationId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "guests" INTEGER NOT NULL DEFAULT 1,
    "totalPrice" DECIMAL(12,2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'UZS',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "amenity_name_key" ON "public"."amenity"("name");

-- CreateIndex
CREATE INDEX "accommodation_image_accommodationId_idx" ON "public"."accommodation_image"("accommodationId");

-- CreateIndex
CREATE INDEX "accommodation_amenity_amenityId_idx" ON "public"."accommodation_amenity"("amenityId");

-- CreateIndex
CREATE INDEX "booking_accommodationId_idx" ON "public"."booking"("accommodationId");

-- CreateIndex
CREATE INDEX "booking_userId_idx" ON "public"."booking"("userId");

-- CreateIndex
CREATE INDEX "accommodation_latitude_longitude_idx" ON "public"."accommodation"("latitude", "longitude");

-- AddForeignKey
ALTER TABLE "public"."accommodation_image" ADD CONSTRAINT "accommodation_image_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "public"."accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."accommodation_amenity" ADD CONSTRAINT "accommodation_amenity_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "public"."accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."accommodation_amenity" ADD CONSTRAINT "accommodation_amenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "public"."amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."booking" ADD CONSTRAINT "booking_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "public"."accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
