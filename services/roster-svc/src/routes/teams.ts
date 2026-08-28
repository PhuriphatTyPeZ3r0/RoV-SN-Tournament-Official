import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { extractAccessToken, getSupabaseClient } from '../supabaseClient';
import { getPlayerProfile } from '../playerProfile';
import { ROV_RANKS } from '../rovRanks';

const router = Router();

// Same zod schemas as features/teams/actions.ts, ported verbatim.
const updateTeamInfoSchema = z.object({
  name: z.string().min(2, 'ชื่อทีมต้องมีอย่างน้อย 2 ตัวอักษร').max(50, 'ชื่อทีมต้องไม่เกิน 50 ตัวอักษร'),
  description: z.string().max(200, 'คำอธิบายทีมต้องไม่เกิน 200 ตัวอักษร').nullable(),
  logoUrl: z.string().nullable(),
});

const updatePlayerLineupRoleSchema = z.object({
  playerId: z.string().uuid('ID ผู้เล่นไม่ถูกต้อง'),
  lineupRole: z
    .enum(['dark_slayer', 'abyssal_dragon', 'mid_lane', 'jungle', 'support', 'substitute'])
    .nullable(),
});

const updateTeamContactInfoSchema = z.object({
  contactPhone: z.string().max(20, 'เบอร์โทรศัพท์ต้องไม่เกิน 20 ตัวอักษร').nullable(),
  contactLine: z.string().max(50, 'Line ID ต้องไม่เกิน 50 ตัวอักษร').nullable(),
  contactDiscord: z.string().max(100, 'ลิงก์ Discord ต้องไม่เกิน 100 ตัวอักษร').nullable(),
});

const updatePlayerPersonalDetailsSchema = z.object({
  nickname: z.string().max(30, 'ชื่อเล่นต้องไม่เกิน 30 ตัวอักษร').nullable(),
  phone: z.string().max(20, 'เบอร์โทรศัพท์ต้องไม่เกิน 20 ตัวอักษร').nullable(),
  topHeroes: z.array(z.string()).max(3, 'เลือกฮีโร่ถนัดได้สูงสุด 3 ตัว'),
});

const updateGamingProfileSchema = z.object({
  currentRank: z.enum(ROV_RANKS).nullable(),
  lineupRole: z
    .enum(['dark_slayer', 'abyssal_dragon', 'mid_lane', 'jungle', 'support', 'substitute'])
    .nullable()
    .optional(),
  secondaryRole: z.enum(['dark_slayer', 'abyssal_dragon', 'mid_lane', 'jungle', 'support']).nullable(),
  topHeroes: z.array(z.string()).max(3, 'เลือก Hero ถนัดได้สูงสุด 3 ตัว'),
  experienceBio: z.string().max(500, 'ประสบการณ์ต้องไม่เกิน 500 ตัวอักษร').nullable(),
  nickname: z.string().max(30, 'ชื่อเล่นต้องไม่เกิน 30 ตัวอักษร').nullable().optional(),
  phone: z.string().max(20, 'เบอร์โทรศัพท์ต้องไม่เกิน 20 ตัวอักษร').nullable().optional(),
});

/**
 * Every route needs the caller's Supabase client + resolved player row.
 * Unexpected failures return HTTP 500; expected business-rule failures
 * (no team, not captain, locked, etc.) return HTTP 200 with the same
 * `{ error: "..." }` shape the monolith's Server Actions returned, so the
 * Next.js wrapper can forward the body unchanged to existing client code.
 */
