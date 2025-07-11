// Updated download page with subscription validation
'use client'
import React, { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { Download, CheckCircle, FileText, Clock, Shield, Star, ArrowLeft, Sparkles, Settings, CreditCard, Database, Server, Cpu, Globe, GitBranch, Terminal, Code, Zap, AlertCircle } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

// ... (keep all existing components: AnimatedBackground, ProgressIndicator, SuccessAnimation, etc.)

// Enhanced Download Card Component with subscription validation
const DownloadCard = ({ cvName, isPro, loading, onDownload, qualityScore, hasValidSubscription }) => {
  // Show subscription required message if trying to download pro without subscription
  if (isPro && !hasValidSubscription) {
    return (
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pro Subscription Required</h2>
          <p className="text-gray-600 text-lg">
            You need an active Pro subscription to download this CV without watermarks.
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <p className="text-orange-800 font-medium">What you get with Pro:</p>
            <ul className="text-orange-700 text-sm mt-2 space-y-1">
              <li>• No watermarks on downloads</li>
              <li>• Unlimited CV editing</li>
              <li>• Cloud storage forever</li>
              <li>• All premium templates</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.location.href = `/payment?cvId=${new URLSearchParams(window.location.search).get('cvId')}&version=pro`}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <CreditCard className="w-5 h-5" />
            Subscribe to Pro
          </button>
          
          <button
            onClick={() => window.location.href = `/downloadfree?cvId=${new URLSearchParams(window.location.search).get('cvId')}`}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
          >
            Download Free Version (with watermark)
          </button>
        </div>
      </div>
    );
  }

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

        {isPro && hasValidSubscription && (
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-200">
            <span className="text-green-600 font-medium">Subscription Status:</span>
            <span className="font-bold text-green-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Active Pro
            </span>
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

// Main Download Page Component with subscription validation
export default function DownloadPage({ params }) {
  const { user, isLoaded: userLoaded } = useUser();
  const { userId, isLoaded: authLoaded } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [cvData, setCvData] = useState(null);
  const [qualityScore, setQualityScore] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [hasValidSubscription, setHasValidSubscription] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const locale = params?.locale || 'en';
  
  // Get CV ID from multiple possible sources
  const getCvId = () => {
    const searchCvId = searchParams.get('cvId');
    if (searchCvId) return searchCvId;
    
    const paramsCvId = params?.cvId || params?.cvid || params?.id;
    if (paramsCvId) return paramsCvId;
    
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlCvId = urlParams.get('cvId') || urlParams.get('id');
      if (urlCvId) return urlCvId;
      
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

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      if (!authLoaded || !userId) {
        setSubscriptionLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/subscription/status');
        if (response.ok) {
          const data = await response.json();
          setHasValidSubscription(data.hasActiveSubscription);
          console.log('Subscription status:', data);
        } else {
          console.error('Failed to check subscription status');
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      } finally {
        setSubscriptionLoading(false);
      }
    };

    checkSubscription();
  }, [authLoaded, userId]);

  // Validate session if it's a pro download
  useEffect(() => {
    const validateSession = async () => {
      if (!sessionId || !authLoaded || !userId) return;
      
      try {
        // Validate the Stripe session
        const response = await fetch('/api/stripe/validate-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.valid) {
            setHasValidSubscription(true);
            setIsPro(true);
          }
        }
      } catch (error) {
        console.error('Error validating session:', error);
      }
    };

    validateSession();
  }, [sessionId, authLoaded, userId]);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (authLoaded && !userId) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent(window.location.href)}`);
    }
  }, [authLoaded, userId, router]);

  // Load CV data
  useEffect(() => {
    const fetchCvData = async () => {
      if (!cvId || cvId === 'new') {
        setFetchError('No CV ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setIsPro(version === 'pro' || sessionId || hasValidSubscription);
        
        const response = await fetch(`/api/cvs/${cvId}`);
        if (!response.ok) {
          throw new Error('Failed to load CV');
        }
        
        const cvData = await response.json();
        setCvData(cvData);
        
        // Calculate quality score
        const score = calculateQualityScore(cvData.content || {});
        setQualityScore(score);
        
      } catch (error) {
        console.error('Error loading CV:', error);
        setFetchError('Failed to load CV: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!subscriptionLoading) {
      fetchCvData();
    }
  }, [cvId, version, sessionId, hasValidSubscription, subscriptionLoading]);

  const handleDownload = async () => {
    if (!cvId || !userId) return;
    
    // If it's a pro download, validate subscription
    if (isPro && !hasValidSubscription) {
      alert('Pro subscription required for watermark-free downloads');
      return;
    }
    
    setDownloadLoading(true);
    
    try {
      const response = await fetch(`/api/cvs/${cvId}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: isPro && hasValidSubscription ? 'pro' : 'basic',
          sessionId: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

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
      router.push(`/payment?cvId=${cvId}`);
    } else {
      router.push('/ucet');
    }
  };

  // Show loading state
  if (!authLoaded || !userLoaded || loading || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <AnimatedBackground />
        <div className="text-center relative z-10">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {!authLoaded || !userLoaded ? 'Authenticating...' : 'Preparing your CV...'}
          </h1>
          <p className="text-gray-600">Please wait</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <AnimatedBackground />
        <div className="text-center max-w-md relative z-10">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Download Error</h1>
          <p className="text-gray-600 mb-8">{fetchError}</p>
          <button
            onClick={handleGoBack}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Payment
          </button>
        </div>
      </div>
    );
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
            </div>
            
            <div className="flex items-center gap-4">
              {hasValidSubscription && (
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wide flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 fill-current" />
                  PRO ACTIVE
                </span>
              )}
              {user && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.firstName?.[0] || user.emailAddresses[0]?.emailAddress[0] || 'U'}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {user.firstName || 'User'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <ProgressIndicator />
        <SuccessAnimation isPro={isPro && hasValidSubscription} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - CV Preview & Tech Specs */}
          <div className="xl:col-span-2 space-y-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Production Output Preview
              </h2>
              <p className="text-lg text-gray-600">
                {isPro && hasValidSubscription
                  ? 'Your premium CV with unlimited cloud access and no watermarks'
                  : isPro && !hasValidSubscription
                  ? 'Pro subscription required for watermark-free downloads'
                  : 'Your professional CV ready for immediate download'
                }
              </p>
            </div>

            <CvPreview 
              cvData={cvData} 
              isPro={isPro && hasValidSubscription}
              qualityScore={qualityScore}
            />

            <TechSpecs isPro={isPro && hasValidSubscription} />
          </div>

          {/* Right Column - Download */}
          <div className="xl:col-span-1">
            <DownloadCard
              cvName={cvName}
              isPro={isPro}
              loading={downloadLoading}
              onDownload={handleDownload}
              qualityScore={qualityScore}
              hasValidSubscription={hasValidSubscription}
            />

            {/* Subscription Status Info */}
            {isPro && hasValidSubscription && (
              <div className="mt-8 bg-green-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-bold text-green-900">Pro Subscription Active</p>
                    <p className="text-sm text-green-700 mt-1">
                      You have unlimited access to watermark-free downloads and all premium features.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className={`mt-8 ${isPro && hasValidSubscription ? 'bg-purple-50' : 'bg-blue-50'} rounded-2xl p-6 border ${isPro && hasValidSubscription ? 'border-purple-200' : 'border-blue-200'}`}>
              <div className="flex items-start gap-3">
                {isPro && hasValidSubscription ? (
                  <Sparkles className="w-5 h-5 text-purple-500 mt-0.5" />
                ) : (
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                )}
                <div>
                  <p className={`font-bold ${isPro && hasValidSubscription ? 'text-purple-900' : 'text-blue-900'}`}>
                    {isPro && hasValidSubscription ? 'Pro Features Active' : 'Download Information'}
                  </p>
                  <p className={`text-sm mt-1 ${isPro && hasValidSubscription ? 'text-purple-700' : 'text-blue-700'}`}>
                    {isPro && hasValidSubscription
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

// Helper function to calculate quality score (same as original)
const calculateQualityScore = (content) => {
  let score = 0;
  
  if (content.firstName && content.lastName) score += 8;
  if (content.email) score += 8;
  if (content.phone) score += 8;
  if (content.photo) score += 6;
  
  if (content.street && content.city) score += 5;
  if (content.zip) score += 3;
  if (content.region) score += 2;
  
  if (content.workExperience?.length > 0) {
    score += 15;
    const detailedWork = content.workExperience.filter(job => 
      job.company && job.position && job.description && job.description.length > 50
    );
    score += Math.min(detailedWork.length * 5, 15);
  }
  
  if (content.education?.length > 0) {
    score += 10;
    const detailedEducation = content.education.filter(edu => 
      edu.school && edu.degree && edu.field
    );
    score += Math.min(detailedEducation.length * 3, 10);
  }
  
  if (content.languages?.length > 0) score += 5;
  if (content.otherExperience && content.otherExperience.length > 100) score += 8;
  if (content.driverLicense?.length > 0) score += 2;
  if (content.website) score += 3;
  if (content.titulBefore || content.titulAfter) score += 2;
  
  return Math.min(Math.round(score), 100);
};

// Helper function to generate CV title (same as original)
const generateCVTitle = (content) => {
  let title = '';
  
  if (content.firstName && content.lastName) {
    title = `${content.firstName} ${content.lastName}`;
  }
  
  if (content.workExperience?.length > 0) {
    const latestJob = content.workExperience[0];
    if (latestJob.position) {
      title += title ? ` - ${latestJob.position}` : latestJob.position;
    }
  }
  
  if (!title && content.firstName) {
    title = `${content.firstName} CV`;
  } else if (!title) {
    title = 'Professional CV';
  }
  
  return title;
};