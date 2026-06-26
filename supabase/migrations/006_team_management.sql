-- ============================================================
-- 006_team_management.sql
-- Team Management System: Captaincy, Invite Codes, and Status
-- ============================================================

-- 1. เพิ่มฟิลด์สำหรับระบบกัปตันและการเชิญในตาราง teams
ALTER TABLE public.teams 
ADD COLUMN IF NOT EXISTS captain_id UUID REFERENCES public.players(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS invite_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'incomplete' CHECK (status IN ('incomplete', 'ready', 'approved'));

-- 2. สร้าง Trigger สุ่ม Invite Code อัตโนมัติเมื่อสร้างทีม
CREATE OR REPLACE FUNCTION public.generate_team_invite_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invite_code IS NULL THEN
    -- สุ่ม Code 6 หลัก (ตัวอักษร + ตัวเลข)
    NEW.invite_code := upper(substring(md5(random()::text) from 1 for 6));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_generate_invite_code ON public.teams;
CREATE TRIGGER trigger_generate_invite_code
BEFORE INSERT ON public.teams
FOR EACH ROW EXECUTE FUNCTION public.generate_team_invite_code();

-- 3. อัปเดต RLS สำหรับ Teams
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- ทุกคนดูทีมได้
CREATE POLICY "Public teams are viewable by everyone" 
ON public.teams FOR SELECT 
USING (true);

-- ผู้เล่นที่ผ่านการอนุมัติแล้วสามารถสร้างทีมได้
CREATE POLICY "Verified players can insert teams"
ON public.teams FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND registration_status = 'verified'
  )
);

-- กัปตันทีมแก้ไขข้อมูลทีมตัวเองได้
CREATE POLICY "Captains can update their teams" 
ON public.teams FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.players 
    WHERE players.id = teams.captain_id AND players.profile_id = auth.uid()
  )
);

-- Admin จัดการทีมได้ทั้งหมด
CREATE POLICY "Admins can manage all teams"
ON public.teams FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);