function action(
  fn: (
    supabase: ReturnType<typeof getSupabaseClient>,
    accessToken: string | undefined,
    req: Request,
  ) => Promise<unknown>,
) {
  return async (req: Request, res: Response) => {
    try {
      const token = extractAccessToken(req.headers.authorization);
      const supabase = getSupabaseClient(token);
      const result = await fn(supabase, token, req);
      return res.json(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return res.status(500).json({ error: message });
    }
  };
}

// POST /teams — createTeamAction
router.post(
  '/teams',
  action(async (supabase, token, req) => {
    const { name, logoUrl } = req.body as { name: string; logoUrl?: string };
    const player = await getPlayerProfile(supabase, token);

    if (!player) return { error: 'ไม่พบข้อมูลผู้เล่น กรุณารอการอนุมัติใบสมัคร' };
    if (player.team_id) return { error: 'คุณมีทีมอยู่แล้ว ไม่สามารถสร้างทีมใหม่ได้' };

    const { data: team, error: teamError } = await supabase
      .from('teams')
      .insert({ name, logo_url: logoUrl, captain_id: player.id, status: 'incomplete' })
      .select()
      .single();

    if (teamError) {
      if (teamError.code === '23505') return { error: 'ชื่อทีมนี้ถูกใช้ไปแล้ว' };
      return { error: teamError.message };
    }

    const { error: playerUpdateError } = await supabase
      .from('players')
      .update({ team_id: team.id })
      .eq('id', player.id);

    if (playerUpdateError) {
      return { error: 'สร้างทีมสำเร็จ แต่ไม่สามารถเพิ่มคุณเข้าทีมได้ กรุณาติดต่อแอดมิน' };
    }

    return { success: true, teamId: team.id };
  }),
);

// POST /teams/join — joinTeamAction
router.post(
  '/teams/join',
  action(async (supabase, token, req) => {
    const { inviteCode } = req.body as { inviteCode: string };
    const player = await getPlayerProfile(supabase, token);

    if (!player) return { error: 'ไม่พบข้อมูลผู้เล่น กรุณารอการอนุมัติใบสมัคร' };
    if (player.team_id) return { error: 'คุณมีทีมอยู่แล้ว กรุณาออกจากทีมเดิมก่อนเข้าร่วมทีมใหม่' };

    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('id, name, status')
      .eq('invite_code', inviteCode.toUpperCase())
      .single();

    if (teamError || !team) return { error: 'รหัสเชิญไม่ถูกต้อง หรือทีมนี้ไม่มีอยู่จริง' };
    if (team.status === 'ready' || team.status === 'approved') {
      return { error: 'ทีมนี้ล็อกรายชื่อแล้ว ไม่สามารถเข้าร่วมทีมได้' };
    }

    const { count, error: countError } = await supabase
      .from('players')
      .select('*', { count: 'exact', head: true })
      .eq('team_id', team.id);

    if (countError) return { error: countError.message };
    if (count && count >= 6) return { error: 'ทีมนี้มีสมาชิกเต็มแล้ว (สูงสุด 6 คน)' };

    const { error: updateError } = await supabase
      .from('players')
      .update({ team_id: team.id, lineup_role: null })
      .eq('id', player.id);

    if (updateError) return { error: updateError.message };

    return { success: true, teamName: team.name };
  }),
);

// POST /teams/leave — leaveTeamAction
router.post(
  '/teams/leave',
  action(async (supabase, token) => {
    const player = await getPlayerProfile(supabase, token);
    if (!player || !player.team_id) return { error: 'คุณไม่ได้อยู่ในทีมใดๆ' };

    const { data: team } = await supabase
      .from('teams')
      .select('captain_id, status')
      .eq('id', player.team_id)
      .single();

    if (team && (team.status === 'ready' || team.status === 'approved')) {
      return { error: 'ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถออกจากทีมได้' };
    }
    if (team && team.captain_id === player.id) {
      return { error: 'กัปตันทีมไม่สามารถออกจากทีมได้ กรุณาแต่งตั้งกัปตันใหม่หรือยุบทีม' };
    }

    const { error } = await supabase
      .from('players')
      .update({ team_id: null, lineup_role: null })
      .eq('id', player.id);

    if (error) return { error: error.message };
    return { success: true };
  }),
);

// GET /teams/me — getMyTeamData
router.get(
  '/teams/me',
  action(async (supabase, token) => {
    const player = await getPlayerProfile(supabase, token);
    if (!player || !player.team_id) return null;

    const { data: team, error } = await supabase
      .from('teams')
      .select('*, members:players!team_id(*, profile:profiles(avatar_url))')
      .eq('id', player.team_id)
      .single();

    if (error) return null;
    return { ...team, currentPlayerId: player.id };
  }),
);

// POST /teams/kick — kickPlayerAction
router.post(
  '/teams/kick',
  action(async (supabase, token, req) => {
    const { playerId } = req.body as { playerId: string };
    const player = await getPlayerProfile(supabase, token);
    if (!player || !player.team_id) return { error: 'Unauthorized' };

    const { data: team } = await supabase
      .from('teams')
      .select('captain_id, status')
      .eq('id', player.team_id)
      .single();

    if (!team || team.captain_id !== player.id) {
      return { error: 'เฉพาะกัปตันทีมเท่านั้นที่สามารถคัดสมาชิกออกได้' };
    }
    if (team.status === 'ready' || team.status === 'approved') {
      return { error: 'ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถคัดสมาชิกออกได้' };
    }
    if (playerId === player.id) return { error: 'คุณไม่สามารถคัดตัวเองออกจากทีมได้' };

    const { error } = await supabase
      .from('players')
      .update({ team_id: null, lineup_role: null })
      .eq('id', playerId)
      .eq('team_id', player.team_id);

    if (error) return { error: error.message };
    return { success: true };
  }),
);

// GET /teams — getAllTeamsAction
router.get(
  '/teams',
  action(async (supabase) => {
    const { data, error } = await supabase
      .from('teams')
      .select('*, members:players!team_id(*)')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching all teams:', error);
      return [];
    }
    return data;
  }),
);

