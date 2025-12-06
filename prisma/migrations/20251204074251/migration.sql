/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `RoomStats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `RoomStats_username_key` ON `RoomStats`(`username`);
