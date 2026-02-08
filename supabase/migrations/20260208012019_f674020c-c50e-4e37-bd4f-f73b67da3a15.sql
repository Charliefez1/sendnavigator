
-- Knowledge base table for admin-managed content
CREATE TABLE public.knowledge_base (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;

-- Anyone can read active entries (needed by the AI edge function)
CREATE POLICY "Public can read active knowledge base entries"
ON public.knowledge_base
FOR SELECT
USING (status = 'active');

-- No public insert/update/delete — admin uses service role key

-- Index for quick lookups
CREATE INDEX idx_knowledge_base_status ON public.knowledge_base (status);
CREATE INDEX idx_knowledge_base_topic ON public.knowledge_base (topic);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_knowledge_base_updated_at
BEFORE UPDATE ON public.knowledge_base
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
