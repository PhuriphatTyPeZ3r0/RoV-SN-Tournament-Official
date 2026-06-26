-- ============================================================
-- 026_add_contact_and_player_inputs.sql
-- Add contact info to teams and personal details to players
-- ============================================================

-- 1. Add contact fields to teams
ALTER TABLE public.teams
ADD COLUMN IF NOT EXISTS contact_phone TEXT,
ADD COLUMN IF NOT EXISTS contact_line TEXT,
ADD COLUMN IF NOT EXISTS contact_discord TEXT;

-- 2. Add nickname, phone, and favorite_heroes to players
ALTER TABLE public.players
ADD COLUMN IF NOT EXISTS nickname TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS favorite_heroes TEXT[] NOT NULL DEFAULT '{}';

-- 3. Add RLS policy to allow players to update their own row
-- This allows players to edit their nickname, phone, and favorite_heroes on the /team page
DROP POLICY IF EXISTS "Players can update their own row" ON public.players;

CREATE POLICY "Players can update their own row"
ON public.players FOR UPDATE
USING (auth.uid() = profile_id)
WITH CHECK (auth.uid() = profile_id);
