/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `MilkRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MilkRecord_userId_date_key" ON "MilkRecord"("userId", "date");
