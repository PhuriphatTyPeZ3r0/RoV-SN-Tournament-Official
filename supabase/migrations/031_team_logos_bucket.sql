-- ============================================================
-- 031_team_logos_bucket.sql
-- Setup team-logos bucket and policies using Supabase storage RPCs
-- ============================================================

-- Create the team-logos bucket if it does not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'team-logos') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'team-logos',
      'team-logos',
      true, -- public bucket because team logo needs to be visible to all
      2097152, -- 2MB limit
      '{"image/png", "image/jpeg", "image/webp", "image/gif"}'
    );
  END IF;
END $$;

-- Drop old policies if they exist to avoid duplication
DROP POLICY IF EXISTS "Allow authenticated uploads to team-logos" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read of team-logos" ON storage.objects;

-- Allow authenticated users to upload files to team-logos bucket
CREATE POLICY "Allow authenticated uploads to team-logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'team-logos'
);

-- Allow public read of team-logos since public URL is used in frontend
CREATE POLICY "Allow public read of team-logos"
ON storage.objects FOR SELECT
TO public
USING (
  bucket_id = 'team-logos'
);
