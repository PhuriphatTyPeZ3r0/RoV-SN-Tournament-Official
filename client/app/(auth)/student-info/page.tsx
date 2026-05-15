'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { registerStudentAction, getStudentRegistrationStatus } from '@/features/auth/student-actions';
import Swal from 'sweetalert2';

export default function StudentInfoPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [registration, setRegistration] = useState<any>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        studentId: '',
        grade: '',
        ign: '',
        verificationDoc: null as File | null,
    });

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        async function checkRegistration() {
            const data = await getStudentRegistrationStatus();
            if (data) {
                setRegistration(data);
            }
            setLoading(false);
        }
        checkRegistration();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, verificationDoc: e.target.files![0] }));
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let docUrl = '';
            if (formData.verificationDoc) {
                const { data: { user } } = await supabase.auth.getUser();
                const fileExt = formData.verificationDoc.name.split('.').pop();
                const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
                const filePath = `verifications/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('verification-docs')
                    .upload(filePath, formData.verificationDoc);

                if (uploadError) {
                    throw new Error('ไม่สามารถอัปโหลดไฟล์หลักฐานได้: ' + uploadError.message);
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('verification-docs')
                    .getPublicUrl(filePath);
                
                docUrl = publicUrl;
            }

            const submissionData = new FormData();
            submissionData.append('fullName', formData.fullName);
            submissionData.append('studentId', formData.studentId);
            submissionData.append('grade', formData.grade);
            submissionData.append('ign', formData.ign);
            if (docUrl) submissionData.append('verificationDocUrl', docUrl);

            const result = await registerStudentAction(submissionData);

            if (result.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: typeof result.error === 'string' ? result.error : 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'ส่งข้อมูลเรียบร้อย',
                    text: 'กรุณารอการตรวจสอบจากแอดมิน',
                }).then(() => {
                    router.refresh();
                    window.location.reload();
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"></div>
            </div>
        );
    }

    if (registration) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-cyan-aura/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className={`fas ${registration.status === 'approved' ? 'fa-check-circle text-green-500' : registration.status === 'rejected' ? 'fa-times-circle text-red-500' : 'fa-hourglass-half text-cyan-aura'} text-4xl`}></i>
                    </div>
                    <h2 className="text-2xl font-display font-bold text-uefa-dark uppercase">
                        สถานะการสมัคร
                    </h2>
                    <p className="text-gray-500 mt-2">ขอบคุณที่สนใจเข้าร่วม RoV SN Tournament</p>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                    <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-500">สถานะ:</span>
                        <span className={`font-bold ${registration.status === 'approved' ? 'text-green-600' : registration.status === 'rejected' ? 'text-red-600' : 'text-cyan-aura'}`}>
                            {registration.status === 'approved' ? 'ยืนยันแล้ว' : registration.status === 'rejected' ? 'ไม่ผ่านการตรวจสอบ' : 'กำลังรอการตรวจสอบ'}
                        </span>
                    </div>
                    <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-500">ชื่อ-นามสกุล:</span>
                        <span className="text-uefa-dark font-medium">{registration.full_name}</span>
                    </div>
                    <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-500">เลขประจำตัว:</span>
                        <span className="text-uefa-dark font-medium">{registration.student_id}</span>
                    </div>
                    <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-500">IGN:</span>
                        <span className="text-uefa-dark font-medium">{registration.in_game_name}</span>
                    </div>

                    {registration.screening_notes && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                            <p className="text-sm text-red-700">
                                <strong>หมายเหตุจากแอดมิน:</strong> {registration.screening_notes}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push('/')}
                        className="text-cyan-aura hover:underline text-sm font-medium"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        กลับหน้าแรก
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header / Progress */}
            <div className="bg-uefa-dark p-6 text-white">
                <h1 className="text-2xl font-display font-bold uppercase text-center mb-6">
                    STUDENT <span className="text-cyan-aura">REGISTRATION</span>
                </h1>
                
                <div className="flex items-center justify-between max-w-xs mx-auto relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2 z-0"></div>
                    <div className="absolute top-1/2 left-0 h-0.5 bg-cyan-aura -translate-y-1/2 z-0 transition-all duration-300" style={{ width: `${(step - 1) * 50}%` }}></div>
                    
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= i ? 'bg-cyan-aura text-uefa-dark' : 'bg-gray-700 text-gray-400'}`}>
                            {i}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between max-w-xs mx-auto mt-2 text-[10px] text-gray-400 uppercase tracking-widest">
                    <span>ข้อมูลส่วนตัว</span>
                    <span>ข้อมูลในเกม</span>
                    <span>ยืนยันตัวตน</span>
                </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Personal Info */}
                    {step === 1 && (
                        <div className="space-y-4 animate-fadeIn">
                            <h3 className="text-lg font-bold text-uefa-dark flex items-center gap-2">
                                <i className="fas fa-user-circle text-cyan-aura"></i>
                                ข้อมูลส่วนตัวนักเรียน
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล (ภาษาไทย)</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="เช่น นายปรีชา สุขใจ"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">เลขประจำตัวนักเรียน</label>
                                    <input
                                        type="text"
                                        name="studentId"
                                        value={formData.studentId}
                                        onChange={handleChange}
                                        required
                                        placeholder="ตัวเลข 5 หลัก"
                                        maxLength={5}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ชั้นเรียน</label>
                                    <input
                                        type="text"
                                        name="grade"
                                        value={formData.grade}
                                        onChange={handleChange}
                                        required
                                        placeholder="เช่น ม.4/1"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Game Info */}
                    {step === 2 && (
                        <div className="space-y-4 animate-fadeIn">
                            <h3 className="text-lg font-bold text-uefa-dark flex items-center gap-2">
                                <i className="fas fa-gamepad text-cyan-aura"></i>
                                ข้อมูลในเกม (RoV)
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อในเกม (In-Game Name)</label>
                                <input
                                    type="text"
                                    name="ign"
                                    value={formData.ign}
                                    onChange={handleChange}
                                    required
                                    placeholder="ใส่ชื่อที่ใช้ในการแข่งขัน"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura focus:border-transparent outline-none transition-all"
                                />
                                <p className="text-xs text-gray-500 mt-1">* กรุณาใช้ชื่อที่ตรงกับในเกมจริงเพื่อผลประโยชน์ในการรับรางวัล</p>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Verification */}
                    {step === 3 && (
                        <div className="space-y-4 animate-fadeIn">
                            <h3 className="text-lg font-bold text-uefa-dark flex items-center gap-2">
                                <i className="fas fa-id-card text-cyan-aura"></i>
                                ยืนยันตัวตน
                            </h3>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-cyan-aura transition-colors">
                                <input
                                    type="file"
                                    id="verificationDoc"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <label htmlFor="verificationDoc" className="cursor-pointer block">
                                    <i className={`fas ${formData.verificationDoc ? 'fa-file-image text-green-500' : 'fa-cloud-upload-alt text-gray-400'} text-4xl mb-3`}></i>
                                    <p className="text-sm text-gray-600">
                                        {formData.verificationDoc ? formData.verificationDoc.name : 'คลิกเพื่ออัปโหลดรูปบัตรนักเรียน หรือหลักฐานแสดงตัวตน'}
                                    </p>
                                    <p className="text-[10px] text-gray-400 mt-1">ไฟล์รูปภาพ (JPG, PNG) ขนาดไม่เกิน 5MB</p>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 pt-4">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition-all"
                            >
                                ย้อนกลับ
                            </button>
                        )}
                        
                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={step === 1 ? (!formData.fullName || !formData.studentId || !formData.grade) : !formData.ign}
                                className="flex-1 py-2 rounded-lg bg-uefa-dark text-white font-bold hover:bg-uefa-dark/90 transition-all disabled:opacity-50"
                            >
                                ถัดไป
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={submitting || !formData.verificationDoc}
                                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-cyan-aura to-cyan-dark text-uefa-dark font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        กำลังส่งข้อมูล...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane"></i>
                                        ยืนยันการสมัคร
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
