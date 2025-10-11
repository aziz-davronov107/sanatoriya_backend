-- AlterTable
ALTER TABLE "public"."profile" ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "isDisabled" DROP NOT NULL;
