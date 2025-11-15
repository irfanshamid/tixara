-- CreateTable
CREATE TABLE `TokpedStats` (
    `id` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `syncTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `stats` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
