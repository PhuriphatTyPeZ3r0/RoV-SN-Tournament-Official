'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const updateTeamInfoSchema = z.object({
  name: z.string().min(2, "ชื่อทีมต้องมีอย่างน้อย 2 ตัวอักษร").max(50, "ชื่อทีมต้องไม่เกิน 50 ตัวอักษร"),
  description: z.string().max(200, "คำอธิบายทีมต้องไม่เกิน 200 ตัวอักษร").nullable(),
  logoUrl: z.string().nullable()
})

const updatePlayerLineupRoleSchema = z.object({
  playerId: z.string().uuid("ID ผู้เล่นไม่ถูกต้อง"),
  lineupRole: z.enum(['dark_slayer', 'abyssal_dragon', 'mid_lane', 'jungle', 'support', 'substitute']).nullable()
})

const updateTeamContactInfoSchema = z.object({
  contactPhone: z.string().max(20, "เบอร์โทรศัพท์ต้องไม่เกิน 20 ตัวอักษร").nullable(),
  contactLine: z.string().max(50, "Line ID ต้องไม่เกิน 50 ตัวอักษร").nullable(),
  contactDiscord: z.string().max(100, "ลิงก์ Discord ต้องไม่เกิน 100 ตัวอักษร").nullable()
})

const updatePlayerPersonalDetailsSchema = z.object({
  nickname: z.string().max(30, "ชื่อเล่นต้องไม่เกิน 30 ตัวอักษร").nullable(),
  phone: z.string().max(20, "เบอร์โทรศัพท์ต้องไม่เกิน 20 ตัวอักษร").nullable(),
  favoriteHeroes: z.array(z.string()).max(5, "เลือกฮีโร่โปรดได้สูงสุด 5 ตัว")
})

import { ROV_RANKS } from './constants'


const updateGamingProfileSchema = z.object({
  currentRank: z.enum(ROV_RANKS).nullable(),
  secondaryRole: z.enum(['dark_slayer', 'abyssal_dragon', 'mid_lane', 'jungle', 'support']).nullable(),
  topHeroes: z.array(z.string()).max(3, 'เลือก Hero ถนัดได้สูงสุด 3 ตัว'),
  experienceBio: z.string().max(500, 'ประสบการณ์ต้องไม่เกิน 500 ตัวอักษร').nullable(),
  nickname: z.string().max(30, "ชื่อเล่นต้องไม่เกิน 30 ตัวอักษร").nullable().optional(),
  phone: z.string().max(20, "เบอร์โทรศัพท์ต้องไม่เกิน 20 ตัวอักษร").nullable().optional(),
  favoriteHeroes: z.array(z.string()).max(5, "เลือกฮีโร่โปรดได้สูงสุด 5 ตัว").optional(),
})


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
    .select('id, name, status')
    .eq('invite_code', inviteCode.toUpperCase())
    .single()

  if (teamError || !team) {
    return { error: "รหัสเชิญไม่ถูกต้อง หรือทีมนี้ไม่มีอยู่จริง" }
  }

  // 1.5 ตรวจสอบสถานะการล็อกรายชื่อทีม
  if (team.status === 'ready' || team.status === 'approved') {
    return { error: "ทีมนี้ล็อกรายชื่อแล้ว ไม่สามารถเข้าร่วมทีมได้" }
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
    .update({ team_id: team.id, lineup_role: null }) // Reset role on joining
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

  // ตรวจสอบความเป็นกัปตันและสถานะทีม
  const { data: team } = await supabase
    .from('teams')
    .select('captain_id, status')
    .eq('id', player.team_id)
    .single()

  if (team && (team.status === 'ready' || team.status === 'approved')) {
    return { error: "ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถออกจากทีมได้" }
  }

  if (team && team.captain_id === player.id) {
    return { error: "กัปตันทีมไม่สามารถออกจากทีมได้ กรุณาแต่งตั้งกัปตันใหม่หรือยุบทีม" }
  }

  const { error } = await supabase
    .from('players')
    .update({ team_id: null, lineup_role: null }) // Reset role on leaving
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
      members:players!team_id(*)
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

  // ตรวจสอบความเป็นกัปตันและสถานะทีม
  const { data: team } = await supabase
    .from('teams')
    .select('captain_id, status')
    .eq('id', player.team_id)
    .single()

  if (!team || team.captain_id !== player.id) {
    return { error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถคัดสมาชิกออกได้" }
  }

  if (team.status === 'ready' || team.status === 'approved') {
    return { error: "ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถคัดสมาชิกออกได้" }
  }

  if (playerId === player.id) {
    return { error: "คุณไม่สามารถคัดตัวเองออกจากทีมได้" }
  }

  const { error } = await supabase
    .from('players')
    .update({ team_id: null, lineup_role: null }) // Reset role on kicking
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
      members:players!team_id(*)
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

export async function updateTeamInfoAction(payload: { name: string; description: string | null; logoUrl: string | null }) {
  const parsed = updateTeamInfoSchema.safeParse(payload)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }
  const { name, description, logoUrl } = parsed.data

  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player || !player.team_id) {
    return { error: "ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ" }
  }

  // Check if current user is captain
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('captain_id, status')
    .eq('id', player.team_id)
    .single()

  if (teamError || !team || team.captain_id !== player.id) {
    return { error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถแก้ไขข้อมูลทีมได้" }
  }

  // Check lock
  if (team.status === 'ready' || team.status === 'approved') {
    return { error: "ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถแก้ไขข้อมูลได้" }
  }

  const { error: updateError } = await supabase
    .from('teams')
    .update({ name, description, logo_url: logoUrl })
    .eq('id', player.team_id)

  if (updateError) {
    if (updateError.code === '23505') return { error: "ชื่อทีมนี้ถูกใช้ไปแล้ว" }
    return { error: updateError.message }
  }

  revalidatePath('/team')
  return { success: true }
}

export async function updatePlayerLineupRoleAction(payload: { playerId: string; lineupRole: 'dark_slayer' | 'abyssal_dragon' | 'mid_lane' | 'jungle' | 'support' | 'substitute' | null }) {
  const parsed = updatePlayerLineupRoleSchema.safeParse(payload)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }
  const { playerId, lineupRole } = parsed.data

  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player || !player.team_id) {
    return { error: "ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ" }
  }

  // Check if current user is captain
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('captain_id, status')
    .eq('id', player.team_id)
    .single()

  if (teamError || !team || team.captain_id !== player.id) {
    return { error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถจัดการตำแหน่งในทีมได้" }
  }

  // Check lock
  if (team.status === 'ready' || team.status === 'approved') {
    return { error: "ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถแก้ไขตำแหน่งได้" }
  }

  const { error: updateError } = await supabase
    .from('players')
    .update({ lineup_role: lineupRole })
    .eq('id', playerId)
    .eq('team_id', player.team_id) // Ensure updating a player in own team

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/team')
  return { success: true }
}

