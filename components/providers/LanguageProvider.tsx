'use client';

import { ReactNode, createContext, useContext, useState, useCallback, useEffect } from 'react';
import th from './locales/th.json';
import en from './locales/en.json';

// Language translations configuration
const translations = { th, en };

type Language = 'th' | 'en';
type Translations = typeof translations.th;

interface LanguageContextType {
    language: Language;
    t: Translations;
    changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Always start with 'th' for SSR consistency
    const [language, setLanguage] = useState<Language>('th');
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Load saved language preference only on client after hydration
        const saved = localStorage.getItem('language') as Language;
        if (saved && (saved === 'th' || saved === 'en')) {
            setLanguage(saved);
        }
        // Mark as hydrated AFTER setting language
        setIsHydrated(true);
    }, []);

    const changeLanguage = useCallback((lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    }, []);

    // IMPORTANT: Always use 'th' translations until hydrated to prevent mismatch
    const effectiveLanguage = isHydrated ? language : 'th';

    const value: LanguageContextType = {
        language: effectiveLanguage,
        t: translations[effectiveLanguage],
        changeLanguage,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export { translations };
export type { Language, Translations };
