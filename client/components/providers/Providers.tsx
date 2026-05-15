'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from './LanguageProvider';
import { AuthProvider } from './AuthProvider';
import { Toaster } from 'sonner';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <LanguageProvider>
            <AuthProvider>
                <Toaster position="top-right" richColors closeButton />
                {children}
            </AuthProvider>
        </LanguageProvider>
    );
}
