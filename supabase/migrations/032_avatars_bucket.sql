-- ============================================================
-- 032_avatars_bucket.sql
-- Setup avatars bucket and policies using Supabase storage RPCs
-- ============================================================

-- Create the avatars bucket if it does not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'avatars') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'avatars',
      'avatars',
      true, -- public bucket because avatar needs to be visible to all users
      2097152, -- 2MB limit
      '{"image/png", "image/jpeg", "image/webp", "image/gif"}'
    );
  END IF;
END $$;

-- Drop old policies if they exist to avoid duplication
DROP POLICY IF EXISTS "Allow authenticated uploads to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read of avatars" ON storage.objects;

-- Allow authenticated users to upload files to avatars bucket
CREATE POLICY "Allow authenticated uploads to avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars'
);

-- Allow public read of avatars since public URL is used in frontend
CREATE POLICY "Allow public read of avatars"
ON storage.objects FOR SELECT
TO public
USING (
  bucket_id = 'avatars'
);
