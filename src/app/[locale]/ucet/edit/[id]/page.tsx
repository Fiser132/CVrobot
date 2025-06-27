'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  User, Mail, Phone, MapPin, GraduationCap, Briefcase, Languages, Car, 
  FileText, Save, HelpCircle, Plus, X, ChevronDown, ChevronUp, Info,
  AlertCircle, CheckCircle, Calendar, Globe, Award, Trash2, Crown,
  Eye, Upload, Camera, BookOpen, Target, Settings, Star, Download,
  ArrowLeft, TrendingUp
} from 'lucide-react'

// Progress Bar Component
const ProgressBar = ({ progress, className = "" }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  )
}

// Quality Score Component
const QualityIndicator = ({ score, className = "" }) => {
  const getQualityColor = (score) => {
    if (score >= 90) return 'from-emerald-500 to-emerald-600 text-emerald-900 bg-emerald-50 border-emerald-200'
    if (score >= 80) return 'from-blue-500 to-blue-600 text-blue-900 bg-blue-50 border-blue-200'
    if (score >= 70) return 'from-amber-500 to-amber-600 text-amber-900 bg-amber-50 border-amber-200'
    return 'from-rose-500 to-rose-600 text-rose-900 bg-rose-50 border-rose-200'
  }

  const getQualityLabel = (score) => {
    if (score >= 90) return 'Výborná'
    if (score >= 80) return 'Velmi dobrá'
    if (score >= 70) return 'Dobrá'
    if (score >= 60) return 'Průměrná'
    return 'Potřebuje zlepšení'
  }

  const colorClasses = getQualityColor(score)
  const label = getQualityLabel(score)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`px-4 py-2 rounded-xl border-2 ${colorClasses} backdrop-blur-sm`}>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span className="font-semibold text-sm text-white">
            Kvalita CV: {score}%
          </span>
        </div>
      </div>
      <div className="hidden sm:block text-sm font-medium text-gray-600">
        {label}
      </div>
    </div>
  )
}

// Enhanced Back Button Component
const BackButton = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 hover:shadow-md backdrop-blur-sm ${className}`}
    >
      <div className="p-1 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
        <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
      </div>
      <span className="font-medium text-gray-700 group-hover:text-gray-900 hidden sm:block">
        Zpět na přehled
      </span>
    </button>
  )
}

// Enhanced Components
const TooltipWrapper = ({ children, content, position = 'top' }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  
  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 transform -translate-x-1/2',
    right: 'left-full ml-2 top-1/2 transform -translate-y-1/2',
    bottom: 'top-full mt-2 left-1/2 transform -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 transform -translate-y-1/2'
  }
  
  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div className={`absolute z-50 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg shadow-lg whitespace-nowrap max-w-xs ${positionClasses[position]}`}>
          {content}
        </div>
      )}
    </div>
  )
}

const SmartInput = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder, 
  required = false, 
  tooltip, 
  suggestions = [],
  validation,
  icon: Icon,
  options = [],
  defaultValue = ""
}) => {
  const [focused, setFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [validationState, setValidationState] = useState({ isValid: true, message: '' })

  const inputValue = value || defaultValue

  useEffect(() => {
    if (validation && inputValue) {
      const result = validation(inputValue)
      setValidationState(result)
    }
  }, [inputValue, validation])

  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(inputValue?.toLowerCase() || '')
  ).slice(0, 5)

  if (type === 'select') {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="block text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {tooltip && (
            <TooltipWrapper content={tooltip}>
              <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
            </TooltipWrapper>
          )}
        </div>
        
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          )}
          <select
            value={inputValue}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full p-3 ${Icon ? 'pl-10' : ''} border rounded-lg transition-all focus:ring-2 focus:border-transparent ${
              validationState.isValid 
                ? 'border-gray-200 focus:ring-blue-500' 
                : 'border-red-300 focus:ring-red-500'
            }`}
          >
            <option value="">Vyberte...</option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    )
  }

  if (type === 'radio' && options.length > 0) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="block text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {tooltip && (
            <TooltipWrapper content={tooltip}>
              <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
            </TooltipWrapper>
          )}
        </div>
        <div className="flex gap-4">
          {options.map(option => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name={label} 
                value={option} 
                checked={inputValue === option}
                onChange={(e) => onChange(e.target.value)}
                className="text-blue-600" 
              />
              <span className="text-sm font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {tooltip && (
          <TooltipWrapper content={tooltip}>
            <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
          </TooltipWrapper>
        )}
      </div>
      
      <div className="relative">
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          )}
          <input
            type={type}
            value={inputValue}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => {
              setFocused(true)
              if (suggestions.length > 0) setShowSuggestions(true)
            }}
            onBlur={() => {
              setTimeout(() => {
                setFocused(false)
                setShowSuggestions(false)
              }, 200)
            }}
            className={`w-full p-3 ${Icon ? 'pl-10' : ''} border rounded-lg transition-all focus:ring-2 focus:border-transparent ${
              validationState.isValid 
                ? 'border-gray-200 focus:ring-blue-500' 
                : 'border-red-300 focus:ring-red-500'
            } ${focused ? 'shadow-md' : 'shadow-sm'}`}
            placeholder={placeholder}
          />
          {!validationState.isValid && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
          )}
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(suggestion)
                  setShowSuggestions(false)
                }}
                className="w-full text-left px-3 py-2 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {!validationState.isValid && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {validationState.message}
        </p>
      )}
    </div>
  )
}

