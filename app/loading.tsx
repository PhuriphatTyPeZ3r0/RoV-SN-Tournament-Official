export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 bg-[#0a1628]/90 flex flex-col items-center justify-center text-white backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                {/* Custom glowing spinner */}
                <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-cyan-aura animate-spin"></div>
                    <div className="absolute inset-0 rounded-full blur-sm border border-t-cyan-aura/60 animate-pulse opacity-40"></div>
                </div>
                <div className="font-display tracking-[0.2em] text-cyan-aura text-xs uppercase animate-pulse mt-2 font-bold">
                    Loading
                </div>
            </div>
        </div>
    );
}
