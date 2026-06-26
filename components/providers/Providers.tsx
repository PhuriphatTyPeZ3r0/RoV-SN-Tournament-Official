'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from './LanguageProvider';
import { AuthProvider } from './AuthProvider';
import { Toaster } from 'sonner';
import SplashScreen from '@/components/common/SplashScreen';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <LanguageProvider>
            <AuthProvider>
                <Toaster position="top-right" richColors closeButton />
                <SplashScreen />
                {children}
            </AuthProvider>
        </LanguageProvider>
    );
}
