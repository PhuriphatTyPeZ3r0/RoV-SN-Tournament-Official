import { Metadata } from 'next';
import { serverApi } from '@/lib/api';
import StandingsContent from '@/components/standings/StandingsContent';

export const metadata: Metadata = {
    title: 'Standings',
    description: 'ตารางคะแนน League Phase Rankings - RoV SN Tournament',
    openGraph: {
        title: 'Standings',
        description: 'ตารางคะแนนและอันดับทีมในการแข่งขัน',
    },
};

export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{ season?: string }>;
}

export default async function StandingsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const seasonNumber = params.season ? parseInt(params.season, 10) : undefined;
    
    const [data, tournaments] = await Promise.all([
        serverApi.getStandingsPageData(seasonNumber),
        serverApi.getTournaments()
    ]);
    
    // Find resolved season or fallback to active
    const currentSeason = seasonNumber || data.standings.length > 0 ? (tournaments.find(t => t.season === seasonNumber)?.season || tournaments.find(t => t.status === 'active')?.season || 2027) : 2027;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <StandingsContent
                standings={data.standings}
                teamLogos={data.teamLogos}
                tournaments={tournaments}
                currentSeason={currentSeason}
            />
        </div>
    );
}
