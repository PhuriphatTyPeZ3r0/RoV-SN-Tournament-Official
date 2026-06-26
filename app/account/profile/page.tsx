'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { updateProfileAction } from '@/features/auth/profile-actions';
import Link from 'next/link';
import Image from 'next/image';

export default function UserProfilePage() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                setProfile(data);
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUpdating(true);
        const form = new FormData(e.currentTarget);
        const result = await updateProfileAction(form);
        if (result.success) setMessage('Profile updated successfully');
        setUpdating(false);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-uefa-dark p-8 flex justify-between items-center">
                    <h1 className="text-2xl font-display font-bold text-white uppercase">User <span className="text-cyan-aura">Profile</span></h1>
                    <Link href="/team" className="text-white/60 hover:text-white transition-colors">
                        <i className="fas fa-times text-xl"></i>
                    </Link>
                </div>

                <div className="p-8">
                    {message && <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-6">{message}</div>}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center gap-4 mb-8">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-inner bg-gray-200">
                                {profile?.avatar_url ? (
                                    <Image src={profile.avatar_url} alt="Avatar" fill className="object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400 text-3xl">
                                        <i className="fas fa-user"></i>
                                    </div>
                                )}
                            </div>
                            <input type="hidden" name="avatarUrl" value={profile?.avatar_url || ''} />
                            <button type="button" className="text-xs font-bold text-cyan-600 hover:underline uppercase tracking-widest">Change Photo</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Full Name</label>
                                <input name="fullName" type="text" defaultValue={profile?.full_name || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-aura/20 focus:border-cyan-aura transition-all" />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Nickname</label>
                                <input name="nickname" type="text" defaultValue={profile?.nickname || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-aura/20 focus:border-cyan-aura transition-all" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Phone Number</label>
                                <input name="phone" type="tel" defaultValue={profile?.phone || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-aura/20 focus:border-cyan-aura transition-all" />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Role (Locked)</label>
                                <div className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-400 font-bold uppercase text-xs cursor-not-allowed">
                                    {profile?.role}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex gap-4">
                            <Link href="/settings" className="flex-1 bg-gray-100 text-gray-600 text-center py-4 rounded-xl font-bold hover:bg-gray-200 transition-all">Account Settings</Link>
                            <button type="submit" disabled={updating} className="flex-[2] bg-uefa-dark text-white py-4 rounded-xl font-bold hover:bg-black transition-all disabled:opacity-50">
                                {updating ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
