-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COMMANDER', 'OPERATOR');

-- CreateEnum
CREATE TYPE "OCRCategory" AS ENUM ('FUEL_RECEIPT', 'REVENUE_LICENSE', 'INSURANCE_POLICY', 'EMISSION_CERT', 'SERVICE_INVOICE', 'PART_ORDER');

-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('PENDING', 'SYNCED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'OPERATOR',
    "preferences" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "nickname" TEXT,
    "vin" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "model_type" TEXT NOT NULL DEFAULT 'Dual Cab',
    "gvm_limit_kg" DOUBLE PRECISION NOT NULL DEFAULT 3300,
    "curb_weight_kg" DOUBLE PRECISION NOT NULL DEFAULT 2200,
    "odometer_km" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "engine_hours" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OCRRecord" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "category" "OCRCategory" NOT NULL,
    "image_url" TEXT NOT NULL,
    "raw_text" TEXT,
    "metadata" JSONB,
    "confidence_score" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "sync_status" "SyncStatus" NOT NULL DEFAULT 'PENDING',
    "processed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OCRRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FuelLog" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "odometer" DOUBLE PRECISION NOT NULL,
    "liters" DOUBLE PRECISION NOT NULL,
    "price_per_liter" DOUBLE PRECISION NOT NULL,
    "total_lkr" DOUBLE PRECISION NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "station_name" TEXT,
    "ocr_record_id" TEXT,

    CONSTRAINT "FuelLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceLog" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "odometer" DOUBLE PRECISION NOT NULL,
    "service_type" TEXT NOT NULL,
    "total_lkr" DOUBLE PRECISION NOT NULL,
    "parts_source" TEXT NOT NULL,
    "invoice_url" TEXT,
    "notes" TEXT,
    "ocr_record_id" TEXT,

    CONSTRAINT "ServiceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "document_url" TEXT NOT NULL,
    "reminder_sent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3),
    "start_odometer" DOUBLE PRECISION NOT NULL,
    "end_odometer" DOUBLE PRECISION,
    "terrain_type" TEXT,
    "corrugation_avg" DOUBLE PRECISION,
    "total_weight_kg" DOUBLE PRECISION,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vin_key" ON "Vehicle"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_license_plate_key" ON "Vehicle"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "FuelLog_ocr_record_id_key" ON "FuelLog"("ocr_record_id");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceLog_ocr_record_id_key" ON "ServiceLog"("ocr_record_id");

-- AddForeignKey
ALTER TABLE "OCRRecord" ADD CONSTRAINT "OCRRecord_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OCRRecord" ADD CONSTRAINT "OCRRecord_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuelLog" ADD CONSTRAINT "FuelLog_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceLog" ADD CONSTRAINT "ServiceLog_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

