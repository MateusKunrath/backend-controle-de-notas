-- CreateEnum
CREATE TYPE "Unidade" AS ENUM ('Kilo', 'Litro', 'Caixa');

-- CreateTable
CREATE TABLE "Produtos" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "unidade" "Unidade" NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id")
);
