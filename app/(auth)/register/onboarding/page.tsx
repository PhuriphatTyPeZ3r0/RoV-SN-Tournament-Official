'use client';

import Icon from '@/components/common/Icon';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { completeOnboardingAction } from '@/features/auth/student-actions';
import { useLanguage } from '@/components/providers/LanguageProvider';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const supabase = createClient();
                const { data: { user }, error: authError } = await supabase.auth.getUser();
                
                if (authError) throw authError;

                if (user) {
                    setUser(user);
                    const { data, error: profileError } = await supabase
                        .from('profiles')
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const formData = new FormData(e.currentTarget);
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
                <button
                    onClick={() => changeLanguage(language === 'th' ? 'en' : 'th')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all group cursor-pointer"
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
                </button>
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
                        <input
                            type="email"
                            value={user?.email || ''}
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed outline-none"
                            disabled
                            readOnly
                        />
                    </div>

                    {/* Thai Name Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.firstNameTh}</label>
                            <input
                                type="text"
                                name="firstNameTh"
                                defaultValue={profile?.first_name_th || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                placeholder={t.register.placeholderNameTh}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.lastNameTh}</label>
                            <input
                                type="text"
                                name="lastNameTh"
                                defaultValue={profile?.last_name_th || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
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
                            <input
                                type="text"
                                name="firstNameEn"
                                defaultValue={profile?.first_name_en || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                placeholder="Somchai"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.lastNameEn}</label>
                            <input
                                type="text"
                                name="lastNameEn"
                                defaultValue={profile?.last_name_en || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
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
                            <input
                                type="text"
                                name="studentId"
                                pattern="[0-9]{5}"
                                defaultValue={profile?.student_id || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                placeholder="12345"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.grade}</label>
                            <select
                                name="grade"
                                defaultValue={profile?.class_grade || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                required
                                disabled={loading}
                            >
                                <option value="">{t.register.selectGrade}</option>
                                {GRADES.map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Game Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.openId}</label>
                            <input
                                type="text"
                                name="openId"
                                defaultValue={profile?.open_id || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                placeholder="OpenID"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.inGameName}</label>
                            <input
                                type="text"
                                name="inGameName"
                                defaultValue={profile?.in_game_name || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                placeholder="ProPlayer_RoV"
                                required
                                disabled={loading}
                            />
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
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-uefa-dark to-black text-white font-black py-4 rounded-xl shadow-lg hover:shadow-cyan-aura/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
                        >
                            {loading ? (
                                <><Icon name="progress_activity" spin /> {t.register.processing}</>
                            ) : (
                                <><Icon name="check_circle" /> {t.register.submit}</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
