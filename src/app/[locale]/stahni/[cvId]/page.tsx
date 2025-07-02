'use client'
import React, { useEffect, useState } from 'react';
import { Download, CheckCircle, FileText, Clock, Shield, Star, ArrowLeft, Sparkles, Settings, CreditCard, Database, Server, Cpu, Globe, GitBranch, Terminal, Code, Zap, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// Animated Background Component (same as choose page)
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

// API Helper Functions
const apiHelper = {
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
  }
}

// Calculate Quality Score
const calculateQualityScore = (content) => {
  let score = 0
  
  if (content.firstName && content.lastName) score += 8
  if (content.email) score += 8
  if (content.phone) score += 8
  if (content.photo) score += 6
  
  if (content.street && content.city) score += 5
  if (content.zip) score += 3
  if (content.region) score += 2
  
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
  
  if (content.languages?.length > 0) score += 5
  if (content.otherExperience && content.otherExperience.length > 100) score += 8
  if (content.driverLicense?.length > 0) score += 2
  if (content.website) score += 3
  if (content.titulBefore || content.titulAfter) score += 2
  
  return Math.min(Math.round(score), 100)
}

// Generate CV Title from content
const generateCVTitle = (content) => {
  let title = ''
  
  if (content.firstName && content.lastName) {
    title = `${content.firstName} ${content.lastName}`
  }
  
  if (content.workExperience?.length > 0) {
    const latestJob = content.workExperience[0]
    if (latestJob.position) {
      title += title ? ` - ${latestJob.position}` : latestJob.position
    }
  }
  
  if (!title && content.firstName) {
    title = `${content.firstName} CV`
  } else if (!title) {
    title = 'Professional CV'
  }
  
  return title
}

// Progress Indicator Component
const ProgressIndicator = () => {
  return (
    <div className="flex items-center justify-center mb-12">
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
        <div className="w-12 h-1 bg-green-500 rounded-full"></div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
            ✓
          </div>
          <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Download</span>
        </div>
      </div>
    </div>
  );
};

// Success Animation Component with enhanced design
const SuccessAnimation = ({ isPro = false }) => {
  return (
    <div className="text-center mb-12">
      <div className="relative inline-block">
        <div className={`w-32 h-32 ${isPro 
          ? 'bg-gradient-to-br from-purple-500 to-blue-600' 
          : 'bg-gradient-to-br from-green-500 to-emerald-600'
        } rounded-2xl flex items-center justify-center mb-6 shadow-2xl`}>
          <CheckCircle className="w-16 h-16 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        {isPro && (
          <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <Star className="w-5 h-5 text-white fill-current" />
          </div>
        )}
      </div>
      <h1 className="text-4xl font-black mb-4 text-gray-900">
        {isPro ? 'Pro Deployment Complete! 🚀' : 'Download Ready! 🎉'}
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {isPro 
          ? 'Your premium CV is deployed in the cloud with unlimited editing access'
          : 'Your professional CV is ready for download'
        }
      </p>
    </div>
  );
};

