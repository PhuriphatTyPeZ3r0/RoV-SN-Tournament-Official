import { Metadata } from 'next';
import { serverApi } from '@/lib/api';
import FixturesContent from '@/components/fixtures/FixturesContent';

export const metadata: Metadata = {
    title: 'Fixtures',
    description: 'ตารางการแข่งขันและผลการแข่ง - RoV SN Tournament',
    openGraph: {
        title: 'Fixtures',
        description: 'ดูตารางการแข่งขัน คู่แข่งขัน และผลการแข่งทั้งหมด',
    },
};

export const revalidate = 60;

interface PageProps {
    searchParams: Promise<{ season?: string }>;
}

export default async function FixturesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const seasonNumber = params.season ? parseInt(params.season, 10) : undefined;
    
    const [data, tournaments] = await Promise.all([
        serverApi.getFixturesPageData(seasonNumber),
        serverApi.getTournaments()
    ]);
    
    // Find resolved season or fallback to active
    const currentSeason = seasonNumber || data.schedule.length > 0 ? (tournaments.find(t => t.season === seasonNumber)?.season || tournaments.find(t => t.status === 'active')?.season || 2027) : 2027;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <FixturesContent
                schedule={data.schedule as any}
                results={data.results as any}
                teamLogos={data.teamLogos as any}
                tournaments={tournaments}
                currentSeason={currentSeason}
            />
        </div>
    );
}
