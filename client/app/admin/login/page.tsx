'use client';

import { useState, useActionState } from 'react';
import Image from 'next/image';
import { loginAdminAction } from '@/features/auth/admin-actions';

export default function AdminLoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await loginAdminAction(formData);
        
        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-uefa-dark via-deep-space to-uefa-dark flex items-center justify-center p-4">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2315C8FF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-block relative">
                        <Image
                            src="/images/logo/RoV-Logo.png"
                            alt="RoV SN Tournament"
                            width={100}
                            height={100}
                            className="h-24 w-auto mx-auto drop-shadow-[0_0_20px_rgba(21,200,255,0.5)]"
                        />
                        <div className="absolute inset-0 bg-cyan-aura mix-blend-overlay opacity-30 blur-xl"></div>
                    </div>
                    <h1 className="text-white font-display text-2xl font-bold mt-4 tracking-wider uppercase">
                        Tournament <span className="text-cyan-aura">Command Center</span>
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Secure Administrator Access</p>
                </div>

                <div className="bg-uefa-dark/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">
                                <i className="fas fa-envelope mr-2 text-cyan-aura"></i>
                                Admin Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                placeholder="admin@rov-sn.com"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">
                                <i className="fas fa-lock mr-2 text-cyan-aura"></i>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-aura focus:ring-1 focus:ring-cyan-aura outline-none transition-all"
                                placeholder="••••••••"
                                required
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-red-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-shield-alt"></i>
                                    Secure Login
                                </>
                            )}
                        </button>
                    </form>
                </div>
                
                <div className="text-center mt-6">
                    <a
                        href="/"
                        className="text-gray-400 hover:text-cyan-aura transition-colors text-sm"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Public Site
                    </a>
                </div>
            </div>
        </div>
    );
}
