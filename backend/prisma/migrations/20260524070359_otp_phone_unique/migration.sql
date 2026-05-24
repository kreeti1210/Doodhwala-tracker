/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `OTPVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OTPVerification_phoneNumber_key" ON "OTPVerification"("phoneNumber");
