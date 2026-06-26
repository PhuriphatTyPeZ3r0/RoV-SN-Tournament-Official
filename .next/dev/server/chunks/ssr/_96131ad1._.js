module.exports = [
"[project]/components/admin/GameStatsModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameStatsModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sweetalert2/dist/sweetalert2.esm.all.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/LanguageProvider.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function GameStatsModal({ isOpen, onClose, teamBlue, teamRed, gameNumber, initialData, onSave, allPlayers = [], allHeroes = [] }) {
    const { t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    // Filter Rosters for Autocomplete
    const blueRoster = allPlayers.filter((p)=>p.team === teamBlue);
    const redRoster = allPlayers.filter((p)=>p.team === teamRed);
    // Default structure: 5 players per team (includes hero and gold for GPM)
    const createEmptyPlayers = ()=>Array(5).fill(null).map(()=>({
                name: '',
                hero: '',
                k: 0,
                d: 0,
                a: 0,
                gold: 0
            }));
    const [bluePlayers, setBluePlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(createEmptyPlayers());
    const [redPlayers, setRedPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(createEmptyPlayers());
    const [winner, setWinner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mvp, setMvp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [heroPickerOpen, setHeroPickerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        team: null,
        index: null
    });
    const [heroSearch, setHeroSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const heroSearchRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // AI Stats Extraction Handler
    const handleAiUpload = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            // TODO: Re-implement using Supabase Edge Function for AI stats extraction
            // The legacy Express endpoint (/extract-rov-stats) has been removed.
            // For now, show a message to the user.
            const useAiEndpoint = process.env.NEXT_PUBLIC_AI_STATS_URL;
            if (!useAiEndpoint) {
                throw new Error(t.admin.gameStatsModal.aiNotAvailable);
            }
            const res = await fetch(useAiEndpoint, {
                method: 'POST',
                body: formData
            });
            if (!res.ok) throw new Error(t.admin.gameStatsModal.aiEndpointError);
            const aiData = await res.json();
            console.log('🤖 AI Extracted Data:', aiData);
            if (!Array.isArray(aiData) || aiData.length === 0) {
                throw new Error(t.admin.gameStatsModal.aiNoPlayerData);
            }
            // --- Intelligent Mapping Logic ---
            // Helper to normalize strings
            const normalize = (str)=>str ? str.toLowerCase().replace(/[^a-z0-9\u0E00-\u0E7F]/g, '') : '';
            // Helper to match hero name from DB
            const matchHero = (aiHeroName)=>{
                if (!aiHeroName) return '';
                const normAi = normalize(aiHeroName);
                // 1. Exact Name Match
                const exact = allHeroes.find((h)=>normalize(h.name) === normAi);
                if (exact) return exact.name;
                // 2. Flexible Match (Partial string)
                const partial = allHeroes.find((h)=>{
                    const normDb = normalize(h.name);
                    return normDb.length > 2 && (normAi.includes(normDb) || normDb.includes(normAi));
                });
                if (partial) return partial.name;
                return '';
            };
            // Helper to find a player in a roster
            const findPlayerInRoster = (aiName, roster)=>{
                return roster.find((r)=>{
                    const nAi = normalize(aiName);
                    const nInGame = normalize(r.inGameName || '');
                    const nReal = normalize(r.name);
                    // Loose matching
                    return nInGame && (nInGame === nAi || nInGame.includes(nAi) || nAi.includes(nInGame)) || nReal && (nReal === nAi || nReal.includes(nAi) || nAi.includes(nReal));
                });
            };
            // 1. Split AI Data into two groups (Top/Bottom or Left/Right)
            // Assuming 10 players, first 5 are Team A, next 5 are Team B
            let groupA = aiData.slice(0, 5);
            let groupB = aiData.slice(5, 10);
            // 2. Auto-Detect Side based on Roster Matching Score
            const calculateScore = (group, roster)=>{
                return group.reduce((score, player)=>{
                    return score + (findPlayerInRoster(player.name, roster) ? 1 : 0);
                }, 0);
            };
            const scoreA_Blue = calculateScore(groupA, blueRoster);
            const scoreA_Red = calculateScore(groupA, redRoster);
            const scoreB_Blue = calculateScore(groupB, blueRoster);
            const scoreB_Red = calculateScore(groupB, redRoster);
            console.log(`Team Matching Scores: A-Blue=${scoreA_Blue}, A-Red=${scoreA_Red}, B-Blue=${scoreB_Blue}, B-Red=${scoreB_Red}`);
            // Decision Logic:
            // If Group A matches Red better than Blue, OR Group B matches Blue better than Red -> SWAP
            // (Default: Group A = Blue, Group B = Red)
            let finalBlueGroup = groupA;
            let finalRedGroup = groupB;
            if (scoreA_Red > scoreA_Blue || scoreB_Blue > scoreB_Red) {
                console.log("🔄 Auto-swapping teams based on roster match!");
                finalBlueGroup = groupB;
                finalRedGroup = groupA;
            }
            // 3. Map Data to Form (Strict Mode)
            const mapStats = (aiGroup, targetRoster)=>{
                const newSlots = createEmptyPlayers();
                aiGroup.forEach((aiPlayer, index)=>{
                    if (index >= 5) return;
                    const rosterMatch = findPlayerInRoster(aiPlayer.name, targetRoster);
                    // IF Match Found -> Use Exact Name from Roster
                    // IF Not Found -> Empty String (User must select from dropdown)
                    const finalName = rosterMatch ? rosterMatch.inGameName || rosterMatch.name : '';
                    const finalHero = matchHero(aiPlayer.hero);
                    newSlots[index] = {
                        name: finalName,
                        hero: finalHero,
                        k: aiPlayer.k || 0,
                        d: aiPlayer.d || 0,
                        a: aiPlayer.a || 0,
                        gold: aiPlayer.gold || 0
                    };
                });
                return newSlots;
            };
            setBluePlayers(mapStats(finalBlueGroup, blueRoster));
            setRedPlayers(mapStats(finalRedGroup, redRoster));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire(t.admin.gameStatsModal.successTitle, t.admin.gameStatsModal.aiSuccessText.replace('{count}', aiData.length.toString()), 'success');
        } catch (error) {
            console.error('AI Error:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire(t.admin.gameStatsModal.errorTitle, t.admin.gameStatsModal.aiErrorText.replace('{error}', error.message || 'Unknown error'), 'error');
        } finally{
            setUploading(false);
            // Reset file input
            e.target.value = '';
        }
    };
    // Reset state when modal opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            setBluePlayers(initialData?.blue && initialData?.blue.length === 5 ? [
                ...initialData.blue
            ] : createEmptyPlayers());
            setRedPlayers(initialData?.red && initialData?.red.length === 5 ? [
                ...initialData.red
            ] : createEmptyPlayers());
            setWinner(initialData?.winner || null);
            setMvp(initialData?.mvp || '');
            setDuration(initialData?.duration || '');
        }
    }, [
        isOpen,
        initialData
    ]);
    // Focus search input when hero picker opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (heroPickerOpen.open && heroSearchRef.current) {
            setTimeout(()=>heroSearchRef.current?.focus(), 100);
        }
    }, [
        heroPickerOpen.open
    ]);
    const handleBlueChange = (index, field, value)=>{
        setBluePlayers((prev)=>{
            const newPlayers = [
                ...prev
            ];
            newPlayers[index] = {
                ...newPlayers[index],
                [field]: value
            };
            return newPlayers;
        });
    };
    const handleRedChange = (index, field, value)=>{
        setRedPlayers((prev)=>{
            const newPlayers = [
                ...prev
            ];
            newPlayers[index] = {
                ...newPlayers[index],
                [field]: value
            };
            return newPlayers;
        });
    };
    const handleSave = ()=>{
        onSave({
            blue: bluePlayers,
            red: redPlayers,
            winner: winner || undefined,
            mvp,
            duration
        });
        onClose();
    };
    // Open hero picker
    const openHeroPicker = (team, index)=>{
        setHeroPickerOpen({
            open: true,
            team,
            index
        });
        setHeroSearch('');
    };
    // Select hero
    const selectHero = (heroName)=>{
        if (heroPickerOpen.team === 'blue' && heroPickerOpen.index !== null) {
            handleBlueChange(heroPickerOpen.index, 'hero', heroName);
        } else if (heroPickerOpen.team === 'red' && heroPickerOpen.index !== null) {
            handleRedChange(heroPickerOpen.index, 'hero', heroName);
        }
        setHeroPickerOpen({
            open: false,
            team: null,
            index: null
        });
    };
    // Get hero image URL
    const getHeroImage = (heroName)=>{
        const hero = allHeroes.find((h)=>h.name === heroName);
        return hero?.imageUrl;
    };
    // Filter heroes by search
    const filteredHeroes = allHeroes.filter((h)=>h.name.toLowerCase().includes(heroSearch.toLowerCase()));
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl w-full max-w-7xl p-6 shadow-2xl m-4 animate-fade-in relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                        id: "roster-blue",
                        children: blueRoster.map((p)=>{
                            const val = p.inGameName || p.name;
                            const label = p.inGameName ? `(${p.name})` : '';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: val,
                                children: label
                            }, p._id, false, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 308,
                                columnNumber: 32
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                        lineNumber: 304,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                        id: "roster-red",
                        children: redRoster.map((p)=>{
                            const val = p.inGameName || p.name;
                            const label = p.inGameName ? `(${p.name})` : '';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: val,
                                children: label
                            }, p._id, false, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 315,
                                columnNumber: 32
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                        lineNumber: 311,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-6 border-b pb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold font-display text-uefa-dark flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-chart-bar text-cyan-aura"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                lineNumber: 322,
                                                columnNumber: 29
                                            }, this),
                                            t.admin.gameStatsModal.title,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-400 text-lg",
                                                children: "|"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                lineNumber: 323,
                                                columnNumber: 60
                                            }, this),
                                            " ",
                                            t.admin.gameStatsModal.gameNumber,
                                            " ",
                                            gameNumber
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 321,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                id: "ai-upload",
                                                className: "hidden",
                                                accept: "image/*",
                                                onChange: handleAiUpload,
                                                disabled: uploading
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                lineNumber: 328,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "ai-upload",
                                                className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold cursor-pointer transition-all shadow-sm ${uploading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-md hover:scale-105'}`,
                                                children: uploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-spinner fa-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 39
                                                        }, this),
                                                        " ",
                                                        t.admin.gameStatsModal.aiAnalyzing
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-magic"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 39
                                                        }, this),
                                                        " ",
                                                        t.admin.gameStatsModal.aiAutofill
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                lineNumber: 336,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 327,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 320,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "text-gray-400 hover:text-red-500 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-times text-2xl"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                    lineNumber: 353,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 352,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                        lineNumber: 319,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 flex flex-wrap gap-6 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-gray-700",
                                        children: [
                                            t.admin.gameStatsModal.winnerTeam,
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 361,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: `cursor-pointer px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2 ${winner === 'blue' ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: "gameWinner",
                                                className: "hidden",
                                                checked: winner === 'blue',
                                                onChange: ()=>setWinner('blue')
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                lineNumber: 363,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `w-3 h-3 rounded-full ${winner === 'blue' ? 'bg-blue-500' : 'bg-gray-300'}`
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                lineNumber: 364,
                                                columnNumber: 29
                                            }, this),
                                            teamBlue
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 362,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: `cursor-pointer px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2 ${winner === 'red' ? 'bg-red-50 border-red-500 text-red-700 font-bold' : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: "gameWinner",
                                                className: "hidden",
                                                checked: winner === 'red',
                                                onChange: ()=>setWinner('red')
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                lineNumber: 368,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `w-3 h-3 rounded-full ${winner === 'red' ? 'bg-red-500' : 'bg-gray-300'}`
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                lineNumber: 369,
                                                columnNumber: 29
                                            }, this),
                                            teamRed
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 367,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 360,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center gap-2 transition-opacity ${winner ? 'opacity-100' : 'opacity-50 pointer-events-none'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-gray-700",
                                        children: "MVP:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 376,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: mvp,
                                        onChange: (e)=>setMvp(e.target.value),
                                        disabled: !winner,
                                        className: "border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-aura focus:border-transparent outline-none bg-white min-w-[200px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: t.admin.gameStatsModal.selectMvp
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                lineNumber: 383,
                                                columnNumber: 29
                                            }, this),
                                            (winner === 'blue' ? blueRoster : winner === 'red' ? redRoster : []).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: p.name,
                                                    children: [
                                                        p.name,
                                                        " ",
                                                        p.inGameName ? `(${p.inGameName})` : ''
                                                    ]
                                                }, p._id, true, {
                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                    lineNumber: 385,
                                                    columnNumber: 33
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 377,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 375,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 ml-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-gray-700",
                                        children: [
                                            t.admin.gameStatsModal.duration,
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 396,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "MM:SS",
                                        value: duration,
                                        onChange: (e)=>setDuration(e.target.value),
                                        className: "border border-gray-300 rounded-lg px-3 py-2 w-24 text-center focus:ring-2 focus:ring-cyan-aura focus:border-transparent outline-none font-mono"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 397,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 395,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                        lineNumber: 358,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid xl:grid-cols-2 gap-8 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-bold text-xl text-blue-600 mb-4 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-3 h-3 bg-blue-500 rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                lineNumber: 411,
                                                columnNumber: 29
                                            }, this),
                                            teamBlue
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 410,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-x-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "text-gray-500 border-b border-blue-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-2 text-center w-12",
                                                                children: t.stats.heroes
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                lineNumber: 418,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-2 text-left w-32",
                                                                children: t.admin.gameStatsModal.playerName
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                lineNumber: 419,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-2 text-center text-green-600",
                                                                children: "K"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                lineNumber: 420,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-2 text-center text-red-500",
                                                                children: "D"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                lineNumber: 421,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-2 text-center text-blue-500",
                                                                children: "A"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                lineNumber: 422,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    className: "divide-y divide-blue-100",
                                                    children: bluePlayers.map((player, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "border-b hover:bg-gray-50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>openHeroPicker('blue', i),
                                                                        className: `w-10 h-10 rounded-lg border-2 overflow-hidden transition-all hover:scale-105 ${player.hero ? 'border-cyan-aura' : 'border-gray-300 border-dashed bg-gray-100'}`,
                                                                        title: player.hero || t.admin.gameStatsModal.selectHero,
                                                                        children: player.hero && getHeroImage(player.hero) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: getHeroImage(player.hero),
                                                                            alt: player.hero,
                                                                            className: "w-full h-full object-cover"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                            lineNumber: 436,
                                                                            columnNumber: 57
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "fas fa-plus text-gray-400 text-xs"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                            lineNumber: 442,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                        lineNumber: 429,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                    lineNumber: 428,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        list: "roster-blue",
                                                                        placeholder: `${t.admin.gameStatsModal.playerPlaceholder} ${i + 1}`,
                                                                        value: player.name,
                                                                        onChange: (e)=>handleBlueChange(i, 'name', e.target.value),
                                                                        className: "w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-cyan-aura focus:outline-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                        lineNumber: 447,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                    lineNumber: 446,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "0",
                                                                        className: "w-14 px-1 py-1 border border-gray-300 rounded text-center focus:border-cyan-aura focus:outline-none",
                                                                        value: player.k,
                                                                        onChange: (e)=>handleBlueChange(i, 'k', parseInt(e.target.value) || 0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                        lineNumber: 457,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                    lineNumber: 456,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "0",
                                                                        className: "w-14 px-1 py-1 border border-gray-300 rounded text-center focus:border-cyan-aura focus:outline-none",
                                                                        value: player.d,
                                                                        onChange: (e)=>handleBlueChange(i, 'd', parseInt(e.target.value) || 0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                        lineNumber: 461,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                    lineNumber: 460,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "0",
                                                                        className: "w-14 px-1 py-1 border border-gray-300 rounded text-center focus:border-cyan-aura focus:outline-none",
                                                                        value: player.a,
                                                                        onChange: (e)=>handleBlueChange(i, 'a', parseInt(e.target.value) || 0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                        lineNumber: 465,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                    lineNumber: 464,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, `blue-${i}`, true, {
                                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                            lineNumber: 427,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                    lineNumber: 425,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                            lineNumber: 415,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 414,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 409,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-red-50/50 p-4 rounded-xl border border-red-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-bold text-xl text-red-600 mb-4 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-3 h-3 bg-red-500 rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                lineNumber: 478,
                                                columnNumber: 29
                                            }, this),
                                            teamRed
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 477,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-x-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "text-gray-500 border-b border-red-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-2 text-center w-12",
                                                                children: t.stats.heroes
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                lineNumber: 485,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-2 text-left w-32",
                                                                children: t.admin.gameStatsModal.playerName
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                lineNumber: 486,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-2 text-center text-green-600",
                                                                children: "K"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                lineNumber: 487,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-2 text-center text-red-500",
                                                                children: "D"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                lineNumber: 488,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-2 text-center text-blue-500",
                                                                children: "A"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                lineNumber: 489,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                    lineNumber: 483,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    className: "divide-y divide-red-100",
                                                    children: redPlayers.map((player, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "border-b hover:bg-gray-50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>openHeroPicker('red', i),
                                                                        className: `w-10 h-10 rounded-lg border-2 overflow-hidden transition-all hover:scale-105 ${player.hero ? 'border-cyan-aura' : 'border-gray-300 border-dashed bg-gray-100'}`,
                                                                        title: player.hero || t.admin.gameStatsModal.selectHero,
                                                                        children: player.hero && getHeroImage(player.hero) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: getHeroImage(player.hero),
                                                                            alt: player.hero,
                                                                            className: "w-full h-full object-cover"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                            lineNumber: 503,
                                                                            columnNumber: 57
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "fas fa-plus text-gray-400 text-xs"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                            lineNumber: 509,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                        lineNumber: 496,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                    lineNumber: 495,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        list: "roster-red",
                                                                        placeholder: `${t.admin.gameStatsModal.playerPlaceholder} ${i + 1}`,
                                                                        value: player.name,
                                                                        onChange: (e)=>handleRedChange(i, 'name', e.target.value),
                                                                        className: "w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-cyan-aura focus:outline-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                        lineNumber: 514,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                    lineNumber: 513,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "0",
                                                                        className: "w-14 px-1 py-1 border border-gray-300 rounded text-center focus:border-cyan-aura focus:outline-none",
                                                                        value: player.k,
                                                                        onChange: (e)=>handleRedChange(i, 'k', parseInt(e.target.value) || 0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                        lineNumber: 524,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                    lineNumber: 523,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "0",
                                                                        className: "w-14 px-1 py-1 border border-gray-300 rounded text-center focus:border-cyan-aura focus:outline-none",
                                                                        value: player.d,
                                                                        onChange: (e)=>handleRedChange(i, 'd', parseInt(e.target.value) || 0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                        lineNumber: 528,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                    lineNumber: 527,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "0",
                                                                        className: "w-14 px-1 py-1 border border-gray-300 rounded text-center focus:border-cyan-aura focus:outline-none",
                                                                        value: player.a,
                                                                        onChange: (e)=>handleRedChange(i, 'a', parseInt(e.target.value) || 0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                        lineNumber: 532,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                                    lineNumber: 531,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, `red-${i}`, true, {
                                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                            lineNumber: 482,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 481,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 476,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                        lineNumber: 407,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end gap-3 mt-6 border-t pt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "px-6 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-bold transition-colors",
                                children: t.admin.gameStatsModal.cancel
                            }, void 0, false, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 544,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSave,
                                className: "px-6 py-2.5 bg-gradient-to-r from-cyan-aura to-blue-600 text-white rounded-lg font-bold shadow-lg hover:shadow-cyan-aura/50 transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-save mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 554,
                                        columnNumber: 41
                                    }, this),
                                    t.admin.gameStatsModal.saveConfirm
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 550,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                        lineNumber: 543,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/GameStatsModal.tsx",
                lineNumber: 302,
                columnNumber: 13
            }, this),
            heroPickerOpen.open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/50",
                onClick: ()=>setHeroPickerOpen({
                        open: false,
                        team: null,
                        index: null
                    }),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl w-full max-w-2xl p-6 shadow-2xl m-4 max-h-[80vh] flex flex-col",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-xl font-bold text-gray-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-mask mr-2 text-cyan-aura"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                            lineNumber: 566,
                                            columnNumber: 33
                                        }, this),
                                        t.admin.gameStatsModal.selectHero
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                    lineNumber: 565,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setHeroPickerOpen({
                                            open: false,
                                            team: null,
                                            index: null
                                        }),
                                    className: "text-gray-400 hover:text-gray-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-times text-xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 573,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                    lineNumber: 569,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                            lineNumber: 564,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                    lineNumber: 579,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: heroSearchRef,
                                    type: "text",
                                    placeholder: t.admin.gameStatsModal.heroSearchPlaceholder,
                                    value: heroSearch,
                                    onChange: (e)=>setHeroSearch(e.target.value),
                                    className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                                    lineNumber: 580,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                            lineNumber: 578,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-y-auto flex-1",
                            children: allHeroes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-8 text-gray-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-ghost text-4xl mb-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 594,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: t.admin.gameStatsModal.noHeroes
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 595,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm",
                                        children: t.admin.gameStatsModal.uploadHeroHint
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 596,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 593,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-6 md:grid-cols-8 gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>selectHero(''),
                                        className: "aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-red-400 hover:bg-red-50 transition",
                                        title: t.admin.gameStatsModal.noHeroSelected,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-times text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                            lineNumber: 606,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/GameStatsModal.tsx",
                                        lineNumber: 601,
                                        columnNumber: 37
                                    }, this),
                                    filteredHeroes.map((hero)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>selectHero(hero.name),
                                            className: "aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-cyan-aura hover:scale-105 transition-all",
                                            title: hero.name,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: hero.imageUrl,
                                                alt: hero.name,
                                                className: "w-full h-full object-cover",
                                                onError: (e)=>{
                                                    const target = e.target;
                                                    target.src = 'https://via.placeholder.com/60?text=' + encodeURIComponent(hero.name);
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                                lineNumber: 615,
                                                columnNumber: 45
                                            }, this)
                                        }, hero._id, false, {
                                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                                            lineNumber: 609,
                                            columnNumber: 41
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/GameStatsModal.tsx",
                                lineNumber: 599,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/admin/GameStatsModal.tsx",
                            lineNumber: 591,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/GameStatsModal.tsx",
                    lineNumber: 563,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/admin/GameStatsModal.tsx",
                lineNumber: 562,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/GameStatsModal.tsx",
        lineNumber: 301,
        columnNumber: 9
    }, this);
}
}),
"[project]/features/tournament/data:490991 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMatchesAction",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"4082bf5df3c99cfc52ed643b231ce143be05e0e6ed":"getMatchesAction"},"features/tournament/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("4082bf5df3c99cfc52ed643b231ce143be05e0e6ed", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getMatchesAction");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHNlcnZlcic7XHJcblxyXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAL3V0aWxzL3N1cGFiYXNlL3NlcnZlcic7XHJcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XHJcbmltcG9ydCB7IGNoZWNrUm9sZSB9IGZyb20gJ0AvdXRpbHMvYXV0aCc7XHJcbmltcG9ydCB7IHogfSBmcm9tICd6b2QnO1xyXG5cclxuLyoqXHJcbiAqIFRvdXJuYW1lbnQgQ29yZSBTZXJ2ZXIgQWN0aW9uc1xyXG4gKiBSZXBsYWNlczogcmVzdWx0Q29udHJvbGxlci50cyArIHNjaGVkdWxlQ29udHJvbGxlci50c1xyXG4gKiBIYW5kbGVzOiBtYXRjaGVzLCBzY2hlZHVsZXMsIG1hdGNoIHJlc3VsdHMgQ1JVRFxyXG4gKi9cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gUkVBRCBPcGVyYXRpb25zIChQdWJsaWMpXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRNYXRjaGVzQWN0aW9uKHRvdXJuYW1lbnRJZDogc3RyaW5nKSB7XHJcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ21hdGNoZXMnKVxyXG4gICAgLnNlbGVjdCgnKicpXHJcbiAgICAuZXEoJ3RvdXJuYW1lbnRfaWQnLCB0b3VybmFtZW50SWQpXHJcbiAgICAub3JkZXIoJ21hdGNoX2RheScsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xyXG5cclxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIG1hdGNoZXM6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE1hdGNoQnlLZXlBY3Rpb24obWF0Y2hLZXk6IHN0cmluZykge1xyXG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCdtYXRjaGVzJylcclxuICAgIC5zZWxlY3QoJyosIG1hdGNoX2dhbWVzKCopJylcclxuICAgIC5lcSgnbWF0Y2hfa2V5JywgbWF0Y2hLZXkpXHJcbiAgICAuc2luZ2xlKCk7XHJcblxyXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggbWF0Y2g6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNjaGVkdWxlQWN0aW9uKHRvdXJuYW1lbnRJZDogc3RyaW5nKSB7XHJcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ3NjaGVkdWxlcycpXHJcbiAgICAuc2VsZWN0KCcqJylcclxuICAgIC5lcSgndG91cm5hbWVudF9pZCcsIHRvdXJuYW1lbnRJZClcclxuICAgIC5vcmRlcignY3JlYXRlZF9hdCcsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxyXG4gICAgLmxpbWl0KDEpXHJcbiAgICAuc2luZ2xlKCk7XHJcblxyXG4gIGlmIChlcnJvciAmJiBlcnJvci5jb2RlICE9PSAnUEdSU1QxMTYnKSB7XHJcbiAgICAvLyBQR1JTVDExNiA9IG5vIHJvd3MgZm91bmQg4oCUIOC5hOC4oeC5iOC4luC4t+C4reC5gOC4m+C5h+C4mSBlcnJvclxyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggc2NoZWR1bGU6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICB9XHJcbiAgcmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRNYXRjaFN0YXRzQWN0aW9uKG1hdGNoSWQ6IHN0cmluZykge1xyXG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCdnYW1lX3N0YXRzJylcclxuICAgIC5zZWxlY3QoJyonKVxyXG4gICAgLmVxKCdtYXRjaF9pZCcsIG1hdGNoSWQpXHJcbiAgICAub3JkZXIoJ2dhbWVfbnVtYmVyJywgeyBhc2NlbmRpbmc6IHRydWUgfSlcclxuICAgIC5vcmRlcigndGVhbV9uYW1lJywgeyBhc2NlbmRpbmc6IHRydWUgfSk7XHJcblxyXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggbWF0Y2ggc3RhdHM6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFJlc3VsdEhpc3RvcnlBY3Rpb24obWF0Y2hLZXk/OiBzdHJpbmcpIHtcclxuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICBsZXQgcXVlcnkgPSBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ2F1ZGl0X2xvZ3MnKVxyXG4gICAgLnNlbGVjdChgXHJcbiAgICAgICosXHJcbiAgICAgIGFjdG9yOnByb2ZpbGVzIWFjdG9yX2lkKHVzZXJuYW1lKVxyXG4gICAgYClcclxuICAgIC5lcSgndGFibGVfbmFtZScsICdtYXRjaGVzJylcclxuICAgIC5vcmRlcignY3JlYXRlZF9hdCcsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxyXG4gICAgLmxpbWl0KDEwMCk7XHJcblxyXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHF1ZXJ5O1xyXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggaGlzdG9yeTogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gIHJldHVybiBkYXRhO1xyXG59XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFdSSVRFIE9wZXJhdGlvbnMgKEFkbWluIE9ubHkpXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vIEhlbHBlcjogdmVyaWZ5IGFkbWluIHNlc3Npb25cclxuYXN5bmMgZnVuY3Rpb24gcmVxdWlyZUFkbWluKCkge1xyXG4gIGNvbnN0IHsgdXNlciB9ID0gYXdhaXQgY2hlY2tSb2xlKFsnYWRtaW4nLCAnc3VwZXJfYWRtaW4nXSk7XHJcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICByZXR1cm4geyBzdXBhYmFzZSwgdXNlciB9O1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZU1hdGNoUmVzdWx0QWN0aW9uKHJlc3VsdERhdGE6IHtcclxuICB0b3VybmFtZW50SWQ6IHN0cmluZztcclxuICBtYXRjaERheTogbnVtYmVyO1xyXG4gIHRlYW1CbHVlTmFtZTogc3RyaW5nO1xyXG4gIHRlYW1SZWROYW1lOiBzdHJpbmc7XHJcbiAgc2NvcmVCbHVlOiBudW1iZXI7XHJcbiAgc2NvcmVSZWQ6IG51bWJlcjtcclxuICBnYW1lRGV0YWlscz86IHsgZ2FtZU51bWJlcjogbnVtYmVyOyB3aW5uZXJOYW1lOiBzdHJpbmc7IGR1cmF0aW9uPzogbnVtYmVyIH1bXTtcclxuICBpc0J5ZVdpbj86IGJvb2xlYW47XHJcbiAgd2lubmVyPzogc3RyaW5nO1xyXG59KSB7XHJcbiAgY29uc3QgeyBzdXBhYmFzZSwgdXNlciB9ID0gYXdhaXQgcmVxdWlyZUFkbWluKCk7XHJcblxyXG4gIGNvbnN0IHRlYW1CbHVlID0gcmVzdWx0RGF0YS50ZWFtQmx1ZU5hbWUudHJpbSgpO1xyXG4gIGNvbnN0IHRlYW1SZWQgPSByZXN1bHREYXRhLnRlYW1SZWROYW1lLnRyaW0oKTtcclxuICBjb25zdCBtYXRjaEtleSA9IGAke3Jlc3VsdERhdGEubWF0Y2hEYXl9XyR7dGVhbUJsdWV9X3ZzXyR7dGVhbVJlZH1gLnJlcGxhY2UoL1xccysvZywgJycpO1xyXG5cclxuICAvLyBEZXRlcm1pbmUgd2lubmVyL2xvc2VyXHJcbiAgbGV0IHdpbm5lck5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG4gIGxldCBsb3Nlck5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG5cclxuICBpZiAocmVzdWx0RGF0YS5pc0J5ZVdpbikge1xyXG4gICAgd2lubmVyTmFtZSA9IHJlc3VsdERhdGEud2lubmVyIHx8IHRlYW1CbHVlO1xyXG4gICAgbG9zZXJOYW1lID0gd2lubmVyTmFtZSA9PT0gdGVhbUJsdWUgPyB0ZWFtUmVkIDogdGVhbUJsdWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmIChyZXN1bHREYXRhLnNjb3JlQmx1ZSA+IHJlc3VsdERhdGEuc2NvcmVSZWQpIHtcclxuICAgICAgd2lubmVyTmFtZSA9IHRlYW1CbHVlO1xyXG4gICAgICBsb3Nlck5hbWUgPSB0ZWFtUmVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2lubmVyTmFtZSA9IHRlYW1SZWQ7XHJcbiAgICAgIGxvc2VyTmFtZSA9IHRlYW1CbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQ2hlY2sgZXhpc3RpbmcgZm9yIGF1ZGl0IHRyYWlsXHJcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCdtYXRjaGVzJylcclxuICAgIC5zZWxlY3QoJyonKVxyXG4gICAgLmVxKCdtYXRjaF9rZXknLCBtYXRjaEtleSlcclxuICAgIC5tYXliZVNpbmdsZSgpO1xyXG5cclxuICBjb25zdCBtYXRjaFBheWxvYWQgPSB7XHJcbiAgICB0b3VybmFtZW50X2lkOiByZXN1bHREYXRhLnRvdXJuYW1lbnRJZCxcclxuICAgIG1hdGNoX2tleTogbWF0Y2hLZXksXHJcbiAgICBtYXRjaF9kYXk6IHJlc3VsdERhdGEubWF0Y2hEYXksXHJcbiAgICB0ZWFtX2JsdWVfbmFtZTogdGVhbUJsdWUsXHJcbiAgICB0ZWFtX3JlZF9uYW1lOiB0ZWFtUmVkLFxyXG4gICAgc2NvcmVfYmx1ZTogcmVzdWx0RGF0YS5zY29yZUJsdWUsXHJcbiAgICBzY29yZV9yZWQ6IHJlc3VsdERhdGEuc2NvcmVSZWQsXHJcbiAgICB3aW5uZXJfbmFtZTogd2lubmVyTmFtZSxcclxuICAgIGxvc2VyX25hbWU6IGxvc2VyTmFtZSxcclxuICAgIGlzX2J5ZV93aW46IHJlc3VsdERhdGEuaXNCeWVXaW4gfHwgZmFsc2UsXHJcbiAgfTtcclxuXHJcbiAgLy8gVXBzZXJ0IG1hdGNoXHJcbiAgY29uc3QgeyBkYXRhOiBtYXRjaCwgZXJyb3I6IG1hdGNoRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAuZnJvbSgnbWF0Y2hlcycpXHJcbiAgICAudXBzZXJ0KG1hdGNoUGF5bG9hZCwgeyBvbkNvbmZsaWN0OiAnbWF0Y2hfa2V5JyB9KVxyXG4gICAgLnNlbGVjdCgpXHJcbiAgICAuc2luZ2xlKCk7XHJcblxyXG4gIGlmIChtYXRjaEVycm9yKSB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBzYXZlIG1hdGNoOiAke21hdGNoRXJyb3IubWVzc2FnZX1gKTtcclxuXHJcbiAgLy8gU2F2ZSBnYW1lIGRldGFpbHMgKG5vcm1hbGl6ZWQpXHJcbiAgaWYgKHJlc3VsdERhdGEuZ2FtZURldGFpbHM/Lmxlbmd0aCAmJiBtYXRjaCkge1xyXG4gICAgLy8gQ2xlYXIgb2xkIGdhbWUgZGV0YWlscyBmaXJzdFxyXG4gICAgYXdhaXQgc3VwYWJhc2UuZnJvbSgnbWF0Y2hfZ2FtZXMnKS5kZWxldGUoKS5lcSgnbWF0Y2hfaWQnLCBtYXRjaC5pZCk7XHJcblxyXG4gICAgY29uc3QgZ2FtZXMgPSByZXN1bHREYXRhLmdhbWVEZXRhaWxzLm1hcCgoZykgPT4gKHtcclxuICAgICAgbWF0Y2hfaWQ6IG1hdGNoLmlkLFxyXG4gICAgICBnYW1lX251bWJlcjogZy5nYW1lTnVtYmVyLFxyXG4gICAgICB3aW5uZXJfbmFtZTogZy53aW5uZXJOYW1lLFxyXG4gICAgICBkdXJhdGlvbjogZy5kdXJhdGlvbiB8fCAwLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oJ21hdGNoX2dhbWVzJykuaW5zZXJ0KGdhbWVzKTtcclxuICB9XHJcblxyXG4gIC8vIEF1ZGl0IHRyYWlsXHJcbiAgYXdhaXQgc3VwYWJhc2UuZnJvbSgnbWF0Y2hfaGlzdG9yeScpLmluc2VydCh7XHJcbiAgICBtYXRjaF9rZXk6IG1hdGNoS2V5LFxyXG4gICAgYWN0aW9uOiBleGlzdGluZyA/ICd1cGRhdGUnIDogJ2NyZWF0ZScsXHJcbiAgICBwcmV2aW91c19kYXRhOiBleGlzdGluZyB8fCBudWxsLFxyXG4gICAgbmV3X2RhdGE6IG1hdGNoUGF5bG9hZCxcclxuICAgIGNoYW5nZWRfYnk6IHVzZXIuaWQsXHJcbiAgfSk7XHJcblxyXG4gIHJldmFsaWRhdGVQYXRoKCcvc3RhbmRpbmdzJyk7XHJcbiAgcmV2YWxpZGF0ZVBhdGgoJy9maXh0dXJlcycpO1xyXG4gIHJldmFsaWRhdGVQYXRoKCcvJyk7XHJcbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9yZXN1bHRzJyk7XHJcblxyXG4gIHJldHVybiBtYXRjaDtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZU1hdGNoUmVzdWx0QWN0aW9uKG1hdGNoS2V5OiBzdHJpbmcsIHJlYXNvbj86IHN0cmluZykge1xyXG4gIGNvbnN0IHsgc3VwYWJhc2UsIHVzZXIgfSA9IGF3YWl0IHJlcXVpcmVBZG1pbigpO1xyXG5cclxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ21hdGNoZXMnKVxyXG4gICAgLnNlbGVjdCgnKicpXHJcbiAgICAuZXEoJ21hdGNoX2tleScsIG1hdGNoS2V5KVxyXG4gICAgLm1heWJlU2luZ2xlKCk7XHJcblxyXG4gIGlmIChleGlzdGluZykge1xyXG4gICAgLy8gQXVkaXQgdHJhaWwgYmVmb3JlIGRlbGV0ZVxyXG4gICAgYXdhaXQgc3VwYWJhc2UuZnJvbSgnbWF0Y2hfaGlzdG9yeScpLmluc2VydCh7XHJcbiAgICAgIG1hdGNoX2tleTogbWF0Y2hLZXksXHJcbiAgICAgIGFjdGlvbjogJ2RlbGV0ZScsXHJcbiAgICAgIHByZXZpb3VzX2RhdGE6IGV4aXN0aW5nLFxyXG4gICAgICBuZXdfZGF0YTogbnVsbCxcclxuICAgICAgY2hhbmdlZF9ieTogdXNlci5pZCxcclxuICAgICAgcmVhc29uOiByZWFzb24gfHwgJ01hbnVhbCBkZWxldGlvbicsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDQVNDQURFIOC4iOC4sOC4peC4miBtYXRjaF9nYW1lcyDguYHguKXguLAgZ2FtZV9zdGF0cyDguJTguYnguKfguKJcclxuICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oJ21hdGNoZXMnKS5kZWxldGUoKS5lcSgnbWF0Y2hfa2V5JywgbWF0Y2hLZXkpO1xyXG4gIH1cclxuXHJcbiAgcmV2YWxpZGF0ZVBhdGgoJy9zdGFuZGluZ3MnKTtcclxuICByZXZhbGlkYXRlUGF0aCgnL2ZpeHR1cmVzJyk7XHJcbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9yZXN1bHRzJyk7XHJcblxyXG4gIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1hdGNoS2V5IH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXNldERheVJlc3VsdHNBY3Rpb24oXHJcbiAgdG91cm5hbWVudElkOiBzdHJpbmcsXHJcbiAgZGF5OiBudW1iZXIsXHJcbiAgcmVhc29uPzogc3RyaW5nXHJcbikge1xyXG4gIGNvbnN0IHsgc3VwYWJhc2UsIHVzZXIgfSA9IGF3YWl0IHJlcXVpcmVBZG1pbigpO1xyXG5cclxuICBjb25zdCB7IGRhdGE6IGRheVJlc3VsdHMgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAuZnJvbSgnbWF0Y2hlcycpXHJcbiAgICAuc2VsZWN0KCcqJylcclxuICAgIC5lcSgndG91cm5hbWVudF9pZCcsIHRvdXJuYW1lbnRJZClcclxuICAgIC5lcSgnbWF0Y2hfZGF5JywgZGF5KTtcclxuXHJcbiAgLy8gQXVkaXQgZWFjaCBkZWxldGlvblxyXG4gIGlmIChkYXlSZXN1bHRzPy5sZW5ndGgpIHtcclxuICAgIGNvbnN0IGhpc3RvcnlFbnRyaWVzID0gZGF5UmVzdWx0cy5tYXAoKHJlc3VsdCkgPT4gKHtcclxuICAgICAgbWF0Y2hfa2V5OiByZXN1bHQubWF0Y2hfa2V5LFxyXG4gICAgICBhY3Rpb246ICdkZWxldGUnIGFzIGNvbnN0LFxyXG4gICAgICBwcmV2aW91c19kYXRhOiByZXN1bHQsXHJcbiAgICAgIG5ld19kYXRhOiBudWxsLFxyXG4gICAgICBjaGFuZ2VkX2J5OiB1c2VyLmlkLFxyXG4gICAgICByZWFzb246IHJlYXNvbiB8fCBgRGF5ICR7ZGF5fSByZXNldGAsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYXdhaXQgc3VwYWJhc2UuZnJvbSgnbWF0Y2hfaGlzdG9yeScpLmluc2VydChoaXN0b3J5RW50cmllcyk7XHJcbiAgfVxyXG5cclxuICBhd2FpdCBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ21hdGNoZXMnKVxyXG4gICAgLmRlbGV0ZSgpXHJcbiAgICAuZXEoJ3RvdXJuYW1lbnRfaWQnLCB0b3VybmFtZW50SWQpXHJcbiAgICAuZXEoJ21hdGNoX2RheScsIGRheSk7XHJcblxyXG4gIHJldmFsaWRhdGVQYXRoKCcvc3RhbmRpbmdzJyk7XHJcbiAgcmV2YWxpZGF0ZVBhdGgoJy9maXh0dXJlcycpO1xyXG4gIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vcmVzdWx0cycpO1xyXG5cclxuICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb3VudDogZGF5UmVzdWx0cz8ubGVuZ3RoIHx8IDAgfTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVTY2hlZHVsZUFjdGlvbihzY2hlZHVsZURhdGE6IHtcclxuICB0b3VybmFtZW50SWQ6IHN0cmluZztcclxuICB0ZWFtczogc3RyaW5nW107XHJcbiAgcG90QTogc3RyaW5nW107XHJcbiAgcG90Qjogc3RyaW5nW107XHJcbiAgc2NoZWR1bGVEYXRhOiB1bmtub3duW107XHJcbn0pIHtcclxuICBjb25zdCB7IHN1cGFiYXNlIH0gPSBhd2FpdCByZXF1aXJlQWRtaW4oKTtcclxuXHJcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCdzY2hlZHVsZXMnKVxyXG4gICAgLmluc2VydCh7XHJcbiAgICAgIHRvdXJuYW1lbnRfaWQ6IHNjaGVkdWxlRGF0YS50b3VybmFtZW50SWQsXHJcbiAgICAgIHRlYW1zOiBzY2hlZHVsZURhdGEudGVhbXMsXHJcbiAgICAgIHBvdF9hOiBzY2hlZHVsZURhdGEucG90QSxcclxuICAgICAgcG90X2I6IHNjaGVkdWxlRGF0YS5wb3RCLFxyXG4gICAgICBzY2hlZHVsZV9kYXRhOiBzY2hlZHVsZURhdGEuc2NoZWR1bGVEYXRhLFxyXG4gICAgfSlcclxuICAgIC5zZWxlY3QoKVxyXG4gICAgLnNpbmdsZSgpO1xyXG5cclxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHNhdmUgc2NoZWR1bGU6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuXHJcbiAgcmV2YWxpZGF0ZVBhdGgoJy9maXh0dXJlcycpO1xyXG4gIHJldmFsaWRhdGVQYXRoKCcvJyk7XHJcblxyXG4gIHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUdhbWVTdGF0c0FjdGlvbihcclxuICBtYXRjaElkOiBzdHJpbmcsXHJcbiAgc3RhdHM6IHtcclxuICAgIGdhbWVOdW1iZXI6IG51bWJlcjtcclxuICAgIHRlYW1OYW1lOiBzdHJpbmc7XHJcbiAgICBwbGF5ZXJOYW1lOiBzdHJpbmc7XHJcbiAgICBoZXJvTmFtZTogc3RyaW5nO1xyXG4gICAga2lsbHM6IG51bWJlcjtcclxuICAgIGRlYXRoczogbnVtYmVyO1xyXG4gICAgYXNzaXN0czogbnVtYmVyO1xyXG4gICAgbXZwOiBib29sZWFuO1xyXG4gICAgZ2FtZUR1cmF0aW9uOiBudW1iZXI7XHJcbiAgICB3aW46IGJvb2xlYW47XHJcbiAgfVtdXHJcbikge1xyXG4gIGNvbnN0IHsgc3VwYWJhc2UgfSA9IGF3YWl0IHJlcXVpcmVBZG1pbigpO1xyXG5cclxuICAvLyBDbGVhciBleGlzdGluZyBzdGF0cyBmb3IgdGhpcyBtYXRjaFxyXG4gIGF3YWl0IHN1cGFiYXNlLmZyb20oJ2dhbWVfc3RhdHMnKS5kZWxldGUoKS5lcSgnbWF0Y2hfaWQnLCBtYXRjaElkKTtcclxuXHJcbiAgY29uc3Qgcm93cyA9IHN0YXRzLm1hcCgocykgPT4gKHtcclxuICAgIG1hdGNoX2lkOiBtYXRjaElkLFxyXG4gICAgZ2FtZV9udW1iZXI6IHMuZ2FtZU51bWJlcixcclxuICAgIHRlYW1fbmFtZTogcy50ZWFtTmFtZSxcclxuICAgIHBsYXllcl9uYW1lOiBzLnBsYXllck5hbWUsXHJcbiAgICBoZXJvX25hbWU6IHMuaGVyb05hbWUsXHJcbiAgICBraWxsczogcy5raWxscyxcclxuICAgIGRlYXRoczogcy5kZWF0aHMsXHJcbiAgICBhc3Npc3RzOiBzLmFzc2lzdHMsXHJcbiAgICBtdnA6IHMubXZwLFxyXG4gICAgZ2FtZV9kdXJhdGlvbjogcy5nYW1lRHVyYXRpb24sXHJcbiAgICB3aW46IHMud2luLFxyXG4gIH0pKTtcclxuXHJcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCdnYW1lX3N0YXRzJylcclxuICAgIC5pbnNlcnQocm93cylcclxuICAgIC5zZWxlY3QoKTtcclxuXHJcbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBzYXZlIHN0YXRzOiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcblxyXG4gIHJldmFsaWRhdGVQYXRoKCcvc3RhdHMnKTtcclxuXHJcbiAgcmV0dXJuIHsgY291bnQ6IGRhdGE/Lmxlbmd0aCB8fCAwIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb3VybmFtZW50c0FjdGlvbigpIHtcclxuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAuZnJvbSgndG91cm5hbWVudHMnKVxyXG4gICAgLnNlbGVjdCgnKicpXHJcbiAgICAub3JkZXIoJ3NlYXNvbicsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KTtcclxuXHJcbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCB0b3VybmFtZW50czogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gIHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVG91cm5hbWVudFRoZW1lQWN0aW9uKFxyXG4gIHRvdXJuYW1lbnRJZDogc3RyaW5nLFxyXG4gIHRoZW1lU3R5bGU6IHN0cmluZ1xyXG4pIHtcclxuICBjb25zdCB7IHN1cGFiYXNlIH0gPSBhd2FpdCByZXF1aXJlQWRtaW4oKTtcclxuXHJcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCd0b3VybmFtZW50cycpXHJcbiAgICAudXBkYXRlKHsgdGhlbWVfc3R5bGU6IHRoZW1lU3R5bGUgfSlcclxuICAgIC5lcSgnaWQnLCB0b3VybmFtZW50SWQpXHJcbiAgICAuc2VsZWN0KClcclxuICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byB1cGRhdGUgdGhlbWU6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuXHJcbiAgcmV2YWxpZGF0ZVBhdGgoJy8nLCAnbGF5b3V0Jyk7XHJcbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi90aGVtZXMnKTtcclxuICBcclxuICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUSEVNRVMgQ1JVRCBBY3Rpb25zIChBZG1pbiBPbmx5IGZvciBXcml0ZSlcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuY29uc3QgY29sb3JIZXhTY2hlbWEgPSB6LnN0cmluZygpLnJlZ2V4KC9eI1swLTlBLUZdezZ9JC9pLCAn4Lij4Lir4Lix4Liq4Liq4Li14LiV4LmJ4Lit4LiH4LmA4Lib4LmH4LiZIEhleCBDb2RlIOC4guC4tuC5ieC4meC4leC5ieC4meC4lOC5ieC4p+C4oiAjIOC4leC4suC4oeC4lOC5ieC4p+C4ouC5gOC4peC4guC4kOC4suC4meC4quC4tOC4muC4q+C4gSA2IOC4q+C4peC4seC4gSAo4LmA4LiK4LmI4LiZICMxNUM4RkYpJyk7XHJcblxyXG5jb25zdCB0aGVtZVZhbGlkYXRpb25TY2hlbWEgPSB6Lm9iamVjdCh7XHJcbiAgaWQ6IHouc3RyaW5nKCkubWluKDEsICfguYTguK3guJTguLXguJjguLXguKHguJXguYnguK3guIfguYTguKHguYjguKfguYjguLLguIfguYDguJvguKXguYjguLInKS5yZWdleCgvXlthLXowLTktXSskLywgJ+C5hOC4reC4lOC4teC4leC5ieC4reC4h+C5gOC4m+C5h+C4meC4oOC4suC4qeC4suC4reC4seC4h+C4geC4pOC4qeC4nuC4tOC4oeC4nuC5jOC5gOC4peC5h+C4gSDguJXguLHguKfguYDguKXguIIg4Lir4Lij4Li34Lit4LmA4LiE4Lij4Li34LmI4Lit4LiH4Lir4Lih4Liy4LiiIC0g4LmA4LiX4LmI4Liy4LiZ4Lix4LmJ4LiZJyksXHJcbiAgbmFtZTogei5zdHJpbmcoKS5taW4oMSwgJ+C4iuC4t+C5iOC4reC4mOC4teC4oeC4leC5ieC4reC4h+C5hOC4oeC5iOC4p+C5iOC4suC4h+C5gOC4m+C4peC5iOC4sicpLFxyXG4gIGRlc2NyaXB0aW9uOiB6LnN0cmluZygpLm51bGxhYmxlKCkub3B0aW9uYWwoKSxcclxuICBwcmltYXJ5X2NvbG9yOiBjb2xvckhleFNjaGVtYSxcclxuICBzZWNvbmRhcnlfY29sb3I6IGNvbG9ySGV4U2NoZW1hLFxyXG4gIGJnX2RlZXA6IGNvbG9ySGV4U2NoZW1hLFxyXG4gIGJnX3N1cmZhY2U6IGNvbG9ySGV4U2NoZW1hLFxyXG4gIHByaW1hcnlfbGlnaHQ6IGNvbG9ySGV4U2NoZW1hLFxyXG4gIHByaW1hcnlfZGFyazogY29sb3JIZXhTY2hlbWEsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRoZW1lc0FjdGlvbigpIHtcclxuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAuZnJvbSgndGhlbWVzJylcclxuICAgIC5zZWxlY3QoJyonKVxyXG4gICAgLm9yZGVyKCdjcmVhdGVkX2F0JywgeyBhc2NlbmRpbmc6IHRydWUgfSk7XHJcblxyXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggdGhlbWVzOiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcbiAgcmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVUaGVtZUFjdGlvbih0aGVtZURhdGE6IHouaW5mZXI8dHlwZW9mIHRoZW1lVmFsaWRhdGlvblNjaGVtYT4pIHtcclxuICBjb25zdCB7IHN1cGFiYXNlIH0gPSBhd2FpdCByZXF1aXJlQWRtaW4oKTtcclxuXHJcbiAgY29uc3QgdmFsaWRhdGVkID0gdGhlbWVWYWxpZGF0aW9uU2NoZW1hLnNhZmVQYXJzZSh0aGVtZURhdGEpO1xyXG4gIGlmICghdmFsaWRhdGVkLnN1Y2Nlc3MpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcih2YWxpZGF0ZWQuZXJyb3IuaXNzdWVzWzBdLm1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCd0aGVtZXMnKVxyXG4gICAgLmluc2VydCh7XHJcbiAgICAgIC4uLnZhbGlkYXRlZC5kYXRhLFxyXG4gICAgICBpc19wcmVzZXQ6IGZhbHNlLFxyXG4gICAgfSlcclxuICAgIC5zZWxlY3QoKVxyXG4gICAgLnNpbmdsZSgpO1xyXG5cclxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGNyZWF0ZSB0aGVtZTogJHtlcnJvci5tZXNzYWdlfWApO1xyXG5cclxuICByZXZhbGlkYXRlUGF0aCgnLycsICdsYXlvdXQnKTtcclxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3RoZW1lcycpO1xyXG5cclxuICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVRoZW1lQWN0aW9uKFxyXG4gIHRoZW1lSWQ6IHN0cmluZyxcclxuICB0aGVtZURhdGE6IE9taXQ8ei5pbmZlcjx0eXBlb2YgdGhlbWVWYWxpZGF0aW9uU2NoZW1hPiwgJ2lkJz5cclxuKSB7XHJcbiAgY29uc3QgeyBzdXBhYmFzZSB9ID0gYXdhaXQgcmVxdWlyZUFkbWluKCk7XHJcblxyXG4gIC8vIFdlIHZhbGlkYXRlIG5hbWUsIGRlc2NyaXB0aW9uLCBhbmQgY29sb3JzXHJcbiAgY29uc3QgdXBkYXRlU2NoZW1hID0gdGhlbWVWYWxpZGF0aW9uU2NoZW1hLm9taXQoeyBpZDogdHJ1ZSB9KTtcclxuICBjb25zdCB2YWxpZGF0ZWQgPSB1cGRhdGVTY2hlbWEuc2FmZVBhcnNlKHRoZW1lRGF0YSk7XHJcbiAgaWYgKCF2YWxpZGF0ZWQuc3VjY2Vzcykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKHZhbGlkYXRlZC5lcnJvci5pc3N1ZXNbMF0ubWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvLyBDaGVjayBpZiBpdCBpcyBhIHByZXNldCB0aGVtZVxyXG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcsIGVycm9yOiBmZXRjaEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ3RoZW1lcycpXHJcbiAgICAuc2VsZWN0KCdpc19wcmVzZXQnKVxyXG4gICAgLmVxKCdpZCcsIHRoZW1lSWQpXHJcbiAgICAubWF5YmVTaW5nbGUoKTtcclxuXHJcbiAgaWYgKGZldGNoRXJyb3IpIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGNoZWNrIHRoZW1lOiAke2ZldGNoRXJyb3IubWVzc2FnZX1gKTtcclxuICBpZiAoIWV4aXN0aW5nKSB0aHJvdyBuZXcgRXJyb3IoJ+C5hOC4oeC5iOC4nuC4muC4guC5ieC4reC4oeC4ueC4peC4mOC4teC4oeC4meC4teC5iScpO1xyXG5cclxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ3RoZW1lcycpXHJcbiAgICAudXBkYXRlKHZhbGlkYXRlZC5kYXRhKVxyXG4gICAgLmVxKCdpZCcsIHRoZW1lSWQpXHJcbiAgICAuc2VsZWN0KClcclxuICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byB1cGRhdGUgdGhlbWU6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuXHJcbiAgcmV2YWxpZGF0ZVBhdGgoJy8nLCAnbGF5b3V0Jyk7XHJcbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi90aGVtZXMnKTtcclxuXHJcbiAgcmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVUaGVtZUFjdGlvbih0aGVtZUlkOiBzdHJpbmcpIHtcclxuICBjb25zdCB7IHN1cGFiYXNlIH0gPSBhd2FpdCByZXF1aXJlQWRtaW4oKTtcclxuXHJcbiAgLy8gQ2hlY2sgaWYgaXQgaXMgYSBwcmVzZXQgdGhlbWVcclxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nLCBlcnJvcjogZmV0Y2hFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCd0aGVtZXMnKVxyXG4gICAgLnNlbGVjdCgnaXNfcHJlc2V0JylcclxuICAgIC5lcSgnaWQnLCB0aGVtZUlkKVxyXG4gICAgLm1heWJlU2luZ2xlKCk7XHJcblxyXG4gIGlmIChmZXRjaEVycm9yKSB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBjaGVjayB0aGVtZTogJHtmZXRjaEVycm9yLm1lc3NhZ2V9YCk7XHJcbiAgaWYgKCFleGlzdGluZykgdGhyb3cgbmV3IEVycm9yKCfguYTguKHguYjguJ7guJrguILguYnguK3guKHguLnguKXguJjguLXguKHguJnguLXguYknKTtcclxuICBpZiAoZXhpc3RpbmcuaXNfcHJlc2V0KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ+C5hOC4oeC5iOC4quC4suC4oeC4suC4o+C4luC4peC4muC4mOC4teC4oeC4o+C4sOC4muC4muC5hOC4lOC5iScpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCd0aGVtZXMnKVxyXG4gICAgLmRlbGV0ZSgpXHJcbiAgICAuZXEoJ2lkJywgdGhlbWVJZCk7XHJcblxyXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZGVsZXRlIHRoZW1lOiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcblxyXG4gIHJldmFsaWRhdGVQYXRoKCcvJywgJ2xheW91dCcpO1xyXG4gIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vdGhlbWVzJyk7XHJcblxyXG4gIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHRoZW1lSWQgfTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Im1TQWlCc0IsNkxBQUEifQ==
}),
"[project]/features/tournament/data:fb7c09 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateMatchResultAction",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"6068aea1e7780ed7c1980b44c04ca004d20e80569a":"updateMatchResultAction"},"features/tournament/result-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("6068aea1e7780ed7c1980b44c04ca004d20e80569a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateMatchResultAction");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcmVzdWx0LWFjdGlvbnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXHJcblxyXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAL3V0aWxzL3N1cGFiYXNlL3NlcnZlcidcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJ1xyXG5pbXBvcnQgeyBjaGVja1JvbGUgfSBmcm9tICdAL3V0aWxzL2F1dGgnXHJcblxyXG4vKipcclxuICogTWF0Y2ggUmVzdWx0cyAmIEdhbWUgU3RhdHMgU2VydmVyIEFjdGlvbnNcclxuICogSGFuZGxlcyB1cGRhdGluZyBtYXRjaCBzY29yZXMgYW5kIGRldGFpbGVkIHBsYXllciBzdGF0c1xyXG4gKi9cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJlcXVpcmVBZG1pbigpIHtcclxuICBjb25zdCB7IHVzZXIgfSA9IGF3YWl0IGNoZWNrUm9sZShbJ2FkbWluJywgJ3N1cGVyX2FkbWluJ10pO1xyXG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgcmV0dXJuIHsgc3VwYWJhc2UsIHVzZXIgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWF0Y2hSZXN1bHRBY3Rpb24obWF0Y2hJZDogc3RyaW5nLCByZXN1bHREYXRhOiB7XHJcbiAgc2NvcmVCbHVlOiBudW1iZXI7XHJcbiAgc2NvcmVSZWQ6IG51bWJlcjtcclxuICB3aW5uZXI6IHN0cmluZztcclxuICBpc0J5ZVdpbj86IGJvb2xlYW47XHJcbiAgbXZwPzogc3RyaW5nO1xyXG59KSB7XHJcbiAgY29uc3QgeyBzdXBhYmFzZSB9ID0gYXdhaXQgcmVxdWlyZUFkbWluKClcclxuXHJcbiAgLy8gRGV0ZXJtaW5lIGxvc2VyXHJcbiAgY29uc3QgeyBkYXRhOiBtYXRjaCB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCdtYXRjaGVzJylcclxuICAgIC5zZWxlY3QoJ3RlYW1fYmx1ZV9uYW1lLCB0ZWFtX3JlZF9uYW1lJylcclxuICAgIC5lcSgnaWQnLCBtYXRjaElkKVxyXG4gICAgLnNpbmdsZSgpXHJcblxyXG4gIGlmICghbWF0Y2gpIHRocm93IG5ldyBFcnJvcignTWF0Y2ggbm90IGZvdW5kJylcclxuXHJcbiAgbGV0IGxvc2VyID0gJydcclxuICBpZiAocmVzdWx0RGF0YS53aW5uZXIgPT09IG1hdGNoLnRlYW1fYmx1ZV9uYW1lKSB7XHJcbiAgICBsb3NlciA9IG1hdGNoLnRlYW1fcmVkX25hbWVcclxuICB9IGVsc2UgaWYgKHJlc3VsdERhdGEud2lubmVyID09PSBtYXRjaC50ZWFtX3JlZF9uYW1lKSB7XHJcbiAgICBsb3NlciA9IG1hdGNoLnRlYW1fYmx1ZV9uYW1lXHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ21hdGNoZXMnKVxyXG4gICAgLnVwZGF0ZSh7XHJcbiAgICAgIHNjb3JlX2JsdWU6IHJlc3VsdERhdGEuc2NvcmVCbHVlLFxyXG4gICAgICBzY29yZV9yZWQ6IHJlc3VsdERhdGEuc2NvcmVSZWQsXHJcbiAgICAgIHdpbm5lcl9uYW1lOiByZXN1bHREYXRhLndpbm5lcixcclxuICAgICAgbG9zZXJfbmFtZTogbG9zZXIsXHJcbiAgICAgIGlzX2J5ZV93aW46IHJlc3VsdERhdGEuaXNCeWVXaW4gfHwgZmFsc2UsXHJcbiAgICAgIG12cF9wbGF5ZXI6IHJlc3VsdERhdGEubXZwIHx8IG51bGwsXHJcbiAgICB9KVxyXG4gICAgLmVxKCdpZCcsIG1hdGNoSWQpXHJcblxyXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpXHJcblxyXG4gIHJldmFsaWRhdGVQYXRoKCcvc3RhbmRpbmdzJylcclxuICByZXZhbGlkYXRlUGF0aCgnL2ZpeHR1cmVzJylcclxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3Jlc3VsdHMnKVxyXG4gIHJldmFsaWRhdGVQYXRoKCcvJylcclxuICBcclxuICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIFBsYXllclN0YXRJbnB1dCB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGhlcm86IHN0cmluZztcclxuICBrOiBudW1iZXI7XHJcbiAgZDogbnVtYmVyO1xyXG4gIGE6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVHYW1lU3RhdHNBY3Rpb24obWF0Y2hJZDogc3RyaW5nLCBzdGF0czoge1xyXG4gIGdhbWVOdW1iZXI6IG51bWJlcjtcclxuICBibHVlVGVhbTogc3RyaW5nO1xyXG4gIHJlZFRlYW06IHN0cmluZztcclxuICB3aW5uZXI6ICdibHVlJyB8ICdyZWQnO1xyXG4gIG12cDogc3RyaW5nO1xyXG4gIGR1cmF0aW9uOiBzdHJpbmc7IC8vIEhIOk1NIG9yIE1NOlNTXHJcbiAgYmx1ZVN0YXRzOiBQbGF5ZXJTdGF0SW5wdXRbXTtcclxuICByZWRTdGF0czogUGxheWVyU3RhdElucHV0W107XHJcbn0pIHtcclxuICBjb25zdCB7IHN1cGFiYXNlIH0gPSBhd2FpdCByZXF1aXJlQWRtaW4oKVxyXG5cclxuICAvLyAxLiBDbGVhciBleGlzdGluZyBzdGF0cyBmb3IgdGhpcyBnYW1lIG9mIHRoaXMgbWF0Y2hcclxuICBhd2FpdCBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ2dhbWVfc3RhdHMnKVxyXG4gICAgLmRlbGV0ZSgpXHJcbiAgICAuZXEoJ21hdGNoX2lkJywgbWF0Y2hJZClcclxuICAgIC5lcSgnZ2FtZV9udW1iZXInLCBzdGF0cy5nYW1lTnVtYmVyKVxyXG5cclxuICAvLyAyLiBQYXJzZSBkdXJhdGlvblxyXG4gIGxldCBkdXJhdGlvblNlY29uZHMgPSAwXHJcbiAgaWYgKHN0YXRzLmR1cmF0aW9uKSB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IHN0YXRzLmR1cmF0aW9uLnNwbGl0KCc6JylcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgZHVyYXRpb25TZWNvbmRzID0gcGFyc2VJbnQocGFydHNbMF0pICogNjAgKyBwYXJzZUludChwYXJ0c1sxXSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHJvd3M6IGFueVtdID0gW11cclxuICBjb25zdCBpc0JsdWVXaW4gPSBzdGF0cy53aW5uZXIgPT09ICdibHVlJ1xyXG5cclxuICAvLyBCbHVlIFN0YXRzXHJcbiAgZm9yIChjb25zdCBwIG9mIHN0YXRzLmJsdWVTdGF0cykge1xyXG4gICAgaWYgKCFwLm5hbWUpIGNvbnRpbnVlXHJcbiAgICByb3dzLnB1c2goe1xyXG4gICAgICBtYXRjaF9pZDogbWF0Y2hJZCxcclxuICAgICAgZ2FtZV9udW1iZXI6IHN0YXRzLmdhbWVOdW1iZXIsXHJcbiAgICAgIHRlYW1fbmFtZTogc3RhdHMuYmx1ZVRlYW0sXHJcbiAgICAgIHBsYXllcl9uYW1lOiBwLm5hbWUsXHJcbiAgICAgIGhlcm9fbmFtZTogcC5oZXJvLFxyXG4gICAgICBraWxsczogcC5rIHx8IDAsXHJcbiAgICAgIGRlYXRoczogcC5kIHx8IDAsXHJcbiAgICAgIGFzc2lzdHM6IHAuYSB8fCAwLFxyXG4gICAgICBtdnA6IHN0YXRzLm12cCA9PT0gcC5uYW1lLFxyXG4gICAgICBnYW1lX2R1cmF0aW9uOiBkdXJhdGlvblNlY29uZHMsXHJcbiAgICAgIHdpbjogaXNCbHVlV2luLFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8vIFJlZCBTdGF0c1xyXG4gIGZvciAoY29uc3QgcCBvZiBzdGF0cy5yZWRTdGF0cykge1xyXG4gICAgaWYgKCFwLm5hbWUpIGNvbnRpbnVlXHJcbiAgICByb3dzLnB1c2goe1xyXG4gICAgICBtYXRjaF9pZDogbWF0Y2hJZCxcclxuICAgICAgZ2FtZV9udW1iZXI6IHN0YXRzLmdhbWVOdW1iZXIsXHJcbiAgICAgIHRlYW1fbmFtZTogc3RhdHMucmVkVGVhbSxcclxuICAgICAgcGxheWVyX25hbWU6IHAubmFtZSxcclxuICAgICAgaGVyb19uYW1lOiBwLmhlcm8sXHJcbiAgICAgIGtpbGxzOiBwLmsgfHwgMCxcclxuICAgICAgZGVhdGhzOiBwLmQgfHwgMCxcclxuICAgICAgYXNzaXN0czogcC5hIHx8IDAsXHJcbiAgICAgIG12cDogc3RhdHMubXZwID09PSBwLm5hbWUsXHJcbiAgICAgIGdhbWVfZHVyYXRpb246IGR1cmF0aW9uU2Vjb25kcyxcclxuICAgICAgd2luOiAhaXNCbHVlV2luLFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGlmIChyb3dzLmxlbmd0aCA+IDApIHtcclxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oJ2dhbWVfc3RhdHMnKS5pbnNlcnQocm93cylcclxuICAgIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpXHJcbiAgfVxyXG5cclxuICAvLyAzLiBVcGRhdGUgbWF0Y2hfZ2FtZXMgdGFibGUgZm9yIGR1cmF0aW9uL3dpbm5lclxyXG4gIGF3YWl0IHN1cGFiYXNlXHJcbiAgICAuZnJvbSgnbWF0Y2hfZ2FtZXMnKVxyXG4gICAgLnVwc2VydCh7XHJcbiAgICAgIG1hdGNoX2lkOiBtYXRjaElkLFxyXG4gICAgICBnYW1lX251bWJlcjogc3RhdHMuZ2FtZU51bWJlcixcclxuICAgICAgd2lubmVyX25hbWU6IHN0YXRzLndpbm5lciA9PT0gJ2JsdWUnID8gc3RhdHMuYmx1ZVRlYW0gOiBzdGF0cy5yZWRUZWFtLFxyXG4gICAgICBkdXJhdGlvbjogZHVyYXRpb25TZWNvbmRzXHJcbiAgICB9LCB7IG9uQ29uZmxpY3Q6ICdtYXRjaF9pZCwgZ2FtZV9udW1iZXInIH0pXHJcblxyXG4gIHJldmFsaWRhdGVQYXRoKCcvc3RhdHMnKVxyXG4gIHJldmFsaWRhdGVQYXRoKCcvc3RhdHMvcGxheWVyJylcclxuICByZXZhbGlkYXRlUGF0aCgnL3N0YXRzL3RlYW0nKVxyXG4gIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vcmVzdWx0cycpXHJcblxyXG4gIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWF0Y2hTdGF0c0FjdGlvbihtYXRjaElkOiBzdHJpbmcpIHtcclxuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpXHJcbiAgXHJcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCdnYW1lX3N0YXRzJylcclxuICAgIC5zZWxlY3QoJyonKVxyXG4gICAgLmVxKCdtYXRjaF9pZCcsIG1hdGNoSWQpXHJcbiAgICAub3JkZXIoJ2dhbWVfbnVtYmVyJywgeyBhc2NlbmRpbmc6IHRydWUgfSlcclxuXHJcbiAgaWYgKGVycm9yKSByZXR1cm4gW11cclxuICByZXR1cm4gZGF0YVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiaVRBaUJzQixvTUFBQSJ9
}),
"[project]/features/tournament/data:a170ad [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "saveGameStatsAction",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60320d0103bb902546f1ea6fd6d7d0d9c7d1e0c6d8":"saveGameStatsAction"},"features/tournament/result-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("60320d0103bb902546f1ea6fd6d7d0d9c7d1e0c6d8", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "saveGameStatsAction");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcmVzdWx0LWFjdGlvbnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXHJcblxyXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAL3V0aWxzL3N1cGFiYXNlL3NlcnZlcidcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJ1xyXG5pbXBvcnQgeyBjaGVja1JvbGUgfSBmcm9tICdAL3V0aWxzL2F1dGgnXHJcblxyXG4vKipcclxuICogTWF0Y2ggUmVzdWx0cyAmIEdhbWUgU3RhdHMgU2VydmVyIEFjdGlvbnNcclxuICogSGFuZGxlcyB1cGRhdGluZyBtYXRjaCBzY29yZXMgYW5kIGRldGFpbGVkIHBsYXllciBzdGF0c1xyXG4gKi9cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJlcXVpcmVBZG1pbigpIHtcclxuICBjb25zdCB7IHVzZXIgfSA9IGF3YWl0IGNoZWNrUm9sZShbJ2FkbWluJywgJ3N1cGVyX2FkbWluJ10pO1xyXG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgcmV0dXJuIHsgc3VwYWJhc2UsIHVzZXIgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWF0Y2hSZXN1bHRBY3Rpb24obWF0Y2hJZDogc3RyaW5nLCByZXN1bHREYXRhOiB7XHJcbiAgc2NvcmVCbHVlOiBudW1iZXI7XHJcbiAgc2NvcmVSZWQ6IG51bWJlcjtcclxuICB3aW5uZXI6IHN0cmluZztcclxuICBpc0J5ZVdpbj86IGJvb2xlYW47XHJcbiAgbXZwPzogc3RyaW5nO1xyXG59KSB7XHJcbiAgY29uc3QgeyBzdXBhYmFzZSB9ID0gYXdhaXQgcmVxdWlyZUFkbWluKClcclxuXHJcbiAgLy8gRGV0ZXJtaW5lIGxvc2VyXHJcbiAgY29uc3QgeyBkYXRhOiBtYXRjaCB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCdtYXRjaGVzJylcclxuICAgIC5zZWxlY3QoJ3RlYW1fYmx1ZV9uYW1lLCB0ZWFtX3JlZF9uYW1lJylcclxuICAgIC5lcSgnaWQnLCBtYXRjaElkKVxyXG4gICAgLnNpbmdsZSgpXHJcblxyXG4gIGlmICghbWF0Y2gpIHRocm93IG5ldyBFcnJvcignTWF0Y2ggbm90IGZvdW5kJylcclxuXHJcbiAgbGV0IGxvc2VyID0gJydcclxuICBpZiAocmVzdWx0RGF0YS53aW5uZXIgPT09IG1hdGNoLnRlYW1fYmx1ZV9uYW1lKSB7XHJcbiAgICBsb3NlciA9IG1hdGNoLnRlYW1fcmVkX25hbWVcclxuICB9IGVsc2UgaWYgKHJlc3VsdERhdGEud2lubmVyID09PSBtYXRjaC50ZWFtX3JlZF9uYW1lKSB7XHJcbiAgICBsb3NlciA9IG1hdGNoLnRlYW1fYmx1ZV9uYW1lXHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ21hdGNoZXMnKVxyXG4gICAgLnVwZGF0ZSh7XHJcbiAgICAgIHNjb3JlX2JsdWU6IHJlc3VsdERhdGEuc2NvcmVCbHVlLFxyXG4gICAgICBzY29yZV9yZWQ6IHJlc3VsdERhdGEuc2NvcmVSZWQsXHJcbiAgICAgIHdpbm5lcl9uYW1lOiByZXN1bHREYXRhLndpbm5lcixcclxuICAgICAgbG9zZXJfbmFtZTogbG9zZXIsXHJcbiAgICAgIGlzX2J5ZV93aW46IHJlc3VsdERhdGEuaXNCeWVXaW4gfHwgZmFsc2UsXHJcbiAgICAgIG12cF9wbGF5ZXI6IHJlc3VsdERhdGEubXZwIHx8IG51bGwsXHJcbiAgICB9KVxyXG4gICAgLmVxKCdpZCcsIG1hdGNoSWQpXHJcblxyXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpXHJcblxyXG4gIHJldmFsaWRhdGVQYXRoKCcvc3RhbmRpbmdzJylcclxuICByZXZhbGlkYXRlUGF0aCgnL2ZpeHR1cmVzJylcclxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3Jlc3VsdHMnKVxyXG4gIHJldmFsaWRhdGVQYXRoKCcvJylcclxuICBcclxuICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIFBsYXllclN0YXRJbnB1dCB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGhlcm86IHN0cmluZztcclxuICBrOiBudW1iZXI7XHJcbiAgZDogbnVtYmVyO1xyXG4gIGE6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVHYW1lU3RhdHNBY3Rpb24obWF0Y2hJZDogc3RyaW5nLCBzdGF0czoge1xyXG4gIGdhbWVOdW1iZXI6IG51bWJlcjtcclxuICBibHVlVGVhbTogc3RyaW5nO1xyXG4gIHJlZFRlYW06IHN0cmluZztcclxuICB3aW5uZXI6ICdibHVlJyB8ICdyZWQnO1xyXG4gIG12cDogc3RyaW5nO1xyXG4gIGR1cmF0aW9uOiBzdHJpbmc7IC8vIEhIOk1NIG9yIE1NOlNTXHJcbiAgYmx1ZVN0YXRzOiBQbGF5ZXJTdGF0SW5wdXRbXTtcclxuICByZWRTdGF0czogUGxheWVyU3RhdElucHV0W107XHJcbn0pIHtcclxuICBjb25zdCB7IHN1cGFiYXNlIH0gPSBhd2FpdCByZXF1aXJlQWRtaW4oKVxyXG5cclxuICAvLyAxLiBDbGVhciBleGlzdGluZyBzdGF0cyBmb3IgdGhpcyBnYW1lIG9mIHRoaXMgbWF0Y2hcclxuICBhd2FpdCBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ2dhbWVfc3RhdHMnKVxyXG4gICAgLmRlbGV0ZSgpXHJcbiAgICAuZXEoJ21hdGNoX2lkJywgbWF0Y2hJZClcclxuICAgIC5lcSgnZ2FtZV9udW1iZXInLCBzdGF0cy5nYW1lTnVtYmVyKVxyXG5cclxuICAvLyAyLiBQYXJzZSBkdXJhdGlvblxyXG4gIGxldCBkdXJhdGlvblNlY29uZHMgPSAwXHJcbiAgaWYgKHN0YXRzLmR1cmF0aW9uKSB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IHN0YXRzLmR1cmF0aW9uLnNwbGl0KCc6JylcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgZHVyYXRpb25TZWNvbmRzID0gcGFyc2VJbnQocGFydHNbMF0pICogNjAgKyBwYXJzZUludChwYXJ0c1sxXSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHJvd3M6IGFueVtdID0gW11cclxuICBjb25zdCBpc0JsdWVXaW4gPSBzdGF0cy53aW5uZXIgPT09ICdibHVlJ1xyXG5cclxuICAvLyBCbHVlIFN0YXRzXHJcbiAgZm9yIChjb25zdCBwIG9mIHN0YXRzLmJsdWVTdGF0cykge1xyXG4gICAgaWYgKCFwLm5hbWUpIGNvbnRpbnVlXHJcbiAgICByb3dzLnB1c2goe1xyXG4gICAgICBtYXRjaF9pZDogbWF0Y2hJZCxcclxuICAgICAgZ2FtZV9udW1iZXI6IHN0YXRzLmdhbWVOdW1iZXIsXHJcbiAgICAgIHRlYW1fbmFtZTogc3RhdHMuYmx1ZVRlYW0sXHJcbiAgICAgIHBsYXllcl9uYW1lOiBwLm5hbWUsXHJcbiAgICAgIGhlcm9fbmFtZTogcC5oZXJvLFxyXG4gICAgICBraWxsczogcC5rIHx8IDAsXHJcbiAgICAgIGRlYXRoczogcC5kIHx8IDAsXHJcbiAgICAgIGFzc2lzdHM6IHAuYSB8fCAwLFxyXG4gICAgICBtdnA6IHN0YXRzLm12cCA9PT0gcC5uYW1lLFxyXG4gICAgICBnYW1lX2R1cmF0aW9uOiBkdXJhdGlvblNlY29uZHMsXHJcbiAgICAgIHdpbjogaXNCbHVlV2luLFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8vIFJlZCBTdGF0c1xyXG4gIGZvciAoY29uc3QgcCBvZiBzdGF0cy5yZWRTdGF0cykge1xyXG4gICAgaWYgKCFwLm5hbWUpIGNvbnRpbnVlXHJcbiAgICByb3dzLnB1c2goe1xyXG4gICAgICBtYXRjaF9pZDogbWF0Y2hJZCxcclxuICAgICAgZ2FtZV9udW1iZXI6IHN0YXRzLmdhbWVOdW1iZXIsXHJcbiAgICAgIHRlYW1fbmFtZTogc3RhdHMucmVkVGVhbSxcclxuICAgICAgcGxheWVyX25hbWU6IHAubmFtZSxcclxuICAgICAgaGVyb19uYW1lOiBwLmhlcm8sXHJcbiAgICAgIGtpbGxzOiBwLmsgfHwgMCxcclxuICAgICAgZGVhdGhzOiBwLmQgfHwgMCxcclxuICAgICAgYXNzaXN0czogcC5hIHx8IDAsXHJcbiAgICAgIG12cDogc3RhdHMubXZwID09PSBwLm5hbWUsXHJcbiAgICAgIGdhbWVfZHVyYXRpb246IGR1cmF0aW9uU2Vjb25kcyxcclxuICAgICAgd2luOiAhaXNCbHVlV2luLFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGlmIChyb3dzLmxlbmd0aCA+IDApIHtcclxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oJ2dhbWVfc3RhdHMnKS5pbnNlcnQocm93cylcclxuICAgIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpXHJcbiAgfVxyXG5cclxuICAvLyAzLiBVcGRhdGUgbWF0Y2hfZ2FtZXMgdGFibGUgZm9yIGR1cmF0aW9uL3dpbm5lclxyXG4gIGF3YWl0IHN1cGFiYXNlXHJcbiAgICAuZnJvbSgnbWF0Y2hfZ2FtZXMnKVxyXG4gICAgLnVwc2VydCh7XHJcbiAgICAgIG1hdGNoX2lkOiBtYXRjaElkLFxyXG4gICAgICBnYW1lX251bWJlcjogc3RhdHMuZ2FtZU51bWJlcixcclxuICAgICAgd2lubmVyX25hbWU6IHN0YXRzLndpbm5lciA9PT0gJ2JsdWUnID8gc3RhdHMuYmx1ZVRlYW0gOiBzdGF0cy5yZWRUZWFtLFxyXG4gICAgICBkdXJhdGlvbjogZHVyYXRpb25TZWNvbmRzXHJcbiAgICB9LCB7IG9uQ29uZmxpY3Q6ICdtYXRjaF9pZCwgZ2FtZV9udW1iZXInIH0pXHJcblxyXG4gIHJldmFsaWRhdGVQYXRoKCcvc3RhdHMnKVxyXG4gIHJldmFsaWRhdGVQYXRoKCcvc3RhdHMvcGxheWVyJylcclxuICByZXZhbGlkYXRlUGF0aCgnL3N0YXRzL3RlYW0nKVxyXG4gIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vcmVzdWx0cycpXHJcblxyXG4gIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWF0Y2hTdGF0c0FjdGlvbihtYXRjaElkOiBzdHJpbmcpIHtcclxuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpXHJcbiAgXHJcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCdnYW1lX3N0YXRzJylcclxuICAgIC5zZWxlY3QoJyonKVxyXG4gICAgLmVxKCdtYXRjaF9pZCcsIG1hdGNoSWQpXHJcbiAgICAub3JkZXIoJ2dhbWVfbnVtYmVyJywgeyBhc2NlbmRpbmc6IHRydWUgfSlcclxuXHJcbiAgaWYgKGVycm9yKSByZXR1cm4gW11cclxuICByZXR1cm4gZGF0YVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiNlNBd0VzQixnTUFBQSJ9
}),
"[project]/features/tournament/data:c6a7f0 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMatchStatsAction",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"404c63d08b773c533e262264a79943b5d1a51d1da5":"getMatchStatsAction"},"features/tournament/result-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("404c63d08b773c533e262264a79943b5d1a51d1da5", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getMatchStatsAction");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcmVzdWx0LWFjdGlvbnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXHJcblxyXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAL3V0aWxzL3N1cGFiYXNlL3NlcnZlcidcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJ1xyXG5pbXBvcnQgeyBjaGVja1JvbGUgfSBmcm9tICdAL3V0aWxzL2F1dGgnXHJcblxyXG4vKipcclxuICogTWF0Y2ggUmVzdWx0cyAmIEdhbWUgU3RhdHMgU2VydmVyIEFjdGlvbnNcclxuICogSGFuZGxlcyB1cGRhdGluZyBtYXRjaCBzY29yZXMgYW5kIGRldGFpbGVkIHBsYXllciBzdGF0c1xyXG4gKi9cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJlcXVpcmVBZG1pbigpIHtcclxuICBjb25zdCB7IHVzZXIgfSA9IGF3YWl0IGNoZWNrUm9sZShbJ2FkbWluJywgJ3N1cGVyX2FkbWluJ10pO1xyXG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgcmV0dXJuIHsgc3VwYWJhc2UsIHVzZXIgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWF0Y2hSZXN1bHRBY3Rpb24obWF0Y2hJZDogc3RyaW5nLCByZXN1bHREYXRhOiB7XHJcbiAgc2NvcmVCbHVlOiBudW1iZXI7XHJcbiAgc2NvcmVSZWQ6IG51bWJlcjtcclxuICB3aW5uZXI6IHN0cmluZztcclxuICBpc0J5ZVdpbj86IGJvb2xlYW47XHJcbiAgbXZwPzogc3RyaW5nO1xyXG59KSB7XHJcbiAgY29uc3QgeyBzdXBhYmFzZSB9ID0gYXdhaXQgcmVxdWlyZUFkbWluKClcclxuXHJcbiAgLy8gRGV0ZXJtaW5lIGxvc2VyXHJcbiAgY29uc3QgeyBkYXRhOiBtYXRjaCB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCdtYXRjaGVzJylcclxuICAgIC5zZWxlY3QoJ3RlYW1fYmx1ZV9uYW1lLCB0ZWFtX3JlZF9uYW1lJylcclxuICAgIC5lcSgnaWQnLCBtYXRjaElkKVxyXG4gICAgLnNpbmdsZSgpXHJcblxyXG4gIGlmICghbWF0Y2gpIHRocm93IG5ldyBFcnJvcignTWF0Y2ggbm90IGZvdW5kJylcclxuXHJcbiAgbGV0IGxvc2VyID0gJydcclxuICBpZiAocmVzdWx0RGF0YS53aW5uZXIgPT09IG1hdGNoLnRlYW1fYmx1ZV9uYW1lKSB7XHJcbiAgICBsb3NlciA9IG1hdGNoLnRlYW1fcmVkX25hbWVcclxuICB9IGVsc2UgaWYgKHJlc3VsdERhdGEud2lubmVyID09PSBtYXRjaC50ZWFtX3JlZF9uYW1lKSB7XHJcbiAgICBsb3NlciA9IG1hdGNoLnRlYW1fYmx1ZV9uYW1lXHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ21hdGNoZXMnKVxyXG4gICAgLnVwZGF0ZSh7XHJcbiAgICAgIHNjb3JlX2JsdWU6IHJlc3VsdERhdGEuc2NvcmVCbHVlLFxyXG4gICAgICBzY29yZV9yZWQ6IHJlc3VsdERhdGEuc2NvcmVSZWQsXHJcbiAgICAgIHdpbm5lcl9uYW1lOiByZXN1bHREYXRhLndpbm5lcixcclxuICAgICAgbG9zZXJfbmFtZTogbG9zZXIsXHJcbiAgICAgIGlzX2J5ZV93aW46IHJlc3VsdERhdGEuaXNCeWVXaW4gfHwgZmFsc2UsXHJcbiAgICAgIG12cF9wbGF5ZXI6IHJlc3VsdERhdGEubXZwIHx8IG51bGwsXHJcbiAgICB9KVxyXG4gICAgLmVxKCdpZCcsIG1hdGNoSWQpXHJcblxyXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpXHJcblxyXG4gIHJldmFsaWRhdGVQYXRoKCcvc3RhbmRpbmdzJylcclxuICByZXZhbGlkYXRlUGF0aCgnL2ZpeHR1cmVzJylcclxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3Jlc3VsdHMnKVxyXG4gIHJldmFsaWRhdGVQYXRoKCcvJylcclxuICBcclxuICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIFBsYXllclN0YXRJbnB1dCB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGhlcm86IHN0cmluZztcclxuICBrOiBudW1iZXI7XHJcbiAgZDogbnVtYmVyO1xyXG4gIGE6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVHYW1lU3RhdHNBY3Rpb24obWF0Y2hJZDogc3RyaW5nLCBzdGF0czoge1xyXG4gIGdhbWVOdW1iZXI6IG51bWJlcjtcclxuICBibHVlVGVhbTogc3RyaW5nO1xyXG4gIHJlZFRlYW06IHN0cmluZztcclxuICB3aW5uZXI6ICdibHVlJyB8ICdyZWQnO1xyXG4gIG12cDogc3RyaW5nO1xyXG4gIGR1cmF0aW9uOiBzdHJpbmc7IC8vIEhIOk1NIG9yIE1NOlNTXHJcbiAgYmx1ZVN0YXRzOiBQbGF5ZXJTdGF0SW5wdXRbXTtcclxuICByZWRTdGF0czogUGxheWVyU3RhdElucHV0W107XHJcbn0pIHtcclxuICBjb25zdCB7IHN1cGFiYXNlIH0gPSBhd2FpdCByZXF1aXJlQWRtaW4oKVxyXG5cclxuICAvLyAxLiBDbGVhciBleGlzdGluZyBzdGF0cyBmb3IgdGhpcyBnYW1lIG9mIHRoaXMgbWF0Y2hcclxuICBhd2FpdCBzdXBhYmFzZVxyXG4gICAgLmZyb20oJ2dhbWVfc3RhdHMnKVxyXG4gICAgLmRlbGV0ZSgpXHJcbiAgICAuZXEoJ21hdGNoX2lkJywgbWF0Y2hJZClcclxuICAgIC5lcSgnZ2FtZV9udW1iZXInLCBzdGF0cy5nYW1lTnVtYmVyKVxyXG5cclxuICAvLyAyLiBQYXJzZSBkdXJhdGlvblxyXG4gIGxldCBkdXJhdGlvblNlY29uZHMgPSAwXHJcbiAgaWYgKHN0YXRzLmR1cmF0aW9uKSB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IHN0YXRzLmR1cmF0aW9uLnNwbGl0KCc6JylcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgZHVyYXRpb25TZWNvbmRzID0gcGFyc2VJbnQocGFydHNbMF0pICogNjAgKyBwYXJzZUludChwYXJ0c1sxXSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHJvd3M6IGFueVtdID0gW11cclxuICBjb25zdCBpc0JsdWVXaW4gPSBzdGF0cy53aW5uZXIgPT09ICdibHVlJ1xyXG5cclxuICAvLyBCbHVlIFN0YXRzXHJcbiAgZm9yIChjb25zdCBwIG9mIHN0YXRzLmJsdWVTdGF0cykge1xyXG4gICAgaWYgKCFwLm5hbWUpIGNvbnRpbnVlXHJcbiAgICByb3dzLnB1c2goe1xyXG4gICAgICBtYXRjaF9pZDogbWF0Y2hJZCxcclxuICAgICAgZ2FtZV9udW1iZXI6IHN0YXRzLmdhbWVOdW1iZXIsXHJcbiAgICAgIHRlYW1fbmFtZTogc3RhdHMuYmx1ZVRlYW0sXHJcbiAgICAgIHBsYXllcl9uYW1lOiBwLm5hbWUsXHJcbiAgICAgIGhlcm9fbmFtZTogcC5oZXJvLFxyXG4gICAgICBraWxsczogcC5rIHx8IDAsXHJcbiAgICAgIGRlYXRoczogcC5kIHx8IDAsXHJcbiAgICAgIGFzc2lzdHM6IHAuYSB8fCAwLFxyXG4gICAgICBtdnA6IHN0YXRzLm12cCA9PT0gcC5uYW1lLFxyXG4gICAgICBnYW1lX2R1cmF0aW9uOiBkdXJhdGlvblNlY29uZHMsXHJcbiAgICAgIHdpbjogaXNCbHVlV2luLFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8vIFJlZCBTdGF0c1xyXG4gIGZvciAoY29uc3QgcCBvZiBzdGF0cy5yZWRTdGF0cykge1xyXG4gICAgaWYgKCFwLm5hbWUpIGNvbnRpbnVlXHJcbiAgICByb3dzLnB1c2goe1xyXG4gICAgICBtYXRjaF9pZDogbWF0Y2hJZCxcclxuICAgICAgZ2FtZV9udW1iZXI6IHN0YXRzLmdhbWVOdW1iZXIsXHJcbiAgICAgIHRlYW1fbmFtZTogc3RhdHMucmVkVGVhbSxcclxuICAgICAgcGxheWVyX25hbWU6IHAubmFtZSxcclxuICAgICAgaGVyb19uYW1lOiBwLmhlcm8sXHJcbiAgICAgIGtpbGxzOiBwLmsgfHwgMCxcclxuICAgICAgZGVhdGhzOiBwLmQgfHwgMCxcclxuICAgICAgYXNzaXN0czogcC5hIHx8IDAsXHJcbiAgICAgIG12cDogc3RhdHMubXZwID09PSBwLm5hbWUsXHJcbiAgICAgIGdhbWVfZHVyYXRpb246IGR1cmF0aW9uU2Vjb25kcyxcclxuICAgICAgd2luOiAhaXNCbHVlV2luLFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGlmIChyb3dzLmxlbmd0aCA+IDApIHtcclxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oJ2dhbWVfc3RhdHMnKS5pbnNlcnQocm93cylcclxuICAgIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpXHJcbiAgfVxyXG5cclxuICAvLyAzLiBVcGRhdGUgbWF0Y2hfZ2FtZXMgdGFibGUgZm9yIGR1cmF0aW9uL3dpbm5lclxyXG4gIGF3YWl0IHN1cGFiYXNlXHJcbiAgICAuZnJvbSgnbWF0Y2hfZ2FtZXMnKVxyXG4gICAgLnVwc2VydCh7XHJcbiAgICAgIG1hdGNoX2lkOiBtYXRjaElkLFxyXG4gICAgICBnYW1lX251bWJlcjogc3RhdHMuZ2FtZU51bWJlcixcclxuICAgICAgd2lubmVyX25hbWU6IHN0YXRzLndpbm5lciA9PT0gJ2JsdWUnID8gc3RhdHMuYmx1ZVRlYW0gOiBzdGF0cy5yZWRUZWFtLFxyXG4gICAgICBkdXJhdGlvbjogZHVyYXRpb25TZWNvbmRzXHJcbiAgICB9LCB7IG9uQ29uZmxpY3Q6ICdtYXRjaF9pZCwgZ2FtZV9udW1iZXInIH0pXHJcblxyXG4gIHJldmFsaWRhdGVQYXRoKCcvc3RhdHMnKVxyXG4gIHJldmFsaWRhdGVQYXRoKCcvc3RhdHMvcGxheWVyJylcclxuICByZXZhbGlkYXRlUGF0aCgnL3N0YXRzL3RlYW0nKVxyXG4gIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vcmVzdWx0cycpXHJcblxyXG4gIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWF0Y2hTdGF0c0FjdGlvbihtYXRjaElkOiBzdHJpbmcpIHtcclxuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpXHJcbiAgXHJcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgIC5mcm9tKCdnYW1lX3N0YXRzJylcclxuICAgIC5zZWxlY3QoJyonKVxyXG4gICAgLmVxKCdtYXRjaF9pZCcsIG1hdGNoSWQpXHJcbiAgICAub3JkZXIoJ2dhbWVfbnVtYmVyJywgeyBhc2NlbmRpbmc6IHRydWUgfSlcclxuXHJcbiAgaWYgKGVycm9yKSByZXR1cm4gW11cclxuICByZXR1cm4gZGF0YVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiNlNBa0tzQixnTUFBQSJ9
}),
"[project]/lib/api-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiService",
    ()=>apiService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * Client-side API Service — MIGRATED TO SUPABASE
 *
 * Drop-in replacement: same interface, Supabase backend.
 * Admin pages import this for both reads (getTeams, getSchedule, etc.)
 * and writes (createResult, saveGameStats, etc.).
 *
 * All mutations now go through Supabase directly via the browser client.
 * Auth is handled by Supabase session cookies (set by middleware).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/client.ts [app-ssr] (ecmascript)");
