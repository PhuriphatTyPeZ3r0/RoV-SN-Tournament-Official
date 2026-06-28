'use client';

import Icon from '@/components/common/Icon';
import { useState, useEffect, useTransition } from 'react';
import { getAllTeamsWithSeasonsAction, updateTeamStatusAction } from '@/features/teams/actions';
import Swal from 'sweetalert2';
import TeamLogo from '@/components/common/TeamLogo';
import Image from 'next/image';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function AdminTeamsPage() {
    const { t, language } = useLanguage();
    const [isPending, startTransition] = useTransition();
    const [teams, setTeams] = useState<any[]>([]);
    const [tournaments, setTournaments] = useState<any[]>([]);
    const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        setLoading(true);
        const { teams: mappedTeams, tournaments: fetchedTournaments } = await getAllTeamsWithSeasonsAction();
        setTeams(mappedTeams);
        setTournaments(fetchedTournaments);

        // Default selected season to the active tournament's season, or the latest one
        if (fetchedTournaments && fetchedTournaments.length > 0) {
            const activeTourney = fetchedTournaments.find(t => t.status === 'active');
            if (activeTourney) {
                setSelectedSeason(activeTourney.season);
            } else {
                const sorted = [...fetchedTournaments].sort((a, b) => b.season - a.season);
                setSelectedSeason(sorted[0]?.season || 2027);
            }
        }
        setLoading(false);
    };

    const handleUpdateStatus = (teamId: string, status: 'incomplete' | 'ready' | 'approved') => {
        startTransition(async () => {
            const res = await updateTeamStatusAction(teamId, status);
            if (res.success) {
                Swal.fire({
                    icon: 'success',
                    title: t.admin.teamsPage.statusUpdated,
                    toast: true,
                    position: 'top-end',
                    timer: 2000,
                    showConfirmButton: false
                });
                fetchTeams();
            } else {
                Swal.fire(t.admin.teamsPage.errorTitle, res.error || '', 'error');
            }
        });
    };

    const filteredTeams = teams.filter(team => {
        const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSeason = selectedSeason ? team.season === selectedSeason : true;
        return matchesSearch && matchesSeason;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header Panel */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-display font-bold text-uefa-dark uppercase">
                        Manage <span className="text-cyan-aura">Teams</span>
                    </h1>
                    <p className="text-gray-500 text-sm">{t.admin.teamsPage.subtitle}</p>
                </div>

                <div className="relative w-full sm:w-64">
                    <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                        type="text"
                        placeholder={t.admin.teamsPage.search}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-aura outline-none text-sm transition-all"
                    />
                </div>
            </div>

            {/* Season Tabs Selector */}
            {tournaments.length > 0 && (
                <div className="flex border-b border-gray-200 gap-6 px-2">
                    {tournaments.slice().reverse().map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setSelectedSeason(t.season)}
                            className={`pb-3 text-sm font-display font-bold relative transition-all cursor-pointer flex items-center gap-2 ${
                                selectedSeason === t.season 
                                    ? 'text-cyan-aura font-black' 
                                    : 'text-gray-400 hover:text-uefa-dark'
                            }`}
                        >
                            {language === 'th' ? `ซีซั่น ${t.season}` : `Season ${t.season}`}
                            {t.status === 'active' && (
                                <span className="px-1.5 py-0.5 text-[9px] bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 rounded font-black tracking-widest uppercase">
                                    Active
                                </span>
                            )}
                            {selectedSeason === t.season && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-aura rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Teams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTeams.map((team) => (
                    <div key={team.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between">
                        <div>
                            {/* Team Header */}
                            <div className="p-5 flex items-start gap-4">
                                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    <TeamLogo teamName={team.name} logoUrl={team.logo_url} size="md" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-uefa-dark text-lg truncate mb-1">{team.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                            team.status === 'approved' ? 'bg-green-100 text-green-600' :
                                            team.status === 'ready' ? 'bg-blue-100 text-blue-600' :
                                            'bg-yellow-100 text-yellow-600'
                                        }`}>
                                            {team.status}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            <Icon name="groups" className="mr-1" />
                                            {team.members?.length || 0}/6 Members
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Members Preview */}
                            <div className="px-5 pb-4">
                                <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                                    {team.members?.slice(0, 3).map((m: any) => (
                                        <div key={m.id} className="flex justify-between items-center text-xs">
                                            <span className="text-gray-700 font-medium truncate max-w-[120px]">
                                                {m.name}
                                                {m.id === team.captain_id && <Icon name="workspace_premium" className="text-yellow-500 ml-1" />}
                                            </span>
                                            <span className="text-gray-400 italic">{m.in_game_name}</span>
                                        </div>
                                    ))}
                                    {team.members?.length > 3 && (
                                        <div className="text-[10px] text-center text-gray-400">
                                            {t.admin.teamsPage.moreMembers.replace('{count}', (team.members.length - 3).toString())}
                                        </div>
                                    )}
                                    {(!team.members || team.members.length === 0) && (
                                        <div className="text-[10px] text-center text-gray-400 italic py-2">
                                            {t.admin.teamsPage.noMembers}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between gap-2">
                            {team.tournamentStatus !== 'completed' ? (
                                <div className="flex gap-1">
                                    <button 
                                        onClick={() => handleUpdateStatus(team.id, 'incomplete')}
                                        className={`p-2 rounded-lg text-xs font-bold transition-all ${team.status === 'incomplete' ? 'bg-yellow-500 text-white shadow-sm' : 'bg-white text-gray-400 hover:bg-gray-100 border border-gray-200'}`}
                                        title="Set Incomplete"
                                        disabled={isPending}
                                    >
                                        <Icon name="hourglass_top" />
                                    </button>
                                    <button 
                                        onClick={() => handleUpdateStatus(team.id, 'ready')}
                                        className={`p-2 rounded-lg text-xs font-bold transition-all ${team.status === 'ready' ? 'bg-blue-500 text-white shadow-sm' : 'bg-white text-gray-400 hover:bg-gray-100 border border-gray-200'}`}
                                        title="Set Ready"
                                        disabled={isPending}
                                    >
                                        <Icon name="check_circle" />
                                    </button>
                                    <button 
                                        onClick={() => handleUpdateStatus(team.id, 'approved')}
                                        className={`p-2 rounded-lg text-xs font-bold transition-all ${team.status === 'approved' ? 'bg-green-500 text-white shadow-sm' : 'bg-white text-gray-400 hover:bg-gray-100 border border-gray-200'}`}
                                        title="Approve Team"
                                        disabled={isPending}
                                    >
                                        <Icon name="security" />
                                    </button>
                                </div>
                            ) : (
                                <div className="text-[11px] text-gray-400 font-bold italic flex items-center gap-1.5 px-3 py-1.5 bg-gray-100/80 border border-gray-200/50 rounded-xl">
                                    <Icon name="lock" className="text-xs text-gray-400" />
                                    Locked (Completed)
                                </div>
                            )}

                            <button 
                                onClick={() => {
                                    Swal.fire({
                                        title: team.name,
                                        html: `
                                            <div class="text-left space-y-4">
                                                <div>
                                                    <h4 class="font-bold text-uefa-dark border-b pb-1 mb-2">Members (${team.members?.length || 0}/6)</h4>
                                                    <div class="space-y-2 max-h-60 overflow-y-auto">
                                                        ${team.members?.map((m: any) => `
                                                            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                                 <div>
                                                                     <div class="font-bold text-sm">${m.name} ${m.id === team.captain_id ? '<span class="text-yellow-500">👑</span>' : ''}</div>
                                                                     <div class="text-[10px] text-gray-500">IGN: ${m.in_game_name} | Grade: ${m.grade}</div>
                                                                 </div>
                                                            </div>
                                                        `).join('')}
                                                    </div>
                                                </div>
                                                <div class="p-3 bg-cyan-aura/5 rounded-lg border border-cyan-aura/10 text-xs">
                                                    <div class="font-bold text-cyan-600 mb-1 uppercase tracking-wider">Invite Code</div>
                                                    <div class="font-mono text-lg font-black text-uefa-dark">${team.invite_code || '-'}</div>
                                                </div>
                                            </div>
                                        `,
                                        showConfirmButton: false,
                                        showCloseButton: true
                                    });
                                }}
                                className="px-4 py-2 bg-white hover:bg-uefa-dark hover:text-white border border-gray-200 rounded-lg text-xs font-bold transition-all"
                            >
                                <Icon name="info" className="mr-1" /> {t.admin.teamsPage.viewDetails}
                            </button>
                        </div>
                    </div>
                ))}

                {filteredTeams.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-400">
                        <Icon name="person_off" className="text-6xl mb-4 opacity-20" />
                        <p>{t.admin.teamsPage.noTeams}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
