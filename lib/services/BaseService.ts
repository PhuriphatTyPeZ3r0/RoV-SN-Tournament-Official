import { createClient } from '@/utils/supabase/server';
import { publicClient } from '@/utils/supabase/public';
import { DatabaseError } from '../errors';

export abstract class BaseService {
    /**
     * Get initialized Supabase server client (uses cookies/auth context)
     */
    protected static async getSupabaseClient() {
        return await createClient();
    }

    /**
     * Get cookie-free public Supabase client (safe for static rendering & caching)
     */
    protected static getPublicClient() {
        return publicClient;
    }

    /**
     * Resolve the active tournament ID for a given season or the default active season
     */
    protected static async getActiveTournamentId(season?: number): Promise<string | null> {
        try {
            const supabase = this.getPublicClient();
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