'use client';
;
// ── Helper: get active tournament ID (client-side) ────────────
async function getActiveTournamentId() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data } = await supabase.from('tournaments').select('id').eq('status', 'active').order('created_at', {
        ascending: false
    }).limit(1).maybeSingle();
    return data?.id || null;
}
const apiService = {
    // ── Reads ──────────────────────────────────────────────────
    getTeams: async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('teams').select('id, name, logo_url').order('name', {
            ascending: true
        });
        if (error) throw new Error(error.message);
        return (data || []).map((t)=>({
                _id: t.id,
                name: t.name,
                logo: t.logo_url || '',
                logoShort: t.logo_url || ''
            }));
    },
    getTeamStats: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.rpc('get_team_stats', {
            p_tournament_id: tournamentId
        });
        if (error) throw new Error(error.message);
        return (data || []).map((t)=>({
                teamName: t.team_name,
                totalKills: Number(t.total_kills) || 0,
                totalDeaths: Number(t.total_deaths) || 0,
                totalAssists: Number(t.total_assists) || 0,
                mvpCount: Number(t.mvp_count) || 0,
                realGamesPlayed: Number(t.real_games_played) || 0,
                realWins: Number(t.real_wins) || 0,
                avgKillsPerGame: Number(t.avg_kills_per_game) || 0,
                avgDeathsPerGame: Number(t.avg_deaths_per_game) || 0,
                avgAssistsPerGame: Number(t.avg_assists_per_game) || 0,
                avgDuration: 0,
                kda: Number(t.kda) || 0,
                winRate: Number(t.win_rate) || 0,
                realLosses: Number(t.real_losses) || 0
            }));
    },
    getPlayers: async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('players').select('id, name, teams!team_id(name), in_game_name, previous_igns, created_at').order('name', {
            ascending: true
        });
        if (error) throw new Error(error.message);
        return (data || []).map((p)=>({
                _id: p.id,
                name: p.name,
                team: p.teams?.name || undefined,
                inGameName: p.in_game_name || undefined,
                previousIGNs: p.previous_igns || [],
                createdAt: p.created_at
            }));
    },
    getPlayerStats: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.rpc('get_player_leaderboard', {
            p_tournament_id: tournamentId
        });
        if (error) throw new Error(error.message);
        return (data || []).map((p)=>({
                realName: p.real_name,
                playerName: p.player_name,
                teamName: p.team_name,
                totalKills: Number(p.total_kills) || 0,
                totalDeaths: Number(p.total_deaths) || 0,
                totalAssists: Number(p.total_assists) || 0,
                gamesPlayed: Number(p.games_played) || 0,
                mvpCount: Number(p.mvp_count) || 0,
                wins: Number(p.wins) || 0,
                winRate: Number(p.win_rate) || 0,
                avgKillsPerGame: Number(p.avg_kills) || 0,
                avgDeathsPerGame: Number(p.avg_deaths) || 0,
                avgAssistsPerGame: Number(p.avg_assists) || 0,
                mvpRate: Number(p.mvp_rate) || 0,
                kda: Number(p.kda) || 0
            }));
    },
    getPlayerHeroStats: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('game_stats').select('player_name, hero_name, win');
        if (error) throw new Error(error.message);
        const map = new Map();
        for (const row of data || []){
            if (!map.has(row.player_name)) map.set(row.player_name, new Map());
            const heroMap = map.get(row.player_name);
            const cur = heroMap.get(row.hero_name) || {
                gp: 0,
                w: 0,
                k: 0,
                d: 0,
                a: 0
            };
            cur.gp++;
            if (row.win) cur.w++;
            heroMap.set(row.hero_name, cur);
        }
        return Array.from(map.entries()).map(([playerName, heroMap])=>({
                realName: playerName,
                playerName,
                topHeroes: Array.from(heroMap.entries()).map(([heroName, stats])=>({
                        heroName,
                        gamesPlayed: stats.gp,
                        wins: stats.w,
                        totalKills: stats.k,
                        totalDeaths: stats.d,
                        totalAssists: stats.a
                    })).sort((a, b)=>b.gamesPlayed - a.gamesPlayed).slice(0, 3)
            }));
    },
    getResults: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('matches').select('*').eq('tournament_id', tournamentId).order('match_day', {
            ascending: true
        });
        if (error) throw new Error(error.message);
        return (data || []).map((m)=>({
                _id: m.id,
                matchId: m.match_key,
                matchDay: m.match_day,
                teamBlue: m.team_blue_name,
                teamRed: m.team_red_name,
                scoreBlue: m.score_blue,
                scoreRed: m.score_red,
                winner: m.winner_name,
                loser: m.loser_name,
                gameDetails: [],
                isByeWin: m.is_bye_win,
                mvp: m.mvp_player || '',
                createdAt: m.created_at
            }));
    },
    getSchedule: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return {
            _id: '',
            teams: [],
            potA: [],
            potB: [],
            schedule: [],
            createdAt: ''
        };
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('schedules').select('*').eq('tournament_id', tournamentId).order('created_at', {
            ascending: false
        }).limit(1).maybeSingle();
        if (error) throw new Error(error.message);
        if (!data) return {
            _id: '',
            teams: [],
            potA: [],
            potB: [],
            schedule: [],
            createdAt: ''
        };
        // schedule_data is JSON — convert to the legacy shape
        const rawData = typeof data.schedule_data === 'string' ? JSON.parse(data.schedule_data) : data.schedule_data;
        const raw = rawData || [];
        const schedule = raw.map((round)=>({
                day: round.day,
                date: round.date,
                matches: (round.matches || []).map((m)=>({
                        teamA: m.teamA || m.blue || '',
                        teamB: m.teamB || m.red || '',
                        blue: m.teamA || m.blue || '',
                        red: m.teamB || m.red || '',
                        time: m.time,
                        date: m.date
                    }))
            }));
        return {
            _id: data.id,
            teams: data.teams || [],
            potA: [],
            potB: [],
            schedule,
            createdAt: data.created_at
        };
    },
    getStandings: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.rpc('calculate_tournament_standings', {
            p_tournament_id: tournamentId
        });
        if (error) throw new Error(error.message);
        return (data || []).map((s)=>({
                team: s.team_name,
                name: s.team_name,
                played: Number(s.played) || 0,
                won: Number(s.wins) || 0,
                lost: Number(s.losses) || 0,
                points: Number(s.points) || 0,
                pts: Number(s.points) || 0,
                w: Number(s.wins) || 0,
                l: Number(s.losses) || 0,
                gd: Number(s.game_diff) || 0,
                gamesWon: Number(s.games_won) || 0,
                gamesLost: Number(s.games_lost) || 0,
                gameDiff: Number(s.game_diff) || 0
            }));
    },
    getSeasonStats: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return {};
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.rpc('get_season_overview', {
            p_tournament_id: tournamentId
        });
        if (error) throw new Error(error.message);
        return data;
    },
    getHeroes: async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('heroes').select('*').order('name', {
            ascending: true
        });
        if (error) throw new Error(error.message);
        return (data || []).map((h)=>({
                _id: h.id,
                name: h.name,
                imageUrl: h.image_url || '',
                createdAt: h.created_at
            }));
    },
    // ── Writes (Mutations) ─────────────────────────────────────
    createResult: async (resultData)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament found');
        const matchKey = resultData.matchId || '';
        const matchDay = parseInt(String(matchKey.split('_')[0])) || 0;
        const upsertData = {
            tournament_id: tournamentId,
            match_key: matchKey,
            match_day: matchDay,
            team_blue_name: resultData.blueTeam || resultData.teamBlue || '',
            team_red_name: resultData.redTeam || resultData.teamRed || '',
            score_blue: resultData.scoreBlue || 0,
            score_red: resultData.scoreRed || 0,
            winner_name: resultData.winner || '',
            loser_name: '',
            is_bye_win: resultData.isByeWin || false,
            mvp_player: resultData.mvp || null
        };
        // Determine loser
        if (upsertData.winner_name === upsertData.team_blue_name) {
            upsertData.loser_name = upsertData.team_red_name;
        } else if (upsertData.winner_name === upsertData.team_red_name) {
            upsertData.loser_name = upsertData.team_blue_name;
        }
        // Upsert by match_key + tournament_id
        const { data: existing } = await supabase.from('matches').select('id').eq('tournament_id', tournamentId).eq('match_key', matchKey).maybeSingle();
        let result;
        if (existing) {
            const { data, error } = await supabase.from('matches').update(upsertData).eq('id', existing.id).select().single();
            if (error) throw new Error(error.message);
            result = data;
        } else {
            const { data, error } = await supabase.from('matches').insert(upsertData).select().single();
            if (error) throw new Error(error.message);
            result = data;
        }
        return {
            _id: result.id,
            matchId: result.match_key,
            matchDay: result.match_day,
            teamBlue: result.team_blue_name,
            teamRed: result.team_red_name,
            scoreBlue: result.score_blue,
            scoreRed: result.score_red,
            winner: result.winner_name,
            loser: result.loser_name,
            gameDetails: [],
            isByeWin: result.is_bye_win,
            createdAt: result.created_at
        };
    },
    createSchedule: async (data)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament found');
        // Delete existing schedule for this tournament, then insert new one
        await supabase.from('schedules').delete().eq('tournament_id', tournamentId);
        const { data: result, error } = await supabase.from('schedules').insert({
            tournament_id: tournamentId,
            schedule_data: data.schedule,
            teams: data.teams
        }).select().single();
        if (error) throw new Error(error.message);
        return {
            _id: result.id,
            teams: result.teams || [],
            potA: [],
            potB: [],
            schedule: typeof result.schedule_data === 'string' ? JSON.parse(result.schedule_data) : result.schedule_data,
            createdAt: result.created_at
        };
    },
    createTeamLogo: async (data)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        // Upsert team logo
        const { data: existing } = await supabase.from('teams').select('id').eq('name', data.teamName).maybeSingle();
        if (existing) {
            const { error } = await supabase.from('teams').update({
                logo_url: data.logoUrl
            }).eq('id', existing.id);
            if (error) throw new Error(error.message);
        } else {
            const { error } = await supabase.from('teams').insert({
                name: data.teamName,
                logo_url: data.logoUrl
            });
            if (error) throw new Error(error.message);
        }
        return {
            success: true
        };
    },
    deleteResult: async (matchId)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament');
        const { error } = await supabase.from('matches').delete().eq('tournament_id', tournamentId).eq('match_key', matchId);
        if (error) throw new Error(error.message);
        return {
            success: true
        };
    },
    resetResults: async (day)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament');
        const { error } = await supabase.from('matches').delete().eq('tournament_id', tournamentId).eq('match_day', Number(day));
        if (error) throw new Error(error.message);
        return {
            success: true
        };
    },
    deleteTeamLogo: async (teamName)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.from('teams').update({
            logo_url: null
        }).eq('name', teamName);
        if (error) throw new Error(error.message);
        return {
            success: true
        };
    },
    saveGameStats: async (stats)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament');
        // Each item has: matchId, gameNumber, blueTeam, redTeam, stats: { blue[], red[], winner, mvp, duration }
        const rows = [];
        for (const gameStat of stats){
            // Get match ID from DB
            const { data: match } = await supabase.from('matches').select('id').eq('tournament_id', tournamentId).eq('match_key', gameStat.matchId).maybeSingle();
            if (!match) continue;
            const isBlueWin = gameStat.stats.winner === 'blue';
            // Parse duration
            let durationSeconds = 0;
            if (gameStat.stats.duration) {
                const parts = gameStat.stats.duration.split(':');
                if (parts.length === 2) {
                    durationSeconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
                }
            }
            // Blue team players
            for (const p of gameStat.stats.blue || []){
                if (!p.name) continue;
                rows.push({
                    match_id: match.id,
                    game_number: gameStat.gameNumber,
                    team_name: gameStat.blueTeam,
                    player_name: p.name,
                    hero_name: p.hero,
                    kills: p.k || 0,
                    deaths: p.d || 0,
                    assists: p.a || 0,
                    mvp: gameStat.stats.mvp === p.name,
                    game_duration: durationSeconds,
                    win: isBlueWin
                });
            }
            // Red team players
            for (const p of gameStat.stats.red || []){
                if (!p.name) continue;
                rows.push({
                    match_id: match.id,
                    game_number: gameStat.gameNumber,
                    team_name: gameStat.redTeam,
                    player_name: p.name,
                    hero_name: p.hero,
                    kills: p.k || 0,
                    deaths: p.d || 0,
                    assists: p.a || 0,
                    mvp: gameStat.stats.mvp === p.name,
                    game_duration: durationSeconds,
                    win: !isBlueWin
                });
            }
        }
        if (rows.length > 0) {
            const { error } = await supabase.from('game_stats').insert(rows);
            if (error) throw new Error(error.message);
        }
        return {
            success: true
        };
    },
    getMatchStats: async (matchId)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('game_stats').select('*').eq('match_id', matchId).order('game_number', {
            ascending: true
        });
        if (error) throw new Error(error.message);
        return data;
    },
    // ── Uploads ────────────────────────────────────────────────
    // File uploads go directly to Supabase Storage
    uploadImage: async (formData)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const file = formData.get('logo');
        if (!file) throw new Error('No file provided');
        const ext = file.name.split('.').pop() || 'png';
        const path = `logos/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from('team-logos').upload(path, file, {
            upsert: true
        });
        if (error) throw new Error(error.message);
        const { data: urlData } = supabase.storage.from('team-logos').getPublicUrl(path);
        return {
            url: urlData.publicUrl
        };
    }
};
const __TURBOPACK__default__export__ = apiService;
}),
"[project]/app/admin/results/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminResultsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sweetalert2/dist/sweetalert2.esm.all.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/LanguageProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$GameStatsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/GameStatsModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$data$3a$490991__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/features/tournament/data:490991 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$data$3a$fb7c09__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/features/tournament/data:fb7c09 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$data$3a$a170ad__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/features/tournament/data:a170ad [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$data$3a$c6a7f0__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/features/tournament/data:c6a7f0 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function AdminResultsPage() {
    const { t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedDay, setSelectedDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedMatch, setSelectedMatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Form Data
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        scoreBlue: 0,
        scoreRed: 0,
        mvp: '',
        isByeWin: false
    });
    // Game Stats Management
    const [gameStats, setGameStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [isStatsModalOpen, setIsStatsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingGameIndex, setEditingGameIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [allPlayers, setAllPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [allHeroes, setAllHeroes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        initData();
    }, []);
    const initData = async ()=>{
        setLoading(true);
        try {
            const supabase = (await __turbopack_context__.A("[project]/utils/supabase/client.ts [app-ssr] (ecmascript, async loader)")).createClient();
            // Get active tournament
            const { data: tourney } = await supabase.from('tournaments').select('id').eq('status', 'active').order('created_at', {
                ascending: false
            }).limit(1).maybeSingle();
            if (tourney) {
                const matchData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$data$3a$490991__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getMatchesAction"])(tourney.id);
                setMatches(matchData);
                if (matchData && matchData.length > 0) {
                    setSelectedDay(matchData[0].match_day);
                }
            }
            const [playersData, heroesData] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiService"].getPlayers(),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiService"].getHeroes()
            ]);
            setAllPlayers(playersData || []);
            setAllHeroes(heroesData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            setLoading(false);
        }
    };
    const handleMatchSelect = async (match)=>{
        setSelectedMatch(match);
        setFormData({
            scoreBlue: match.score_blue || 0,
            scoreRed: match.score_red || 0,
            mvp: match.mvp_player || '',
            isByeWin: match.is_bye_win || false
        });
        // Load existing game stats
        const stats = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$data$3a$c6a7f0__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getMatchStatsAction"])(match.id);
        const groupedStats = {};
        stats.forEach((s)=>{
            if (!groupedStats[s.game_number - 1]) {
                groupedStats[s.game_number - 1] = {
                    blue: [],
                    red: [],
                    winner: s.win && s.team_name === match.team_blue_name ? 'blue' : !s.win && s.team_name === match.team_blue_name ? 'red' : undefined,
                    duration: `${Math.floor(s.game_duration / 60)}:${String(s.game_duration % 60).padStart(2, '0')}`
                };
            }
            const playerStat = {
                name: s.player_name,
                hero: s.hero_name,
                k: s.kills,
                d: s.deaths,
                a: s.assists,
                gold: 0
            };
            if (s.team_name === match.team_blue_name) {
                groupedStats[s.game_number - 1].blue.push(playerStat);
                if (s.mvp) groupedStats[s.game_number - 1].mvp = s.player_name;
            } else {
                groupedStats[s.game_number - 1].red.push(playerStat);
                if (s.mvp) groupedStats[s.game_number - 1].mvp = s.player_name;
            }
            // Fix winner determination logic
            if (s.win) {
                groupedStats[s.game_number - 1].winner = s.team_name === match.team_blue_name ? 'blue' : 'red';
            }
        });
        setGameStats(groupedStats);
    };
    const handleStatSave = (data)=>{
        setGameStats((prev)=>({
                ...prev,
                [editingGameIndex]: data
            }));
        // Auto-update total score if winner is specified
        if (data.winner) {
            const currentStats = {
                ...gameStats,
                [editingGameIndex]: data
            };
            let blueWins = 0;
            let redWins = 0;
            Object.values(currentStats).forEach((g)=>{
                if (g.winner === 'blue') blueWins++;
                if (g.winner === 'red') redWins++;
            });
            setFormData((prev)=>({
                    ...prev,
                    scoreBlue: blueWins,
                    scoreRed: redWins
                }));
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire({
            icon: 'success',
            title: t.admin.resultsPage.tempSaved,
            toast: true,
            position: 'top-end',
            timer: 2000,
            showConfirmButton: false
        });
    };
    const openStatsModal = (gameIndex)=>{
        setEditingGameIndex(gameIndex);
        setIsStatsModalOpen(true);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!selectedMatch) return;
        startTransition(async ()=>{
            try {
                // 1. Update Match Summary
                const winner = formData.scoreBlue > formData.scoreRed ? selectedMatch.team_blue_name : formData.scoreRed > formData.scoreBlue ? selectedMatch.team_red_name : '';
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$data$3a$fb7c09__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateMatchResultAction"])(selectedMatch.id, {
                    scoreBlue: formData.scoreBlue,
                    scoreRed: formData.scoreRed,
                    winner,
                    isByeWin: formData.isByeWin,
                    mvp: formData.mvp
                });
                // 2. Save detailed game stats
                const gameIndices = Object.keys(gameStats).map(Number);
                for (const idx of gameIndices){
                    const game = gameStats[idx];
                    if (game && game.winner) {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$data$3a$a170ad__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["saveGameStatsAction"])(selectedMatch.id, {
                            gameNumber: idx + 1,
                            blueTeam: selectedMatch.team_blue_name,
                            redTeam: selectedMatch.team_red_name,
                            winner: game.winner,
                            mvp: game.mvp || '',
                            duration: game.duration || '00:00',
                            blueStats: game.blue,
                            redStats: game.red
                        });
                    }
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire(language === 'th' ? 'สำเร็จ' : 'Success', t.admin.resultsPage.saveSuccess, 'success');
                initData(); // Refresh list
                setSelectedMatch(null);
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire(language === 'th' ? 'ข้อผิดพลาด' : 'Error', error.message || t.admin.resultsPage.saveError, 'error');
            }
        });
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "fas fa-spinner fa-spin mr-2"
            }, void 0, false, {
                fileName: "[project]/app/admin/results/page.tsx",
                lineNumber: 233,
                columnNumber: 58
            }, this),
            " Loading..."
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/results/page.tsx",
        lineNumber: 233,
        columnNumber: 25
    }, this);
    const days = Array.from(new Set(matches.map((m)=>m.match_day))).sort((a, b)=>a - b);
    const currentMatches = matches.filter((m)=>m.match_day === selectedDay);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 animate-fadeIn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-display font-bold text-uefa-dark uppercase",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-edit mr-3 text-cyan-aura"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/results/page.tsx",
                        lineNumber: 241,
                        columnNumber: 17
                    }, this),
                    "Match ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-cyan-aura",
                        children: "Results"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/results/page.tsx",
                        lineNumber: 242,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/results/page.tsx",
                lineNumber: 240,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid lg:grid-cols-3 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-sm p-5 border border-gray-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold text-uefa-dark mb-3 uppercase tracking-wider",
                                        children: t.admin.resultsPage.selectDay
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/results/page.tsx",
                                        lineNumber: 249,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: [
                                            days.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setSelectedDay(d);
                                                        setSelectedMatch(null);
                                                    },
                                                    className: `px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedDay === d ? 'bg-uefa-dark text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`,
                                                    children: [
                                                        "DAY ",
                                                        d
                                                    ]
                                                }, d, true, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 33
                                                }, this)),
                                            days.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-xs italic",
                                                children: t.admin.resultsPage.noSchedule
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/results/page.tsx",
                                                lineNumber: 266,
                                                columnNumber: 51
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/results/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/results/page.tsx",
                                lineNumber: 248,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-sm p-5 border border-gray-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-uefa-dark mb-4 uppercase tracking-wider text-sm",
                                        children: t.admin.resultsPage.selectMatch
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/results/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 max-h-[500px] overflow-y-auto pr-2",
                                        children: [
                                            currentMatches.map((match)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleMatchSelect(match),
                                                    className: `w-full p-4 rounded-2xl border transition-all text-left relative overflow-hidden group ${selectedMatch?.id === match.id ? 'border-cyan-aura bg-cyan-50/50' : 'border-gray-100 hover:bg-gray-50'}`,
                                                    children: [
                                                        selectedMatch?.id === match.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-aura"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 282,
                                                            columnNumber: 72
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between items-center text-xs font-bold uppercase tracking-tighter",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: selectedMatch?.id === match.id ? 'text-blue-600' : 'text-gray-600',
                                                                            children: match.team_blue_name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                                            lineNumber: 285,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-300",
                                                                            children: "VS"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                                            lineNumber: 286,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: selectedMatch?.id === match.id ? 'text-red-600' : 'text-gray-600',
                                                                            children: match.team_red_name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                                            lineNumber: 287,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                                    lineNumber: 284,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-[10px] text-gray-400 mt-1 flex justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                "Current: ",
                                                                                match.score_blue,
                                                                                " - ",
                                                                                match.score_red
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                                            lineNumber: 290,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        match.winner_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-green-500",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                    className: "fas fa-check-circle"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                                                    lineNumber: 291,
                                                                                    columnNumber: 100
                                                                                }, this),
                                                                                " Result Set"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                                            lineNumber: 291,
                                                                            columnNumber: 67
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                                    lineNumber: 289,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, match.id, true, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 33
                                                }, this)),
                                            currentMatches.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-center text-gray-400 py-8 text-sm italic",
                                                children: t.admin.resultsPage.noMatchesToday
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/results/page.tsx",
                                                lineNumber: 297,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/results/page.tsx",
                                        lineNumber: 272,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/results/page.tsx",
                                lineNumber: 270,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/results/page.tsx",
                        lineNumber: 247,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2",
                        children: selectedMatch ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl shadow-sm p-8 border border-gray-100 animate-fadeIn",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-2 border border-gray-100",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl font-black text-blue-600",
                                                                children: selectedMatch.team_blue_name.charAt(0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/results/page.tsx",
                                                                lineNumber: 311,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 310,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-black text-uefa-dark uppercase",
                                                            children: selectedMatch.team_blue_name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 313,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl font-black text-gray-200 italic",
                                                    children: "VS"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-2 border border-gray-100",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl font-black text-red-600",
                                                                children: selectedMatch.team_red_name.charAt(0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/results/page.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-black text-uefa-dark uppercase",
                                                            children: selectedMatch.team_red_name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/results/page.tsx",
                                            lineNumber: 308,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest",
                                            children: [
                                                "Match ID: ",
                                                selectedMatch.match_key
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/results/page.tsx",
                                            lineNumber: 323,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/results/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleSubmit,
                                    className: "space-y-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center items-center gap-6 bg-gray-50 p-8 rounded-3xl border border-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-[10px] font-black text-blue-500 uppercase tracking-widest mb-3",
                                                            children: "Score Blue"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 332,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "0",
                                                            value: formData.scoreBlue,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    scoreBlue: parseInt(e.target.value) || 0
                                                                }),
                                                            className: "w-24 h-24 text-5xl font-black text-center bg-white border-2 border-blue-100 rounded-3xl text-uefa-dark focus:border-blue-500 outline-none transition-all shadow-sm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 333,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl font-black text-gray-300 mt-6",
                                                    children: "-"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-[10px] font-black text-red-500 uppercase tracking-widest mb-3",
                                                            children: "Score Red"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "0",
                                                            value: formData.scoreRed,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    scoreRed: parseInt(e.target.value) || 0
                                                                }),
                                                            className: "w-24 h-24 text-5xl font-black text-center bg-white border-2 border-red-100 rounded-3xl text-uefa-dark focus:border-red-500 outline-none transition-all shadow-sm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/results/page.tsx",
                                            lineNumber: 330,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center gap-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center gap-3 cursor-pointer group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${formData.isByeWin ? 'bg-cyan-aura border-cyan-aura' : 'border-gray-300 group-hover:border-cyan-aura'}`,
                                                        children: formData.isByeWin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-check text-white text-xs"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 358,
                                                            columnNumber: 67
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/results/page.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        className: "hidden",
                                                        checked: formData.isByeWin,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                isByeWin: e.target.checked
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/results/page.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-gray-600 uppercase text-xs tracking-wider",
                                                        children: t.admin.resultsPage.byeWin
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/results/page.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/results/page.tsx",
                                                lineNumber: 356,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/results/page.tsx",
                                            lineNumber: 355,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t border-gray-100 pt-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-black text-uefa-dark uppercase text-sm tracking-wider flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fas fa-chart-line text-cyan-aura"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                                    lineNumber: 374,
                                                                    columnNumber: 45
                                                                }, this),
                                                                t.admin.resultsPage.recordGameStats
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 373,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-gray-400 font-bold uppercase",
                                                            children: "Best of 5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 377,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-4 overflow-x-auto pb-4",
                                                    children: [
                                                        0,
                                                        1,
                                                        2,
                                                        3,
                                                        4
                                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>openStatsModal(i),
                                                            className: `flex-shrink-0 w-28 h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${gameStats[i] ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-dashed border-gray-200 text-gray-400 hover:border-cyan-aura hover:text-cyan-aura'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-black uppercase",
                                                                    children: [
                                                                        "Game ",
                                                                        i + 1
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                                    lineNumber: 391,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: `fas ${gameStats[i] ? 'fa-check-circle' : 'fa-plus-circle'} text-lg`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                                    lineNumber: 392,
                                                                    columnNumber: 49
                                                                }, this),
                                                                gameStats[i]?.winner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-bold uppercase",
                                                                    children: [
                                                                        gameStats[i].winner,
                                                                        " Win"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                                    lineNumber: 393,
                                                                    columnNumber: 74
                                                                }, this)
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 382,
                                                            columnNumber: 45
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-6 bg-gray-50 p-5 rounded-2xl border border-gray-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs font-bold text-gray-500 uppercase mb-2",
                                                            children: t.admin.resultsPage.matchMvpLabel
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 400,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: formData.mvp,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    mvp: e.target.value
                                                                }),
                                                            className: "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-aura text-sm font-bold text-uefa-dark",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: t.admin.resultsPage.selectMvpPlaceholder
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                                    lineNumber: 406,
                                                                    columnNumber: 45
                                                                }, this),
                                                                allPlayers.filter((p)=>p.team === selectedMatch.team_blue_name || p.team === selectedMatch.team_red_name).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: p.name,
                                                                        children: [
                                                                            p.name,
                                                                            " ",
                                                                            p.inGameName ? `(${p.inGameName})` : '',
                                                                            " [",
                                                                            p.team,
                                                                            "]"
                                                                        ]
                                                                    }, p._id, true, {
                                                                        fileName: "[project]/app/admin/results/page.tsx",
                                                                        lineNumber: 408,
                                                                        columnNumber: 49
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/results/page.tsx",
                                                            lineNumber: 401,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/results/page.tsx",
                                            lineNumber: 371,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setSelectedMatch(null),
                                                    className: "flex-1 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase text-sm tracking-widest",
                                                    children: t.admin.resultsPage.cancelBtn
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 418,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    disabled: isPending,
                                                    className: "flex-[2] py-4 bg-gradient-to-r from-cyan-aura to-blue-600 text-white font-black rounded-2xl shadow-xl shadow-cyan-aura/20 hover:shadow-cyan-aura/40 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase text-sm tracking-widest disabled:opacity-50",
                                                    children: isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "fas fa-spinner fa-spin mr-2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/results/page.tsx",
                                                                lineNumber: 430,
                                                                columnNumber: 56
                                                            }, this),
                                                            " ",
                                                            t.admin.resultsPage.saving
                                                        ]
                                                    }, void 0, true) : t.admin.resultsPage.saveAllBtn
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/results/page.tsx",
                                                    lineNumber: 425,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/results/page.tsx",
                                            lineNumber: 417,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/results/page.tsx",
                                    lineNumber: 328,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/results/page.tsx",
                            lineNumber: 306,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full min-h-[500px] flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200 p-12 text-gray-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-hand-pointer text-4xl animate-bounce text-gray-200"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/results/page.tsx",
                                        lineNumber: 438,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/results/page.tsx",
                                    lineNumber: 437,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold text-gray-400 uppercase tracking-widest text-sm",
                                    children: t.admin.resultsPage.pleaseSelectMatch
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/results/page.tsx",
                                    lineNumber: 440,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs mt-2",
                                    children: t.admin.resultsPage.selectMatchDesc
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/results/page.tsx",
                                    lineNumber: 441,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/results/page.tsx",
                            lineNumber: 436,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/results/page.tsx",
                        lineNumber: 304,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/results/page.tsx",
                lineNumber: 245,
                columnNumber: 13
            }, this),
            selectedMatch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$GameStatsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isStatsModalOpen,
                onClose: ()=>setIsStatsModalOpen(false),
                teamBlue: selectedMatch.team_blue_name,
                teamRed: selectedMatch.team_red_name,
                gameNumber: editingGameIndex + 1,
                initialData: gameStats[editingGameIndex],
                onSave: handleStatSave,
                allPlayers: allPlayers,
                allHeroes: allHeroes
            }, void 0, false, {
                fileName: "[project]/app/admin/results/page.tsx",
                lineNumber: 448,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/results/page.tsx",
        lineNumber: 239,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=_96131ad1._.js.map