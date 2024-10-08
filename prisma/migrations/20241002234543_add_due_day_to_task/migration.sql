/*
  Warnings:

  - Added the required column `dueDay` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` ADD COLUMN `dueDay` DATETIME(3) NOT NULL;
