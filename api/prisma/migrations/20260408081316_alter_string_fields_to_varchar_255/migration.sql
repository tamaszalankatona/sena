/*
  Warnings:

  - You are about to alter the column `description` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "username" VARCHAR(255) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
