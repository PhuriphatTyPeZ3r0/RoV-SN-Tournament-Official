'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ColorMode = 'light' | 'dark';

interface ThemeModeContextValue {
    mode: ColorMode;
    toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue>({
    mode: 'dark',
    toggleMode: () => {},
});

export function useThemeMode() {
    return useContext(ThemeModeContext);
}

interface ThemeModeProviderProps {
    children: ReactNode;
}

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
    const [mode, setMode] = useState<ColorMode>('dark');
    const [mounted, setMounted] = useState(false);

    // On mount: load from localStorage, fallback to 'dark'
    useEffect(() => {
        const stored = localStorage.getItem('rov-color-mode') as ColorMode | null;
        const preferred = stored ?? 'dark';
        setMode(preferred);
        document.documentElement.setAttribute('data-mode', preferred);
        setMounted(true);
    }, []);

    const toggleMode = () => {
        setMode((prev) => {
            const next: ColorMode = prev === 'dark' ? 'light' : 'dark';
            localStorage.setItem('rov-color-mode', next);
            document.documentElement.setAttribute('data-mode', next);
            return next;
        });
    };

    // Avoid hydration mismatch — render nothing until mounted
    if (!mounted) return <>{children}</>;

    return (
        <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ThemeModeContext.Provider>
    );
}
