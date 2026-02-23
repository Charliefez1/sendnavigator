
-- Create content_updates table
CREATE TABLE public.content_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL DEFAULT 'manual',
  source_name TEXT,
  raw_content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE,
  result_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_updates ENABLE ROW LEVEL SECURITY;

-- Only service role can insert/update (edge functions use service role)
-- No public access at all
CREATE POLICY "No public access to content_updates"
  ON public.content_updates
  FOR SELECT
  USING (false);

-- Create page_update_flags table
CREATE TABLE public.page_update_flags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  flag_reason TEXT NOT NULL,
  content_update_id UUID REFERENCES public.content_updates(id),
  status TEXT NOT NULL DEFAULT 'stale',
  flagged_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_update_flags ENABLE ROW LEVEL SECURITY;

-- No public access
CREATE POLICY "No public access to page_update_flags"
  ON public.page_update_flags
  FOR SELECT
  USING (false);
