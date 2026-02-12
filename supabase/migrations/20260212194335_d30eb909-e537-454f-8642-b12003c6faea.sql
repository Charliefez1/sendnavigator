-- Create page_views table for anonymous analytics
CREATE TABLE public.page_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL,
  referrer text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a page view
CREATE POLICY "Anyone can log page views"
ON public.page_views
FOR INSERT
WITH CHECK (true);

-- No public read
CREATE POLICY "No public read on page views"
ON public.page_views
FOR SELECT
USING (false);
