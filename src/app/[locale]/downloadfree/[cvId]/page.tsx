'use client'
import React, { useEffect, useState } from 'react';
import { Download, Gift, FileText, Clock, Shield, Star, ArrowLeft, Sparkles, Eye, CreditCard, CheckCircle, Heart } from 'lucide-react';

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

// CV Preview with Gentle Watermark
const CVPreview = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Náhled vašeho životopisu</h3>
      
      {/* Mock CV Content */}
      <div className="relative bg-white border-2 border-gray-200 rounded-lg p-6 min-h-[500px]">
        {/* Gentle watermark overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="transform rotate-45 text-4xl font-bold text-gray-300/50 select-none">
            DEMO VERZE
          </div>
        </div>
        
        {/* Another gentle watermark */}
        <div className="absolute top-1/3 right-1/4 transform -rotate-12 text-2xl font-medium text-blue-300/40 select-none pointer-events-none z-10">
          cvbuilder.cz
        </div>
        
        {/* Mock CV content */}
        <div className="relative z-0">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Jan Novák</h1>
            <p className="text-gray-600">Software Developer</p>
            <p className="text-sm text-gray-500">jan.novak@email.com | +420 123 456 789</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Pracovní zkušenosti</h2>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Vzdělání</h2>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Dovednosti</h2>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
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
const FreeDownloadButton = ({ loading, onDownload }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Váš životopis je připraven!</h3>
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
            Připravuje se...
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

// What You Get Grid Component
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

// Gentle Upgrade CTA Component
const GentleUpgradeCTA = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
      <div className="text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-white fill-current" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Líbí se vám náš builder?</h3>
        <p className="text-blue-100 mb-6 text-lg">
          Odstraňte vodoznaky a získejte prémiový vzhled za 49 Kč
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-2 text-blue-100">
            <CheckCircle className="w-5 h-5 text-blue-200" />
            <span>Čistý design</span>
          </div>
          <div className="flex items-center gap-2 text-blue-100">
            <CheckCircle className="w-5 h-5 text-blue-200" />
            <span>Prémiová kvalita</span>
          </div>
          <div className="flex items-center gap-2 text-blue-100">
            <CheckCircle className="w-5 h-5 text-blue-200" />
            <span>30 dní ke stažení</span>
          </div>
        </div>
        
        <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-colors text-lg shadow-lg">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            Upgradovat za 49 Kč
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
          <span className="font-bold text-lg text-green-600">0 Kč</span>
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
          <span className="text-gray-600">Platnost stažení</span>
          <span className="font-medium text-gray-900">7 dní</span>
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

// Main Free Download Page Component
export default function FreeDownloadPage() {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleDownload = async () => {
    setDownloadLoading(true);
    
    setTimeout(() => {
      setDownloadLoading(false);
      alert('Váš životopis se stahuje! 📄✨ Díky za používání našeho builderu!');
    }, 2000);
  };

  const handleGoBack = () => {
    alert('Navigace zpět');
  };

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
              />

              <CVPreview />

              <WhatYouGetGrid />

              <ThankYouCard />
            </div>

            {/* Right Column - Summary & Upgrade */}
            <div className="lg:col-span-1 space-y-6">
              <FreeSummary />
              <GentleUpgradeCTA />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}