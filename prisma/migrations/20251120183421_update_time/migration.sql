-- AlterTable
ALTER TABLE `ProductStats` MODIFY `syncTime` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `RoomStats` MODIFY `createdAt` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SalesStats` MODIFY `syncTime` VARCHAR(191) NOT NULL;
