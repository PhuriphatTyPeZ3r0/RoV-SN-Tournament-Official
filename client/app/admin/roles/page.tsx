'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getAllUsersWithRolesAction, updateUserRoleAction } from '@/features/analytics/dashboard-actions';
import Swal from 'sweetalert2';

export default function RoleManagementPage() {
    const { t } = useLanguage();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const roles = ['guest', 'student', 'player', 'captain', 'admin', 'super_admin'];

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsersWithRolesAction();
            setUsers(data || []);
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: error.message || 'You do not have permission to view this page.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        const result = await Swal.fire({
            title: 'Change User Role?',
            text: `Are you sure you want to change this user's role to ${newRole}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, change it!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        });

        if (result.isConfirmed) {
            try {
                await updateUserRoleAction(userId, newRole);
                Swal.fire('Updated!', 'User role has been updated.', 'success');
                fetchUsers();
            } catch (error: any) {
                Swal.fire('Error', error.message || 'Failed to update role.', 'error');
            }
        }
    };

    const filteredUsers = users.filter(user => 
        (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.student_id && user.student_id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-display font-bold text-uefa-dark">
                <i className="fas fa-user-shield mr-3 text-cyan-aura"></i>
                Role Management
            </h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <p className="text-sm text-gray-500">Manage user roles and permissions. Accessible only by <span className="font-bold text-red-500">Super Admins</span>.</p>
                    <div className="relative w-full md:w-64">
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-cyan-aura outline-none"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="p-3">Username</th>
                                <th className="p-3">Student ID</th>
                                <th className="p-3">Joined At</th>
                                <th className="p-3">Current Role</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            {filteredUsers.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-400">No users found.</td></tr>
                            ) : (
                                filteredUsers.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50 group transition-colors">
                                        <td className="p-3 font-bold text-uefa-dark">{user.username}</td>
                                        <td className="p-3 text-gray-500">{user.student_id || 'N/A'}</td>
                                        <td className="p-3 text-gray-400 text-xs">{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                user.role === 'super_admin' ? 'bg-red-100 text-red-600' :
                                                user.role === 'admin' ? 'bg-blue-100 text-blue-600' :
                                                user.role === 'captain' ? 'bg-orange-100 text-orange-600' :
                                                user.role === 'player' ? 'bg-green-100 text-green-600' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-3 text-right">
                                            <select 
                                                value={user.role} 
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                className="text-xs border rounded p-1 focus:ring-2 focus:ring-cyan-aura outline-none"
                                            >
                                                {roles.map(r => (
                                                    <option key={r} value={r}>{r}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
