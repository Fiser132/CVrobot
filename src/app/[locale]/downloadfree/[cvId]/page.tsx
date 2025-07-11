'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Download, Gift, FileText, Clock, Shield, Star, ArrowLeft, Sparkles, Eye, CreditCard, CheckCircle, Heart, AlertCircle, User, Mail, Phone, MapPin, GraduationCap, Briefcase, Languages, Car } from 'lucide-react';

// Animated Background Component
const AnimatedBackground = () => {   
  return (     
    <div className="inset-0 overflow-hidden pointer-events-none">       
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">         
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>         
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>         
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>                  
        
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

// API Helper Functions - Same pattern as other pages
const apiHelper = {
  // Get specific CV by ID
  async getCVById(id) {
    try {
      const response = await fetch(`/api/cvs/${id}`, {
        cache: 'no-store'
      })
      
      if (response.status === 404) {
        return null
      }
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }
      
      return data
    } catch (error) {
      console.error('Error fetching CV by ID:', error)
      throw error
    }
  },

  // Generate PDF download
  async generateFreePDF(cvId) {
    try {
      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cvId, 
          type: 'free', // This will add watermarks
          format: 'pdf' 
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }
      
      // Return blob for download
      return await response.blob()
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw error
    }
  }
}

// Progress Indicator Component
const ProgressIndicator = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
            ✓
          </div>
          <span className="font-bold text-green-600">Build</span>
        </div>
        <div className="w-12 h-1 bg-green-500 rounded-full"></div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
            ✓
          </div>
          <span className="font-bold text-green-500">Deploy</span>
        </div>
        <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
            3
          </div>
          <span className="text-blue-500 font-bold">Download (Free)</span>
        </div>
      </div>
    </div>
  );
};

// Free Badge Component
const FreeBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
      <Gift className="w-4 h-4" />
      Zdarma
    </div>
  );
};

