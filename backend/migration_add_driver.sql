-- Create new column
ALTER TABLE "Vehicle" ADD COLUMN "assigned_driver_id" TEXT;

-- Add foreign key constraint
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_assigned_driver_id_fkey" FOREIGN KEY ("assigned_driver_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
