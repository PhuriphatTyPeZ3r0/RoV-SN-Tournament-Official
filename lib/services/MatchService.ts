import { BaseService } from './BaseService';
import { DatabaseError } from '../errors';
import { TeamService } from './TeamService';

export interface ScheduleMatch {
    blue: string;
    red: string;
    date?: string;
}

export interface ScheduleRound {
    day: number;
    date?: string;
    matches: ScheduleMatch[];
}

export interface MatchWithResult {
    match: ScheduleMatch;
    result: {
        matchId: string;
        match_key?: string;
        scoreBlue: number;
        scoreRed: number;
        winner: string;
        loser: string;
        isByeWin: boolean;
        teamBlue: string;
        teamRed: string;
        [key: string]: any;
    };
    day: number;
    index: number;
    date?: string;
}

export class MatchService extends BaseService {
    /**
     * Get brackets data for the knockout stage (match_day >= 10)
     */
    public static async getBracketsPageData(season?: number) {
        try {
            const supabase = await this.getSupabaseClient();
            const tournamentId = await this.getActiveTournamentId(season);

            let matches: any[] = [];
            if (tournamentId) {
                const { data, error } = await supabase
                    .from('matches')
                    .select('*')
                    .eq('tournament_id', tournamentId)
                    .gte('match_day', 10)
                    .order('match_day', { ascending: true })
                    .order('created_at', { ascending: true });

                if (error) throw error;
                matches = data || [];
            }

            const teamLogos = await TeamService.getTeamLogos();
            return { matches, teamLogos };
        } catch (error: any) {
            throw new DatabaseError(`Failed to fetch brackets page data: ${error.message}`);
        }
    }

    /**
     * Get fixtures and results page data for a season
     */
    public static async getFixturesPageData(season?: number) {
        try {
            const supabase = await this.getSupabaseClient();
            const tournamentId = await this.getActiveTournamentId(season);

            let schedule: ScheduleRound[] = [];
            let results: Record<string, unknown>[] = [];

            if (tournamentId) {
                // 1. Fetch all matches for the tournament
                const { data: matchData, error: matchError } = await supabase
                    .from('matches')
                    .select('*')
                    .eq('tournament_id', tournamentId)
                    .order('match_day', { ascending: true })
                    .order('created_at', { ascending: true });

                if (matchError) throw matchError;

                if (matchData && matchData.length > 0) {
                    const roundsMap = new Map<number, ScheduleRound>();
                    
                    matchData.forEach(m => {
                        if (!roundsMap.has(m.match_day)) {
                            roundsMap.set(m.match_day, {
                                day: m.match_day,
                                matches: []
                            });
                        }
                        roundsMap.get(m.match_day)!.matches.push({
                            blue: m.team_blue_name,
                            red: m.team_red_name,
                        });
                    });

                    schedule = Array.from(roundsMap.values()).sort((a, b) => a.day - b.day);

                    results = matchData
                        .filter(m => m.score_blue !== 0 || m.score_red !== 0 || m.is_bye_win || m.winner_name)
                        .map((m) => ({
                            _id: m.id,
                            matchId: m.match_key,
                            matchDay: m.match_day,
                            teamBlue: m.team_blue_name,
                            teamRed: m.team_red_name,
                            scoreBlue: m.score_blue,
                            scoreRed: m.score_red,
                            winner: m.winner_name,
                            loser: m.loser_name,
                            isByeWin: m.is_bye_win,
                            createdAt: m.created_at,
                        }));
                } else {
                    // Fallback to legacy schedules table
                    const { data: schedData, error: schedError } = await supabase
                        .from('schedules')
                        .select('*')
                        .eq('tournament_id', tournamentId)
                        .order('created_at', { ascending: false })
                        .limit(1)
                        .maybeSingle();

                    if (schedError) throw schedError;

                    if (schedData?.schedule_data) {
                        const rawData = typeof schedData.schedule_data === 'string' ? JSON.parse(schedData.schedule_data) : schedData.schedule_data;
                        const raw = Array.isArray(rawData) ? rawData : [];
                        
                        schedule = (raw as any[]).map((round) => ({
                            day: round.day,
                            date: round.date,
                            matches: (round.matches || []).map((m: any) => ({
                                blue: m.teamA || m.blue || 'Unknown',
                                red: m.teamB || m.red || 'Unknown',
                                date: m.date,
                            })),
                        })).sort((a, b) => a.day - b.day);
                    }
                }
            }

            const teamLogos = await TeamService.getTeamLogos();
            return { schedule, results, teamLogos };
        } catch (error: any) {
            throw new DatabaseError(`Failed to fetch fixtures page data: ${error.message}`);
        }
    }
}
