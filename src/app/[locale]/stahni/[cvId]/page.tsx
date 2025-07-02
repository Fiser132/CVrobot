'use client'
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Download, CheckCircle, FileText, Clock, Shield, Star, ArrowLeft, Sparkles, Settings, CreditCard, AlertCircle, User, Mail, Phone, MapPin } from 'lucide-react';

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

  // Verify payment session
  async verifyPaymentSession(sessionId) {
    try {
      const response = await fetch('/api/stripe/verify-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment verification failed')
      }
      
      return data
    } catch (error) {
      console.error('Error verifying payment session:', error)
      throw error
    }
  },

  // Generate premium PDF download
  async generatePremiumPDF(cvId, sessionId) {
    try {
      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cvId, 
          type: 'premium', // No watermarks
          format: 'pdf',
          sessionId // For verification
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate premium PDF')
      }
      
      // Return blob for download
      return await response.blob()
    } catch (error) {
      console.error('Error generating premium PDF:', error)
      throw error
    }
  }
}

// Calculate Quality Score (same as dashboard)
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

// Progress Indicator Component
const ProgressIndicator = () => {
  return (
    <div className="flex items-center justify-center py-10 ">
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
          <span className="text-blue-500 font-bold">Download</span>
        </div>
      </div>
    </div>
  );
};

// Success Animation Component
const SuccessAnimation = ({ cvData }) => {
  const displayName = cvData?.content?.firstName && cvData?.content?.lastName 
    ? `${cvData.content.firstName} ${cvData.content.lastName}` 
    : cvData?.name || 'Váš životopis';

  return (
    <div className="text-center mb-12">
      <div className="relative inline-block">
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-800" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Platba úspěšná! 🎉
      </h1>
      <p className="text-lg text-gray-600">
        {displayName} je připraven ke stažení
      </p>
    </div>
  );
};

// Premium Badge Component
const PremiumBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
      <Star className="w-4 h-4 fill-current" />
      Premium
    </div>
  );
};

// Download Button Component with Real Data
const DownloadButton = ({ cvData, qualityScore, loading, onDownload }) => {
  const displayName = cvData?.content?.firstName && cvData?.content?.lastName 
    ? `${cvData.content.firstName} ${cvData.content.lastName}` 
    : cvData?.name || 'Váš životopis';

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{displayName}</h3>
            <p className="text-gray-500">PDF formát • Bez vodoznaku • Vysoká kvalita</p>
            {qualityScore && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-medium text-gray-600">Kvalita CV:</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  qualityScore >= 80 ? 'bg-green-100 text-green-700' :
                  qualityScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {qualityScore}%
                </span>
              </div>
            )}
          </div>
        </div>
        <PremiumBadge />
      </div>

      {/* CV Content Summary */}
      {cvData?.content && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Obsah vašeho CV:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Kontakt:</span>
                <span className={`font-medium ${
                  cvData.content.email && cvData.content.phone ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {cvData.content.email && cvData.content.phone ? 'Kompletní' : 'Částečný'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Práce:</span>
                <span className="font-medium text-gray-900">
                  {cvData.content.workExperience?.length || 0} pozic
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Vzdělání:</span>
                <span className="font-medium text-gray-900">
                  {cvData.content.education?.length || 0} titulů
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jazyky:</span>
                <span className="font-medium text-gray-900">
                  {cvData.content.languages?.length || 0} jazyků
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onDownload}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 disabled:to-green-500 text-white font-bold py-5 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Generuje se PDF...
          </>
        ) : (
          <>
            <Download className="w-6 h-6" />
            Stáhnout premium životopis
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        Neomezené stažení po dobu platného předplatného
      </div>
    </div>
  );
};

// Features Grid Component
const FeaturesGrid = () => {
  const features = [
    { 
      icon: CheckCircle, 
      title: 'Profesionální formátování', 
      description: 'Optimalizováno pro personalisty',
      color: 'from-green-500 to-green-600'
    },
    { 
      icon: Shield, 
      title: 'Bez vodoznaku', 
      description: 'Čistý, profesionální vzhled',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: FileText, 
      title: 'Vysoká kvalita tisku', 
      description: 'Perfektní pro fyzické kopie',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      icon: Download, 
      title: 'Neomezené stažení', 
      description: 'Upravte a stahujte kdykoliv',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Co jste získali</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center shadow-sm`}>
              <feature.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Payment Summary Component with Real Session Data
const PaymentSummary = ({ sessionData, paymentData }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      <h4 className="text-lg font-bold text-gray-900 mb-4">Shrnutí platby</h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Částka</span>
          <span className="font-bold text-lg text-gray-900">
            {paymentData?.amount ? `${paymentData.amount / 100} €` : '10 €'}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Datum</span>
          <span className="font-medium text-gray-900">
            {paymentData?.created ? new Date(paymentData.created * 1000).toLocaleDateString('cs-CZ') : new Date().toLocaleDateString('cs-CZ')}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">ID transakce</span>
          <span className="font-mono text-sm text-gray-700">
            #{sessionData?.id?.slice(-8) || 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Metoda platby</span>
          <span className="font-medium text-gray-900">
            {paymentData?.payment_method_types?.[0] || 'Kreditní karta'}
          </span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-600">Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-semibold">Zaplaceno</span>
          </div>
        </div>
      </div>
      
      {sessionData?.subscription && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h5 className="font-semibold text-purple-900 mb-2">Předplatné aktivní</h5>
          <p className="text-purple-700 text-sm">
            Můžete upravovat a stahovat svůj CV neomezeně. Předplatné se automaticky obnovuje měsíčně.
          </p>
        </div>
      )}
    </div>
  );
};

