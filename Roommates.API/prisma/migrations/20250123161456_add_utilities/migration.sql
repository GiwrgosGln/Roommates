-- CreateTable
CREATE TABLE "utilities" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "due_date" TIMESTAMP(6) NOT NULL,
    "paid_at" TIMESTAMP(6),
    "household_id" INTEGER NOT NULL,
    "created_by_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "utilities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "utilities" ADD CONSTRAINT "utilities_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "households"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "utilities" ADD CONSTRAINT "utilities_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
