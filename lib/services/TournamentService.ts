import { BaseService } from './BaseService';
import { DatabaseError } from '../errors';
import { withTimeout, SERVICE_TIMEOUT_MS } from '@/lib/utils';

export class TournamentService extends BaseService {
    /**
     * Get list of all tournaments, ordered by season descending
     */
    public static async getTournaments() {
        return withTimeout(
            (async () => {
                try {
                    const supabase = this.getPublicClient();
                    const { data, error } = await supabase
                        .from('tbl_trn_tournaments')
                        .select('*')
                        .order('season', { ascending: false });

                    if (error) throw error;
                    return data || [];
                } catch (error: any) {
                    console.error(`Failed to fetch tournaments list: ${error.message}`);
                    return [];
                }
            })(),
            SERVICE_TIMEOUT_MS,
            [],
        );
    }
}
