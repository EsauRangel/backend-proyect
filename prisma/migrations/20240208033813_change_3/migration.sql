/*
  Warnings:

  - You are about to drop the `invoice_information` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `invoice_information` DROP FOREIGN KEY `Invoice_Information_userId_fkey`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `Payments_userId_fkey`;

-- DropTable
DROP TABLE `invoice_information`;

-- CreateTable
CREATE TABLE `invoice_infomration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `RFC` VARCHAR(191) NOT NULL,
    `BussinesName` VARCHAR(191) NOT NULL,
    `invoiceType` VARCHAR(191) NOT NULL,
    `TaxRegime` VARCHAR(191) NOT NULL,
    `CanBilling` VARCHAR(191) NOT NULL,
    `activeInvoice` BOOLEAN NOT NULL,
    `neighborhood` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `externalNumber` VARCHAR(191) NOT NULL,
    `internalNumber` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `sendEmail` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice_infomration` ADD CONSTRAINT `invoice_infomration_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
