
-- Drop overly restrictive policies that block signed URL uploads
DROP POLICY IF EXISTS "No public insert on admin uploads" ON storage.objects;
DROP POLICY IF EXISTS "No public read on admin uploads" ON storage.objects;
DROP POLICY IF EXISTS "No public delete on admin uploads" ON storage.objects;

-- Signed URLs handle auth themselves, so we just need permissive policies scoped to the bucket
-- The edge function creates signed URLs using service role, so uploads via signed URL will work
-- No unauthenticated direct access is possible without a valid signed URL token
