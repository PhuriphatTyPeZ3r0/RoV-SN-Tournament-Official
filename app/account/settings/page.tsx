'use client';

import Icon from '@/components/common/Icon';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { updateAccountSettingsAction } from '@/features/auth/profile-actions';
import { signOutAction } from '@/features/auth/actions';
import Link from 'next/link';

export default function UserSettingsPage() {
    const [profile, setProfile] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                setProfile(data);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUpdating(true);
        const form = new FormData(e.currentTarget);
        const result = await updateAccountSettingsAction(form);
        if (result.success) setMessage('Settings updated successfully');
        setUpdating(false);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-uefa-dark p-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/account/profile" className="text-white/60 hover:text-white">
                            <Icon name="chevron_left" />
                        </Link>
                        <h1 className="text-2xl font-display font-bold text-white uppercase">Account <span className="text-cyan-aura">Settings</span></h1>
                    </div>
                </div>

                <div className="p-8">
                    {message && <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-6">{message}</div>}
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-uefa-dark font-bold text-sm uppercase tracking-wider">Email & Security</h3>
                            <div>
                                <label className="block text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Email Address</label>
                                <input name="email" type="email" defaultValue={user?.email || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-aura/20 focus:border-cyan-aura transition-all" />
                                <p className="text-[10px] text-gray-400 mt-2 italic">* Changing email requires verification</p>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <h3 className="text-uefa-dark font-bold text-sm uppercase tracking-wider">Privacy Preferences</h3>
                            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-700">Private Profile</h4>
                                    <p className="text-xs text-gray-500">Encrypt and hide your PII data from other players</p>
                                </div>
                                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                                    <input type="checkbox" name="privacyFlag" defaultChecked={profile?.privacy_flag} className="absolute w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:bg-cyan-500" />
                                    <label className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <h3 className="text-red-600 font-bold text-sm uppercase tracking-wider">Danger Zone</h3>
                            <button type="button" className="w-full text-left text-red-600 font-bold text-sm hover:underline">Delete Account</button>
                        </div>

                        <div className="pt-6 flex gap-4">
                            <form action={signOutAction} className="flex-1">
                                <button type="submit" className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-bold hover:bg-red-100 transition-all">Sign Out</button>
                            </form>
                            <button type="submit" disabled={updating} className="flex-[2] bg-uefa-dark text-white py-4 rounded-xl font-bold hover:bg-black transition-all disabled:opacity-50">
                                {updating ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
