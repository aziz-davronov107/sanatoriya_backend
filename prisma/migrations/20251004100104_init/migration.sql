/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accommodation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accommodation_amenity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accommodation_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `amenity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('user', 'admin');

-- DropForeignKey
ALTER TABLE "public"."accommodation" DROP CONSTRAINT "accommodation_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."accommodation" DROP CONSTRAINT "accommodation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."accommodation_amenity" DROP CONSTRAINT "accommodation_amenity_accommodationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."accommodation_amenity" DROP CONSTRAINT "accommodation_amenity_amenityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."accommodation_image" DROP CONSTRAINT "accommodation_image_accommodationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."booking" DROP CONSTRAINT "booking_accommodationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."booking" DROP CONSTRAINT "booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."contact" DROP CONSTRAINT "contact_accommodation_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."contact" DROP CONSTRAINT "contact_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."likes" DROP CONSTRAINT "likes_accommodation_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."likes" DROP CONSTRAINT "likes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."rating" DROP CONSTRAINT "rating_accommodation_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."rating" DROP CONSTRAINT "rating_user_id_fkey";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."accommodation";

-- DropTable
DROP TABLE "public"."accommodation_amenity";

-- DropTable
DROP TABLE "public"."accommodation_image";

-- DropTable
DROP TABLE "public"."amenity";

-- DropTable
DROP TABLE "public"."booking";

-- DropTable
DROP TABLE "public"."category";

-- DropTable
DROP TABLE "public"."contact";

-- DropTable
DROP TABLE "public"."likes";

-- DropTable
DROP TABLE "public"."rating";

-- DropEnum
DROP TYPE "public"."ListingStatus";

-- DropEnum
DROP TYPE "public"."ListingType";

-- DropEnum
DROP TYPE "public"."PriceUnit";

-- DropEnum
DROP TYPE "public"."UserRole";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" BIGSERIAL NOT NULL,
    "phone" BIGINT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profile" (
    "id" BIGSERIAL NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'user',
    "image_url" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "isDisabled" BOOLEAN NOT NULL DEFAULT false,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."orders" (
    "id" BIGSERIAL NOT NULL,
    "room_id" BIGINT NOT NULL,
    "duration" BIGINT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "hasDiscount" BOOLEAN NOT NULL DEFAULT false,
    "total_amount" BIGINT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rooms" (
    "id" BIGSERIAL NOT NULL,
    "room_number" BIGINT NOT NULL,
    "price_per_day" BIGINT NOT NULL,
    "beds" BIGINT NOT NULL,
    "bathrooms" BIGINT NOT NULL,
    "floor" BIGINT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" JSONB NOT NULL,
    "category_id" BIGINT NOT NULL,
    "availableFrom" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."photos" (
    "id" BIGSERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "room_id" BIGINT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."videos" (
    "id" BIGSERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "room_id" BIGINT NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."room_category" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "room_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" BIGSERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "message" TEXT NOT NULL,
    "room_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "public"."users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "public"."profile"("user_id");

-- CreateIndex
CREATE INDEX "orders_room_id_idx" ON "public"."orders"("room_id");

-- CreateIndex
CREATE INDEX "orders_user_id_idx" ON "public"."orders"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_room_number_key" ON "public"."rooms"("room_number");

-- CreateIndex
CREATE INDEX "rooms_category_id_idx" ON "public"."rooms"("category_id");

-- CreateIndex
CREATE INDEX "photos_room_id_idx" ON "public"."photos"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "photos_room_id_orderIndex_key" ON "public"."photos"("room_id", "orderIndex");

-- CreateIndex
CREATE INDEX "videos_room_id_idx" ON "public"."videos"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "videos_room_id_orderIndex_key" ON "public"."videos"("room_id", "orderIndex");

-- CreateIndex
CREATE INDEX "reviews_room_id_idx" ON "public"."reviews"("room_id");

-- CreateIndex
CREATE INDEX "reviews_user_id_idx" ON "public"."reviews"("user_id");

-- AddForeignKey
ALTER TABLE "public"."profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rooms" ADD CONSTRAINT "rooms_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."room_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."photos" ADD CONSTRAINT "photos_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."videos" ADD CONSTRAINT "videos_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
