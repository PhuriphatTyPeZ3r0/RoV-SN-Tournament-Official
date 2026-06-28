'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface HeroCarouselProps {
    activeSeason: number;
}

export default function HeroCarousel({ activeSeason }: HeroCarouselProps) {
    const { language } = useLanguage();
    
    // Available seasons to slide through
    const seasonsList = [2027, 2026, 2025, 2024, 2023];
    
    // Sort seasons to put the active season first
    const orderedSeasons = [
        activeSeason,
        ...seasonsList.filter(s => s !== activeSeason)
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Setup Autoplay Timer (5 seconds)
    useEffect(() => {
        if (!isPaused) {
            autoplayTimerRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % orderedSeasons.length);
            }, 5000);
        }

        return () => {
            if (autoplayTimerRef.current) {
                clearInterval(autoplayTimerRef.current);
            }
        };
    }, [isPaused, orderedSeasons.length]);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentSlide((prev) => (prev - 1 + orderedSeasons.length) % orderedSeasons.length);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentSlide((prev) => (prev + 1) % orderedSeasons.length);
    };

    return (
        <div 
            className="relative w-full aspect-[3440/1440] bg-uefa-dark overflow-hidden shadow-2xl group select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Slides Wrapper */}
            <div 
                className="h-full flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
            >
                {orderedSeasons.map((season, idx) => (
                    <div key={season} className="relative min-w-full h-full">
                        <Image
                            src={`/images/key-visual/RoV-SN-TOURNAMENT-${season}.png`}
                            alt={`RoV SN Tournament ${season}`}
                            fill
                            className="object-cover"
                            priority={idx === 0}
                            sizes="100vw"
                        />
                        {/* Shadow Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-uefa-dark/80 via-transparent to-transparent" />
                        
                        {/* Premium Season Badge */}
                        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 flex flex-col gap-1 md:gap-2 animate-fadeIn">
                            <span className="px-3 py-1 bg-black/45 backdrop-blur-md border border-cyan-aura/40 rounded-full text-[10px] md:text-xs font-display font-black tracking-widest text-cyan-aura w-fit shadow-md uppercase">
                                {language === 'th' ? `ซีซั่น ${season}` : `SEASON ${season}`}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Left Control Arrow */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/60 border border-white/10 hover:border-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-30 cursor-pointer shadow-md"
                aria-label="Previous Slide"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* Right Control Arrow */}
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/60 border border-white/10 hover:border-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-30 cursor-pointer shadow-md"
                aria-label="Next Slide"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
                {orderedSeasons.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            currentSlide === idx 
                                ? 'w-6 bg-cyan-aura shadow-[0_0_8px_rgba(34,211,238,0.6)]' 
                                : 'w-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
