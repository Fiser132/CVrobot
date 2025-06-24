'use client'
import React, { useEffect, useState } from 'react';
import { Download, CheckCircle, FileText, Clock, Shield, Star, ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// Success Animation Component
const SuccessAnimation = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-bounce"></div>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
        Platba úspěšná! 🎉
      </h1>
      <p className="text-gray-600 text-center">
        Váš životopis je připraven ke stažení
      </p>
    </div>
  );
};

// Download Button Component
const DownloadButton = ({ cvId, cvName, loading, onDownload }) => {
  return (
    <div className="bg-white border-2 border-green-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <FileText className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{cvName}</h3>
          <p className="text-sm text-gray-500">PDF formát • Bez vodoznaku • Vysoká kvalita</p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
        </div>
      </div>

      <button
        onClick={onDownload}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3 shadow-sm text-lg"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Připravuje se...
          </>
        ) : (
          <>
            <Download className="w-6 h-6" />
            Stáhnout životopis
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Stažení je platné po dobu 30 dnů
      </p>
    </div>
  );
};

// What You Got Section
const WhatYouGot = () => {
  const features = [
    { icon: CheckCircle, text: 'Profesionální formátování', color: 'text-green-500' },
    { icon: Shield, text: 'Bez vodoznaku', color: 'text-blue-500' },
    { icon: FileText, text: 'Optimalizováno pro tisk', color: 'text-purple-500' },
    { icon: Download, text: 'Okamžité stažení', color: 'text-orange-500' }
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">Co jste získali</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <feature.icon className={`w-5 h-5 ${feature.color}`} />
            <span className="text-gray-700">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Payment Details Component
const PaymentDetails = ({ sessionId }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-2">Detaily platby</h4>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Částka:</span>
          <span className="font-medium">49 Kč</span>
        </div>
        <div className="flex justify-between">
          <span>Datum:</span>
          <span>{new Date().toLocaleDateString('cs-CZ')}</span>
        </div>
        <div className="flex justify-between">
          <span>ID transakce:</span>
          <span className="font-mono text-xs">{sessionId?.slice(-8) || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span>Status:</span>
          <span className="text-green-600 font-medium">Zaplaceno</span>
        </div>
      </div>
    </div>
  );
};

// Loading State Component
const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Ověřuje se platba...</h1>
        <p className="text-gray-600">Moment prosím</p>
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
          Zpět na platbu
        </button>
      </div>
    </div>
  );
};

// Main Download Page Component
export default function DownloadPage({ params }) {
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [cvData, setCvData] = useState(null);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  
  const { locale, cvId } = params;
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPaymentAndLoadCV = async () => {
      if (!cvId) {
        setError('Chybí ID životopisu');
        setLoading(false);
        return;
      }

      try {
        // If we have a sessionId, verify payment
        if (sessionId) {
          console.log('Verifying payment for session:', sessionId);
          
          const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, cvId })
          });

          if (!verifyResponse.ok) {
            const errorText = await verifyResponse.text();
            console.error('Payment verification failed:', errorText);
            throw new Error('Platba nebyla ověřena');
          }

          const verifyData = await verifyResponse.json();
          console.log('Payment verification result:', verifyData);
          
          if (!verifyData.paid) {
            throw new Error('Platba nebyla dokončena');
          }

          setPaymentVerified(true);
        } else {
          // For testing without payment
          console.log('No session ID - skipping payment verification for testing');
          setPaymentVerified(true);
        }

        // Load CV data
        console.log('Loading CV data for ID:', cvId);
        const cvResponse = await fetch(`/api/cv/${cvId}`);
        
        if (!cvResponse.ok) {
          const errorText = await cvResponse.text();
          console.error('CV fetch failed:', errorText);
          throw new Error('Nepodařilo se načíst data životopisu');
        }

        const cvData = await cvResponse.json();
        console.log('CV data loaded:', cvData);
        setCvData(cvData);

      } catch (error) {
        console.error('Error details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    verifyPaymentAndLoadCV();
  }, [sessionId, cvId]);

  const handleDownload = async () => {
    if (!cvId || !paymentVerified) return;

    setDownloadLoading(true);
    
    try {
      // Generate and download the CV PDF
      const response = await fetch(`/api/generate-cv/${cvId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, removeWatermark: true })
      });

      if (!response.ok) {
        throw new Error('Nepodařilo se vygenerovat PDF');
      }

      // Download the file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cvData?.name || 'zivotopis'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download error:', error);
      alert('Došlo k chybě při stahování. Zkuste to prosím znovu.');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleGoBack = () => {
    window.location.href = `/${locale}/platba?cvId=${cvId}`;
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onBack={handleGoBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
      <main className="max-w-4xl mx-auto px-4 py-8">
        <SuccessAnimation />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Download */}
          <div className="lg:col-span-2">
            <DownloadButton
              cvId={cvId}
              cvName={cvData?.name || 'Váš životopis'}
              loading={downloadLoading}
              onDownload={handleDownload}
            />

            <div className="mt-6">
              <WhatYouGot />
            </div>

            {/* Tips */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Tip pro budoucnost</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Uložte si tento link - můžete si životopis stáhnout kdykoli během 30 dnů
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Details */}
          <div className="lg:col-span-1">
            <PaymentDetails sessionId={sessionId} />
          </div>
        </div>
      </main>
    </div>
  );
}