'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Icon from '@/components/common/Icon';

interface Tournament {
    id: string;
    name: string;
    season: number;
    status: string;
}

interface SeasonSelectorProps {
    tournaments: Tournament[];
    currentSeason: number;
}

export default function SeasonSelector({ tournaments, currentSeason }: SeasonSelectorProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (season: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('season', season.toString());
        router.push(`${pathname}?${params.toString()}`);
        setIsOpen(false);
    };

    const selectedTournament = tournaments.find(t => t.season === currentSeason) || tournaments[0];

    if (tournaments.length <= 1) return null; // Hide if only 1 season exists

    return (
        <div className="relative inline-block text-left z-30 font-sans">
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex justify-between items-center w-32 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-white/15 hover:border-cyan-aura/40 focus:outline-none focus:ring-2 focus:ring-cyan-aura focus:ring-offset-2 focus:ring-offset-uefa-dark transition-all duration-300 cursor-pointer"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    <div className="flex items-center">
                        <Icon name="emoji_events" className="mr-2 text-cyan-aura text-xs" />
                        <span className="truncate max-w-[70px]">{selectedTournament ? selectedTournament.season : currentSeason}</span>
                    </div>
                    <Icon name="expand_more" className={`ml-1 text-xs transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-aura' : 'text-white/60'}`} />
                </button>
            </div>

            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsOpen(false)}
                    />
                    <div
                        className="origin-top-right absolute right-0 mt-2 w-32 rounded-xl shadow-2xl bg-uefa-dark/95 backdrop-blur-lg border border-white/10 focus:outline-none z-20 overflow-hidden animate-zoom-in"
                        role="menu"
                        aria-orientation="vertical"
                    >
                        <div className="py-1 bg-gradient-to-b from-white/5 to-transparent" role="none">
                            {tournaments.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => handleSelect(t.season)}
                                    className={`w-full text-left px-4 py-3 text-sm transition-all flex items-center justify-between cursor-pointer ${
                                        t.season === currentSeason 
                                            ? 'bg-cyan-aura/15 text-cyan-aura font-bold border-l-2 border-cyan-aura pl-3' 
                                            : 'text-white/80 hover:bg-white/5 hover:text-white pl-4'
                                    }`}
                                    role="menuitem"
                                >
                                    <span>{t.season}</span>
                                    {t.season === currentSeason && (
                                        <Icon name="done" className="text-xs text-cyan-aura" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
