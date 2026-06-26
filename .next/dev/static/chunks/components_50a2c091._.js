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
"[project]/components/common/ShareButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShareButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ShareButton({ title = 'RoV SN Tournament', url, className = '' }) {
    _s();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleShare = async ()=>{
        const shareUrl = url || (("TURBOPACK compile-time truthy", 1) ? window.location.href : "TURBOPACK unreachable");
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    url: shareUrl
                });
            } catch (err) {
                // User cancelled or share failed
                console.log('Share cancelled or failed:', err);
            }
        } else {
            // Fallback to clipboard
            try {
                await navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                setTimeout(()=>setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleShare,
        className: `flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs font-bold transition-all ${className}`,
        title: copied ? 'Copied!' : 'Share',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: `fas ${copied ? 'fa-check' : 'fa-share-alt'}`
            }, void 0, false, {
                fileName: "[project]/components/common/ShareButton.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            copied && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Copied!"
            }, void 0, false, {
                fileName: "[project]/components/common/ShareButton.tsx",
                lineNumber: 46,
                columnNumber: 24
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/common/ShareButton.tsx",
        lineNumber: 40,
        columnNumber: 9
    }, this);
}
_s(ShareButton, "NE86rL3vg4NVcTTWDavsT0hUBJs=");
_c = ShareButton;
var _c;
__turbopack_context__.k.register(_c, "ShareButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/common/SeasonSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SeasonSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function SeasonSelector({ tournaments, currentSeason }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSelect = (season)=>{
        const params = new URLSearchParams(searchParams.toString());
        params.set('season', season.toString());
        router.push(`${pathname}?${params.toString()}`);
        setIsOpen(false);
    };
    const selectedTournament = tournaments.find((t)=>t.season === currentSeason) || tournaments[0];
    if (tournaments.length <= 1) return null; // Hide if only 1 season exists
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-block text-left z-30 font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>setIsOpen(!isOpen),
                    className: "inline-flex justify-between items-center w-56 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-white/15 hover:border-cyan-aura/40 focus:outline-none focus:ring-2 focus:ring-cyan-aura focus:ring-offset-2 focus:ring-offset-uefa-dark transition-all duration-300 cursor-pointer",
                    "aria-expanded": "true",
                    "aria-haspopup": "true",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-trophy mr-2.5 text-cyan-aura text-xs"
                                }, void 0, false, {
                                    fileName: "[project]/components/common/SeasonSelector.tsx",
                                    lineNumber: 46,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate max-w-[150px]",
                                    children: selectedTournament ? selectedTournament.name : `Season ${currentSeason}`
                                }, void 0, false, {
                                    fileName: "[project]/components/common/SeasonSelector.tsx",
                                    lineNumber: 47,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/common/SeasonSelector.tsx",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: `fas fa-chevron-down ml-2 text-xs transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-aura' : 'text-white/60'}`
                        }, void 0, false, {
                            fileName: "[project]/components/common/SeasonSelector.tsx",
                            lineNumber: 49,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/common/SeasonSelector.tsx",
                    lineNumber: 38,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/common/SeasonSelector.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-10",
                        onClick: ()=>setIsOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/components/common/SeasonSelector.tsx",
                        lineNumber: 55,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-2xl bg-uefa-dark/95 backdrop-blur-lg border border-white/10 focus:outline-none z-20 overflow-hidden animate-zoom-in",
                        role: "menu",
                        "aria-orientation": "vertical",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-1 bg-gradient-to-b from-white/5 to-transparent",
                            role: "none",
                            children: tournaments.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleSelect(t.season),
                                    className: `w-full text-left px-4 py-3 text-sm transition-all flex items-center justify-between cursor-pointer ${t.season === currentSeason ? 'bg-cyan-aura/15 text-cyan-aura font-bold border-l-2 border-cyan-aura pl-3' : 'text-white/80 hover:bg-white/5 hover:text-white pl-4'}`,
                                    role: "menuitem",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: t.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/common/SeasonSelector.tsx",
                                            lineNumber: 76,
                                            columnNumber: 37
                                        }, this),
                                        t.season === currentSeason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-check text-xs text-cyan-aura"
                                        }, void 0, false, {
                                            fileName: "[project]/components/common/SeasonSelector.tsx",
                                            lineNumber: 78,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, t.id, true, {
                                    fileName: "[project]/components/common/SeasonSelector.tsx",
                                    lineNumber: 66,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/common/SeasonSelector.tsx",
                            lineNumber: 64,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/common/SeasonSelector.tsx",
                        lineNumber: 59,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/components/common/SeasonSelector.tsx",
        lineNumber: 36,
        columnNumber: 9
    }, this);
}
_s(SeasonSelector, "PGbxdJweUQSNJltY1h4jDjOfsic=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = SeasonSelector;
var _c;
__turbopack_context__.k.register(_c, "SeasonSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/brackets/BracketsContent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BracketsContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$TeamLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/TeamLogo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$ShareButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/ShareButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/LanguageProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$SeasonSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/SeasonSelector.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function BracketsContent({ matches, teamLogos, tournaments, currentSeason }) {
    _s();
    const { t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const isThai = language === 'th';
    const [activeStage, setActiveStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('semi');
    // 1. Group matches into Semi-Finals, Grand Final, and 3rd Place Match
    const semiFinals = matches.filter((m)=>m.match_day === 10 || m.match_day === 90);
    const grandFinal = matches.find((m)=>m.match_day === 11 || m.match_day === 91);
    const thirdPlace = matches.find((m)=>m.match_day === 12 || m.match_day === 92);
    // 2. Identify teams for Semi Finals
    const sf1 = semiFinals[0] || null;
    const sf2 = semiFinals[1] || null;
    // 3. Determine TBD display for Grand Final and 3rd Place if not yet created or completed
    const getWinnerName = (match, fallbackLabel)=>{
        if (!match) return fallbackLabel;
        if (match.winner_name) return match.winner_name;
        if (match.is_bye_win && match.team_blue_name) return match.team_blue_name;
        return fallbackLabel;
    };
    const getLoserName = (match, fallbackLabel)=>{
        if (!match) return fallbackLabel;
        if (match.loser_name) return match.loser_name;
        return fallbackLabel;
    };
    const sf1Winner = getWinnerName(sf1, t.brackets.sf1Winner);
    const sf2Winner = getWinnerName(sf2, t.brackets.sf2Winner);
    const sf1Loser = getLoserName(sf1, t.brackets.sf1Loser);
    const sf2Loser = getLoserName(sf2, t.brackets.sf2Loser);
    // Grand Final team displays
    const gfBlue = grandFinal ? grandFinal.team_blue_name : sf1Winner;
    const gfRed = grandFinal ? grandFinal.team_red_name : sf2Winner;
    // Third Place Match team displays
    const tpBlue = thirdPlace ? thirdPlace.team_blue_name : sf1Loser;
    const tpRed = thirdPlace ? thirdPlace.team_red_name : sf2Loser;
    // Determine champion
    let championName = null;
    if (grandFinal && grandFinal.winner_name) {
        championName = grandFinal.winner_name;
    } else if (grandFinal && grandFinal.is_bye_win) {
        championName = grandFinal.winner_name || grandFinal.team_blue_name;
    }
    // Determine 3rd Place Winner
    let thirdPlaceWinnerName = null;
    if (thirdPlace && thirdPlace.winner_name) {
        thirdPlaceWinnerName = thirdPlace.winner_name;
    } else if (thirdPlace && thirdPlace.is_bye_win) {
        thirdPlaceWinnerName = thirdPlace.winner_name || thirdPlace.team_blue_name;
    }
    const renderMatchCard = (match, roundTitle, defaultBlue = 'TBD', defaultRed = 'TBD', isGf = false, is3rd = false)=>{
        const teamBlue = match ? match.team_blue_name : defaultBlue;
        const teamRed = match ? match.team_red_name : defaultRed;
        const scoreBlue = match ? match.score_blue : 0;
        const scoreRed = match ? match.score_red : 0;
        const isPlayed = match ? match.score_blue !== 0 || match.score_red !== 0 || match.is_bye_win || match.winner_name : false;
        const blueWon = isPlayed && match && (match.winner_name === teamBlue || match.is_bye_win && match.winner_name === teamBlue);
        const redWon = isPlayed && match && (match.winner_name === teamRed || match.is_bye_win && match.winner_name === teamRed);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-[280px] sm:w-[320px] bg-white rounded-2xl shadow-md border overflow-hidden hover:shadow-xl transition-all duration-300 ${isGf ? 'border-2 border-cyan-aura shadow-cyan-aura/10 scale-105' : is3rd ? 'border border-amber-500/40 shadow-amber-500/5' : 'border-gray-100'}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `px-4 py-2 text-xs font-display font-bold uppercase tracking-wider text-center ${isGf ? 'bg-gradient-to-r from-cyan-dark to-cyan-aura text-white' : is3rd ? 'bg-gradient-to-r from-amber-600 to-amber-400 text-white' : 'bg-uefa-dark text-white'}`,
                    children: roundTitle
                }, void 0, false, {
                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                    lineNumber: 106,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3 space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex items-center justify-between p-2 rounded-lg transition-colors ${blueWon ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-transparent'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$TeamLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            teamName: teamBlue,
                                            logoUrl: teamLogos[teamBlue],
                                            size: "sm"
                                        }, void 0, false, {
                                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                                            lineNumber: 115,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-sm truncate font-medium ${blueWon ? 'text-green-700 font-bold' : 'text-gray-800'}`,
                                            children: teamBlue
                                        }, void 0, false, {
                                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                                            lineNumber: 116,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                    lineNumber: 114,
                                    columnNumber: 25
                                }, this),
                                isPlayed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-base font-display font-bold px-2 ${blueWon ? 'text-green-600' : 'text-gray-400'}`,
                                    children: scoreBlue
                                }, void 0, false, {
                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                    lineNumber: 121,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                            lineNumber: 113,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex items-center justify-between p-2 rounded-lg transition-colors ${redWon ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-transparent'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$TeamLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            teamName: teamRed,
                                            logoUrl: teamLogos[teamRed],
                                            size: "sm"
                                        }, void 0, false, {
                                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                                            lineNumber: 130,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-sm truncate font-medium ${redWon ? 'text-green-700 font-bold' : 'text-gray-800'}`,
                                            children: teamRed
                                        }, void 0, false, {
                                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                                            lineNumber: 131,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                    lineNumber: 129,
                                    columnNumber: 25
                                }, this),
                                isPlayed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-base font-display font-bold px-2 ${redWon ? 'text-green-600' : 'text-gray-400'}`,
                                    children: scoreRed
                                }, void 0, false, {
                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                    lineNumber: 136,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                            lineNumber: 128,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                    lineNumber: 111,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/brackets/BracketsContent.tsx",
            lineNumber: 104,
            columnNumber: 13
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-uefa-dark py-6 md:py-12 mb-8 shadow-lg border-b-4 border-cyan-aura",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl md:text-4xl font-display font-bold text-white uppercase tracking-wider truncate",
                                    children: t.nav.brackets
                                }, void 0, false, {
                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                    lineNumber: 152,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-cyan-aura/80 font-sans mt-1 text-xs md:text-base hidden sm:block",
                                    children: t.brackets.subtitle
                                }, void 0, false, {
                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                    lineNumber: 155,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                            lineNumber: 151,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 flex-shrink-0 ml-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$SeasonSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    tournaments: tournaments,
                                    currentSeason: currentSeason
                                }, void 0, false, {
                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                    lineNumber: 160,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$ShareButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    title: `${t.nav.brackets} - RoV SN Tournament`
                                }, void 0, false, {
                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                    lineNumber: 161,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                            lineNumber: 159,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                    lineNumber: 150,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/brackets/BracketsContent.tsx",
                lineNumber: 149,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4",
                children: semiFinals.length === 0 && !grandFinal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-lg p-12 text-center max-w-lg mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-sitemap text-6xl text-gray-300 mb-4"
                        }, void 0, false, {
                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                            lineNumber: 169,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 text-lg font-medium",
                            children: t.brackets.notReady
                        }, void 0, false, {
                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                            lineNumber: 170,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-400 text-sm mt-1",
                            children: t.brackets.waitAdmin
                        }, void 0, false, {
                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                            lineNumber: 171,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                    lineNumber: 168,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex md:hidden bg-white/60 p-1.5 rounded-2xl mb-8 border border-gray-200/50 shadow-sm backdrop-blur-md max-w-md mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveStage('semi'),
                                    className: `flex-1 py-3 text-xs font-bold font-display uppercase tracking-widest rounded-xl transition-all duration-300 ${activeStage === 'semi' ? 'bg-uefa-dark text-white shadow-md shadow-uefa-dark/15 scale-100' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-sitemap mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                                            lineNumber: 185,
                                            columnNumber: 33
                                        }, this),
                                        t.brackets.semiFinals
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                    lineNumber: 177,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveStage('finals'),
                                    className: `flex-1 py-3 text-xs font-bold font-display uppercase tracking-widest rounded-xl transition-all duration-300 ${activeStage === 'finals' ? 'bg-uefa-dark text-white shadow-md shadow-uefa-dark/15 scale-100' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-trophy mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                                            lineNumber: 196,
                                            columnNumber: 33
                                        }, this),
                                        t.brackets.finals
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                    lineNumber: 188,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                            lineNumber: 176,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full overflow-x-auto md:overflow-x-auto py-4 md:py-8 scrollbar-thin",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative px-4 md:px-8 py-4 min-w-0 md:min-w-[1200px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${activeStage === 'semi' ? 'flex' : 'hidden'} md:flex flex-col gap-16 justify-center py-4`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-center font-display font-bold text-gray-400 tracking-wider text-xs uppercase -mb-10",
                                                children: t.fixtures.semiFinal
                                            }, void 0, false, {
                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                lineNumber: 206,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group mt-6",
                                                children: [
                                                    renderMatchCard(sf1, t.brackets.sf1Title, 'TBD', 'TBD'),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-1/2 -right-12 w-12 h-0.5 bg-gray-200 group-hover:bg-cyan-aura/50 transition-colors z-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                        lineNumber: 213,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                lineNumber: 210,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group",
                                                children: [
                                                    renderMatchCard(sf2, t.brackets.sf2Title, 'TBD', 'TBD'),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-1/2 -right-12 w-12 h-0.5 bg-gray-200 group-hover:bg-cyan-aura/50 transition-colors z-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                lineNumber: 217,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                        lineNumber: 205,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden md:flex w-16 h-[440px] items-center justify-center relative",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "absolute inset-0 w-full h-full",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M 0 100 L 32 100 L 32 145 L 64 145",
                                                    fill: "none",
                                                    stroke: "#E2E8F0",
                                                    strokeWidth: "3",
                                                    className: "transition-all duration-300 hover:stroke-cyan-aura"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M 0 340 L 32 340 L 32 195 L 64 195",
                                                    fill: "none",
                                                    stroke: "#E2E8F0",
                                                    strokeWidth: "3",
                                                    className: "transition-all duration-300 hover:stroke-cyan-aura"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M 0 100 L 20 100 L 20 275 L 64 275",
                                                    fill: "none",
                                                    stroke: "#CBD5E1",
                                                    strokeWidth: "2",
                                                    strokeDasharray: "4 4",
                                                    className: "transition-all duration-300 hover:stroke-amber-500/50"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M 0 340 L 20 340 L 20 315 L 64 315",
                                                    fill: "none",
                                                    stroke: "#CBD5E1",
                                                    strokeWidth: "2",
                                                    strokeDasharray: "4 4",
                                                    className: "transition-all duration-300 hover:stroke-amber-500/50"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                                            lineNumber: 226,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                        lineNumber: 225,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${activeStage === 'finals' ? 'flex' : 'hidden'} md:flex flex-col gap-12 justify-center py-4`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-center font-display font-bold text-gray-400 tracking-wider text-xs uppercase mb-3",
                                                        children: t.fixtures.grandFinal
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 41
                                                    }, this),
                                                    renderMatchCard(grandFinal || null, t.fixtures.grandFinal, gfBlue, gfRed, true, false),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-[62%] -right-12 w-12 h-0.5 bg-cyan-aura/40 z-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                lineNumber: 266,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-center font-display font-bold text-gray-400 tracking-wider text-xs uppercase mb-3",
                                                        children: t.brackets.thirdPlace
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 41
                                                    }, this),
                                                    renderMatchCard(thirdPlace || null, t.brackets.thirdPlace, tpBlue, tpRed, false, true),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-[62%] -right-12 w-12 h-0.5 bg-amber-500/30 z-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                lineNumber: 276,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                        lineNumber: 264,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${activeStage === 'finals' ? 'flex' : 'hidden'} md:flex flex-col gap-8 justify-center py-4 pl-0 md:pl-4`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-[240px] p-6 rounded-3xl text-center border-2 transition-all duration-500 flex flex-col items-center justify-center gap-3 ${championName ? 'bg-gradient-to-b from-yellow-400/10 via-yellow-500/5 to-white border-yellow-400 shadow-xl shadow-yellow-500/10 scale-105' : 'bg-white border-dashed border-gray-300'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-14 h-14 rounded-full flex items-center justify-center ${championName ? 'bg-yellow-400 text-white animate-bounce' : 'bg-gray-100 text-gray-400'}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-trophy text-2xl"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-display font-bold uppercase tracking-wider text-xs text-gray-400",
                                                                children: t.brackets.champion
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                lineNumber: 295,
                                                                columnNumber: 45
                                                            }, this),
                                                            championName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-2 space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$TeamLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            teamName: championName,
                                                                            logoUrl: teamLogos[championName],
                                                                            size: "md"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                            lineNumber: 301,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                        lineNumber: 300,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-display font-bold text-lg text-yellow-600 tracking-wide uppercase drop-shadow-sm",
                                                                        children: championName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                        lineNumber: 303,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "inline-block bg-yellow-400/20 text-yellow-700 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest",
                                                                        children: "Winner"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                        lineNumber: 306,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                lineNumber: 299,
                                                                columnNumber: 49
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-400 text-xs italic mt-1",
                                                                children: t.brackets.awaitingChampion
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                lineNumber: 311,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                lineNumber: 289,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-[240px] p-5 rounded-3xl text-center border transition-all duration-500 flex flex-col items-center justify-center gap-3 ${thirdPlaceWinnerName ? 'bg-gradient-to-b from-amber-600/10 via-amber-700/5 to-white border-amber-600/60 shadow-lg scale-100' : 'bg-white border-dashed border-gray-200'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-10 h-10 rounded-full flex items-center justify-center ${thirdPlaceWinnerName ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-400'}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-medal text-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-display font-bold uppercase tracking-wider text-[10px] text-gray-400",
                                                                children: t.brackets.thirdPlaceTitle
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                lineNumber: 325,
                                                                columnNumber: 45
                                                            }, this),
                                                            thirdPlaceWinnerName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-1.5 space-y-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$TeamLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            teamName: thirdPlaceWinnerName,
                                                                            logoUrl: teamLogos[thirdPlaceWinnerName],
                                                                            size: "sm"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                            lineNumber: 331,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                        lineNumber: 330,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-display font-bold text-base text-amber-700 tracking-wide uppercase",
                                                                        children: thirdPlaceWinnerName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                        lineNumber: 333,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "inline-block bg-amber-600/20 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest",
                                                                        children: "Bronze"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                        lineNumber: 336,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 49
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-400 text-[10px] italic mt-1",
                                                                children: t.brackets.awaitingThirdPlace
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                                lineNumber: 319,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/brackets/BracketsContent.tsx",
                                        lineNumber: 287,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/brackets/BracketsContent.tsx",
                                lineNumber: 202,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/brackets/BracketsContent.tsx",
                            lineNumber: 201,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/components/brackets/BracketsContent.tsx",
                lineNumber: 166,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(BracketsContent, "aLzgZ9G3vZnKhMNBojViYjFkFfY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = BracketsContent;
var _c;
__turbopack_context__.k.register(_c, "BracketsContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_50a2c091._.js.map