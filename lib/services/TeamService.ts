import { BaseService } from './BaseService';
import { DatabaseError } from '../errors';

export class TeamService extends BaseService {
    /**
     * Get a dictionary mapping team names to their logo URLs
     */
    public static async getTeamLogos(): Promise<Record<string, string>> {
        try {
            const supabase = await this.getSupabaseClient();
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
    public static async getClubsPageData() {
        try {
            const supabase = await this.getSupabaseClient();
            const { data: teamsData, error } = await supabase
                .from('teams')
                .select('name, logo_url')
                .order('name', { ascending: true });

            if (error) throw error;

            const teams = (teamsData || []).map((t) => t.name).filter(Boolean) as string[];
            const teamLogos: Record<string, string> = {};
            for (const t of teamsData || []) {
                if (t.name && t.logo_url) teamLogos[t.name] = t.logo_url;
            }

            return { teams, teamLogos };
        } catch (error: any) {
            throw new DatabaseError(`Failed to fetch clubs page data: ${error.message}`);
        }
    }
}
