import { BaseService } from './BaseService';
import { DatabaseError } from '../errors';

export class TournamentService extends BaseService {
    /**
     * Get list of all tournaments, ordered by season descending
     */
    public static async getTournaments() {
        try {
            const supabase = this.getPublicClient();
            const { data, error } = await supabase
                .from('tournaments')
                .select('*')
                .order('season', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error: any) {
            throw new DatabaseError(`Failed to fetch tournaments list: ${error.message}`);
        }
    }
}
