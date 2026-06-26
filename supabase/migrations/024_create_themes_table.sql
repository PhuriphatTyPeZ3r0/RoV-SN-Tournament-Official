-- ============================================================
-- 024_create_themes_table.sql
-- Create themes table for dynamic theme configuration (CRUD)
-- ============================================================

-- 1. Create themes table
CREATE TABLE IF NOT EXISTS public.themes (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  description     TEXT,
  primary_color   TEXT NOT NULL,
  secondary_color TEXT NOT NULL,
  bg_deep         TEXT NOT NULL,
  bg_surface      TEXT NOT NULL,
  primary_light   TEXT NOT NULL,
  primary_dark    TEXT NOT NULL,
  is_preset       BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- 2. Insert Default Theme Presets
INSERT INTO public.themes (id, name, description, primary_color, secondary_color, bg_deep, bg_surface, primary_light, primary_dark, is_preset)
VALUES 
  (
    'echo', 
    'Echo of Destiny', 
    'ธีมดั้งเดิมสีฟ้าไซอันเรืองแสง ลุคโฮโลแกรมสไตล์อวกาศล้ำสมัย (Default)', 
    '#15C8FF', 
    '#E8F7FF', 
    '#0a1628', 
    '#0f1f35', 
    '#4dd9ff', 
    '#0099cc',
    TRUE
  ),
  (
    'arena', 
    'Arena Crimson', 
    'ธีมดุเดือดสีแดงเพลิงสไตล์ eSports สะท้อนพลังของนักสู้ในสนามแข่ง', 
    '#FF2E2E', 
    '#FFE5E5', 
    '#160606', 
    '#260f0f', 
    '#ff6666', 
    '#b30000',
    TRUE
  ),
  (
    'cyberpunk', 
    'Cyberpunk Neon', 
    'ธีมไซเบอร์พังก์คู่สีฟ้าชมพูเรืองแสง แนวทางสตรีทนีออนสุดล้ำและจัดจ้าน', 
    '#FF007F', 
    '#FFE5F2', 
    '#001219', 
    '#002233', 
    '#ff4da6', 
    '#cc0066',
    TRUE
  ),
  (
    'void', 
    'Void Abyssal', 
    'ธีมสีม่วงมิติมืดสไตล์ Abyssal Dragon และ Dark Slayer ลึกลับน่าเกรงขาม', 
    '#A855F7', 
    '#F3E8FF', 
    '#0B0314', 
    '#150926', 
    '#c084fc', 
    '#7e22ce',
    TRUE
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  primary_color = EXCLUDED.primary_color,
  secondary_color = EXCLUDED.secondary_color,
  bg_deep = EXCLUDED.bg_deep,
  bg_surface = EXCLUDED.bg_surface,
  primary_light = EXCLUDED.primary_light,
  primary_dark = EXCLUDED.primary_dark,
  is_preset = EXCLUDED.is_preset;

-- 3. Enable RLS on themes
ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies for themes
CREATE POLICY "themes_public_select" ON public.themes
  FOR SELECT USING (TRUE);

CREATE POLICY "themes_admin_all" ON public.themes
  FOR ALL USING (get_user_role() IN ('admin', 'super_admin'))
  WITH CHECK (get_user_role() IN ('admin', 'super_admin'));

-- 5. Drop old check constraint on tournaments theme_style and link to themes table
ALTER TABLE public.tournaments DROP CONSTRAINT IF EXISTS check_valid_theme;

-- Set default value explicitly in case it was dropped/altered
ALTER TABLE public.tournaments ALTER COLUMN theme_style SET DEFAULT 'echo';

-- Add foreign key constraint
ALTER TABLE public.tournaments DROP CONSTRAINT IF EXISTS fk_tournaments_theme;
ALTER TABLE public.tournaments 
ADD CONSTRAINT fk_tournaments_theme 
FOREIGN KEY (theme_style) 
REFERENCES public.themes(id) 
ON DELETE SET DEFAULT;
