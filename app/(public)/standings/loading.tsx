export default function StandingsLoading() {
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

            {/* Table Container Skeleton */}
            <div className="bg-[var(--mode-bg-card)] border border-[var(--mode-border)] rounded-3xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <div className="h-6 w-48 bg-white/10 animate-pulse rounded-md"></div>
                    <div className="h-4 w-36 bg-white/5 animate-pulse rounded-full"></div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5 bg-black/10">
                                <th className="py-4 px-6 text-left"><div className="h-4 w-8 bg-white/10 animate-pulse rounded-md"></div></th>
                                <th className="py-4 px-6 text-left"><div className="h-4 w-32 bg-white/10 animate-pulse rounded-md"></div></th>
                                <th className="py-4 px-6 text-center"><div className="h-4 w-6 bg-white/10 animate-pulse rounded-md mx-auto"></div></th>
                                <th className="py-4 px-6 text-center"><div className="h-4 w-6 bg-white/10 animate-pulse rounded-md mx-auto"></div></th>
                                <th className="py-4 px-6 text-center"><div className="h-4 w-6 bg-white/10 animate-pulse rounded-md mx-auto"></div></th>
                                <th className="py-4 px-6 text-center"><div className="h-4 w-8 bg-white/10 animate-pulse rounded-md mx-auto"></div></th>
                                <th className="py-4 px-6 text-center"><div className="h-4 w-10 bg-white/10 animate-pulse rounded-md mx-auto"></div></th>
                                <th className="py-4 px-6 text-center"><div className="h-4 w-20 bg-white/10 animate-pulse rounded-md mx-auto"></div></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 text-left">
                                        <div className="h-4 w-4 bg-white/5 animate-pulse rounded-md"></div>
                                    </td>
                                    <td className="py-4 px-6 text-left">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 animate-pulse"></div>
                                            <div className="h-4 w-28 bg-white/5 animate-pulse rounded-md"></div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="h-4 w-4 bg-white/5 animate-pulse rounded-md mx-auto"></div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="h-4 w-4 bg-white/5 animate-pulse rounded-md mx-auto"></div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="h-4 w-4 bg-white/5 animate-pulse rounded-md mx-auto"></div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="h-4 w-6 bg-white/5 animate-pulse rounded-md mx-auto"></div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="h-5 w-10 bg-white/10 animate-pulse rounded-md mx-auto"></div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex justify-center gap-1">
                                            {[1, 2, 3, 4, 5].map((j) => (
                                                <div key={j} className="w-5 h-5 rounded-full bg-white/5 animate-pulse"></div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
