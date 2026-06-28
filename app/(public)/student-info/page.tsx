'use client';

import Icon from '@/components/common/Icon';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
    getStudentRegistrationStatus, 
    resubmitRegistrationAction, 
    getPlayerGamingProfile, 
    updateStudentRegistrationAction,
    updateAvatarAction,
    updateCustomStatusAction
} from '@/features/auth/student-actions';
import { updateGamingProfileAction } from '@/features/teams/actions';
import { ROV_RANKS, getRankImageUrl, getPositionImageUrl } from '@/features/teams/constants';
import { getHeroesAction } from '@/features/players/actions';
import Swal from 'sweetalert2';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { createClient } from '@/utils/supabase/client';
import { compressImage } from '@/utils/image-compression';

const ROLE_OPTIONS = ['dark_slayer', 'abyssal_dragon', 'mid_lane', 'jungle', 'support'] as const;

const parseExperienceBio = (text: string | null): Array<{ role: string; startYear: string; endYear: string }> => {
    if (!text) return [];
    return text.split('\n').map(line => {
        if (line.includes('|')) {
            const parts = line.split('|');
            const role = parts[0].trim();
            const period = parts[1].trim();
            if (period.includes('-')) {
                const years = period.split('-');
                return { role, startYear: years[0].trim(), endYear: years[1].trim() };
            }
            return { role, startYear: period, endYear: '' };
        }
        return { role: line.trim(), startYear: '', endYear: '' };
    }).filter(item => item.role !== '');
};

const serializeExperienceBio = (items: Array<{ role: string; startYear: string; endYear: string }>): string => {
    return items
        .map(item => {
            const role = item.role.trim();
            const start = item.startYear.trim();
            const end = item.endYear.trim();
            if (start && end) {
                return `${role} | ${start} - ${end}`;
            } else if (start) {
                return `${role} | ${start}`;
            }
            return role;
        })
        .filter(line => line !== '')
        .join('\n');
};

