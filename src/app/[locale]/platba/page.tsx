'use client'
import React, { useEffect, useState } from 'react';
import { Download, Shield, CheckCircle, Clock, FileText, CreditCard, ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// Mock CV Preview Component
const CvPreview = ({ cvData, photoPreview }) => {
  if (!cvData) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="text-gray-500 text-sm mt-4">Načítání náhledu...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{cvData.name || 'Bez názvu'}</h3>
          <p className="text-sm text-gray-500">PDF formát • A4</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Vytvořeno:</span>
          <span>Dnes</span>
        </div>
        <div className="flex justify-between">
          <span>Velikost:</span>
          <span>~2.1 MB</span>
        </div>
        <div className="flex justify-between">
          <span>Kvalita:</span>
          <span className="text-green-600 font-medium">Profesionální</span>
        </div>
      </div>
    </div>
  );
};

// Trust Badges Component
const TrustBadges = () => {
  const badges = [
    { icon: Shield, text: 'Bezpečná platba', color: 'text-green-600' },
    { icon: Download, text: 'Okamžité stažení', color: 'text-blue-600' },
    { icon: CheckCircle, text: 'Záruka kvality', color: 'text-purple-600' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <badge.icon className={`w-5 h-5 ${badge.color}`} />
          <span className="text-sm font-medium text-gray-700">{badge.text}</span>
        </div>
      ))}
    </div>
  );
};

// Payment Summary Component
const PaymentSummary = ({ cvName, onPayment, loading }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Souhrn objednávky</h2>
        <span className="text-sm text-gray-500">Jednorázová platba</span>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Životopis:</span>
          <span className="font-medium text-gray-900 max-w-48 truncate">{cvName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Formát:</span>
          <span className="font-medium text-gray-900">PDF (A4)</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Celkem:</span>
            <span className="text-2xl font-bold text-gray-900">49 Kč</span>
          </div>
        </div>
      </div>

      <button
        onClick={onPayment}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Přesměrování...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Zaplatit 49 Kč
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Bezpečně zpracováno přes Stripe
      </p>
    </div>
  );
};

// Progress Indicator Component
const ProgressIndicator = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
          1
        </div>
        <span className="text-sm font-medium text-green-600">Vytvoření</span>
        <div className="w-8 h-1 bg-green-500 mx-2"></div>
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
          2
        </div>
        <span className="text-sm font-medium text-blue-600">Platba</span>
        <div className="w-8 h-1 bg-gray-200 mx-2"></div>
        <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-semibold">
          3
        </div>
        <span className="text-sm text-gray-400">Stažení</span>
      </div>
    </div>
  );
};

// Error State Component
const ErrorState = ({ message, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Chyba</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Zpět na přehled
        </button>
      </div>
    </div>
  );
};

// What You Get Section Component
const WhatYouGet = () => {
  const benefits = [
    'Profesionálně formátovaný PDF',
    'Optimalizováno pro tisk i online použití',
    'Bez vodoznaku',
    'Okamžité stažení po platbě'
  ];

  return (
    <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">Co získáte</h3>
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Payment Page Component
export default function PaymentPage({ params }) {
  const [loading, setLoading] = useState(false);
  const [cvName, setCvName] = useState(null);
  const [cvData, setCvData] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const searchParams = useSearchParams();
  
  // Get locale and cvId from URL
  const locale = params.locale;
  const cvId = searchParams.get('cvId') || '12345'; // fallback for demo

  useEffect(() => {
    if (!cvId) return;

    const fetchCvData = async () => {
      try {
        // Mock API call for demo - replace with your actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = {
          id: cvId,
          name: 'Marketingový specialista',
          cvName: 'Marketingový specialista',
          photo: null,
          createdAt: new Date().toISOString()
        };

        setCvData(mockData);
        setPhotoPreview(mockData.photo);
        setCvName(mockData.cvName || `Životopis č. ${cvId}`);
      } catch (error) {
        console.error('Chyba při načítání CV:', error);
        setFetchError(true);
      }
    };

    fetchCvData();
  }, [cvId]);

  const handlePayment = async () => {
    if (!cvId) return;
    
    setLoading(true);
    
    try {
      console.log('Calling Stripe API with:', { locale, cvId });
      
      // Call your Stripe checkout API
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locale,
          cvId
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Session data:', data);
      
      if (!data.id) {
        throw new Error('No session ID returned from API');
      }
      
      // Check if we have the Stripe publishable key
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      console.log('Stripe key exists:', !!publishableKey);
      
      if (!publishableKey) {
        throw new Error('Stripe publishable key not found');
      }
      
      // Redirect to Stripe Checkout
      const { loadStripe } = await import('@stripe/stripe-js');
      const stripe = await loadStripe(publishableKey);
      
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }
      
      console.log('Redirecting to checkout with session:', data.id);
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      
      if (error) {
        console.error('Stripe redirect error:', error);
        throw new Error(`Stripe error: ${error.message}`);
      }
      
    } catch (error) {
      console.error('Payment error details:', error);
      alert(`Chyba při platbě: ${error.message}. Zkontrolujte konzoli pro více detailů.`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (!cvId) {
    return (
      <ErrorState 
        message="Nebyl nalezen identifikátor životopisu"
        onBack={handleGoBack}
      />
    );
  }

  if (fetchError) {
    return (
      <ErrorState 
        message="Požadovaný životopis se nepodařilo načíst"
        onBack={handleGoBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Zpět</span>
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-lg font-semibold text-gray-900">Stažení životopisu</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <ProgressIndicator />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - CV Preview */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Náhled vašeho životopisu
              </h2>
              <p className="text-gray-600">
                Váš životopis je připraven ke stažení ve vysoké kvalitě PDF formátu
              </p>
            </div>

            <CvPreview cvData={cvData} photoPreview={photoPreview} />

            <div className="mt-6">
              <TrustBadges />
            </div>

            <WhatYouGet />
          </div>

          {/* Right Column - Payment */}
          <div className="lg:col-span-1">
            <PaymentSummary
              cvName={cvName || 'Životopis'}
              onPayment={handlePayment}
              loading={loading}
            />

            {/* Additional Info */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Rychlý tip</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Po dokončení platby obdržíte link pro stažení na váš email
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