/*
  Warnings:

  - You are about to alter the column `syncTime` on the `ProductStats` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `createdAt` on the `RoomStats` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `syncTime` on the `SalesStats` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `ProductStats` MODIFY `syncTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `RoomStats` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `SalesStats` MODIFY `syncTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
