import { serverApi } from '@/lib/api';
import PlayerStatsContent from '@/components/stats/PlayerStatsContent';

export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{ season?: string }>;
}

export default async function PlayerStatsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const seasonNumber = params.season ? parseInt(params.season, 10) : undefined;
    const data = await serverApi.getPlayerStatsPageData(seasonNumber);

    return (
        <PlayerStatsContent
            playerStats={data.playerStats}
            playerHeroStats={data.playerHeroStats}
            heroes={data.heroes}
            teamLogos={data.teamLogos}
        />
    );
}
