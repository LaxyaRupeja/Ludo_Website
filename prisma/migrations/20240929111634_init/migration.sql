/*
  Warnings:

  - Added the required column `code` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "code" TEXT NOT NULL,
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '10 minutes';
