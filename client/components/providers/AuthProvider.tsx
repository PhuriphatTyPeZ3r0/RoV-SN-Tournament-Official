'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

// Type definitions
interface AuthUser {
    id: string;
    username: string;
    role: 'admin' | 'user';
}

interface LoginResult {
    success: boolean;
    error?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<LoginResult>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper: map Supabase User → AuthUser
function toAuthUser(user: User, role: string): AuthUser {
    return {
        id: user.id,
        username: user.email || user.id,
        role: role === 'admin' ? 'admin' : 'user',
    };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    // Check authentication status via Supabase session
    const checkAuth = useCallback(async () => {
        try {
            setLoading(true);

            const { data: { user: sbUser } } = await supabase.auth.getUser();

            if (!sbUser) {
                setUser(null);
                return;
            }

            // Fetch role from profiles table
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', sbUser.id)
                .maybeSingle();

            setUser(toAuthUser(sbUser, profile?.role || 'user'));
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

            // Fetch role for the signed-in user
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .maybeSingle();

            setUser(toAuthUser(session.user, profile?.role || 'user'));
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

            // Fetch role
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', data.user.id)
                .maybeSingle();

            setUser(toAuthUser(data.user, profile?.role || 'user'));
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
