'use client';

import dynamic from 'next/dynamic';

// Dynamically import HeroCarousel with SSR disabled
const HeroCarousel = dynamic(() => import('./HeroCarousel'), {
    ssr: false,
    loading: () => <div className="w-full aspect-[3440/1440] bg-uefa-dark animate-pulse shadow-2xl"></div>,
});

interface HeroCarouselWrapperProps {
    activeSeason: number;
}

export default function HeroCarouselWrapper({ activeSeason }: HeroCarouselWrapperProps) {
    return <HeroCarousel activeSeason={activeSeason} />;
}
