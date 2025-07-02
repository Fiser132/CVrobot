'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import {
    Plus,
    Edit3,
    Download,
    Trash2,
    Eye,
    FileText,
    Calendar,
    X,
    Check,
    AlertTriangle,
    Copy,
    MoreHorizontal,
    Filter,
    Search,
    Grid3X3,
    List,
    Settings,
    Clock,
    TrendingUp,
    Target
} from 'lucide-react'

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-purple-100">
        {/* Floating Circles */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#000000" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

interface CV {
    _id: string
    name: string
    date: string
    updatedAt?: string
    createdAt?: string
    content: Record<string, any>
    archived?: boolean
    kvalitaCV?: number
    completeness?: number
}

interface ModalState {
    isOpen: boolean
    type: 'view' | 'delete' | null
    data?: CV | null
}

interface FilterState {
    search: string
    archived: boolean
    sortBy: 'date' | 'name' | 'kvalitaCV'
    sortOrder: 'asc' | 'desc'
    viewMode: 'grid' | 'list'
}

// Enhanced API Helper Functions
const apiHelper = {
    // Get all CVs
    async getCVs() {
        try {
            const response = await fetch('/api/cvs', {
                cache: 'no-store'
            })
            
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`)
            }
            
            return data
        } catch (error) {
            console.error('Error fetching CVs:', error)
            throw error
        }
    },

    // Create new CV
    async createCV(name, content = {}) {
        try {
            const response = await fetch('/api/cvs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, content }),
            })
            
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`)
            }
            
            return data
        } catch (error) {
            console.error('Error creating CV:', error)
            throw error
        }
    },

    // Delete CV - FIXED: Updated to use the correct delete endpoint
    async deleteCV(id) {
        try {
            const response = await fetch(`/api/cvs/delete?id=${id}`, {
                method: 'DELETE',
            })
            
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`)
            }
            
            return data
        } catch (error) {
            console.error('Error deleting CV:', error)
            throw error
        }
    }
}

// Calculate CV Quality Score
const calculateQualityScore = (content) => {
    let score = 0
    
    // Basic info (30 points max)
    if (content.firstName && content.lastName) score += 8
    if (content.email) score += 8
    if (content.phone) score += 8
    if (content.photo) score += 6
    
    // Address (10 points max)
    if (content.street && content.city) score += 5
    if (content.zip) score += 3
    if (content.region) score += 2
    
    // Professional info (40 points max)
    if (content.workExperience?.length > 0) {
        score += 15
        const detailedWork = content.workExperience.filter(job => 
            job.company && job.position && job.description && job.description.length > 50
        )
        score += Math.min(detailedWork.length * 5, 15)
    }
    
    if (content.education?.length > 0) {
        score += 10
        const detailedEducation = content.education.filter(edu => 
            edu.school && edu.degree && edu.field
        )
        score += Math.min(detailedEducation.length * 3, 10)
    }
    
    // Additional sections (20 points max)
    if (content.languages?.length > 0) score += 5
    if (content.otherExperience && content.otherExperience.length > 100) score += 8
    if (content.driverLicense?.length > 0) score += 2
    if (content.website) score += 3
    if (content.titulBefore || content.titulAfter) score += 2
    
    return Math.min(Math.round(score), 100)
}

// Calculate Completeness Score
const calculateCompletenessScore = (content) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone']
    const optionalFields = ['titulBefore', 'titulAfter', 'birthDate', 'gender', 'street', 'city', 'website', 'photo', 'otherExperience']
    const arrayFields = ['education', 'workExperience', 'languages', 'driverLicense']
    
    let filledFields = 0
    let totalFields = requiredFields.length + optionalFields.length + arrayFields.length
    
    // Check required fields (worth more)
    requiredFields.forEach(field => {
        if (content[field] && content[field].toString().trim()) {
            filledFields += 2
        }
    })
    totalFields += requiredFields.length
    
    // Check optional fields
    optionalFields.forEach(field => {
        if (content[field] && content[field].toString().trim()) {
            filledFields += 1
        }
    })
    
    // Check array fields
    arrayFields.forEach(field => {
        if (content[field] && content[field].length > 0) {
            filledFields += 1
        }
    })
    
    return Math.round((filledFields / totalFields) * 100)
}

const CVDashboard = () => {
    const { user } = useUser()
    const router = useRouter()
    const [cvs, setCvs] = useState<CV[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [modal, setModal] = useState<ModalState>({ isOpen: false, type: null })
    const [isCreating, setIsCreating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        archived: false,
        sortBy: 'date',
        sortOrder: 'desc',
        viewMode: 'grid'
    })

    const params = useParams()
    const locale = params.locale ?? 'sk'
    const withLocale = useCallback((path: string) => `/${locale}${path}`, [locale])

    // Enhanced CV data with quality and completeness scores
    const enhancedCvs = cvs.map(cv => ({
        ...cv,
        kvalitaCV: calculateQualityScore(cv.content || {}),
        completeness: calculateCompletenessScore(cv.content || {})
    }))

    const filteredAndSortedCvs = enhancedCvs
        .filter(cv => {
            if (filters.archived && !cv.archived) return false
            if (!filters.archived && cv.archived) return false
            if (filters.search && !cv.name.toLowerCase().includes(filters.search.toLowerCase())) return false
            return true
        })
        .sort((a, b) => {
            const multiplier = filters.sortOrder === 'asc' ? 1 : -1
            switch (filters.sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name) * multiplier
                case 'kvalitaCV':
                    return (a.kvalitaCV - b.kvalitaCV) * multiplier
                default:
                    // Use updatedAt if available, fallback to date
                    const aDate = new Date(a.updatedAt || a.date).getTime()
                    const bDate = new Date(b.updatedAt || b.date).getTime()
                    return (aDate - bDate) * multiplier
            }
        })

    const fetchCvs = useCallback(async () => {
        if (!user) return

        try {
            setIsLoading(true)
            setError(null)
            const data = await apiHelper.getCVs()
            setCvs(data)
        } catch (error) {
            console.error('Failed to fetch CVs:', error)
            setError('Nepodařilo se načíst životopisy. Zkuste to prosím znovu.')
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
    }, [])

    // Create CV and automatically redirect to builder page
    const handleCreateCV = async () => {
        if (isCreating) return

        try {
            setIsCreating(true)
            setError(null)
            
            const newCVData = await apiHelper.createCV(
                `Životopis ${new Date().toLocaleDateString('cs-CZ')}`,
                {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    // Set default empty structure
                    education: [],
                    workExperience: [],
                    languages: [],
                    driverLicense: [],
                    otherExperience: ''
                }
            )
            
            // Redirect to builder page with the new CV ID
            router.push(withLocale(`/builder/${newCVData.insertedId}`))
        } catch (error) {
            console.error('Failed to create CV:', error)
            setError('Nepodařilo se vytvořit životopis. Zkuste to prosím znovu.')
        } finally {
            setIsCreating(false)
        }
    }

    const handleDeleteCV = async () => {
        if (!modal.data || isDeleting) return

        try {
            setIsDeleting(true)
            setError(null)
            
            await apiHelper.deleteCV(modal.data._id)
            await fetchCvs()
            closeModal()
        } catch (error) {
            console.error('Failed to delete CV:', error)
            setError('Nepodařilo se smazat životopis. Zkuste to prosím znovu.')
        } finally {
            setIsDeleting(false)
        }
    }

    const handleDuplicateCV = async (cv: CV) => {
        try {
            setError(null)
            await apiHelper.createCV(`${cv.name} (kopie)`, cv.content)
            await fetchCvs()
        } catch (error) {
            console.error('Failed to duplicate CV:', error)
            setError('Nepodařilo se duplikovat životopis. Zkuste to prosím znovu.')
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

    const getQualityScoreClasses = (score: number) => {
        if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200'
        if (score >= 80) return 'text-blue-700 bg-blue-50 border-blue-200'
        if (score >= 70) return 'text-amber-700 bg-amber-50 border-amber-200'
        return 'text-rose-700 bg-rose-50 border-rose-200'
    }

    if (isLoading) {
        return (
            <div className="min-h-screen relative flex items-center justify-center">
                <AnimatedBackground />
                <div className="text-center relative z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Načítání životopisů...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative">
            <AnimatedBackground />
            
            {/* Error Display */}
            {error && (
                <div className="fixed top-4 right-4 z-50 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-md">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                        <button
                            onClick={() => setError(null)}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
            
            {/* Header Section */}
            <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Vítejte zpět, {user?.firstName || user?.fullName?.split(' ')[0]}
                            </h1>
                            <p className="text-gray-600">
                                Spravujte své životopisy a vytvářejte nové příležitosti
                            </p>

                            {/* Stats */}
                            <div className="flex items-center gap-6 mt-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FileText className="w-4 h-4 text-blue-500" />
                                    <span>{cvs.length} životopisů</span>
                                </div>
                                {enhancedCvs.length > 0 && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                                        <span>Průměrná kvalita: {Math.round(enhancedCvs.reduce((acc, cv) => acc + cv.kvalitaCV, 0) / enhancedCvs.length)}%</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Create Button */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleCreateCV}
                                disabled={isCreating}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-300 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                {isCreating ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Plus className="w-5 h-5" />
                                )}
                                Nový životopis
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Hledat životopisy..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70"
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            />
                        </div>

                        {/* Sort & View Controls */}
                        <div className="flex items-center gap-2">
                            <select
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white/70"
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
                                <option value="kvalitaCV-desc">Nejvyšší kvalita</option>
                            </select>

                            <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-white/70">
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, viewMode: 'grid' }))}
                                    className={cn(
                                        "p-2 transition-colors",
                                        filters.viewMode === 'grid'
                                            ? 'bg-blue-50 text-blue-600'
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
                                            ? 'bg-blue-50 text-blue-600'
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
                {filteredAndSortedCvs.length === 0 ? (
                    filters.search ? (
                        // No Results State
                        <div className="text-center py-16">
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-12 max-w-lg mx-auto border border-gray-200">
                                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Žádné výsledky</h3>
                                <p className="text-gray-600 mb-6">Zkuste upravit vyhledávací dotaz</p>
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Vymazat hledání
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Empty State
                        <div className="text-center py-16">
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-12 max-w-lg mx-auto border border-gray-200">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-10 h-10 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Začněte svůj první životopis
                                </h3>
                                <p className="text-gray-600 mb-8">
                                    Vytvořte profesionální životopis během několika minut
                                </p>
                                <button
                                    onClick={handleCreateCV}
                                    disabled={isCreating}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-300 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    {isCreating ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Plus className="w-5 h-5" />
                                    )}
                                    Vytvořit životopis
                                </button>
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
                                    onDuplicate={() => handleDuplicateCV(cv)}
                                    onDelete={() => openModal('delete', cv)}
                                    formatDate={formatDate}
                                    withLocale={withLocale}
                                    getQualityScoreClasses={getQualityScoreClasses}
                                />
                            ) : (
                                <CVListItem
                                    key={cv._id}
                                    cv={cv}
                                    onView={() => openModal('view', cv)}
                                    onDuplicate={() => handleDuplicateCV(cv)}
                                    onDelete={() => openModal('delete', cv)}
                                    formatDate={formatDate}
                                    withLocale={withLocale}
                                    getQualityScoreClasses={getQualityScoreClasses}
                                />
                            )
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            {modal.isOpen && (
                <ModalOverlay onClose={closeModal}>
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
                </ModalOverlay>
            )}
        </div>
    )
}

// CV Card Component
const CVCard = ({ cv, onView, onDuplicate, onDelete, formatDate, withLocale, getQualityScoreClasses }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative border border-gray-200">
        {/* Quality Score Badge */}
        <div className={cn(
            "absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-semibold z-10 border",
            getQualityScoreClasses(cv.kvalitaCV)
        )}>
            Kvalita {cv.kvalitaCV}%
        </div>

        {/* Preview Image */}
        <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
            <div className="w-full h-full bg-white m-4 rounded-lg shadow-inner flex items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-105" onClick={onView}>
                <div className="text-center p-4">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Náhled CV</p>
                </div>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 cursor-pointer" onClick={onView} />

            {/* Quick Actions Overlay */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex gap-2">
                    <button
                        onClick={onView}
                        className="flex-1 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={onDuplicate}
                        className="flex-1 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
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
                            <button className="p-1 hover:bg-blue-50 rounded transition-colors">
                                <MoreHorizontal className="w-4 h-4 text-gray-400" />
                            </button>
                        }
                        items={[
                            { label: 'Duplikovat', icon: Copy, action: onDuplicate },
                            { label: 'Smazat', icon: Trash2, action: onDelete, danger: true }
                        ]}
                    />
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>Aktualizováno {formatDate(cv.updatedAt || cv.date)}</span>
                </div>

                {/* Progress Indicator */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Kompletnost</span>
                        <span className="font-medium">{cv.completeness}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                            className="bg-gradient-to-r from-blue-400 to-purple-400 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${cv.completeness}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
                <Link
                    href={withLocale(`/ucet/edit/${cv._id}`)}
                    className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                    <Edit3 className="w-4 h-4" />
                    Upravit
                </Link>

                <button
                    onClick={onView}
                    className="flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                    <Eye className="w-4 h-4" />
                    Zobrazit
                </button>

                <button className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-2 rounded-lg font-medium transition-colors duration-200 col-span-2">
                    <Download className="w-4 h-4" />
                    Stáhnout PDF
                </button>
            </div>
        </div>
    </div>
)

// CV List Item Component
const CVListItem = ({ cv, onView, onDuplicate, onDelete, formatDate, withLocale, getQualityScoreClasses }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-200">
        <div className="flex items-center gap-6">
            {/* Thumbnail */}
            <div className="w-16 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer flex items-center justify-center" onClick={onView}>
                <FileText className="w-8 h-8 text-gray-300" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-lg truncate">{cv.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>Aktualizováno {formatDate(cv.updatedAt || cv.date)}</span>
                        </div>
                    </div>

                    {/* Quality Score and Actions */}
                    <div className="flex items-center gap-2 ml-4">
                        <div className={cn(
                            "px-2 py-1 rounded-full text-xs font-semibold border",
                            getQualityScoreClasses(cv.kvalitaCV)
                        )}>
                            Kvalita {cv.kvalitaCV}%
                        </div>

                        <DropdownMenu
                            trigger={
                                <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                </button>
                            }
                            items={[
                                { label: 'Zobrazit', icon: Eye, action: onView },
                                { label: 'Duplikovat', icon: Copy, action: onDuplicate },
                                { label: 'Stáhnout PDF', icon: Download, action: () => { } },
                                { label: 'Smazat', icon: Trash2, action: onDelete, danger: true }
                            ]}
                        />
                    </div>
                </div>

                {/* Progress Bar and Actions */}
                <div className="flex items-center gap-4 mt-3">
                    <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-600">Kompletnost</span>
                            <span className="font-medium">{cv.completeness}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                                className="bg-gradient-to-r from-blue-400 to-purple-400 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${cv.completeness}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href={withLocale(`/ucet/edit/${cv._id}`)}
                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-lg font-medium transition-colors"
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
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                        {items.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    item.action()
                                    setIsOpen(false)
                                }}
                                className={cn(
                                    "w-full text-left px-4 py-2 text-sm hover:bg-blue-50 flex items-center gap-3",
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

// Modal Components
const ModalOverlay = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="relative max-h-[90vh] overflow-auto">
            {children}
        </div>
    </div>
)

const DeleteCVModal = ({ cvName, onCancel, onConfirm, isLoading }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto border border-gray-200">
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
                className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
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
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-4xl mx-auto overflow-hidden border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
                <h3 className="text-xl font-bold text-gray-900">{cv.name}</h3>
                <p className="text-gray-600 text-sm">Náhled životopisu</p>
            </div>
            <button
                onClick={onClose}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
            >
                <X className="w-5 h-5 text-gray-500" />
            </button>
        </div>

        <div className="p-8 max-h-[600px] overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {cv.content?.titulBefore && `${cv.content.titulBefore} `}
                        {cv.content?.firstName || 'Jméno'} {cv.content?.lastName || 'Příjmení'}
                        {cv.content?.titulAfter && `, ${cv.content.titulAfter}`}
                    </h1>
                    <div className="text-gray-600">
                        {cv.content?.email && <p>{cv.content.email}</p>}
                        {cv.content?.phone && <p>{cv.content.phone}</p>}
                    </div>
                </div>

                {cv.content?.workExperience?.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            Pracovní zkušenosti
                        </h2>
                        {cv.content.workExperience.map((job, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="font-medium text-gray-900">{job.position || 'Pozice'}</h3>
                                <p className="text-blue-600">{job.company || 'Společnost'}</p>
                                {job.description && (
                                    <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {cv.content?.education?.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            Vzdělání
                        </h2>
                        {cv.content.education.map((edu, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="font-medium text-gray-900">{edu.degree || 'Titul'}</h3>
                                <p className="text-green-600">{edu.school || 'Škola'}</p>
                                {edu.field && <p className="text-gray-600">{edu.field}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {cv.content?.otherExperience && (
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            Další zkušenosti
                        </h2>
                        <p className="text-gray-700">{cv.content.otherExperience}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
)

export default CVDashboard