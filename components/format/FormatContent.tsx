'use client';

import { useState } from 'react';
import ShareButton from '@/components/common/ShareButton';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function FormatContent() {
    const { t, language } = useLanguage();
    const isThai = language === 'th';
    const [activeTab, setActiveTab] = useState<'format' | 'tutorial'>('format');

    return (
        <>
            {/* Header */}
            <div className="bg-gradient-to-br from-uefa-dark via-slate-800 to-uefa-dark py-8 md:py-12 mb-4 md:mb-8 shadow-lg border-b-4 border-cyan-aura">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="text-center md:text-left">
                                <h1 className="text-2xl md:text-4xl font-display font-bold text-white uppercase tracking-wider">
                                    🏆 {t.format.title}
                                </h1>
                                <p className="text-cyan-aura/80 font-sans mt-1 text-sm md:text-base">
                                    📢 {t.format.subtitle}
                                </p>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <ShareButton title={`${t.format.title} - RoV SN Tournament`} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl">
                {/* Tab Switcher */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-gray-100 p-1 rounded-2xl border border-gray-200/50 shadow-inner gap-1">
                        <button
                            type="button"
                            onClick={() => setActiveTab('format')}
                            className={`py-2.5 px-5 md:px-6 rounded-xl font-display font-bold text-xs tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                                activeTab === 'format'
                                    ? 'bg-uefa-dark text-white shadow-md'
                                    : 'text-gray-500 hover:text-uefa-dark hover:bg-gray-200/50'
                            }`}
                        >
                            <span>🏆</span>
                            <span>{isThai ? 'รูปแบบและกติกาแข่ง' : 'Format & Rules'}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('tutorial')}
                            className={`py-2.5 px-5 md:px-6 rounded-xl font-display font-bold text-xs tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                                activeTab === 'tutorial'
                                    ? 'bg-uefa-dark text-white shadow-md'
                                    : 'text-gray-500 hover:text-uefa-dark hover:bg-gray-200/50'
                            }`}
                        >
                            <span>📖</span>
                            <span>{isThai ? 'คู่มือสอนการใช้งานระบบ' : 'User Guide & Tutorial'}</span>
                        </button>
                    </div>
                </div>

                {activeTab === 'format' && (
                    <>
                        {/* Section 1: League Phase */}
                        <section className="mb-8 md:mb-12">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-uefa-dark to-uefa-dark/90 p-4 md:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-aura rounded-xl flex items-center justify-center shadow-lg shadow-cyan-aura/30 text-uefa-dark font-bold text-lg">
                                            1
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-display font-bold text-white">
                                            {t.format.leaguePhase}
                                        </h2>
                                    </div>
                                </div>
                                <div className="p-4 md:p-6">
                                    <p className="text-gray-600 mb-4">
                                        📌 <span className="font-semibold text-gray-800">{t.format.labelFormat}</span> {t.format.roundRobin}
                                    </p>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                                            <span className="text-cyan-500 mt-0.5">•</span>
                                            <span><span className="font-semibold text-gray-800">{t.format.labelTeams}</span> {t.format.teamsValue}</span>
                                        </li>
                                        <li className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                                            <span className="text-cyan-500 mt-0.5">•</span>
                                            <span><span className="font-semibold text-gray-800">{t.format.labelMatches}</span> {t.format.matchesValue}</span>
                                        </li>
                                        <li className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                                            <span className="text-cyan-500 mt-0.5">•</span>
                                            <span><span className="font-semibold text-gray-800">{t.format.labelMode}</span> Best of 3 (BO3)</span>
                                        </li>
                                        <li className="flex items-start gap-3 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                            <span className="text-yellow-500 mt-0.5">•</span>
                                            <span><span className="font-semibold text-gray-800">{t.format.labelQualification}</span> {t.format.qualificationPrefix} <span className="font-bold text-yellow-600">{t.format.qualificationHighlight}</span> {t.format.qualificationSuffix}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Point System */}
                        <section className="mb-8 md:mb-12">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-uefa-dark to-uefa-dark/90 p-4 md:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-aura rounded-xl flex items-center justify-center shadow-lg shadow-cyan-aura/30 text-uefa-dark font-bold text-lg">
                                            2
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-display font-bold text-white">
                                            📊 {t.format.pointSystemTitle}
                                        </h2>
                                    </div>
                                </div>
                                <div className="p-4 md:p-6 space-y-6">
                                    {/* Points */}
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-3">📍 {t.format.pointSystemSection}</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                                                <span className="text-3xl">🟢</span>
                                                <p className="text-green-600 font-bold text-lg mt-2">{t.format.win}</p>
                                                <p className="text-gray-800 text-2xl font-bold">{t.format.winPoints}</p>
                                            </div>
                                            <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                                                <span className="text-3xl">🔴</span>
                                                <p className="text-red-600 font-bold text-lg mt-2">{t.format.lose}</p>
                                                <p className="text-gray-800 text-2xl font-bold">{t.format.losePoints}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tiebreakers */}
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-2">📍 {t.format.tiebreakersTitle}</h4>
                                        <p className="text-gray-500 text-sm mb-3">{t.format.tiebreakersSubtitle}</p>
                                        <ol className="space-y-2">
                                            <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                                <span className="w-8 h-8 bg-cyan-aura text-uefa-dark font-bold rounded-full flex items-center justify-center flex-shrink-0">1</span>
                                                <span>⚔️ <span className="font-semibold text-cyan-700">Game Difference:</span> <span className="text-gray-600">{t.format.gameDiffDesc}</span></span>
                                            </li>
                                            <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                                <span className="w-8 h-8 bg-cyan-aura text-uefa-dark font-bold rounded-full flex items-center justify-center flex-shrink-0">2</span>
                                                <span>🆚 <span className="font-semibold text-cyan-700">Head-to-Head:</span> <span className="text-gray-600">{t.format.h2hDesc}</span></span>
                                            </li>
                                            <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                                <span className="w-8 h-8 bg-cyan-aura text-uefa-dark font-bold rounded-full flex items-center justify-center flex-shrink-0">3</span>
                                                <span>📈 <span className="font-semibold text-cyan-700">Total Wins:</span> <span className="text-gray-600">{t.format.totalWinsDesc}</span></span>
                                            </li>
                                            <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                                <span className="w-8 h-8 bg-cyan-aura text-uefa-dark font-bold rounded-full flex items-center justify-center flex-shrink-0">4</span>
                                                <span>🎲 <span className="font-semibold text-cyan-700">Random Draw:</span> <span className="text-gray-600">{t.format.randomDrawDesc}</span></span>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Semi Finals */}
                        <section className="mb-8 md:mb-12">
                            <div className="bg-white rounded-2xl shadow-sm border border-orange-200 overflow-hidden">
                                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 md:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg text-orange-600 font-bold text-lg">
                                            3
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-display font-bold text-white">
                                            🥊 {t.format.semiFinalsTitle}
                                        </h2>
                                    </div>
                                </div>
                                <div className="p-4 md:p-6 space-y-4">
                                    <p className="text-gray-600">
                                        📌 <span className="font-semibold text-gray-800">{t.format.labelFormat}</span> Best of 5 (BO5)
                                    </p>
                                    <p className="text-gray-500 text-sm">{t.format.semiFinalsSubtitle}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                            <p className="text-blue-600 font-bold mb-2">🅰️ {t.format.match1}</p>
                                            <p className="text-gray-800 text-lg font-semibold">{t.format.rank1v2}</p>
                                        </div>
                                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                                            <p className="text-purple-600 font-bold mb-2">🅱️ {t.format.match2}</p>
                                            <p className="text-gray-800 text-lg font-semibold">{t.format.rank3v4}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2">
                                        <p className="text-gray-700 font-semibold">{t.format.resultsLabel}</p>
                                        <p className="text-green-600">✅ <span className="font-bold">{t.format.winnersLabel}</span> {t.format.winnersDesc}</p>
                                        <p className="text-red-600">❌ <span className="font-bold">{t.format.losersLabel}</span> {t.format.losersDesc}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 4: Grand Finals */}
                        <section className="mb-8 md:mb-12">
                            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-lg border-2 border-yellow-300 overflow-hidden">
                                <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-4 md:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg text-yellow-600 font-bold text-lg">
                                            4
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-display font-bold text-white">
                                            👑 {t.format.grandFinalsTitle}
                                        </h2>
                                    </div>
                                </div>
                                <div className="p-4 md:p-6 space-y-4">
                                    <div className="space-y-2 text-gray-600">
                                        <p>📍 <span className="font-semibold text-gray-800">{t.format.labelVenue}</span> {t.format.venueDesc}</p>
                                        <p>📌 <span className="font-semibold text-gray-800">{t.format.labelFormat}</span> Best of 5 (BO5)</p>
                                    </div>

                                    <p className="text-gray-700 font-semibold pt-2">{t.format.labelMatchSchedule}</p>
                                    <div className="space-y-4">
                                        <div className="bg-amber-100 border border-amber-300 rounded-xl p-4 flex items-center gap-4">
                                            <span className="text-4xl">🥉</span>
                                            <div>
                                                <p className="text-amber-700 font-bold text-lg">{t.format.thirdPlaceMatch}</p>
                                                <p className="text-gray-600">{t.format.thirdPlaceDesc}</p>
                                            </div>
                                        </div>
                                        <div className="bg-yellow-100 border border-yellow-400 rounded-xl p-4 flex items-center gap-4 shadow-md">
                                            <span className="text-4xl">🏆</span>
                                            <div>
                                                <p className="text-yellow-700 font-bold text-lg">{t.format.grandFinalMatch}</p>
                                                <p className="text-gray-600">{t.format.grandFinalDesc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {activeTab === 'tutorial' && (
                    <div className="space-y-8 relative before:absolute before:top-4 before:bottom-4 before:left-6 md:before:left-8 before:w-0.5 before:border-l-2 before:border-dashed before:border-purple-200 pb-4">
                        {/* Step 1 */}
                        <div className="relative pl-14 md:pl-20 transition-all duration-300 hover:translate-x-1">
                            <div className="absolute left-2 md:left-4 top-0 w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-500/20 z-10">
                                1
                            </div>
                            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow">
                                <h3 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                                    🔐 {isThai ? 'ขั้นตอนที่ 1: การลงทะเบียนและตั้งชื่อบัญชี' : 'Step 1: Registration & Account Setup'}
                                </h3>
                                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3">
                                    {isThai 
                                        ? 'กดปุ่ม "เข้าสู่ระบบ/ลงทะเบียน" เพื่อเริ่มต้นสร้างบัญชีผู้เล่น จากนั้นระบุข้อมูลและรหัสประจำตัวนักเรียนของคุณให้ถูกต้อง'
                                        : 'Click "Login/Register" to start creating your player account. Fill in your student credentials correctly.'}
                                </p>
                                <div className="bg-purple-50/60 rounded-xl p-3 border border-purple-100/50 text-xs text-purple-950 font-medium">
                                    💡 <strong>{isThai ? 'ระบบตั้งชื่ออัตโนมัติ:' : 'Auto-Username Policy:'}</strong> {isThai
                                        ? 'ระบบจะตั้ง Username สากลให้โดยอัตโนมัติในรูปแบบ [ชื่อจริงอังกฤษ].[นามสกุลอังกฤษตัวแรก] เช่น Phuriphat Hemakul -> phuriphat.h (หากชื่อซ้ำระบบจะขยายตัวอักษรนามสกุลถัดไป)'
                                        : 'The system automatically assigns a standardized username as [first name].[first letter of last name] (e.g., phuriphat.h).'}
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative pl-14 md:pl-20 transition-all duration-300 hover:translate-x-1">
                            <div className="absolute left-2 md:left-4 top-0 w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-500/20 z-10">
                                2
                            </div>
                            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow">
                                <h3 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                                    📧 {isThai ? 'ขั้นตอนที่ 2: ยืนยันรหัส OTP ทางอีเมล' : 'Step 2: Email OTP Verification'}
                                </h3>
                                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3">
                                    {isThai
                                        ? 'เมื่อบันทึกข้อมูลสำเร็จ ระบบจะจัดส่งรหัสยืนยันตัวตน (OTP 6 หลัก) ไปยังอีเมลของท่าน กรุณานำมากรอกบนหน้าเว็บทันทีเพื่อเปิดใช้งานบัญชี'
                                        : 'After registration, a 6-digit verification code (OTP) will be sent to your email. Enter it on the website to activate your account.'}
                                </p>
                                <div className="bg-amber-50/60 rounded-xl p-3 border border-amber-100/50 text-xs text-amber-800 font-medium flex items-center gap-1.5">
                                    ⚠️ <span>{isThai ? 'หากหาจดหมายไม่เจอ กรุณาลองตรวจสอบในโฟลเดอร์ Junk หรือ Spam Mail ของคุณ' : 'If you cannot find the email, please check your Junk or Spam Mail folder.'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative pl-14 md:pl-20 transition-all duration-300 hover:translate-x-1">
                            <div className="absolute left-2 md:left-4 top-0 w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-500/20 z-10">
                                3
                            </div>
                            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow">
                                <h3 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                                    👥 {isThai ? 'ขั้นตอนที่ 3: จัดตั้งทีม หรือ เข้าร่วมทีม' : 'Step 3: Create or Join a Team'}
                                </h3>
                                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4">
                                    {isThai
                                        ? 'คุณสามารถเลือกลงแข่งในแบบฉบับหัวหน้าทีม หรือสมาชิกผู้เล่นทั่วไปได้ดังนี้:'
                                        : 'You can choose to compete as either a Team Captain or a regular member:'}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-purple-50/40 rounded-xl p-4 border border-purple-100/50">
                                        <span className="text-xs font-bold text-purple-700 uppercase tracking-wide block mb-1">
                                            👑 {isThai ? 'สำหรับหัวหน้าทีม (Captain)' : 'For Team Captains'}
                                        </span>
                                        <p className="text-gray-600 text-[11px] md:text-xs leading-normal">
                                            {isThai
                                                ? 'กดสร้างทีม ระบุชื่อ คลับ และรูปโลโก้ทีม จากนั้นคัดลอก "รหัสเชิญเข้าทีม (Invite Code)" ส่งให้เพื่อนร่วมทีมของคุณ'
                                                : 'Create a team, fill name, club and upload logo. Copy the "Invite Code" and send it to your team members.'}
                                        </p>
                                    </div>
                                    <div className="bg-indigo-50/40 rounded-xl p-4 border border-indigo-100/50">
                                        <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide block mb-1">
                                            ⚔️ {isThai ? 'สำหรับสมาชิกทีม (Player)' : 'For Team Players'}
                                        </span>
                                        <p className="text-gray-600 text-[11px] md:text-xs leading-normal">
                                            {isThai
                                                ? 'นำรหัสเชิญเข้าร่วมทีมจากหัวหน้าทีมมากรอกในช่องเข้าร่วม จากนั้นเลือกตำแหน่งหลัก (Lineup Role) ของคุณให้ถูกต้อง'
                                                : 'Enter the invite code shared by your captain, then select your lineup position (e.g. Mid, Support).'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative pl-14 md:pl-20 transition-all duration-300 hover:translate-x-1">
                            <div className="absolute left-2 md:left-4 top-0 w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-500/20 z-10">
                                4
                            </div>
                            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow">
                                <h3 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                                    🏆 {isThai ? 'ขั้นตอนที่ 4: การตรวจสอบสถานะและส่งใบสมัคร' : 'Step 4: Checking Status & Submitting'}
                                </h3>
                                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3">
                                    {isThai
                                        ? 'เมื่อทีมมีผู้เล่นตัวจริงครบ 5 คน หัวหน้าทีมจะสามารถกดปุ่ม "จัดส่งใบสมัคร" ได้ และผู้เล่นทุกคนสามารถตรวจสอบสถานะได้ที่เมนู "สถานะการลงทะเบียน"'
                                        : 'Once the team has exactly 5 active players, the captain can click "Submit Registration". All players can check progress in "Registration Status".'}
                                </p>
                                <div className="grid grid-cols-3 gap-2 text-[10px] md:text-xs">
                                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 text-center">
                                        <span className="font-bold text-gray-500 block mb-0.5">⏳ Pending</span>
                                        <span className="text-gray-400 text-[9px] md:text-[10px]">{isThai ? 'รอการตรวจเอกสาร' : 'Awaiting review'}</span>
                                    </div>
                                    <div className="bg-green-50 p-2.5 rounded-lg border border-green-100 text-center">
                                        <span className="font-bold text-green-600 block mb-0.5">🟢 Approved</span>
                                        <span className="text-green-500 text-[9px] md:text-[10px]">{isThai ? 'ลงทะเบียนแข่งสำเร็จ' : 'Ready to play'}</span>
                                    </div>
                                    <div className="bg-red-50 p-2.5 rounded-lg border border-red-100 text-center">
                                        <span className="font-bold text-red-600 block mb-0.5">🔴 Rejected</span>
                                        <span className="text-red-500 text-[9px] md:text-[10px]">{isThai ? 'ข้อมูลไม่ถูกต้อง' : 'Invalid data'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="relative pl-14 md:pl-20 transition-all duration-300 hover:translate-x-1">
                            <div className="absolute left-2 md:left-4 top-0 w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-500/20 z-10">
                                5
                            </div>
                            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow">
                                <h3 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                                    ⚔️ {isThai ? 'ขั้นตอนที่ 5: การส่งผลการแข่งขันและคำนวณสถิติ' : 'Step 5: Match Reporting & Live Stats'}
                                </h3>
                                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                                    {isThai
                                        ? 'หลังจากการแข่งขันเสร็จสิ้น หัวหน้าทีมต้องส่งรูปภาพสกรีนบอร์ดจบเกม (End Game Board) ให้กับสตาฟฟ์ โดยระบบจะนำสถิติเกมจริง (K/D/A, Win Rates, Picked Heroes) มารวบรวมและแสดงผลบนแท็บ "สถิติและคะแนน" ของทัวร์นาเมนต์ให้โดยอัตโนมัติ'
                                        : 'After the match, team captains must submit the screenshot of the scoreboards. The system will automatically parse K/D/A, Win Rates, and Hero Picks to display live metrics on the "Stats" page.'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Note */}
                <div className="text-center text-gray-500 text-sm mt-8">
                    <i className="fas fa-info-circle mr-1.5"></i>
                    {t.format.discretionNote}
                </div>
            </div>
        </>
    );
}
