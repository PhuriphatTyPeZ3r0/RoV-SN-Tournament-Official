-- ============================================================
-- 040_backfill_profile_oauth_metadata.sql
-- Backfill email, full_name, and avatar_url for existing profiles
-- using metadata stored in auth.users
-- ============================================================

UPDATE public.profiles
SET 
  email = COALESCE(profiles.email, users.email),
  full_name = COALESCE(profiles.full_name, users.raw_user_meta_data ->> 'full_name', users.raw_user_meta_data ->> 'name'),
  avatar_url = COALESCE(profiles.avatar_url, users.raw_user_meta_data ->> 'avatar_url', users.raw_user_meta_data ->> 'picture')
FROM auth.users as users
WHERE profiles.id = users.id 
  AND (profiles.email IS NULL OR profiles.full_name IS NULL OR profiles.avatar_url IS NULL);
