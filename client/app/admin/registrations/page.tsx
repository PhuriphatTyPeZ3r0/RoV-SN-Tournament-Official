'use client';

import { useState, useEffect } from 'react';
import { getPendingRegistrations, updateRegistrationStatus } from '@/features/auth/student-actions';
import Swal from 'sweetalert2';
import Image from 'next/image';

export default function AdminRegistrationsPage() {
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        setLoading(true);
        const data = await getPendingRegistrations();
        setRegistrations(data);
        setLoading(false);
    };

    const handleAction = async (id: string, status: 'approved' | 'rejected') => {
        const { value: notes } = await Swal.fire({
            title: status === 'approved' ? 'ยืนยันการอนุมัติ' : 'ระบุเหตุผลการปฏิเสธ',
            input: 'text',
            inputLabel: 'หมายเหตุ (ไม่บังคับ)',
            inputPlaceholder: 'กรอกข้อความ...',
            showCancelButton: true,
            confirmButtonText: status === 'approved' ? 'อนุมัติ' : 'ปฏิเสธ',
            confirmButtonColor: status === 'approved' ? '#10b981' : '#ef4444',
        });

        if (notes !== undefined) {
            const result = await updateRegistrationStatus(id, status, notes);
            if (result.success) {
                Swal.fire('สำเร็จ', `ดำเนินการเรียบร้อยแล้ว`, 'success');
                fetchRegistrations();
            } else {
                Swal.fire('ข้อผิดพลาด', result.error, 'error');
            }
        }
    };

    const filteredRegistrations = registrations.filter(r => 
        filter === 'all' ? true : r.status === filter
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-display font-bold text-uefa-dark uppercase">
                        Student <span className="text-cyan-aura">Screening</span>
                    </h2>
                    <p className="text-gray-500 text-sm">จัดการคำขอสมัครเข้าร่วมแข่งขันของนักเรียน</p>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {(['pending', 'approved', 'rejected', 'all'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === f ? 'bg-white text-uefa-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {f === 'pending' ? 'รอตรวจสอบ' : f === 'approved' ? 'อนุมัติแล้ว' : f === 'rejected' ? 'ปฏิเสธ' : 'ทั้งหมด'}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"></div>
                </div>
            ) : filteredRegistrations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-400">
                    <i className="fas fa-inbox text-4xl mb-3"></i>
                    <p>ไม่พบข้อมูลการสมัคร</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredRegistrations.map(reg => (
                        <div key={reg.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            {/* Header */}
                            <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-uefa-dark flex items-center gap-2">
                                        {reg.full_name}
                                        {reg.privacy_flag && (
                                            <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                                                <i className="fas fa-lock"></i> Privacy
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-xs text-gray-500">ID: {reg.student_id} | CID: {reg.citizen_id || 'N/A'} | {reg.grade}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${reg.status === 'approved' ? 'bg-green-100 text-green-700' : reg.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-cyan-100 text-cyan-700'}`}>
                                    {reg.status}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="p-4 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">IGN (In-game):</span>
                                    <span className="font-bold text-uefa-dark">{reg.in_game_name}</span>
                                </div>

                                {reg.verification_doc_url && (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group cursor-pointer" onClick={() => window.open(reg.verification_doc_url, '_blank')}>
                                        <Image
                                            src={reg.verification_doc_url}
                                            alt="Verification Doc"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                            <i className="fas fa-search-plus text-2xl"></i>
                                        </div>
                                    </div>
                                )}

                                {reg.screening_notes && (
                                    <div className="p-2 bg-gray-50 rounded text-xs text-gray-600 italic">
                                        Note: {reg.screening_notes}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            {reg.status === 'pending' && (
                                <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                                    <button
                                        onClick={() => handleAction(reg.id, 'approved')}
                                        className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors"
                                    >
                                        <i className="fas fa-check mr-2"></i> อนุมัติ
                                    </button>
                                    <button
                                        onClick={() => handleAction(reg.id, 'rejected')}
                                        className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
                                    >
                                        <i className="fas fa-times mr-2"></i> ปฏิเสธ
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
