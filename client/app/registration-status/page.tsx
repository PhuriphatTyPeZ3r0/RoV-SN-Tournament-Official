'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { signOutAction } from '@/features/auth/actions';
import Link from 'next/link';

export default function RegistrationStatusPage() {
    const [status, setStatus] = useState<'pending' | 'verified' | 'rejected' | 'none'>('none');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('registration_status').eq('id', user.id).single();
                setStatus(data?.registration_status || 'none');
            }
            setLoading(false);
        };
        fetchStatus();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-uefa-dark p-8 text-center">
                    <h1 className="text-2xl font-display font-bold text-white tracking-widest uppercase">
                        Registration <span className="text-cyan-aura">Status</span>
                    </h1>
                </div>

                <div className="p-8 text-center">
                    {status === 'pending' && (
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-cyan-50 text-cyan-500 rounded-full flex items-center justify-center mx-auto text-4xl animate-pulse">
                                <i className="fas fa-clock"></i>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">รอการตรวจสอบ</h2>
                            <p className="text-gray-500">
                                คำขอลงทะเบียนของคุณถูกส่งแล้ว <br />
                                โปรดรอเจ้าหน้าที่พิจารณาและแจ้งผลทางอีเมล
                            </p>
                            <div className="pt-4">
                                <form action={signOutAction}>
                                    <button type="submit" className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors">
                                        <i className="fas fa-sign-out-alt mr-2"></i> ออกจากระบบ
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {status === 'rejected' && (
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-4xl">
                                <i className="fas fa-times-circle"></i>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">การลงทะเบียนไม่สำเร็จ</h2>
                            <p className="text-gray-500">
                                คำขอของคุณถูกปฏิเสธ โปรดตรวจสอบเหตุผลในอีเมลของคุณ <br />
                                หรือติดต่อเจ้าหน้าที่เพื่อขอข้อมูลเพิ่มเติม
                            </p>
                            <div className="flex flex-col gap-3 pt-4">
                                <Link href="/register" className="bg-uefa-dark text-white py-3 rounded-xl font-bold hover:bg-black transition-all">
                                    ลองลงทะเบียนใหม่
                                </Link>
                                <form action={signOutAction}>
                                    <button type="submit" className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors">
                                        ออกจากระบบ
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {status === 'verified' && (
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto text-4xl">
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">ยืนยันตัวตนสำเร็จ!</h2>
                            <p className="text-gray-500">
                                บัญชีของคุณได้รับการอนุมัติเรียบร้อยแล้ว <br />
                                กดปุ่มด้านล่างเพื่อเข้าสู่ระบบการแข่งขัน
                            </p>
                            <div className="pt-4">
                                <Link href="/team" className="block w-full bg-cyan-500 text-white py-3 rounded-xl font-bold hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-500/20">
                                    เข้าสู่ระบบ
                                </Link>
                            </div>
                        </div>
                    )}

                    {status === 'none' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800">ไม่พบข้อมูลการลงทะเบียน</h2>
                            <Link href="/register" className="block w-full bg-uefa-dark text-white py-3 rounded-xl font-bold hover:bg-black transition-all">
                                ไปหน้าลงทะเบียน
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
