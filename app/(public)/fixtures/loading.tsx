export default function FixturesLoading() {
    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
            {/* Header Skeleton */}
            <div className="text-center space-y-3">
                <div className="h-4 w-32 bg-white/5 animate-pulse rounded-full mx-auto"></div>
                <div className="h-10 w-64 bg-white/10 animate-pulse rounded-lg mx-auto"></div>
                <div className="h-4 w-48 bg-white/5 animate-pulse rounded-full mx-auto"></div>
            </div>

            {/* Selector Skeleton */}
            <div className="flex flex-wrap justify-center gap-3">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-10 w-24 bg-white/5 animate-pulse rounded-xl"></div>
                ))}
            </div>

            {/* Content Section Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Fixtures List Skeleton (2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <div className="h-6 w-48 bg-white/10 animate-pulse rounded-md"></div>
                        <div className="h-4 w-24 bg-white/5 animate-pulse rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-[var(--mode-bg-card)] border border-[var(--mode-border)] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center justify-center gap-6 flex-1">
                                    {/* Blue Team */}
                                    <div className="flex flex-col items-center gap-2 w-24">
                                        <div className="w-12 h-12 rounded-full bg-white/5 animate-pulse"></div>
                                        <div className="h-4 w-16 bg-white/5 animate-pulse rounded-md"></div>
                                    </div>
                                    
                                    {/* VS Divider */}
                                    <div className="flex flex-col items-center">
                                        <div className="h-4 w-8 bg-white/10 animate-pulse rounded-md"></div>
                                    </div>

                                    {/* Red Team */}
                                    <div className="flex flex-col items-center gap-2 w-24">
                                        <div className="w-12 h-12 rounded-full bg-white/5 animate-pulse"></div>
                                        <div className="h-4 w-16 bg-white/5 animate-pulse rounded-md"></div>
                                    </div>
                                </div>
                                {/* Match Details */}
                                <div className="sm:text-right flex flex-col items-center sm:items-end justify-center gap-2 border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                                    <div className="h-3 w-28 bg-white/5 animate-pulse rounded-full"></div>
                                    <div className="h-3 w-20 bg-white/5 animate-pulse rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Round Selector Sidebar Skeleton */}
                <div className="space-y-6">
                    <div className="bg-[var(--mode-bg-card)] border border-[var(--mode-border)] rounded-3xl p-6 space-y-6">
                        <div className="h-6 w-32 bg-white/10 animate-pulse rounded-md border-b border-white/5 pb-2"></div>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                <div key={i} className="h-10 bg-white/5 animate-pulse rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
