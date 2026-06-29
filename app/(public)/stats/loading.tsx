export default function StatsLoading() {
    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
            {/* Header Skeleton */}
            <div className="text-center space-y-3">
                <div className="h-4 w-32 bg-white/5 animate-pulse rounded-full mx-auto"></div>
                <div className="h-10 w-64 bg-white/10 animate-pulse rounded-lg mx-auto"></div>
                <div className="h-4 w-48 bg-white/5 animate-pulse rounded-full mx-auto"></div>
            </div>

            {/* Tab Navigation Skeleton */}
            <div className="flex justify-center border-b border-white/5 pb-px">
                <div className="flex gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 w-24 bg-white/5 animate-pulse rounded-t-lg"></div>
                    ))}
                </div>
            </div>

            {/* Selector Season Selector Skeleton */}
            <div className="flex flex-wrap justify-center gap-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-24 bg-white/5 animate-pulse rounded-xl"></div>
                ))}
            </div>

            {/* Overview Stats Layout Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 4 Summary Cards */}
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-[var(--mode-bg-card)] border border-[var(--mode-border)] rounded-2xl p-6 space-y-4 shadow-lg">
                        <div className="flex justify-between items-center">
                            <div className="h-4 w-20 bg-white/5 animate-pulse rounded-md"></div>
                            <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse"></div>
                        </div>
                        <div className="h-8 w-24 bg-white/10 animate-pulse rounded-lg"></div>
                        <div className="h-3 w-32 bg-white/5 animate-pulse rounded-full"></div>
                    </div>
                ))}
            </div>

            {/* Two Column Layout (e.g. Top Heroes, Top Ban/Pick Skeletons) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Column 1 */}
                <div className="bg-[var(--mode-bg-card)] border border-[var(--mode-border)] rounded-3xl p-6 space-y-6">
                    <div className="h-6 w-40 bg-white/10 animate-pulse rounded-md border-b border-white/5 pb-2"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="h-4 w-4 bg-white/5 animate-pulse rounded-md"></div>
                                <div className="w-12 h-12 rounded-xl bg-white/5 animate-pulse"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-28 bg-white/5 animate-pulse rounded-md"></div>
                                    <div className="h-3 w-40 bg-white/5 animate-pulse rounded-full"></div>
                                </div>
                                <div className="h-4 w-12 bg-white/10 animate-pulse rounded-md"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 2 */}
                <div className="bg-[var(--mode-bg-card)] border border-[var(--mode-border)] rounded-3xl p-6 space-y-6">
                    <div className="h-6 w-40 bg-white/10 animate-pulse rounded-md border-b border-white/5 pb-2"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="h-4 w-4 bg-white/5 animate-pulse rounded-md"></div>
                                <div className="w-12 h-12 rounded-xl bg-white/5 animate-pulse"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-28 bg-white/5 animate-pulse rounded-md"></div>
                                    <div className="h-3 w-40 bg-white/5 animate-pulse rounded-full"></div>
                                </div>
                                <div className="h-4 w-12 bg-white/10 animate-pulse rounded-md"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
