-- Create or replace the function to sync profile claims to auth.users raw_app_meta_data
CREATE OR REPLACE FUNCTION public.sync_profile_claims_to_auth()
RETURNS trigger AS $$
DECLARE
  current_meta jsonb;
BEGIN
  -- Fetch the current raw_app_meta_data from auth.users
  SELECT raw_app_meta_data INTO current_meta
  FROM auth.users
  WHERE id = NEW.id;

  -- Merge new claims into the existing raw_app_meta_data
  UPDATE auth.users
  SET raw_app_meta_data = 
    coalesce(current_meta, '{}'::jsonb) || 
    jsonb_build_object(
      'role', NEW.role,
      'is_profile_complete', NEW.is_profile_complete,
      'registration_status', NEW.registration_status,
      'otp_enabled', NEW.otp_enabled
    )
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger for when a profile is updated or inserted
DROP TRIGGER IF EXISTS on_profile_role_update ON public.profiles;

CREATE TRIGGER on_profile_role_update
  AFTER INSERT OR UPDATE OF role, is_profile_complete, registration_status, otp_enabled ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_profile_claims_to_auth();

-- Backfill: Sync all existing profiles' roles into auth.users raw_app_meta_data
UPDATE auth.users u
SET raw_app_meta_data = 
  coalesce(u.raw_app_meta_data, '{}'::jsonb) || 
  jsonb_build_object(
    'role', p.role,
    'is_profile_complete', p.is_profile_complete,
    'registration_status', p.registration_status,
    'otp_enabled', p.otp_enabled
  )
FROM public.profiles p
WHERE u.id = p.id;
