
-- Create storage bucket for admin document uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('admin-uploads', 'admin-uploads', false);

-- Only allow authenticated uploads (admin will use service role via edge function)
-- No public access
CREATE POLICY "No public read on admin uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'admin-uploads' AND false);

CREATE POLICY "No public insert on admin uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'admin-uploads' AND false);

CREATE POLICY "No public delete on admin uploads"
ON storage.objects FOR DELETE
USING (bucket_id = 'admin-uploads' AND false);
