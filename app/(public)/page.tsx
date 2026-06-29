import { Metadata } from 'next';
import Link from 'next/link';
import { serverApi } from '@/lib/api';
import HeroCarouselWrapper from '@/components/home/HeroCarouselWrapper';
import HomeContentWrapper from '@/components/home/HomeContentWrapper';

// Static metadata — title is updated client-side or via revalidation on Vercel
export const metadata: Metadata = {
    title: 'RoV SN Tournament',
    description: 'การแข่งขัน RoV ที่ยิ่งใหญ่ที่สุดในรั้ว SN - Witness the new legend unfold',
    openGraph: {
        title: 'RoV SN Tournament',
        description: 'การแข่งขัน RoV ที่ยิ่งใหญ่ที่สุดในรั้ว SN',
    },
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
    // Fetch all data on the server
    const data = await serverApi.getHomePageData();

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Carousel - Client Side Only */}
            <HeroCarouselWrapper activeSeason={data.activeTournament?.season || 2027} />

            {/* Content Section - Client Side Only */}
            <HomeContentWrapper
                latestMatches={data.latestMatches}
                upcomingMatches={data.upcomingMatches}
                standings={data.standings}
                teamLogos={data.teamLogos}
            />
        </div>
    );
}
