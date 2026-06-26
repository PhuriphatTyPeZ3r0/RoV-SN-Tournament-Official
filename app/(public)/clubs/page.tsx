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

export default async function ClubsPage() {
    const data = await serverApi.getClubsPageData();

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <ClubsContent
                teams={data.teams}
                teamLogos={data.teamLogos}
            />
        </div>
    );
}
