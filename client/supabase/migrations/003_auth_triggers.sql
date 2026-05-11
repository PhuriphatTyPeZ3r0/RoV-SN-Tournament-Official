-- ============================================================
-- 003_auth_triggers.sql
-- Auto-create profile row when a new user signs up via Supabase Auth
-- ============================================================

-- Function: extract username from auth metadata and insert into profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER          -- Runs with table owner privileges to bypass RLS
SET search_path = public  -- Prevent search_path injection
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, role)
  VALUES (
    NEW.id,
    -- Priority: raw_user_meta_data.username → email prefix → UUID fallback
    COALESCE(
      NEW.raw_user_meta_data ->> 'username',
      SPLIT_PART(NEW.email, '@', 1),
      NEW.id::TEXT
    ),
    'viewer'  -- Default role — admin must be promoted manually
  );
  RETURN NEW;
END;
$$;

-- Trigger: fire after every new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- Optional: cleanup profile when auth user is deleted
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_user_deleted()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- CASCADE on FK จะจัดการ profile ให้อัตโนมัติ
  -- แต่ Trigger นี้ไว้สำหรับ cleanup logic เพิ่มเติมในอนาคต (เช่น ลบ Storage files)
  DELETE FROM public.profiles WHERE id = OLD.id;
  RETURN OLD;
END;
$$;

CREATE TRIGGER on_auth_user_deleted
  BEFORE DELETE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_deleted();
