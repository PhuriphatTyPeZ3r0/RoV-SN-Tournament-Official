'use client';

import Icon from '@/components/common/Icon';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { verifyOTPAction, sendOTPAction } from '@/features/auth/student-actions';

function VerifyOTPContent() {
    const searchParams = useSearchParams();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [devOtp, setDevOtp] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Auto focus first field on load
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    useEffect(() => {
        // Fetch current profile in development to get OTP code if email failed
        const checkDevOtp = async () => {
            if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
                const { createClient } = await import('@/utils/supabase/client');
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('otp_code')
                        .eq('id', user.id)
                        .single();
                    if (profile?.otp_code) {
                        setDevOtp(profile.otp_code);
                    }
                }
            }
        };
        checkDevOtp();
    }, [message]); // Refetch when message updates (e.g. resend)

    const handleFillDevOtp = () => {
        if (devOtp && devOtp.length === 6) {
            setOtp(devOtp.split(''));
        }
    };

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Auto-focus next field
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').substring(0, 6);
        if (pastedData) {
            const newOtp = [...otp];
            pastedData.split('').forEach((char, i) => {
                if (i < 6) newOtp[i] = char;
            });
            setOtp(newOtp);
            // Focus last filled or next empty
            const nextIndex = Math.min(pastedData.length, 5);
            inputRefs.current[nextIndex]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length !== 6) return;

        setLoading(true);
        setError(null);

        const result = await verifyOTPAction(otpString);
        
        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            // Success
            const nextPath = searchParams.get('next') || '/team';
            window.location.href = nextPath;
        }
    };

    const handleResend = async () => {
        setLoading(true);
        const result = await sendOTPAction();
        if (result.error) {
            setError(result.error);
        } else {
            setMessage(result.message || 'OTP has been resent to your email');
        }
        setLoading(false);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full mx-auto mt-20">
            <div className="bg-uefa-dark p-6 text-center">
                <h1 className="text-white font-display text-2xl font-bold tracking-wider uppercase">
                    Two-Factor <span className="text-cyan-aura">Authentication</span>
                </h1>
                <p className="text-gray-300 mt-2 text-sm">Please enter the 6-digit code sent to your email</p>
            </div>
            
            <div className="p-8 text-center">
                {devOtp && (
                    <div 
                        onClick={handleFillDevOtp}
                        className="bg-amber-50/85 border border-amber-200/60 rounded-2xl p-4 mb-6 text-center backdrop-blur-sm cursor-pointer hover:bg-amber-100/80 transition-all select-none group"
                    >
                        <p className="text-amber-800 font-bold text-xs uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                            🛠️ Sandbox Fallback <span className="text-[10px] text-amber-600 font-normal group-hover:underline">(Click to fill)</span>
                        </p>
                        <p className="text-gray-600 text-xs mb-2">
                            Email delivery is restricted in development. Use code:
                        </p>
                        <p className="text-amber-950 text-3xl font-black tracking-widest font-mono group-hover:scale-105 transition-all">
                            {devOtp}
                        </p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 border border-red-100 flex items-center gap-2 justify-center">
                        <Icon name="error" />
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm mb-6 border border-green-100 flex items-center gap-2 justify-center">
                        <Icon name="check_circle" />
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex justify-between gap-2 max-w-xs mx-auto">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-14 bg-gray-50 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold text-gray-800 focus:border-cyan-aura focus:ring-4 focus:ring-cyan-aura/10 outline-none transition-all"
                                required
                                disabled={loading}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.join('').length !== 6}
                        className="w-full bg-uefa-dark text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-uefa-dark/90 hover:shadow-cyan-aura/10 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <><Icon name="progress_activity" spin /> Verifying...</>
                        ) : (
                            'Verify & Continue'
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Didn't receive the code?{' '}
                        <button 
                            onClick={handleResend}
                            className="text-cyan-600 font-bold hover:underline disabled:opacity-50 cursor-pointer"
                            disabled={loading}
                        >
                            Resend Code
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function VerifyOTPPage() {
    return (
        <Suspense fallback={<div className="flex justify-center mt-20"><Icon name="progress_activity" spin className="text-4xl text-cyan-aura" /></div>}>
            <VerifyOTPContent />
        </Suspense>
    );
}
