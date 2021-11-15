-- AlterTable
ALTER TABLE `contact_requests` MODIFY `is_resolved` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `tutoring_classes` MODIFY `description` VARCHAR(500) NOT NULL;
