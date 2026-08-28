'use server';

import { revalidatePath } from 'next/cache';
import { tournamentFetch } from '@/lib/microservices/tournamentServiceClient';

/**
 * Tournament Core Server Actions
 *
 * experiment/microservices-k8s: thin wrappers around tournament-svc (see
 * services/tournament-svc). Function names/signatures are unchanged so
 * callers (app/admin/history, app/admin/results, app/admin/themes) don't
 * need to change.
 *
 * Dropped: getMatchByKeyAction, getScheduleAction, saveMatchResultAction,
 * deleteMatchResultAction, resetDayResultsAction, saveScheduleAction — all
 * confirmed dead (0 callers in app/ or components/) as of this rewrite.
 * The live saveGameStatsAction/getMatchStatsAction that shadowed these
 * names live in result-actions.ts, not here.
 */

export async function getMatchesAction(tournamentId: string) {
  return tournamentFetch<any>(`/matches/${tournamentId}`);
}

export async function getResultHistoryAction(_matchKey?: string) {
  return tournamentFetch<any>('/results/history');
}

export async function getTournamentsAction(): Promise<any[]> {
  return tournamentFetch<any>('/tournaments');
}

export async function updateTournamentThemeAction(tournamentId: string, themeStyle: string) {
  const data = await tournamentFetch<any>(`/tournaments/${tournamentId}/theme`, {
    method: 'PATCH',
    body: JSON.stringify({ themeStyle }),
  });
  revalidatePath('/', 'layout');
  revalidatePath('/admin/themes');
  return data;
}

export async function getThemesAction() {
  return tournamentFetch<any>('/themes');
}

export async function createThemeAction(themeData: {
  id: string;
  name: string;
  description?: string | null;
  primary_color: string;
  secondary_color: string;
  bg_deep: string;
  bg_surface: string;
  primary_light: string;
  primary_dark: string;
}) {
  const data = await tournamentFetch<any>('/themes', {
    method: 'POST',
    body: JSON.stringify(themeData),
  });
  revalidatePath('/', 'layout');
  revalidatePath('/admin/themes');
  return data;
}

export async function updateThemeAction(
  themeId: string,
  themeData: {
    name: string;
    description?: string | null;
    primary_color: string;
    secondary_color: string;
    bg_deep: string;
    bg_surface: string;
    primary_light: string;
    primary_dark: string;
  },
) {
  const data = await tournamentFetch<any>(`/themes/${themeId}`, {
    method: 'PATCH',
    body: JSON.stringify(themeData),
  });
  revalidatePath('/', 'layout');
  revalidatePath('/admin/themes');
  return data;
}

export async function deleteThemeAction(themeId: string) {
  const data = await tournamentFetch<any>(`/themes/${themeId}`, { method: 'DELETE' });
  revalidatePath('/', 'layout');
  revalidatePath('/admin/themes');
  return data;
}
