import { serverApi } from '@/lib/api';
import SeasonStatsContent from '@/components/stats/SeasonStatsContent';

export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{ season?: string }>;
}

export default async function StatsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const seasonNumber = params.season ? parseInt(params.season, 10) : undefined;
    const data = await serverApi.getSeasonStatsPageData(seasonNumber);

    return (
        <SeasonStatsContent
            seasonStats={data.seasonStats}
            heroes={data.heroes}
            teamLogos={data.teamLogos}
        />
    );
}
