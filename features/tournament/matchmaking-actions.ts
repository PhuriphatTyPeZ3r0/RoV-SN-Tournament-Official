'use server'

import { revalidatePath } from 'next/cache'
import { tournamentFetch } from '@/lib/microservices/tournamentServiceClient'

/**
 * Matchmaking & Draw Server Actions
 *
 * experiment/microservices-k8s: thin wrappers around tournament-svc.
 * Signatures unchanged — app/admin/draw/page.tsx needs no changes.
 */

export async function getReadyTeamsAction() {
  return tournamentFetch<any>('/teams/ready')
}

export async function generateDrawAction(tournamentId: string, matchDay: number) {
  const data = await tournamentFetch<{ success: boolean; count: number }>('/draw/generate', {
    method: 'POST',
    body: JSON.stringify({ tournamentId, matchDay }),
  })
  revalidatePath('/admin/draw')
  revalidatePath('/fixtures')
  return data
}

export async function clearDrawAction(tournamentId: string, matchDay: number) {
  const data = await tournamentFetch<{ success: boolean }>('/draw/clear', {
    method: 'POST',
    body: JSON.stringify({ tournamentId, matchDay }),
  })
  revalidatePath('/admin/draw')
  revalidatePath('/fixtures')
  return data
}

export async function getMatchesByDayAction(tournamentId: string, matchDay: number) {
  return tournamentFetch<any>(`/matches/${tournamentId}/day/${matchDay}`)
}

export async function getActiveTournamentsAction() {
  return tournamentFetch<any>('/tournaments/active')
}
