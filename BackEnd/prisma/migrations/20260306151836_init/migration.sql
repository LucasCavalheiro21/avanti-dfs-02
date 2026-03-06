/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `pessoas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `buscando` to the `pessoas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `pessoas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `pessoas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pessoas" ADD COLUMN     "buscando" VARCHAR(50) NOT NULL,
ADD COLUMN     "cpf" VARCHAR(14) NOT NULL,
ADD COLUMN     "fotoUrl" TEXT,
ADD COLUMN     "senha" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_cpf_key" ON "pessoas"("cpf");
