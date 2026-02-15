-- CreateTable
CREATE TABLE "Filme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "classificacao" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "elenco" TEXT,
    "genero" TEXT NOT NULL,
    "dataInicioExibicao" TEXT NOT NULL,
    "dataFinalExibicao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sala" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sessao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "horarioExibicao" TEXT NOT NULL,
    "filmeId" INTEGER NOT NULL,
    "salaId" INTEGER NOT NULL,
    CONSTRAINT "Sessao_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "Filme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sessao_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ingresso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessaoId" INTEGER NOT NULL,
    "valorInteira" REAL NOT NULL,
    "valorMeia" REAL NOT NULL,
    "tipo" TEXT,
    CONSTRAINT "Ingresso_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "Sessao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