// CV Preview with Real Data and Gentle Watermark
const CVPreview = ({ cvData }) => {
  if (!cvData) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  const { content } = cvData;
  const displayName = content?.firstName && content?.lastName 
    ? `${content.firstName} ${content.lastName}` 
    : 'Váš životopis';

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Náhled vašeho životopisu</h3>
      
      {/* Real CV Content with Watermarks */}
      <div className="relative bg-white border-2 border-gray-200 rounded-lg p-6 min-h-[500px]">
        {/* Gentle watermark overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="transform rotate-45 text-3xl font-bold text-gray-300/40 select-none">
            DEMO VERZE
          </div>
        </div>
        
        {/* Another gentle watermark */}
        <div className="absolute top-1/4 right-1/6 transform -rotate-12 text-lg font-medium text-blue-300/30 select-none pointer-events-none z-10">
          cvbuilder.cz
        </div>
        
        {/* Real CV content */}
        <div className="relative z-0">
          {/* Header with real data */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {content?.titulBefore && `${content.titulBefore} `}
              {displayName}
              {content?.titulAfter && `, ${content.titulAfter}`}
            </h1>
            {content?.workExperience?.[0]?.position && (
              <p className="text-gray-600 font-medium">{content.workExperience[0].position}</p>
            )}
            <div className="text-sm text-gray-500 space-y-1 mt-2">
              {content?.email && (
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-3 h-3" />
                  {content.email}
                </div>
              )}
              {content?.phone && (
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-3 h-3" />
                  {content.phone}
                </div>
              )}
              {(content?.street || content?.city) && (
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-3 h-3" />
                  {content.street} {content.city} {content.zip}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Work Experience */}
            {content?.workExperience?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  Pracovní zkušenosti
                </h2>
                <div className="space-y-3">
                  {content.workExperience.slice(0, 2).map((job, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-3">
                      <h3 className="font-semibold text-gray-800">{job.position || 'Pozice'}</h3>
                      <p className="text-blue-600 font-medium">{job.company || 'Společnost'}</p>
                      {(job.startDate || job.endDate) && (
                        <p className="text-sm text-gray-500">
                          {job.startDate} - {job.endDate || 'současnost'}
                        </p>
                      )}
                      {job.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {job.description.substring(0, 100)}...
                        </p>
                      )}
                    </div>
                  ))}
                  {content.workExperience.length > 2 && (
                    <p className="text-sm text-gray-500 italic">
                      ... a další {content.workExperience.length - 2} pozice
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Education */}
            {content?.education?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-green-600" />
                  Vzdělání
                </h2>
                <div className="space-y-2">
                  {content.education.slice(0, 2).map((edu, index) => (
                    <div key={index} className="border-l-2 border-green-200 pl-3">
                      <h3 className="font-semibold text-gray-800">{edu.degree || 'Titul'}</h3>
                      <p className="text-green-600 font-medium">{edu.school || 'Škola'}</p>
                      {edu.field && <p className="text-gray-600 text-sm">{edu.field}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Languages */}
            {content?.languages?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-purple-600" />
                  Jazyky
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {content.languages.slice(0, 4).map((lang, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="font-medium">{lang.language || 'Jazyk'}</span>
                      <span className="text-gray-600">{lang.level || 'Úroveň'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Driver License */}
            {content?.driverLicense?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
                  <Car className="w-4 h-4 text-orange-600" />
                  Řidičský průkaz
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {content.driverLicense.map((license, index) => (
                    <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      {license}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Other Experience */}
            {content?.otherExperience && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                  Další zkušenosti
                </h2>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {content.otherExperience}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">Bezplatná verze</h4>
            <p className="text-blue-700 text-sm">
              Váš životopis je připraven ke stažení! Obsahuje jemné vodoznaky, které můžete odstranit přechodem na prémiovou verzi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Free Download Button Component
const FreeDownloadButton = ({ loading, onDownload, cvName }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {cvName || 'Váš životopis'} je připraven!
            </h3>
            <p className="text-gray-600">PDF formát • Rychlé stažení • Obsahuje vodoznaky</p>
          </div>
        </div>
        <FreeBadge />
      </div>

      <button
        onClick={onDownload}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 disabled:to-green-500 text-white font-bold py-5 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Připravuje se PDF...
          </>
        ) : (
          <>
            <Download className="w-6 h-6" />
            Stáhnout zdarma
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-green-600">
        <Gift className="w-4 h-4" />
        Děkujeme, že používáte náš CV builder!
      </div>
    </div>
  );
};

// What You Get Grid Component (same as before)
const WhatYouGetGrid = () => {
  const features = [
    { 
      icon: CheckCircle, 
      title: 'Kompletní životopis', 
      description: 'Všechny vaše informace přehledně',
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-700'
    },
    { 
      icon: Download, 
      title: 'Okamžité stažení', 
      description: 'Ihned dostupné ke stažení',
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-700'
    },
    { 
      icon: FileText, 
      title: 'PDF formát', 
      description: 'Kompatibilní se všemi zařízeními',
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-700'
    },
    { 
      icon: Heart, 
      title: 'Vytvořeno s láskou', 
      description: 'Náš dárek pro vás',
      color: 'from-pink-500 to-pink-600',
      textColor: 'text-pink-700'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Co získáváte zdarma</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center shadow-sm`}>
              <feature.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className={`text-sm ${feature.textColor}`}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Gentle Upgrade CTA Component with Real CV Link
const GentleUpgradeCTA = ({ cvId, locale }) => {
  const handleUpgrade = () => {
    // Redirect to premium payment page
    window.location.href = `/${locale}/choose/${cvId}?version=pro`;
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
      <div className="text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-white fill-current" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Líbí se vám náš builder?</h3>
        <p className="text-blue-100 mb-6 text-lg">
          Odstraňte vodoznaky a získejte prémiový vzhled za 10€/měsíc
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-2 text-blue-100">
            <CheckCircle className="w-5 h-5 text-blue-200" />
            <span>Čistý design</span>
          </div>
          <div className="flex items-center gap-2 text-blue-100">
            <CheckCircle className="w-5 h-5 text-blue-200" />
            <span>Neomezené úpravy</span>
          </div>
          <div className="flex items-center gap-2 text-blue-100">
            <CheckCircle className="w-5 h-5 text-blue-200" />
            <span>Cloudové uložení</span>
          </div>
        </div>
        
        <button 
          onClick={handleUpgrade}
          className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-colors text-lg shadow-lg"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            Upgradovat za 10€/měsíc
          </div>
        </button>
        
        <p className="text-blue-200 text-sm mt-4">
          Nebo pokračujte s bezplatnou verzí - rozhodnutí je na vás! 😊
        </p>
      </div>
    </div>
  );
};

// Free Summary Component
const FreeSummary = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      <h4 className="text-lg font-bold text-gray-900 mb-4">Shrnutí bezplatné verze</h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Cena</span>
          <span className="font-bold text-lg text-green-600">0€</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Formát</span>
          <span className="font-medium text-gray-900">PDF</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Vodoznaky</span>
          <span className="font-medium text-blue-600">Ano (jemné)</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Úpravy</span>
          <span className="font-medium text-orange-600">Jednorázové stažení</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-600">Rychlost stažení</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-semibold">Okamžitě</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Thank You Card Component
const ThankYouCard = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-blue-200">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-green-900 mb-2">Děkujeme za důvěru!</h4>
          <p className="text-green-800 text-sm leading-relaxed mb-3">
            Jsme rádi, že jste si vybrali náš CV builder. Doufáme, že vám pomůže najít vaši vysněnou práci!
          </p>
          <p className="text-blue-700 text-xs font-medium">
            💡 Tip: Pokud se vám líbí náš builder, můžete vždy upgradovat na prémiovou verzi pro čistší vzhled.
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Free Download Page Component with Real MongoDB Integration
export default function FreeDownloadPage() {
  const params = useParams();
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [cvData, setCvData] = useState(null);
  const [cvName, setCvName] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [currentCvId, setCurrentCvId] = useState(null); // Store the actual CV ID we're using

  // Debug: Log all available params
  console.log('Available params:', params);
  console.log('All param keys:', Object.keys(params || {}));

  // Get locale and cvId from URL - try multiple possible parameter names
  const locale = params?.locale || 'sk';
  const cvId = params?.id || params?.cvid || params?.cvId || params?.[0]; // Try different param names

  // Debug: Log what we found
  console.log('Extracted locale:', locale);
  console.log('Extracted cvId:', cvId);
  console.log('Current URL:', typeof window !== 'undefined' ? window.location.href : 'SSR');

  // Load real CV data from MongoDB
  useEffect(() => {
    const fetchCvData = async () => {
      // Try to get CV ID from URL as fallback
      let finalCvId = cvId;
      
      if (!finalCvId && typeof window !== 'undefined') {
        const urlParts = window.location.pathname.split('/');
        console.log('URL parts:', urlParts);
        
        // Look for CV ID in URL path (e.g., /downloadfree/123 or /sk/downloadfree/123)
        const downloadIndex = urlParts.findIndex(part => part === 'downloadfree');
        if (downloadIndex >= 0 && urlParts[downloadIndex + 1]) {
          finalCvId = urlParts[downloadIndex + 1];
          console.log('Found CV ID in URL:', finalCvId);
        }
        
        // Also try URL search params
        const urlParams = new URLSearchParams(window.location.search);
        if (!finalCvId && urlParams.get('cvId')) {
          finalCvId = urlParams.get('cvId');
          console.log('Found CV ID in search params:', finalCvId);
        }
      }
      
      console.log('Final CV ID to use:', finalCvId);
      
      if (!finalCvId || finalCvId === 'new') {
        setLoadError(`No CV ID provided. Available params: ${JSON.stringify(params)}. Current URL: ${typeof window !== 'undefined' ? window.location.href : 'SSR'}`);
        setIsInitialLoading(false);
        return;
      }

      try {
        setIsInitialLoading(true);
        console.log('Loading CV data for free download:', finalCvId);
        
        const cvData = await apiHelper.getCVById(finalCvId);
        
        if (!cvData) {
          setLoadError('CV not found');
          setIsInitialLoading(false);
          return;
        }

        console.log('Loaded CV data for free download:', cvData);
        
        setCvData(cvData);
        setCvName(cvData.name || 'Váš životopis');
        setCurrentCvId(finalCvId); // Store the CV ID we're actually using
        
        console.log('CV data loaded successfully for free download');
      } catch (error) {
        console.error('Error loading CV for free download:', error);
        setLoadError('Failed to load CV: ' + error.message);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchCvData();
  }, [cvId, params]); // Add params to dependencies

  const handleDownload = async () => {
    if (!currentCvId) {
      alert('CV ID not available for download');
      return;
    }
    
    setDownloadLoading(true);
    
    try {
      console.log('Generating free PDF for CV:', currentCvId);
      
      // Generate PDF with watermarks
      const pdfBlob = await apiHelper.generateFreePDF(currentCvId);
      
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cvName || 'CV'}_free.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      console.log('Free PDF download completed');
    } catch (error) {
      console.error('Error downloading free PDF:', error);
      alert('Nepodařilo se stáhnout PDF. Zkuste to prosím znovu.');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleGoBack = () => {
    // Navigate back to the CV builder/edit page
    if (currentCvId && currentCvId !== 'new') {
      window.location.href = `/${locale}/ucet/edit/${currentCvId}`;
    } else {
      window.location.href = `/${locale}/ucet`;
    }
  };

  // Loading state
  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <AnimatedBackground />
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Příprava vašeho CV...</h1>
          <p className="text-gray-600">Načítání bezplatné verze</p>
        </div>
      </div>
    );
  }

  // Error state
  if (loadError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <AnimatedBackground />
        <div className="text-center relative z-10">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Chyba načítání</h1>
          <p className="text-gray-600 mb-6">{loadError}</p>
          <div className="space-x-4">
            <button
              onClick={handleGoBack}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Zpět na úpravy CV
            </button>
            <button
              onClick={() => window.location.href = `/${locale}/ucet`}
              className="text-gray-500 hover:text-gray-600 font-medium"
            >
              Přehled CV
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 relative z-10">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Zpět na úpravy</span>
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900">Bezplatné stažení</h1>
            </div>
          </div>
        </header>

        {/* Progress Indicator */}
        <ProgressIndicator />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
          {/* Success Animation for free version */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Gift className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Váš životopis je připraven! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Bezplatná verze s jemnými vodoznaky
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Download & Features */}
            <div className="lg:col-span-2 space-y-8">
              <FreeDownloadButton
                loading={downloadLoading}
                onDownload={handleDownload}
                cvName={cvName}
              />

              <CVPreview cvData={cvData} />

              <WhatYouGetGrid />

              <ThankYouCard />
            </div>

            {/* Right Column - Summary & Upgrade */}
            <div className="lg:col-span-1 space-y-6">
              <FreeSummary />
              <GentleUpgradeCTA cvId={currentCvId} locale={locale} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}