export async function toggleRecruitmentAction() {
  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player || !player.team_id) {
    return { error: "ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ" }
  }

  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('captain_id, status, invite_code')
    .eq('id', player.team_id)
    .single()

  if (teamError || !team || team.captain_id !== player.id) {
    return { error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถจัดการการรับสมัครได้" }
  }

  // Check lock
  if (team.status === 'ready' || team.status === 'approved') {
    return { error: "ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถแก้ไขสิทธิ์การรับสมัครได้" }
  }

  let nextInviteCode: string | null = null
  if (!team.invite_code) {
    // Generate new invite code
    nextInviteCode = Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const { error: updateError } = await supabase
    .from('teams')
    .update({ invite_code: nextInviteCode })
    .eq('id', player.team_id)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/team')
  return { success: true, isRecruiting: !!nextInviteCode }
}

export async function regenerateInviteCodeAction() {
  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player || !player.team_id) {
    return { error: "ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ" }
  }

  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('captain_id, status')
    .eq('id', player.team_id)
    .single()

  if (teamError || !team || team.captain_id !== player.id) {
    return { error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถรีเซ็ตรหัสเชิญได้" }
  }

  // Check lock
  if (team.status === 'ready' || team.status === 'approved') {
    return { error: "ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถรีเซ็ตรหัสเชิญได้" }
  }

  const newInviteCode = Math.random().toString(36).substring(2, 8).toUpperCase()

  const { error: updateError } = await supabase
    .from('teams')
    .update({ invite_code: newInviteCode })
    .eq('id', player.team_id)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/team')
  return { success: true, inviteCode: newInviteCode }
}

export async function toggleTeamReadyAction(targetStatus: 'ready' | 'incomplete') {
  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player || !player.team_id) {
    return { error: "ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ" }
  }

  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('captain_id, status')
    .eq('id', player.team_id)
    .single()

  if (teamError || !team || team.captain_id !== player.id) {
    return { error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถเปลี่ยนสถานะทีมได้" }
  }

  if (targetStatus === 'ready') {
    // 1. ตรวจสอบจำนวนสมาชิก (ต้องมีอย่างน้อย 5 คน)
    const { count, error: countError } = await supabase
      .from('players')
      .select('*', { count: 'exact', head: true })
      .eq('team_id', player.team_id)

    if (countError) return { error: countError.message }
    if (!count || count < 5) {
      return { error: "ทีมของคุณต้องมีสมาชิกอย่างน้อย 5 คนจึงจะสามารถส่งรายชื่อพร้อมแข่งขันได้" }
    }

    const { error: updateError } = await supabase
      .from('teams')
      .update({ status: 'ready' })
      .eq('id', player.team_id)

    if (updateError) return { error: updateError.message }
  } else {
    // ปลดล็อกทีมกลับเป็น incomplete
    // ตรวจสอบว่าแอดมินอนุมัติไปหรือยัง
    if (team.status === 'approved') {
      return { error: "ทีมของคุณผ่านการอนุมัติแล้ว ไม่สามารถปลดล็อกแก้ไขรายชื่อได้ กรุณาติดต่อแอดมิน" }
    }

    const { error: updateError } = await supabase
      .from('teams')
      .update({ status: 'incomplete' })
      .eq('id', player.team_id)

    if (updateError) return { error: updateError.message }
  }

  revalidatePath('/team')
  return { success: true }
}

export async function updateTeamContactInfoAction(payload: { contactPhone: string | null; contactLine: string | null; contactDiscord: string | null }) {
  const parsed = updateTeamContactInfoSchema.safeParse(payload)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }
  const { contactPhone, contactLine, contactDiscord } = parsed.data

  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player || !player.team_id) {
    return { error: "ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ" }
  }

  // Check if current user is captain
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('captain_id, status')
    .eq('id', player.team_id)
    .single()

  if (teamError || !team || team.captain_id !== player.id) {
    return { error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถแก้ไขข้อมูลการติดต่อได้" }
  }

  // Block only if fully approved
  if (team.status === 'approved') {
    return { error: "ทีมได้รับการอนุมัติเรียบร้อยแล้ว ไม่สามารถแก้ไขข้อมูลติดต่อได้ กรุณาติดต่อแอดมิน" }
  }

  const { error: updateError } = await supabase
    .from('teams')
    .update({ 
      contact_phone: contactPhone, 
      contact_line: contactLine, 
      contact_discord: contactDiscord 
    })
    .eq('id', player.team_id)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/team')
  return { success: true }
}

