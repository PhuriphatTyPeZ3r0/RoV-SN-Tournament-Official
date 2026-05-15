-- ============================================================
-- 005_student_registrations.sql
-- Student Registration & Screening System
-- ============================================================

-- 1. เพิ่มสถานะการสมัครใน Profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS student_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS registration_status TEXT DEFAULT 'pending' 
CHECK (registration_status IN ('pending', 'verified', 'rejected'));

-- 2. ตารางเก็บข้อมูลการสมัครแข่ง (เพื่อการตรวจสอบ)
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  student_id TEXT NOT NULL UNIQUE,
  grade TEXT NOT NULL, -- เช่น 'M.4/1', 'Year 10'
  in_game_name TEXT NOT NULL,
  verification_doc_url TEXT, -- ลิงก์รูปบัตรนักเรียนใน Supabase Storage
  screening_notes TEXT, -- เหตุผลที่ผ่านหรือไม่ผ่าน
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  
  -- SQL Level Screening: ตรวจสอบรูปแบบ Student ID (ตัวอย่าง: ต้องเป็นตัวเลข 5 หลัก)
  CONSTRAINT valid_student_id CHECK (student_id ~ '^[0-9]{5}$')
);

-- 3. RLS Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- นักเรียนดูข้อมูลการสมัครของตัวเองได้เท่านั้น
CREATE POLICY "Students can view own registration" 
ON public.registrations FOR SELECT 
USING (auth.uid() = user_id);

-- นักเรียนสร้างการสมัครได้ครั้งเดียว (ใช้ Unique Constraint ร่วมกับ RLS)
CREATE POLICY "Students can insert own registration" 
ON public.registrations FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Admin can view all registrations
CREATE POLICY "Admins can view all registrations"
ON public.registrations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Admin can update registrations (for screening)
CREATE POLICY "Admins can update registrations"
ON public.registrations FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 4. Trigger to sync status to profile and create player on approval
CREATE OR REPLACE FUNCTION public.handle_registration_approval()
RETURNS TRIGGER AS $$
BEGIN
  -- If status changed to approved
  IF (TG_OP = 'UPDATE' AND NEW.status = 'approved' AND OLD.status != 'approved') THEN
    -- Update profile status
    UPDATE public.profiles 
    SET registration_status = 'verified',
        student_id = NEW.student_id
    WHERE id = NEW.user_id;

    -- Insert into players table if not exists
    INSERT INTO public.players (profile_id, name, grade, in_game_name)
    VALUES (NEW.user_id, NEW.full_name, NEW.grade, NEW.in_game_name)
    ON CONFLICT DO NOTHING;
    
  ELSIF (TG_OP = 'UPDATE' AND NEW.status = 'rejected' AND OLD.status != 'rejected') THEN
    -- Update profile status to rejected
    UPDATE public.profiles 
    SET registration_status = 'rejected'
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_handle_registration_approval
  AFTER UPDATE ON public.registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_registration_approval();
