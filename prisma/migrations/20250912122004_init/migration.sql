-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'MANAGER', 'USER');

-- CreateEnum
CREATE TYPE "public"."ListingType" AS ENUM ('RENT', 'SALE');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" "public"."Role" NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."category" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "img" TEXT NOT NULL,
    "icon_img" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."accommodation" (
    "id" UUID NOT NULL,
    "img" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "listing_type" "public"."ListingType" NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "addres" TEXT NOT NULL,
    "features" JSONB NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "dissccount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "build_year" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "documents" JSONB NOT NULL,
    "map_url" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "extra_features" JSONB NOT NULL,
    "user_id" UUID NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contact" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "accommodation_id" UUID NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."likes" (
    "id" SERIAL NOT NULL,
    "like" BOOLEAN NOT NULL,
    "user_id" UUID NOT NULL,
    "accommodation_id" UUID NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rating" (
    "id" SERIAL NOT NULL,
    "clean" DOUBLE PRECISION NOT NULL,
    "location" DOUBLE PRECISION NOT NULL,
    "communicate" DOUBLE PRECISION NOT NULL,
    "user_id" UUID NOT NULL,
    "accommodation_id" UUID NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "accommodation_user_id_idx" ON "public"."accommodation"("user_id");

-- CreateIndex
CREATE INDEX "accommodation_category_id_idx" ON "public"."accommodation"("category_id");

-- CreateIndex
CREATE INDEX "contact_user_id_idx" ON "public"."contact"("user_id");

-- CreateIndex
CREATE INDEX "contact_accommodation_id_idx" ON "public"."contact"("accommodation_id");

-- CreateIndex
CREATE INDEX "likes_user_id_idx" ON "public"."likes"("user_id");

-- CreateIndex
CREATE INDEX "likes_accommodation_id_idx" ON "public"."likes"("accommodation_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_accommodation_id_key" ON "public"."likes"("user_id", "accommodation_id");

-- CreateIndex
CREATE INDEX "rating_user_id_idx" ON "public"."rating"("user_id");

-- CreateIndex
CREATE INDEX "rating_accommodation_id_idx" ON "public"."rating"("accommodation_id");

-- CreateIndex
CREATE UNIQUE INDEX "rating_user_id_accommodation_id_key" ON "public"."rating"("user_id", "accommodation_id");

-- AddForeignKey
ALTER TABLE "public"."accommodation" ADD CONSTRAINT "accommodation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."accommodation" ADD CONSTRAINT "accommodation_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contact" ADD CONSTRAINT "contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contact" ADD CONSTRAINT "contact_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rating" ADD CONSTRAINT "rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rating" ADD CONSTRAINT "rating_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
