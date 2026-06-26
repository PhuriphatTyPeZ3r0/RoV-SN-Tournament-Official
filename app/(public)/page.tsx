import { Metadata } from 'next';
import Link from 'next/link';
import { serverApi } from '@/lib/api';
import HeroCarouselWrapper from '@/components/home/HeroCarouselWrapper';
import HomeContentWrapper from '@/components/home/HomeContentWrapper';

export async function generateMetadata(): Promise<Metadata> {
    const data = await serverApi.getHomePageData();
    const season = data.activeTournament?.season || 2027;
    const title = `RoV SN Tournament ${season}`;
    const description = `การแข่งขัน RoV ที่ยิ่งใหญ่ที่สุดในรั้ว SN - Witness the new legend unfold`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [`/images/key-visual/RoV-SN-TOURNAMENT-${season}.png`],
        },
    };
}

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

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
