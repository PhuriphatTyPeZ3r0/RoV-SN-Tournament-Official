import { serverApi } from '@/lib/api';
import TeamStatsContent from '@/components/stats/TeamStatsContent';

export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{ season?: string }>;
}

export default async function TeamStatsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const seasonNumber = params.season ? parseInt(params.season, 10) : undefined;
    const data = await serverApi.getTeamStatsPageData(seasonNumber);

    return (
        <TeamStatsContent
            teamStats={data.teamStats}
            teamLogos={data.teamLogos}
        />
    );
}
