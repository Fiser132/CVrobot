'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils' // Assuming you have this utility
import {
    Plus,
    Edit3,
    Download,
    Share2,
    Trash2,
    Eye,
    FileText,
    Calendar,
    X,
    Check,
    AlertTriangle,
    Copy,
    MoreHorizontal,
    Star,
    Archive,
    FolderPlus,
    Filter,
    Search,
    SortAsc,
    SortDesc,
    Grid3X3,
    List,
    Upload,
    Zap,
    Crown,
    ExternalLink,
    Info,
    Settings,
    BarChart3,
    Briefcase,
    Clock,
    Users,
    TrendingUp,
    Target,
    HelpCircle,
    Sparkles,
    Palette,
    FileCheck,
    Globe,
    Shield
} from 'lucide-react'
import { PDFViewer } from '@react-pdf/renderer'
import { CvPdfDocument } from './edit/[id]/components/CvPdfDocument'

interface CV {
    _id: string
    name: string
    date: string
    content: Record<string, any>
    starred?: boolean
    archived?: boolean
    template?: string
    views?: number
    lastOpened?: string
    shareUrl?: string
    atsScore?: number
    completeness?: number
    targetRole?: string
    tags?: string[]
}

interface ModalState {
    isOpen: boolean
    type: 'view' | 'delete' | 'create' | 'share' | 'duplicate' | 'analytics' | 'templates' | null
    data?: CV | null
}

interface FilterState {
    search: string
    starred: boolean
    archived: boolean
    sortBy: 'date' | 'name' | 'views' | 'atsScore'
    sortOrder: 'asc' | 'desc'
    viewMode: 'grid' | 'list'
}

