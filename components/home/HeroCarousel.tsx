'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroCarouselProps {
    activeSeason: number;
}

export default function HeroCarousel({ activeSeason }: HeroCarouselProps) {
    const [imagePath, setImagePath] = useState(`/images/key-visual/RoV-SN-TOURNAMENT-${activeSeason}.png`);
    const [isLoading, setIsLoading] = useState(true);

    // Sync image path if activeSeason prop changes
    useEffect(() => {
        setImagePath(`/images/key-visual/RoV-SN-TOURNAMENT-${activeSeason}.png`);
        setIsLoading(true);
    }, [activeSeason]);

    return (
        <div className="relative w-full aspect-[21/9] bg-uefa-dark overflow-hidden shadow-2xl">
            <div className="carousel-wrapper h-full flex transition-transform duration-700 ease-in-out">
                <div className="carousel-slide relative min-w-full h-full">
                    <Image
                        src={imagePath}
                        alt={`RoV SN Tournament ${activeSeason}`}
                        fill
                        className={`object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        priority
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            // Fallback to 2026 if the active season image is missing (e.g. for 2027 draft state)
                            if (imagePath !== '/images/key-visual/RoV-SN-TOURNAMENT-2026.png') {
                                setImagePath('/images/key-visual/RoV-SN-TOURNAMENT-2026.png');
                            }
                        }}
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-uefa-dark/80 via-transparent to-transparent" />
                </div>
            </div>
        </div>
    );
}