const SmartTextarea = ({ label, value, onChange, placeholder, tooltip, rows = 4, defaultValue = "" }) => {
  const textValue = value || defaultValue

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        {tooltip && (
          <TooltipWrapper content={tooltip}>
            <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
          </TooltipWrapper>
        )}
      </div>
      
      <textarea
        value={textValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
      />
    </div>
  )
}

const PhotoUploadWidget = ({ value, onChange, defaultValue = null }) => {
  const photoValue = value || defaultValue

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => onChange(reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden">
        {photoValue ? (
          <img src={photoValue} alt="Profile" className="w-full h-full object-cover rounded-full" />
        ) : (
          <div className="text-center">
            <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <span className="text-xs text-gray-500">Přidat foto</span>
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="photo-upload"
      />
      <label
        htmlFor="photo-upload"
        className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
      >
        {photoValue ? 'Změnit foto' : 'Nahrát foto'}
      </label>
    </div>
  )
}

const DriverLicenseWidget = ({ value = [], onChange, defaultValue = [] }) => {
  const options = ['A', 'B', 'C', 'D', 'E', 'T']
  const licenseValue = value || defaultValue
  
  const handleChange = (option) => {
    const newValue = licenseValue.includes(option)
      ? licenseValue.filter(v => v !== option)
      : [...licenseValue, option]
    onChange(newValue)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">Řidičský průkaz</label>
      <div className="grid grid-cols-3 gap-3">
        {options.map(option => (
          <label
            key={option}
            className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
              licenseValue.includes(option)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <input
              type="checkbox"
              checked={licenseValue.includes(option)}
              onChange={() => handleChange(option)}
              className="sr-only"
            />
            <span className="font-semibold">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

const CollapsibleSection = ({ title, children, icon: Icon, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/50 overflow-hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-blue-600" />}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  )
}

const ArraySection = ({ title, items, onAdd, onRemove, onUpdate, template, emptyText, icon: Icon }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-800 flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          {title}
        </h4>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Přidat
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          {Icon && <Icon className="w-12 h-12 text-gray-400 mx-auto mb-3" />}
          <p>{emptyText}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">
                  {title.slice(0, -1)} {index + 1}
                </span>
                <button
                  onClick={() => onRemove(index)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {template.map((field) => (
                  <div key={field.key} className={field.fullWidth ? 'md:col-span-2' : ''}>
                    {field.type === 'textarea' ? (
                      <SmartTextarea
                        label={field.label}
                        value={item[field.key]}
                        onChange={(value) => {
                          const newItems = [...items]
                          newItems[index] = { ...newItems[index], [field.key]: value }
                          onUpdate(newItems)
                        }}
                        placeholder={field.placeholder}
                        tooltip={field.tooltip}
                      />
                    ) : (
                      <SmartInput
                        label={field.label}
                        value={item[field.key]}
                        onChange={(value) => {
                          const newItems = [...items]
                          newItems[index] = { ...newItems[index], [field.key]: value }
                          onUpdate(newItems)
                        }}
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        tooltip={field.tooltip}
                        icon={field.icon}
                        options={field.options}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Templates Modal Component
const TemplatesModal = ({ onClose, onSelect }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-5xl mx-auto overflow-hidden border border-gray-200 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Vyberte šablonu</h3>
          <p className="text-gray-600">Profesionální šablony pro různé obory</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              name: 'Klasická', 
              category: 'Univerzální', 
              premium: false,
              description: 'Tradiční a čistý design vhodný pro všechny obory',
              color: 'from-blue-500 to-blue-600'
            },
            { 
              name: 'Moderní', 
              category: 'IT & Tech', 
              premium: false,
              description: 'Současný design s technologickým nádechem',
              color: 'from-indigo-500 to-purple-600'
            },
            { 
              name: 'Kreativní', 
              category: 'Design & Marketing', 
              premium: true,
              description: 'Výrazný design pro kreativní profese',
              color: 'from-pink-500 to-rose-600'
            },
            { 
              name: 'Profesionální', 
              category: 'Business', 
              premium: true,
              description: 'Elegantní šablona pro manažerské pozice',
              color: 'from-gray-700 to-gray-800'
            },
            { 
              name: 'Minimalistická', 
              category: 'Všechny obory', 
              premium: false,
              description: 'Čistý a jednoduchý design bez rušivých elementů',
              color: 'from-slate-500 to-slate-600'
            },
            { 
              name: 'Executive', 
              category: 'Management', 
              premium: true,
              description: 'Prémiová šablona pro vedoucí pozice',
              color: 'from-emerald-600 to-teal-600'
            }
          ].map((template, index) => (
            <div 
              key={index} 
              className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer"
              onClick={() => onSelect(template)}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                {template.premium && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10 shadow-sm">
                    <Crown className="w-3 h-3" />
                    PRO
                  </div>
                )}
                
                {/* Mock CV Preview */}
                <div className="absolute inset-4 bg-white rounded-lg shadow-sm p-4 text-xs">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className={`h-2 bg-gradient-to-r ${template.color} rounded mb-1`}></div>
                      <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1 bg-gray-200 rounded"></div>
                    <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-1 bg-gray-200 rounded w-3/5"></div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className={`h-1 bg-gradient-to-r ${template.color} rounded w-1/3`}></div>
                    <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-lg">{template.name}</h4>
                  <Star className="w-4 h-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <p className="text-sm font-medium text-gray-600 mb-1">{template.category}</p>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">{template.description}</p>
                
                <button className={`w-full bg-gradient-to-r ${template.color} hover:shadow-lg text-white py-2.5 rounded-lg font-medium transition-all duration-200 text-sm group-hover:scale-[1.02]`}>
                  {template.premium ? (
                    <span className="flex items-center justify-center gap-2">
                      <Crown className="w-4 h-4" />
                      Odemknout šablonu
                    </span>
                  ) : (
                    'Vybrat šablonu'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            <Crown className="w-4 h-4 inline mr-1 text-yellow-500" />
            Prémiové šablony jsou dostupné v PRO verzi
          </p>
          <button 
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Zavřít
          </button>
        </div>
      </div>
    </div>
  </div>
)

// Live Preview Component
const LivePreview = ({ cvData, photoPreview, isUnlocked = false, cvId, currentTemplate, onTemplateChange }) => {
  const router = useRouter()
  const params = useParams()
  
  // Get the current locale from params, default to 'en' if not available
  const locale = params?.locale || 'en'
  
  const handleUnlockClick = () => {
    // Navigate to the choose page with the current CV ID
    const targetCvId = cvId || params?.cvid || 'new'
    router.push(`/${locale}/choose/${targetCvId}`)
  }

  return (
    <div className="bg-slate-900 text-white h-full flex flex-col">
      {/* Header Controls */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold">Náhled CV</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <button
                onClick={onTemplateChange}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Změnit šablonu
              </button>
            </div>
          </div>
          <button 
            onClick={handleUnlockClick}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-lg transition-all text-sm font-medium text-white"
          >
            <Crown className="w-4 h-4" />
            Unlock
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-slate-800 p-6 overflow-auto">
        <div className="bg-white rounded-lg shadow-2xl mx-auto h-full" 
             style={{ 
               width: '180mm',
               height:'200mm'
             }}>
          
          <div className="p-8 text-gray-800 relative">
            {/* Header */}
            <div className="flex items-start gap-6 mb-8">
              {photoPreview && (
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100">
                  <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {cvData.titulBefore && `${cvData.titulBefore} `}
                  {cvData.firstName || 'Jméno'} {cvData.lastName || 'Příjmení'}
                  {cvData.titulAfter && `, ${cvData.titulAfter}`}
                </h1>
                <div className="space-y-1 text-sm text-gray-600">
                  {cvData.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {cvData.email}
                    </div>
                  )}
                  {cvData.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {cvData.phone}
                    </div>
                  )}
                  {(cvData.street || cvData.city) && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {cvData.street} {cvData.city} {cvData.zip}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Work Experience */}
            {cvData.workExperience?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Pracovní zkušenosti
                </h2>
                <div className="space-y-4">
                  {cvData.workExperience.map((job, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4">
                      <h3 className="font-semibold text-gray-800">{job.position || 'Pozice'}</h3>
                      <p className="text-blue-600 font-medium">{job.company || 'Společnost'}</p>
                      {(job.startDate || job.endDate) && (
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {job.startDate} - {job.endDate || 'současnost'}
                        </p>
                      )}
                      {job.description && (
                        <p className="text-sm text-gray-600 mt-2">{job.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {cvData.education?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                  Vzdělání
                </h2>
                <div className="space-y-4">
                  {cvData.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-green-200 pl-4">
                      <h3 className="font-semibold text-gray-800">{edu.degree || 'Titul'}</h3>
                      <p className="text-green-600 font-medium">{edu.school || 'Škola'}</p>
                      {edu.field && <p className="text-gray-600">{edu.field}</p>}
                      {(edu.startYear || edu.endYear) && (
                        <p className="text-sm text-gray-500">
                          {edu.startYear} - {edu.endYear}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {cvData.languages?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-purple-600" />
                  Jazyky
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {cvData.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium">{lang.language || 'Jazyk'}</span>
                      <span className="text-gray-600">{lang.level || 'Úroveň'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Experience */}
            {cvData.otherExperience && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Další zkušenosti</h2>
                <p className="text-gray-700">{cvData.otherExperience}</p>
              </div>
            )}

            {/* Driver License */}
            {cvData.driverLicense?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-orange-600" />
                  Řidičský průkaz
                </h2>
                <div className="flex gap-2">
                  {cvData.driverLicense.map((license, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      {license}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// API Helper Functions
const apiHelper = {
  // Create new CV
  async createCV(name, content) {
    const response = await fetch('/api/cvs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, content }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create CV')
    }
    
    return response.json()
  },

  // Update existing CV
  async updateCV(id, content) {
    const response = await fetch('/api/cvs', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, content }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update CV')
    }
    
    return response.json()
  },

  // Get all CVs
  async getCVs() {
    const response = await fetch('/api/cvs')
    
    if (!response.ok) {
      throw new Error('Failed to fetch CVs')
    }
    
    return response.json()
  },

  // Get specific CV by ID
  async getCVById(id) {
    const cvs = await this.getCVs()
    return cvs.find(cv => cv._id === id)
  }
}

// Main Component
const ModernCvBuilder = ({ cvId = null }) => {
  const router = useRouter()
  const params = useParams()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    titulBefore: '',
    titulAfter: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    street: '',
    city: '',
    zip: '',
    region: '',
    state: '',
    website: '',
    photo: null,
    education: [],
    workExperience: [],
    languages: [],
    driverLicense: [],
    otherExperience: '',
  })
  
  const [cvName, setCvName] = useState('Nový životopis')
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [saveError, setSaveError] = useState(null)
  const [currentCvId, setCurrentCvId] = useState(cvId)
  const [isInitialLoading, setIsInitialLoading] = useState(false)
  const [showTemplatesModal, setShowTemplatesModal] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState('Klasická')

  // Get locale for navigation
  const locale = params?.locale || 'sk'

  // Load existing CV data when component mounts
  useEffect(() => {
    const loadCVData = async () => {
      if (cvId && cvId !== 'new') {
        setIsInitialLoading(true)
        try {
          const cvData = await apiHelper.getCVById(cvId)
          if (cvData) {
            setFormData({ ...formData, ...cvData.content })
            setCvName(cvData.name || 'Nový životopis')
            setCurrentCvId(cvId)
          }
        } catch (error) {
          console.error('Failed to load CV:', error)
          setSaveError('Nepodařilo se načíst životopis')
        } finally {
          setIsInitialLoading(false)
        }
      }
    }

    loadCVData()
  }, [cvId])

  // Auto-save functionality
  useEffect(() => {
    const autoSave = async () => {
      if (currentCvId && currentCvId !== 'new' && !isInitialLoading) {
        try {
          await apiHelper.updateCV(currentCvId, formData)
          setLastSaved(new Date())
          setSaveError(null)
        } catch (error) {
          console.error('Auto-save failed:', error)
        }
      }
    }

    // Debounce auto-save
    const timeoutId = setTimeout(autoSave, 2000)
    return () => clearTimeout(timeoutId)
  }, [formData, cvName, currentCvId, isInitialLoading])

  // Calculate form completion progress
  const progressPercentage = useMemo(() => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone']
    const optionalFields = ['titulBefore', 'titulAfter', 'birthDate', 'gender', 'street', 'city', 'website', 'photo', 'otherExperience']
    const arrayFields = ['education', 'workExperience', 'languages', 'driverLicense']
    
    let filledFields = 0
    let totalFields = requiredFields.length + optionalFields.length + arrayFields.length
    
    // Check required fields (worth more)
    requiredFields.forEach(field => {
      if (formData[field] && formData[field].toString().trim()) {
        filledFields += 2 // Required fields count double
      }
    })
    totalFields += requiredFields.length // Add extra weight for required fields
    
    // Check optional fields
    optionalFields.forEach(field => {
      if (formData[field] && formData[field].toString().trim()) {
        filledFields += 1
      }
    })
    
    // Check array fields
    arrayFields.forEach(field => {
      if (formData[field] && formData[field].length > 0) {
        filledFields += 1
      }
    })
    
    return Math.round((filledFields / totalFields) * 100)
  }, [formData])

  // Calculate quality score (similar to ATS score logic)
  const qualityScore = useMemo(() => {
    let score = 0
    const maxScore = 100
    
    // Basic info (30 points max)
    if (formData.firstName && formData.lastName) score += 8
    if (formData.email) score += 8
    if (formData.phone) score += 8
    if (formData.photo) score += 6
    
    // Address (10 points max)
    if (formData.street && formData.city) score += 5
    if (formData.zip) score += 3
    if (formData.region) score += 2
    
    // Professional info (40 points max)
    if (formData.workExperience?.length > 0) {
      score += 15
      // Bonus for detailed work experience
      const detailedWork = formData.workExperience.filter(job => 
        job.company && job.position && job.description && job.description.length > 50
      )
      score += Math.min(detailedWork.length * 5, 15)
    }
    
    if (formData.education?.length > 0) {
      score += 10
      // Bonus for detailed education
      const detailedEducation = formData.education.filter(edu => 
        edu.school && edu.degree && edu.field
      )
      score += Math.min(detailedEducation.length * 3, 10)
    }
    
    // Additional sections (20 points max)
    if (formData.languages?.length > 0) score += 5
    if (formData.otherExperience && formData.otherExperience.length > 100) score += 8
    if (formData.driverLicense?.length > 0) score += 2
    if (formData.website) score += 3
    if (formData.titulBefore || formData.titulAfter) score += 2
    
    return Math.min(Math.round(score), maxScore)
  }, [formData])

  const updateFormData = (field, value) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
  }

  const handleBackClick = () => {
    router.push(`/${locale}/ucet`)
  }

  const handleTemplateSelect = (template) => {
    setCurrentTemplate(template.name)
    setShowTemplatesModal(false)
    
    // Here you can add logic to apply template-specific styling or structure
    // For now, we'll just update the template reference
    console.log('Selected template:', template)
  }

  const handleManualSave = async () => {
    setIsLoading(true)
    setSaveError(null)
    
    try {
      if (currentCvId && currentCvId !== 'new') {
        // Update existing CV
        await apiHelper.updateCV(currentCvId, formData)
      } else {
        // Create new CV
        const result = await apiHelper.createCV(cvName, formData)
        setCurrentCvId(result.insertedId)
      }
      
      setLastSaved(new Date())
    } catch (error) {
      console.error('Save failed:', error)
      setSaveError('Nepodařilo se uložit životopis. Zkuste to prosím znovu.')
    } finally {
      setIsLoading(false)
    }
  }

  // Field templates
  const educationTemplate = [
    { key: 'school', label: 'Škola', placeholder: 'např. Univerzita Karlova', icon: GraduationCap },
    { key: 'degree', label: 'Titul', placeholder: 'např. Bakalář' },
    { key: 'field', label: 'Obor', placeholder: 'např. Informatika', fullWidth: true },
    { key: 'startYear', label: 'Rok začátku', placeholder: '2020' },
    { key: 'endYear', label: 'Rok konce', placeholder: '2024' }
  ]

  const workTemplate = [
    { key: 'company', label: 'Společnost', placeholder: 'např. Google Czech', icon: Briefcase },
    { key: 'position', label: 'Pozice', placeholder: 'např. Software Developer' },
    { key: 'startDate', label: 'Začátek', type: 'date' },
    { key: 'endDate', label: 'Konec', type: 'date' },
    { key: 'description', label: 'Popis práce', type: 'textarea', fullWidth: true, placeholder: 'Popište vaše hlavní úkoly...' }
  ]

  const languageTemplate = [
    { key: 'language', label: 'Jazyk', placeholder: 'např. Angličtina' },
    { key: 'level', label: 'Úroveň', type: 'select', options: ['Základní', 'Střední', 'Pokročilá', 'Rodilý mluvčí'] }
  ]

  // Validation functions
  const emailValidation = (email) => {
    const isValid = /\S+@\S+\.\S+/.test(email)
    return { isValid, message: isValid ? '' : 'Zadejte platný email' }
  }

  if (isInitialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Načítání životopisu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen absolute top-0 w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Top Progress Bar */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-4">
              <BackButton onClick={handleBackClick} />
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-800">CVBuilder Pro</span>
                  <div className="text-xs text-gray-500">Profesionální životopisy</div>
                </div>
              </div>
              
              {/* Status indicators */}
              <div className="flex items-center gap-4">
                {lastSaved && (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>Auto-uloženo {lastSaved.toLocaleTimeString()}</span>
                  </div>
                )}
                {saveError && (
                  <div className="flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="w-3 h-3" />
                    <span>{saveError}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <QualityIndicator score={qualityScore} />
              
              <a href="/napoveda" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                <HelpCircle className="w-4 h-4" />
                Nápověda
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-600">Dokončení profilu</span>
                <span className="text-sm font-bold text-blue-600">{progressPercentage}%</span>
              </div>
              <ProgressBar progress={progressPercentage} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Form */}
        <div className="overflow-y-auto h-full">
          {/* Form Content */}
          <div className="p-6 max-w-4xl mx-auto">
            {/* CV Name */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-6">
              <SmartInput
                label="Název životopisu"
                value={cvName}
                onChange={setCvName}
                placeholder="např. CV - Frontend Developer"
                icon={FileText}
                defaultValue="Nový životopis"
              />
            </div>

            {/* Personal Information */}
            <CollapsibleSection title="Osobní údaje" icon={User}>
              <div className="space-y-6 pt-4">
                {/* Photo Upload */}
                <div className="flex justify-center">
                  <PhotoUploadWidget
                    value={formData.photo}
                    onChange={(value) => updateFormData('photo', value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SmartInput
                    label="Jméno"
                    value={formData.firstName}
                    onChange={(value) => updateFormData('firstName', value)}
                    placeholder="Vaše jméno"
                    required
                    icon={User}
                  />
                  
                  <SmartInput
                    label="Příjmení"
                    value={formData.lastName}
                    onChange={(value) => updateFormData('lastName', value)}
                    placeholder="Vaše příjmení"
                    required
                    icon={User}
                  />

                  <SmartInput
                    label="Titul před jménem"
                    value={formData.titulBefore}
                    onChange={(value) => updateFormData('titulBefore', value)}
                    placeholder="např. Ing."
                  />

                  <SmartInput
                    label="Titul za jménem"
                    value={formData.titulAfter}
                    onChange={(value) => updateFormData('titulAfter', value)}
                    placeholder="např. Ph.D."
                  />

                  <SmartInput
                    label="Email"
                    value={formData.email}
                    onChange={(value) => updateFormData('email', value)}
                    type="email"
                    placeholder="vas@email.cz"
                    required
                    icon={Mail}
                    validation={emailValidation}
                  />
                  
                  <SmartInput
                    label="Telefon"
                    value={formData.phone}
                    onChange={(value) => updateFormData('phone', value)}
                    type="tel"
                    placeholder="+420 123 456 789"
                    icon={Phone}
                  />

                  <SmartInput
                    label="Datum narození"
                    value={formData.birthDate}
                    onChange={(value) => updateFormData('birthDate', value)}
                    type="date"
                    icon={Calendar}
                  />

                  <SmartInput
                    label="Pohlaví"
                    value={formData.gender}
                    onChange={(value) => updateFormData('gender', value)}
                    type="radio"
                    options={['muž', 'žena']}
                    required
                  />

                  <SmartInput
                    label="Rodinný stav"
                    value={formData.maritalStatus}
                    onChange={(value) => updateFormData('maritalStatus', value)}
                    type="select"
                    options={['Svobodný/á', 'Ženatý/Vdaná', 'Rozvedený/á', 'Ovdovělý/á']}
                  />

                  <SmartInput
                    label="Webové stránky"
                    value={formData.website}
                    onChange={(value) => updateFormData('website', value)}
                    type="url"
                    placeholder="https://vaseweb.cz"
                    icon={Globe}
                  />
                </div>
              </div>
            </CollapsibleSection>

            {/* Address */}
            <CollapsibleSection title="Adresa" icon={MapPin}>
              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <SmartInput
                      label="Ulice a číslo popisné"
                      value={formData.street}
                      onChange={(value) => updateFormData('street', value)}
                      placeholder="např. Václavské náměstí 1"
                      icon={MapPin}
                    />
                  </div>

                  <SmartInput
                    label="Město"
                    value={formData.city}
                    onChange={(value) => updateFormData('city', value)}
                    placeholder="např. Praha"
                  />

                  <SmartInput
                    label="PSČ"
                    value={formData.zip}
                    onChange={(value) => updateFormData('zip', value)}
                    placeholder="např. 110 00"
                  />

                  <SmartInput
                    label="Kraj"
                    value={formData.region}
                    onChange={(value) => updateFormData('region', value)}
                    type="select"
                    options={[
                      'Hlavní město Praha', 'Středočeský', 'Jihočeský', 'Plzeňský',
                      'Karlovarský', 'Ústecký', 'Liberecký', 'Královéhradecký', 'Pardubický',
                      'Vysočina', 'Jihomoravský', 'Olomoucký', 'Zlínský', 'Moravskoslezský'
                    ]}
                  />

                  <SmartInput
                    label="Stát"
                    value={formData.state}
                    onChange={(value) => updateFormData('state', value)}
                    type="select"
                    options={['Česká republika', 'Slovenská republika', 'Jiné']}
                  />
                </div>
              </div>
            </CollapsibleSection>

            {/* Work Experience */}
            <CollapsibleSection title="Pracovní zkušenosti" icon={Briefcase}>
              <div className="pt-4">
                <ArraySection
                  title="Pracovní zkušenosti"
                  items={formData.workExperience}
                  onAdd={() => updateFormData('workExperience', [
                    ...formData.workExperience,
                    { company: '', position: '', startDate: '', endDate: '', description: '' }
                  ])}
                  onRemove={(index) => updateFormData('workExperience', 
                    formData.workExperience.filter((_, i) => i !== index)
                  )}
                  onUpdate={(items) => updateFormData('workExperience', items)}
                  template={workTemplate}
                  emptyText="Začněte přidáním vaší první pracovní zkušenosti"
                  icon={Briefcase}
                />
              </div>
            </CollapsibleSection>

            {/* Education */}
            <CollapsibleSection title="Vzdělání" icon={GraduationCap}>
              <div className="pt-4">
                <ArraySection
                  title="Vzdělání"
                  items={formData.education}
                  onAdd={() => updateFormData('education', [
                    ...formData.education,
                    { school: '', degree: '', field: '', startYear: '', endYear: '' }
                  ])}
                  onRemove={(index) => updateFormData('education', 
                    formData.education.filter((_, i) => i !== index)
                  )}
                  onUpdate={(items) => updateFormData('education', items)}
                  template={educationTemplate}
                  emptyText="Přidejte vaše vzdělání a kvalifikace"
                  icon={GraduationCap}
                />
              </div>
            </CollapsibleSection>

            {/* Languages */}
            <CollapsibleSection title="Jazyky" icon={Languages}>
              <div className="pt-4">
                <ArraySection
                  title="Jazyky"
                  items={formData.languages}
                  onAdd={() => updateFormData('languages', [
                    ...formData.languages,
                    { language: '', level: '' }
                  ])}
                  onRemove={(index) => updateFormData('languages', 
                    formData.languages.filter((_, i) => i !== index)
                  )}
                  onUpdate={(items) => updateFormData('languages', items)}
                  template={languageTemplate}
                  emptyText="Přidejte jazyky které ovládáte"
                  icon={Languages}
                />
              </div>
            </CollapsibleSection>

            {/* Other Experience */}
            <CollapsibleSection title="Další zkušenosti" icon={Award}>
              <div className="pt-4">
                <SmartTextarea
                  label="Další profesní zkušenosti, reference"
                  value={formData.otherExperience}
                  onChange={(value) => updateFormData('otherExperience', value)}
                  placeholder="Popište vaše další zkušenosti, certifikace, dobrovolnické aktivity..."
                  rows={6}
                />
              </div>
            </CollapsibleSection>

            {/* Driver License */}
            <CollapsibleSection title="Řidičský průkaz" icon={Car}>
              <div className="pt-4">
                <DriverLicenseWidget
                  value={formData.driverLicense}
                  onChange={(value) => updateFormData('driverLicense', value)}
                />
              </div>
            </CollapsibleSection>

            {/* Save Button */}
            <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
              <button
                onClick={handleManualSave}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Ukládání...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Uložit životopis
                  </>
                )}
              </button>
              
              {currentCvId && currentCvId !== 'new' && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  Změny se automaticky ukládají každé 2 sekundy
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Live Preview */}
        <div className="h-screen sticky top-[120px]">
          <LivePreview 
            cvData={formData} 
            photoPreview={formData.photo}
            isUnlocked={true}
            cvId={currentCvId}
            currentTemplate={currentTemplate}
            onTemplateChange={() => setShowTemplatesModal(true)}
          />
        </div>
      </div>

      {/* Templates Modal */}
      {showTemplatesModal && (
        <TemplatesModal
          onClose={() => setShowTemplatesModal(false)}
          onSelect={handleTemplateSelect}
        />
      )}
    </div>
  )
}

export default ModernCvBuilder