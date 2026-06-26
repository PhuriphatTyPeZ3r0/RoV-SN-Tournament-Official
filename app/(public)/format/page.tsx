import { Metadata } from 'next';
import FormatContent from '@/components/format/FormatContent';

export const metadata: Metadata = {
    title: 'Tournament Format',
    description: 'รูปแบบการแข่งขันและเกณฑ์การตัดสิน - RoV SN Tournament',
    openGraph: {
        title: 'Tournament Format',
        description: 'เกณฑ์การตัดสินฉบับทางการ',
    },
};

export default function FormatPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <FormatContent />
        </div>
    );
}
