-- Block public SELECT on contact_submissions (only service role via edge functions should read)
CREATE POLICY "No public read access on contact submissions"
ON public.contact_submissions
FOR SELECT
USING (false);
