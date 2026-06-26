'use client';

import { useState } from 'react';
import TeamLogo from '@/components/common/TeamLogo';
import ShareButton from '@/components/common/ShareButton';
import { useLanguage } from '@/components/providers/LanguageProvider';
import SeasonSelector from '@/components/common/SeasonSelector';

interface Match {
    id: string;
    match_key: string;
    match_day: number;
    team_blue_name: string;
    team_red_name: string;
    score_blue: number;
    score_red: number;
    winner_name: string | null;
    loser_name: string | null;
    is_bye_win: boolean;
}

interface BracketsContentProps {
    matches: Match[];
    teamLogos: Record<string, string>;
    tournaments: any[];
    currentSeason: number;
}

export default function BracketsContent({ matches, teamLogos, tournaments, currentSeason }: BracketsContentProps) {
    const { t, language } = useLanguage();
    const isThai = language === 'th';
    const [activeStage, setActiveStage] = useState<'semi' | 'finals'>('semi');

    // 1. Group matches into Semi-Finals, Grand Final, and 3rd Place Match
    const semiFinals = matches.filter(m => m.match_day === 10 || m.match_day === 90);
    const grandFinal = matches.find(m => m.match_day === 11 || m.match_day === 91);
    const thirdPlace = matches.find(m => m.match_day === 12 || m.match_day === 92);

    // 2. Identify teams for Semi Finals
    const sf1 = semiFinals[0] || null;
    const sf2 = semiFinals[1] || null;

    // 3. Determine TBD display for Grand Final and 3rd Place if not yet created or completed
    const getWinnerName = (match: Match | null, fallbackLabel: string) => {
        if (!match) return fallbackLabel;
        if (match.winner_name) return match.winner_name;
        if (match.is_bye_win && match.team_blue_name) return match.team_blue_name;
        return fallbackLabel;
    };

    const getLoserName = (match: Match | null, fallbackLabel: string) => {
        if (!match) return fallbackLabel;
        if (match.loser_name) return match.loser_name;
        return fallbackLabel;
    };

    const sf1Winner = getWinnerName(sf1, t.brackets.sf1Winner);
    const sf2Winner = getWinnerName(sf2, t.brackets.sf2Winner);
    const sf1Loser = getLoserName(sf1, t.brackets.sf1Loser);
    const sf2Loser = getLoserName(sf2, t.brackets.sf2Loser);

    // Grand Final team displays
    const gfBlue = grandFinal ? grandFinal.team_blue_name : sf1Winner;
    const gfRed = grandFinal ? grandFinal.team_red_name : sf2Winner;

    // Third Place Match team displays
    const tpBlue = thirdPlace ? thirdPlace.team_blue_name : sf1Loser;
    const tpRed = thirdPlace ? thirdPlace.team_red_name : sf2Loser;

    // Determine champion
    let championName: string | null = null;
    if (grandFinal && grandFinal.winner_name) {
        championName = grandFinal.winner_name;
    } else if (grandFinal && grandFinal.is_bye_win) {
        championName = grandFinal.winner_name || grandFinal.team_blue_name;
    }

    // Determine 3rd Place Winner
    let thirdPlaceWinnerName: string | null = null;
    if (thirdPlace && thirdPlace.winner_name) {
        thirdPlaceWinnerName = thirdPlace.winner_name;
    } else if (thirdPlace && thirdPlace.is_bye_win) {
        thirdPlaceWinnerName = thirdPlace.winner_name || thirdPlace.team_blue_name;
    }

    const renderMatchCard = (
        match: Match | null, 
        roundTitle: string, 
        defaultBlue = 'TBD', 
        defaultRed = 'TBD',
        isGf = false,
        is3rd = false
    ) => {
        const teamBlue = match ? match.team_blue_name : defaultBlue;
        const teamRed = match ? match.team_red_name : defaultRed;
        const scoreBlue = match ? match.score_blue : 0;
        const scoreRed = match ? match.score_red : 0;
        const isPlayed = match ? (match.score_blue !== 0 || match.score_red !== 0 || match.is_bye_win || match.winner_name) : false;

        const blueWon = isPlayed && match && (match.winner_name === teamBlue || (match.is_bye_win && match.winner_name === teamBlue));
        const redWon = isPlayed && match && (match.winner_name === teamRed || (match.is_bye_win && match.winner_name === teamRed));

        return (
            <div className={`w-[280px] sm:w-[320px] bg-white rounded-2xl shadow-md border overflow-hidden hover:shadow-xl transition-all duration-300 ${isGf ? 'border-2 border-cyan-aura shadow-cyan-aura/10 scale-105' : is3rd ? 'border border-amber-500/40 shadow-amber-500/5' : 'border-gray-100'}`}>
                {/* Round Header */}
                <div className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider text-center ${isGf ? 'bg-gradient-to-r from-cyan-dark to-cyan-aura text-white' : is3rd ? 'bg-gradient-to-r from-amber-600 to-amber-400 text-white' : 'bg-uefa-dark text-white'}`}>
                    {roundTitle}
                </div>

                {/* Teams List */}
                <div className="p-3 space-y-2">
                    {/* Team Blue */}
                    <div className={`flex items-center justify-between p-2 rounded-lg transition-colors ${blueWon ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-transparent'}`}>
                        <div className="flex items-center gap-3 min-w-0">
                            <TeamLogo teamName={teamBlue} logoUrl={teamLogos[teamBlue]} size="sm" />
                            <span className={`text-sm truncate font-medium ${blueWon ? 'text-green-700 font-bold' : 'text-gray-800'}`}>
                                {teamBlue}
                            </span>
                        </div>
                        {isPlayed && (
                            <span className={`text-base font-display font-bold px-2 ${blueWon ? 'text-green-600' : 'text-gray-400'}`}>
                                {scoreBlue}
                            </span>
                        )}
                    </div>

                    {/* Team Red */}
                    <div className={`flex items-center justify-between p-2 rounded-lg transition-colors ${redWon ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-transparent'}`}>
                        <div className="flex items-center gap-3 min-w-0">
                            <TeamLogo teamName={teamRed} logoUrl={teamLogos[teamRed]} size="sm" />
                            <span className={`text-sm truncate font-medium ${redWon ? 'text-green-700 font-bold' : 'text-gray-800'}`}>
                                {teamRed}
                            </span>
                        </div>
                        {isPlayed && (
                            <span className={`text-base font-display font-bold px-2 ${redWon ? 'text-green-600' : 'text-gray-400'}`}>
                                {scoreRed}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Page Header */}
            <div className="bg-uefa-dark py-6 md:py-12 mb-8 shadow-lg border-b-4 border-cyan-aura">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-2xl md:text-4xl font-display font-bold text-white uppercase tracking-wider truncate">
                            {t.nav.brackets}
                        </h1>
                        <p className="text-cyan-aura/80 font-sans mt-1 text-xs md:text-base hidden sm:block">
                            {t.brackets.subtitle}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                        <SeasonSelector tournaments={tournaments} currentSeason={currentSeason} />
                        <ShareButton title={`${t.nav.brackets} - RoV SN Tournament`} />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {semiFinals.length === 0 && !grandFinal ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-lg mx-auto">
                        <i className="fas fa-sitemap text-6xl text-gray-300 mb-4"></i>
                        <p className="text-gray-500 text-lg font-medium">{t.brackets.notReady}</p>
                        <p className="text-gray-400 text-sm mt-1">{t.brackets.waitAdmin}</p>
                    </div>
                ) : (
                    <>
                        {/* Mobile Tab Switcher */}
                        <div className="flex md:hidden bg-white/60 p-1.5 rounded-2xl mb-8 border border-gray-200/50 shadow-sm backdrop-blur-md max-w-md mx-auto">
                            <button
                                onClick={() => setActiveStage('semi')}
                                className={`flex-1 py-3 text-xs font-bold font-display uppercase tracking-widest rounded-xl transition-all duration-300 ${
                                    activeStage === 'semi'
                                        ? 'bg-uefa-dark text-white shadow-md shadow-uefa-dark/15 scale-100'
                                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
                                }`}
                            >
                                <i className="fas fa-sitemap mr-2"></i>
                                {t.brackets.semiFinals}
                            </button>
                            <button
                                onClick={() => setActiveStage('finals')}
                                className={`flex-1 py-3 text-xs font-bold font-display uppercase tracking-widest rounded-xl transition-all duration-300 ${
                                    activeStage === 'finals'
                                        ? 'bg-uefa-dark text-white shadow-md shadow-uefa-dark/15 scale-100'
                                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
                                }`}
                            >
                                <i className="fas fa-trophy mr-2"></i>
                                {t.brackets.finals}
                            </button>
                        </div>

                        <div className="w-full overflow-x-auto md:overflow-x-auto py-4 md:py-8 scrollbar-thin">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative px-4 md:px-8 py-4 min-w-0 md:min-w-[1200px]">
                                
                                {/* Column 1: Semi Finals */}
                                <div className={`${activeStage === 'semi' ? 'flex' : 'hidden'} md:flex flex-col gap-16 justify-center py-4`}>
                                    <h3 className="text-center font-display font-bold text-gray-400 tracking-wider text-xs uppercase -mb-10">
                                        {t.fixtures.semiFinal}
                                    </h3>
                                    {/* Semi Final 1 */}
                                    <div className="relative group mt-6">
                                        {renderMatchCard(sf1, t.brackets.sf1Title, 'TBD', 'TBD')}
                                        {/* Line connector to right */}
                                        <div className="absolute top-1/2 -right-12 w-12 h-0.5 bg-gray-200 group-hover:bg-cyan-aura/50 transition-colors z-0"></div>
                                    </div>
                                    
                                    {/* Semi Final 2 */}
                                    <div className="relative group">
                                        {renderMatchCard(sf2, t.brackets.sf2Title, 'TBD', 'TBD')}
                                        {/* Line connector to right */}
                                        <div className="absolute top-1/2 -right-12 w-12 h-0.5 bg-gray-200 group-hover:bg-cyan-aura/50 transition-colors z-0"></div>
                                    </div>
                                </div>

                                {/* Column 2: Vertical Bracket Connector Lines (drawn using SVG) */}
                                <div className="hidden md:flex w-16 h-[440px] items-center justify-center relative">
                                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                        {/* Winner lines to Grand Final */}
                                        <path 
                                            d="M 0 100 L 32 100 L 32 145 L 64 145" 
                                            fill="none" 
                                            stroke="#E2E8F0" 
                                            strokeWidth="3"
                                            className="transition-all duration-300 hover:stroke-cyan-aura"
                                        />
                                        <path 
                                            d="M 0 340 L 32 340 L 32 195 L 64 195" 
                                            fill="none" 
                                            stroke="#E2E8F0" 
                                            strokeWidth="3"
                                            className="transition-all duration-300 hover:stroke-cyan-aura"
                                        />
                                        
                                        {/* Loser lines to 3rd Place Match (dashed) */}
                                        <path 
                                            d="M 0 100 L 20 100 L 20 275 L 64 275" 
                                            fill="none" 
                                            stroke="#CBD5E1" 
                                            strokeWidth="2"
                                            strokeDasharray="4 4"
                                            className="transition-all duration-300 hover:stroke-amber-500/50"
                                        />
                                        <path 
                                            d="M 0 340 L 20 340 L 20 315 L 64 315" 
                                            fill="none" 
                                            stroke="#CBD5E1" 
                                            strokeWidth="2"
                                            strokeDasharray="4 4"
                                            className="transition-all duration-300 hover:stroke-amber-500/50"
                                        />
                                    </svg>
                                </div>

                                {/* Column 3: Grand Final & 3rd Place Match */}
                                <div className={`${activeStage === 'finals' ? 'flex' : 'hidden'} md:flex flex-col gap-12 justify-center py-4`}>
                                    {/* Grand Final */}
                                    <div className="relative group">
                                        <h3 className="text-center font-display font-bold text-gray-400 tracking-wider text-xs uppercase mb-3">
                                            {t.fixtures.grandFinal}
                                        </h3>
                                        {renderMatchCard(grandFinal || null, t.fixtures.grandFinal, gfBlue, gfRed, true, false)}
                                        {/* Line connector to Champion */}
                                        <div className="absolute top-[62%] -right-12 w-12 h-0.5 bg-cyan-aura/40 z-0"></div>
                                    </div>

                                    {/* 3rd Place Match */}
                                    <div className="relative group">
                                        <h3 className="text-center font-display font-bold text-gray-400 tracking-wider text-xs uppercase mb-3">
                                            {t.brackets.thirdPlace}
                                        </h3>
                                        {renderMatchCard(thirdPlace || null, t.brackets.thirdPlace, tpBlue, tpRed, false, true)}
                                        {/* Line connector to 3rd Place Winner */}
                                        <div className="absolute top-[62%] -right-12 w-12 h-0.5 bg-amber-500/30 z-0"></div>
                                    </div>
                                </div>

                                {/* Column 4: Podium / Final Standing Displays */}
                                <div className={`${activeStage === 'finals' ? 'flex' : 'hidden'} md:flex flex-col gap-8 justify-center py-4 pl-0 md:pl-4`}>
                                    {/* Champion Display */}
                                    <div className={`w-[240px] p-6 rounded-3xl text-center border-2 transition-all duration-500 flex flex-col items-center justify-center gap-3 ${championName ? 'bg-gradient-to-b from-yellow-400/10 via-yellow-500/5 to-white border-yellow-400 shadow-xl shadow-yellow-500/10 scale-105' : 'bg-white border-dashed border-gray-300'}`}>
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${championName ? 'bg-yellow-400 text-white animate-bounce' : 'bg-gray-100 text-gray-400'}`}>
                                            <i className="fas fa-trophy text-2xl"></i>
                                        </div>
                                        
                                        <div>
                                            <h4 className="font-display font-bold uppercase tracking-wider text-xs text-gray-400">
                                                {t.brackets.champion}
                                            </h4>
                                            {championName ? (
                                                <div className="mt-2 space-y-2">
                                                    <div className="flex justify-center">
                                                        <TeamLogo teamName={championName} logoUrl={teamLogos[championName]} size="md" />
                                                    </div>
                                                    <p className="font-display font-bold text-lg text-yellow-600 tracking-wide uppercase drop-shadow-sm">
                                                        {championName}
                                                    </p>
                                                    <span className="inline-block bg-yellow-400/20 text-yellow-700 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest">
                                                        Winner
                                                    </span>
                                                </div>
                                            ) : (
                                                <p className="text-gray-400 text-xs italic mt-1">
                                                    {t.brackets.awaitingChampion}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* 3rd Place Display */}
                                    <div className={`w-[240px] p-5 rounded-3xl text-center border transition-all duration-500 flex flex-col items-center justify-center gap-3 ${thirdPlaceWinnerName ? 'bg-gradient-to-b from-amber-600/10 via-amber-700/5 to-white border-amber-600/60 shadow-lg scale-100' : 'bg-white border-dashed border-gray-200'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${thirdPlaceWinnerName ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            <i className="fas fa-medal text-lg"></i>
                                        </div>
                                        
                                        <div>
                                            <h4 className="font-display font-bold uppercase tracking-wider text-[10px] text-gray-400">
                                                {t.brackets.thirdPlaceTitle}
                                            </h4>
                                            {thirdPlaceWinnerName ? (
                                                <div className="mt-1.5 space-y-1.5">
                                                    <div className="flex justify-center">
                                                        <TeamLogo teamName={thirdPlaceWinnerName} logoUrl={teamLogos[thirdPlaceWinnerName]} size="sm" />
                                                    </div>
                                                    <p className="font-display font-bold text-base text-amber-700 tracking-wide uppercase">
                                                        {thirdPlaceWinnerName}
                                                    </p>
                                                    <span className="inline-block bg-amber-600/20 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                                                        Bronze
                                                    </span>
                                                </div>
                                            ) : (
                                                <p className="text-gray-400 text-[10px] italic mt-1">
                                                    {t.brackets.awaitingThirdPlace}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
