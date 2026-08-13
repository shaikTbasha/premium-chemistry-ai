-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "clerkId" TEXT,
    "resetToken" TEXT,
    "resetExpiry" TIMESTAMP(3),
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripePriceId" TEXT,
    "stripeStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Molecule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "formula" TEXT NOT NULL,
    "smiles" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Molecule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PdfAnalysis" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "result" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PdfAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChemistryTopic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChemistryTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviousYearQuestion" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "examName" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "correctAnswer" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'Medium',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PreviousYearQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "Molecule_userId_idx" ON "Molecule"("userId");

-- CreateIndex
CREATE INDEX "PdfAnalysis_userId_idx" ON "PdfAnalysis"("userId");

-- CreateIndex
CREATE INDEX "ChemistryTopic_category_idx" ON "ChemistryTopic"("category");

-- CreateIndex
CREATE INDEX "PreviousYearQuestion_topicId_idx" ON "PreviousYearQuestion"("topicId");

-- CreateIndex
CREATE INDEX "PreviousYearQuestion_examName_idx" ON "PreviousYearQuestion"("examName");

-- CreateIndex
CREATE INDEX "PreviousYearQuestion_year_idx" ON "PreviousYearQuestion"("year");

-- AddForeignKey
ALTER TABLE "Molecule" ADD CONSTRAINT "Molecule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PdfAnalysis" ADD CONSTRAINT "PdfAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousYearQuestion" ADD CONSTRAINT "PreviousYearQuestion_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "ChemistryTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
