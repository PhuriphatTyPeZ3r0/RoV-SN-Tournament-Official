-- ============================================================
-- 030_fix_handle_registration_approval.sql
-- Fix handle_registration_approval trigger function in internal schema to map citizen_id to identity_card
-- ============================================================

CREATE OR REPLACE FUNCTION internal.handle_registration_approval()
RETURNS TRIGGER AS $$
BEGIN
  -- If status changed to approved
  IF (TG_OP = 'UPDATE' AND NEW.status = 'approved' AND OLD.status != 'approved') THEN
    
    -- Update profile based on target_role
    UPDATE public.profiles 
    SET registration_status = 'verified',
        student_id = NEW.student_id,
        identity_card = NEW.identity_card,
        privacy_flag = NEW.privacy_flag,
        is_profile_complete = true,
        role = NEW.target_role -- Promote to target role (student or admin)
    WHERE id = NEW.user_id;

    -- If it's a student, also create a player record
    IF (NEW.target_role = 'student') THEN
      INSERT INTO public.players (profile_id, name, grade, in_game_name)
      VALUES (NEW.user_id, NEW.full_name, NEW.grade, NEW.in_game_name)
      ON CONFLICT (profile_id) DO UPDATE 
      SET name = EXCLUDED.name,
          grade = EXCLUDED.grade,
          in_game_name = EXCLUDED.in_game_name;
    END IF;
    
  ELSIF (TG_OP = 'UPDATE' AND NEW.status = 'rejected' AND OLD.status != 'rejected') THEN
    UPDATE public.profiles 
    SET registration_status = 'rejected'
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