export async function updatePlayerPersonalDetailsAction(payload: { nickname: string | null; phone: string | null; favoriteHeroes: string[] }) {
  const parsed = updatePlayerPersonalDetailsSchema.safeParse(payload)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }
  const { nickname, phone, favoriteHeroes } = parsed.data

  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player) {
    return { error: "ไม่พบข้อมูลผู้เล่นของคุณ" }
  }

  const { error: updateError } = await supabase
    .from('players')
    .update({ 
      nickname, 
      phone, 
      favorite_heroes: favoriteHeroes 
    })
    .eq('id', player.id)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/team')
  return { success: true }
}

export async function updateGamingProfileAction(payload: {
  currentRank: string | null;
  secondaryRole: string | null;
  topHeroes: string[];
  experienceBio: string | null;
  nickname?: string | null;
  phone?: string | null;
  favoriteHeroes?: string[];
}) {
  const parsed = updateGamingProfileSchema.safeParse(payload)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }
  const { currentRank, secondaryRole, topHeroes, experienceBio, nickname, phone, favoriteHeroes } = parsed.data

  const supabase = await createClient()
  const player = await getPlayerProfile(supabase)

  if (!player) {
    return { error: 'ไม่พบข้อมูลผู้เล่นของคุณ' }
  }

  const updateData: any = {
    current_rank: currentRank,
    secondary_role: secondaryRole,
    top_heroes: topHeroes,
    experience_bio: experienceBio,
  }

  if (nickname !== undefined) updateData.nickname = nickname;
  if (phone !== undefined) updateData.phone = phone;
  if (favoriteHeroes !== undefined) updateData.favorite_heroes = favoriteHeroes;

  const { error: updateError } = await supabase
    .from('players')
    .update(updateData)
    .eq('id', player.id)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/student-info')
  revalidatePath('/team')
  return { success: true }
}
