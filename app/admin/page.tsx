'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { 
    getAdminDashboardKPIsAction, 
    getRecentActivityAction, 
    getDashboardTopPerformersAction,
    getDashboardToDosAction
} from '@/features/analytics/dashboard-actions';
import Image from 'next/image';

export default function AdminDashboard() {
    const { t, language } = useLanguage();
    const [isPending, startTransition] = useTransition();
    const [kpis, setKpis] = useState<any>(null);
    const [activities, setActivities] = useState<any[]>([]);
    const [performers, setPerformers] = useState<any>(null);
    const [todos, setTodos] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [kpiData, activityData, topData, todoData] = await Promise.all([
                getAdminDashboardKPIsAction(),
                getRecentActivityAction(),
                getDashboardTopPerformersAction(),
                getDashboardToDosAction()
            ]);
            setKpis(kpiData);
            setActivities(activityData);
            setPerformers(topData);
            setTodos(todoData);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !kpis) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-12 h-12 border-4 border-cyan-aura border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const statsCards = [
        { label: t.admin.dashboard.totalTeams, value: kpis.teams.total, icon: 'fas fa-users', color: 'bg-blue-500', link: '/admin/teams' },
        { label: t.admin.dashboard.readyTeams, value: kpis.teams.ready, icon: 'fas fa-check-double', color: 'bg-green-500', link: '/admin/teams' },
        { label: t.admin.dashboard.pendingReg, value: kpis.registrations.pending, icon: 'fas fa-user-clock', color: 'bg-orange-500', link: '/admin/registrations', alert: kpis.registrations.pending > 0 },
        { label: t.admin.dashboard.totalPlayers, value: kpis.players.total, icon: 'fas fa-user-friends', color: 'bg-cyan-500', link: '/admin/players' },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-black text-uefa-dark uppercase tracking-tight">
                        {language === 'th' ? <>ศูนย์บัญชาการ <span className="text-cyan-aura">การแข่งขัน</span></> : <>Tournament <span className="text-cyan-aura">Command Center</span></>}
                    </h1>
                    <p className="text-gray-500 font-medium">{t.admin.dashboard.overviewText}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => startTransition(fetchDashboardData)}
                        className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-cyan-aura transition-all shadow-sm"
                        title={t.admin.dashboard.refreshData}
                    >
                        <i className={`fas fa-sync-alt ${isPending ? 'fa-spin' : ''}`}></i>
                    </button>
                    <div className="px-4 py-2 bg-uefa-dark text-white rounded-xl text-sm font-bold shadow-lg">
                        <i className="fas fa-calendar-day mr-2 text-cyan-aura"></i>
                        {new Date().toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', { day: 'numeric', month: 'long' })}
                    </div>
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, i) => (
                    <Link key={i} href={stat.link} className="group">
                        <div className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${stat.alert ? 'ring-2 ring-orange-500/20 bg-orange-50/10' : ''}`}>
                            {stat.alert && (
                                <div className="absolute top-3 right-3 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                            )}
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-${stat.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                                    <i className={stat.icon}></i>
                                </div>
                                <div>
                                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                                    <div className="text-3xl font-display font-black text-uefa-dark">{stat.value}</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Action Required Widget */}
            {(todos?.registrations.length > 0 || todos?.teams.length > 0 || todos?.matches.length > 0) && (
                <div className="bg-orange-50/30 border border-orange-100 rounded-3xl p-6 animate-slideUp">
                    <h3 className="text-sm font-black uppercase tracking-widest text-orange-600 mb-4 flex items-center gap-2">
                        <i className="fas fa-exclamation-triangle"></i> {t.admin.dashboard.actionRequired}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {todos.registrations.length > 0 && (
                            <Link href="/admin/registrations" className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black text-orange-500 uppercase">{t.admin.dashboard.pendingRegistration}</span>
                                    <i className="fas fa-chevron-right text-[10px] text-gray-300 group-hover:translate-x-1 transition-transform"></i>
                                </div>
                                <div className="text-xs font-bold text-uefa-dark">{todos.registrations[0].full_name}</div>
                                <div className="text-[10px] text-gray-400">{t.admin.dashboard.waitScreening}</div>
                            </Link>
                        )}
                        {todos.teams.length > 0 && (
                            <Link href="/admin/teams" className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black text-orange-500 uppercase">{t.admin.dashboard.teamNeedsApproval}</span>
                                    <i className="fas fa-chevron-right text-[10px] text-gray-300 group-hover:translate-x-1 transition-transform"></i>
                                </div>
                                <div className="text-xs font-bold text-uefa-dark">{todos.teams[0].name}</div>
                                <div className="text-[10px] text-gray-400">{t.admin.dashboard.readyForReview}</div>
                            </Link>
                        )}
                        {todos.matches.length > 0 && (
                            <Link href="/admin/results" className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black text-orange-500 uppercase">{t.admin.dashboard.matchPendingResult}</span>
                                    <i className="fas fa-chevron-right text-[10px] text-gray-300 group-hover:translate-x-1 transition-transform"></i>
                                </div>
                                <div className="text-xs font-bold text-uefa-dark truncate">
                                    {todos.matches[0].team_blue_name} vs {todos.matches[0].team_red_name}
                                </div>
                                <div className="text-[10px] text-gray-400">{t.fixtures.day} {todos.matches[0].match_day} - {t.admin.dashboard.noResultsText}</div>
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Progress & Top Performers */}
                <div className="lg:col-span-1 space-y-8">
                    
                    {/* Tournament Progress */}
                    <div className="bg-uefa-dark rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-aura/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-cyan-aura/20 transition-colors"></div>
                        
                        <h3 className="text-sm font-black uppercase tracking-widest text-cyan-aura mb-6">{t.admin.dashboard.progress}</h3>
                        
                        <div className="flex items-end justify-between mb-4">
                            <div className="text-5xl font-display font-black tracking-tighter">{kpis.tournament.progress}%</div>
                            <div className="text-xs font-bold text-gray-400 text-right uppercase">
                                {kpis.tournament.played} / {kpis.tournament.total} {language === 'th' ? 'แมตช์' : 'Matches'}<br/>{t.admin.dashboard.completed}
                            </div>
                        </div>

                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-6">
                            <div 
                                className="bg-gradient-to-r from-cyan-aura to-blue-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(21,200,255,0.5)]"
                                style={{ width: `${kpis.tournament.progress}%` }}
                            ></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/admin/draw" className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all text-xs font-bold uppercase">
                                <i className="fas fa-dice"></i> {t.admin.dashboard.draw}
                            </Link>
                            <Link href="/admin/results" className="flex items-center justify-center gap-2 py-3 bg-cyan-aura text-uefa-dark hover:bg-white rounded-2xl transition-all text-xs font-bold uppercase">
                                <i className="fas fa-edit"></i> {t.admin.dashboard.recordResult}
                            </Link>
                        </div>
                    </div>

                    {/* Top Performers */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-black uppercase tracking-widest text-uefa-dark mb-6 flex items-center gap-2">
                            <i className="fas fa-fire text-orange-500"></i>
                            {t.admin.dashboard.hotPerformance}
                        </h3>

                        {performers ? (
                            <div className="space-y-6">
                                {/* Top Players */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.admin.dashboard.topKdaPlayers}</p>
                                    {performers.topPlayers.map((p: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-uefa-dark text-cyan-aura flex items-center justify-center font-black text-xs">{i+1}</div>
                                                <div>
                                                    <div className="text-xs font-black text-uefa-dark">{p.player_name}</div>
                                                    <div className="text-[10px] text-gray-400 uppercase">{p.team_name}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-black text-cyan-aura">{Number(p.kda).toFixed(1)}</div>
                                                <div className="text-[8px] text-gray-400 font-bold uppercase">KDA</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Top Heroes */}
                                <div className="space-y-3 pt-4 border-t border-gray-50">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.admin.dashboard.mostPickedHeroes}</p>
                                    <div className="flex gap-4">
                                        {performers.topHeroes.map((h: any, i: number) => (
                                            <div key={i} className="flex-1 text-center">
                                                <div className="relative w-12 h-12 mx-auto mb-2 rounded-2xl overflow-hidden ring-2 ring-gray-100">
                                                    <div className="absolute inset-0 bg-uefa-dark/40 flex items-center justify-center text-white text-[10px] font-black opacity-0 hover:opacity-100 transition-opacity">
                                                        {h.count}
                                                    </div>
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                                        <i className="fas fa-mask"></i>
                                                    </div>
                                                </div>
                                                <div className="text-[10px] font-black text-uefa-dark truncate">{h.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="py-10 text-center text-gray-300 text-xs italic">
                                {t.home.noMatches}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Recent Activity Logs */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 h-full overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                            <h3 className="text-sm font-black uppercase tracking-widest text-uefa-dark flex items-center gap-2">
                                <i className="fas fa-history text-cyan-aura"></i>
                                {t.admin.dashboard.auditTrail}
                            </h3>
                            <span className="text-[10px] font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 uppercase">{t.admin.dashboard.systemWideActions}</span>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto">
                            {activities.length > 0 ? (
                                <div className="divide-y divide-gray-50">
                                    {activities.map((log) => (
                                        <div key={log.id} className="p-5 hover:bg-gray-50/50 transition-colors group">
                                            <div className="flex items-start gap-4">
                                                <div className={`mt-1 w-8 h-8 rounded-xl flex items-center justify-center text-xs shadow-sm ${
                                                    log.action_type === 'INSERT' ? 'bg-green-100 text-green-600' :
                                                    log.action_type === 'UPDATE' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-red-100 text-red-600'
                                                }`}>
                                                    <i className={`fas ${
                                                        log.action_type === 'INSERT' ? 'fa-plus' :
                                                        log.action_type === 'UPDATE' ? 'fa-pen' :
                                                        'fa-trash'
                                                    }`}></i>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-black text-uefa-dark uppercase tracking-tight">
                                                            {log.actor?.username || 'System'}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400 font-medium">
                                                            {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-gray-600 leading-relaxed">
                                                        <span className="font-bold text-uefa-dark uppercase text-[10px] bg-gray-100 px-1.5 py-0.5 rounded mr-2">
                                                            {log.table_name}
                                                        </span>
                                                        {log.action_type === 'INSERT' && t.admin.dashboard.createdNewRecord}
                                                        {log.action_type === 'DELETE' && t.admin.dashboard.removedRecord}
                                                        {log.action_type === 'UPDATE' && (
                                                            <span>
                                                                {t.admin.dashboard.updated}{' '}
                                                                {log.new_data?.status !== log.old_data?.status && (
                                                                    <span> {t.admin.dashboard.statusFrom} <span className="text-uefa-dark font-bold">'{log.old_data?.status}'</span> {t.admin.dashboard.to} <span className="text-cyan-aura font-bold">'{log.new_data?.status}'</span></span>
                                                                )}
                                                                {log.new_data?.winner_name !== log.old_data?.winner_name && (
                                                                    <span> {language === 'th' ? 'ผลการแข่งขัน: ' : 'match result: '}<span className="text-cyan-aura font-bold">{log.new_data?.winner_name}</span> {t.admin.dashboard.won}</span>
                                                                )}
                                                                {log.new_data?.status === log.old_data?.status && log.new_data?.winner_name === log.old_data?.winner_name && ` ${t.admin.dashboard.detailsUpdated}`}
                                                            </span>
                                                        )}
                                                        <span className="text-[10px] text-gray-400 block mt-1 font-mono">ID: {log.record_id.substring(0, 8)}...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center py-20 text-gray-300">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <i className="fas fa-scroll text-2xl opacity-20"></i>
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest">{t.admin.dashboard.noActivities}</p>
                                </div>
                            )}
                        </div>
                        
                        <Link href="/admin/history" className="p-4 bg-gray-50 text-center text-[10px] font-black uppercase text-gray-400 hover:text-cyan-aura hover:bg-gray-100 transition-all border-t border-gray-50">
                            {t.admin.dashboard.viewDetailedHistory} <i className="fas fa-chevron-right ml-1"></i>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Navigation Footer */}
            <div className="bg-gradient-to-r from-cyan-aura/10 via-white to-blue-500/10 rounded-3xl p-8 border border-white shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-widest text-uefa-dark mb-6 text-center">{t.admin.dashboard.quickNavigation}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                        { label: t.admin.dashboard.draw, href: '/admin/draw', icon: 'fas fa-random', color: 'text-blue-500' },
                        { label: language === 'th' ? 'บันทึกผล' : 'Results', href: '/admin/results', icon: 'fas fa-trophy', color: 'text-yellow-500' },
                        { label: t.admin.dashboard.manageTeams, href: '/admin/teams', icon: 'fas fa-users-cog', color: 'text-green-500' },
                        { label: language === 'th' ? 'การสมัครแข่ง' : 'Registrations', href: '/admin/registrations', icon: 'fas fa-user-check', color: 'text-orange-500' },
                        { label: t.admin.dashboard.manageHeroes, href: '/admin/heroes', icon: 'fas fa-mask', color: 'text-pink-500' },
                        { label: t.nav.standings, href: '/standings', icon: 'fas fa-list-ol', color: 'text-cyan-500', external: true },
                    ].map((item, i) => (
                        <Link 
                            key={i} 
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-50 group"
                        >
                            <i className={`${item.icon} text-xl ${item.color} group-hover:scale-110 transition-transform`}></i>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
