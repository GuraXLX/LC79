-- SQL Migration for Supabase / PostgreSQL
-- Targets: LC79 VMS Initial Schema

-- ENUMS (Safe check to allow re-running migration)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Role') THEN
        CREATE TYPE "Role" AS ENUM ('COMMANDER', 'OPERATOR');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'OCRCategory') THEN
        CREATE TYPE "OCRCategory" AS ENUM ('FUEL_RECEIPT', 'REVENUE_LICENSE', 'INSURANCE_POLICY', 'EMISSION_CERT', 'SERVICE_INVOICE', 'PART_ORDER');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'SyncStatus') THEN
        CREATE TYPE "SyncStatus" AS ENUM ('PENDING', 'SYNCED', 'FAILED');
    END IF;
END
$$;

-- USERS (Safe check with IF NOT EXISTS for tables)
CREATE TABLE IF NOT EXISTS "User" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "email" TEXT UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" DEFAULT 'OPERATOR',
    "preferences" JSONB,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- VEHICLES
CREATE TABLE IF NOT EXISTS "Vehicle" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "nickname" TEXT,
    "vin" TEXT UNIQUE NOT NULL,
    "license_plate" TEXT UNIQUE NOT NULL,
    "model_type" TEXT DEFAULT 'Dual Cab',
    "gvm_limit_kg" FLOAT DEFAULT 3300,
    "curb_weight_kg" FLOAT DEFAULT 2200,
    "odometer_km" FLOAT DEFAULT 0,
    "engine_hours" FLOAT DEFAULT 0
);

-- OCR RECORDS
CREATE TABLE IF NOT EXISTS "OCRRecord" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "vehicle_id" UUID REFERENCES "Vehicle"("id"),
    "user_id" UUID REFERENCES "User"("id"),
    "category" "OCRCategory" NOT NULL,
    "image_url" TEXT NOT NULL,
    "raw_text" TEXT,
    "metadata" JSONB,
    "confidence_score" FLOAT DEFAULT 0.0,
    "sync_status" "SyncStatus" DEFAULT 'PENDING',
    "processed_at" TIMESTAMP WITH TIME ZONE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FUEL LOGS
CREATE TABLE IF NOT EXISTS "FuelLog" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "vehicle_id" UUID REFERENCES "Vehicle"("id"),
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "odometer" FLOAT NOT NULL,
    "liters" FLOAT NOT NULL,
    "price_per_liter" FLOAT NOT NULL,
    "total_lkr" FLOAT NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "station_name" TEXT,
    "ocr_record_id" UUID UNIQUE REFERENCES "OCRRecord"("id")
);

-- SERVICE LOGS
CREATE TABLE IF NOT EXISTS "ServiceLog" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "vehicle_id" UUID REFERENCES "Vehicle"("id"),
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "odometer" FLOAT NOT NULL,
    "service_type" TEXT NOT NULL,
    "total_lkr" FLOAT NOT NULL,
    "parts_source" TEXT,
    "invoice_url" TEXT,
    "notes" TEXT,
    "ocr_record_id" UUID UNIQUE REFERENCES "OCRRecord"("id")
);

-- DOCUMENTS
CREATE TABLE IF NOT EXISTS "Document" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "vehicle_id" UUID REFERENCES "Vehicle"("id"),
    "type" TEXT NOT NULL,
    "expiry_date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "document_url" TEXT NOT NULL,
    "reminder_sent" BOOLEAN DEFAULT FALSE
);

-- TRIPS (TELEMETRY)
CREATE TABLE IF NOT EXISTS "Trip" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "vehicle_id" UUID REFERENCES "Vehicle"("id"),
    "user_id" UUID REFERENCES "User"("id"),
    "start_time" TIMESTAMP WITH TIME ZONE NOT NULL,
    "end_time" TIMESTAMP WITH TIME ZONE,
    "start_odometer" FLOAT NOT NULL,
    "end_odometer" FLOAT,
    "terrain_type" TEXT,
    "corrugation_avg" FLOAT,
    "total_weight_kg" FLOAT
);

-- Convert Trip to a hypertable if TimescaleDB is installed
-- SELECT create_hypertable('"Trip"', 'start_time');
