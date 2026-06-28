/**
 * Server-side API Facade (OOP-backed compatibility layer)
 * 
 * Delegates queries to the appropriate Object-Oriented Service classes.
 */

import { createClient } from '@/utils/supabase/server';
import { TournamentService } from './services/TournamentService';
import { TeamService } from './services/TeamService';
import { MatchService } from './services/MatchService';
import { StatsService } from './services/StatsService';

// Re-export type definitions
import type { ScheduleMatch, ScheduleRound, MatchWithResult } from './services/MatchService';
import type { ProcessedStanding } from './services/StatsService';
export type { ScheduleMatch, ScheduleRound, MatchWithResult, ProcessedStanding };

export const serverApi = {
    /**
     * Get list of all tournaments
     */
    getTournaments: () => TournamentService.getTournaments(),

    /**
     * Get page data for the clubs directory
     */
    getClubsPageData: (season?: number) => TeamService.getClubsPageData(season),

    /**
     * Get brackets page data
     */
    getBracketsPageData: (season?: number) => MatchService.getBracketsPageData(season),

    /**
     * Get fixtures and results page data
     */
    getFixturesPageData: (season?: number) => MatchService.getFixturesPageData(season),

    /**
     * Get standings page data
     */
    getStandingsPageData: (season?: number) => StatsService.getStandingsPageData(season),

    /**
     * Get season statistics page data
     */
    getSeasonStatsPageData: (season?: number) => StatsService.getSeasonStatsPageData(season),

    /**
     * Get team statistics page data
     */
    getTeamStatsPageData: (season?: number) => StatsService.getTeamStatsPageData(season),

    /**
     * Get player statistics page data
     */
    getPlayerStatsPageData: (season?: number) => StatsService.getPlayerStatsPageData(season),

    /**
     * Get home page layout data (coordinates multiple services)
     */
    getHomePageData: async (season?: number) => {
        const supabase = await createClient();

        // 1. Resolve tournament
        const { data: activeTourData } = season
            ? await supabase.from('tournaments').select('id').eq('season', season).limit(1).maybeSingle()
            : await supabase.from('tournaments').select('id').eq('status', 'active').order('created_at', { ascending: false }).limit(1).maybeSingle();
        
        const tournamentId = activeTourData?.id || null;

        // 2. Fetch dependencies via Services
        const teamLogos = await TeamService.getTeamLogos();
        let schedule: ScheduleRound[] = [];
        let standings: ProcessedStanding[] = [];
        let latestMatches: MatchWithResult[] = [];
        let upcomingMatches: ScheduleMatch[] = [];
        let results: Record<string, any>[] = [];
        let activeTournament: any = null;

        if (tournamentId) {
            // Fetch active tournament metadata
            const { data: tourMeta } = await supabase
                .from('tournaments')
                .select('*')
                .eq('id', tournamentId)
                .maybeSingle();
            activeTournament = tourMeta;

            // Fetch standings
            const { data: standData } = await supabase.rpc('calculate_tournament_standings', {
                p_tournament_id: tournamentId,
            });

            standings = (standData || []).map((s: Record<string, any>) => ({
                name: s.team_name as string,
                p: (s.played as number) || 0,
                w: (s.wins as number) || 0,
                l: (s.losses as number) || 0,
                gd: (s.game_diff as number) || 0,
                pts: (s.points as number) || 0,
            }));

            // Fetch schedule
            const { data: schedData } = await supabase
                .from('schedules')
                .select('*')
                .eq('tournament_id', tournamentId)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

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
                }));
            }

            // Fetch match results
            const { data: matchData } = await supabase
                .from('matches')
                .select('*')
                .eq('tournament_id', tournamentId)
                .order('match_day', { ascending: true });

            const resultsData = (matchData || []).map((m) => ({
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

            results = resultsData;

            // Formulate latest matches
            const matchesWithResults: MatchWithResult[] = [];
            schedule.forEach((round) => {
                (round.matches || []).forEach((m, index) => {
                    const matchKey = `${round.day}_${m.blue}_vs_${m.red}`.replace(/\s+/g, '');
                    const result = resultsData.find((r) => r.matchId === matchKey);
                    if (result) {
                        matchesWithResults.push({
                            match: m,
                            result: result as MatchWithResult['result'],
                            day: round.day,
                            index,
                            date: m.date || round.date,
                        });
                    }
                });
            });

            latestMatches = matchesWithResults
                .sort((a, b) => (b.day !== a.day ? b.day - a.day : b.index - a.index))
                .slice(0, 4);

            if (latestMatches.length === 0 && schedule.length > 0) {
                const dayData = schedule.find((r) => r.day === 1);
                if (dayData) {
                    upcomingMatches = dayData.matches.slice(0, 4);
                }
            }
        }

        return { schedule, standings, teamLogos, latestMatches, upcomingMatches, results, activeTournament };
    }
};

export default serverApi;
