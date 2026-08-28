'use server'

import { revalidatePath } from 'next/cache'
import { tournamentFetch } from '@/lib/microservices/tournamentServiceClient'

/**
 * Match Results & Game Stats Server Actions
 *
 * experiment/microservices-k8s: thin wrappers around tournament-svc.
 * Signatures unchanged — app/admin/results/page.tsx needs no changes.
 */

interface PlayerStatInput {
  name: string;
  hero: string;
  k: number;
  d: number;
  a: number;
}

export async function updateMatchResultAction(matchId: string, resultData: {
  scoreBlue: number;
  scoreRed: number;
  winner: string;
  isByeWin?: boolean;
  mvp?: string;
}) {
  const data = await tournamentFetch<{ success: boolean }>(`/matches/${matchId}/result`, {
    method: 'PATCH',
    body: JSON.stringify(resultData),
  })
  revalidatePath('/standings')
  revalidatePath('/fixtures')
  revalidatePath('/admin/results')
  revalidatePath('/')
  return data
}

export async function saveGameStatsAction(matchId: string, stats: {
  gameNumber: number;
  blueTeam: string;
  redTeam: string;
  winner: 'blue' | 'red';
  mvp: string;
  duration: string;
  blueStats: PlayerStatInput[];
  redStats: PlayerStatInput[];
}) {
  const data = await tournamentFetch<{ success: boolean }>(`/matches/${matchId}/stats`, {
    method: 'POST',
    body: JSON.stringify(stats),
  })
  revalidatePath('/stats')
  revalidatePath('/stats/player')
  revalidatePath('/stats/team')
  revalidatePath('/admin/results')
  return data
}

export async function getMatchStatsAction(matchId: string) {
  return tournamentFetch<any>(`/matches/${matchId}/stats`)
}
