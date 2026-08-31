'use client';

import Icon from '@/components/common/Icon';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { completeOnboardingAction } from '@/features/auth/student-actions';
import { useLanguage } from '@/components/providers/LanguageProvider';
import Button from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { compressImage } from '@/utils/image-compression';

const GRADES = [
    '1/1', '1/2', '1/3', '1/4',
    '2/1', '2/2', '2/3', '2/4',
    '3/1', '3/2', '3/3', '3/4',
    '4/1', '4/2', '4/3', '4/4',
    '5/1', '5/2', '5/4',
    '6/1', '6/2', '6/3'
];

export default function OnboardingPage() {
    const { t, language, changeLanguage } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [docFile, setDocFile] = useState<File | null>(null);
    const [docPreview, setDocPreview] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const supabase = createClient();
                const { data: { user }, error: authError } = await supabase.auth.getUser();
                
                if (authError) throw authError;

                if (user) {
                    setUser(user);
                    const { data, error: profileError } = await supabase
                        .from('tbl_usr_profiles')
                        .select('*')
                        .eq('id', user.id)
                        .maybeSingle();
                    
                    if (profileError) console.error('Profile fetch error:', profileError);
                    if (data) setProfile(data);
                }
            } catch (err: any) {
                console.error('Onboarding fetch error:', err);
                setError(err.message || 'Failed to load user information');
            } finally {
                setInitialLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError(language === 'th' ? 'ขนาดไฟล์ห้ามเกิน 5MB' : 'File size must not exceed 5MB');
            e.target.value = '';
            return;
        }

        setError(null);
        setDocFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setDocPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!docFile) {
            setError(language === 'th' ? 'กรุณาอัปโหลดรูปภาพหลักฐานแสดงตัวตน' : 'Please upload an identity verification photo');
            return;
        }

        setLoading(true);

        const formData = new FormData(e.currentTarget);

        let uploadPayload: File = docFile;
        if (docFile.type.startsWith('image/') && docFile.type !== 'image/gif') {
            try {
                const compressed = await compressImage(docFile);
                uploadPayload = new File([compressed], `${docFile.name.replace(/\.[^/.]+$/, '')}.jpg`, { type: 'image/jpeg' });
            } catch (compressionErr) {
                console.warn('Compression failed, uploading original:', compressionErr);
            }
        }
        formData.set('verificationDoc', uploadPayload, uploadPayload.name);

        const result = await completeOnboardingAction(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    };

    if (initialLoading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"></div>
        </div>
    );

    return (
        <div className="max-w-2xl w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-gray-100 relative">
            {/* Language Toggle */}
            <div className="absolute top-4 right-4 z-10">
                <Button
                    variant="ghost"
                    onClick={() => changeLanguage(language === 'th' ? 'en' : 'th')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20"
                >
                    <Image
                        src={language === 'th' ? "https://flagcdn.com/w40/th.png" : "https://flagcdn.com/w40/gb.png"}
                        alt={language}
                        width={20}
                        height={15}
                        className="w-5 h-auto rounded shadow-sm"
                        unoptimized
                    />
                    <span className="text-white text-xs font-bold uppercase">{language}</span>
                </Button>
            </div>

            {/* Header */}
            <div className="bg-uefa-dark p-8 text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-display font-bold text-white tracking-widest uppercase">
                        {t.register.onboardingTitleNormal}<span className="text-cyan-aura">{t.register.onboardingTitleHighlight}</span>
                    </h1>
                    <p className="text-gray-300 mt-2 font-medium">
                        {t.register.onboardingSubtitle}
                    </p>
                </div>
            </div>

            <div className="p-8">
                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-3">
                        <Icon name="error" className="text-lg" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.email} (Google)</label>
                        <Input
                            type="email"
                            value={user?.email || ''}
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed focus-visible:ring-0 focus-visible:ring-offset-0"
                            disabled
                            readOnly
                        />
                    </div>

                    {/* Thai Name Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.firstNameTh}</label>
                            <Input
                                type="text"
                                name="firstNameTh"
                                defaultValue={profile?.first_name_th || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus-visible:ring-cyan-aura focus-visible:ring-offset-0 focus:border-cyan-aura"
                                placeholder={t.register.placeholderNameTh}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.lastNameTh}</label>
                            <Input
                                type="text"
                                name="lastNameTh"
                                defaultValue={profile?.last_name_th || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus-visible:ring-cyan-aura focus-visible:ring-offset-0 focus:border-cyan-aura"
                                placeholder={t.register.placeholderLastNameTh}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* English Name Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.firstNameEn}</label>
                            <Input
                                type="text"
                                name="firstNameEn"
                                defaultValue={profile?.first_name_en || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus-visible:ring-cyan-aura focus-visible:ring-offset-0 focus:border-cyan-aura"
                                placeholder="Somchai"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.lastNameEn}</label>
                            <Input
                                type="text"
                                name="lastNameEn"
                                defaultValue={profile?.last_name_en || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus-visible:ring-cyan-aura focus-visible:ring-offset-0 focus:border-cyan-aura"
                                placeholder="Jaidee"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Student Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.studentId}</label>
                            <Input
                                type="text"
                                name="studentId"
                                pattern="[0-9]{5}"
                                defaultValue={profile?.student_id || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus-visible:ring-cyan-aura focus-visible:ring-offset-0 focus:border-cyan-aura"
                                placeholder="12345"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.grade}</label>
                            <Select
                                name="grade"
                                defaultValue={profile?.class_grade || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus-visible:ring-cyan-aura focus-visible:ring-offset-0 focus:border-cyan-aura"
                                required
                                disabled={loading}
                            >
                                <option value="">{t.register.selectGrade}</option>
                                {GRADES.map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    {/* Game Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.openId}</label>
                            <Input
                                type="text"
                                name="openId"
                                defaultValue={profile?.open_id || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus-visible:ring-cyan-aura focus-visible:ring-offset-0 focus:border-cyan-aura"
                                placeholder="OpenID"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.inGameName}</label>
                            <Input
                                type="text"
                                name="inGameName"
                                defaultValue={profile?.in_game_name || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus-visible:ring-cyan-aura focus-visible:ring-offset-0 focus:border-cyan-aura"
                                placeholder="ProPlayer_RoV"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Identity Verification Document */}
                    <div className="border-t border-gray-100 pt-4">
                        <label className="block text-gray-700 text-sm mb-2 font-medium">
                            {language === 'th' ? 'รูปภาพหลักฐานแสดงตัวตน' : 'Identity Verification Photo'}
                            <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative flex-shrink-0">
                                {docPreview ? (
                                    <img src={docPreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <Icon name="badge" className="text-2xl text-gray-300" />
                                )}
                            </div>
                            <div className="flex-1 space-y-2">
                                <input
                                    type="file"
                                    name="verificationDoc"
                                    accept="image/*"
                                    onChange={handleDocChange}
                                    id="verification-doc-upload"
                                    className="hidden"
                                    disabled={loading}
                                />
                                <label
                                    htmlFor="verification-doc-upload"
                                    className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-uefa-dark font-bold text-sm rounded-lg cursor-pointer transition-colors"
                                >
                                    <Icon name="upload" className="mr-2" />
                                    {docFile ? (language === 'th' ? 'เปลี่ยนรูปภาพ' : 'Change Image') : (language === 'th' ? 'เลือกรูปภาพ' : 'Choose Image')}
                                </label>
                                <p className="text-[10px] text-gray-400">
                                    {language === 'th' ? 'บัตรนักเรียนหรือบัตรประชาชน — JPG, PNG ไม่เกิน 5MB' : 'Student or national ID card — JPG, PNG, up to 5MB'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 py-2 border-t border-gray-100 mt-4 pt-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="applyForAdmin" 
                                name="applyForAdmin" 
                                className="w-4 h-4 text-uefa-dark rounded border-gray-300 focus:ring-uefa-dark"
                            />
                            <label htmlFor="applyForAdmin" className="text-sm font-bold text-uefa-dark">
                                {t.register.applyAdmin}
                            </label>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-uefa-dark to-black text-white font-black py-4 rounded-xl shadow-lg hover:shadow-cyan-aura/20 active:scale-95 flex items-center justify-center gap-3 text-lg"
                        >
                            {loading ? (
                                <><Icon name="progress_activity" spin /> {t.register.processing}</>
                            ) : (
                                <><Icon name="check_circle" /> {t.register.submit}</>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
