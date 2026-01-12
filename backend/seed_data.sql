INSERT INTO "Vehicle" (id, nickname, vin, license_plate, model_type, gvm_limit_kg, curb_weight_kg, odometer_km, engine_hours)
VALUES 
('v1', 'BLAZE', 'JTE-LC79-000001', 'PI - 8344', 'Single Cab', 3300, 2200, 124500, 3960),
('v2', 'FAMILY BUS', 'JTE-PRADO-000002', 'CAT-1022', 'Prado 150', 2900, 2100, 48000, 1500)
ON CONFLICT DO NOTHING;

INSERT INTO "User" (id, email, name, password_hash, role)
VALUES
('u1', 'commander@vanguard.lk', 'Kushan', 'hash_placeholder', 'COMMANDER'),
('u2', 'udaya@vanguard.lk', 'Udaya', 'hash_placeholder', 'OPERATOR')
ON CONFLICT DO NOTHING;
