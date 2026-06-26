'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getStudentRegistrationStatus, resubmitRegistrationAction, getPlayerGamingProfile } from '@/features/auth/student-actions';
import { updateGamingProfileAction } from '@/features/teams/actions';
import { ROV_RANKS } from '@/features/teams/constants';
import { getHeroesAction } from '@/features/players/actions';
import Swal from 'sweetalert2';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useAuth } from '@/components/providers/AuthProvider';

const ROLE_OPTIONS = ['dark_slayer', 'abyssal_dragon', 'mid_lane', 'jungle', 'support'] as const;

export default function StudentInfoPage() {
    const { t, language } = useLanguage();
    const { isAuthenticated, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [registration, setRegistration] = useState<any>(null);

    // Gaming Profile states
    const [gamingProfile, setGamingProfile] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);
    const [editRank, setEditRank] = useState<string | null>(null);
    const [editSecondaryRole, setEditSecondaryRole] = useState<string | null>(null);
    const [editTopHeroes, setEditTopHeroes] = useState<string[]>([]);
    const [editExperienceBio, setEditExperienceBio] = useState<string | null>(null);
    const [editNickname, setEditNickname] = useState<string | null>(null);
    const [editPhone, setEditPhone] = useState<string | null>(null);
    const [editFavoriteHeroes, setEditFavoriteHeroes] = useState<string[]>([]);

    // Hero autocomplete
    const [heroSearch, setHeroSearch] = useState('');
    const [heroList, setHeroList] = useState<any[]>([]);
    const [showHeroDropdown, setShowHeroDropdown] = useState(false);
    const [favHeroSearch, setFavHeroSearch] = useState('');
    const [showFavHeroDropdown, setShowFavHeroDropdown] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
            return;
        }

        async function loadData() {
            setLoading(true);
            const regData = await getStudentRegistrationStatus();
            if (regData) {
                setRegistration(regData);
            }

            // Load gaming profile if verified
            const profileData = await getPlayerGamingProfile();
            if (profileData) {
                setGamingProfile(profileData);
                setEditRank(profileData.current_rank || null);
                setEditSecondaryRole(profileData.secondary_role || null);
                setEditTopHeroes(profileData.top_heroes || []);
                setEditExperienceBio(profileData.experience_bio || null);
                setEditNickname(profileData.nickname || null);
                setEditPhone(profileData.phone || null);
                setEditFavoriteHeroes(profileData.favorite_heroes || []);
            }

            // Load hero list for autocomplete
            try {
                const heroes = await getHeroesAction();
                setHeroList(heroes || []);
            } catch (e) {
                console.error('Failed to fetch heroes:', e);
            }

            setLoading(false);
        }

        if (isAuthenticated) {
            loadData();
        }
    }, [isAuthenticated, authLoading, router]);

    const handleResubmit = async () => {
        setSubmitting(true);
        try {
            const result = await resubmitRegistrationAction();
            if (result.error) {
                Swal.fire({
                    icon: 'error',
                    title: t.studentInfo.errorTitle,
                    text: result.error,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: language === 'th' ? 'เริ่มต้นลงทะเบียนใหม่' : 'Restart Onboarding',
                    text: language === 'th' ? 'กำลังนำคุณไปหน้ากรอกข้อมูล...' : 'Redirecting to onboarding...',
                    confirmButtonColor: '#06b6d4',
                }).then(() => {
                    router.push('/register/onboarding');
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: t.studentInfo.errorTitle,
                text: error.message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleStartEdit = () => {
        setEditRank(gamingProfile?.current_rank || null);
        setEditSecondaryRole(gamingProfile?.secondary_role || null);
        setEditTopHeroes(gamingProfile?.top_heroes || []);
        setEditExperienceBio(gamingProfile?.experience_bio || null);
        setEditNickname(gamingProfile?.nickname || null);
        setEditPhone(gamingProfile?.phone || null);
        setEditFavoriteHeroes(gamingProfile?.favorite_heroes || []);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setHeroSearch('');
        setShowHeroDropdown(false);
        setFavHeroSearch('');
        setShowFavHeroDropdown(false);
    };

    const handleSaveProfile = async () => {
        setSavingProfile(true);
        try {
            const result = await updateGamingProfileAction({
                currentRank: editRank,
                secondaryRole: editSecondaryRole,
                topHeroes: editTopHeroes,
                experienceBio: editExperienceBio,
                nickname: editNickname,
                phone: editPhone,
                favoriteHeroes: editFavoriteHeroes,
            });

            if (result.error) {
                Swal.fire({ icon: 'error', title: t.studentInfo.errorTitle, text: result.error });
            } else {
                Swal.fire({ icon: 'success', title: t.studentInfo.saveSuccess, timer: 1500, showConfirmButton: false });
                // Refresh gaming profile
                const updated = await getPlayerGamingProfile();
                if (updated) {
                    setGamingProfile(updated);
                }
                setIsEditing(false);
            }
        } catch (error: any) {
            Swal.fire({ icon: 'error', title: t.studentInfo.errorTitle, text: error.message });
        } finally {
            setSavingProfile(false);
        }
    };

    const handleAddHero = (heroName: string) => {
        if (editTopHeroes.length >= 3) return;
        if (editTopHeroes.includes(heroName)) return;
        setEditTopHeroes([...editTopHeroes, heroName]);
        setHeroSearch('');
        setShowHeroDropdown(false);
    };

    const handleRemoveHero = (heroName: string) => {
        setEditTopHeroes(editTopHeroes.filter(h => h !== heroName));
    };

    const filteredHeroes = heroList.filter(h =>
        h.name.toLowerCase().includes(heroSearch.toLowerCase()) &&
        !editTopHeroes.includes(h.name)
    );

    const handleAddFavHero = (heroName: string) => {
        if (editFavoriteHeroes.length >= 5) return;
        if (editFavoriteHeroes.includes(heroName)) return;
        setEditFavoriteHeroes([...editFavoriteHeroes, heroName]);
        setFavHeroSearch('');
        setShowFavHeroDropdown(false);
    };

    const handleRemoveFavHero = (heroName: string) => {
        setEditFavoriteHeroes(editFavoriteHeroes.filter(h => h !== heroName));
    };

    const filteredFavHeroes = heroList.filter(h =>
        h.name.toLowerCase().includes(favHeroSearch.toLowerCase()) &&
        !editFavoriteHeroes.includes(h.name)
    );

    const getRoleName = (role: string | null) => {
        if (!role) return t.studentInfo.noData;
        return (t.studentInfo as any)[role] || role;
    };

    const isVerified = registration && (registration.status === 'approved' || registration.status === 'verified');

    if (loading || authLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"></div>
            </div>
        );
    }

    if (registration) {
        return (
            <div className="space-y-6 max-w-2xl mx-auto my-8">
                {/* === Registration Status Card === */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-cyan-aura/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className={`fas ${registration.status === 'approved' ? 'fa-check-circle text-green-500' : registration.status === 'rejected' ? 'fa-times-circle text-red-500' : 'fa-hourglass-half text-cyan-aura'} text-4xl`}></i>
                        </div>
                        <h2 className="text-2xl font-display font-bold text-uefa-dark uppercase">
                            {t.studentInfo.regStatusTitle}
                        </h2>
                        <p className="text-gray-500 mt-2">{t.studentInfo.interestThanks}</p>
                    </div>

                    <div className="space-y-4 max-w-md mx-auto">
                        <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                            <span className="text-gray-500">{t.studentInfo.statusLabel}</span>
                            <span className={`font-bold ${(registration.status === 'approved' || registration.status === 'verified') ? 'text-green-600' : registration.status === 'rejected' ? 'text-red-600' : 'text-cyan-aura'}`}>
                                {(registration.status === 'approved' || registration.status === 'verified') ? t.studentInfo.approvedValue : registration.status === 'rejected' ? t.studentInfo.rejectedValue : t.studentInfo.pendingValue}
                            </span>
                        </div>
                        <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                            <span className="text-gray-500">{t.studentInfo.fullNameLabel}</span>
                            <span className="text-uefa-dark font-medium">{registration.full_name}</span>
                        </div>
                        <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                            <span className="text-gray-500">{t.studentInfo.studentIdLabel}</span>
                            <span className="text-uefa-dark font-medium">{registration.student_id}</span>
                        </div>
                        <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                            <span className="text-gray-500">{t.studentInfo.ignLabel}</span>
                            <span className="text-uefa-dark font-medium">{registration.in_game_name}</span>
                        </div>

                        {registration.verification_doc_url && (
                            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                                <span className="text-gray-500 block text-sm">
                                    {language === 'th' ? 'หลักฐานยืนยันตัวตน:' : 'Verification Document:'}
                                </span>
                                <div 
                                    className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 cursor-pointer group"
                                    onClick={() => window.open(registration.verification_doc_url, '_blank')}
                                >
                                    <Image
                                        src={registration.verification_doc_url}
                                        alt="Verification Document"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-bold">
                                        <i className="fas fa-search-plus mr-2 text-lg"></i>
                                        {language === 'th' ? 'ดูรูปภาพขนาดใหญ่' : 'View Full Image'}
                                    </div>
                                </div>
                            </div>
                        )}

                        {registration.screening_notes && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                                <p className="text-sm text-red-700">
                                    <strong>{t.studentInfo.adminNoteLabel}</strong> {registration.screening_notes}
                                </p>
                            </div>
                        )}
                    </div>

                    {registration.status === 'rejected' && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={handleResubmit}
                                disabled={submitting}
                                className="w-full max-w-xs py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
                            >
                                {submitting ? (
                                    <><i className="fas fa-spinner fa-spin"></i> {language === 'th' ? 'กำลังดำเนินการ...' : 'Processing...'}</>
                                ) : (
                                    <><i className="fas fa-redo"></i> {language === 'th' ? 'แก้ไขและส่งข้อมูลอีกครั้ง' : 'Edit & Resubmit Details'}</>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* === Gaming Profile Card (only when verified) === */}
                {isVerified && gamingProfile && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <i className="fas fa-gamepad text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-uefa-dark uppercase">
                                        {t.studentInfo.gamingProfileTitle}
                                    </h3>
                                    <p className="text-xs text-gray-400">{t.studentInfo.gamingProfileDesc}</p>
                                </div>
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={handleStartEdit}
                                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition-all flex items-center gap-2"
                                >
                                    <i className="fas fa-pen text-xs"></i>
                                    {t.studentInfo.editBtn}
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            /* ===== EDIT MODE ===== */
                            <div className="space-y-5">
                                {/* Rank */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.studentInfo.rankLabel}</label>
                                    <select
                                        value={editRank || ''}
                                        onChange={(e) => setEditRank(e.target.value || null)}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-sm"
                                    >
                                        <option value="">{t.studentInfo.rankPlaceholder}</option>
                                        {ROV_RANKS.map(rank => (
                                            <option key={rank} value={rank}>{rank}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Secondary Role */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.studentInfo.secondaryRoleLabel}</label>
                                    <select
                                        value={editSecondaryRole || ''}
                                        onChange={(e) => setEditSecondaryRole(e.target.value || null)}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-sm"
                                    >
                                        <option value="">{t.studentInfo.rolePlaceholder}</option>
                                        {ROLE_OPTIONS.map(role => (
                                            <option key={role} value={role}>{getRoleName(role)}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Top Heroes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.studentInfo.topHeroesLabel}</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {editTopHeroes.map(hero => (
                                            <span key={hero} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                                {hero}
                                                <button onClick={() => handleRemoveHero(hero)} className="hover:text-red-500 transition-colors">
                                                    <i className="fas fa-times text-xs"></i>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    {editTopHeroes.length < 3 && (
                                        <div className="relative">
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
                                                placeholder={t.studentInfo.topHeroesPlaceholder}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                                            />
                                            {showHeroDropdown && heroSearch.trim() && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                                                    {filteredHeroes.slice(0, 10).map(hero => (
                                                        <button
                                                            key={hero.id}
                                                            type="button"
                                                            onMouseDown={(e) => {
                                                                e.preventDefault();
                                                                handleAddHero(hero.name);
                                                            }}
                                                            className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-sm transition-colors cursor-pointer"
                                                        >
                                                            {hero.name}
                                                        </button>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            handleAddHero(heroSearch.trim());
                                                        }}
                                                        className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-sm font-semibold text-purple-600 border-t border-gray-100 transition-colors flex items-center justify-between cursor-pointer"
                                                    >
                                                        <span>{language === 'th' ? `เพิ่ม "${heroSearch.trim()}"` : `Add "${heroSearch.trim()}"`}</span>
                                                        <i className="fas fa-plus text-xs"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Experience Bio */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.studentInfo.experienceLabel}</label>
                                    <textarea
                                        value={editExperienceBio || ''}
                                        onChange={(e) => setEditExperienceBio(e.target.value || null)}
                                        placeholder={t.studentInfo.experiencePlaceholder}
                                        maxLength={500}
                                        rows={3}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm resize-none"
                                    />
                                    <p className="text-xs text-gray-400 text-right mt-1">{(editExperienceBio || '').length}/500</p>
                                </div>

                                <div className="border-t border-gray-100 pt-4 my-2">
                                    <h4 className="text-sm font-bold text-uefa-dark uppercase tracking-wider mb-4">
                                        <i className="fas fa-address-card text-purple-500 mr-1.5"></i>
                                        {language === 'th' ? 'ข้อมูลส่วนตัว & การติดต่อ' : 'Personal & Contact Details'}
                                    </h4>
                                </div>

                                {/* Nickname */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.team.playerNicknameLabel}</label>
                                    <input
                                        type="text"
                                        value={editNickname || ''}
                                        onChange={(e) => setEditNickname(e.target.value || null)}
                                        placeholder={t.team.playerNicknamePlaceholder}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-sm"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.team.playerPhoneLabel}</label>
                                    <input
                                        type="text"
                                        value={editPhone || ''}
                                        onChange={(e) => setEditPhone(e.target.value || null)}
                                        placeholder={t.team.playerPhonePlaceholder}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-sm"
                                    />
                                </div>

                                {/* Favorite Heroes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.team.favHeroesLabel}</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {editFavoriteHeroes.map(hero => (
                                            <span key={hero} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                                                {hero}
                                                <button type="button" onClick={() => handleRemoveFavHero(hero)} className="hover:text-red-500 transition-colors">
                                                    <i className="fas fa-times text-xs"></i>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    {editFavoriteHeroes.length < 5 && (
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={favHeroSearch}
                                                onChange={(e) => {
                                                    setFavHeroSearch(e.target.value);
                                                    setShowFavHeroDropdown(true);
                                                }}
                                                onFocus={() => setShowFavHeroDropdown(true)}
                                                onBlur={() => setTimeout(() => setShowFavHeroDropdown(false), 200)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        if (favHeroSearch.trim()) {
                                                            handleAddFavHero(favHeroSearch.trim());
                                                        }
                                                    }
                                                }}
                                                placeholder={language === 'th' ? 'ค้นหา Hero โปรด...' : 'Search favorite Hero...'}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                                            />
                                            {showFavHeroDropdown && favHeroSearch.trim() && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                                                    {filteredFavHeroes.slice(0, 10).map(hero => (
                                                        <button
                                                            key={hero.id}
                                                            type="button"
                                                            onMouseDown={(e) => {
                                                                e.preventDefault();
                                                                handleAddFavHero(hero.name);
                                                            }}
                                                            className="w-full text-left px-4 py-2.5 hover:bg-cyan-50 text-sm transition-colors cursor-pointer"
                                                        >
                                                            {hero.name}
                                                        </button>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            handleAddFavHero(favHeroSearch.trim());
                                                        }}
                                                        className="w-full text-left px-4 py-2.5 hover:bg-cyan-50 text-sm font-semibold text-cyan-600 border-t border-gray-100 transition-colors flex items-center justify-between cursor-pointer"
                                                    >
                                                        <span>{language === 'th' ? `เพิ่ม "${favHeroSearch.trim()}"` : `Add "${favHeroSearch.trim()}"`}</span>
                                                        <i className="fas fa-plus text-xs"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={handleCancelEdit}
                                        className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all text-sm"
                                    >
                                        {t.studentInfo.cancelBtn}
                                    </button>
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={savingProfile}
                                        className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                                    >
                                        {savingProfile ? (
                                            <><i className="fas fa-spinner fa-spin"></i></>
                                        ) : (
                                            <><i className="fas fa-save"></i> {t.studentInfo.saveBtn}</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* ===== READ MODE ===== */
                            <div className="space-y-4">
                                {/* Stat Cards Row */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 text-center border border-amber-100">
                                        <i className="fas fa-trophy text-amber-500 text-lg mb-1"></i>
                                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{language === 'th' ? 'Rank' : 'Rank'}</p>
                                        <p className="text-sm font-bold text-uefa-dark mt-0.5 truncate">{gamingProfile.current_rank || t.studentInfo.noData}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center border border-blue-100">
                                        <i className="fas fa-crosshairs text-blue-500 text-lg mb-1"></i>
                                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{language === 'th' ? 'หลัก' : 'Main'}</p>
                                        <p className="text-sm font-bold text-uefa-dark mt-0.5 truncate">{getRoleName(gamingProfile.lineup_role)}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 text-center border border-violet-100">
                                        <i className="fas fa-random text-violet-500 text-lg mb-1"></i>
                                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{language === 'th' ? 'รอง' : 'Sub'}</p>
                                        <p className="text-sm font-bold text-uefa-dark mt-0.5 truncate">{getRoleName(gamingProfile.secondary_role)}</p>
                                    </div>
                                </div>

                                {/* Top Heroes */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                                        {t.studentInfo.topHeroesLabel}
                                    </p>
                                    {gamingProfile.top_heroes && gamingProfile.top_heroes.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {gamingProfile.top_heroes.map((hero: string) => (
                                                <span key={hero} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-uefa-dark shadow-sm">
                                                    {hero}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">{t.studentInfo.noData}</p>
                                    )}
                                </div>

                                {/* Personal & Contact Details */}
                                <div className="p-4 bg-gray-50 rounded-lg grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                                            <i className="fas fa-user mr-1 text-purple-400"></i>
                                            {t.team.playerNicknameLabel}
                                        </p>
                                        <p className="text-sm font-bold text-uefa-dark">
                                            {gamingProfile.nickname || <span className="text-gray-400 italic">{t.studentInfo.noData}</span>}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                                            <i className="fas fa-phone mr-1 text-purple-400"></i>
                                            {t.team.playerPhoneLabel}
                                        </p>
                                        <p className="text-sm font-bold text-uefa-dark">
                                            {gamingProfile.phone || <span className="text-gray-400 italic">{t.studentInfo.noData}</span>}
                                        </p>
                                    </div>
                                </div>

                                {/* Favorite Heroes */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                                        <i className="fas fa-heart text-red-400 mr-1"></i>
                                        {t.team.favHeroesLabel}
                                    </p>
                                    {gamingProfile.favorite_heroes && gamingProfile.favorite_heroes.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {gamingProfile.favorite_heroes.map((hero: string) => (
                                                <span key={hero} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-uefa-dark shadow-sm">
                                                    {hero}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">{t.studentInfo.noData}</p>
                                    )}
                                </div>

                                {/* Experience Bio */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                                        <i className="fas fa-scroll text-indigo-400 mr-1"></i>
                                        {t.studentInfo.experienceLabel}
                                    </p>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                        {gamingProfile.experience_bio || <span className="text-gray-400 italic">{t.studentInfo.noData}</span>}
                                    </p>
                                </div>

                                {/* CTA: Go to Team */}
                                <button
                                    onClick={() => router.push('/team')}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
                                >
                                    <i className="fas fa-users"></i>
                                    {t.studentInfo.goToTeamBtn}
                                    <i className="fas fa-arrow-right text-xs ml-1"></i>
                                </button>
                            </div>
                        )}
                    </div>
                )}


            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-md mx-auto my-8 text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-yellow-500 text-3xl"></i>
            </div>
            <h2 className="text-xl font-bold text-uefa-dark mb-2">
                {language === 'th' ? 'ยังไม่ได้ลงทะเบียนข้อมูลนักเรียน' : 'Onboarding Incomplete'}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
                {language === 'th' ? 'กรุณากรอกข้อมูลส่วนตัวและอัปโหลดหลักฐานเพื่อเข้าสู่การแข่งขัน' : 'Please complete onboarding and upload verification document to participate.'}
            </p>
            <button
                onClick={() => router.push('/register/onboarding')}
                className="w-full py-3 rounded-lg bg-cyan-aura hover:bg-cyan-aura/90 text-uefa-dark font-bold transition-all hover:scale-105 shadow-md shadow-cyan-aura/20"
            >
                {language === 'th' ? 'ไปหน้าลงทะเบียน' : 'Go to Onboarding'}
            </button>
        </div>
    );
}
