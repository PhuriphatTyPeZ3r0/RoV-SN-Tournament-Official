'use client';

import { useState } from 'react';
import TeamLogo from '@/components/common/TeamLogo';
import { useLanguage } from '@/components/providers/LanguageProvider';
import type { PlayerStat, Hero, PlayerHeroStat } from '@/types';

interface PlayerStatsContentProps {
    playerStats: PlayerStat[];
    playerHeroStats: PlayerHeroStat[];
    heroes: Hero[];
    teamLogos: Record<string, string>;
}

export default function PlayerStatsContent({ playerStats, playerHeroStats, heroes, teamLogos }: PlayerStatsContentProps) {
    const { t, language } = useLanguage();
    const isThai = language === 'th';
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerStat | null>(null);

    const getHeroImage = (heroName: string): string | null => {
        const hero = heroes.find(h => h.name === heroName);
        return hero?.imageUrl || null;
    };

    const getPlayerTopHeroes = (playerRealName: string) => {
        const playerHeroStat = playerHeroStats.find(h =>
            h.realName === playerRealName || h.playerName === playerRealName
        );
        return playerHeroStat?.topHeroes || [];
    };

    if (playerStats.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <i className="fas fa-user-ninja text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500 text-lg">{t.common.noData}</p>
            </div>
        );
    }

    // Radar Chart Calculation Helper
    const renderRadarChart = (player: PlayerStat) => {
        const center = 120;
        const radius = 80;
        
        // Define axis labels & normalized values (0 to 100)
        const metrics = [
            { label: t.stats.winRateRate, val: player.winRate || 0, max: 100, display: `${player.winRate || 0}%` },
            { label: t.stats.kdaRate, val: player.kda || 0, max: 10, display: player.kda?.toFixed(2) || '0.00' },
            { label: t.stats.avgKills, val: player.avgKillsPerGame || 0, max: 8, display: player.avgKillsPerGame?.toFixed(1) || '0.0' },
            { label: t.stats.avgAssists, val: player.avgAssistsPerGame || 0, max: 10, display: player.avgAssistsPerGame?.toFixed(1) || '0.0' },
            { label: t.stats.mvpRate, val: player.mvpRate ? player.mvpRate * 100 : (player.mvpCount && player.gamesPlayed ? (player.mvpCount / player.gamesPlayed) * 100 : 0), max: 50, display: `${(player.mvpRate ? player.mvpRate * 100 : (player.mvpCount && player.gamesPlayed ? (player.mvpCount / player.gamesPlayed) * 100 : 0)).toFixed(0)}%` }
        ];

        // Angles for a pentagon (5 vertices)
        const angles = [
            -Math.PI / 2,                  // Top
            -Math.PI / 2 + (2 * Math.PI) / 5, // Top-Right
            -Math.PI / 2 + (4 * Math.PI) / 5, // Bottom-Right
            -Math.PI / 2 + (6 * Math.PI) / 5, // Bottom-Left
            -Math.PI / 2 + (8 * Math.PI) / 5  // Top-Left
        ];

        // Generate points for polygon
        const points = metrics.map((m, i) => {
            const scorePercent = Math.min(100, (m.val / m.max) * 100);
            const x = center + (radius * (scorePercent / 100)) * Math.cos(angles[i]);
            const y = center + (radius * (scorePercent / 100)) * Math.sin(angles[i]);
            return `${x},${y}`;
        }).join(' ');

        // Background grid pentagons (25%, 50%, 75%, 100%)
        const gridLevels = [0.25, 0.50, 0.75, 1.0];
        const gridPoints = gridLevels.map(level => {
            return angles.map((angle) => {
                const x = center + (radius * level) * Math.cos(angle);
                const y = center + (radius * level) * Math.sin(angle);
                return `${x},${y}`;
            }).join(' ');
        });

        return (
            <div className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-inner">
                <svg width="240" height="240" viewBox="0 0 240 240" className="overflow-visible">
                    {/* Grid pentagons */}
                    {gridPoints.map((pointsStr, i) => (
                        <polygon
                            key={i}
                            points={pointsStr}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.08)"
                            strokeWidth="1.5"
                        />
                    ))}
                    
                    {/* Axis lines */}
                    {angles.map((angle, i) => {
                        const x = center + radius * Math.cos(angle);
                        const y = center + radius * Math.sin(angle);
                        return (
                            <line
                                key={i}
                                x1={center}
                                y1={center}
                                x2={x}
                                y2={y}
                                stroke="rgba(255, 255, 255, 0.08)"
                                strokeWidth="1"
                            />
                        );
                    })}

                    {/* Data Polygon */}
                    <polygon
                        points={points}
                        fill="rgba(21, 200, 255, 0.25)"
                        stroke="var(--theme-primary, #15C8FF)"
                        strokeWidth="2.5"
                        className="transition-all duration-500 ease-in-out"
                    />

                    {/* Outer Label Placements */}
                    {metrics.map((m, i) => {
                        const labelRadius = radius + 22;
                        const labelX = center + labelRadius * Math.cos(angles[i]);
                        const labelY = center + labelRadius * Math.sin(angles[i]);
                        
                        let textAnchor: "middle" | "start" | "end" = "middle";
                        if (Math.cos(angles[i]) > 0.1) textAnchor = "start";
                        else if (Math.cos(angles[i]) < -0.1) textAnchor = "end";

                        return (
                            <g key={i} className="font-sans">
                                <text
                                    x={labelX}
                                    y={labelY - 5}
                                    textAnchor={textAnchor}
                                    fill="#E8F7FF"
                                    fontSize="10"
                                    fontWeight="bold"
                                    className="select-none"
                                >
                                    {m.label}
                                </text>
                                <text
                                    x={labelX}
                                    y={labelY + 8}
                                    textAnchor={textAnchor}
                                    fill="var(--theme-primary, #15C8FF)"
                                    fontSize="11"
                                    fontWeight="black"
                                    className="select-none"
                                >
                                    {m.display}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div className="bg-cyan-aura/10 border border-cyan-aura/20 p-4 rounded-2xl flex items-center gap-3 text-cyan-aura text-xs md:text-sm font-sans mb-2">
                <i className="fas fa-info-circle text-base"></i>
                <span>{t.stats.clickHint}</span>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full uefa-table min-w-[1200px]">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <th className="p-3 text-center w-12 text-uefa-dark border-b border-gray-200">#</th>
                                <th className="p-3 text-left text-uefa-dark border-b border-gray-200">{t.stats.playerShort}</th>
                                <th className="p-3 text-left text-uefa-dark border-b border-gray-200">{t.stats.team}</th>
                                <th className="p-3 text-center text-uefa-dark border-b border-gray-200" title="Top Heroes">{t.stats.heroes}</th>
                                <th className="p-3 text-center text-uefa-dark border-b border-gray-200" title="Games">G</th>
                                <th className="p-3 text-center text-uefa-dark border-b border-gray-200" title="Win Rate">WR%</th>
                                <th className="p-3 text-center text-blue-600 border-b border-gray-200" title="Kills">K</th>
                                <th className="p-3 text-center text-red-500 border-b border-gray-200" title="Deaths">D</th>
                                <th className="p-3 text-center text-green-600 border-b border-gray-200" title="Assists">A</th>
                                <th className="p-3 text-center text-yellow-600 border-b border-gray-200" title="MVP Count">MVP</th>
                                <th className="p-3 text-center text-cyan-aura font-bold border-b border-gray-200" title="KDA Ratio">KDA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerStats.slice(0, 50).map((p, idx) => {
                                const topHeroes = getPlayerTopHeroes(p.realName || p.playerName);
                                const isTop3 = idx < 3;
                                const kda = p.kda?.toFixed(2) || '0.00';
                                const winRate = p.winRate || 0;

                                return (
                                    <tr 
                                        key={`${p.teamName}-${p.realName || p.playerName}`} 
                                        onClick={() => setSelectedPlayer(p)}
                                        className={`hover:bg-cyan-aura/5 cursor-pointer transition border-b border-gray-100 last:border-0 ${isTop3 ? 'bg-gradient-to-r from-yellow-50/50 to-transparent' : ''}`}
                                    >
                                        {/* Rank */}
                                        <td className="p-3 text-center">
                                            {idx === 0 ? (
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold shadow-md mx-auto">1</div>
                                            ) : idx === 1 ? (
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white font-bold shadow-md mx-auto">2</div>
                                            ) : idx === 2 ? (
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold shadow-md mx-auto">3</div>
                                            ) : (
                                                <span className="text-gray-400 font-bold">{idx + 1}</span>
                                            )}
                                        </td>
                                        {/* Player Name */}
                                        <td className="p-3">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-uefa-dark hover:text-cyan-aura">{p.realName || p.playerName}</span>
                                                {p.realName && p.playerName && p.realName !== p.playerName && (
                                                    <span className="text-xs text-gray-400">IGN: {p.playerName}</span>
                                                )}
                                            </div>
                                        </td>
                                        {/* Team */}
                                        <td className="p-3">
                                            <div className="flex items-center gap-2">
                                                <TeamLogo teamName={p.teamName} logoUrl={teamLogos[p.teamName]} size="sm" />
                                                <span className="text-sm text-gray-600 truncate max-w-[120px]">{p.teamName}</span>
                                            </div>
                                        </td>
                                        {/* Top Heroes */}
                                        <td className="p-2 max-w-[120px]">
                                            <div className="flex gap-1 justify-center">
                                                {topHeroes.length > 0 ? (
                                                    topHeroes.slice(0, 3).map((hero, i) => (
                                                        <div key={i} title={`${hero.heroName} (${hero.gamesPlayed} games)`}>
                                                            {getHeroImage(hero.heroName) ? (
                                                                <img src={getHeroImage(hero.heroName)!} alt={hero.heroName} className="w-7 h-7 rounded border border-gray-200 object-cover bg-gray-900" />
                                                            ) : (
                                                                <div className="w-7 h-7 rounded bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                                                    {hero.heroName?.charAt(0)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-300">-</span>
                                                )}
                                            </div>
                                        </td>
                                        {/* Games */}
                                        <td className="p-3 text-center font-mono text-gray-600 font-bold">{p.gamesPlayed}</td>
                                        {/* Win Rate */}
                                        <td className="p-3 text-center">
                                            <span className={`font-bold text-sm ${winRate >= 70 ? 'text-green-600' : winRate >= 50 ? 'text-cyan-600' : 'text-orange-500'}`}>
                                                {winRate}%
                                            </span>
                                        </td>
                                        {/* K/D/A */}
                                        <td className="p-3 text-center font-mono font-bold text-blue-600">{p.totalKills}</td>
                                        <td className="p-3 text-center font-mono font-bold text-red-500">{p.totalDeaths}</td>
                                        <td className="p-3 text-center font-mono font-bold text-green-600">{p.totalAssists}</td>
                                        {/* MVP */}
                                        <td className="p-3 text-center">
                                            {p.mvpCount > 0 ? (
                                                <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold text-sm">
                                                    <i className="fas fa-crown text-xs"></i>
                                                    {p.mvpCount}
                                                </span>
                                            ) : (
                                                <span className="text-gray-300">-</span>
                                            )}
                                        </td>
                                        {/* KDA */}
                                        <td className="p-3 text-center">
                                            <span className="text-lg font-bold text-cyan-aura bg-cyan-aura/10 px-3 py-1 rounded-lg inline-block">{kda}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
                {playerStats.slice(0, 30).map((p, idx) => {
                    const topHeroes = getPlayerTopHeroes(p.realName || p.playerName);
                    const isTop3 = idx < 3;
                    const kda = p.kda?.toFixed(2) || '0.00';
                    const winRate = p.winRate || 0;

                    return (
                        <div 
                            key={`${p.teamName}-${p.realName || p.playerName}`} 
                            onClick={() => setSelectedPlayer(p)}
                            className={`bg-white rounded-xl p-4 border cursor-pointer active:bg-cyan-aura/5 transition-colors ${isTop3 ? 'border-yellow-200 shadow-md' : 'border-gray-200'}`}
                        >
                            {/* Header: Rank + Player + KDA */}
                            <div className="flex items-center gap-3 mb-3">
                                {idx === 0 ? (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold shadow-lg">1</div>
                                ) : idx === 1 ? (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white font-bold shadow-lg">2</div>
                                ) : idx === 2 ? (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">3</div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">{idx + 1}</div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-uefa-dark hover:text-cyan-aura truncate">{p.realName || p.playerName}</p>
                                    {p.realName && p.playerName && p.realName !== p.playerName && (
                                        <p className="text-xs text-gray-400 truncate">IGN: {p.playerName}</p>
                                    )}
                                    <div className="flex items-center gap-1.5">
                                        <TeamLogo teamName={p.teamName} logoUrl={teamLogos[p.teamName]} size="sm" />
                                        <span className="text-xs text-gray-500 truncate">{p.teamName}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold text-cyan-aura">{kda}</div>
                                    <div className="text-xs text-gray-500">KDA</div>
                                </div>
                            </div>

                            {/* Top Heroes */}
                            {topHeroes.length > 0 && (
                                <div className="flex gap-1 mb-3">
                                    {topHeroes.slice(0, 3).map((hero, i) => (
                                        <div key={i} title={hero.heroName}>
                                            {getHeroImage(hero.heroName) ? (
                                                <img src={getHeroImage(hero.heroName)!} alt={hero.heroName} className="w-8 h-8 rounded border border-gray-200 object-cover bg-gray-900" />
                                            ) : (
                                                <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                                    {hero.heroName?.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Stats Grid */}
                            <div className="grid grid-cols-5 gap-1.5 mb-3">
                                <div className="text-center p-1.5 bg-gray-50 rounded-lg">
                                    <div className="text-gray-700 font-bold text-sm">{p.gamesPlayed}</div>
                                    <div className="text-xs text-gray-400">G</div>
                                </div>
                                <div className="text-center p-1.5 bg-green-50 rounded-lg">
                                    <div className={`font-bold text-sm ${winRate >= 70 ? 'text-green-600' : winRate >= 50 ? 'text-cyan-600' : 'text-orange-500'}`}>{winRate}%</div>
                                    <div className="text-xs text-gray-400">WR</div>
                                </div>
                                <div className="text-center p-1.5 bg-yellow-50 rounded-lg">
                                    <div className="text-yellow-600 font-bold text-sm">{p.mvpCount || 0}</div>
                                    <div className="text-xs text-gray-400">MVP</div>
                                </div>
                                <div className="text-center p-1.5 bg-blue-50 rounded-lg">
                                    <div className="text-blue-600 font-bold text-sm">{p.avgKillsPerGame?.toFixed(1) || 0}</div>
                                    <div className="text-xs text-gray-400">K/G</div>
                                </div>
                                <div className="text-center p-1.5 bg-green-50 rounded-lg">
                                    <div className="text-green-600 font-bold text-sm">{p.avgAssistsPerGame?.toFixed(1) || 0}</div>
                                    <div className="text-xs text-gray-400">A/G</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* In-depth Player Stats Modal with Radar Chart */}
            {selectedPlayer && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-uefa-dark text-white rounded-3xl border border-white/10 w-full max-w-lg overflow-hidden shadow-2xl relative">
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedPlayer(null)}
                            className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/15 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10"
                        >
                            <i className="fas fa-times text-lg"></i>
                        </button>

                        {/* Modal Header */}
                        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-deep-space to-uefa-dark flex items-center gap-4">
                            <div className="bg-cyan-aura/10 p-2 rounded-xl">
                                <TeamLogo teamName={selectedPlayer.teamName} logoUrl={teamLogos[selectedPlayer.teamName]} size="md" />
                            </div>
                            <div>
                                <h3 className="text-xl font-display font-bold tracking-wide uppercase text-white flex items-center gap-2">
                                    {selectedPlayer.realName || selectedPlayer.playerName}
                                </h3>
                                <p className="text-xs text-cyan-aura font-medium uppercase tracking-wider">{selectedPlayer.teamName}</p>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Radar Chart Section */}
                            <div>
                                <h4 className="text-xs font-display font-bold uppercase text-gray-400 tracking-widest text-center mb-4">
                                    {t.stats.performanceRadar}
                                </h4>
                                {renderRadarChart(selectedPlayer)}
                            </div>

                            {/* Stats Detail Grid */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-white/5 border border-white/5 p-3 rounded-2xl text-center">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t.stats.matchesPlayed}</p>
                                    <p className="text-xl font-display font-bold text-white mt-1">{selectedPlayer.gamesPlayed}</p>
                                </div>
                                <div className="bg-white/5 border border-white/5 p-3 rounded-2xl text-center">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t.stats.winRateLabel}</p>
                                    <p className="text-xl font-display font-bold text-green-400 mt-1">{selectedPlayer.winRate}%</p>
                                </div>
                                <div className="bg-white/5 border border-white/5 p-3 rounded-2xl text-center">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t.stats.mvpMatches}</p>
                                    <p className="text-xl font-display font-bold text-yellow-400 mt-1">{selectedPlayer.mvpCount}</p>
                                </div>
                                <div className="bg-white/5 border border-white/5 p-3 rounded-2xl text-center col-span-3 grid grid-cols-3 divide-x divide-white/10 items-center mt-1">
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t.stats.accumulatedKills}</p>
                                        <p className="text-lg font-mono font-bold text-blue-400 mt-1">{selectedPlayer.totalKills}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t.stats.accumulatedDeaths}</p>
                                        <p className="text-lg font-mono font-bold text-red-400 mt-1">{selectedPlayer.totalDeaths}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t.stats.accumulatedAssists}</p>
                                        <p className="text-lg font-mono font-bold text-green-400 mt-1">{selectedPlayer.totalAssists}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Top Heroes for Selected Player */}
                            <div>
                                <h4 className="text-xs font-display font-bold uppercase text-gray-400 tracking-widest mb-3">
                                    {t.stats.mostPlayedHeroes}
                                </h4>
                                <div className="flex gap-4">
                                    {getPlayerTopHeroes(selectedPlayer.realName || selectedPlayer.playerName).map((hero, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl flex-1 border border-white/5">
                                            {getHeroImage(hero.heroName) ? (
                                                <img src={getHeroImage(hero.heroName)!} alt={hero.heroName} className="w-10 h-10 rounded-xl object-cover bg-gray-900 border border-white/10" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-gray-400">
                                                    {hero.heroName?.charAt(0)}
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-white truncate">{hero.heroName}</p>
                                                <p className="text-[10px] text-gray-400 mt-0.5">{hero.gamesPlayed} {t.stats.gamesCount} | WR: {((hero.wins / hero.gamesPlayed) * 100).toFixed(0)}%</p>
                                            </div>
                                        </div>
                                    ))}
                                    {getPlayerTopHeroes(selectedPlayer.realName || selectedPlayer.playerName).length === 0 && (
                                        <p className="text-xs text-gray-500 italic">{t.stats.noHeroData}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
