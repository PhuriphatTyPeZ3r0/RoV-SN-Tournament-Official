-- ============================================================
-- 008_fix_profiles_rls.sql
-- Fix infinite recursion in profiles_admin_all policy
-- ============================================================

-- Drop the recursive policy
DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;

-- Create separate policies for UPDATE and DELETE to avoid recursing on SELECT
CREATE POLICY "profiles_admin_update"
  ON public.profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "profiles_admin_delete"
  ON public.profiles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
