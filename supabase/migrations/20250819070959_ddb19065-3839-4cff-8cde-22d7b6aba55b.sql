-- Tighten RLS on admin_users to prevent public exposure of admin emails
-- Ensure RLS is enabled
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Remove overly permissive public SELECT policy
DROP POLICY IF EXISTS "Allow users to check their admin status" ON public.admin_users;

-- Allow only authenticated users to read their own admin record
CREATE POLICY "Users can read their own admin record"
ON public.admin_users
FOR SELECT
TO authenticated
USING (id = auth.uid());