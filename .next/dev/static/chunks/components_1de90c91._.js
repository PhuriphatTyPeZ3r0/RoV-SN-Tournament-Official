(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/common/TeamLogo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeamLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16',
    xxl: 'w-24 h-24'
};
const sizePx = {
    sm: 24,
    md: 32,
    lg: 40,
    xl: 64,
    xxl: 96
};
function TeamLogo({ teamName, logoUrl, size = 'md' }) {
    _s();
    const [hasError, setHasError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sizeClass = sizeClasses[size] || sizeClasses.md;
    const sizePxValue = sizePx[size] || sizePx.md;
    if (!logoUrl || hasError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${sizeClass} bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "fas fa-shield-alt text-gray-400"
            }, void 0, false, {
                fileName: "[project]/components/common/TeamLogo.tsx",
                lineNumber: 36,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/common/TeamLogo.tsx",
            lineNumber: 35,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${sizeClass} relative flex-shrink-0`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: logoUrl,
            alt: teamName,
            width: sizePxValue,
            height: sizePxValue,
            className: "object-contain",
            onError: ()=>setHasError(true),
            unoptimized: true
        }, void 0, false, {
            fileName: "[project]/components/common/TeamLogo.tsx",
            lineNumber: 43,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/common/TeamLogo.tsx",
        lineNumber: 42,
        columnNumber: 9
    }, this);
}
_s(TeamLogo, "0lWSx5YqYPOl7PiOJe/TIAtHv6A=");
_c = TeamLogo;
var _c;
__turbopack_context__.k.register(_c, "TeamLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/stats/SeasonStatsContent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SeasonStatsContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$TeamLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/TeamLogo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/LanguageProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Helper: Format duration (seconds) to MM:SS
function formatDuration(seconds) {
    if (!seconds || seconds <= 0) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
function SeasonStatsContent({ seasonStats, heroes, teamLogos }) {
    _s();
    const { t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const isThai = language === 'th';
    const getHeroImage = (heroName)=>{
        const hero = heroes.find((h)=>h.name === heroName);
        return hero?.imageUrl || null;
    };
    if (!seasonStats) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl shadow-lg p-12 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "fas fa-chart-bar text-6xl text-gray-300 mb-4"
                }, void 0, false, {
                    fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                    lineNumber: 33,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 text-lg",
                    children: t.common.noData
                }, void 0, false, {
                    fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                    lineNumber: 34,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/stats/SeasonStatsContent.tsx",
            lineNumber: 32,
            columnNumber: 13
        }, this);
    }
    // Stat Cards Data
    const statCards = [
        {
            icon: 'fa-trophy',
            label: t.stats.totalMatches,
            value: seasonStats.totalMatches || 0,
            color: 'from-cyan-500 to-blue-600',
            bgColor: 'bg-gradient-to-br from-cyan-500/10 to-blue-600/10'
        },
        {
            icon: 'fa-gamepad',
            label: t.stats.totalGames,
            value: seasonStats.totalGames || 0,
            color: 'from-purple-500 to-pink-600',
            bgColor: 'bg-gradient-to-br from-purple-500/10 to-pink-600/10'
        },
        {
            icon: 'fa-clock',
            label: t.stats.avgGameTime,
            value: formatDuration(seasonStats.avgGameDuration),
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-gradient-to-br from-green-500/10 to-emerald-600/10'
        },
        {
            icon: 'fa-skull-crossbones',
            label: t.stats.bloodiestGame,
            value: seasonStats.highestKillGame?.kills || 0,
            subtext: seasonStats.highestKillGame?.match !== '-' ? `${seasonStats.highestKillGame?.match}` : null,
            color: 'from-red-500 to-orange-600',
            bgColor: 'bg-gradient-to-br from-red-500/10 to-orange-600/10'
        }
    ];
    // Highlight Cards (Players, Team, Hero)
    const highlightCards = [
        seasonStats.topMVPPlayer && {
            icon: 'fa-crown',
            title: t.stats.topMVP,
            name: seasonStats.topMVPPlayer.name,
            team: seasonStats.topMVPPlayer.team,
            value: `${seasonStats.topMVPPlayer.count} MVP`,
            color: 'from-yellow-400 to-amber-500'
        },
        seasonStats.topKillerPlayer && {
            icon: 'fa-crosshairs',
            title: t.stats.topKiller,
            name: seasonStats.topKillerPlayer.name,
            team: seasonStats.topKillerPlayer.team,
            value: `${seasonStats.topKillerPlayer.kills} Kills`,
            color: 'from-red-500 to-rose-600'
        },
        seasonStats.bestTeam && {
            icon: 'fa-users',
            title: t.stats.bestTeamWR,
            name: seasonStats.bestTeam.name,
            value: `${seasonStats.bestTeam.winRate}%`,
            subtext: `${seasonStats.bestTeam.wins}W / ${seasonStats.bestTeam.games}G`,
            color: 'from-cyan-400 to-blue-500',
            isTeam: true
        },
        seasonStats.mostPickedHero && {
            icon: 'fa-mask',
            title: t.stats.mostPickedHero,
            name: seasonStats.mostPickedHero.name,
            value: `${seasonStats.mostPickedHero.picks} ${t.stats.picksCount}`,
            subtext: `WR: ${seasonStats.mostPickedHero.winRate}%`,
            color: 'from-purple-500 to-violet-600',
            heroImage: getHeroImage(seasonStats.mostPickedHero.name)
        },
        seasonStats.bestWinRateHero && {
            icon: 'fa-star',
            title: t.stats.bestHeroWR,
            name: seasonStats.bestWinRateHero.name,
            value: `${seasonStats.bestWinRateHero.winRate}%`,
            subtext: `${seasonStats.bestWinRateHero.picks} ${t.stats.picksCount}`,
            color: 'from-emerald-500 to-green-600',
            heroImage: getHeroImage(seasonStats.bestWinRateHero.name)
        }
    ].filter(Boolean);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4",
                children: statCards.map((card, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${card.bgColor} rounded-xl p-4 md:p-5 border border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${card.color} text-white mb-3 shadow-lg`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: `fas ${card.icon} text-lg md:text-xl`
                                }, void 0, false, {
                                    fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                    lineNumber: 129,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                lineNumber: 128,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs md:text-sm text-gray-500 font-medium mb-1",
                                children: card.label
                            }, void 0, false, {
                                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                lineNumber: 131,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-2xl md:text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`,
                                children: card.value
                            }, void 0, false, {
                                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                lineNumber: 132,
                                columnNumber: 25
                            }, this),
                            card.subtext && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mt-1 truncate",
                                title: card.subtext,
                                children: card.subtext
                            }, void 0, false, {
                                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                lineNumber: 136,
                                columnNumber: 29
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                        lineNumber: 124,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                lineNumber: 122,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                children: highlightCards.map((card, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-xl p-4 md:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: `fas ${card.icon} text-white text-sm`
                                        }, void 0, false, {
                                            fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                            lineNumber: 152,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                        lineNumber: 151,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold text-gray-600",
                                        children: card.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                        lineNumber: 154,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                lineNumber: 150,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    card.heroImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: card.heroImage,
                                        alt: card.name,
                                        className: "w-12 h-12 rounded-lg border-2 border-gray-200 object-cover bg-gray-900"
                                    }, void 0, false, {
                                        fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                        lineNumber: 161,
                                        columnNumber: 33
                                    }, this) : card.isTeam ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$TeamLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        teamName: card.name,
                                        logoUrl: teamLogos[card.name],
                                        size: "lg"
                                    }, void 0, false, {
                                        fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                        lineNumber: 163,
                                        columnNumber: 33
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-12 h-12 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`,
                                        children: card.name?.charAt(0)?.toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                        lineNumber: 165,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-bold text-uefa-dark truncate text-lg",
                                                children: card.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                                lineNumber: 172,
                                                columnNumber: 33
                                            }, this),
                                            card.team && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 mt-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$TeamLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        teamName: card.team,
                                                        logoUrl: teamLogos[card.team],
                                                        size: "sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-500 truncate",
                                                        children: card.team
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                                lineNumber: 174,
                                                columnNumber: 37
                                            }, this),
                                            card.subtext && !card.team && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500",
                                                children: card.subtext
                                            }, void 0, false, {
                                                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                                lineNumber: 180,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                        lineNumber: 171,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `px-3 py-1.5 rounded-lg bg-gradient-to-br ${card.color} text-white font-bold text-sm shadow-md`,
                                        children: card.value
                                    }, void 0, false, {
                                        fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                        lineNumber: 185,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                lineNumber: 158,
                                columnNumber: 25
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                        lineNumber: 145,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                lineNumber: 143,
                columnNumber: 13
            }, this),
            seasonStats.longestGame && seasonStats.longestGame.duration > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-hourglass-half"
                            }, void 0, false, {
                                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                lineNumber: 198,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                            lineNumber: 197,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-amber-700 font-medium",
                                    children: t.stats.longestGame
                                }, void 0, false, {
                                    fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                    lineNumber: 201,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold text-amber-900",
                                    children: [
                                        formatDuration(seasonStats.longestGame.duration),
                                        " - ",
                                        seasonStats.longestGame.match
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                                    lineNumber: 202,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                            lineNumber: 200,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                    lineNumber: 196,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/stats/SeasonStatsContent.tsx",
                lineNumber: 195,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/stats/SeasonStatsContent.tsx",
        lineNumber: 120,
        columnNumber: 9
    }, this);
}
_s(SeasonStatsContent, "xPRXa+5YJbeTpOb7fTPpYarOwsc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = SeasonStatsContent;
var _c;
__turbopack_context__.k.register(_c, "SeasonStatsContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_1de90c91._.js.map