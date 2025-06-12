
-- Check what's actually in the admin_users table
SELECT * FROM admin_users;

-- Check the structure of the table using information_schema
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'admin_users' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Now let's insert the data with the exact user ID that's failing
INSERT INTO admin_users (id, email) VALUES 
('6dca44e8-1e64-4a76-8663-eae2b24bf41d', 'hub.decoders@gmail.com')
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

-- Also add the second admin user
INSERT INTO admin_users (id, email) VALUES 
('7097687c-0734-474e-9200-cd933b86827f', 'moshoodoabdulhaqq@gmail.com')
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

-- Verify the data is now there
SELECT * FROM admin_users WHERE id = '6dca44e8-1e64-4a76-8663-eae2b24bf41d';
SELECT * FROM admin_users WHERE email = 'hub.decoders@gmail.com';
SELECT * FROM admin_users;
