/*
  Warnings:

  - A unique constraint covering the columns `[email,rookie_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rookie_id` to the `contact_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rookie_id` to the `tutoring_classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rookie_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_email_key` ON `users`;

-- AlterTable
ALTER TABLE `contact_requests` ADD COLUMN `rookie_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tutoring_classes` ADD COLUMN `rookie_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `rookie_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `rookies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `rookies_name_key`(`name`),
    UNIQUE INDEX `rookies_token_key`(`token`),
    INDEX `rookies_token_idx`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_rookie_id_key` ON `users`(`email`, `rookie_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_rookie_id_fkey` FOREIGN KEY (`rookie_id`) REFERENCES `rookies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact_requests` ADD CONSTRAINT `contact_requests_rookie_id_fkey` FOREIGN KEY (`rookie_id`) REFERENCES `rookies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutoring_classes` ADD CONSTRAINT `tutoring_classes_rookie_id_fkey` FOREIGN KEY (`rookie_id`) REFERENCES `rookies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
