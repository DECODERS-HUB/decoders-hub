-- Enable RLS on admin_users table if not already enabled
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to check if they are admin (needed for auth flows)
CREATE POLICY "Allow users to check their admin status" ON public.admin_users
FOR SELECT USING (true);