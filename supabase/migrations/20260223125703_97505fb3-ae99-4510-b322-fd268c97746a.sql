
-- Drop overly permissive policies
DROP POLICY IF EXISTS "Anyone can read profiles by code" ON public.saved_profiles;
DROP POLICY IF EXISTS "Anyone can update profiles" ON public.saved_profiles;
DROP POLICY IF EXISTS "Anyone can save a profile" ON public.saved_profiles;

-- Deny all direct client access — edge function uses service role which bypasses RLS
CREATE POLICY "No direct client access to profiles" ON public.saved_profiles
  FOR ALL
  USING (false)
  WITH CHECK (false);
