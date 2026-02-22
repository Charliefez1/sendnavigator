
-- Table for saved child profile sessions
CREATE TABLE public.saved_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  access_code text NOT NULL UNIQUE,
  profile_data jsonb NOT NULL,
  stage text NOT NULL DEFAULT 'setup',
  active_section integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '14 days')
);

-- Enable RLS
ALTER TABLE public.saved_profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (no auth required - public tool)
CREATE POLICY "Anyone can save a profile" ON public.saved_profiles FOR INSERT WITH CHECK (true);

-- Anyone can read by access code (the edge function handles code verification)
CREATE POLICY "Anyone can read profiles by code" ON public.saved_profiles FOR SELECT USING (true);

-- Anyone can update their profile (matched by access code in app logic)
CREATE POLICY "Anyone can update profiles" ON public.saved_profiles FOR UPDATE USING (true);

-- Auto-delete expired profiles via a cron-compatible function
CREATE OR REPLACE FUNCTION public.cleanup_expired_profiles()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.saved_profiles WHERE expires_at < now();
END;
$$;

-- Create index on access_code for fast lookups
CREATE INDEX idx_saved_profiles_access_code ON public.saved_profiles (access_code);

-- Create index on expires_at for cleanup
CREATE INDEX idx_saved_profiles_expires_at ON public.saved_profiles (expires_at);
