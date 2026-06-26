'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { loginStudentAction } from '@/features/auth/student-actions';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function StudentLoginPage() {
    const { t } = useLanguage();
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

        const formData = new FormData(e.currentTarget);
        const result = await loginStudentAction(formData);
        
        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else if (result?.success) {
            // Check if OTP verification is needed
            if (result.nextStep === 'verify-otp') {
                const params = new URLSearchParams();
                if (result.isFirstLogin) params.set('firstLogin', 'true');
                window.location.href = `/auth/verify-otp?${params.toString()}`;
            } else {
                window.location.href = '/team';
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full mx-auto">
            <div className="bg-uefa-dark p-6 text-center">
                <h1 className="text-white font-display text-2xl font-bold tracking-wider uppercase">
                    {t.loginPage.titleNormal}<span className="text-cyan-aura">{t.loginPage.titleHighlight}</span>
                </h1>
                <p className="text-gray-300 mt-2 text-sm">{t.loginPage.subtitle}</p>
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
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all mb-6 disabled:opacity-50"
                >
                    <img src="/images/icons/google.svg" className="w-5 h-5" alt="Google" />
                    {t.loginPage.googleBtn}
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-400 font-medium uppercase">{t.loginPage.orEmail}</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm mb-2 font-medium">{t.loginPage.emailLabel}</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                            placeholder="student@school.edu"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm mb-2 font-medium">{t.loginPage.passwordLabel}</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-uefa-dark text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-uefa-dark/90 hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? (
                            <><i className="fas fa-spinner fa-spin"></i> {t.loginPage.signingIn}</>
                        ) : (
                            t.loginPage.signInBtn
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    {t.loginPage.dontHaveAccount}{' '}
                    <Link href="/register" className="text-cyan-600 font-bold hover:underline">
                        {t.loginPage.registerHere}
                    </Link>
                </p>
            </div>
        </div>
    );
}
