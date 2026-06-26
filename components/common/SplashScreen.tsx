'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
    const [showLoading, setShowLoading] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // 1. Check session storage to prevent repeated views
        const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
        if (hasSeenSplash === 'true') {
            return;
        }

        // 2. Make visible
        setShowLoading(true);

        // 3. Simulate loading completion after 1.6 seconds
        const loadTimer = setTimeout(() => {
            setIsExiting(true);
            
            // 4. Fully unmount after slide/fade out completes (450ms matching transition)
            const exitTimer = setTimeout(() => {
                setShowLoading(false);
                sessionStorage.setItem('hasSeenSplash', 'true');
            }, 450);
            
            return () => clearTimeout(exitTimer);
        }, 1600);

        return () => clearTimeout(loadTimer);
    }, []);

    if (!showLoading) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-[#0a1628] text-white flex flex-col items-center justify-center select-none transition-all duration-500 ease-in-out ${
                isExiting ? 'opacity-0 pointer-events-none scale-[1.02] blur-sm' : 'opacity-100'
            }`}
        >
            <div className="flex flex-col items-center gap-4">
                {/* Glowing pulsing RoV logo */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 animate-pulse select-none">
                    <Image
                        src="/images/logo/RoV-Logo.png"
                        alt="RoV Logo"
                        fill
                        priority
                        className="object-contain drop-shadow-[0_0_25px_rgba(21,200,255,0.75)]"
                    />
                </div>

                {/* Title */}
                <h1 className="font-display font-bold text-3xl md:text-4xl tracking-wider text-white select-none uppercase mt-6">
                    RoV SN <span className="text-cyan-aura">Tournament</span>
                </h1>

                {/* 4-Dot wave animation from Mangify */}
                <div className="flex gap-2.5 items-center justify-center mt-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-aura dot-wave-1" />
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-aura dot-wave-2" />
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-aura dot-wave-3" />
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-aura dot-wave-4" />
                </div>
            </div>
        </div>
    );
}
