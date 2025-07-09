
-- Add the current user as an admin based on the console logs
INSERT INTO public.admin_users (id, email) VALUES 
  ('6dca44e8-1e64-4a76-8663-eae2b24bf41d', 'hub.decoders@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- You can also check what's currently in the admin_users table
-- SELECT * FROM public.admin_users;
