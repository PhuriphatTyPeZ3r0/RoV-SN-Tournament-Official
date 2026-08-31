'use client';

import Icon from '@/components/common/Icon';
import { useState, useEffect, useTransition } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { 
    getTournamentsAction, 
    updateTournamentThemeAction,
    getThemesAction,
    createThemeAction,
    updateThemeAction,
    deleteThemeAction
} from '@/features/tournament/actions';
import Swal from 'sweetalert2';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import Modal, { ModalFooter } from '@/components/ui/Modal';

interface Tournament {
    id: string;
    name: string;
    season: number;
    status: string;
    theme_style?: string;
}

interface Theme {
    id: string;
    name: string;
    description: string | null;
    primary_color: string;
    secondary_color: string;
    bg_deep: string;
    bg_surface: string;
    primary_light: string;
    primary_dark: string;
    is_preset: boolean;
}

const initialFormData = {
    id: '',
    name: '',
    description: '',
    primary_color: '#15C8FF',
    secondary_color: '#E8F7FF',
    bg_deep: '#0a1628',
    bg_surface: '#0f1f35',
    primary_light: '#4dd9ff',
    primary_dark: '#0099cc'
};

function adjustColorBrightness(hex: string, percent: number): string {
    const cleanHex = hex.replace("#", "");
    let num = parseInt(cleanHex, 16);
    let amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt;
    let G = (num >> 8 & 0x00ff) + amt;
    let B = (num & 0x0000ff) + amt;

    R = Math.max(0, Math.min(255, R));
    G = Math.max(0, Math.min(255, G));
    B = Math.max(0, Math.min(255, B));

    const R_hex = R.toString(16).padStart(2, '0');
    const G_hex = G.toString(16).padStart(2, '0');
    const B_hex = B.toString(16).padStart(2, '0');

    return `#${R_hex}${G_hex}${B_hex}`;
}

