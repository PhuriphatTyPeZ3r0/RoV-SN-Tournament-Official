'use client';

import { useState, useEffect } from 'react';
import { 
    createTeamAction, 
    joinTeamAction, 
    leaveTeamAction, 
    kickPlayerAction, 
    getMyTeamData,
    updateTeamInfoAction,
    updatePlayerLineupRoleAction,
    toggleRecruitmentAction,
    regenerateInviteCodeAction,
    toggleTeamReadyAction,
    updateTeamContactInfoAction,
    updatePlayerPersonalDetailsAction
} from '@/features/teams/actions';
import { getHeroesAction } from '@/features/players/actions';
import Swal from 'sweetalert2';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function TeamPage() {
    const { t, language } = useLanguage();
    const { isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();
    
    const [teamData, setTeamData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    
    // Forms for Create / Join
    const [teamName, setTeamName] = useState('');
    const [inviteCode, setInviteCode] = useState('');

    // Forms for Editing Team Info
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editTeamName, setEditTeamName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editLogoUrl, setEditLogoUrl] = useState('');

    // Contact Info Modal States
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [editContactPhone, setEditContactPhone] = useState('');
    const [editContactLine, setEditContactLine] = useState('');
    const [editContactDiscord, setEditContactDiscord] = useState('');

    // Personal Details Modal States
    const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
    const [editNickname, setEditNickname] = useState('');
    const [editPersonalPhone, setEditPersonalPhone] = useState('');
    const [editFavoriteHeroes, setEditFavoriteHeroes] = useState<string[]>([]);
    
    // Autocomplete Search States
    const [heroSearch, setHeroSearch] = useState('');
    const [heroList, setHeroList] = useState<any[]>([]);
    const [showHeroDropdown, setShowHeroDropdown] = useState(false);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
            return;
        }
        if (isAuthenticated) {
            fetchTeamData();
            fetchHeroList();
        }
    }, [isAuthenticated, authLoading, router]);

    const fetchHeroList = async () => {
        try {
            const heroes = await getHeroesAction();
            setHeroList(heroes || []);
        } catch (e) {
            console.error("Failed to fetch heroes:", e);
        }
    };

    const fetchTeamData = async () => {
        setLoading(true);
        const data = await getMyTeamData();
        setTeamData(data);
        if (data) {
            setEditTeamName(data.name || '');
            setEditDescription(data.description || '');
            setEditLogoUrl(data.logo_url || '');

            // Contact Info
            setEditContactPhone(data.contact_phone || '');
            setEditContactLine(data.contact_line || '');
            setEditContactDiscord(data.contact_discord || '');

            // Find current player's details
            const currentPlayer = data.members?.find((m: any) => m.id === data.currentPlayerId);
            if (currentPlayer) {
                setEditNickname(currentPlayer.nickname || '');
                setEditPersonalPhone(currentPlayer.phone || '');
                setEditFavoriteHeroes(currentPlayer.favorite_heroes || []);
            }
        }
        setLoading(false);
    };

    const handleCreateTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        const result = await createTeamAction(teamName);
        if (result.error) {
            Swal.fire(t.team.errorTitle, result.error, 'error');
        } else {
            Swal.fire(t.team.successTitle, t.team.createSuccess, 'success');
            fetchTeamData();
        }
        setActionLoading(false);
    };

    const handleJoinTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        const result = await joinTeamAction(inviteCode);
        if (result.error) {
            Swal.fire(t.team.errorTitle, result.error, 'error');
        } else {
            Swal.fire(t.team.successTitle, t.team.joinSuccess.replace('{teamName}', result.teamName), 'success');
            fetchTeamData();
        }
        setActionLoading(false);
    };

    const handleLeaveTeam = async () => {
        const confirm = await Swal.fire({
            title: t.team.confirmLeaveTitle,
            text: t.team.confirmLeaveText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t.team.leaveBtn,
            cancelButtonText: language === 'th' ? 'ยกเลิก' : 'Cancel',
            confirmButtonColor: '#ef4444',
        });

        if (confirm.isConfirmed) {
            setActionLoading(true);
            const result = await leaveTeamAction();
            if (result.error) {
                Swal.fire(t.team.errorTitle, result.error, 'error');
            } else {
                Swal.fire(t.team.successTitle, t.team.leaveSuccess, 'success');
                fetchTeamData();
            }
            setActionLoading(false);
        }
    };

    const handleKickPlayer = async (playerId: string, name: string) => {
        const confirm = await Swal.fire({
            title: t.team.confirmKickTitle.replace('{name}', name),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t.team.confirmKickBtn,
            cancelButtonText: language === 'th' ? 'ยกเลิก' : 'Cancel',
            confirmButtonColor: '#ef4444',
        });

        if (confirm.isConfirmed) {
            setActionLoading(true);
            const result = await kickPlayerAction(playerId);
            if (result.error) {
                Swal.fire(t.team.errorTitle, result.error, 'error');
            } else {
                fetchTeamData();
            }
            setActionLoading(false);
        }
    };

    const handleUpdateTeamInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        const result = await updateTeamInfoAction({
            name: editTeamName,
            description: editDescription || null,
            logoUrl: editLogoUrl || null
        });
        if (result.error) {
            Swal.fire(t.team.errorTitle, result.error, 'error');
        } else {
            Swal.fire(t.team.successTitle, t.team.editSuccess, 'success');
            setIsEditModalOpen(false);
            fetchTeamData();
        }
        setActionLoading(false);
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            Swal.fire(t.team.errorTitle, language === 'th' ? 'ขนาดไฟล์ห้ามเกิน 2MB' : 'File size must not exceed 2MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setEditLogoUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleRoleChange = async (playerId: string, lineupRole: string) => {
        setActionLoading(true);
        const roleValue = lineupRole === 'not_set' ? null : lineupRole as any;
        const result = await updatePlayerLineupRoleAction({
            playerId,
            lineupRole: roleValue
        });
        if (result.error) {
            Swal.fire(t.team.errorTitle, result.error, 'error');
        } else {
            Swal.fire({
                title: t.team.roleUpdateSuccess,
                toast: true,
                position: 'top-end',
                timer: 2000,
                showConfirmButton: false,
                icon: 'success'
            });
            fetchTeamData();
        }
        setActionLoading(false);
    };

    const handleToggleRecruitment = async () => {
        setActionLoading(true);
        const result = await toggleRecruitmentAction();
        if (result.error) {
            Swal.fire(t.team.errorTitle, result.error, 'error');
        } else {
            fetchTeamData();
        }
        setActionLoading(false);
    };

    const handleRegenerateInviteCode = async () => {
        const confirm = await Swal.fire({
            title: t.team.confirmRegenerateTitle,
            text: t.team.confirmRegenerateText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t.team.confirmKickBtn,
            cancelButtonText: language === 'th' ? 'ยกเลิก' : 'Cancel',
            confirmButtonColor: '#ef4444',
        });

        if (confirm.isConfirmed) {
            setActionLoading(true);
            const result = await regenerateInviteCodeAction();
            if (result.error) {
                Swal.fire(t.team.errorTitle, result.error, 'error');
            } else {
                Swal.fire({
                    title: t.team.successTitle,
                    text: language === 'th' ? 'รีเซ็ตรหัสเชิญใหม่สำเร็จแล้ว' : 'Invite code reset successfully',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                fetchTeamData();
            }
            setActionLoading(false);
        }
    };

    const handleToggleReadyStatus = async (status: 'ready' | 'incomplete') => {
        setActionLoading(true);
        const result = await toggleTeamReadyAction(status);
        if (result.error) {
            Swal.fire(t.team.errorTitle, result.error, 'error');
        } else {
            Swal.fire({
                title: t.team.successTitle,
                text: status === 'ready' 
                    ? (language === 'th' ? 'ยืนยันความพร้อมสำเร็จ ข้อมูลถูกล็อกแล้ว' : 'Team marked as ready. Roster locked.')
                    : (language === 'th' ? 'ปลดล็อกข้อมูลทีมสำเร็จแล้ว' : 'Team unlocked successfully.'),
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            fetchTeamData();
        }
        setActionLoading(false);
    };

    const handleUpdateContactInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        const result = await updateTeamContactInfoAction({
            contactPhone: editContactPhone || null,
            contactLine: editContactLine || null,
            contactDiscord: editContactDiscord || null
        });
        if (result.error) {
            Swal.fire(t.team.errorTitle, result.error, 'error');
        } else {
            Swal.fire(t.team.successTitle, t.team.contactInfoSaved, 'success');
            setIsContactModalOpen(false);
            fetchTeamData();
        }
        setActionLoading(false);
    };

    const handleUpdatePersonalDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        const result = await updatePlayerPersonalDetailsAction({
            nickname: editNickname || null,
            phone: editPersonalPhone || null,
            favoriteHeroes: editFavoriteHeroes
        });
        if (result.error) {
            Swal.fire(t.team.errorTitle, result.error, 'error');
        } else {
            Swal.fire(t.team.successTitle, t.team.personalDetailsSaved, 'success');
            setIsPersonalModalOpen(false);
            fetchTeamData();
        }
        setActionLoading(false);
    };

    const handleAddHero = (heroName: string) => {
        if (editFavoriteHeroes.includes(heroName)) {
            setHeroSearch('');
            setShowHeroDropdown(false);
            return;
        }
        if (editFavoriteHeroes.length >= 5) {
            Swal.fire(t.team.errorTitle, language === 'th' ? 'เลือกฮีโร่ได้สูงสุด 5 ตัว' : 'You can select up to 5 heroes', 'error');
            return;
        }
        setEditFavoriteHeroes([...editFavoriteHeroes, heroName]);
        setHeroSearch('');
        setShowHeroDropdown(false);
    };

    const handleRemoveHero = (heroName: string) => {
        setEditFavoriteHeroes(editFavoriteHeroes.filter(h => h !== heroName));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"></div>
            </div>
        );
    }

    if (!teamData) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Create Team */}
                <div className="bg-white rounded-none shadow-xl p-8 border border-gray-100">
                    <div className="w-16 h-16 bg-cyan-aura/10 rounded-full flex items-center justify-center mb-6">
                        <i className="fas fa-users-plus text-2xl text-cyan-aura"></i>
                    </div>
                    <h2 className="text-2xl font-display font-bold text-uefa-dark uppercase mb-2">{t.team.createTeamTitle}</h2>
                    <p className="text-gray-500 text-sm mb-6">{t.team.createTeamDesc}</p>
                    
                    <form onSubmit={handleCreateTeam} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.team.teamNameLabel}</label>
                            <input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder={t.team.teamNamePlaceholder}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={actionLoading || !teamName}
                            className="w-full bg-uefa-dark text-white font-bold py-3 rounded-lg hover:bg-uefa-dark/90 transition-all disabled:opacity-50"
                        >
                            {actionLoading ? t.team.loading : t.team.createBtn}
                        </button>
                    </form>
                </div>

                {/* Join Team */}
                <div className="bg-white rounded-none shadow-xl p-8 border border-gray-100">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                        <i className="fas fa-sign-in-alt text-2xl text-blue-500"></i>
                    </div>
                    <h2 className="text-2xl font-display font-bold text-uefa-dark uppercase mb-2">{t.team.joinTeamTitle}</h2>
                    <p className="text-gray-500 text-sm mb-6">{t.team.joinTeamDesc}</p>
                    
                    <form onSubmit={handleJoinTeam} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.team.inviteCodeLabel}</label>
                            <input
                                type="text"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                placeholder={t.team.inviteCodePlaceholder}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={actionLoading || !inviteCode}
                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                        >
                            {actionLoading ? t.team.loading : t.team.joinBtn}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const isCaptain = teamData.captain_id === teamData.currentPlayerId;
    const isLocked = teamData.status === 'ready' || teamData.status === 'approved';

    const lineupRoles = [
        { value: 'dark_slayer', label: t.team.role_dark_slayer || 'Dark Slayer Lane', icon: '🛡️' },
        { value: 'abyssal_dragon', label: t.team.role_abyssal_dragon || 'Abyssal Dragon Lane', icon: '🏹' },
        { value: 'mid_lane', label: t.team.role_mid_lane || 'Mid Lane', icon: '🔮' },
        { value: 'jungle', label: t.team.role_jungle || 'Jungle', icon: '⚔️' },
        { value: 'support', label: t.team.role_support || 'Support', icon: '💚' },
        { value: 'substitute', label: t.team.role_substitute || 'Substitute', icon: '🔄' },
    ];

    const getRoleLabel = (roleKey: string) => {
        if (!roleKey) return t.team.rolePlaceholder || 'ยังไม่กำหนด';
        const role = lineupRoles.find(r => r.value === roleKey);
        return role ? `${role.icon} ${role.label}` : roleKey;
    };

    const filteredHeroes = heroList.filter(hero => 
        hero.name.toLowerCase().includes(heroSearch.toLowerCase()) &&
        !editFavoriteHeroes.includes(hero.name)
    );

    return (
        <div className="space-y-8">
            {/* Status Warning / Info Banner */}
            {isLocked && (
                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl p-4 flex items-center gap-3 text-sm animate-fadeIn">
                    <i className="fas fa-lock text-lg"></i>
                    <span>{t.team.teamLockedAlert}</span>
                </div>
            )}

            {/* Team Overview */}
            <div className="bg-uefa-dark rounded-none p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-aura/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 bg-white/10 rounded-none flex items-center justify-center border border-white/20 backdrop-blur-md overflow-hidden relative">
                        {teamData.logo_url ? (
                            <img src={teamData.logo_url} alt={teamData.name} className="w-full h-full object-contain p-2" />
                        ) : (
                            <i className="fas fa-shield-alt text-5xl text-cyan-aura"></i>
                        )}
                    </div>
                    <div className="text-center md:text-left flex-1 space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 justify-center md:justify-start">
                            <h1 className="text-4xl font-display font-bold uppercase">{teamData.name}</h1>
                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                teamData.status === 'approved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                teamData.status === 'ready' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                                {teamData.status === 'approved' ? t.team.statusApproved :
                                 teamData.status === 'ready' ? t.team.statusReady : 
                                 t.team.statusIncomplete}
                            </span>
                        </div>
                        {teamData.description ? (
                            <p className="text-gray-300 text-sm max-w-2xl italic font-light">
                                "{teamData.description}"
                            </p>
                        ) : (
                            <p className="text-gray-500 text-xs italic font-light">
                                {language === 'th' ? '*ยังไม่มีคำอธิบายทีมหรือสโลแกน' : '*No team slogan set'}
                            </p>
                        )}
                        <p className="text-gray-400 text-xs">
                            {t.team.createdAt}{new Date(teamData.created_at).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US')}
                        </p>
                    </div>
                    
                    {isCaptain && (
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            {!isLocked && (
                                <button
                                    onClick={() => {
                                        setEditTeamName(teamData.name || '');
                                        setEditDescription(teamData.description || '');
                                        setEditLogoUrl(teamData.logo_url || '');
                                        setIsEditModalOpen(true);
                                    }}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                                >
                                    <i className="fas fa-edit"></i>
                                    {t.team.editTeamInfo}
                                </button>
                            )}

                            {/* Submit Ready or Unlock Ready button */}
                            {teamData.status === 'incomplete' ? (
                                <button
                                    onClick={() => handleToggleReadyStatus('ready')}
                                    disabled={actionLoading}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                                        teamData.members.length >= 5
                                            ? 'bg-cyan-aura text-uefa-dark hover:bg-cyan-aura/90 cursor-pointer'
                                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    }`}
                                    title={teamData.members.length < 5 ? t.team.minPlayersRequired : ''}
                                >
                                    <i className="fas fa-paper-plane"></i>
                                    {t.team.markReadyBtn}
                                </button>
                            ) : teamData.status === 'ready' ? (
                                <button
                                    onClick={() => handleToggleReadyStatus('incomplete')}
                                    disabled={actionLoading}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                                >
                                    <i className="fas fa-lock-open"></i>
                                    {t.team.markIncompleteBtn}
                                </button>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Info and Personal Profile Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Team Contact Info Card */}
                <div className="bg-white rounded-none shadow-xl p-6 border border-gray-100 flex flex-col justify-between animate-fadeIn">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                            <h3 className="text-md font-bold text-uefa-dark uppercase flex items-center gap-2">
                                <i className="fas fa-address-book text-cyan-aura"></i>
                                {t.team.contactHeader}
                            </h3>
                            {isCaptain && (
                                <button
                                    onClick={() => {
                                        setEditContactPhone(teamData.contact_phone || '');
                                        setEditContactLine(teamData.contact_line || '');
                                        setEditContactDiscord(teamData.contact_discord || '');
                                        setIsContactModalOpen(true);
                                    }}
                                    disabled={teamData.status === 'approved'}
                                    className="text-xs text-cyan-aura hover:underline flex items-center gap-1 font-bold disabled:opacity-30 disabled:hover:no-underline cursor-pointer"
                                >
                                    <i className="fas fa-edit"></i>
                                    {t.team.editContactInfo}
                                </button>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                    <i className="fas fa-phone"></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.team.contactPhoneLabel}</p>
                                    <p className="text-uefa-dark font-medium truncate">{teamData.contact_phone || <span className="text-gray-300 italic text-xs">{t.team.noContactInfo}</span>}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                    <i className="fab fa-line text-lg"></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.team.contactLineLabel}</p>
                                    <p className="text-uefa-dark font-medium truncate">{teamData.contact_line || <span className="text-gray-300 italic text-xs">{t.team.noContactInfo}</span>}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                    <i className="fab fa-discord"></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.team.contactDiscordLabel}</p>
                                    {teamData.contact_discord ? (
                                        <a href={teamData.contact_discord} target="_blank" rel="noopener noreferrer" className="text-cyan-aura hover:underline font-medium text-xs truncate block">
                                            {teamData.contact_discord}
                                        </a>
                                    ) : (
                                        <p className="text-gray-300 italic text-xs truncate">{t.team.noContactInfo}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personal Profile Card */}
                <div className="bg-white rounded-none shadow-xl p-6 border border-gray-100 flex flex-col justify-between animate-fadeIn">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                            <h3 className="text-md font-bold text-uefa-dark uppercase flex items-center gap-2">
                                <i className="fas fa-id-card text-cyan-aura"></i>
                                {t.team.personalDetailsHeader}
                            </h3>
                            <button
                                onClick={() => {
                                    const currentPlayer = teamData.members?.find((m: any) => m.id === teamData.currentPlayerId);
                                    if (currentPlayer) {
                                        setEditNickname(currentPlayer.nickname || '');
                                        setEditPersonalPhone(currentPlayer.phone || '');
                                        setEditFavoriteHeroes(currentPlayer.favorite_heroes || []);
                                    }
                                    setIsPersonalModalOpen(true);
                                }}
                                className="text-xs text-cyan-aura hover:underline flex items-center gap-1 font-bold cursor-pointer"
                            >
                                <i className="fas fa-user-edit"></i>
                                {t.team.editPersonalDetails}
                            </button>
                        </div>

                        {(() => {
                            const currentPlayer = teamData.members?.find((m: any) => m.id === teamData.currentPlayerId);
                            return (
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.team.playerNicknameLabel}</p>
                                            <p className="text-uefa-dark font-semibold text-sm">{currentPlayer?.nickname || <span className="text-gray-300 italic text-xs">ไม่ได้ระบุ</span>}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.team.playerPhoneLabel}</p>
                                            <p className="text-uefa-dark font-semibold text-sm">{currentPlayer?.phone || <span className="text-gray-300 italic text-xs">ไม่ได้ระบุ</span>}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">{t.team.favHeroesLabel}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {currentPlayer?.favorite_heroes && currentPlayer.favorite_heroes.length > 0 ? (
                                                currentPlayer.favorite_heroes.map((heroName: string) => {
                                                    const heroObj = heroList.find(h => h.name === heroName);
                                                    return (
                                                        <span key={heroName} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gray-100 text-uefa-dark rounded-full text-xs font-semibold border border-gray-150 shadow-sm">
                                                            {heroObj?.image_url && (
                                                                <img src={heroObj.image_url} alt={heroName} className="w-3.5 h-3.5 rounded-full object-cover border border-gray-250" />
                                                            )}
                                                            {heroName}
                                                        </span>
                                                    );
                                                })
                                            ) : (
                                                <span className="text-gray-300 italic text-xs">{t.team.noFavHeroes}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>

            {/* Invite Code & Recruitment Controls */}
            {isCaptain && (
                <div className="bg-white rounded-none shadow-xl p-6 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fadeIn">
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-uefa-dark uppercase tracking-wide flex items-center gap-2">
                            <i className="fas fa-key text-cyan-aura"></i>
                            {language === 'th' ? 'การรับสมัครสมาชิกใหม่' : 'Roster Recruitment'}
                        </h4>
                        <p className="text-xs text-gray-500">
                            {teamData.invite_code 
                                ? (language === 'th' ? 'ส่งรหัสเชิญนี้ให้กับเพื่อนร่วมทีมเพื่อเข้าทีม' : 'Share this code with teammates to allow them to join')
                                : (language === 'th' ? 'การรับสมัครปิดอยู่ ผู้เล่นใหม่ไม่สามารถเข้าร่วมทีมได้' : 'Recruitment is disabled. New members cannot join.')}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        {teamData.invite_code ? (
                            <div className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl flex items-center gap-3 w-full sm:w-auto justify-between">
                                <span className="text-xl font-mono font-bold text-cyan-aura tracking-widest">{teamData.invite_code}</span>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(teamData.invite_code);
                                        Swal.fire({ title: t.team.copiedToast, toast: true, position: 'top-end', timer: 2000, showConfirmButton: false, icon: 'success' });
                                    }}
                                    disabled={isLocked}
                                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-400 hover:text-uefa-dark disabled:opacity-30 cursor-pointer"
                                >
                                    <i className="fas fa-copy"></i>
                                </button>
                            </div>
                        ) : (
                            <div className="bg-red-50 border border-red-200/50 px-4 py-2 rounded-xl text-red-500 font-bold text-sm tracking-wide w-full sm:w-auto text-center">
                                <i className="fas fa-ban mr-2"></i> {t.team.recruitmentClosed}
                            </div>
                        )}

                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                onClick={handleToggleRecruitment}
                                disabled={isLocked || actionLoading}
                                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm border ${
                                    teamData.invite_code 
                                        ? 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200' 
                                        : 'bg-cyan-aura/10 hover:bg-cyan-aura/20 text-cyan-aura border-cyan-aura/30'
                                } disabled:opacity-40 disabled:hover:bg-transparent`}
                            >
                                <i className={teamData.invite_code ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                {teamData.invite_code ? t.team.closeRecruitmentBtn : t.team.openRecruitmentBtn}
                            </button>

                            {teamData.invite_code && (
                                <button
                                    onClick={handleRegenerateInviteCode}
                                    disabled={isLocked || actionLoading}
                                    className="flex-1 sm:flex-none px-4 py-2 bg-white hover:bg-gray-50 text-uefa-dark border border-gray-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-40 disabled:hover:bg-white"
                                >
                                    <i className="fas fa-sync-alt"></i>
                                    {t.team.regenerateInviteCodeBtn}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Members List */}
            <div className="bg-white rounded-none shadow-xl overflow-hidden border border-gray-100 animate-fadeIn">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-uefa-dark uppercase flex items-center gap-2">
                        <i className="fas fa-user-friends text-cyan-aura"></i>
                        {t.team.squadMembers.replace('{count}', teamData.members.length.toString())} ({teamData.members.length}/6)
                    </h3>
                </div>
                
                <div className="divide-y divide-gray-50">
                    {teamData.members.map((member: any) => (
                        <div key={member.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50/50 transition-colors gap-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${member.id === teamData.captain_id ? 'bg-cyan-aura text-uefa-dark' : 'bg-gray-100 text-gray-400'}`}>
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-bold text-uefa-dark">{member.name}</span>
                                        {member.nickname && (
                                            <span className="text-xs text-gray-500 font-medium bg-gray-50 border border-gray-150 rounded px-1.5 py-0.5">({member.nickname})</span>
                                        )}
                                        {member.id === teamData.captain_id && (
                                            <span className="text-[10px] bg-cyan-aura/20 text-cyan-aura font-bold px-2 py-0.5 rounded-full uppercase">{t.team.captainLabel}</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {t.team.ignLabel}: <span className="font-medium text-uefa-dark">{member.in_game_name}</span> | {t.team.gradeLabel}: <span className="font-medium text-uefa-dark">{member.grade}</span>
                                        {member.phone && isCaptain && (
                                            <span className="ml-2 font-medium">| 📞: {member.phone}</span>
                                        )}
                                    </div>
                                    
                                    {/* Favorite Heroes */}
                                    {member.favorite_heroes && member.favorite_heroes.length > 0 && (
                                        <div className="flex items-center gap-1.5 mt-2 flex-wrap animate-fadeIn">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{language === 'th' ? 'ฮีโร่โปรด:' : 'Favs:'}</span>
                                            {member.favorite_heroes.map((heroName: string) => {
                                                const heroObj = heroList.find(h => h.name === heroName);
                                                return (
                                                    <span key={heroName} className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-205 text-[10px] text-gray-600 rounded font-medium shadow-sm">
                                                        {heroObj?.image_url && (
                                                            <img src={heroObj.image_url} alt={heroName} className="w-3 h-3 rounded-full object-cover border border-gray-250" />
                                                        )}
                                                        {heroName}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-end gap-6">
                                {/* Role / Position Dropdown or Badge */}
                                <div className="min-w-[180px] w-full sm:w-auto">
                                    {isCaptain && !isLocked ? (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t.team.roleLabel}</span>
                                            <select
                                                value={member.lineup_role || 'not_set'}
                                                onChange={(e) => handleRoleChange(member.id, e.target.value)}
                                                disabled={actionLoading}
                                                className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-cyan-aura focus:border-cyan-aura outline-none w-full text-uefa-dark font-medium cursor-pointer"
                                            >
                                                <option value="not_set">{t.team.rolePlaceholder}</option>
                                                {lineupRoles.map((role) => (
                                                    <option key={role.value} value={role.value}>
                                                        {role.icon} {role.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t.team.roleLabel}</span>
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                                member.lineup_role === 'dark_slayer' ? 'bg-slate-100 text-slate-700 border border-slate-200/50' :
                                                member.lineup_role === 'abyssal_dragon' ? 'bg-amber-50 text-amber-700 border border-amber-200/50' :
                                                member.lineup_role === 'mid_lane' ? 'bg-purple-50 text-purple-700 border border-purple-200/50' :
                                                member.lineup_role === 'jungle' ? 'bg-red-50 text-red-700 border border-red-200/50' :
                                                member.lineup_role === 'support' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' :
                                                member.lineup_role === 'substitute' ? 'bg-blue-50 text-blue-700 border border-blue-200/50' :
                                                'bg-gray-50 text-gray-400 border border-gray-150'
                                            }`}>
                                                {getRoleLabel(member.lineup_role)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    {isCaptain && member.id !== teamData.captain_id && (
                                        <button 
                                            onClick={() => handleKickPlayer(member.id, member.name)}
                                            disabled={isLocked || actionLoading}
                                            className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                                            title={t.team.kickTooltip}
                                        >
                                            <i className="fas fa-user-minus text-sm"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Actions Bar */}
                <div className="p-6 bg-gray-50 flex justify-end">
                    {!isCaptain && (
                        <button
                            onClick={handleLeaveTeam}
                            disabled={isLocked || actionLoading}
                            className="px-6 py-2 bg-red-500/10 text-red-600 rounded-lg font-bold hover:bg-red-500/20 transition-all text-sm disabled:opacity-40 disabled:hover:bg-red-500/10 cursor-pointer"
                        >
                            <i className="fas fa-sign-out-alt mr-2"></i> {t.team.leaveBtn}
                        </button>
                    )}
                </div>
            </div>

            {/* Edit Team Info Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-none max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100 animate-fadeIn">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-xl font-bold text-uefa-dark uppercase flex items-center gap-2">
                                <i className="fas fa-edit text-cyan-aura"></i>
                                {t.team.editTeamInfo}
                            </h3>
                            <button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            >
                                <i className="fas fa-times text-lg"></i>
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdateTeamInfo} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-uefa-dark mb-1">{t.team.teamNameLabel}</label>
                                <input
                                    type="text"
                                    value={editTeamName}
                                    onChange={(e) => setEditTeamName(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-uefa-dark mb-1">{t.team.teamDescriptionLabel}</label>
                                <textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    placeholder={t.team.teamDescriptionPlaceholder}
                                    rows={3}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura outline-none resize-none text-sm text-uefa-dark"
                                    maxLength={200}
                                />
                                <p className="text-right text-[10px] text-gray-400 mt-1">{editDescription.length}/200</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-uefa-dark mb-1">{t.team.teamLogoLabel}</label>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="w-20 h-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative">
                                        {editLogoUrl ? (
                                            <img src={editLogoUrl} alt="Preview" className="w-full h-full object-contain p-1" />
                                        ) : (
                                            <i className="fas fa-image text-2xl text-gray-300"></i>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            id="logo-upload"
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="logo-upload"
                                            className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-uefa-dark font-bold text-sm rounded-lg cursor-pointer transition-colors"
                                        >
                                            <i className="fas fa-upload mr-2"></i> {language === 'th' ? 'เลือกรูปภาพ' : 'Choose Image'}
                                        </label>
                                        {editLogoUrl && (
                                            <button
                                                type="button"
                                                onClick={() => setEditLogoUrl('')}
                                                className="block text-xs text-red-500 hover:underline"
                                            >
                                                {language === 'th' ? 'ลบรูปภาพ' : 'Remove Image'}
                                            </button>
                                        )}
                                        <p className="text-[10px] text-gray-400">PNG, JPG ไม่เกิน 2MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-5 py-2.5 bg-gray-100 text-uefa-dark font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                >
                                    {language === 'th' ? 'ยกเลิก' : 'Cancel'}
                                </button>
                                <button
                                    type="submit"
                                    disabled={actionLoading}
                                    className="px-5 py-2.5 bg-cyan-aura text-uefa-dark font-bold rounded-lg hover:bg-cyan-aura/90 transition-colors text-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {actionLoading && <i className="fas fa-spinner animate-spin"></i>}
                                    {t.team.saveBtn}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Team Contact Info Modal */}
            {isContactModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-none max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100 animate-fadeIn">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-xl font-bold text-uefa-dark uppercase flex items-center gap-2">
                                <i className="fas fa-address-book text-cyan-aura"></i>
                                {t.team.editContactInfo}
                            </h3>
                            <button 
                                onClick={() => setIsContactModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            >
                                <i className="fas fa-times text-lg"></i>
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdateContactInfo} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-uefa-dark mb-1">{t.team.contactPhoneLabel}</label>
                                <input
                                    type="text"
                                    value={editContactPhone}
                                    onChange={(e) => setEditContactPhone(e.target.value)}
                                    placeholder={t.team.contactPhonePlaceholder}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura outline-none text-sm text-uefa-dark"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-uefa-dark mb-1">{t.team.contactLineLabel}</label>
                                <input
                                    type="text"
                                    value={editContactLine}
                                    onChange={(e) => setEditContactLine(e.target.value)}
                                    placeholder={t.team.contactLinePlaceholder}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura outline-none text-sm text-uefa-dark"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-uefa-dark mb-1">{t.team.contactDiscordLabel}</label>
                                <input
                                    type="url"
                                    value={editContactDiscord}
                                    onChange={(e) => setEditContactDiscord(e.target.value)}
                                    placeholder={t.team.contactDiscordPlaceholder}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura outline-none text-sm text-uefa-dark"
                                />
                            </div>

                            <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsContactModalOpen(false)}
                                    className="px-5 py-2.5 bg-gray-100 text-uefa-dark font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                >
                                    {language === 'th' ? 'ยกเลิก' : 'Cancel'}
                                </button>
                                <button
                                    type="submit"
                                    disabled={actionLoading}
                                    className="px-5 py-2.5 bg-cyan-aura text-uefa-dark font-bold rounded-lg hover:bg-cyan-aura/90 transition-colors text-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {actionLoading && <i className="fas fa-spinner animate-spin"></i>}
                                    {t.team.saveBtn}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Personal Profile Modal */}
            {isPersonalModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-none max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100 animate-fadeIn">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-xl font-bold text-uefa-dark uppercase flex items-center gap-2">
                                <i className="fas fa-user-edit text-cyan-aura"></i>
                                {t.team.editPersonalDetails}
                            </h3>
                            <button 
                                onClick={() => setIsPersonalModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            >
                                <i className="fas fa-times text-lg"></i>
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdatePersonalDetails} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-uefa-dark mb-1">{t.team.playerNicknameLabel}</label>
                                <input
                                    type="text"
                                    value={editNickname}
                                    onChange={(e) => setEditNickname(e.target.value)}
                                    placeholder={t.team.playerNicknamePlaceholder}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura outline-none text-sm text-uefa-dark"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-uefa-dark mb-1">{t.team.playerPhoneLabel}</label>
                                <input
                                    type="text"
                                    value={editPersonalPhone}
                                    onChange={(e) => setEditPersonalPhone(e.target.value)}
                                    placeholder={t.team.playerPhonePlaceholder}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura outline-none text-sm text-uefa-dark"
                                />
                            </div>

                            {/* Autocomplete Input */}
                            <div className="relative">
                                <label className="block text-sm font-bold text-uefa-dark mb-1">{t.team.favHeroesLabel}</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {editFavoriteHeroes.map((heroName) => {
                                        const heroObj = heroList.find(h => h.name === heroName);
                                        return (
                                            <span key={heroName} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-aura/10 border border-cyan-aura/20 text-cyan-aura rounded-full text-xs font-bold shadow-sm">
                                                {heroObj?.image_url && (
                                                    <img src={heroObj.image_url} alt={heroName} className="w-4 h-4 rounded-full object-cover border border-gray-200" />
                                                )}
                                                {heroName}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveHero(heroName)}
                                                    className="hover:text-red-500 transition-colors ml-1 font-bold text-xs cursor-pointer"
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        );
                                    })}
                                </div>
                                
                                {editFavoriteHeroes.length < 5 && (
                                    <input
                                        type="text"
                                        value={heroSearch}
                                        onChange={(e) => {
                                            setHeroSearch(e.target.value);
                                            setShowHeroDropdown(true);
                                        }}
                                        onFocus={() => setShowHeroDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowHeroDropdown(false), 200)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (heroSearch.trim()) {
                                                    handleAddHero(heroSearch.trim());
                                                }
                                            }
                                        }}
                                        placeholder={t.team.favHeroesPlaceholder}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura outline-none text-sm text-uefa-dark"
                                    />
                                )}
                                
                                {showHeroDropdown && heroSearch.trim() && (
                                    <div className="absolute z-55 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto divide-y divide-gray-50">
                                        {filteredHeroes.map((hero) => (
                                            <button
                                                key={hero.id}
                                                type="button"
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    handleAddHero(hero.name);
                                                }}
                                                className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 text-uefa-dark flex items-center gap-3 transition-colors cursor-pointer"
                                            >
                                                {hero.image_url && (
                                                    <img src={hero.image_url} alt={hero.name} className="w-6 h-6 rounded-full object-cover border border-gray-200" />
                                                )}
                                                <span className="font-medium">{hero.name}</span>
                                            </button>
                                        ))}
                                        <button
                                            type="button"
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleAddHero(heroSearch.trim());
                                            }}
                                            className="w-full px-4 py-2.5 text-left text-sm font-semibold text-cyan-600 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer"
                                        >
                                            <span>{language === 'th' ? `เพิ่ม "${heroSearch.trim()}"` : `Add "${heroSearch.trim()}"`}</span>
                                            <i className="fas fa-plus text-xs"></i>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsPersonalModalOpen(false)}
                                    className="px-5 py-2.5 bg-gray-100 text-uefa-dark font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                >
                                    {language === 'th' ? 'ยกเลิก' : 'Cancel'}
                                </button>
                                <button
                                    type="submit"
                                    disabled={actionLoading}
                                    className="px-5 py-2.5 bg-cyan-aura text-uefa-dark font-bold rounded-lg hover:bg-cyan-aura/90 transition-colors text-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {actionLoading && <i className="fas fa-spinner animate-spin"></i>}
                                    {t.team.saveBtn}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
