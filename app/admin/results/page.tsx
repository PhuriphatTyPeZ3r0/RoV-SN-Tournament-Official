'use client';

import Icon from '@/components/common/Icon';
import { useState, useEffect, useTransition } from 'react';
import Swal from 'sweetalert2';
import { useLanguage } from '@/components/providers/LanguageProvider';
import GameStatsModal from '@/components/admin/GameStatsModal';
import { getMatchesAction } from '@/features/tournament/actions';
import { updateMatchResultAction, saveGameStatsAction, getMatchStatsAction } from '@/features/tournament/result-actions';
import { apiService } from '@/lib/api-client';

// Types
interface PlayerStats {
    name: string;
    hero: string;
    k: number;
    d: number;
    a: number;
    gold: number;
}

interface GameStatsData {
    blue: PlayerStats[];
    red: PlayerStats[];
    winner?: 'blue' | 'red';
    mvp?: string;
    duration?: string;
}

interface Match {
    id: string;
    team_blue_name: string;
    team_red_name: string;
    match_day: number;
    match_key: string;
    score_blue: number;
    score_red: number;
    winner_name: string | null;
    is_bye_win: boolean;
    mvp_player: string | null;
}

export default function AdminResultsPage() {
    const { t, language } = useLanguage();
    const [isPending, startTransition] = useTransition();
    const [matches, setMatches] = useState<Match[]>([]);
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [loading, setLoading] = useState(true);

    // Form Data
    const [formData, setFormData] = useState({
        scoreBlue: 0,
        scoreRed: 0,
        mvp: '',
        isByeWin: false
    });

    // Game Stats Management
    const [gameStats, setGameStats] = useState<Record<number, GameStatsData>>({});
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
    const [editingGameIndex, setEditingGameIndex] = useState<number>(0);
    const [allPlayers, setAllPlayers] = useState<any[]>([]);
    const [allHeroes, setAllHeroes] = useState<any[]>([]);

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        setLoading(true);
        try {
            const supabase = (await import('@/utils/supabase/client')).createClient();
            
            // Get active tournament
            const { data: tourney } = await supabase
                .from('tournaments')
                .select('id')
                .eq('status', 'active')
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (tourney) {
                const matchData = await getMatchesAction(tourney.id);
                setMatches(matchData as any);
                
                if (matchData && matchData.length > 0) {
                    setSelectedDay(matchData[0].match_day);
                }
            }

            const [playersData, heroesData] = await Promise.all([
                apiService.getPlayers(),
                apiService.getHeroes()
            ]);

            setAllPlayers(playersData || []);
            setAllHeroes(heroesData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMatchSelect = async (match: Match) => {
        setSelectedMatch(match);
        setFormData({
            scoreBlue: match.score_blue || 0,
            scoreRed: match.score_red || 0,
            mvp: match.mvp_player || '',
            isByeWin: match.is_bye_win || false
        });
        
        // Load existing game stats
        const stats = await getMatchStatsAction(match.id);
        const groupedStats: Record<number, GameStatsData> = {};
        
        stats.forEach((s: any) => {
            if (!groupedStats[s.game_number - 1]) {
                groupedStats[s.game_number - 1] = {
                    blue: [],
                    red: [],
                    winner: s.win && s.team_name === match.team_blue_name ? 'blue' : (!s.win && s.team_name === match.team_blue_name ? 'red' : undefined),
                    duration: `${Math.floor(s.game_duration / 60)}:${String(s.game_duration % 60).padStart(2, '0')}`
                };
            }
            
            const playerStat = {
                name: s.player_name,
                hero: s.hero_name,
                k: s.kills,
                d: s.deaths,
                a: s.assists,
                gold: 0
            };

            if (s.team_name === match.team_blue_name) {
                groupedStats[s.game_number - 1].blue.push(playerStat);
                if (s.mvp) groupedStats[s.game_number - 1].mvp = s.player_name;
            } else {
                groupedStats[s.game_number - 1].red.push(playerStat);
                if (s.mvp) groupedStats[s.game_number - 1].mvp = s.player_name;
            }

            // Fix winner determination logic
            if (s.win) {
                groupedStats[s.game_number - 1].winner = s.team_name === match.team_blue_name ? 'blue' : 'red';
            }
        });

        setGameStats(groupedStats);
    };

    const handleStatSave = (data: GameStatsData) => {
        setGameStats(prev => ({
            ...prev,
            [editingGameIndex]: data
        }));
        
        // Auto-update total score if winner is specified
        if (data.winner) {
            const currentStats = { ...gameStats, [editingGameIndex]: data };
            let blueWins = 0;
            let redWins = 0;
            Object.values(currentStats).forEach(g => {
                if (g.winner === 'blue') blueWins++;
                if (g.winner === 'red') redWins++;
            });
            setFormData(prev => ({ ...prev, scoreBlue: blueWins, scoreRed: redWins }));
        }

        Swal.fire({
            icon: 'success',
            title: t.admin.resultsPage.tempSaved,
            toast: true,
            position: 'top-end',
            timer: 2000,
            showConfirmButton: false
        });
    };

    const openStatsModal = (gameIndex: number) => {
        setEditingGameIndex(gameIndex);
        setIsStatsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMatch) return;

        startTransition(async () => {
            try {
                // 1. Update Match Summary
                const winner = formData.scoreBlue > formData.scoreRed ? selectedMatch.team_blue_name :
                               formData.scoreRed > formData.scoreBlue ? selectedMatch.team_red_name : '';
                
                await updateMatchResultAction(selectedMatch.id, {
                    scoreBlue: formData.scoreBlue,
                    scoreRed: formData.scoreRed,
                    winner,
                    isByeWin: formData.isByeWin,
                    mvp: formData.mvp
                });

                // 2. Save detailed game stats
                const gameIndices = Object.keys(gameStats).map(Number);
                for (const idx of gameIndices) {
                    const game = gameStats[idx];
                    if (game && game.winner) {
                        await saveGameStatsAction(selectedMatch.id, {
                            gameNumber: idx + 1,
                            blueTeam: selectedMatch.team_blue_name,
                            redTeam: selectedMatch.team_red_name,
                            winner: game.winner,
                            mvp: game.mvp || '',
                            duration: game.duration || '00:00',
                            blueStats: game.blue,
                            redStats: game.red
                        });
                    }
                }

                Swal.fire(language === 'th' ? 'สำเร็จ' : 'Success', t.admin.resultsPage.saveSuccess, 'success');
                initData(); // Refresh list
                setSelectedMatch(null);
            } catch (error: any) {
                Swal.fire(language === 'th' ? 'ข้อผิดพลาด' : 'Error', error.message || t.admin.resultsPage.saveError, 'error');
            }
        });
    };

    if (loading) return <div className="p-8 text-center"><Icon name="progress_activity" spin className="mr-2" /> Loading...</div>;

    const days = Array.from(new Set(matches.map(m => m.match_day))).sort((a, b) => a - b);
    const currentMatches = matches.filter(m => m.match_day === selectedDay);

    return (
        <div className="space-y-6 animate-fadeIn">
            <h1 className="text-2xl font-display font-bold text-uefa-dark uppercase">
                <Icon name="edit" className="mr-3 text-cyan-aura" />
                Match <span className="text-cyan-aura">Results</span>
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Match Selection */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                        <label className="block text-sm font-bold text-uefa-dark mb-3 uppercase tracking-wider">{t.admin.resultsPage.selectDay}</label>
                        <div className="flex flex-wrap gap-2">
                            {days.map(d => (
                                <button
                                    key={d}
                                    onClick={() => {
                                        setSelectedDay(d);
                                        setSelectedMatch(null);
                                    }}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedDay === d
                                        ? 'bg-uefa-dark text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                        }`}
                                >
                                    DAY {d}
                                </button>
                            ))}
                            {days.length === 0 && <p className="text-gray-400 text-xs italic">{t.admin.resultsPage.noSchedule}</p>}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                        <h3 className="font-bold text-uefa-dark mb-4 uppercase tracking-wider text-sm">{t.admin.resultsPage.selectMatch}</h3>
                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                            {currentMatches.map((match) => (
                                <button
                                    key={match.id}
                                    onClick={() => handleMatchSelect(match)}
                                    className={`w-full p-4 rounded-2xl border transition-all text-left relative overflow-hidden group ${selectedMatch?.id === match.id
                                        ? 'border-cyan-aura bg-cyan-50/50'
                                        : 'border-gray-100 hover:bg-gray-50'
                                        }`}
                                >
                                    {selectedMatch?.id === match.id && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-aura"></div>}
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-tighter">
                                            <span className={selectedMatch?.id === match.id ? 'text-blue-600' : 'text-gray-600'}>{match.team_blue_name}</span>
                                            <span className="text-gray-300">VS</span>
                                            <span className={selectedMatch?.id === match.id ? 'text-red-600' : 'text-gray-600'}>{match.team_red_name}</span>
                                        </div>
                                        <div className="text-[10px] text-gray-400 mt-1 flex justify-between">
                                            <span>Current: {match.score_blue} - {match.score_red}</span>
                                            {match.winner_name && <span className="text-green-500"><Icon name="check_circle" /> Result Set</span>}
                                        </div>
                                    </div>
                                </button>
                            ))}
                            {currentMatches.length === 0 && (
                                <p className="text-center text-gray-400 py-8 text-sm italic">{t.admin.resultsPage.noMatchesToday}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Result Entry */}
                <div className="lg:col-span-2">
                    {selectedMatch ? (
                        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 animate-fadeIn">
                            <div className="flex flex-col items-center mb-8">
                                <div className="flex items-center gap-10">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-2 border border-gray-100">
                                            <span className="text-2xl font-black text-blue-600">{selectedMatch.team_blue_name.charAt(0)}</span>
                                        </div>
                                        <span className="text-sm font-black text-uefa-dark uppercase">{selectedMatch.team_blue_name}</span>
                                    </div>
                                    <div className="text-3xl font-black text-gray-200 italic">VS</div>
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-2 border border-gray-100">
                                            <span className="text-2xl font-black text-red-600">{selectedMatch.team_red_name.charAt(0)}</span>
                                        </div>
                                        <span className="text-sm font-black text-uefa-dark uppercase">{selectedMatch.team_red_name}</span>
                                    </div>
                                </div>
                                <div className="mt-4 px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    Match ID: {selectedMatch.match_key}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Score Input */}
                                <div className="flex justify-center items-center gap-6 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                    <div className="text-center">
                                        <label className="block text-[10px] font-black text-blue-500 uppercase tracking-widest mb-3">Score Blue</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.scoreBlue}
                                            onChange={(e) => setFormData({ ...formData, scoreBlue: parseInt(e.target.value) || 0 })}
                                            className="w-24 h-24 text-5xl font-black text-center bg-white border-2 border-blue-100 rounded-3xl text-uefa-dark focus:border-blue-500 outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                    <div className="text-3xl font-black text-gray-300 mt-6">-</div>
                                    <div className="text-center">
                                        <label className="block text-[10px] font-black text-red-500 uppercase tracking-widest mb-3">Score Red</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.scoreRed}
                                            onChange={(e) => setFormData({ ...formData, scoreRed: parseInt(e.target.value) || 0 })}
                                            className="w-24 h-24 text-5xl font-black text-center bg-white border-2 border-red-100 rounded-3xl text-uefa-dark focus:border-red-500 outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Bye Win / Status */}
                                <div className="flex flex-col items-center gap-4">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${formData.isByeWin ? 'bg-cyan-aura border-cyan-aura' : 'border-gray-300 group-hover:border-cyan-aura'}`}>
                                            {formData.isByeWin && <Icon name="done" className="text-white text-xs" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={formData.isByeWin}
                                            onChange={(e) => setFormData({ ...formData, isByeWin: e.target.checked })}
                                        />
                                        <span className="font-bold text-gray-600 uppercase text-xs tracking-wider">{t.admin.resultsPage.byeWin}</span>
                                    </label>
                                </div>

                                {/* Game Stats Section */}
                                <div className="border-t border-gray-100 pt-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-black text-uefa-dark uppercase text-sm tracking-wider flex items-center gap-2">
                                            <Icon name="show_chart" className="text-cyan-aura" />
                                            {t.admin.resultsPage.recordGameStats}
                                        </h3>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">Best of 5</span>
                                    </div>
                                    
                                    <div className="flex gap-4 overflow-x-auto pb-4">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => openStatsModal(i)}
                                                className={`flex-shrink-0 w-28 h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${gameStats[i]
                                                    ? 'bg-green-50 border-green-500 text-green-700'
                                                    : 'bg-white border-dashed border-gray-200 text-gray-400 hover:border-cyan-aura hover:text-cyan-aura'
                                                    }`}
                                            >
                                                <span className="text-[10px] font-black uppercase">Game {i + 1}</span>
                                                <Icon name={gameStats[i] ? 'check_circle' : 'add_circle'} className="text-lg" />
                                                {gameStats[i]?.winner && <span className="text-[8px] font-bold uppercase">{gameStats[i].winner} Win</span>}
                                            </button>
                                        ))}
                                    </div>

                                    {/* MVP Selection for Match */}
                                    <div className="mt-6 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.admin.resultsPage.matchMvpLabel}</label>
                                        <select
                                            value={formData.mvp}
                                            onChange={(e) => setFormData({ ...formData, mvp: e.target.value })}
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-aura text-sm font-bold text-uefa-dark"
                                        >
                                            <option value="">{t.admin.resultsPage.selectMvpPlaceholder}</option>
                                            {allPlayers.filter(p => p.team === selectedMatch.team_blue_name || p.team === selectedMatch.team_red_name).map((p) => (
                                                <option key={p._id} value={p.name}>
                                                    {p.name} {p.inGameName ? `(${p.inGameName})` : ''} [{p.team}]
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedMatch(null)}
                                        className="flex-1 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase text-sm tracking-widest"
                                    >
                                        {t.admin.resultsPage.cancelBtn}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="flex-[2] py-4 bg-gradient-to-r from-cyan-aura to-blue-600 text-white font-black rounded-2xl shadow-xl shadow-cyan-aura/20 hover:shadow-cyan-aura/40 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase text-sm tracking-widest disabled:opacity-50"
                                    >
                                        {isPending ? <><Icon name="progress_activity" spin className="mr-2" /> {t.admin.resultsPage.saving}</> : t.admin.resultsPage.saveAllBtn}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200 p-12 text-gray-300">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <Icon name="touch_app" className="text-4xl animate-bounce text-gray-200" />
                            </div>
                            <p className="font-bold text-gray-400 uppercase tracking-widest text-sm">{t.admin.resultsPage.pleaseSelectMatch}</p>
                            <p className="text-xs mt-2">{t.admin.resultsPage.selectMatchDesc}</p>
                        </div>
                    )}
                </div>
            </div>

            {selectedMatch && (
                <GameStatsModal
                    isOpen={isStatsModalOpen}
                    onClose={() => setIsStatsModalOpen(false)}
                    teamBlue={selectedMatch.team_blue_name}
                    teamRed={selectedMatch.team_red_name}
                    gameNumber={editingGameIndex + 1}
                    initialData={gameStats[editingGameIndex]}
                    onSave={handleStatSave}
                    allPlayers={allPlayers}
                    allHeroes={allHeroes}
                />
            )}
        </div>
    );
}
