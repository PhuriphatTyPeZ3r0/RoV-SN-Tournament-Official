'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { checkRole } from '@/utils/auth'

/**
 * Matchmaking & Draw Server Actions
 * Based on Tournament Matchmaking Blueprint
 */

async function requireAdmin() {
  const { user } = await checkRole(['admin', 'super_admin']);
  const supabase = await createClient();
  return { supabase, user }
}

export async function getReadyTeamsAction() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('teams')
    .select('id, name, logo_url, status')
    .eq('status', 'ready') // ดึงเฉพาะทีมที่พร้อม

  if (error) {
    console.error('Error fetching ready teams:', error)
    return []
  }

  return data
}

export async function generateDrawAction(tournamentId: string, matchDay: number) {
  const { supabase } = await requireAdmin()

  // 1. ดึงทีมที่พร้อมแข่งขัน
  const { data: teams, error: teamsError } = await supabase
    .from('teams')
    .select('id, name')
    .eq('status', 'ready')

  if (teamsError) throw new Error(teamsError.message)
  if (!teams || teams.length < 2) throw new Error('ต้องการอย่างน้อย 2 ทีมเพื่อจัดสายการแข่งขัน')

  // 2. Algorithm: Shuffle Teams (Fisher-Yates)
  const shuffledTeams = [...teams]
  for (let i = shuffledTeams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledTeams[i], shuffledTeams[j]] = [shuffledTeams[j], shuffledTeams[i]]
  }

  // 3. Pairing
  const matches = []
  for (let i = 0; i < shuffledTeams.length; i += 2) {
    // กรณีทีมคี่: ทีมสุดท้ายจะได้ Bye หรือถ้าจัดแบบ Round Robin ต้องใช้ Logic อื่น
    // ในที่นี้จัดแบบคู่ Blue vs Red (ถ้าคี่ ทีมสุดท้ายจะไม่มีคู่ - อาจจะแจ้งเตือนหรือให้ Bye)
    if (i + 1 < shuffledTeams.length) {
      const teamBlue = shuffledTeams[i]
      const teamRed = shuffledTeams[i+1]
      const matchKey = `Day${matchDay}_${teamBlue.name}_vs_${teamRed.name}`.replace(/\s+/g, '')

      matches.push({
        tournament_id: tournamentId,
        match_key: matchKey,
        match_day: matchDay,
        team_blue_id: teamBlue.id,
        team_red_id: teamRed.id,
        team_blue_name: teamBlue.name,
        team_red_name: teamRed.name,
        score_blue: 0,
        score_red: 0,
      })
    } else {
      // Bye Win Logic (Optional)
      const teamBlue = shuffledTeams[i]
      const matchKey = `Day${matchDay}_${teamBlue.name}_Bye`.replace(/\s+/g, '')
      matches.push({
        tournament_id: tournamentId,
        match_key: matchKey,
        match_day: matchDay,
        team_blue_id: teamBlue.id,
        team_blue_name: teamBlue.name,
        team_red_name: 'BYE',
        score_blue: 1, // Auto win
        score_red: 0,
        winner_name: teamBlue.name,
        is_bye_win: true
      })
    }
  }

  // 4. Insert matches
  const { error: insertError } = await supabase
    .from('matches')
    .insert(matches)

  if (insertError) throw new Error(`Failed to generate matches: ${insertError.message}`)

  revalidatePath('/admin/draw')
  revalidatePath('/fixtures')
  return { success: true, count: matches.length }
}

export async function clearDrawAction(tournamentId: string, matchDay: number) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from('matches')
    .delete()
    .eq('tournament_id', tournamentId)
    .eq('match_day', matchDay)

  if (error) throw new Error(`Failed to clear draw: ${error.message}`)

  revalidatePath('/admin/draw')
  revalidatePath('/fixtures')
  return { success: true }
}

export async function getMatchesByDayAction(tournamentId: string, matchDay: number) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('tournament_id', tournamentId)
    .eq('match_day', matchDay)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching matches by day:', error)
    return []
  }

  return data
}

export async function getActiveTournamentsAction() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('tournaments')
    .select('id, name, season')
    .eq('status', 'active')

  if (error) {
    console.error('Error fetching tournaments:', error)
    return []
  }

  return data
}
