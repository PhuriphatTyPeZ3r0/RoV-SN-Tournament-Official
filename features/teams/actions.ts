'use server'

import { revalidatePath } from 'next/cache'
import { rosterFetch } from '@/lib/microservices/rosterServiceClient'

/**
 * Team Management Server Actions
 *
 * experiment/microservices-k8s: these are now thin wrappers around
 * roster-svc (see services/roster-svc) instead of calling Supabase
 * directly. Function names/signatures are unchanged so callers
 * (app/(public)/team/page.tsx, app/(public)/student-info/page.tsx,
 * app/admin/teams/page.tsx) don't need to change.
 */

type ActionResult = { error?: string; success?: boolean; [key: string]: any }

function ok(result: ActionResult) {
  return !result?.error
}

export async function createTeamAction(name: string, logoUrl?: string) {
  const result = await rosterFetch<ActionResult>('/teams', {
    method: 'POST',
    body: JSON.stringify({ name, logoUrl }),
  })
  if (ok(result)) revalidatePath('/team')
  return result
}

export async function joinTeamAction(inviteCode: string) {
  const result = await rosterFetch<ActionResult>('/teams/join', {
    method: 'POST',
    body: JSON.stringify({ inviteCode }),
  })
  if (ok(result)) revalidatePath('/team')
  return result
}

export async function leaveTeamAction() {
  const result = await rosterFetch<ActionResult>('/teams/leave', { method: 'POST' })
  if (ok(result)) revalidatePath('/team')
  return result
}

export async function getMyTeamData() {
  return rosterFetch<any>('/teams/me')
}

export async function kickPlayerAction(playerId: string) {
  const result = await rosterFetch<ActionResult>('/teams/kick', {
    method: 'POST',
    body: JSON.stringify({ playerId }),
  })
  if (ok(result)) revalidatePath('/team')
  return result
}

export async function getAllTeamsAction() {
  return rosterFetch<any>('/teams')
}

export async function updateTeamStatusAction(teamId: string, status: 'incomplete' | 'ready' | 'approved') {
  const result = await rosterFetch<ActionResult>(`/teams/${teamId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
  if (ok(result)) revalidatePath('/admin/teams')
  return result
}

export async function updateTeamInfoAction(payload: { name: string; description: string | null; logoUrl: string | null }) {
  const result = await rosterFetch<ActionResult>('/teams/me', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
  if (ok(result)) revalidatePath('/team')
  return result
}

export async function updatePlayerLineupRoleAction(payload: { playerId: string; lineupRole: 'dark_slayer' | 'abyssal_dragon' | 'mid_lane' | 'jungle' | 'support' | 'substitute' | null }) {
  const result = await rosterFetch<ActionResult>('/teams/me/lineup-role', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
  if (ok(result)) revalidatePath('/team')
  return result
}

export async function toggleRecruitmentAction() {
  const result = await rosterFetch<ActionResult>('/teams/me/recruitment/toggle', { method: 'POST' })
  if (ok(result)) revalidatePath('/team')
  return result
}

export async function regenerateInviteCodeAction() {
  const result = await rosterFetch<ActionResult>('/teams/me/invite-code/regenerate', { method: 'POST' })
  if (ok(result)) revalidatePath('/team')
  return result
}

export async function toggleTeamReadyAction(targetStatus: 'ready' | 'incomplete') {
  const result = await rosterFetch<ActionResult>('/teams/me/ready', {
    method: 'POST',
    body: JSON.stringify({ targetStatus }),
  })
  if (ok(result)) revalidatePath('/team')
  return result
}

export async function updateTeamContactInfoAction(payload: { contactPhone: string | null; contactLine: string | null; contactDiscord: string | null }) {
  const result = await rosterFetch<ActionResult>('/teams/me/contact', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
  if (ok(result)) revalidatePath('/team')
  return result
}

export async function updatePlayerPersonalDetailsAction(payload: { nickname: string | null; phone: string | null; topHeroes: string[] }) {
  const result = await rosterFetch<ActionResult>('/players/me/personal-details', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
  if (ok(result)) revalidatePath('/team')
  return result
}

export async function updateGamingProfileAction(payload: {
  currentRank: string | null;
  lineupRole?: string | null;
  secondaryRole: string | null;
  topHeroes: string[];
  experienceBio: string | null;
  nickname?: string | null;
  phone?: string | null;
}) {
  const result = await rosterFetch<ActionResult>('/players/me/gaming-profile', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
  if (ok(result)) {
    revalidatePath('/student-info')
    revalidatePath('/team')
  }
  return result
}

export async function getAllTeamsWithSeasonsAction(): Promise<{ teams: any[]; tournaments: any[] }> {
  return rosterFetch<any>('/teams/with-seasons')
}