const CVDashboard = () => {
    const { user } = useUser()
    const [cvs, setCvs] = useState<CV[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [modal, setModal] = useState<ModalState>({ isOpen: false, type: null })
    const [newCvTitle, setNewCvTitle] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        starred: false,
        archived: false,
        sortBy: 'date',
        sortOrder: 'desc',
        viewMode: 'grid'
    })
    const [showTutorial, setShowTutorial] = useState(false)

    const params = useParams()
    const locale = params.locale ?? 'sk'
    const withLocale = useCallback((path: string) => `/${locale}${path}`, [locale])

    // Enhanced CV data with analytics
    const enhancedCvs = cvs.map(cv => ({
        ...cv,
        atsScore: cv.atsScore || Math.floor(Math.random() * 40) + 60, // Mock ATS score
        completeness: cv.completeness || Math.floor(Math.random() * 30) + 70,
        views: cv.views || Math.floor(Math.random() * 20),
        lastOpened: cv.lastOpened || cv.date,
        targetRole: cv.targetRole || 'Software Engineer'
    }))

    const filteredAndSortedCvs = enhancedCvs
        .filter(cv => {
            if (filters.archived && !cv.archived) return false
            if (!filters.archived && cv.archived) return false
            if (filters.starred && !cv.starred) return false
            if (filters.search && !cv.name.toLowerCase().includes(filters.search.toLowerCase())) return false
            return true
        })
        .sort((a, b) => {
            const multiplier = filters.sortOrder === 'asc' ? 1 : -1
            switch (filters.sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name) * multiplier
                case 'views':
                    return (a.views - b.views) * multiplier
                case 'atsScore':
                    return (a.atsScore - b.atsScore) * multiplier
                default:
                    return (new Date(a.date).getTime() - new Date(b.date).getTime()) * multiplier
            }
        })

    const fetchCvs = useCallback(async () => {
        if (!user) return

        try {
            setIsLoading(true)
            const response = await fetch('/api/cvs')
            const data = await response.json()
            setCvs(data)
        } catch (error) {
            console.error('Failed to fetch CVs:', error)
        } finally {
            setIsLoading(false)
        }
    }, [user])

    useEffect(() => {
        fetchCvs()
    }, [fetchCvs])

    const openModal = useCallback((type: ModalState['type'], data?: CV) => {
        setModal({ isOpen: true, type, data })
    }, [])

    const closeModal = useCallback(() => {
        setModal({ isOpen: false, type: null, data: null })
        setNewCvTitle('')
    }, [])

    const handleCreateCV = async () => {
        if (!newCvTitle.trim() || isCreating) return

        try {
            setIsCreating(true)
            const response = await fetch('/api/cvs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newCvTitle.trim(),
                    content: {}
                }),
            })

            if (response.ok) {
                await fetchCvs()
                closeModal()
            }
        } catch (error) {
            console.error('Failed to create CV:', error)
        } finally {
            setIsCreating(false)
        }
    }

    const handleDeleteCV = async () => {
        if (!modal.data || isDeleting) return

        try {
            setIsDeleting(true)
            const response = await fetch('/api/cvs/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: modal.data._id }),
            })

            if (response.ok) {
                await fetchCvs()
                closeModal()
            }
        } catch (error) {
            console.error('Failed to delete CV:', error)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleStarCV = async (cvId: string) => {
        // Implement star toggle
        setCvs(prev => prev.map(cv =>
            cv._id === cvId ? { ...cv, starred: !cv.starred } : cv
        ))
    }

    const handleDuplicateCV = async (cv: CV) => {
        try {
            const response = await fetch('/api/cvs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${cv.name} (kopie)`,
                    content: cv.content
                }),
            })
            if (response.ok) await fetchCvs()
        } catch (error) {
            console.error('Failed to duplicate CV:', error)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('cs-CZ', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getATSScoreClasses = (score: number) => {
        if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200'
        if (score >= 80) return 'text-blue-700 bg-blue-50 border-blue-200'
        if (score >= 70) return 'text-amber-700 bg-amber-50 border-amber-200'
        return 'text-rose-700 bg-rose-50 border-rose-200'
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-400 border-t-transparent"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            {/* Enhanced Header Section */}
            <div className="bg-white shadow-sm border-b border-orange-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Vítejte zpět, {user?.firstName || user?.fullName?.split(' ')[0]}
                                </h1>
                                <Tooltip content="Získejte tipy pro lepší životopisy">
                                    <button
                                        onClick={() => setShowTutorial(true)}
                                        className="p-1 hover:bg-orange-50 rounded-full transition-colors"
                                    >
                                        <HelpCircle className="w-5 h-5 text-gray-400" />
                                    </button>
                                </Tooltip>
                            </div>
                            <p className="text-gray-600">
                                Spravujte své životopisy a vytvářejte nové příležitosti
                            </p>

                            {/* Quick Stats */}
                            <div className="flex items-center gap-6 mt-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FileText className="w-4 h-4 text-orange-500" />
                                    <span>{cvs.length} životopisů</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                                    <span>Průměrné ATS skóre: {Math.round(enhancedCvs.reduce((acc, cv) => acc + cv.atsScore, 0) / enhancedCvs.length || 0)}%</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Eye className="w-4 h-4 text-blue-500" />
                                    <span>{enhancedCvs.reduce((acc, cv) => acc + cv.views, 0)} zobrazení</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => openModal('templates')}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <Palette className="w-4 h-4" />
                                Šablony
                            </button>

                            <button
                                onClick={() => openModal('create')}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                <Plus className="w-5 h-5" />
                                Nový životopis
                            </button>

                            <DropdownMenu
                                trigger={
                                    <button className="p-3 hover:bg-orange-50 rounded-xl transition-colors">
                                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                    </button>
                                }
                                items={[
                                    { label: 'Import z LinkedIn', icon: Upload, action: () => { } },
                                    { label: 'Hromadné operace', icon: FileCheck, action: () => { } },
                                    { label: 'Exportovat vše', icon: Download, action: () => { } },
                                    { label: 'Nastavení', icon: Settings, action: () => { } }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Filters & Search */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Hledat životopisy..."
                                className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex items-center gap-2">
                            <FilterButton
                                active={filters.starred}
                                onClick={() => setFilters(prev => ({ ...prev, starred: !prev.starred }))}
                                icon={Star}
                                label="Oblíbené"
                            />

                            <FilterButton
                                active={filters.archived}
                                onClick={() => setFilters(prev => ({ ...prev, archived: !prev.archived }))}
                                icon={Archive}
                                label="Archivované"
                            />
                        </div>

                        {/* Sort & View Controls */}
                        <div className="flex items-center gap-2">
                            <select
                                className="px-3 py-2 border border-orange-200 rounded-lg text-sm"
                                value={`${filters.sortBy}-${filters.sortOrder}`}
                                onChange={(e) => {
                                    const [sortBy, sortOrder] = e.target.value.split('-') as [FilterState['sortBy'], FilterState['sortOrder']]
                                    setFilters(prev => ({ ...prev, sortBy, sortOrder }))
                                }}
                            >
                                <option value="date-desc">Nejnovější</option>
                                <option value="date-asc">Nejstarší</option>
                                <option value="name-asc">Název A-Z</option>
                                <option value="name-desc">Název Z-A</option>
                                <option value="atsScore-desc">Nejvyšší ATS skóre</option>
                                <option value="views-desc">Nejvíce zobrazení</option>
                            </select>

                            <div className="flex rounded-lg border border-orange-200 overflow-hidden">
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, viewMode: 'grid' }))}
                                    className={cn(
                                        "p-2 transition-colors",
                                        filters.viewMode === 'grid'
                                            ? 'bg-orange-50 text-orange-600'
                                            : 'text-gray-400 hover:text-gray-600'
                                    )}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, viewMode: 'list' }))}
                                    className={cn(
                                        "p-2 transition-colors",
                                        filters.viewMode === 'list'
                                            ? 'bg-orange-50 text-orange-600'
                                            : 'text-gray-400 hover:text-gray-600'
                                    )}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                {filteredAndSortedCvs.length === 0 ? (
                    filters.search || filters.starred || filters.archived ? (
                        // No Results State
                        <div className="text-center py-16">
                            <div className="bg-white rounded-3xl shadow-lg p-12 max-w-lg mx-auto border border-orange-100">
                                <Search className="w-16 h-16 text-orange-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Žádné výsledky</h3>
                                <p className="text-gray-600 mb-6">Zkuste upravit filtry nebo vyhledávací dotaz</p>
                                <button
                                    onClick={() => setFilters({
                                        search: '',
                                        starred: false,
                                        archived: false,
                                        sortBy: 'date',
                                        sortOrder: 'desc',
                                        viewMode: 'grid'
                                    })}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    Vymazat filtry
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Empty State
                        <div className="text-center py-16">
                            <div className="bg-white rounded-3xl shadow-lg p-12 max-w-lg mx-auto border border-orange-100">
                                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-10 h-10 text-orange-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Začněte svůj první životopis
                                </h3>
                                <p className="text-gray-600 mb-8">
                                    Vytvořte profesionální životopis během několika minut s naším jednoduchým editorem
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={() => openModal('templates')}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        <Palette className="w-5 h-5" />
                                        Vybrat šablonu
                                    </button>
                                    <button
                                        onClick={() => openModal('create')}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Prázdný životopis
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    // CV Grid/List
                    <div className={cn(
                        filters.viewMode === 'grid'
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            : "space-y-4"
                    )}>
                        {filteredAndSortedCvs.map((cv) => (
                            filters.viewMode === 'grid' ? (
                                <CVCard
                                    key={cv._id}
                                    cv={cv}
                                    onView={() => openModal('view', cv)}
                                    onStar={() => handleStarCV(cv._id)}
                                    onDuplicate={() => handleDuplicateCV(cv)}
                                    onShare={() => openModal('share', cv)}
                                    onAnalytics={() => openModal('analytics', cv)}
                                    onDelete={() => openModal('delete', cv)}
                                    formatDate={formatDate}
                                    withLocale={withLocale}
                                    getATSScoreClasses={getATSScoreClasses}
                                />
                            ) : (
                                <CVListItem
                                    key={cv._id}
                                    cv={cv}
                                    onView={() => openModal('view', cv)}
                                    onStar={() => handleStarCV(cv._id)}
                                    onDuplicate={() => handleDuplicateCV(cv)}
                                    onShare={() => openModal('share', cv)}
                                    onAnalytics={() => openModal('analytics', cv)}
                                    onDelete={() => openModal('delete', cv)}
                                    formatDate={formatDate}
                                    withLocale={withLocale}
                                    getATSScoreClasses={getATSScoreClasses}
                                />
                            )
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            {modal.isOpen && (
                <ModalOverlay onClose={closeModal}>
                    {modal.type === 'create' && (
                        <CreateCVModal
                            title={newCvTitle}
                            onTitleChange={setNewCvTitle}
                            onCancel={closeModal}
                            onConfirm={handleCreateCV}
                            isLoading={isCreating}
                        />
                    )}

                    {modal.type === 'delete' && modal.data && (
                        <DeleteCVModal
                            cvName={modal.data.name}
                            onCancel={closeModal}
                            onConfirm={handleDeleteCV}
                            isLoading={isDeleting}
                        />
                    )}

                    {modal.type === 'view' && modal.data && (
                        <ViewCVModal
                            cv={modal.data}
                            onClose={closeModal}
                        />
                    )}

                    {modal.type === 'share' && modal.data && (
                        <ShareCVModal
                            cv={modal.data}
                            onClose={closeModal}
                        />
                    )}

                    {modal.type === 'analytics' && modal.data && (
                        <AnalyticsCVModal
                            cv={modal.data}
                            onClose={closeModal}
                        />
                    )}

                    {modal.type === 'templates' && (
                        <TemplatesModal
                            onClose={closeModal}
                            onSelect={(template) => {
                                // Handle template selection
                                closeModal()
                            }}
                        />
                    )}
                </ModalOverlay>
            )}

            {/* Tutorial/Onboarding */}
            {showTutorial && (
                <TutorialOverlay onClose={() => setShowTutorial(false)} />
            )}
        </div>
    )
}

// Enhanced CV Card Component
const CVCard = ({ cv, onView, onStar, onDuplicate, onShare, onAnalytics, onDelete, formatDate, withLocale, getATSScoreClasses }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative border border-orange-100">
        {/* ATS Score Badge */}
        <div className={cn(
            "absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-semibold z-10 border",
            getATSScoreClasses(cv.atsScore)
        )}>
            ATS {cv.atsScore}%
        </div>

        {/* Star Button */}
        <button
            onClick={(e) => {
                e.stopPropagation()
                onStar()
            }}
            className={cn(
                "absolute top-4 right-4 p-2 rounded-full transition-all duration-200 z-10",
                cv.starred
                    ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                    : 'bg-white/80 text-gray-400 hover:bg-white hover:text-yellow-500'
            )}
        >
            <Star className={cn("w-4 h-4", cv.starred && "fill-current")} />
        </button>

        {/* Preview Image */}
        <div className="aspect-[3/4] bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden">
            <img
                src="/cvblank.png"
                alt={`Náhled ${cv.name}`}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                onClick={onView}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 cursor-pointer" onClick={onView} />

            {/* Quick Actions Overlay */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex gap-2">
                    <Tooltip content="Rychlý náhled">
                        <button
                            onClick={onView}
                            className="flex-1 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                    </Tooltip>
                    <Tooltip content="Duplikovat">
                        <button
                            onClick={onDuplicate}
                            className="flex-1 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
            <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg truncate flex-1">{cv.name}</h3>
                    <DropdownMenu
                        trigger={
                            <button className="p-1 hover:bg-orange-50 rounded transition-colors">
                                <MoreHorizontal className="w-4 h-4 text-gray-400" />
                            </button>
                        }
                        items={[
                            { label: 'Analytika', icon: BarChart3, action: onAnalytics },
                            { label: 'Duplikovat', icon: Copy, action: onDuplicate },
                            { label: 'Sdílet', icon: Share2, action: onShare },
                            { label: 'Archivovat', icon: Archive, action: () => { } },
                            { label: 'Smazat', icon: Trash2, action: onDelete, danger: true }
                        ]}
                    />
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>Aktualizováno {formatDate(cv.date)}</span>
                </div>

                {cv.targetRole && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                        <Briefcase className="w-3 h-3" />
                        <span>{cv.targetRole}</span>
                    </div>
                )}

                {/* Progress Indicators */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Kompletnost</span>
                        <span className="font-medium">{cv.completeness}%</span>
                    </div>
                    <div className="w-full bg-orange-100 rounded-full h-1.5">
                        <div
                            className="bg-gradient-to-r from-orange-400 to-amber-400 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${cv.completeness}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
                <Link
                    href={withLocale(`/ucet/edit/${cv._id}`)}
                    className="flex items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                    <Edit3 className="w-4 h-4" />
                    Upravit
                </Link>

                <button
                    onClick={onAnalytics}
                    className="flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                    <BarChart3 className="w-4 h-4" />
                    Statistiky
                </button>

                <button
                    onClick={onShare}
                    className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                    <Share2 className="w-4 h-4" />
                    Sdílet
                </button>

                <button className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-medium transition-colors duration-200">
                    <Download className="w-4 h-4" />
                    PDF
                </button>
            </div>

            {/* Views Counter */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-orange-100">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye className="w-3 h-3" />
                    <span>{cv.views} zobrazení</span>
                </div>
                {cv.shareUrl && (
                    <div className="flex items-center gap-1 text-xs text-emerald-600">
                        <Globe className="w-3 h-3" />
                        <span>Sdíleno</span>
                    </div>
                )}
            </div>
        </div>
    </div>
)

// CV List Item Component
const CVListItem = ({ cv, onView, onStar, onDuplicate, onShare, onAnalytics, onDelete, formatDate, withLocale, getATSScoreClasses }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-orange-100">
        <div className="flex items-center gap-6">
            {/* Thumbnail */}
            <div className="w-16 h-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer" onClick={onView}>
                <img src="/cvblank.png" alt={cv.name} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-lg truncate">{cv.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>Aktualizováno {formatDate(cv.date)}</span>
                            {cv.targetRole && (
                                <>
                                    <span>•</span>
                                    <span>{cv.targetRole}</span>
                                </>
                            )}
                            <span>•</span>
                            <span>{cv.views} zobrazení</span>
                        </div>
                    </div>

                    {/* Star and Actions */}
                    <div className="flex items-center gap-2 ml-4">
                        <div className={cn(
                            "px-2 py-1 rounded-full text-xs font-semibold border",
                            getATSScoreClasses(cv.atsScore)
                        )}>
                            ATS {cv.atsScore}%
                        </div>

                        <button
                            onClick={onStar}
                            className={cn(
                                "p-2 rounded-lg transition-colors",
                                cv.starred
                                    ? 'text-yellow-500 bg-yellow-50'
                                    : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                            )}
                        >
                            <Star className={cn("w-4 h-4", cv.starred && "fill-current")} />
                        </button>

                        <DropdownMenu
                            trigger={
                                <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
                                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                </button>
                            }
                            items={[
                                { label: 'Zobrazit', icon: Eye, action: onView },
                                { label: 'Upravit', icon: Edit3, action: () => { } },
                                { label: 'Analytika', icon: BarChart3, action: onAnalytics },
                                { label: 'Duplikovat', icon: Copy, action: onDuplicate },
                                { label: 'Sdílet', icon: Share2, action: onShare },
                                { label: 'Stáhnout PDF', icon: Download, action: () => { } },
                                { label: 'Smazat', icon: Trash2, action: onDelete, danger: true }
                            ]}
                        />
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-4 mt-3">
                    <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-600">Kompletnost</span>
                            <span className="font-medium">{cv.completeness}%</span>
                        </div>
                        <div className="w-full bg-orange-100 rounded-full h-1.5">
                            <div
                                className="bg-gradient-to-r from-orange-400 to-amber-400 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${cv.completeness}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href={withLocale(`/ucet/edit/${cv._id}`)}
                            className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 text-sm rounded-lg font-medium transition-colors"
                        >
                            Upravit
                        </Link>
                        <button
                            onClick={onView}
                            className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm rounded-lg font-medium transition-colors"
                        >
                            Zobrazit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

// Utility Components
const FilterButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors",
            active
                ? 'bg-orange-100 text-orange-700'
                : 'text-gray-600 hover:bg-orange-50'
        )}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
)

const Tooltip = ({ children, content }) => (
    <div className="group relative">
        {children}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            {content}
        </div>
    </div>
)

const DropdownMenu = ({ trigger, items }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <div onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-orange-100 py-1 z-20">
                        {items.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    item.action()
                                    setIsOpen(false)
                                }}
                                className={cn(
                                    "w-full text-left px-4 py-2 text-sm hover:bg-orange-50 flex items-center gap-3",
                                    item.danger ? 'text-rose-600 hover:bg-rose-50' : 'text-gray-700'
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

// Enhanced Modal Components
const ModalOverlay = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="relative max-h-[90vh] overflow-auto">
            {children}
        </div>
    </div>
)

const CreateCVModal = ({ title, onTitleChange, onCancel, onConfirm, isLoading }) => (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto border border-orange-100">
        <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Nový životopis</h3>
            <p className="text-gray-600">Zadejte název pro váš nový životopis</p>
        </div>

        <div className="mb-6">
            <input
                type="text"
                className="w-full border-2 border-orange-200 focus:border-orange-500 rounded-xl p-4 text-gray-900 placeholder-gray-400 transition-colors duration-200"
                placeholder="např. Životopis pro IT pozici"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                autoFocus
            />
        </div>

        <div className="flex gap-3">
            <button
                onClick={onCancel}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-orange-200 text-gray-700 font-medium hover:bg-orange-50 transition-colors duration-200"
                disabled={isLoading}
            >
                Zrušit
            </button>
            <button
                onClick={onConfirm}
                disabled={!title.trim() || isLoading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-gray-300 disabled:to-gray-300 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <Check className="w-4 h-4" />
                )}
                Vytvořit
            </button>
        </div>
    </div>
)

const DeleteCVModal = ({ cvName, onCancel, onConfirm, isLoading }) => (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto border border-orange-100">
        <div className="text-center mb-6">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Smazat životopis?</h3>
            <p className="text-gray-600">
                Opravdu chcete smazat životopis <strong>"{cvName}"</strong>? Tuto akci nelze vrátit zpět.
            </p>
        </div>

        <div className="flex gap-3">
            <button
                onClick={onCancel}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-orange-200 text-gray-700 font-medium hover:bg-orange-50 transition-colors duration-200"
                disabled={isLoading}
            >
                Zrušit
            </button>
            <button
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <Trash2 className="w-4 h-4" />
                )}
                Smazat
            </button>
        </div>
    </div>
)

const ViewCVModal = ({ cv, onClose }) => (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto overflow-hidden border border-orange-100">
        <div className="flex items-center justify-between p-6 border-b border-orange-100">
            <div>
                <h3 className="text-xl font-bold text-gray-900">{cv.name}</h3>
                <p className="text-gray-600 text-sm">Náhled životopisu</p>
            </div>
            <button
                onClick={onClose}
                className="p-2 hover:bg-orange-50 rounded-full transition-colors duration-200"
            >
                <X className="w-5 h-5 text-gray-500" />
            </button>
        </div>

        <div className="h-[600px]">
            <PDFViewer width="100%" height={600} style={{ border: 'none' }}>
                <CvPdfDocument
                    cvData={cv.content}
                    photoPreview={cv.content.photoPreview || null}
                />
            </PDFViewer>
        </div>
    </div>
)

const ShareCVModal = ({ cv, onClose }) => (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto border border-orange-100">
        <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sdílet životopis</h3>
            <p className="text-gray-600">Vyberte způsob sdílení</p>
        </div>

        <div className="space-y-3 mb-6">
            <button className="w-full flex items-center gap-3 p-4 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors">
                <Globe className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                    <div className="font-medium">Veřejný odkaz</div>
                    <div className="text-sm text-gray-600">Kdokoliv s odkazem může zobrazit</div>
                </div>
            </button>

            <button className="w-full flex items-center gap-3 p-4 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors">
                <Shield className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                    <div className="font-medium">Chráněný odkaz</div>
                    <div className="text-sm text-gray-600">Vyžaduje heslo pro přístup</div>
                </div>
            </button>

            <button className="w-full flex items-center gap-3 p-4 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors">
                <Download className="w-5 h-5 text-emerald-600" />
                <div className="text-left">
                    <div className="font-medium">Stáhnout PDF</div>
                    <div className="text-sm text-gray-600">Uložit jako soubor</div>
                </div>
            </button>
        </div>

        <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-xl border-2 border-orange-200 text-gray-700 font-medium hover:bg-orange-50 transition-colors duration-200"
        >
            Zavřít
        </button>
    </div>
)

const AnalyticsCVModal = ({ cv, onClose }) => (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-auto border border-orange-100">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h3 className="text-2xl font-bold text-gray-900">{cv.name}</h3>
                <p className="text-gray-600">Analytika a doporučení</p>
            </div>
            <button
                onClick={onClose}
                className="p-2 hover:bg-orange-50 rounded-full transition-colors duration-200"
            >
                <X className="w-5 h-5 text-gray-500" />
            </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Zobrazení</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">{cv.views}</div>
                <div className="text-sm text-blue-700">Celkem zobrazení</div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium text-emerald-900">ATS Skóre</span>
                </div>
                <div className="text-2xl font-bold text-emerald-900">{cv.atsScore}%</div>
                <div className="text-sm text-emerald-700">Optimalizace pro ATS</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Kompletnost</span>
                </div>
                <div className="text-2xl font-bold text-purple-900">{cv.completeness}%</div>
                <div className="text-sm text-purple-700">Vyplněné sekce</div>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span className="font-medium text-amber-900">Poslední úprava</span>
                </div>
                <div className="text-lg font-bold text-amber-900">
                    {Math.floor((Date.now() - new Date(cv.date).getTime()) / (1000 * 60 * 60 * 24))} dní
                </div>
                <div className="text-sm text-amber-700">Před poslední úpravou</div>
            </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
            <h4 className="font-semibold text-gray-900 mb-3">Doporučení pro zlepšení</h4>
            <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    Přidejte více klíčových slov pro váš obor
                </li>
                <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    Doplňte kvantifikovatelné úspěchy
                </li>
                <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    Zkontrolujte formátování pro ATS systémy
                </li>
            </ul>
        </div>
    </div>
)

const TemplatesModal = ({ onClose, onSelect }) => (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto overflow-hidden border border-orange-100">
        <div className="flex items-center justify-between p-6 border-b border-orange-100">
            <div>
                <h3 className="text-2xl font-bold text-gray-900">Vyberte šablonu</h3>
                <p className="text-gray-600">Profesionální šablony pro různé obory</p>
            </div>
            <button
                onClick={onClose}
                className="p-2 hover:bg-orange-50 rounded-full transition-colors duration-200"
            >
                <X className="w-5 h-5 text-gray-500" />
            </button>
        </div>

        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { name: 'Klasická', category: 'Univerzální', premium: false },
                    { name: 'Moderní', category: 'IT & Tech', premium: false },
                    { name: 'Kreativní', category: 'Design & Marketing', premium: true },
                    { name: 'Profesionální', category: 'Business', premium: true },
                    { name: 'Minimalistická', category: 'Všechny obory', premium: false },
                    { name: 'Executive', category: 'Management', premium: true }
                ].map((template, index) => (
                    <div key={index} className="border border-orange-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-[3/4] bg-gradient-to-br from-orange-50 to-amber-50 relative">
                            {template.premium && (
                                <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                    <Crown className="w-3 h-3" />
                                    PRO
                                </div>
                            )}
                            <img
                                src="/cvblank.png"
                                alt={template.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h4 className="font-semibold text-gray-900">{template.name}</h4>
                            <p className="text-sm text-gray-600 mb-3">{template.category}</p>
                            <button
                                onClick={() => onSelect(template)}
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-2 rounded-lg font-medium transition-colors"
                            >
                                Vybrat šablonu
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

const TutorialOverlay = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-auto border border-orange-100">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Tipy pro lepší životopis</h3>
                <p className="text-gray-600">Jak vytvořit životopis, který zaujme zaměstnavatele</p>
            </div>

            <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">Použijte klíčová slova</h4>
                        <p className="text-gray-600 text-sm">Přidejte relevantní klíčová slova z pracovní nabídky</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">Kvantifikujte úspěchy</h4>
                        <p className="text-gray-600 text-sm">Používejte čísla a konkrétní výsledky</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">Přizpůsobte pozici</h4>
                        <p className="text-gray-600 text-sm">Upravte životopis pro každou pracovní pozici</p>
                    </div>
                </div>
            </div>

            <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
                Rozumím
            </button>
        </div>
    </div>
)

export default CVDashboard