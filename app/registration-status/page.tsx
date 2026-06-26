'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { signOutAction } from '@/features/auth/actions';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function RegistrationStatusPage() {
    const { t } = useLanguage();
    const [status, setStatus] = useState<'pending' | 'verified' | 'rejected' | 'none'>('none');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('registration_status').eq('id', user.id).single();
                setStatus(data?.registration_status || 'none');
            }
            setLoading(false);
        };
        fetchStatus();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-uefa-dark p-8 text-center">
                    <h1 className="text-2xl font-display font-bold text-white tracking-widest uppercase">
                        Registration <span className="text-cyan-aura">Status</span>
                    </h1>
                </div>

                <div className="p-8 text-center">
                    {status === 'pending' && (
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-cyan-50 text-cyan-500 rounded-full flex items-center justify-center mx-auto text-4xl animate-pulse">
                                <i className="fas fa-clock"></i>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{t.regStatus.pendingTitle}</h2>
                            <p className="text-gray-500">
                                {t.regStatus.pendingDesc}
                            </p>
                            <div className="pt-4">
                                <form action={signOutAction}>
                                    <button type="submit" className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors">
                                        <i className="fas fa-sign-out-alt mr-2"></i> {t.regStatus.logout}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {status === 'rejected' && (
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-4xl">
                                <i className="fas fa-times-circle"></i>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{t.regStatus.rejectedTitle}</h2>
                            <p className="text-gray-500">
                                {t.regStatus.rejectedDesc}
                            </p>
                            <div className="flex flex-col gap-3 pt-4">
                                <Link href="/register" className="bg-uefa-dark text-white py-3 rounded-xl font-bold hover:bg-black transition-all">
                                    {t.regStatus.registerAgain}
                                </Link>
                                <form action={signOutAction}>
                                    <button type="submit" className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors">
                                        {t.regStatus.logout}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {status === 'verified' && (
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto text-4xl">
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{t.regStatus.verifiedTitle}</h2>
                            <p className="text-gray-500">
                                {t.regStatus.verifiedDesc}
                            </p>
                            <div className="pt-4">
                                <Link href="/team" className="block w-full bg-cyan-500 text-white py-3 rounded-xl font-bold hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-500/20">
                                    {t.regStatus.loginBtn}
                                </Link>
                            </div>
                        </div>
                    )}

                    {status === 'none' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800">{t.regStatus.notFoundTitle}</h2>
                            <Link href="/register" className="block w-full bg-uefa-dark text-white py-3 rounded-xl font-bold hover:bg-black transition-all">
                                {t.regStatus.goToRegister}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
