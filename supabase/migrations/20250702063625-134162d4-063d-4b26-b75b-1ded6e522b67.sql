
-- Enable RLS on admin_users table if not already enabled
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to check if they are admin (needed for auth flows)
CREATE POLICY "Allow users to check their admin status" ON public.admin_users
FOR SELECT USING (true);

-- Create policy to allow only existing admins to insert new admin users
CREATE POLICY "Only admins can create admin users" ON public.admin_users
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() OR email = auth.jwt() ->> 'email'
  )
);

-- Create policy to allow only existing admins to update admin users
CREATE POLICY "Only admins can update admin users" ON public.admin_users
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() OR email = auth.jwt() ->> 'email'
  )
);

-- Create policy to allow only existing admins to delete admin users
CREATE POLICY "Only admins can delete admin users" ON public.admin_users
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() OR email = auth.jwt() ->> 'email'
  )
);

-- Ensure admin users exist in the table (replace with actual admin user details)
INSERT INTO public.admin_users (id, email) VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@decodershub.com')
ON CONFLICT (email) DO NOTHING;

-- If you have specific admin email addresses, add them here
-- INSERT INTO public.admin_users (id, email) VALUES 
--   ('your-admin-user-id', 'your-admin-email@example.com')
-- ON CONFLICT (email) DO NOTHING;
