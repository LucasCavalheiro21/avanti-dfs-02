-- CreateTable
CREATE TABLE "pessoas" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(50) NOT NULL,
    "descricao" TEXT,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conhecimentos" (
    "id" TEXT NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" VARCHAR(100) NOT NULL,
    "nivel" VARCHAR(50) NOT NULL,
    "pessoa_id" TEXT NOT NULL,

    CONSTRAINT "conhecimentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_email_key" ON "pessoas"("email");

-- AddForeignKey
ALTER TABLE "conhecimentos" ADD CONSTRAINT "conhecimentos_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
