export default function BracketsLoading() {
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
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-24 bg-white/5 animate-pulse rounded-xl"></div>
                ))}
            </div>

            {/* Bracket Structure Skeleton */}
            <div className="overflow-x-auto pb-8 pt-4">
                <div className="min-w-[900px] flex justify-between items-stretch gap-12 px-4">
                    {/* Quarterfinals Round (4 Match Cards) */}
                    <div className="flex-1 flex flex-col justify-around gap-8">
                        <div className="h-5 w-24 bg-white/10 animate-pulse rounded-md mx-auto mb-2"></div>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-[var(--mode-bg-card)] border border-[var(--mode-border)] rounded-2xl p-4 space-y-3 shadow-md w-64 mx-auto">
                                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                    <div className="h-3 w-16 bg-white/5 animate-pulse rounded-full"></div>
                                    <div className="h-3 w-10 bg-white/5 animate-pulse rounded-full"></div>
                                </div>
                                <div className="space-y-2">
                                    {[1, 2].map((j) => (
                                        <div key={j} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-white/5 animate-pulse"></div>
                                                <div className="h-4 w-20 bg-white/5 animate-pulse rounded-md"></div>
                                            </div>
                                            <div className="h-4 w-4 bg-white/10 animate-pulse rounded-md"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Semifinals Round (2 Match Cards) */}
                    <div className="flex-1 flex flex-col justify-around gap-8">
                        <div className="h-5 w-24 bg-white/10 animate-pulse rounded-md mx-auto mb-2"></div>
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-[var(--mode-bg-card)] border border-[var(--mode-border)] rounded-2xl p-4 space-y-3 shadow-md w-64 mx-auto">
                                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                    <div className="h-3 w-16 bg-white/5 animate-pulse rounded-full"></div>
                                    <div className="h-3 w-10 bg-white/5 animate-pulse rounded-full"></div>
                                </div>
                                <div className="space-y-2">
                                    {[1, 2].map((j) => (
                                        <div key={j} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-white/5 animate-pulse"></div>
                                                <div className="h-4 w-20 bg-white/5 animate-pulse rounded-md"></div>
                                            </div>
                                            <div className="h-4 w-4 bg-white/10 animate-pulse rounded-md"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Finals Round (1 Match Card) */}
                    <div className="flex-1 flex flex-col justify-around gap-8">
                        <div className="h-5 w-24 bg-white/10 animate-pulse rounded-md mx-auto mb-2"></div>
                        <div className="bg-[var(--mode-bg-card)] border border-[var(--mode-border)] rounded-2xl p-4 space-y-3 shadow-md w-64 mx-auto border-theme-primary/30">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <div className="h-3 w-16 bg-white/5 animate-pulse rounded-full"></div>
                                <div className="h-3 w-10 bg-white/5 animate-pulse rounded-full"></div>
                            </div>
                            <div className="space-y-2">
                                {[1, 2].map((j) => (
                                    <div key={j} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-white/5 animate-pulse"></div>
                                            <div className="h-4 w-20 bg-white/5 animate-pulse rounded-md"></div>
                                        </div>
                                        <div className="h-4 w-4 bg-white/10 animate-pulse rounded-md"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