export default function AdminThemesPage() {
    const { t, language } = useLanguage();
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);
    const [selectedTourId, setSelectedTourId] = useState<string>('');
    const [activeTheme, setActiveTheme] = useState<string>('echo');
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [tourData, themeData] = await Promise.all([
                getTournamentsAction(),
                getThemesAction()
            ]);
            setTournaments(tourData);
            setThemes(themeData);

            if (tourData.length > 0) {
                const activeTour = tourData.find(t => t.status === 'active') || tourData[0];
                setSelectedTourId(activeTour.id);
                setActiveTheme(activeTour.theme_style || 'echo');
            }
        } catch (error: any) {
            console.error('Failed to load theme data:', error);
            Swal.fire(t.admin.themesPage.errorTitle, t.admin.themesPage.loadError, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleTournamentChange = (tourId: string) => {
        setSelectedTourId(tourId);
        const tour = tournaments.find(t => t.id === tourId);
        if (tour) {
            setActiveTheme(tour.theme_style || 'echo');
        }
    };

    const handleSaveTheme = () => {
        if (!selectedTourId) return;

        const selectedTour = tournaments.find(t => t.id === selectedTourId);
        const selectedThemeObj = themes.find(t => t.id === activeTheme);

        Swal.fire({
            title: t.admin.themesPage.confirmChangeTheme,
            text: t.admin.themesPage.confirmChangeThemeText.replace('{theme}', selectedThemeObj?.name || activeTheme).replace('{tour}', selectedTour?.name || ''),
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: t.admin.themesPage.confirmSettingsBtn,
            confirmButtonColor: '#15C8FF',
            cancelButtonText: t.admin.themesPage.cancelBtn,
        }).then((result) => {
            if (result.isConfirmed) {
                startTransition(async () => {
                    try {
                        await updateTournamentThemeAction(selectedTourId, activeTheme);
                        
                        setTournaments(prev => 
                            prev.map(t => t.id === selectedTourId ? { ...t, theme_style: activeTheme } : t)
                        );

                        document.documentElement.setAttribute('data-theme', activeTheme);

                        Swal.fire({
                            icon: 'success',
                            title: t.admin.themesPage.changeThemeSuccess,
                            text: t.admin.themesPage.changeThemeSuccessText,
                            timer: 2000,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.reload();
                        });
                    } catch (error: any) {
                        Swal.fire(t.admin.themesPage.errorTitle, error.message || t.admin.themesPage.saveThemeFailed, 'error');
                    }
                });
            }
        });
    };

    // CRUD Event Handlers
    const openCreateModal = () => {
        setModalMode('create');
        setFormData(initialFormData);
        setIsModalOpen(true);
    };

    const openEditModal = (theme: Theme) => {
        setModalMode('edit');
        setFormData({
            id: theme.id,
            name: theme.name,
            description: theme.description || '',
            primary_color: theme.primary_color,
            secondary_color: theme.secondary_color,
            bg_deep: theme.bg_deep,
            bg_surface: theme.bg_surface,
            primary_light: theme.primary_light,
            primary_dark: theme.primary_dark
        });
        setIsModalOpen(true);
    };

    const handleDeleteTheme = (themeId: string, themeName: string) => {
        Swal.fire({
            title: t.admin.themesPage.confirmDeleteTheme,
            text: t.admin.themesPage.confirmDeleteThemeText.replace('{theme}', themeName),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t.admin.themesPage.deleteThemeBtn,
            confirmButtonColor: '#EF4444',
            cancelButtonText: t.admin.themesPage.cancelBtn
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteThemeAction(themeId);
                    setThemes(prev => prev.filter(t => t.id !== themeId));
                    if (activeTheme === themeId) {
                        setActiveTheme('echo');
                    }
                    Swal.fire(t.admin.themesPage.successTitle, t.admin.themesPage.deleteThemeSuccess, 'success');
                } catch (error: any) {
                    Swal.fire(t.admin.themesPage.errorTitle, error.message || t.admin.themesPage.saveThemeFailed, 'error');
                }
            }
        });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // client validations
        if (!formData.name.trim()) return Swal.fire(t.admin.themesPage.incompleteData, t.admin.themesPage.enterThemeNameAlert, 'warning');
        if (modalMode === 'create') {
            if (!formData.id.trim()) return Swal.fire(t.admin.themesPage.incompleteData, t.admin.themesPage.enterThemeIdAlert, 'warning');
            if (!/^[a-z0-9-]+$/.test(formData.id)) {
                return Swal.fire(t.admin.themesPage.invalidThemeIdFormat, t.admin.themesPage.invalidThemeIdFormatHint, 'warning');
            }
        }

        const colorRegex = /^#[0-9A-F]{6}$/i;
        const colorFields = ['primary_color', 'secondary_color', 'bg_deep', 'bg_surface', 'primary_light', 'primary_dark'];
        for (const field of colorFields) {
            const val = (formData as any)[field];
            if (!colorRegex.test(val)) {
                return Swal.fire(t.admin.themesPage.invalidColorFormat, t.admin.themesPage.invalidColorFormatHint.replace('{field}', field), 'warning');
            }
        }

        try {
            if (modalMode === 'create') {
                const newTheme = await createThemeAction(formData);
                setThemes(prev => [...prev, newTheme]);
                Swal.fire(t.admin.themesPage.successTitle, t.admin.themesPage.createThemeSuccess, 'success');
            } else {
                const updatedTheme = await updateThemeAction(formData.id, {
                    name: formData.name,
                    description: formData.description,
                    primary_color: formData.primary_color,
                    secondary_color: formData.secondary_color,
                    bg_deep: formData.bg_deep,
                    bg_surface: formData.bg_surface,
                    primary_light: formData.primary_light,
                    primary_dark: formData.primary_dark
                });
                setThemes(prev => prev.map(t => t.id === formData.id ? updatedTheme : t));
                Swal.fire(t.admin.themesPage.successTitle, t.admin.themesPage.updateThemeSuccess, 'success');
            }
            setIsModalOpen(false);
        } catch (error: any) {
            Swal.fire(t.admin.themesPage.errorTitle, error.message || t.admin.themesPage.saveThemeFailed, 'error');
        }
    };

    const handleAutoGenerateColors = () => {
        const prim = formData.primary_color;
        if (/^#[0-9A-F]{6}$/i.test(prim)) {
            setFormData(prev => ({
                ...prev,
                primary_light: adjustColorBrightness(prim, 20),
                primary_dark: adjustColorBrightness(prim, -20),
                secondary_color: adjustColorBrightness(prim, 80),
                bg_deep: adjustColorBrightness(prim, -90),
                bg_surface: adjustColorBrightness(prim, -80)
            }));
        } else {
            Swal.fire(t.admin.themesPage.suggestionTitle, t.admin.themesPage.primaryColorFirstHint, 'info');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"></div>
            </div>
        );
    }

    const currentTour = tournaments.find(t => t.id === selectedTourId);

    return (
        <div className="space-y-8 animate-fadeIn relative">
            {/* Header section */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-display font-bold text-uefa-dark uppercase">
                        WebApp <span className="text-cyan-aura">Theme Config</span>
                    </h1>
                    <p className="text-gray-500 text-sm">{t.admin.themesPage.pageSubtitle}</p>
                </div>
                <Button
                    onClick={openCreateModal}
                    className="bg-cyan-aura hover:bg-cyan-500 text-uefa-dark font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 text-sm"
                >
                    <Icon name="add" />
                    {t.admin.themesPage.newThemeBtn}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left panel: Tournament Selector */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-uefa-dark mb-4 flex items-center gap-2">
                            <Icon name="emoji_events" className="text-cyan-aura" />
                            {t.admin.themesPage.selectTournament}
                        </h3>
                        
                        <div className="space-y-3">
                            {tournaments.map(tour => (
                                <Button
                                    variant="ghost"
                                    key={tour.id}
                                    onClick={() => handleTournamentChange(tour.id)}
                                    className={`w-full justify-start text-left p-4 rounded-xl border flex-col items-start gap-1 ${
                                        selectedTourId === tour.id
                                            ? 'bg-gradient-to-r from-uefa-dark to-slate-800 text-white border-cyan-aura hover:from-uefa-dark hover:to-slate-800'
                                            : 'bg-gray-50 border-gray-100 hover:bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    <div className="flex justify-between items-center w-full">
                                        <span className="font-display font-bold text-sm uppercase">
                                            {tour.name}
                                        </span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                                            tour.status === 'active'
                                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                        }`}>
                                            {tour.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                                        <span>Season {tour.season}</span>
                                        <span className="capitalize font-mono">
                                            Theme: {tour.theme_style || 'echo'}
                                        </span>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right panel: Theme Config Options */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-uefa-dark mb-4 flex items-center gap-2 border-b pb-3">
                            <Icon name="palette" className="text-cyan-aura" />
                            {t.admin.themesPage.activeThemeFor}: <span className="text-cyan-aura">{currentTour?.name}</span>
                        </h3>

                        {/* Theme Grid Option Selection */}
                        <div role="radiogroup" aria-label={t.admin.themesPage.activeThemeFor} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            {themes.map(theme => {
                                const isSelected = activeTheme === theme.id;
                                return (
                                    <div
                                        key={theme.id}
                                        role="radio"
                                        aria-checked={isSelected}
                                        tabIndex={0}
                                        onClick={() => setActiveTheme(theme.id)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setActiveTheme(theme.id);
                                            }
                                        }}
                                        className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-lg flex flex-col justify-between gap-4 relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-aura ${
                                            isSelected 
                                                ? 'border-cyan-aura bg-cyan-50/5 shadow-md' 
                                                : 'border-gray-100 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-display font-bold text-lg text-uefa-dark uppercase group-hover:text-cyan-aura transition-colors">
                                                    {theme.name}
                                                </h4>
                                                <div className="flex items-center gap-2">
                                                    {theme.is_preset && (
                                                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                                                            PRESET
                                                        </span>
                                                    )}
                                                    <div className="flex gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            iconOnly
                                                            icon="edit"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openEditModal(theme);
                                                            }}
                                                            className="w-7 h-7 bg-gray-100 text-gray-600 hover:bg-cyan-100 hover:text-cyan-600 text-xs"
                                                        >
                                                            {t.admin.themesPage.editTheme}
                                                        </Button>
                                                        {!theme.is_preset && (
                                                            <Button
                                                                variant="ghost"
                                                                iconOnly
                                                                icon="delete_outline"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeleteTheme(theme.id, theme.name);
                                                                }}
                                                                className="w-7 h-7 bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 text-xs"
                                                            >
                                                                {t.admin.themesPage.deleteTheme}
                                                            </Button>
                                                        )}
                                                    </div>
                                                    {isSelected && (
                                                        <span className="w-5 h-5 rounded-full bg-cyan-aura text-uefa-dark flex items-center justify-center text-[10px] font-bold">
                                                            <Icon name="done" />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-400 leading-relaxed min-h-[32px]">
                                                {theme.description || t.admin.themesPage.noDescription}
                                            </p>
                                        </div>

                                        {/* Color preview display */}
                                        <div className="space-y-2 mt-2">
                                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                                Preview Palette
                                            </span>
                                            <div 
                                                className="p-3 rounded-xl border flex gap-3 items-center"
                                                style={{ 
                                                    backgroundColor: theme.bg_deep,
                                                    borderColor: theme.primary_color + '4D' // 30% alpha
                                                }}
                                            >
                                                <div 
                                                    className="w-6 h-6 rounded-full border border-white/20 shadow-sm"
                                                    style={{ backgroundColor: theme.primary_color }}
                                                    title={`Primary Color: ${theme.primary_color}`}
                                                />
                                                <div 
                                                    className="w-6 h-6 rounded-full border border-white/20 shadow-sm"
                                                    style={{ backgroundColor: theme.secondary_color }}
                                                    title={`Secondary Color: ${theme.secondary_color}`}
                                                />
                                                <div 
                                                    className="w-6 h-6 rounded-full border border-white/20 shadow-sm"
                                                    style={{ backgroundColor: theme.bg_surface }}
                                                    title={`Surface Color: ${theme.bg_surface}`}
                                                />
                                                <span className="text-white text-[10px] font-mono font-bold uppercase ml-auto">
                                                    {theme.id}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Save Actions Button */}
                        <div className="mt-8 flex justify-end gap-3 border-t pt-5">
                            <Button
                                onClick={handleSaveTheme}
                                disabled={isPending || !selectedTourId}
                                className="bg-gradient-to-r from-cyan-aura to-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-cyan-aura/25 hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 flex items-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <Icon name="progress_activity" spin />
                                        {t.admin.themesPage.saving}
                                    </>
                                ) : (
                                    <>
                                        <Icon name="save" />
                                        {t.admin.themesPage.saveThemeSettings}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                title={modalMode === 'create' ? t.admin.themesPage.createThemeHeader : `${t.admin.themesPage.editThemeHeader}: ${formData.name}`}
                size="lg"
            >
                        {/* Modal Content / Form */}
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-uefa-dark uppercase mb-1">
                                        {t.admin.themesPage.themeId}
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.id}
                                        onChange={e => setFormData(prev => ({ ...prev, id: e.target.value.toLowerCase() }))}
                                        disabled={modalMode === 'edit'}
                                        placeholder={t.admin.themesPage.themeIdPlaceholder}
                                        className="w-full p-2.5 text-sm bg-gray-50 focus:bg-white focus-visible:ring-cyan-aura focus-visible:ring-offset-0 disabled:opacity-60"
                                        required
                                    />
                                    {modalMode === 'create' && (
                                        <p className="text-[10px] text-gray-400 mt-1">
                                            {t.admin.themesPage.themeIdHint}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-uefa-dark uppercase mb-1">
                                        {t.admin.themesPage.themeName}
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder={t.admin.themesPage.themeNamePlaceholder}
                                        className="w-full p-2.5 text-sm bg-gray-50 focus:bg-white focus-visible:ring-cyan-aura focus-visible:ring-offset-0"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-uefa-dark uppercase mb-1">
                                    {t.admin.themesPage.themeDescription}
                                </label>
                                <Textarea
                                    value={formData.description}
                                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder={t.admin.themesPage.themeDescriptionPlaceholder}
                                    rows={2}
                                    className="w-full p-2.5 text-sm bg-gray-50 focus:bg-white focus-visible:ring-cyan-aura focus-visible:ring-offset-0"
                                />
                            </div>

                            {/* Color Configuration Section */}
                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-sm font-bold text-uefa-dark uppercase">
                                        {t.admin.themesPage.colorSettings}
                                    </h4>
                                    <Button
                                        variant="ghost"
                                        type="button"
                                        onClick={handleAutoGenerateColors}
                                        className="text-xs text-cyan-aura hover:text-cyan-500 hover:bg-transparent font-bold flex items-center gap-1.5 p-0 h-auto"
                                    >
                                        <Icon name="auto_fix_high" />
                                        {t.admin.themesPage.autoGenerate}
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Primary Color */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                            {t.admin.themesPage.primaryColor}
                                        </label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="color"
                                                value={formData.primary_color}
                                                onChange={e => setFormData(prev => ({ ...prev, primary_color: e.target.value.toUpperCase() }))}
                                                className="w-10 h-10 p-0 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer bg-transparent"
                                            />
                                            <Input
                                                type="text"
                                                value={formData.primary_color}
                                                onChange={e => setFormData(prev => ({ ...prev, primary_color: e.target.value.toUpperCase() }))}
                                                placeholder="#15C8FF"
                                                maxLength={7}
                                                className="flex-1 p-2 text-sm bg-gray-50 font-mono focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </div>
                                    </div>

                                    {/* Secondary Color */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                            {t.admin.themesPage.secondaryColor}
                                        </label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="color"
                                                value={formData.secondary_color}
                                                onChange={e => setFormData(prev => ({ ...prev, secondary_color: e.target.value.toUpperCase() }))}
                                                className="w-10 h-10 p-0 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer bg-transparent"
                                            />
                                            <Input
                                                type="text"
                                                value={formData.secondary_color}
                                                onChange={e => setFormData(prev => ({ ...prev, secondary_color: e.target.value.toUpperCase() }))}
                                                placeholder="#E8F7FF"
                                                maxLength={7}
                                                className="flex-1 p-2 text-sm bg-gray-50 font-mono focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </div>
                                    </div>

                                    {/* Background Deep */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                            {t.admin.themesPage.bgDeep}
                                        </label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="color"
                                                value={formData.bg_deep}
                                                onChange={e => setFormData(prev => ({ ...prev, bg_deep: e.target.value.toUpperCase() }))}
                                                className="w-10 h-10 p-0 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer bg-transparent"
                                            />
                                            <Input
                                                type="text"
                                                value={formData.bg_deep}
                                                onChange={e => setFormData(prev => ({ ...prev, bg_deep: e.target.value.toUpperCase() }))}
                                                placeholder="#0A1628"
                                                maxLength={7}
                                                className="flex-1 p-2 text-sm bg-gray-50 font-mono focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </div>
                                    </div>

                                    {/* Background Surface */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                            {t.admin.themesPage.bgSurface}
                                        </label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="color"
                                                value={formData.bg_surface}
                                                onChange={e => setFormData(prev => ({ ...prev, bg_surface: e.target.value.toUpperCase() }))}
                                                className="w-10 h-10 p-0 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer bg-transparent"
                                            />
                                            <Input
                                                type="text"
                                                value={formData.bg_surface}
                                                onChange={e => setFormData(prev => ({ ...prev, bg_surface: e.target.value.toUpperCase() }))}
                                                placeholder="#0F1F35"
                                                maxLength={7}
                                                className="flex-1 p-2 text-sm bg-gray-50 font-mono focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </div>
                                    </div>

                                    {/* Primary Light Accent */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                            {t.admin.themesPage.primaryLight}
                                        </label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="color"
                                                value={formData.primary_light}
                                                onChange={e => setFormData(prev => ({ ...prev, primary_light: e.target.value.toUpperCase() }))}
                                                className="w-10 h-10 p-0 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer bg-transparent"
                                            />
                                            <Input
                                                type="text"
                                                value={formData.primary_light}
                                                onChange={e => setFormData(prev => ({ ...prev, primary_light: e.target.value.toUpperCase() }))}
                                                placeholder="#4DD9FF"
                                                maxLength={7}
                                                className="flex-1 p-2 text-sm bg-gray-50 font-mono focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </div>
                                    </div>

                                    {/* Primary Dark Accent */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                            {t.admin.themesPage.primaryDark}
                                        </label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="color"
                                                value={formData.primary_dark}
                                                onChange={e => setFormData(prev => ({ ...prev, primary_dark: e.target.value.toUpperCase() }))}
                                                className="w-10 h-10 p-0 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer bg-transparent"
                                            />
                                            <Input
                                                type="text"
                                                value={formData.primary_dark}
                                                onChange={e => setFormData(prev => ({ ...prev, primary_dark: e.target.value.toUpperCase() }))}
                                                placeholder="#0099CC"
                                                maxLength={7}
                                                className="flex-1 p-2 text-sm bg-gray-50 font-mono focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Button */}
                            <ModalFooter>
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 rounded-lg border hover:bg-gray-50 font-bold text-sm text-gray-600"
                                >
                                    {t.admin.themesPage.cancelBtn}
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-cyan-aura hover:bg-cyan-500 text-uefa-dark font-bold px-6 py-2.5 rounded-lg shadow-md text-sm"
                                >
                                    {modalMode === 'create' ? t.admin.themesPage.createThemeBtn : t.admin.themesPage.saveChangesBtn}
                                </Button>
                            </ModalFooter>
                        </form>
            </Modal>
        </div>
    );
}
