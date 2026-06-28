import { BaseService } from './BaseService';
import { DatabaseError } from '../errors';
import { TeamService } from './TeamService';
import type {
    PlayerStat,
    TeamStat,
    SeasonStats,
    Hero,
    PlayerHeroStat,
} from '@/types';

export interface ProcessedStanding {
    name: string;
    p: number;
    w: number;
    l: number;
    gd: number;
    pts: number;
    form?: string[];
}

export class StatsService extends BaseService {
    /**
     * Get standing board for the current tournament / season
     */
    public static async getStandingsPageData(season?: number) {
        try {
            const supabase = this.getPublicClient();
            const [tournamentId, teamLogos] = await Promise.all([
                this.getActiveTournamentId(season),
                TeamService.getTeamLogos()
            ]);

            let standings: ProcessedStanding[] = [];

            if (tournamentId) {
                const { data, error } = await supabase.rpc('calculate_tournament_standings', {
                    p_tournament_id: tournamentId,
                });

                if (error) throw error;

                standings = (data || []).map((s: Record<string, any>) => ({
                    name: s.team_name as string,
                    p: (s.played as number) || 0,
                    w: (s.wins as number) || 0,
                    l: (s.losses as number) || 0,
                    gd: (s.game_diff as number) || 0,
                    pts: (s.points as number) || 0,
                    form: s.form as string[] | undefined,
                }));
            }

            return { standings, teamLogos };
        } catch (error: any) {
            throw new DatabaseError(`Failed to fetch standings data: ${error.message}`);
        }
    }

    /**
     * Get season overview stats (total matches, total kills, etc.)
     */
    public static async getSeasonStatsPageData(season?: number) {
        try {
            const supabase = this.getPublicClient();
            const [tournamentId, { data: heroesData, error: heroesError }, teamLogos] = await Promise.all([
                this.getActiveTournamentId(season),
                supabase.from('heroes').select('*').order('name', { ascending: true }),
                TeamService.getTeamLogos()
            ]);

            if (heroesError) throw heroesError;

            let seasonStats: SeasonStats | null = null;

            if (tournamentId) {
                const { data, error } = await supabase.rpc('get_season_overview', {
                    p_tournament_id: tournamentId,
                });
                if (error) throw error;
                seasonStats = data as SeasonStats | null;
            }

            const heroes: Hero[] = (heroesData || []).map((h) => ({
                _id: h.id,
                name: h.name,
                imageUrl: h.image_url,
                createdAt: h.created_at,
            }));

            return { seasonStats, heroes, teamLogos };
        } catch (error: any) {
            throw new DatabaseError(`Failed to fetch season stats: ${error.message}`);
        }
    }

    /**
     * Get statistics grouped by teams
     */
    public static async getTeamStatsPageData(season?: number) {
        try {
            const supabase = this.getPublicClient();
            const [tournamentId, teamLogos] = await Promise.all([
                this.getActiveTournamentId(season),
                TeamService.getTeamLogos()
            ]);

            let teamStats: TeamStat[] = [];

            if (tournamentId) {
                const { data, error } = await supabase.rpc('get_team_stats', {
                    p_tournament_id: tournamentId,
                });

                if (error) throw error;

                teamStats = (data || []).map((t: Record<string, any>) => ({
                    teamName: t.team_name as string,
                    totalKills: Number(t.total_kills) || 0,
                    totalDeaths: Number(t.total_deaths) || 0,
                    totalAssists: Number(t.total_assists) || 0,
                    mvpCount: Number(t.mvp_count) || 0,
                    realGamesPlayed: Number(t.real_games_played) || 0,
                    realWins: Number(t.real_wins) || 0,
                    avgKillsPerGame: Number(t.avg_kills_per_game) || 0,
                    avgDeathsPerGame: Number(t.avg_deaths_per_game) || 0,
                    avgAssistsPerGame: Number(t.avg_assists_per_game) || 0,
                    avgDuration: 0,
                    kda: Number(t.kda) || 0,
                    winRate: Number(t.win_rate) || 0,
                    realLosses: Number(t.real_losses) || 0,
                }));
            }

            return { teamStats, teamLogos };
        } catch (error: any) {
            throw new DatabaseError(`Failed to fetch team stats page data: ${error.message}`);
        }
    }

