'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Player & Team Server Actions
 * Replaces: playerController.ts + teamLogoController.ts + heroController.ts
 */

// ========================================
// Teams
// ========================================

export async function getTeamsAction() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw new Error(`Failed to fetch teams: ${error.message}`);
  return data;
}

export async function getTeamLogosAction(): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('teams')
    .select('name, logo_url')
    .not('logo_url', 'is', null);

  if (error) throw new Error(`Failed to fetch logos: ${error.message}`);

  const logos: Record<string, string> = {};
  for (const team of data || []) {
    if (team.name && team.logo_url) {
      logos[team.name] = team.logo_url;
    }
  }
  return logos;
}

export async function createTeamAction(name: string, logoUrl?: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('teams')
    .insert({ name, logo_url: logoUrl })
    .select()
    .single();

  if (error) throw new Error(`Failed to create team: ${error.message}`);

  revalidatePath('/clubs');
  return data;
}

export async function deleteTeamAction(teamName: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('teams')
    .delete()
    .eq('name', teamName);

  if (error) throw new Error(`Failed to delete team: ${error.message}`);

  revalidatePath('/clubs');
  return { success: true };
}

// ========================================
// Players
// ========================================

export async function getPlayersAction() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('players')
    .select('*, teams(name, logo_url)')
    .order('name', { ascending: true });

  if (error) throw new Error(`Failed to fetch players: ${error.message}`);
  return data;
}

export async function createPlayerAction(playerData: {
  name: string;
  grade?: string;
  teamId?: string;
  inGameName?: string;
  previousIgns?: string[];
  openId?: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('players')
    .insert({
      name: playerData.name,
      grade: playerData.grade,
      team_id: playerData.teamId,
      in_game_name: playerData.inGameName,
      previous_igns: playerData.previousIgns || [],
      open_id: playerData.openId,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create player: ${error.message}`);

  revalidatePath('/admin/players');
  return data;
}

export async function updatePlayerAction(
  playerId: string,
  updateData: {
    name?: string;
    grade?: string;
    teamId?: string;
    inGameName?: string;
    previousIgns?: string[];
    openId?: string;
  }
) {
  const supabase = await createClient();

  // ถ้าเปลี่ยน IGN ให้เก็บ IGN เก่าไว้ใน previousIgns อัตโนมัติ
  if (updateData.inGameName) {
    const { data: current } = await supabase
      .from('players')
      .select('in_game_name, previous_igns')
      .eq('id', playerId)
      .single();

    if (current?.in_game_name && current.in_game_name !== updateData.inGameName) {
      const prevIgns = current.previous_igns || [];
      if (!prevIgns.includes(current.in_game_name)) {
        prevIgns.push(current.in_game_name);
      }
      updateData.previousIgns = prevIgns;
    }
  }

  const { data, error } = await supabase
    .from('players')
    .update({
      ...(updateData.name && { name: updateData.name }),
      ...(updateData.grade !== undefined && { grade: updateData.grade }),
      ...(updateData.teamId !== undefined && { team_id: updateData.teamId }),
      ...(updateData.inGameName && { in_game_name: updateData.inGameName }),
      ...(updateData.previousIgns && { previous_igns: updateData.previousIgns }),
      ...(updateData.openId !== undefined && { open_id: updateData.openId }),
    })
    .eq('id', playerId)
    .select()
    .single();

  if (error) throw new Error(`Failed to update player: ${error.message}`);

  revalidatePath('/admin/players');
  return data;
}

export async function deletePlayerAction(playerId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('players')
    .delete()
    .eq('id', playerId);

  if (error) throw new Error(`Failed to delete player: ${error.message}`);

  revalidatePath('/admin/players');
  return { success: true };
}

export async function importPlayersAction(
  players: { name: string; grade?: string; teamId?: string; inGameName?: string }[]
) {
  const supabase = await createClient();

  const rows = players.map((p) => ({
    name: p.name,
    grade: p.grade,
    team_id: p.teamId,
    in_game_name: p.inGameName,
    previous_igns: [],
  }));

  const { data, error } = await supabase
    .from('players')
    .insert(rows)
    .select();

  if (error) throw new Error(`Failed to import players: ${error.message}`);

  revalidatePath('/admin/players');
  return { count: data?.length || 0 };
}

// ========================================
// Heroes
// ========================================

export async function getHeroesAction() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('heroes')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw new Error(`Failed to fetch heroes: ${error.message}`);
  return data;
}

export async function upsertHeroAction(name: string, imageUrl?: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('heroes')
    .upsert({ name, image_url: imageUrl }, { onConflict: 'name' })
    .select()
    .single();

  if (error) throw new Error(`Failed to upsert hero: ${error.message}`);
  return data;
}
