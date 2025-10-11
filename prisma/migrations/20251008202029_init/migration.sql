/*
  Warnings:

  - You are about to drop the column `message` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the `videos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'CONFIRMED');

-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_room_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."videos" DROP CONSTRAINT "videos_room_id_fkey";

-- DropIndex
DROP INDEX "public"."reviews_room_id_idx";

-- DropIndex
DROP INDEX "public"."reviews_user_id_idx";

-- AlterTable
ALTER TABLE "public"."orders" ADD COLUMN     "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."reviews" DROP COLUMN "message",
DROP COLUMN "room_id",
DROP COLUMN "user_id",
DROP COLUMN "value",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."videos";
