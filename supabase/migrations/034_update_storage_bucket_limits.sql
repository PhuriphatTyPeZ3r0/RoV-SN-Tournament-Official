-- ============================================================
-- 034_update_storage_bucket_limits.sql
-- Update file size limits for avatars and team-logos buckets to 5MB (5242880 bytes)
-- ============================================================

UPDATE storage.buckets
SET file_size_limit = 5242880
WHERE id IN ('avatars', 'team-logos');
