
-- Knowledge chunks table for RAG pipeline
CREATE TABLE public.knowledge_chunks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_name text NOT NULL,
  chunk_index integer NOT NULL,
  content text NOT NULL,
  search_vector tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- GIN index for fast full-text search
CREATE INDEX idx_knowledge_chunks_search ON public.knowledge_chunks USING GIN (search_vector);

-- Index for document filtering
CREATE INDEX idx_knowledge_chunks_document ON public.knowledge_chunks (document_name);

-- Enable RLS
ALTER TABLE public.knowledge_chunks ENABLE ROW LEVEL SECURITY;

-- Allow public read (needed by edge functions using anon key)
CREATE POLICY "Public can read knowledge chunks"
  ON public.knowledge_chunks
  FOR SELECT
  USING (true);

-- No public write
-- Edge functions will use service role key for inserts