// Enhanced CV Preview Component with Real Data
const CvPreview = ({ cvData, isPro, qualityScore }) => {
  if (!cvData) {
    return (
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl border border-gray-200/50">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="text-gray-500 text-sm mt-4">Loading preview...</p>
      </div>
    );
  }

  const displayName = cvData.content?.firstName && cvData.content?.lastName 
    ? `${cvData.content.firstName} ${cvData.content.lastName}` 
    : cvData.name || 'Professional CV';

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center gap-6 mb-6">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
          isPro 
            ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
            : 'bg-gradient-to-br from-green-500 to-emerald-500'
        } shadow-lg`}>
          <FileText className="w-10 h-10 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-gray-900">
              {displayName}
            </h3>
            {isPro && (
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                PRO ENHANCED
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-3">
            PDF Format • A4 • {isPro ? 'Watermark-free Premium' : 'Professional Quality'}
          </p>
          {qualityScore && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Quality Score:</span>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                qualityScore >= 80 ? 'bg-green-100 text-green-700' :
                qualityScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {qualityScore}%
              </span>
              {qualityScore >= 90 && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                  ATS Optimized
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Storage:</span>
            <span className={`font-bold ${isPro ? 'text-purple-600' : 'text-blue-600'}`}>
              {isPro ? 'Cloud Saved Forever' : 'Local Download'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Watermark:</span>
            <span className={`font-bold ${isPro ? 'text-green-500' : 'text-orange-500'}`}>
              {isPro ? 'Completely Removed' : 'Not Present'}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Future Edits:</span>
            <span className={`font-bold ${isPro ? 'text-green-500' : 'text-gray-400'}`}>
              {isPro ? 'Unlimited Forever' : 'Not Available'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Templates:</span>
            <span className={`font-bold ${isPro ? 'text-purple-500' : 'text-blue-500'}`}>
              {isPro ? 'All Premium Access' : 'Current Template'}
            </span>
          </div>
        </div>
      </div>

      {/* CV Content Preview */}
      {cvData.content && (
        <div className="border-t border-gray-200/30 pt-6 mb-6">
          <h4 className="font-bold mb-4 text-gray-900">CV Content Analysis</h4>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Personal Info:</span>
                <span className={`font-medium ${
                  cvData.content.firstName && cvData.content.lastName && cvData.content.email 
                    ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {cvData.content.firstName && cvData.content.lastName && cvData.content.email 
                    ? 'Complete' : 'Basic'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Work Experience:</span>
                <span className="font-medium text-gray-900">
                  {cvData.content.workExperience?.length || 0} positions
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Education:</span>
                <span className="font-medium text-gray-900">
                  {cvData.content.education?.length || 0} degrees
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Languages:</span>
                <span className="font-medium text-gray-900">
                  {cvData.content.languages?.length || 0} languages
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPro && (
        <div className="border-t border-gray-200/30 pt-6">
          <h4 className="font-bold mb-4 text-gray-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-600" />
            Pro Features Active
          </h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-xs font-medium text-gray-700">No Watermark</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Database className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-xs font-medium text-gray-700">Cloud Storage</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-xs font-medium text-gray-700">Unlimited Edits</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Globe className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-xs font-medium text-gray-700">Premium Access</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Download Card Component
const DownloadCard = ({ cvName, isPro, loading, onDownload, qualityScore }) => {
  return (
    <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your CV is Ready</h2>
        <p className="text-gray-600 text-lg">
          {isPro 
            ? 'Premium version with unlimited features activated'
            : 'High-quality professional format ready for download'
          }
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
          <span className="text-gray-600 font-medium">Document Name:</span>
          <span className="font-bold text-gray-900 max-w-xs truncate">{cvName}</span>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
          <span className="text-gray-600 font-medium">Format:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">PDF</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">
              A4 • High Quality
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
          <span className="text-gray-600 font-medium">License:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">
              {isPro ? 'Pro Unlimited' : 'Standard'}
            </span>
            {isPro && (
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                PREMIUM
              </span>
            )}
          </div>
        </div>

        {qualityScore && (
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <span className="text-gray-600 font-medium">Quality Score:</span>
            <div className="flex items-center gap-2">
              <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                qualityScore >= 80 ? 'bg-green-100 text-green-700' :
                qualityScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {qualityScore}%
              </span>
              {qualityScore >= 90 && (
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-bold">
                  EXCELLENT
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onDownload}
        disabled={loading}
        className={`w-full font-bold py-6 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-[1.02] text-lg ${
          isPro
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-purple-400 disabled:to-blue-400 text-white shadow-purple-500/25'
            : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-green-400 disabled:to-emerald-400 text-white shadow-green-500/25'
        }`}
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Preparing download...
          </>
        ) : (
          <>
            <Download className="w-6 h-6" />
            Download {isPro ? 'Premium' : 'Professional'} CV
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        {isPro 
          ? 'Cloud saved forever • Edit anytime • No expiration'
          : 'High-quality PDF • Ready for printing • Professional format'
        }
      </p>
    </div>
  );
};

// Tech Specs Component
const TechSpecs = ({ isPro }) => {
  const specs = isPro ? {
    'Output Quality': '300 DPI • Vector graphics',
    'Watermark': 'Completely removed',
    'Cloud Storage': 'Lifetime access',
    'Editing Rights': 'Unlimited forever',
    'Template Access': 'All premium designs',
    'Support Level': '24/7 priority assistance',
    'Version History': 'Full backup system',
    'Export Formats': 'PDF, DOCX, HTML',
  } : {
    'Output Quality': '300 DPI • Vector graphics',
    'Watermark': 'Not present',
    'Storage': 'Local download only',
    'Template': 'Current design locked',
    'Support': 'Community resources',
    'Format': 'PDF only',
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${isPro ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}>
          <Terminal className={`w-6 h-6 ${isPro ? 'text-purple-600' : 'text-blue-600'}`} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          Technical Specifications
        </h3>
      </div>
      
      <div className="space-y-4">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center py-3 border-b border-gray-200/30">
            <span className="font-medium text-gray-600">{key}:</span>
            <span className="font-bold text-gray-900 text-right max-w-xs">{value}</span>
          </div>
        ))}
      </div>

      {isPro && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-purple-600" />
            <span className="font-bold text-sm text-gray-900">
              Developer Tools Included
            </span>
          </div>
          <div className="text-sm text-purple-600 space-y-1">
            <div>• API access for integrations</div>
            <div>• Webhook notifications</div>
            <div>• Batch export capabilities</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Loading State Component
const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <AnimatedBackground />
      <div className="text-center relative z-10">
        <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Preparing your CV...</h1>
        <p className="text-gray-600">Setting up download environment</p>
      </div>
    </div>
  );
};

// Error State Component
const ErrorState = ({ message, onBack, locale }) => {
  const isNoCvId = message.includes('No CV ID');
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <AnimatedBackground />
      <div className="text-center max-w-md relative z-10">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {isNoCvId ? 'CV Not Found' : 'Download Error'}
        </h1>
        <p className="text-gray-600 mb-8">
          {isNoCvId 
            ? 'The CV you\'re trying to download could not be found. Please check the link or create a new CV.'
            : message
          }
        </p>
        <div className="space-y-4">
          {isNoCvId ? (
            <>
              <button
                onClick={() => window.location.href = `/${locale}/builder`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Create New CV
              </button>
              <button
                onClick={() => window.location.href = `/${locale}/ucet`}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Go to Dashboard
              </button>
            </>
          ) : (
            <button
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Back to Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Download Page Component
export default function DownloadPage({ params }) {
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [cvData, setCvData] = useState(null);
  const [qualityScore, setQualityScore] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isPro, setIsPro] = useState(false);
  
  const searchParams = useSearchParams();
  const locale = params?.locale || 'en';
  
  // Try multiple ways to get CV ID
  const getCvId = () => {
    // From URL search params
    const searchCvId = searchParams.get('cvId');
    if (searchCvId) return searchCvId;
    
    // From dynamic route params
    const paramsCvId = params?.cvId || params?.cvid || params?.id;
    if (paramsCvId) return paramsCvId;
    
    // From URL hash or other sources
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlCvId = urlParams.get('cvId') || urlParams.get('id');
      if (urlCvId) return urlCvId;
      
      // Check if CV ID is in the pathname
      const pathParts = window.location.pathname.split('/');
      const downloadIndex = pathParts.findIndex(part => part === 'download' || part === 'downloadfree');
      if (downloadIndex !== -1 && pathParts[downloadIndex + 1]) {
        return pathParts[downloadIndex + 1];
      }
    }
    
    return null;
  };
  
  const cvId = getCvId();
  const sessionId = searchParams.get('session_id');
  const version = searchParams.get('version') || 'basic';
  
  // Debug logging
  useEffect(() => {
    console.log('Download page params:', {
      params,
      searchParams: Object.fromEntries(searchParams.entries()),
      cvId,
      sessionId,
      version,
      pathname: typeof window !== 'undefined' ? window.location.pathname : 'SSR'
    });
  }, []);

  useEffect(() => {
    const fetchCvData = async () => {
      console.log('Attempting to fetch CV data for ID:', cvId);
      
      if (!cvId || cvId === 'new') {
        // If no CV ID, try to use demo data or redirect
        console.warn('No CV ID provided, using demo data');
        
        // Use demo data for demonstration
        const demoData = {
          _id: 'demo-cv',
          name: 'Professional CV Demo',
          content: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+1 234 567 8900',
            workExperience: [
              {
                company: 'Tech Corp',
                position: 'Software Developer',
                description: 'Developed web applications using modern technologies'
              }
            ],
            education: [
              {
                school: 'University of Technology',
                degree: 'Bachelor of Science',
                field: 'Computer Science'
              }
            ],
            languages: ['English', 'Spanish']
          }
        };
        
        setCvData(demoData);
        const score = calculateQualityScore(demoData.content || {});
        setQualityScore(score);
        setIsPro(version === 'pro' || sessionId);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Determine if this is a pro version
        setIsPro(version === 'pro' || sessionId);
        
        const cvData = await apiHelper.getCVById(cvId);
        
        if (!cvData) {
          setFetchError('CV not found');
          setLoading(false);
          return;
        }

        setCvData(cvData);
        const score = calculateQualityScore(cvData.content || {});
        setQualityScore(score);
        
      } catch (error) {
        console.error('Error loading CV:', error);
        setFetchError('Failed to load CV: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCvData();
  }, [cvId, version, sessionId]);

  const handleDownload = async () => {
    setDownloadLoading(true);
    
    try {
      // If using demo data, simulate download
      if (!cvId || cvId === 'demo-cv') {
        // Simulate download delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create a demo PDF content (in real app, this would be generated server-side)
        const demoContent = `Demo CV Download - ${generateCVTitle(cvData?.content || {})}`;
        const blob = new Blob([demoContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${generateCVTitle(cvData?.content || {})}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        return;
      }
      
      // Make API call to generate and download CV
      const response = await fetch(`/api/cvs/${cvId}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: isPro ? 'pro' : 'basic',
          sessionId: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Handle the file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${generateCVTitle(cvData?.content || {})}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleGoBack = () => {
    if (cvId && cvId !== 'new') {
      window.location.href = `/${locale}/payment?cvId=${cvId}`;
    } else {
      window.location.href = `/${locale}/ucet`;
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (fetchError) {
    return <ErrorState message={fetchError} onBack={handleGoBack} locale={locale} />;
  }

  const cvName = cvData ? generateCVTitle(cvData.content || {}) : 'Professional CV';

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Payment</span>
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">
                CV Download Center
              </h1>
              {(!cvId || cvId === 'demo-cv') && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  Demo Mode
                </span>
              )}
            </div>
            {isPro && (
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wide flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  PRO ACTIVE
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Demo Warning Banner */}
        {(!cvId || cvId === 'demo-cv') && (
          <div className="bg-orange-50 border-b border-orange-200">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-orange-800 font-medium">Demo Preview Mode</p>
                  <p className="text-orange-700 text-sm">
                    You're viewing a sample CV. To download your actual CV, please provide a valid CV ID in the URL.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <ProgressIndicator />
        <SuccessAnimation isPro={isPro} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - CV Preview & Tech Specs */}
          <div className="xl:col-span-2 space-y-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Production Output Preview
              </h2>
              <p className="text-lg text-gray-600">
                {isPro 
                  ? 'Your premium CV with unlimited cloud access and no watermarks'
                  : 'Your professional CV ready for immediate download'
                }
              </p>
            </div>

            <CvPreview 
              cvData={cvData} 
              isPro={isPro}
              qualityScore={qualityScore}
            />

            <TechSpecs isPro={isPro} />
          </div>

          {/* Right Column - Download */}
          <div className="xl:col-span-1">
            <DownloadCard
              cvName={cvName}
              isPro={isPro}
              loading={downloadLoading}
              onDownload={handleDownload}
              qualityScore={qualityScore}
            />

            {/* Additional Info */}
            <div className={`mt-8 ${isPro ? 'bg-purple-50' : 'bg-blue-50'} rounded-2xl p-6 border ${isPro ? 'border-purple-200' : 'border-blue-200'}`}>
              <div className="flex items-start gap-3">
                {isPro ? (
                  <Sparkles className="w-5 h-5 text-purple-500 mt-0.5" />
                ) : (
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                )}
                <div>
                  <p className={`font-bold ${isPro ? 'text-purple-900' : 'text-blue-900'}`}>
                    {isPro ? 'Pro Features Active' : 'Download Information'}
                  </p>
                  <p className={`text-sm mt-1 ${isPro ? 'text-purple-700' : 'text-blue-700'}`}>
                    {isPro 
                      ? 'Your CV is saved in the cloud forever. Edit anytime from your dashboard with all premium templates and features.'
                      : 'High-quality PDF download ready for immediate use. Professional formatting optimized for both digital and print applications.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}