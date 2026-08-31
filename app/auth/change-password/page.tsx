'use client';

import Icon from '@/components/common/Icon';
import { useState } from 'react';
import { changePasswordAction } from '@/features/auth/student-actions';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ChangePasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);
        setError(null);

        const result = await changePasswordAction(password);
        
        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            // Success
            window.location.href = '/team';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full mx-auto mt-20">
            <div className="bg-uefa-dark p-6 text-center">
                <h1 className="text-white font-display text-2xl font-bold tracking-wider uppercase">
                    Force <span className="text-cyan-aura">Password Change</span>
                </h1>
                <p className="text-gray-300 mt-2 text-sm">Please set your new password for first-time login</p>
            </div>
            
            <div className="p-8">
                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 border border-red-100 flex items-center gap-2">
                        <Icon name="error" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="new-password" className="block text-gray-700 text-sm mb-2 font-medium">New Password</label>
                        <Input
                            id="new-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus-visible:ring-cyan-aura focus-visible:ring-offset-0 focus:border-cyan-aura"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-new-password" className="block text-gray-700 text-sm mb-2 font-medium">Confirm New Password</label>
                        <Input
                            id="confirm-new-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus-visible:ring-cyan-aura focus-visible:ring-offset-0 focus:border-cyan-aura"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-uefa-dark text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-uefa-dark/90 hover:shadow-lg flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? (
                            <><Icon name="progress_activity" spin /> Updating...</>
                        ) : (
                            'Update Password & Continue'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
