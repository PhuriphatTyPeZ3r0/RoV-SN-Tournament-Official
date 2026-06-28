import { Metadata } from 'next';
import { serverApi } from '@/lib/api';
import ClubsContent from '@/components/clubs/ClubsContent';

export const metadata: Metadata = {
    title: 'Clubs',
    description: 'ทีมที่เข้าร่วมแข่งขัน RoV SN Tournament',
    openGraph: {
        title: 'Clubs',
        description: 'รายชื่อทีมทั้งหมดที่เข้าร่วมการแข่งขัน',
    },
};

export const revalidate = 60;

interface PageProps {
    searchParams: Promise<{ season?: string }>;
}

export default async function ClubsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const seasonNumber = params.season ? parseInt(params.season, 10) : undefined;

    const data = await serverApi.getClubsPageData(seasonNumber);

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <ClubsContent
                teams={data.teams}
                teamLogos={data.teamLogos}
                tournaments={data.tournaments}
                currentSeason={data.currentSeason}
            />
        </div>
    );
}
