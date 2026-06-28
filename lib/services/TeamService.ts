import { BaseService } from './BaseService';
import { DatabaseError } from '../errors';

export class TeamService extends BaseService {
    /**
     * Get a dictionary mapping team names to their logo URLs
     */
    public static async getTeamLogos(): Promise<Record<string, string>> {
        try {
            const supabase = this.getPublicClient();
            const { data: teamsData, error } = await supabase
                .from('teams')
                .select('name, logo_url');

            if (error) throw error;

            const teamLogos: Record<string, string> = {};
            for (const t of teamsData || []) {
                if (t.name && t.logo_url) teamLogos[t.name] = t.logo_url;
            }
            return teamLogos;
        } catch (error: any) {
            throw new DatabaseError(`Failed to fetch team logos: ${error.message}`);
        }
    }

    /**
     * Get page data for the clubs directory listing
     */
    public static async getClubsPageData(season?: number) {
        try {
            const supabase = this.getPublicClient();
            
            // Resolve tournament ID & Fetch all tournaments in parallel
            const [tournamentId, { data: tournaments }] = await Promise.all([
                this.getActiveTournamentId(season),
                supabase.from('tournaments').select('*').order('season', { ascending: false })
            ]);

            // Fetch current tournament info
            let currentTournament = null;
            if (tournamentId) {
                const { data } = await supabase
                    .from('tournaments')
                    .select('*')
                    .eq('id', tournamentId)
                    .single();
                currentTournament = data;
            }

            // If no tournament resolved, return empty
            if (!currentTournament) {
                return { teams: [], teamLogos: {}, tournaments: tournaments || [], currentSeason: season || 2026 };
            }

            let teamNames: string[] = [];

            // 1. Get teams from schedules
            const { data: scheduleData } = await supabase
                .from('schedules')
                .select('teams')
                .eq('tournament_id', currentTournament.id);

            if (scheduleData) {
                for (const s of scheduleData) {
                    if (s.teams && Array.isArray(s.teams)) {
                        teamNames.push(...s.teams);
                    }
                }
            }

            // 2. Get teams from matches
            const { data: matchesData } = await supabase
                .from('matches')
                .select('team_blue_name, team_red_name')
                .eq('tournament_id', currentTournament.id);

            if (matchesData) {
                for (const m of matchesData) {
                    if (m.team_blue_name) teamNames.push(m.team_blue_name);
                    if (m.team_red_name) teamNames.push(m.team_red_name);
                }
            }

            // Deduplicate
            teamNames = [...new Set(teamNames)].filter(name => name !== 'BYE');

            // 3. If this is the active/latest tournament, include teams created after it
            const isLatest = !tournaments || tournaments.length === 0 || tournaments[0].id === currentTournament.id;
            if (isLatest) {
                const { data: newTeams } = await supabase
                    .from('teams')
                    .select('name')
                    .gte('created_at', currentTournament.created_at);

                if (newTeams) {
                    teamNames.push(...newTeams.map(t => t.name));
                }
            }

            // Deduplicate again
            teamNames = [...new Set(teamNames)].filter(Boolean);

            // Fetch team details for these names
            let teams: string[] = [];
            const teamLogos: Record<string, string> = {};

            if (teamNames.length > 0) {
                const { data: teamsData, error } = await supabase
                    .from('teams')
                    .select('name, logo_url')
                    .in('name', teamNames)
                    .order('name', { ascending: true });

                if (error) throw error;

                teams = (teamsData || []).map((t) => t.name).filter(Boolean) as string[];
                for (const t of teamsData || []) {
                    if (t.name && t.logo_url) teamLogos[t.name] = t.logo_url;
                }
            }

            return {
                teams,
                teamLogos,
                tournaments: tournaments || [],
                currentSeason: currentTournament.season
            };
        } catch (error: any) {
            throw new DatabaseError(`Failed to fetch clubs page data: ${error.message}`);
        }
    }
}
