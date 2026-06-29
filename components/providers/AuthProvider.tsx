'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

// Type definitions
interface AuthUser {
    id: string;
    username: string;
    role: 'guest' | 'student' | 'player' | 'captain' | 'admin' | 'super_admin';
    isProfileComplete: boolean;
    registrationStatus: string;
    avatarUrl?: string | null;
}

interface LoginResult {
    success: boolean;
    error?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<LoginResult>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper: map Supabase User + Profile → AuthUser
function toAuthUser(user: User, profile: any): AuthUser {
    return {
        id: user.id,
        username: profile?.username || user.email || user.id,
        role: profile?.role || 'guest',
        isProfileComplete: !!profile?.is_profile_complete,
        registrationStatus: profile?.registration_status || 'none',
        avatarUrl: profile?.avatar_url || null,
    };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const supabaseRef = useRef(createClient());
    const supabase = supabaseRef.current;

    // Check authentication status via Supabase session
    const checkAuth = useCallback(async () => {
        try {
            setLoading(true);

            const { data: { user: sbUser } } = await supabase.auth.getUser();

            if (!sbUser) {
                setUser(null);
                return;
            }

            // Fetch profile data
            const { data: profile } = await supabase
                .from('profiles')
                .select('username, role, is_profile_complete, registration_status, avatar_url')
                .eq('id', sbUser.id)
                .maybeSingle();

            setUser(toAuthUser(sbUser, profile));
        } catch (error) {
            console.error('[AuthProvider] Auth check error:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Run auth check on mount and listen for auth state changes
    useEffect(() => {
        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT' || !session?.user) {
                setUser(null);
                return;
            }

            // Fetch profile for the signed-in user
            const { data: profile } = await supabase
                .from('profiles')
                .select('username, role, is_profile_complete, registration_status, avatar_url')
                .eq('id', session.user.id)
                .maybeSingle();

            setUser(toAuthUser(session.user, profile));
        });

        return () => subscription.unsubscribe();
    }, [checkAuth]);

    // Login function — uses Supabase Auth (email/password)
    const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return { success: false, error: error.message };
            }

            if (!data.user) {
                return { success: false, error: 'Login failed' };
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('username, role, is_profile_complete, registration_status, avatar_url')
                .eq('id', data.user.id)
                .maybeSingle();

            setUser(toAuthUser(data.user, profile));
            return { success: true };
        } catch (error: any) {
            console.error('Login error:', error);
            return { success: false, error: error.message || 'Network error occurred' };
        } finally {
            setLoading(false);
        }
    }, []);

    // Logout function
    const logout = useCallback(async () => {
        try {
            setLoading(true);
            await supabase.auth.signOut();
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const value: AuthContextType = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export type { AuthUser, AuthContextType };
