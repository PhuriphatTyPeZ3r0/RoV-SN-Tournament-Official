'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function AdminRealtimeListener() {
    const router = useRouter();
    const supabase = createClient();
    const { t } = useLanguage();

    useEffect(() => {
        // 1. Listen for new registrations (INSERT into registrations)
        const registrationChannel = supabase
            .channel('new-registrations')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'registrations' },
                (payload: any) => {
                    toast.info(t.admin.listener.newRegistration.replace('{name}', payload.new.full_name), {
                        description: t.admin.listener.ign.replace('{ign}', payload.new.in_game_name),
                        action: {
                            label: 'View',
                            onClick: () => router.push('/admin/registrations')
                        }
                    });
                    router.refresh();
                }
            )
            .subscribe();

        // 2. Listen for teams becoming ready (UPDATE teams -> status = 'ready')
        const teamReadyChannel = supabase
            .channel('team-status-updates')
            .on(
                'postgres_changes',
                { 
                    event: 'UPDATE', 
                    schema: 'public', 
                    table: 'teams',
                    filter: 'status=eq.ready'
                },
                (payload: any) => {
                    // Only notify if it wasn't ready before
                    if (payload.old.status !== 'ready') {
                        toast.success(t.admin.listener.teamReady.replace('{name}', payload.new.name), {
                            description: t.admin.listener.waitApproval,
                            action: {
                                label: 'Review',
                                onClick: () => router.push('/admin/teams')
                            }
                        });
                        router.refresh();
                    }
                }
            )
            .subscribe();

        // 3. Listen for Match Results Audit (INSERT into match_history)
        // Useful for seeing actions from other admins
        const historyChannel = supabase
            .channel('audit-logs')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'match_history' },
                (payload: any) => {
                    if (payload.new.action === 'update') {
                        toast(t.admin.listener.updateResult.replace('{key}', payload.new.match_key), {
                            icon: '🏆'
                        });
                        router.refresh();
                    }
                }
            )
            .subscribe();

        // Cleanup
        return () => {
            supabase.removeChannel(registrationChannel);
            supabase.removeChannel(teamReadyChannel);
            supabase.removeChannel(historyChannel);
        };
    }, [supabase, router, t]);

    return null;
}
