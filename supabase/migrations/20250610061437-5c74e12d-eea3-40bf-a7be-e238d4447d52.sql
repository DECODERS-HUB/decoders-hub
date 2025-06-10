
-- Let's check what's actually in the admin_users table
SELECT * FROM admin_users;

-- Delete any existing entries and re-insert to ensure clean data
DELETE FROM admin_users;

-- Insert the admin users again with explicit UUIDs
INSERT INTO admin_users (id, email) VALUES 
('6dca44e8-1e64-4a76-8663-eae2b24bf41d', 'hub.decoders@gmail.com'),
('7097687c-0734-474e-9200-cd933b86827f', 'moshoodoabdulhaqq@gmail.com');

-- Verify the data is there
SELECT * FROM admin_users;