// Info Card Component
const InfoCard = ({ locale, cvId }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 mb-2">Další možnosti</h4>
          <p className="text-blue-800 text-sm leading-relaxed mb-4">
            Váš životopis můžete kdykoli upravit v editoru nebo si stáhnout nové verze.
          </p>
          <div className="space-y-2">
            <a 
              href={`/${locale}/ucet/edit/${cvId}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <Settings className="w-4 h-4" />
              Upravit životopis
            </a>
            <br />
            <a 
              href={`/${locale}/ucet`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <FileText className="w-4 h-4" />
              Zobrazit všechny CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading State Component
const LoadingState = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <AnimatedBackground />
      <div className="text-center relative z-10">
        <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Ověřuje se platba...</h1>
        <p className="text-gray-600">Moment prosím, zpracováváme vaši požadavek</p>
      </div>
    </div>
  );
};

// Error State Component
const ErrorState = ({ message, onBack }) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <AnimatedBackground />
      <div className="text-center max-w-md relative z-10">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Chyba při načítání</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        <button
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Zkusit znovu
        </button>
      </div>
    </div>
  );
};

// Main Download Page Component with Real MongoDB Integration
export default function DownloadPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [cvData, setCvData] = useState(null);
  const [qualityScore, setQualityScore] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [error, setError] = useState(null);
  
  // Get parameters from URL
  const locale = params?.locale || 'sk';
  const sessionId = searchParams.get('session_id');
  const cvId = searchParams.get('cvId') || params?.cvId;

  console.log('Download page params:', { locale, sessionId, cvId });

  useEffect(() => {
    const loadDataAndVerifyPayment = async () => {
      if (!sessionId) {
        setError('Chybí ID platební relace');
        setIsInitialLoading(false);
        return;
      }

      try {
        setIsInitialLoading(true);
        console.log('Verifying payment session:', sessionId);

        // Verify payment session first
        const sessionResult = await apiHelper.verifyPaymentSession(sessionId);
        console.log('Session verification result:', sessionResult);

        if (!sessionResult.paid) {
          setError('Platba nebyla dokončena nebo ověřena');
          setIsInitialLoading(false);
          return;
        }

        setSessionData(sessionResult.session);
        setPaymentData(sessionResult.payment);
        setPaymentVerified(true);

        // Get CV ID from session metadata if not in URL
        const finalCvId = cvId || sessionResult.session?.metadata?.cvId;
        
        if (!finalCvId) {
          setError('CV ID není dostupné');
          setIsInitialLoading(false);
          return;
        }

        console.log('Loading CV data for paid download:', finalCvId);

        // Load CV data
        const cvData = await apiHelper.getCVById(finalCvId);
        
        if (!cvData) {
          setError('CV nebylo nalezeno');
          setIsInitialLoading(false);
          return;
        }

        console.log('Loaded CV data for paid download:', cvData);
        
        setCvData(cvData);
        const score = calculateQualityScore(cvData.content || {});
        setQualityScore(score);
        
        console.log('Payment verified and CV data loaded successfully');
      } catch (error) {
        console.error('Error loading data or verifying payment:', error);
        setError('Nepodařilo se ověřit platbu nebo načíst data: ' + error.message);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadDataAndVerifyPayment();
  }, [sessionId, cvId]);

  const handleDownload = async () => {
    if (!cvData || !sessionId) {
      alert('Data nejsou dostupná pro stažení');
      return;
    }
    
    setDownloadLoading(true);
    
    try {
      console.log('Generating premium PDF for CV:', cvData._id);
      
      // Generate premium PDF (no watermarks)
      const pdfBlob = await apiHelper.generatePremiumPDF(cvData._id, sessionId);
      
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      
      const fileName = cvData.content?.firstName && cvData.content?.lastName 
        ? `${cvData.content.firstName}_${cvData.content.lastName}_CV_Premium.pdf`
        : `${cvData.name || 'CV'}_Premium.pdf`;
      
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      console.log('Premium PDF download completed');
    } catch (error) {
      console.error('Error downloading premium PDF:', error);
      alert('Nepodařilo se stáhnout PDF. Zkuste to prosím znovu.');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleGoBack = () => {
    if (cvData?._id) {
      window.location.href = `/${locale}/ucet/edit/${cvData._id}`;
    } else {
      window.location.href = `/${locale}/ucet`;
    }
  };

  if (isInitialLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onBack={handleGoBack} />;
  }

  if (!paymentVerified) {
    return <ErrorState message="Platba nebyla ověřena" onBack={handleGoBack} />;
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
              <h1 className="text-xl font-bold text-gray-900">Premium stažení</h1>
            </div>
          </div>
        </header>

        {/* Progress Indicator */}
        <ProgressIndicator />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
          <SuccessAnimation cvData={cvData} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Download & Features */}
            <div className="lg:col-span-2 space-y-8">
              <DownloadButton
                cvData={cvData}
                qualityScore={qualityScore}
                loading={downloadLoading}
                onDownload={handleDownload}
              />

              <FeaturesGrid />

              <InfoCard locale={locale} cvId={cvData?._id} />
            </div>

            {/* Right Column - Payment Summary */}
            <div className="lg:col-span-1">
              <PaymentSummary 
                sessionData={sessionData} 
                paymentData={paymentData} 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}