/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `OTPVerification` table. All the data in the column will be lost.
  - You are about to drop the column `otpCode` on the `OTPVerification` table. All the data in the column will be lost.
  - Added the required column `verificationId` to the `OTPVerification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OTPVerification" DROP COLUMN "expiresAt",
DROP COLUMN "otpCode",
ADD COLUMN     "verificationId" TEXT NOT NULL;
