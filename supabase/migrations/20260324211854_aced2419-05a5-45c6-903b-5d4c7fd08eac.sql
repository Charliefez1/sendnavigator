CREATE TABLE public.waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  UNIQUE(email)
);

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist" ON public.waitlist_signups
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "No public read" ON public.waitlist_signups
  FOR SELECT TO public USING (false);
