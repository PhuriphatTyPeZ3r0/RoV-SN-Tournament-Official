-- ============================================================
-- 027_secure_verification_docs.sql
-- Restrict verification docs bucket to private and add RLS policies
-- ============================================================

-- 1. Update the bucket to be private (public = false)
UPDATE storage.buckets
SET public = false
WHERE id = 'verification-docs';

-- 2. Drop old policies if they exist
DROP POLICY IF EXISTS "Allow authenticated uploads to verification-docs" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read of verification docs" ON storage.objects;
DROP POLICY IF EXISTS "Allow owner and admin to read verification-docs" ON storage.objects;
DROP POLICY IF EXISTS "Allow owner to upload to own folder" ON storage.objects;

-- 3. Create RLS Policies for private access
-- INSERT: Allow authenticated users to upload only to their own subfolder (verifications/USER_ID/filename.png)
CREATE POLICY "Allow owner to upload to own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'verification-docs' AND
  auth.uid()::text = split_part(name, '/', 2)
);

-- SELECT: Allow owner and admins/super_admins to read documents
CREATE POLICY "Allow owner and admin to read verification-docs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'verification-docs' AND (
    auth.uid()::text = split_part(name, '/', 2) OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  )
);
