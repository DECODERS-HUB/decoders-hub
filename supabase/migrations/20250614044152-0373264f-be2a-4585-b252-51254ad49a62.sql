
-- First, let's see what's currently in the admin_users table
SELECT * FROM admin_users;

-- Delete any existing entries to start fresh  
DELETE FROM admin_users;

-- Insert the correct admin users based on the user IDs we see in the logs
INSERT INTO admin_users (id, email) VALUES 
('6dca44e8-1e64-4a76-8663-eae2b24bf41d', 'hub.decoders@gmail.com'),
('7097687c-0734-474e-9200-cd933b86827f', 'moshoodoabdulhaqq@gmail.com');

-- Verify the data is now correctly inserted
SELECT * FROM admin_users;