    /**
     * Get statistics grouped by individual players
     */
    public static async getPlayerStatsPageData(season?: number) {
        try {
            const supabase = this.getPublicClient();
            const [tournamentId, { data: heroesData, error: heroesError }, teamLogos] = await Promise.all([
                this.getActiveTournamentId(season),
                supabase.from('heroes').select('*').order('name', { ascending: true }),
                TeamService.getTeamLogos()
            ]);

            if (heroesError) throw heroesError;

            let playerStats: PlayerStat[] = [];
            let playerHeroStats: PlayerHeroStat[] = [];

            if (tournamentId) {
                // Fetch player leaderboard and hero stats in parallel
                const [leaderboardRes, heroStatsRes] = await Promise.all([
                    supabase.rpc('get_player_leaderboard', { p_tournament_id: tournamentId }),
                    supabase.from('game_stats')
                        .select('player_name, hero_name, win, match_id!inner(tournament_id)')
                        .eq('match_id.tournament_id', tournamentId)
                ]);

                const { data: leaderboard, error: leaderboardError } = leaderboardRes;
                const { data: heroStats, error: heroStatsError } = heroStatsRes;

                if (leaderboardError) throw leaderboardError;
                if (heroStatsError) throw heroStatsError;

                playerStats = (leaderboard || []).map((p: Record<string, any>) => ({
                    realName: p.real_name as string,
                    playerName: p.player_name as string,
                    teamName: p.team_name as string,
                    totalKills: Number(p.total_kills) || 0,
                    totalDeaths: Number(p.total_deaths) || 0,
                    totalAssists: Number(p.total_assists) || 0,
                    gamesPlayed: Number(p.games_played) || 0,
                    mvpCount: Number(p.mvp_count) || 0,
                    wins: Number(p.wins) || 0,
                    winRate: Number(p.win_rate) || 0,
                    avgKillsPerGame: Number(p.avg_kills) || 0,
                    avgDeathsPerGame: Number(p.avg_deaths) || 0,
                    avgAssistsPerGame: Number(p.avg_assists) || 0,
                    mvpRate: Number(p.mvp_rate) || 0,
                    kda: Number(p.kda) || 0,
                }));

                if (heroStats) {
                    const playerHeroMap = new Map<string, Map<string, { gp: number; w: number; k: number; d: number; a: number }>>();
                    for (const row of heroStats) {
                        const pName = row.player_name;
                        if (!playerHeroMap.has(pName)) playerHeroMap.set(pName, new Map());
                        const heroMap = playerHeroMap.get(pName)!;
                        const current = heroMap.get(row.hero_name) || { gp: 0, w: 0, k: 0, d: 0, a: 0 };
                        current.gp++;
                        if (row.win) current.w++;
                        heroMap.set(row.hero_name, current);
                    }

                    playerHeroStats = Array.from(playerHeroMap.entries()).map(([playerName, heroMap]) => ({
                        realName: playerName,
                        playerName,
                        topHeroes: Array.from(heroMap.entries())
                            .map(([heroName, stats]) => ({
                                heroName,
                                gamesPlayed: stats.gp,
                                wins: stats.w,
                                totalKills: stats.k,
                                totalDeaths: stats.d,
                                totalAssists: stats.a,
                            }))
                            .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
                            .slice(0, 3),
                    }));
                }
            }

            const heroes: Hero[] = (heroesData || []).map((h) => ({
                _id: h.id,
                name: h.name,
                imageUrl: h.image_url,
                createdAt: h.created_at,
            }));

            return { playerStats, playerHeroStats, heroes, teamLogos };
        } catch (error: any) {
            throw new DatabaseError(`Failed to fetch player stats page data: ${error.message}`);
        }
    }
}
