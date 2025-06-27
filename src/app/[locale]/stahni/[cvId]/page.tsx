'use client'
import React, { useEffect, useState } from 'react';
import { Download, CheckCircle, FileText, Clock, Shield, Star, ArrowLeft, Sparkles, Settings, CreditCard } from 'lucide-react';

// Animated Background Component
const AnimatedBackground = () => {   
  return (     
    <div className="inset-0 overflow-hidden pointer-events-none">       
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">         
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
const SuccessAnimation = () => {
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
        Váš životopis je připraven ke stažení
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

// Download Button Component
const DownloadButton = ({ cvId, cvName, loading, onDownload }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{cvName}</h3>
            <p className="text-gray-500">PDF formát • Bez vodoznaku • Vysoká kvalita</p>
          </div>
        </div>
        <PremiumBadge />
      </div>

      <button
        onClick={onDownload}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 disabled:to-green-500 text-white font-bold py-5 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Připravuje se...
          </>
        ) : (
          <>
            <Download className="w-6 h-6" />
            Stáhnout životopis
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        Stažení je platné po dobu 30 dnů
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
      title: 'Okamžité stažení', 
      description: 'Dostupné ihned po platbě',
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

// Payment Summary Component
const PaymentSummary = ({ sessionId }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      <h4 className="text-lg font-bold text-gray-900 mb-4">Shrnutí platby</h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Částka</span>
          <span className="font-bold text-lg text-gray-900">49 Kč</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Datum</span>
          <span className="font-medium text-gray-900">{new Date().toLocaleDateString('cs-CZ')}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">ID transakce</span>
          <span className="font-mono text-sm text-gray-700">#{sessionId?.slice(-8) || 'N/A'}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-600">Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-semibold">Zaplaceno</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Info Card Component
const InfoCard = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 mb-2">Tip pro budoucnost</h4>
          <p className="text-blue-800 text-sm leading-relaxed">
            Uložte si tento odkaz do záložek. Váš životopis si můžete stáhnout kdykoli během následujících 30 dnů bez dalších poplatků.
          </p>
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
          <FileText className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Ups! Něco se pokazilo</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        <button
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Zpět na platbu
        </button>
      </div>
    </div>
  );
};

// Main Download Page Component
export default function DownloadPage() {
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [cvData, setCvData] = useState({ name: 'Můj profesionální životopis' });
  const [paymentVerified, setPaymentVerified] = useState(true);
  const [error, setError] = useState(null);
  
  const cvId = 'demo-cv-123';
  const sessionId = 'sess_demo123456789';

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async () => {
    setDownloadLoading(true);
    
    // Simulate download process
    setTimeout(() => {
      setDownloadLoading(false);
      // In real implementation, this would trigger the actual download
      alert('CV se stahuje! 📄');
    }, 2000);
  };

  const handleGoBack = () => {
    alert('Navigace zpět na platební stránku');
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onBack={handleGoBack} />;
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
              <span className="font-medium">Zpět</span>
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-xl font-bold text-gray-900">Stažení životopisu</h1>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <ProgressIndicator />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <SuccessAnimation />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Download & Features */}
          <div className="lg:col-span-2 space-y-8">
            <DownloadButton
              cvId={cvId}
              cvName={cvData?.name || 'Váš životopis'}
              loading={downloadLoading}
              onDownload={handleDownload}
            />

            <FeaturesGrid />

            <InfoCard />
          </div>

          {/* Right Column - Payment Summary */}
          <div className="lg:col-span-1">
            <PaymentSummary sessionId={sessionId} />
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}