// PATCH /teams/:teamId/status — updateTeamStatusAction
router.patch(
  '/teams/:teamId/status',
  action(async (supabase, _token, req) => {
    const { teamId } = req.params;
    const { status } = req.body as { status: 'incomplete' | 'ready' | 'approved' };

    const { error } = await supabase.from('teams').update({ status }).eq('id', teamId);
    if (error) return { error: error.message };
    return { success: true };
  }),
);

// PATCH /teams/me — updateTeamInfoAction
router.patch(
  '/teams/me',
  action(async (supabase, token, req) => {
    const parsed = updateTeamInfoSchema.safeParse(req.body);
    if (!parsed.success) return { error: parsed.error.issues[0].message };
    const { name, description, logoUrl } = parsed.data;

    const player = await getPlayerProfile(supabase, token);
    if (!player || !player.team_id) return { error: 'ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ' };

    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('captain_id, status')
      .eq('id', player.team_id)
      .single();

    if (teamError || !team || team.captain_id !== player.id) {
      return { error: 'เฉพาะกัปตันทีมเท่านั้นที่สามารถแก้ไขข้อมูลทีมได้' };
    }
    if (team.status === 'ready' || team.status === 'approved') {
      return { error: 'ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถแก้ไขข้อมูลได้' };
    }

    const { error: updateError } = await supabase
      .from('teams')
      .update({ name, description, logo_url: logoUrl })
      .eq('id', player.team_id);

    if (updateError) {
      if (updateError.code === '23505') return { error: 'ชื่อทีมนี้ถูกใช้ไปแล้ว' };
      return { error: updateError.message };
    }
    return { success: true };
  }),
);

// PATCH /teams/me/lineup-role — updatePlayerLineupRoleAction
router.patch(
  '/teams/me/lineup-role',
  action(async (supabase, token, req) => {
    const parsed = updatePlayerLineupRoleSchema.safeParse(req.body);
    if (!parsed.success) return { error: parsed.error.issues[0].message };
    const { playerId, lineupRole } = parsed.data;

    const player = await getPlayerProfile(supabase, token);
    if (!player || !player.team_id) return { error: 'ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ' };

    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('captain_id, status')
      .eq('id', player.team_id)
      .single();

    if (teamError || !team || team.captain_id !== player.id) {
      return { error: 'เฉพาะกัปตันทีมเท่านั้นที่สามารถจัดการตำแหน่งในทีมได้' };
    }
    if (team.status === 'ready' || team.status === 'approved') {
      return { error: 'ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถแก้ไขตำแหน่งได้' };
    }

    const { error: updateError } = await supabase
      .from('players')
      .update({ lineup_role: lineupRole })
      .eq('id', playerId)
      .eq('team_id', player.team_id);

    if (updateError) return { error: updateError.message };
    return { success: true };
  }),
);

