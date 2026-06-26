-- ============================================================
-- 017_verification_docs_bucket.sql
-- Setup verification-docs bucket and policies using Supabase storage RPCs
-- ============================================================

-- Create the verification-docs bucket if it does not exist
-- Using a DO block to catch errors if bucket creation fails or exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'verification-docs') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'verification-docs',
      'verification-docs',
      true, -- set to true because publicUrl is used in the frontend
      5242880, -- 5MB limit
      '{"image/png", "image/jpeg", "image/webp", "image/gif"}'
    );
  END IF;
END $$;

-- Drop old policies if they exist to avoid duplication
DROP POLICY IF EXISTS "Allow authenticated uploads to verification-docs" ON storage.objects;
DROP POLICY IF EXISTS "Allow owner and admin to read verification-docs" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read of verification docs" ON storage.objects;

-- Allow authenticated users to upload files to verification-docs bucket
CREATE POLICY "Allow authenticated uploads to verification-docs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'verification-docs'
);

-- Allow public read of verification docs since public URL is used
CREATE POLICY "Allow public read of verification docs"
ON storage.objects FOR SELECT
TO public
USING (
  bucket_id = 'verification-docs'
);
