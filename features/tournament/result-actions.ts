'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { checkRole } from '@/utils/auth'

/**
 * Match Results & Game Stats Server Actions
 * Handles updating match scores and detailed player stats
 */

async function requireAdmin() {
  const { user } = await checkRole(['admin', 'super_admin']);
  const supabase = await createClient();
  return { supabase, user }
}

export async function updateMatchResultAction(matchId: string, resultData: {
  scoreBlue: number;
  scoreRed: number;
  winner: string;
  isByeWin?: boolean;
  mvp?: string;
}) {
  const { supabase } = await requireAdmin()

  // Determine loser
  const { data: match } = await supabase
    .from('matches')
    .select('team_blue_name, team_red_name')
    .eq('id', matchId)
    .single()

  if (!match) throw new Error('Match not found')

  let loser = ''
  if (resultData.winner === match.team_blue_name) {
    loser = match.team_red_name
  } else if (resultData.winner === match.team_red_name) {
    loser = match.team_blue_name
  }

  const { error } = await supabase
    .from('matches')
    .update({
      score_blue: resultData.scoreBlue,
      score_red: resultData.scoreRed,
      winner_name: resultData.winner,
      loser_name: loser,
      is_bye_win: resultData.isByeWin || false,
      mvp_player: resultData.mvp || null,
    })
    .eq('id', matchId)

  if (error) throw new Error(error.message)

  revalidatePath('/standings')
  revalidatePath('/fixtures')
  revalidatePath('/admin/results')
  revalidatePath('/')
  
  return { success: true }
}

interface PlayerStatInput {
  name: string;
  hero: string;
  k: number;
  d: number;
  a: number;
}

export async function saveGameStatsAction(matchId: string, stats: {
  gameNumber: number;
  blueTeam: string;
  redTeam: string;
  winner: 'blue' | 'red';
  mvp: string;
  duration: string; // HH:MM or MM:SS
  blueStats: PlayerStatInput[];
  redStats: PlayerStatInput[];
}) {
  const { supabase } = await requireAdmin()

  // 1. Clear existing stats for this game of this match
  await supabase
    .from('game_stats')
    .delete()
    .eq('match_id', matchId)
    .eq('game_number', stats.gameNumber)

  // 2. Parse duration
  let durationSeconds = 0
  if (stats.duration) {
    const parts = stats.duration.split(':')
    if (parts.length === 2) {
      durationSeconds = parseInt(parts[0]) * 60 + parseInt(parts[1])
    }
  }

  const rows: any[] = []
  const isBlueWin = stats.winner === 'blue'

  // Blue Stats
  for (const p of stats.blueStats) {
    if (!p.name) continue
    rows.push({
      match_id: matchId,
      game_number: stats.gameNumber,
      team_name: stats.blueTeam,
      player_name: p.name,
      hero_name: p.hero,
      kills: p.k || 0,
      deaths: p.d || 0,
      assists: p.a || 0,
      mvp: stats.mvp === p.name,
      game_duration: durationSeconds,
      win: isBlueWin,
    })
  }

  // Red Stats
  for (const p of stats.redStats) {
    if (!p.name) continue
    rows.push({
      match_id: matchId,
      game_number: stats.gameNumber,
      team_name: stats.redTeam,
      player_name: p.name,
      hero_name: p.hero,
      kills: p.k || 0,
      deaths: p.d || 0,
      assists: p.a || 0,
      mvp: stats.mvp === p.name,
      game_duration: durationSeconds,
      win: !isBlueWin,
    })
  }

  if (rows.length > 0) {
    const { error } = await supabase.from('game_stats').insert(rows)
    if (error) throw new Error(error.message)
  }

  // 3. Update match_games table for duration/winner
  await supabase
    .from('match_games')
    .upsert({
      match_id: matchId,
      game_number: stats.gameNumber,
      winner_name: stats.winner === 'blue' ? stats.blueTeam : stats.redTeam,
      duration: durationSeconds
    }, { onConflict: 'match_id, game_number' })

  revalidatePath('/stats')
  revalidatePath('/stats/player')
  revalidatePath('/stats/team')
  revalidatePath('/admin/results')

  return { success: true }
}

export async function getMatchStatsAction(matchId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('game_stats')
    .select('*')
    .eq('match_id', matchId)
    .order('game_number', { ascending: true })

  if (error) return []
  return data
}
