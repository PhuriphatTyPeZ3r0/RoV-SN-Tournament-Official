'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Team Management Server Actions
 * Based on Senior SA blueprint for RoV SN Tournament
 */

async function getPlayerProfile(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: player, error } = await supabase
    .from('players')
    .select('*, profiles(registration_status)')
    .eq('profile_id', user.id)
    .single()

  if (error || !player) return null
  return player
}

export async function createTeamAction(name: string, logoUrl?: string) {
  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player) {
    return { error: "ไม่พบข้อมูลผู้เล่น กรุณารอการอนุมัติใบสมัคร" }
  }

  if (player.team_id) {
    return { error: "คุณมีทีมอยู่แล้ว ไม่สามารถสร้างทีมใหม่ได้" }
  }

  // 1. สร้างทีมใหม่
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .insert({
      name,
      logo_url: logoUrl,
      captain_id: player.id,
      status: 'incomplete'
    })
    .select()
    .single()

  if (teamError) {
    if (teamError.code === '23505') return { error: "ชื่อทีมนี้ถูกใช้ไปแล้ว" }
    return { error: teamError.message }
  }

  // 2. อัปเดตตัวผู้เล่นให้เข้าทีมใหม่
  const { error: playerUpdateError } = await supabase
    .from('players')
    .update({ team_id: team.id })
    .eq('id', player.id)

  if (playerUpdateError) {
    // Cleanup if possible, but RLS might prevent deleting if not admin
    return { error: "สร้างทีมสำเร็จ แต่ไม่สามารถเพิ่มคุณเข้าทีมได้ กรุณาติดต่อแอดมิน" }
  }

  revalidatePath('/team')
  return { success: true, teamId: team.id }
}

export async function joinTeamAction(inviteCode: string) {
  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player) {
    return { error: "ไม่พบข้อมูลผู้เล่น กรุณารอการอนุมัติใบสมัคร" }
  }

  if (player.team_id) {
    return { error: "คุณมีทีมอยู่แล้ว กรุณาออกจากทีมเดิมก่อนเข้าร่วมทีมใหม่" }
  }

  // 1. ค้นหาทีมจาก Invite Code
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('id, name')
    .eq('invite_code', inviteCode.toUpperCase())
    .single()

  if (teamError || !team) {
    return { error: "รหัสเชิญไม่ถูกต้อง หรือทีมนี้ไม่มีอยู่จริง" }
  }

  // 2. ตรวจสอบจำนวนสมาชิก (จำกัด 6 คน: 5 ตัวจริง + 1 สำรอง)
  const { count, error: countError } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true })
    .eq('team_id', team.id)

  if (countError) return { error: countError.message }
  if (count && count >= 6) {
    return { error: "ทีมนี้มีสมาชิกเต็มแล้ว (สูงสุด 6 คน)" }
  }

  // 3. อัปเดตตัวผู้เล่นให้เข้าทีม
  const { error: updateError } = await supabase
    .from('players')
    .update({ team_id: team.id })
    .eq('id', player.id)

  if (updateError) return { error: updateError.message }

  revalidatePath('/team')
  return { success: true, teamName: team.name }
}

export async function leaveTeamAction() {
  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player || !player.team_id) {
    return { error: "คุณไม่ได้อยู่ในทีมใดๆ" }
  }

  // ตรวจสอบว่าเป็นกัปตันหรือไม่
  const { data: team } = await supabase
    .from('teams')
    .select('captain_id')
    .eq('id', player.team_id)
    .single()

  if (team && team.captain_id === player.id) {
    return { error: "กัปตันทีมไม่สามารถออกจากทีมได้ กรุณาแต่งตั้งกัปตันใหม่หรือยุบทีม" }
  }

  const { error } = await supabase
    .from('players')
    .update({ team_id: null })
    .eq('id', player.id)

  if (error) return { error: error.message }

  revalidatePath('/team')
  return { success: true }
}

export async function getMyTeamData() {
  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player || !player.team_id) return null

  const { data: team, error } = await supabase
    .from('teams')
    .select(`
      *,
      members:players(*)
    `)
    .eq('id', player.team_id)
    .single()

  if (error) return null
  return { ...team, currentPlayerId: player.id }
}

export async function kickPlayerAction(playerId: string) {
  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player || !player.team_id) return { error: "Unauthorized" }

  // ตรวจสอบความเป็นกัปตัน
  const { data: team } = await supabase
    .from('teams')
    .select('captain_id')
    .eq('id', player.team_id)
    .single()

  if (!team || team.captain_id !== player.id) {
    return { error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถคัดสมาชิกออกได้" }
  }

  if (playerId === player.id) {
    return { error: "คุณไม่สามารถคัดตัวเองออกจากทีมได้" }
  }

  const { error } = await supabase
    .from('players')
    .update({ team_id: null })
    .eq('id', playerId)
    .eq('team_id', player.team_id) // ตรวจสอบว่ายังอยู่ในทีมเดียวกัน

  if (error) return { error: error.message }

  revalidatePath('/team')
  return { success: true }
}

export async function getAllTeamsAction() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('teams')
    .select(`
      *,
      members:players(*)
    `)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching all teams:', error)
    return []
  }

  return data
}

export async function updateTeamStatusAction(teamId: string, status: 'incomplete' | 'ready' | 'approved') {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('teams')
    .update({ status })
    .eq('id', teamId)

  if (error) return { error: error.message }

  revalidatePath('/admin/teams')
  return { success: true }
}
