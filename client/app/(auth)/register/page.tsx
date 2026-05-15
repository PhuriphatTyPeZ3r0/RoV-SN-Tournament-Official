'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { registerStudentAction } from '@/features/auth/student-actions';
import { useLanguage } from '@/components/providers/LanguageProvider';

const GRADES = [
    '1/1', '1/2', '1/3', '1/4',
    '2/1', '2/2', '2/3', '2/4',
    '3/1', '3/2', '3/3', '3/4',
    '4/1', '4/2', '4/3', '4/4',
    '5/1', '5/2', '5/4',
    '6/1', '6/2', '6/3'
];

export default function StudentRegisterPage() {
    const { t, language, changeLanguage } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleOAuthLogin = async () => {
        setLoading(true);
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        
        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const form = new FormData(e.currentTarget);
        
        // Validate Password match
        const password = form.get('password') as string;
        const confirmPassword = form.get('confirmPassword') as string;
        
        if (password !== confirmPassword) {
            setError(language === 'th' ? 'รหัสผ่านไม่ตรงกัน' : 'Passwords do not match');
            setLoading(false);
            return;
        }

        const result = await registerStudentAction(form);
        
        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl w-full mx-auto my-8 relative">
            {/* Language Toggle */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={() => changeLanguage(language === 'th' ? 'en' : 'th')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all group"
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

            <div className="bg-uefa-dark p-6 text-center">
                <h1 className="text-white font-display text-2xl font-bold tracking-wider uppercase">
                    {t.register.title.split(' ')[0]} <span className="text-cyan-aura">{t.register.title.split(' ')[1] || ''}</span>
                </h1>
                <p className="text-gray-300 mt-2 text-sm">{t.register.subtitle}</p>
            </div>
            
            <div className="p-8">
                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 border border-red-100 flex items-center gap-2">
                        <i className="fas fa-exclamation-circle"></i>
                        {error}
                    </div>
                )}

                {/* Google Login Button */}
                <button 
                    onClick={handleOAuthLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 mb-6"
                >
                    <img src="/images/icons/google.svg" className="w-5 h-5" alt="Google" />
                    {language === 'th' ? 'สมัครสมาชิกด้วย Google' : 'Sign up with Google'}
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-400 font-medium uppercase">
                        {language === 'th' ? 'หรือสมัครด้วยอีเมล' : 'Or sign up with email'}
                    </span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Thai Name Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.firstNameTh}</label>
                            <input
                                type="text"
                                name="firstNameTh"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                placeholder="สมชาย"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.lastNameTh}</label>
                            <input
                                type="text"
                                name="lastNameTh"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                placeholder="ใจดี"
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
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
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
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
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
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                placeholder="12345"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.grade}</label>
                            <select
                                name="grade"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                required
                                disabled={loading}
                            >
                                <option value="">-- Select Grade --</option>
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
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
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
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                placeholder="ProPlayer_RoV"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Account Section */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.email}</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                placeholder="student@school.edu"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.password}</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm mb-2 font-medium">{t.register.confirmPassword}</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Flags Section */}
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
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="privacyFlag" 
                                name="privacyFlag" 
                                className="w-4 h-4 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500"
                            />
                            <label htmlFor="privacyFlag" className="text-sm text-gray-600">
                                {t.register.privacy}
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-uefa-dark text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-uefa-dark/90 hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? (
                            <><i className="fas fa-spinner fa-spin"></i> {t.register.processing}</>
                        ) : (
                            t.register.submit
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    {t.register.alreadyHaveAccount}{' '}
                    <Link href="/login" className="text-cyan-600 font-bold hover:underline">
                        {t.register.loginHere}
                    </Link>
                </p>
            </div>
        </div>
    );
}
