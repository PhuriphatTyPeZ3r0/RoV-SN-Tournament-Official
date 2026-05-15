'use client';

import { useState, useEffect } from 'react';
import { createTeamAction, joinTeamAction, leaveTeamAction, kickPlayerAction, getMyTeamData } from '@/features/teams/actions';
import Swal from 'sweetalert2';
import Image from 'next/image';

export default function TeamPage() {
    const [teamData, setTeamData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    
    // Forms
    const [teamName, setTeamName] = useState('');
    const [inviteCode, setInviteCode] = useState('');

    useEffect(() => {
        fetchTeamData();
    }, []);

    const fetchTeamData = async () => {
        setLoading(true);
        const data = await getMyTeamData();
        setTeamData(data);
        setLoading(false);
    };

    const handleCreateTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        const result = await createTeamAction(teamName);
        if (result.error) {
            Swal.fire('ข้อผิดพลาด', result.error, 'error');
        } else {
            Swal.fire('สำเร็จ', 'สร้างทีมเรียบร้อยแล้ว', 'success');
            fetchTeamData();
        }
        setActionLoading(false);
    };

    const handleJoinTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        const result = await joinTeamAction(inviteCode);
        if (result.error) {
            Swal.fire('ข้อผิดพลาด', result.error, 'error');
        } else {
            Swal.fire('สำเร็จ', `เข้าร่วมทีม ${result.teamName} แล้ว`, 'success');
            fetchTeamData();
        }
        setActionLoading(false);
    };

    const handleLeaveTeam = async () => {
        const confirm = await Swal.fire({
            title: 'ยืนยันการออกจากทีม?',
            text: "คุณจะต้องใช้รหัสเชิญใหม่หากต้องการกลับเข้าทีม",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ออกจากทีม',
            confirmButtonColor: '#ef4444',
        });

        if (confirm.isConfirmed) {
            setActionLoading(true);
            const result = await leaveTeamAction();
            if (result.error) {
                Swal.fire('ข้อผิดพลาด', result.error, 'error');
            } else {
                Swal.fire('สำเร็จ', 'คุณออกจากทีมแล้ว', 'success');
                fetchTeamData();
            }
            setActionLoading(false);
        }
    };

    const handleKickPlayer = async (playerId: string, name: string) => {
        const confirm = await Swal.fire({
            title: `คัด ${name} ออกจากทีม?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            confirmButtonColor: '#ef4444',
        });

        if (confirm.isConfirmed) {
            setActionLoading(true);
            const result = await kickPlayerAction(playerId);
            if (result.error) {
                Swal.fire('ข้อผิดพลาด', result.error, 'error');
            } else {
                fetchTeamData();
            }
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"></div>
            </div>
        );
    }

    if (!teamData) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Create Team */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="w-16 h-16 bg-cyan-aura/10 rounded-full flex items-center justify-center mb-6">
                        <i className="fas fa-users-plus text-2xl text-cyan-aura"></i>
                    </div>
                    <h2 className="text-2xl font-display font-bold text-uefa-dark uppercase mb-2">สร้างทีมใหม่</h2>
                    <p className="text-gray-500 text-sm mb-6">เริ่มต้นการเดินทางของคุณด้วยการเป็นกัปตันทีม</p>
                    
                    <form onSubmit={handleCreateTeam} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อทีม</label>
                            <input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder="เช่น Black Dragon"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-aura outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={actionLoading || !teamName}
                            className="w-full bg-uefa-dark text-white font-bold py-3 rounded-lg hover:bg-uefa-dark/90 transition-all disabled:opacity-50"
                        >
                            {actionLoading ? 'กำลังดำเนินการ...' : 'ยืนยันสร้างทีม'}
                        </button>
                    </form>
                </div>

                {/* Join Team */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                        <i className="fas fa-sign-in-alt text-2xl text-blue-500"></i>
                    </div>
                    <h2 className="text-2xl font-display font-bold text-uefa-dark uppercase mb-2">เข้าร่วมทีม</h2>
                    <p className="text-gray-500 text-sm mb-6">กรอกรหัสเชิญที่ได้รับจากกัปตันทีมของคุณ</p>
                    
                    <form onSubmit={handleJoinTeam} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">รหัสเชิญ (Invite Code)</label>
                            <input
                                type="text"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                placeholder="เช่น A1B2C3"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={actionLoading || !inviteCode}
                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                        >
                            {actionLoading ? 'กำลังดำเนินการ...' : 'เข้าร่วมทีม'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const isCaptain = teamData.captain_id === teamData.currentPlayerId;

    return (
        <div className="space-y-8">
            {/* Team Overview */}
            <div className="bg-uefa-dark rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-aura/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-md">
                        {teamData.logo_url ? (
                            <Image src={teamData.logo_url} alt={teamData.name} width={100} height={100} className="object-contain" />
                        ) : (
                            <i className="fas fa-shield-alt text-5xl text-cyan-aura"></i>
                        )}
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                            <h1 className="text-4xl font-display font-bold uppercase">{teamData.name}</h1>
                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${teamData.status === 'ready' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                                {teamData.status === 'ready' ? 'Ready for Tournament' : 'Incomplete Squad'}
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Created at: {new Date(teamData.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    
                    {isCaptain && (
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 text-center">Invite Code</p>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-mono font-bold text-cyan-aura tracking-widest">{teamData.invite_code}</span>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(teamData.invite_code);
                                        Swal.fire({ title: 'Copied!', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false, icon: 'success' });
                                    }}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                >
                                    <i className="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Members List */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-uefa-dark uppercase flex items-center gap-2">
                        <i className="fas fa-user-friends text-cyan-aura"></i>
                        Squad Members ({teamData.members.length}/6)
                    </h3>
                </div>
                
                <div className="divide-y divide-gray-50">
                    {teamData.members.map((member: any) => (
                        <div key={member.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${member.id === teamData.captain_id ? 'bg-cyan-aura text-uefa-dark' : 'bg-gray-100 text-gray-400'}`}>
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-uefa-dark">{member.name}</span>
                                        {member.id === teamData.captain_id && (
                                            <span className="text-[10px] bg-cyan-aura/20 text-cyan-aura font-bold px-2 py-0.5 rounded-full uppercase">Captain</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500">IGN: {member.in_game_name} | Grade: {member.grade}</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                {isCaptain && member.id !== teamData.captain_id && (
                                    <button 
                                        onClick={() => handleKickPlayer(member.id, member.name)}
                                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Kick Player"
                                    >
                                        <i className="fas fa-user-minus"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Actions Bar */}
                <div className="p-6 bg-gray-50 flex justify-end">
                    {!isCaptain && (
                        <button
                            onClick={handleLeaveTeam}
                            className="px-6 py-2 bg-red-500/10 text-red-600 rounded-lg font-bold hover:bg-red-500/20 transition-all text-sm"
                        >
                            <i className="fas fa-sign-out-alt mr-2"></i> ออกจากทีม
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
