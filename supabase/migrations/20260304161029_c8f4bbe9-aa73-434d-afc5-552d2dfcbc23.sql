
-- Add user_id and last_active_at to saved_profiles
ALTER TABLE public.saved_profiles
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS last_active_at timestamp with time zone NOT NULL DEFAULT now();

-- Update RLS: drop the old blanket deny policy
DROP POLICY IF EXISTS "No direct client access to profiles" ON public.saved_profiles;

-- Users can read their own profiles
CREATE POLICY "Users can read own profiles"
  ON public.saved_profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can insert their own profiles
CREATE POLICY "Users can insert own profiles"
  ON public.saved_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update their own profiles
CREATE POLICY "Users can update own profiles"
  ON public.saved_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Users can delete their own profiles
CREATE POLICY "Users can delete own profiles"
  ON public.saved_profiles FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Validation trigger: max 3 profiles per user
CREATE OR REPLACE FUNCTION public.check_max_profiles()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = 'public'
AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    IF (SELECT count(*) FROM public.saved_profiles WHERE user_id = NEW.user_id) >= 3 THEN
      RAISE EXCEPTION 'Maximum of 3 profiles per user reached';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_max_profiles ON public.saved_profiles;
CREATE TRIGGER enforce_max_profiles
  BEFORE INSERT ON public.saved_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_max_profiles();
