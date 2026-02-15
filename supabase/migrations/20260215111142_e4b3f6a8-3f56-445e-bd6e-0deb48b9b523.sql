
-- Create news_items table for automated SEND news tracking
CREATE TABLE public.news_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  url TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_domain TEXT,
  topic TEXT NOT NULL DEFAULT 'send_reform',
  published_at TIMESTAMP WITH TIME ZONE,
  discovered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'published',
  hidden_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_news_url UNIQUE (url)
);

-- Enable RLS
ALTER TABLE public.news_items ENABLE ROW LEVEL SECURITY;

-- Public can read published items
CREATE POLICY "Public can read published news" 
ON public.news_items 
FOR SELECT 
USING (status = 'published');

-- No public insert/update/delete
-- Admin operations go through edge function with service role

-- Index for fast lookups
CREATE INDEX idx_news_items_status_discovered ON public.news_items (status, discovered_at DESC);
CREATE INDEX idx_news_items_topic ON public.news_items (topic);

-- Trigger for updated_at
CREATE TRIGGER update_news_items_updated_at
BEFORE UPDATE ON public.news_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
