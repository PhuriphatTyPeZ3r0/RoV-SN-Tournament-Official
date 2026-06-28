'use client';

import Icon from '@/components/common/Icon';
import { useState, useEffect, useTransition } from 'react';
import { 
  getReadyTeamsAction, 
  generateDrawAction, 
  clearDrawAction, 
  getMatchesByDayAction,
  getActiveTournamentsAction
} from '@/features/tournament/matchmaking-actions';
import Swal from 'sweetalert2';
import TeamLogo from '@/components/common/TeamLogo';
import Image from 'next/image';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function AdminDrawPage() {
    const { t, language } = useLanguage();
    const [isPending, startTransition] = useTransition();
    const [readyTeams, setReadyTeams] = useState<any[]>([]);
    const [tournaments, setTournaments] = useState<any[]>([]);
    const [selectedTournament, setSelectedTournament] = useState('');
    const [matchDay, setMatchDay] = useState(1);
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        if (selectedTournament && matchDay) {
            fetchMatches();
        }
    }, [selectedTournament, matchDay]);

    const initData = async () => {
        setLoading(true);
        const [teams, tours] = await Promise.all([
            getReadyTeamsAction(),
            getActiveTournamentsAction()
        ]);
        setReadyTeams(teams);
        setTournaments(tours);
        if (tours.length > 0) {
            setSelectedTournament(tours[0].id);
        }
        setLoading(false);
    };

    const fetchMatches = async () => {
        const data = await getMatchesByDayAction(selectedTournament, matchDay);
        setMatches(data);
    };

    const handleGenerateDraw = () => {
        if (!selectedTournament) return;

        Swal.fire({
            title: t.admin.drawPage.confirmDrawTitle,
            text: t.admin.drawPage.confirmDrawText.replace('{day}', matchDay.toString()),
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: t.admin.drawPage.startDrawBtn,
            cancelButtonText: language === 'th' ? 'ยกเลิก' : 'Cancel',
            confirmButtonColor: '#15C8FF',
        }).then((result) => {
            if (result.isConfirmed) {
                startTransition(async () => {
                    try {
                        const res = await generateDrawAction(selectedTournament, matchDay);
                        if (res.success) {
                            Swal.fire(language === 'th' ? 'สำเร็จ' : 'Success', t.admin.drawPage.drawSuccess.replace('{count}', res.count.toString()), 'success');
                            fetchMatches();
                        }
                    } catch (error: any) {
                        Swal.fire(language === 'th' ? 'ข้อผิดพลาด' : 'Error', error.message || t.admin.drawPage.drawError, 'error');
                    }
                });
            }
        });
    };

    const handleClearDraw = () => {
        Swal.fire({
            title: t.admin.drawPage.confirmClearTitle,
            text: t.admin.drawPage.confirmClearText.replace('{day}', matchDay.toString()),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t.admin.drawPage.clearBtn,
            cancelButtonText: language === 'th' ? 'ยกเลิก' : 'Cancel',
            confirmButtonColor: '#ef4444',
        }).then((result) => {
            if (result.isConfirmed) {
                startTransition(async () => {
                    try {
                        const res = await clearDrawAction(selectedTournament, matchDay);
                        if (res.success) {
                            Swal.fire(language === 'th' ? 'สำเร็จ' : 'Success', t.admin.drawPage.clearSuccess, 'success');
                            fetchMatches();
                        }
                    } catch (error: any) {
                        Swal.fire(language === 'th' ? 'ข้อผิดพลาด' : 'Error', error.message, 'error');
                    }
                });
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-display font-bold text-uefa-dark uppercase">
                        Tournament <span className="text-cyan-aura">Draw</span>
                    </h1>
                    <p className="text-gray-500 text-sm">{t.admin.drawPage.subtitle}</p>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                    <select 
                        value={selectedTournament} 
                        onChange={(e) => setSelectedTournament(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-aura outline-none text-sm"
                    >
                        {tournaments.map(t => (
                            <option key={t.id} value={t.id}>{t.name} (S{t.season})</option>
                        ))}
                    </select>

                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                        {[1, 2, 3, 4, 5].map(d => (
                            <button
                                key={d}
                                onClick={() => setMatchDay(d)}
                                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${matchDay === d ? 'bg-white text-cyan-aura shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Day {d}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Ready Teams Pool */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-uefa-dark mb-4 flex items-center gap-2">
                            <Icon name="groups" className="text-cyan-aura" />
                            {t.admin.drawPage.readyTeamsHeader.replace('{count}', readyTeams.length.toString())}
                        </h3>
                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                            {readyTeams.map(team => (
                                <div key={team.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <TeamLogo teamName={team.name} size="sm" />
                                    <span className="text-sm font-medium text-uefa-dark">{team.name}</span>
                                    <span className="ml-auto text-[10px] bg-green-100 text-green-600 font-bold px-2 py-0.5 rounded-full uppercase">Ready</span>
                                </div>
                            ))}
                            {readyTeams.length === 0 && (
                                <p className="text-center text-gray-400 text-sm py-4">{t.admin.drawPage.noReadyTeams}</p>
                            )}
                        </div>
                        
                        <button
                            onClick={handleGenerateDraw}
                            disabled={isPending || readyTeams.length < 2 || matches.length > 0}
                            className="w-full mt-6 bg-gradient-to-r from-cyan-aura to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-cyan-aura/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                        >
                            {isPending ? <Icon name="progress_activity" spin className="mr-2" /> : <Icon name="casino" className="mr-2" />}
                            {t.admin.drawPage.randomDrawBtn.replace('{day}', matchDay.toString())}
                        </button>
                    </div>
                </div>

                {/* Draw Results */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-uefa-dark flex items-center gap-2">
                                <Icon name="account_tree" className="text-cyan-aura" />
                                {t.admin.drawPage.matchResultsHeader.replace('{day}', matchDay.toString())}
                            </h3>
                            {matches.length > 0 && (
                                <button 
                                    onClick={handleClearDraw}
                                    disabled={isPending}
                                    className="text-red-500 hover:text-red-600 text-sm font-bold flex items-center gap-1"
                                >
                                    <Icon name="delete_outline" /> {t.admin.drawPage.clearAction}
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {matches.map((match, idx) => (
                                <div key={match.id} className="flex items-center bg-gray-50 rounded-2xl p-4 border border-gray-100 relative group overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-aura"></div>
                                    <div className="flex-1 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <TeamLogo teamName={match.team_blue_name} size="md" />
                                            <span className="text-sm font-bold text-uefa-dark">{match.team_blue_name}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="px-8 flex flex-col items-center">
                                        <div className="text-2xl font-black text-gray-300 italic tracking-tighter">VS</div>
                                        <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{t.admin.drawPage.matchLabel} {idx + 1}</div>
                                    </div>

                                    <div className="flex-1 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <TeamLogo teamName={match.team_red_name} size="md" />
                                            <span className="text-sm font-bold text-uefa-dark">{match.team_red_name}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {matches.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                                    <Icon name="swap_horiz" className="text-6xl mb-4 opacity-20" />
                                    <p className="text-gray-400">{t.admin.drawPage.noMatchesScheduled}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
