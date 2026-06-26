import { createClient } from '@/utils/supabase/server';
import { DatabaseError } from '../errors';

export abstract class BaseService {
    /**
     * Get initialized Supabase server client
     */
    protected static async getSupabaseClient() {
        return await createClient();
    }

    /**
     * Resolve the active tournament ID for a given season or the default active season
     */
    protected static async getActiveTournamentId(season?: number): Promise<string | null> {
        try {
            const supabase = await this.getSupabaseClient();
            if (season) {
                const { data } = await supabase
                    .from('tournaments')
                    .select('id')
                    .eq('season', season)
                    .limit(1)
                    .maybeSingle();
                if (data) return data.id;
            }
            const { data } = await supabase
                .from('tournaments')
                .select('id')
                .eq('status', 'active')
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            return data?.id || null;
        } catch (error: any) {
            throw new DatabaseError(`Failed to resolve active tournament ID: ${error.message}`);
        }
    }
}
