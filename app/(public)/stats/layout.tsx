import { Metadata } from 'next';
import { serverApi } from '@/lib/api';
import StatsLayout from '@/components/stats/StatsLayout';

export const metadata: Metadata = {
    title: 'Statistics',
    description: 'สถิติการแข่งขัน ข้อมูลผู้เล่น และข้อมูลทีม - RoV SN Tournament',
};

export default async function StatsLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const tournaments = await serverApi.getTournaments();
    return <StatsLayout tournaments={tournaments}>{children}</StatsLayout>;
}