// POST /teams/me/recruitment/toggle — toggleRecruitmentAction
router.post(
  '/teams/me/recruitment/toggle',
  action(async (supabase, token) => {
    const player = await getPlayerProfile(supabase, token);
    if (!player || !player.team_id) return { error: 'ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ' };

    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('captain_id, status, invite_code')
      .eq('id', player.team_id)
      .single();

    if (teamError || !team || team.captain_id !== player.id) {
      return { error: 'เฉพาะกัปตันทีมเท่านั้นที่สามารถจัดการการรับสมัครได้' };
    }
    if (team.status === 'ready' || team.status === 'approved') {
      return { error: 'ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถแก้ไขสิทธิ์การรับสมัครได้' };
    }

    let nextInviteCode: string | null = null;
    if (!team.invite_code) {
      nextInviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    const { error: updateError } = await supabase
      .from('teams')
      .update({ invite_code: nextInviteCode })
      .eq('id', player.team_id);

    if (updateError) return { error: updateError.message };
    return { success: true, isRecruiting: !!nextInviteCode };
  }),
);

// POST /teams/me/invite-code/regenerate — regenerateInviteCodeAction
router.post(
  '/teams/me/invite-code/regenerate',
  action(async (supabase, token) => {
    const player = await getPlayerProfile(supabase, token);
    if (!player || !player.team_id) return { error: 'ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ' };

    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('captain_id, status')
      .eq('id', player.team_id)
      .single();

    if (teamError || !team || team.captain_id !== player.id) {
      return { error: 'เฉพาะกัปตันทีมเท่านั้นที่สามารถรีเซ็ตรหัสเชิญได้' };
    }
    if (team.status === 'ready' || team.status === 'approved') {
      return { error: 'ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถรีเซ็ตรหัสเชิญได้' };
    }

    const newInviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const { error: updateError } = await supabase
      .from('teams')
      .update({ invite_code: newInviteCode })
      .eq('id', player.team_id);

    if (updateError) return { error: updateError.message };
    return { success: true, inviteCode: newInviteCode };
  }),
);

// POST /teams/me/ready — toggleTeamReadyAction
router.post(
  '/teams/me/ready',
  action(async (supabase, token, req) => {
    const { targetStatus } = req.body as { targetStatus: 'ready' | 'incomplete' };
    const player = await getPlayerProfile(supabase, token);
    if (!player || !player.team_id) return { error: 'ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ' };

    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('captain_id, status')
      .eq('id', player.team_id)
      .single();

    if (teamError || !team || team.captain_id !== player.id) {
      return { error: 'เฉพาะกัปตันทีมเท่านั้นที่สามารถเปลี่ยนสถานะทีมได้' };
    }

    if (targetStatus === 'ready') {
      const { count, error: countError } = await supabase
        .from('players')
        .select('*', { count: 'exact', head: true })
        .eq('team_id', player.team_id);

      if (countError) return { error: countError.message };
      if (!count || count < 5) {
        return { error: 'ทีมของคุณต้องมีสมาชิกอย่างน้อย 5 คนจึงจะสามารถส่งรายชื่อพร้อมแข่งขันได้' };
      }

      const { error: updateError } = await supabase
        .from('teams')
        .update({ status: 'ready' })
        .eq('id', player.team_id);

      if (updateError) return { error: updateError.message };
    } else {
      if (team.status === 'approved') {
        return { error: 'ทีมของคุณผ่านการอนุมัติแล้ว ไม่สามารถปลดล็อกแก้ไขรายชื่อได้ กรุณาติดต่อแอดมิน' };
      }

      const { error: updateError } = await supabase
        .from('teams')
        .update({ status: 'incomplete' })
        .eq('id', player.team_id);

      if (updateError) return { error: updateError.message };
    }

    return { success: true };
  }),
);

// PATCH /teams/me/contact — updateTeamContactInfoAction
router.patch(
  '/teams/me/contact',
  action(async (supabase, token, req) => {
    const parsed = updateTeamContactInfoSchema.safeParse(req.body);
    if (!parsed.success) return { error: parsed.error.issues[0].message };
    const { contactPhone, contactLine, contactDiscord } = parsed.data;

    const player = await getPlayerProfile(supabase, token);
    if (!player || !player.team_id) return { error: 'ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ' };

    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('captain_id, status')
      .eq('id', player.team_id)
      .single();

    if (teamError || !team || team.captain_id !== player.id) {
      return { error: 'เฉพาะกัปตันทีมเท่านั้นที่สามารถแก้ไขข้อมูลการติดต่อได้' };
    }
    if (team.status === 'approved') {
      return { error: 'ทีมได้รับการอนุมัติเรียบร้อยแล้ว ไม่สามารถแก้ไขข้อมูลติดต่อได้ กรุณาติดต่อแอดมิน' };
    }

    const { error: updateError } = await supabase
      .from('teams')
      .update({ contact_phone: contactPhone, contact_line: contactLine, contact_discord: contactDiscord })
      .eq('id', player.team_id);

    if (updateError) return { error: updateError.message };
    return { success: true };
  }),
);

// PATCH /players/me/personal-details — updatePlayerPersonalDetailsAction
router.patch(
  '/players/me/personal-details',
  action(async (supabase, token, req) => {
    const parsed = updatePlayerPersonalDetailsSchema.safeParse(req.body);
    if (!parsed.success) return { error: parsed.error.issues[0].message };
    const { nickname, phone, topHeroes } = parsed.data;

    const player = await getPlayerProfile(supabase, token);
    if (!player) return { error: 'ไม่พบข้อมูลผู้เล่นของคุณ' };

    const { error: updateError } = await supabase
      .from('players')
      .update({ nickname, phone, top_heroes: topHeroes })
      .eq('id', player.id);

    if (updateError) return { error: updateError.message };
    return { success: true };
  }),
);

// PATCH /players/me/gaming-profile — updateGamingProfileAction
router.patch(
  '/players/me/gaming-profile',
  action(async (supabase, token, req) => {
    const parsed = updateGamingProfileSchema.safeParse(req.body);
    if (!parsed.success) return { error: parsed.error.issues[0].message };
    const { currentRank, lineupRole, secondaryRole, topHeroes, experienceBio, nickname, phone } = parsed.data;

    const player = await getPlayerProfile(supabase, token);
    if (!player) return { error: 'ไม่พบข้อมูลผู้เล่นของคุณ' };

    const updateData: Record<string, unknown> = {
      current_rank: currentRank,
      secondary_role: secondaryRole,
      top_heroes: topHeroes,
      experience_bio: experienceBio,
    };
    if (lineupRole !== undefined) updateData.lineup_role = lineupRole;
    if (nickname !== undefined) updateData.nickname = nickname;
    if (phone !== undefined) updateData.phone = phone;

    const { error: updateError } = await supabase
      .from('players')
      .update(updateData)
      .eq('id', player.id);

    if (updateError) return { error: updateError.message };
    return { success: true };
  }),
);

// GET /teams/with-seasons — getAllTeamsWithSeasonsAction
router.get(
  '/teams/with-seasons',
  action(async (supabase) => {
    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('*, members:players!team_id(*)')
      .order('name', { ascending: true });

    if (teamsError) {
      console.error('Error fetching all teams:', teamsError);
      return { teams: [], tournaments: [] };
    }

    const { data: tournaments, error: tournamentsError } = await supabase
      .from('tournaments')
      .select('*')
      .order('created_at', { ascending: true });

    if (tournamentsError) {
      console.error('Error fetching tournaments:', tournamentsError);
      return { teams: [], tournaments: [] };
    }

    const { data: matches, error: matchesError } = await supabase
      .from('matches')
      .select('tournament_id, team_blue_id, team_red_id');

    if (matchesError) {
      console.error('Error fetching matches:', matchesError);
      return {
        teams: mappedTeamsFallback(teams, tournaments || []),
        tournaments: tournaments || [],
      };
    }

    const mappedTeams = teams.map((team: any) => {
      const teamMatch = matches?.find(
        (m: any) => m.team_blue_id === team.id || m.team_red_id === team.id,
      );

      let season = 2026;
      let tournamentStatus = 'completed';

      if (teamMatch) {
        const tournament = tournaments?.find((t: any) => t.id === teamMatch.tournament_id);
        if (tournament) {
          season = tournament.season;
          tournamentStatus = tournament.status;
        }
      } else {
        let matchedTournament = tournaments?.[0];
        for (const t of tournaments || []) {
          if (new Date(team.created_at).getTime() >= new Date(t.created_at).getTime()) {
            matchedTournament = t;
          }
        }
        if (matchedTournament) {
          season = matchedTournament.season;
          tournamentStatus = matchedTournament.status;
        }
      }

      return { ...team, season, tournamentStatus };
    });

    return { teams: mappedTeams, tournaments: tournaments || [] };
  }),
);

function mappedTeamsFallback(teams: any[], tournaments: any[]) {
  return teams.map((team: any) => {
    let matchedTournament = tournaments?.[0];
    for (const t of tournaments) {
      if (new Date(team.created_at).getTime() >= new Date(t.created_at).getTime()) {
        matchedTournament = t;
      }
    }
    return {
      ...team,
      season: matchedTournament?.season || 2026,
      tournamentStatus: matchedTournament?.status || 'completed',
    };
  });
}

export default router;
