/*
  Warnings:

  - You are about to drop the `TokpedStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `TokpedStats`;

-- CreateTable
CREATE TABLE `ProductStats` (
    `id` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `syncTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `stats` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