export default function StudentInfoPage() {
    const { t, language } = useLanguage();
    const { isAuthenticated, loading: authLoading, logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [registration, setRegistration] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [customStatus, setCustomStatus] = useState<string>('');
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [savingStatus, setSavingStatus] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [activeTab, setActiveTab] = useState<'reg' | 'game' | 'settings'>('reg');

    // Student Registration Edit states
    const [isEditingReg, setIsEditingReg] = useState(false);
    const [savingReg, setSavingReg] = useState(false);
    const [editFirstNameTh, setEditFirstNameTh] = useState('');
    const [editLastNameTh, setEditLastNameTh] = useState('');
    const [editFirstNameEn, setEditFirstNameEn] = useState('');
    const [editLastNameEn, setEditLastNameEn] = useState('');
    const [editStudentId, setEditStudentId] = useState('');
    const [editGrade, setEditGrade] = useState('');
    const [editOpenId, setEditOpenId] = useState('');
    const [editInGameName, setEditInGameName] = useState('');

    // Gaming Profile states
    const [gamingProfile, setGamingProfile] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);
    const [editRank, setEditRank] = useState<string | null>(null);
    const [editLineupRole, setEditLineupRole] = useState<string | null>(null);
    const [editSecondaryRole, setEditSecondaryRole] = useState<string | null>(null);
    const [editTopHeroes, setEditTopHeroes] = useState<string[]>([]);
    const [editExperienceBio, setEditExperienceBio] = useState<string | null>(null);
    const [experiences, setExperiences] = useState<Array<{ id: string; role: string; startYear: string; endYear: string }>>([]);
    const [editNickname, setEditNickname] = useState<string | null>(null);
    const [editPhone, setEditPhone] = useState<string | null>(null);

    // Hero autocomplete
    const [heroSearch, setHeroSearch] = useState('');
    const [heroList, setHeroList] = useState<any[]>([]);
    const [showHeroDropdown, setShowHeroDropdown] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (editExperienceBio !== null) {
            const parsed = parseExperienceBio(editExperienceBio).map(item => ({
                ...item,
                id: Math.random().toString()
            }));
            setExperiences(parsed.length > 0 ? parsed : [{ id: Math.random().toString(), role: '', startYear: '', endYear: '' }]);
        } else {
            setExperiences([{ id: Math.random().toString(), role: '', startYear: '', endYear: '' }]);
        }
    }, [editExperienceBio]);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
            return;
        }

        async function loadData() {
            setLoading(true);
            const supabaseClient = createClient();
            const { data: { user: sbUser } } = await supabaseClient.auth.getUser();
            if (sbUser) {
                const { data: prof } = await supabaseClient
                    .from('profiles')
                    .select('*')
                    .eq('id', sbUser.id)
                    .maybeSingle();
                if (prof) {
                    setProfile(prof);
                    setCustomStatus(prof.custom_status || '');
                }
            }

            const regData = await getStudentRegistrationStatus();
            if (regData) {
                setRegistration(regData);
                setEditFirstNameTh(regData.first_name_th || '');
                setEditLastNameTh(regData.last_name_th || '');
                setEditFirstNameEn(regData.first_name_en || '');
                setEditLastNameEn(regData.last_name_en || '');
                setEditStudentId(regData.student_id || '');
                setEditGrade(regData.grade || '');
                setEditOpenId(regData.open_id || '');
                setEditInGameName(regData.in_game_name || '');
            }

            // Load gaming profile if verified
            const profileData = await getPlayerGamingProfile();
            if (profileData) {
                setGamingProfile(profileData);
                setEditRank(profileData.current_rank || null);
                setEditLineupRole(profileData.lineup_role || null);
                setEditSecondaryRole(profileData.secondary_role || null);
                setEditTopHeroes(profileData.top_heroes || []);
                setEditExperienceBio(profileData.experience_bio || null);
                setEditNickname(profileData.nickname || null);
                setEditPhone(profileData.phone || null);
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

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            Swal.fire({
                icon: 'error',
                title: t.studentInfo.errorTitle,
                text: language === 'th' ? 'ขนาดไฟล์ห้ามเกิน 5MB' : 'File size must not exceed 5MB',
            });
            return;
        }

        setUploadingAvatar(true);
        try {
            const supabaseClient = createClient();
            const { data: { user } } = await supabaseClient.auth.getUser();
            if (!user) throw new Error('User not logged in');

            let uploadPayload: Blob | File = file;
            if (file.type.startsWith('image/') && file.type !== 'image/gif') {
                try {
                    uploadPayload = await compressImage(file);
                } catch (compressionErr) {
                    console.warn('Compression failed, uploading original:', compressionErr);
                }
            }

            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}_${Date.now()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            // 1. Upload file to 'avatars' bucket
            const { error: uploadError } = await supabaseClient.storage
                .from('avatars')
                .upload(filePath, uploadPayload, { 
                    cacheControl: '3600', 
                    upsert: true,
                    contentType: file.type || 'image/jpeg'
                });

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabaseClient.storage
                .from('avatars')
                .getPublicUrl(filePath);

            // 3. Update profile avatar_url in database
            const result = await updateAvatarAction(publicUrl);
            if (result.error) throw new Error(result.error);

            Swal.fire({
                icon: 'success',
                title: language === 'th' ? 'สำเร็จ' : 'Success',
                text: language === 'th' ? 'อัปโหลดรูปโปรไฟล์แล้ว' : 'Profile photo uploaded successfully',
                timer: 1500,
                showConfirmButton: false
            });

            // Update local profile state
            setProfile((prev: any) => ({ ...prev, avatar_url: publicUrl }));
        } catch (err: any) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: language === 'th' ? 'อัปโหลดล้มเหลว' : 'Upload Failed',
                text: err.message || 'เกิดข้อผิดพลาดในการอัปโหลด',
            });
        } finally {
            setUploadingAvatar(false);
        }
    };

    const handleSaveStatus = async () => {
        setSavingStatus(true);
        try {
            const result = await updateCustomStatusAction(customStatus || null);
            if (result.error) throw new Error(result.error);

            Swal.fire({
                icon: 'success',
                title: language === 'th' ? 'บันทึกสถานะแล้ว' : 'Status saved',
                timer: 1500,
                showConfirmButton: false
            });

            setProfile((prev: any) => ({ ...prev, custom_status: customStatus }));
            setIsEditingStatus(false);
        } catch (err: any) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: t.studentInfo.errorTitle,
                text: err.message,
            });
        } finally {
            setSavingStatus(false);
        }
    };

    const handleStartEdit = () => {
        setEditRank(gamingProfile?.current_rank || null);
        setEditLineupRole(gamingProfile?.lineup_role || null);
        setEditSecondaryRole(gamingProfile?.secondary_role || null);
        setEditTopHeroes(gamingProfile?.top_heroes || []);
        setEditExperienceBio(gamingProfile?.experience_bio || null);
        setEditNickname(gamingProfile?.nickname || null);
        setEditPhone(gamingProfile?.phone || null);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setHeroSearch('');
        setShowHeroDropdown(false);
    };

    const handleStartEditReg = () => {
        setEditFirstNameTh(registration?.first_name_th || '');
        setEditLastNameTh(registration?.last_name_th || '');
        setEditFirstNameEn(registration?.first_name_en || '');
        setEditLastNameEn(registration?.last_name_en || '');
        setEditStudentId(registration?.student_id || '');
        setEditGrade(registration?.grade || '');
        setEditOpenId(registration?.open_id || '');
        setEditInGameName(registration?.in_game_name || '');
        setIsEditingReg(true);
    };

    const handleCancelEditReg = () => {
        setIsEditingReg(false);
    };

    const handleSaveReg = async () => {
        if (!editFirstNameTh.trim() || !editLastNameTh.trim() || !editFirstNameEn.trim() || !editLastNameEn.trim() || !editStudentId.trim() || !editGrade.trim() || !editOpenId.trim() || !editInGameName.trim()) {
            Swal.fire({
                icon: 'warning',
                title: language === 'th' ? 'ข้อมูลไม่ครบถ้วน' : 'Incomplete Information',
                text: language === 'th' ? 'กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น' : 'Please fill in all required fields.',
            });
            return;
        }

        if (!/^[0-9]{5}$/.test(editStudentId.trim())) {
            Swal.fire({
                icon: 'warning',
                title: language === 'th' ? 'รหัสนักเรียนไม่ถูกต้อง' : 'Invalid Student ID',
                text: language === 'th' ? 'รหัสนักเรียนต้องเป็นตัวเลข 5 หลัก' : 'Student ID must be exactly 5 digits.',
            });
            return;
        }

        setSavingReg(true);
        try {
            const formData = new FormData();
            formData.append('firstNameTh', editFirstNameTh.trim());
            formData.append('lastNameTh', editLastNameTh.trim());
            formData.append('firstNameEn', editFirstNameEn.trim());
            formData.append('lastNameEn', editLastNameEn.trim());
            formData.append('studentId', editStudentId.trim());
            formData.append('grade', editGrade.trim());
            formData.append('openId', editOpenId.trim());
            formData.append('inGameName', editInGameName.trim());

            const result = await updateStudentRegistrationAction(formData);

            if (result.error) {
                Swal.fire({
                    icon: 'error',
                    title: t.studentInfo.errorTitle,
                    text: result.error,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: language === 'th' ? 'บันทึกข้อมูลสำเร็จ' : 'Save Success',
                    text: language === 'th' ? 'ส่งข้อมูลเพื่อรอการตรวจสอบอีกครั้ง' : 'Registration details updated and sent for verification.',
                    timer: 2000,
                    showConfirmButton: false
                });

                const updatedReg = await getStudentRegistrationStatus();
                if (updatedReg) {
                    setRegistration(updatedReg);
                }
                setIsEditingReg(false);
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: t.studentInfo.errorTitle,
                text: error.message,
            });
        } finally {
            setSavingReg(false);
        }
    };

    const handleLogout = async () => {
        Swal.fire({
            title: language === 'th' ? 'คุณต้องการออกจากระบบ?' : 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#374151',
            confirmButtonText: language === 'th' ? 'ออกจากระบบ' : 'Logout',
            cancelButtonText: language === 'th' ? 'ยกเลิก' : 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await logout();
                router.push('/login');
            }
        });
    };

    const handleSaveProfile = async () => {
        setSavingProfile(true);
        try {
            const formattedBio = serializeExperienceBio(experiences);
            const result = await updateGamingProfileAction({
                currentRank: editRank,
                lineupRole: editLineupRole,
                secondaryRole: editSecondaryRole,
                topHeroes: editTopHeroes,
                experienceBio: formattedBio,
                nickname: editNickname,
                phone: editPhone,
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

    const getRoleIcon = (roleKey: string) => {
        if (roleKey === 'dark_slayer') return '🛡️';
        if (roleKey === 'abyssal_dragon') return '🏹';
        if (roleKey === 'mid_lane') return '🔮';
        if (roleKey === 'jungle') return '⚔️';
        if (roleKey === 'support') return '💚';
        return '🔄';
    };

    const getRoleLabelShort = (roleKey: string) => {
        if (roleKey === 'dark_slayer') return 'DSL';
        if (roleKey === 'abyssal_dragon') return 'ADL';
        if (roleKey === 'mid_lane') return 'MID';
        if (roleKey === 'jungle') return 'JG';
        if (roleKey === 'support') return 'SUP';
        return 'SUB';
    };

    if (registration) {
        return (
            <div className="max-w-5xl mx-auto py-8 px-4 space-y-8 animate-fade-in">
                {/* Status Bar (Only if pending or rejected) */}
                {!isVerified && (
                    <div className={`p-4 rounded-2xl border flex items-center gap-3 ${registration.status === 'rejected' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-yellow-50 border-yellow-200 text-yellow-800'}`}>
                        <Icon name={registration.status === 'rejected' ? 'cancel' : 'pending'} className="text-2xl flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-sm font-bold">
                                {registration.status === 'rejected' 
                                    ? (language === 'th' ? 'ใบสมัครของคุณถูกปฏิเสธ' : 'Your registration was rejected')
                                    : (language === 'th' ? 'ใบสมัครของคุณกำลังอยู่ระหว่างการตรวจสอบ' : 'Your registration is pending verification')
                                }
                            </p>
                            {registration.screening_notes && (
                                <p className="text-xs mt-1 text-red-600 font-medium">
                                    <strong>{t.studentInfo.adminNoteLabel}</strong> {registration.screening_notes}
                                </p>
                            )}
                        </div>
                        {registration.status === 'rejected' && (
                            <button
                                onClick={handleResubmit}
                                disabled={submitting}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow cursor-pointer"
                            >
                                {submitting ? t.team.loading : (language === 'th' ? 'ส่งใบสมัครใหม่' : 'Resubmit')}
                            </button>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Column 1: Discord-style Profile Card */}
                    <div className="lg:col-span-1 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-fit">
                        {/* Profile Banner */}
                        <div className="h-28 bg-gradient-to-r from-uefa-dark via-blue-900 to-black relative">
                            {/* Overlay tag */}
                            <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/40 backdrop-blur-md text-[10px] text-white font-mono tracking-widest uppercase">
                                {profile?.role || 'Guest'}
                            </span>
                        </div>

                        {/* Avatar & Badges Layout Container */}
                        <div className="px-6 pb-6 relative">
                            {/* Avatar Overlapping Banner */}
                            <div className="relative w-20 h-20 -mt-10 mb-4 group">
                                <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-white shadow-md flex items-center justify-center p-0.5 relative">
                                    {uploadingAvatar ? (
                                        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                                            <Icon name="progress_activity" spin className="text-gray-400 text-lg" />
                                        </div>
                                    ) : profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Profile Avatar" className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xl">
                                            {registration.full_name?.substring(0, 1)}
                                        </div>
                                    )}

                                    {/* Upload Camera Overlay */}
                                    <label 
                                        htmlFor="avatar-upload-file" 
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity duration-200 rounded-full"
                                    >
                                        <Icon name="photo_camera" className="text-lg" />
                                    </label>
                                    <input 
                                        type="file" 
                                        id="avatar-upload-file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={handleAvatarUpload}
                                        disabled={uploadingAvatar}
                                    />
                                </div>

                                {/* Discord Status Dot representation */}
                                <span className={`absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full border-4 border-white flex-shrink-0 ${
                                    isVerified ? 'bg-green-500' : registration.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                                }`} title={
                                    isVerified ? 'Verified' : registration.status === 'rejected' ? 'Rejected' : 'Pending'
                                } />
                            </div>

                            {/* Name, Badges & Tags */}
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <h2 className="text-lg font-black text-uefa-dark truncate max-w-[200px]" title={registration.in_game_name || registration.full_name}>
                                        {registration.in_game_name || registration.full_name}
                                    </h2>
                                    
                                    {/* Badges */}
                                    <div className="flex items-center gap-1">
                                        {isVerified && (
                                            <span className="p-0.5 rounded bg-blue-100 text-blue-600" title="Verified Player">
                                                <Icon name="verified_user" className="text-xs" />
                                            </span>
                                        )}
                                        {profile?.role === 'captain' && (
                                            <span className="p-0.5 rounded bg-amber-100 text-amber-600" title="Team Captain">
                                                <Icon name="workspace_premium" className="text-xs" />
                                            </span>
                                        )}
                                        {profile?.role === 'admin' && (
                                            <span className="p-0.5 rounded bg-purple-100 text-purple-600" title="Tournament Admin">
                                                <Icon name="admin_panel_settings" className="text-xs" />
                                            </span>
                                        )}
                                        {gamingProfile?.lineup_role && (
                                            <span className="px-1 py-0.5 rounded bg-gray-100 text-gray-600 text-[9px] font-bold uppercase" title="Primary Lane">
                                                {getPositionImageUrl(gamingProfile.lineup_role) ? (
                                                    <img src={getPositionImageUrl(gamingProfile.lineup_role) || undefined} alt="" className="w-3.5 h-3.5 object-contain mr-1 inline-block align-middle" />
                                                ) : (
                                                    <span>{getRoleIcon(gamingProfile.lineup_role)} </span>
                                                )}
                                                <span className="align-middle">{getRoleLabelShort(gamingProfile.lineup_role)}</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 font-medium -mt-1">
                                    @{profile?.username || 'user'}
                                </p>
                            </div>

                            {/* Custom Status Message */}
                            <div className="mt-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                {isEditingStatus ? (
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="text"
                                            value={customStatus}
                                            onChange={(e) => setCustomStatus(e.target.value)}
                                            placeholder={language === 'th' ? 'ทำอะไรอยู่ตอนนี้...' : 'What is your status...'}
                                            className="flex-1 min-w-0 bg-white px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-cyan-aura outline-none"
                                            maxLength={50}
                                        />
                                        <button 
                                            onClick={handleSaveStatus}
                                            disabled={savingStatus}
                                            className="flex-shrink-0 p-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                                        >
                                            <Icon name="done" className="text-xs" />
                                        </button>
                                        <button 
                                            onClick={() => {
                                                setCustomStatus(profile?.custom_status || '');
                                                setIsEditingStatus(false);
                                            }}
                                            className="flex-shrink-0 p-1.5 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg transition-colors cursor-pointer"
                                        >
                                            <Icon name="close" className="text-xs" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center group/status">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-600 italic">
                                            <span>💬</span>
                                            <span className="truncate max-w-[180px]">
                                                {profile?.custom_status || (language === 'th' ? 'ไม่มีสถานะตั้งไว้' : 'No status set')}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => setIsEditingStatus(true)}
                                            className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600 transition-all cursor-pointer opacity-0 group-hover/status:opacity-100"
                                        >
                                            <Icon name="edit" className="text-xs" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <hr className="my-5 border-gray-100" />

                            {/* About Me Section */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                                        {language === 'th' ? 'แนะนำตัว / ประสบการณ์' : 'About Me / Experience'}
                                    </h4>
                                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed whitespace-pre-wrap">
                                        {gamingProfile?.experience_bio || (language === 'th' ? 'ไม่มีคำแนะนำตัวในขณะนี้' : 'No introduction provided yet.')}
                                    </p>
                                </div>

                                {isVerified && gamingProfile && (
                                    <>
                                        <hr className="border-gray-100" />
                                        
                                        <div>
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                                {language === 'th' ? 'ระดับปัจจุบัน & ตัวที่เล่นบ่อย' : 'Rank & Top Heroes'}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {gamingProfile.current_rank && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-bold">
                                                        {getRankImageUrl(gamingProfile.current_rank) ? (
                                                            <img src={getRankImageUrl(gamingProfile.current_rank) || undefined} alt="" className="w-4 h-4 object-contain mr-1" />
                                                        ) : (
                                                            <span className="mr-1">🏆</span>
                                                        )}
                                                        {gamingProfile.current_rank}
                                                    </span>
                                                )}
                                                {gamingProfile.top_heroes?.map((hero: string) => {
                                                    const heroObj = heroList.find(h => h.name === hero);
                                                    return (
                                                         <span key={hero} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                                                            {heroObj?.image_url ? (
                                                                <img src={heroObj.image_url} alt={hero} className="w-3.5 h-3.5 rounded-full object-cover border border-gray-200" />
                                                            ) : (
                                                                <span>🛡️</span>
                                                            )}
                                                            {hero}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Column 2 & 3: Tabs & Panels Container */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tab Switcher */}
                        <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200/50 shadow-inner gap-0.5 sm:gap-0">
                            <button
                                onClick={() => setActiveTab('reg')}
                                className={`flex-1 py-3 px-2 sm:px-4 rounded-xl font-display font-bold text-xs tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'reg' ? 'bg-uefa-dark text-white shadow-md' : 'text-gray-500 hover:text-uefa-dark hover:bg-gray-200/50'}`}
                                title={language === 'th' ? 'ข้อมูลนักเรียน' : 'Student Details'}
                            >
                                <Icon name="badge" className="text-base" />
                                <span className="hidden sm:inline">{language === 'th' ? 'ข้อมูลนักเรียน' : 'Student Details'}</span>
                            </button>
                            {isVerified && gamingProfile && (
                                <button
                                    onClick={() => setActiveTab('game')}
                                    className={`flex-1 py-3 px-2 sm:px-4 rounded-xl font-display font-bold text-xs tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'game' ? 'bg-uefa-dark text-white shadow-md' : 'text-gray-500 hover:text-uefa-dark hover:bg-gray-200/50'}`}
                                    title={language === 'th' ? 'ข้อมูลโปรไฟล์เกม' : 'Esports Profile'}
                                >
                                    <Icon name="sports_esports" className="text-base" />
                                    <span className="hidden sm:inline">{language === 'th' ? 'ข้อมูลโปรไฟล์เกม' : 'Esports Profile'}</span>
                                </button>
                            )}
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`flex-1 py-3 px-2 sm:px-4 rounded-xl font-display font-bold text-xs tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'settings' ? 'bg-uefa-dark text-white shadow-md' : 'text-gray-500 hover:text-uefa-dark hover:bg-gray-200/50'}`}
                                title={language === 'th' ? 'ความปลอดภัย & บัญชี' : 'Security & Settings'}
                            >
                                <Icon name="security" className="text-base" />
                                <span className="hidden sm:inline">{language === 'th' ? 'ความปลอดภัย & บัญชี' : 'Security & Settings'}</span>
                            </button>
                        </div>

                        {/* Tab Panel Content */}
                        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 border border-gray-100 space-y-6">
                            {activeTab === 'reg' && (
                                <>
                                    {isEditingReg ? (
                                        /* === Edit Registration Details === */
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-600">
                                                    <Icon name="badge" className="text-xl" />
                                                </div>
                                                <div>
                                                    <h3 className="font-display font-bold text-lg text-uefa-dark">
                                                        {language === 'th' ? 'แก้ไขข้อมูลนักเรียน' : 'Edit Student Details'}
                                                    </h3>
                                                    <p className="text-gray-500 text-xs mt-0.5">
                                                        {language === 'th' ? 'โปรดระบุข้อมูลที่ถูกต้องตามบันทึกทางราชการ' : 'Please provide details matching your official school record'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-3.5 bg-yellow-50 border border-yellow-100 rounded-2xl text-xs text-yellow-800 flex gap-2">
                                                <Icon name="warning" className="text-lg flex-shrink-0" />
                                                <p>
                                                    {language === 'th' 
                                                        ? 'คำเตือน: หากคุณแก้ไขข้อมูลการลงทะเบียน สถานะที่ได้รับการอนุมัติแล้วจะเปลี่ยนกลับเป็น "กำลังตรวจสอบ (Pending)" โดยอัตโนมัติ เพื่อให้แอดมินตรวจสอบความถูกต้องอีกครั้ง'
                                                        : 'Warning: Editing registration details will automatically reset your status to "Pending" for admin re-verification.'
                                                    }
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="block text-xs font-bold text-gray-700">{language === 'th' ? 'ชื่อ (ภาษาไทย)' : 'First Name (TH)'}</label>
                                                    <input
                                                        type="text"
                                                        value={editFirstNameTh}
                                                        onChange={(e) => setEditFirstNameTh(e.target.value)}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-aura focus:ring-4 focus:ring-cyan-aura/10 outline-none transition-all font-medium text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-xs font-bold text-gray-700">{language === 'th' ? 'นามสกุล (ภาษาไทย)' : 'Last Name (TH)'}</label>
                                                    <input
                                                        type="text"
                                                        value={editLastNameTh}
                                                        onChange={(e) => setEditLastNameTh(e.target.value)}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-aura focus:ring-4 focus:ring-cyan-aura/10 outline-none transition-all font-medium text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="block text-xs font-bold text-gray-700">{language === 'th' ? 'ชื่อ (ภาษาอังกฤษ)' : 'First Name (EN)'}</label>
                                                    <input
                                                        type="text"
                                                        value={editFirstNameEn}
                                                        onChange={(e) => setEditFirstNameEn(e.target.value)}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-aura focus:ring-4 focus:ring-cyan-aura/10 outline-none transition-all font-medium text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-xs font-bold text-gray-700">{language === 'th' ? 'นามสกุล (ภาษาอังกฤษ)' : 'Last Name (EN)'}</label>
                                                    <input
                                                        type="text"
                                                        value={editLastNameEn}
                                                        onChange={(e) => setEditLastNameEn(e.target.value)}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-aura focus:ring-4 focus:ring-cyan-aura/10 outline-none transition-all font-medium text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="block text-xs font-bold text-gray-700">{t.studentInfo.studentIdLabel}</label>
                                                    <input
                                                        type="text"
                                                        value={editStudentId}
                                                        onChange={(e) => setEditStudentId(e.target.value)}
                                                        maxLength={5}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-aura focus:ring-4 focus:ring-cyan-aura/10 outline-none transition-all font-medium text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-xs font-bold text-gray-700">{language === 'th' ? 'ระดับชั้น (เช่น ม.4/2)' : 'Grade (e.g. Grade 10/2)'}</label>
                                                    <input
                                                        type="text"
                                                        value={editGrade}
                                                        onChange={(e) => setEditGrade(e.target.value)}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-aura focus:ring-4 focus:ring-cyan-aura/10 outline-none transition-all font-medium text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="block text-xs font-bold text-gray-700">OpenID</label>
                                                    <input
                                                        type="text"
                                                        value={editOpenId}
                                                        onChange={(e) => setEditOpenId(e.target.value)}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-aura focus:ring-4 focus:ring-cyan-aura/10 outline-none transition-all font-medium text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-xs font-bold text-gray-700">{t.studentInfo.ignLabel}</label>
                                                    <input
                                                        type="text"
                                                        value={editInGameName}
                                                        onChange={(e) => setEditInGameName(e.target.value)}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-cyan-aura focus:ring-4 focus:ring-cyan-aura/10 outline-none transition-all font-medium text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex gap-3 pt-3 border-t border-gray-100">
                                                <button
                                                    onClick={handleCancelEditReg}
                                                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all text-sm cursor-pointer"
                                                >
                                                    {t.studentInfo.cancelBtn}
                                                </button>
                                                <button
                                                    onClick={handleSaveReg}
                                                    disabled={savingReg}
                                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                                                >
                                                    {savingReg ? (
                                                        <><Icon name="progress_activity" spin /> {t.team.loading}</>
                                                    ) : (
                                                        <><Icon name="save" /> {t.studentInfo.saveBtn}</>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* === Read Registration Details === */
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-600">
                                                        <Icon name="badge" className="text-xl" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-display font-bold text-lg text-uefa-dark">
                                                            {language === 'th' ? 'ข้อมูลลงทะเบียนเรียน' : 'Student Registration Details'}
                                                        </h3>
                                                        <p className="text-gray-500 text-xs mt-0.5">{t.studentInfo.interestThanks}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={handleStartEditReg}
                                                    className="px-2.5 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-xl text-xs font-bold text-gray-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                                    title={language === 'th' ? 'แก้ไขข้อมูล' : 'Edit Details'}
                                                >
                                                    <Icon name="edit" className="text-xs sm:text-[10px]" />
                                                    <span className="hidden sm:inline">{language === 'th' ? 'แก้ไขข้อมูล' : 'Edit Details'}</span>
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{t.studentInfo.fullNameLabel}</span>
                                                    <span className="text-sm text-uefa-dark font-black">{registration.full_name}</span>
                                                </div>
                                                <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{t.studentInfo.studentIdLabel}</span>
                                                    <span className="text-sm text-uefa-dark font-black">{registration.student_id}</span>
                                                </div>
                                                <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{t.studentInfo.ignLabel}</span>
                                                    <span className="text-sm text-uefa-dark font-black">{registration.in_game_name || '-'}</span>
                                                </div>
                                                <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{language === 'th' ? 'ระดับชั้น' : 'Class Grade'}</span>
                                                    <span className="text-sm text-uefa-dark font-black">{registration.grade || '-'}</span>
                                                </div>
                                                <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">OpenID</span>
                                                    <span className="text-sm text-uefa-dark font-mono font-black">{registration.open_id || '-'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {activeTab === 'game' && isVerified && gamingProfile && (
                                <>
                                    {isEditing ? (
                                        /* === Edit Gaming Profile === */
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600">
                                                    <Icon name="sports_esports" className="text-xl" />
                                                </div>
                                                <div>
                                                    <h3 className="font-display font-bold text-lg text-uefa-dark">
                                                        {language === 'th' ? 'แก้ไขโปรไฟล์เกม' : 'Edit Esports Profile'}
                                                    </h3>
                                                    <p className="text-gray-500 text-xs mt-0.5">{t.studentInfo.gamingProfileDesc}</p>
                                                </div>
                                            </div>

                                            {/* Rank */}
                                            <div className="space-y-1.5">
                                                <label className="block text-xs font-bold text-gray-700">{t.studentInfo.rankLabel}</label>
                                                <select
                                                    value={editRank || ''}
                                                    onChange={(e) => setEditRank(e.target.value || null)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none bg-white text-sm font-medium"
                                                >
                                                    <option value="">{t.studentInfo.rankPlaceholder}</option>
                                                    {ROV_RANKS.map(rank => (
                                                        <option key={rank} value={rank}>{rank}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Primary Role (Main) */}
                                            <div className="space-y-1.5">
                                                <label className="block text-xs font-bold text-gray-700">{t.studentInfo.mainRoleLabel}</label>
                                                <select
                                                    value={editLineupRole || ''}
                                                    onChange={(e) => setEditLineupRole(e.target.value || null)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none bg-white text-sm font-medium"
                                                >
                                                    <option value="">{t.studentInfo.rolePlaceholder}</option>
                                                    {ROLE_OPTIONS.map(role => (
                                                        <option key={role} value={role}>{getRoleName(role)}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Secondary Role */}
                                            <div className="space-y-1.5">
                                                <label className="block text-xs font-bold text-gray-700">{t.studentInfo.secondaryRoleLabel}</label>
                                                <select
                                                    value={editSecondaryRole || ''}
                                                    onChange={(e) => setEditSecondaryRole(e.target.value || null)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none bg-white text-sm font-medium"
                                                >
                                                    <option value="">{t.studentInfo.rolePlaceholder}</option>
                                                    {ROLE_OPTIONS.map(role => (
                                                        <option key={role} value={role}>{getRoleName(role)}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Top Heroes */}
                                            <div className="space-y-2">
                                                <label className="block text-xs font-bold text-gray-700">{t.studentInfo.topHeroesLabel}</label>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {editTopHeroes.map(hero => (
                                                        <span key={hero} className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold shadow-sm">
                                                            {hero}
                                                            <button onClick={() => handleRemoveHero(hero)} className="hover:text-red-500 transition-colors cursor-pointer">
                                                                <Icon name="close" className="text-[10px]" />
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
                                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none text-sm font-medium"
                                                        />
                                                        {showHeroDropdown && heroSearch.trim() && (
                                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
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
                                                                    <Icon name="add" className="text-xs" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Experience Bio */}
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <label className="block text-xs font-bold text-gray-700">
                                                        {language === 'th' ? 'ประสบการณ์การแข่งขัน' : 'Competition Experience'}
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() => setExperiences([...experiences, { id: Math.random().toString(), role: '', startYear: '', endYear: '' }])}
                                                        className="text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <Icon name="add" className="text-xs" />
                                                        {language === 'th' ? 'เพิ่มประสบการณ์' : 'Add Experience'}
                                                    </button>
                                                </div>
                                                
                                                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                                                    {experiences.map((exp, idx) => (
                                                        <div key={exp.id} className="flex gap-2 items-start bg-gray-50 p-3 rounded-xl border border-gray-100 relative group/exp">
                                                            <div className="flex-1 space-y-2">
                                                                {/* Role Input */}
                                                                <input
                                                                    type="text"
                                                                    value={exp.role}
                                                                    onChange={(e) => {
                                                                        const updated = [...experiences];
                                                                        updated[idx].role = e.target.value;
                                                                        setExperiences(updated);
                                                                    }}
                                                                    placeholder={language === 'th' ? 'บทบาท / รายการแข่งขัน (เช่น RoV SN Tournament Producer)' : 'Role / Tournament (e.g. RoV SN Tournament Producer)'}
                                                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none text-xs font-medium bg-white"
                                                                />
                                                                
                                                                {/* Years Inputs */}
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <input
                                                                        type="text"
                                                                        value={exp.startYear}
                                                                        onChange={(e) => {
                                                                            const updated = [...experiences];
                                                                            updated[idx].startYear = e.target.value;
                                                                            setExperiences(updated);
                                                                        }}
                                                                        placeholder={language === 'th' ? 'ปีเริ่มต้น (ค.ศ.) เช่น 2023' : 'Start Year (e.g. 2023)'}
                                                                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none text-xs font-medium bg-white"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={exp.endYear}
                                                                        onChange={(e) => {
                                                                            const updated = [...experiences];
                                                                            updated[idx].endYear = e.target.value;
                                                                            setExperiences(updated);
                                                                        }}
                                                                        placeholder={language === 'th' ? 'ปีสิ้นสุด (ค.ศ. - ไม่บังคับ)' : 'End Year (e.g. 2024 - Optional)'}
                                                                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none text-xs font-medium bg-white"
                                                                    />
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Remove Button */}
                                                            {experiences.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const updated = experiences.filter(item => item.id !== exp.id);
                                                                        setExperiences(updated);
                                                                    }}
                                                                    className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer self-start"
                                                                    title="Remove"
                                                                >
                                                                    <Icon name="delete" className="text-sm" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Personal Details (Nickname / Phone) */}
                                            <div className="border-t border-gray-100 pt-4 space-y-4">
                                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                                                    {language === 'th' ? 'ข้อมูลการติดต่อ' : 'Contact Info'}
                                                </h4>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="block text-xs font-bold text-gray-700">{t.team.playerNicknameLabel}</label>
                                                        <input
                                                            type="text"
                                                            value={editNickname || ''}
                                                            onChange={(e) => setEditNickname(e.target.value || null)}
                                                            placeholder={t.team.playerNicknamePlaceholder}
                                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none bg-white text-sm font-medium"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="block text-xs font-bold text-gray-700">{t.team.playerPhoneLabel}</label>
                                                        <input
                                                            type="text"
                                                            value={editPhone || ''}
                                                            onChange={(e) => setEditPhone(e.target.value || null)}
                                                            placeholder={t.team.playerPhonePlaceholder}
                                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none bg-white text-sm font-medium"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 pt-3 border-t border-gray-100">
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all text-sm cursor-pointer"
                                                >
                                                    {t.studentInfo.cancelBtn}
                                                </button>
                                                <button
                                                    onClick={handleSaveProfile}
                                                    disabled={savingProfile}
                                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 text-sm flex items-center justify-center gap-2 cursor-pointer"
                                                >
                                                    {savingProfile ? (
                                                        <><Icon name="progress_activity" spin /> {t.team.loading}</>
                                                    ) : (
                                                        <><Icon name="save" /> {t.studentInfo.saveBtn}</>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* === Read Gaming Profile === */
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600">
                                                        <Icon name="sports_esports" className="text-xl" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
                                                            {language === 'th' ? 'ข้อมูลโปรไฟล์เกม' : 'Esports Gaming Profile'}
                                                        </h3>
                                                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{t.studentInfo.gamingProfileDesc}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={handleStartEdit}
                                                    className="px-2.5 sm:px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-gray-300 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                                    title={t.studentInfo.editBtn}
                                                >
                                                    <Icon name="edit" className="text-xs sm:text-[10px]" />
                                                    <span className="hidden sm:inline">{t.studentInfo.editBtn}</span>
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-4 text-center border border-amber-100 dark:border-amber-900/30 shadow-sm">
                                                    <Icon name="emoji_events" className="text-amber-500 text-lg mb-1" />
                                                    <p className="text-[10px] uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400/80">{language === 'th' ? 'Rank' : 'Rank'}</p>
                                                    <p className="text-sm font-black text-amber-950 dark:text-amber-300 mt-0.5 truncate">{gamingProfile.current_rank || t.studentInfo.noData}</p>
                                                </div>
                                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl p-4 text-center border border-blue-100 dark:border-blue-900/30 shadow-sm">
                                                    <Icon name="my_location" className="text-blue-500 text-lg mb-1" />
                                                    <p className="text-[10px] uppercase tracking-wider font-bold text-blue-700 dark:text-blue-400/80">{language === 'th' ? 'หลัก' : 'Main'}</p>
                                                    <p className="text-sm font-black text-blue-950 dark:text-blue-300 mt-0.5 truncate">{getRoleName(gamingProfile.lineup_role)}</p>
                                                </div>
                                                <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 rounded-2xl p-4 text-center border border-purple-100 dark:border-purple-900/30 shadow-sm">
                                                    <Icon name="swap_horiz" className="text-purple-500 text-lg mb-1" />
                                                    <p className="text-[10px] uppercase tracking-wider font-bold text-purple-700 dark:text-purple-400/80">{language === 'th' ? 'รอง' : 'Sub'}</p>
                                                    <p className="text-sm font-black text-purple-950 dark:text-purple-300 mt-0.5 truncate">{getRoleName(gamingProfile.secondary_role)}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{t.team.playerNicknameLabel}</p>
                                                        <p className="text-sm font-black text-uefa-dark">{gamingProfile.nickname || '-'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{t.team.playerPhoneLabel}</p>
                                                        <p className="text-sm font-black text-uefa-dark">{gamingProfile.phone || '-'}</p>
                                                    </div>
                                                </div>

                                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">{t.studentInfo.topHeroesLabel}</p>
                                                    {gamingProfile.top_heroes && gamingProfile.top_heroes.length > 0 ? (
                                                        <div className="flex flex-wrap gap-2">
                                                            {gamingProfile.top_heroes.map((hero: string) => {
                                                                const heroObj = heroList.find(h => h.name === hero);
                                                                return (
                                                                    <span key={hero} className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-uefa-dark shadow-sm">
                                                                        {heroObj?.image_url ? (
                                                                            <img src={heroObj.image_url} alt={hero} className="w-4 h-4 rounded-full object-cover border border-gray-200 mr-1.5" />
                                                                        ) : (
                                                                            <span className="mr-1.5">🛡️</span>
                                                                        )}
                                                                        {hero}
                                                                    </span>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs text-gray-400 italic">{t.studentInfo.noData}</p>
                                                    )}
                                                </div>


                                            </div>

                                            {/* CTA: Go to Team */}
                                            <button
                                                onClick={() => router.push('/team')}
                                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black shadow-lg shadow-cyan-500/10 hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm cursor-pointer"
                                            >
                                                <Icon name="groups" />
                                                {t.studentInfo.goToTeamBtn}
                                                <Icon name="arrow_forward" className="text-xs ml-1" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}

                            {activeTab === 'settings' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                        <div className="w-10 h-10 bg-gray-500/10 rounded-xl flex items-center justify-center text-gray-600">
                                            <Icon name="security" className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-display font-bold text-lg text-uefa-dark">
                                                {language === 'th' ? 'การตั้งค่าบัญชี & ความปลอดภัย' : 'Account Security & Settings'}
                                            </h3>
                                            <p className="text-gray-500 text-xs mt-0.5">
                                                {language === 'th' ? 'จัดการความปลอดภัยและการเปิดใช้งานบัญชีของคุณ' : 'Manage your credentials and login options'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{language === 'th' ? 'อีเมลสำหรับติดต่อ' : 'Linked Email'}</p>
                                            <p className="text-sm font-black text-uefa-dark">{profile?.email || '-'}</p>
                                        </div>
                                        
                                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">{language === 'th' ? 'ระบบยืนยันตัวตน 2 ขั้นตอน (2FA OTP)' : 'Two-Factor Authentication (OTP)'}</p>
                                                <p className="text-xs text-gray-500">
                                                    {profile?.otp_enabled 
                                                        ? (language === 'th' ? 'เปิดใช้งานแล้วผ่านทางอีเมล' : 'Enabled via registered email address')
                                                        : (language === 'th' ? 'ไม่ได้เปิดใช้งาน' : 'Disabled')
                                                    }
                                                </p>
                                            </div>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${profile?.otp_enabled ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {profile?.otp_enabled ? (language === 'th' ? 'เปิดใช้งาน' : 'Enabled') : (language === 'th' ? 'ปิด' : 'Disabled')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Logout Button placed at the very bottom of Settings Card */}
                                    <div className="pt-6 border-t border-gray-100">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full py-4 rounded-2xl border-2 border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-black transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm cursor-pointer shadow-sm"
                                        >
                                            <Icon name="logout" />
                                            {language === 'th' ? 'ออกจากระบบบัญชี' : 'Logout from Account'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 max-w-md mx-auto my-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="warning" className="text-yellow-500 text-3xl" />
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

            <button
                onClick={handleLogout}
                className="w-full py-3.5 rounded-xl border border-red-200 hover:border-red-300 bg-red-50/50 hover:bg-red-50 text-red-600 hover:text-red-700 font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
                <Icon name="logout" />
                {language === 'th' ? 'ออกจากระบบ' : 'Logout'}
            </button>
        </div>
    );
}
