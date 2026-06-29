import { Metadata } from 'next';
import { serverApi } from '@/lib/api';
import BracketsContent from '@/components/brackets/BracketsContent';

export const metadata: Metadata = {
    title: 'Tournament Bracket',
    description: 'สายการแข่งขันรอบ Knockout - RoV SN Tournament',
    openGraph: {
        title: 'Tournament Bracket',
        description: 'ดูสายการแข่งขันรอบน็อคเอาท์ การประกบคู่ และผู้ชนะแต่ละรอบ',
    },
};

export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{ season?: string }>;
}

export default async function BracketsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const seasonNumber = params.season ? parseInt(params.season, 10) : undefined;

    const [data, tournaments] = await Promise.all([
        serverApi.getBracketsPageData(seasonNumber),
        serverApi.getTournaments()
    ]);

    // Find resolved season or fallback to active
    const currentSeason = seasonNumber || (tournaments.find(t => t.status === 'active')?.season || 2027);

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <BracketsContent
                matches={data.matches}
                teamLogos={data.teamLogos}
                tournaments={tournaments}
                currentSeason={currentSeason}
            />
        </div>
    );
}
