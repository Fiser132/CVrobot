'use client'
import React, { useEffect, useState } from 'react';
import { Download, Shield, CheckCircle, Clock, FileText, CreditCard, ArrowLeft, Star, Sparkles, Zap, Code, Database, Server, Webhook, Terminal, GitBranch, Cpu, Globe } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

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

// Enhanced Version Card Component
const VersionCard = ({ version, isSelected, onSelect }) => {
  const techFeatures = {
    basic: [
      { icon: Download, text: 'Single PDF download', tech: false },
      { icon: FileText, text: 'Watermarked output', tech: false },
      { icon: Clock, text: 'No cloud storage', tech: false },
      { icon: Shield, text: 'Basic template only', tech: false }
    ],
    pro: [
      { icon: Database, text: 'Unlimited edits & saves', tech: true },
      { icon: CheckCircle, text: 'No watermark ever', tech: true },
      { icon: Globe, text: 'Cloud storage included', tech: true },
      { icon: GitBranch, text: 'Version history tracking', tech: true },
      { icon: Server, text: 'Full API access', tech: true },
      { icon: Cpu, text: 'AI-powered optimization', tech: true },
      { icon: Terminal, text: 'Multiple export formats', tech: true }
    ]
  };

  const features = techFeatures[version.id] || [];

  return (
    <div
      onClick={() => onSelect(version)}
      className={`relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl ${
        isSelected
          ? `border-transparent ${version.id === 'pro' 
              ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl shadow-purple-500/25' 
              : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-2xl shadow-blue-500/25'}`
          : 'border-gray-200 bg-white/70 backdrop-blur-lg hover:bg-white/90'
      }`}
      style={isSelected ? {} : { backdropFilter: 'blur(10px)' }}
    >
      {version.recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
            <Zap className="w-4 h-4" />
            MOST POPULAR
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-2xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
            {version.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              version.id === 'pro' 
                ? 'bg-purple-500/20 text-purple-300' 
                : 'bg-orange-500/20 text-orange-300'
            }`}>
              {version.id === 'pro' ? 'UNLIMITED' : 'LIMITED'}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-black ${isSelected ? 'text-white' : 'text-gray-900'}`}>
              {version.priceText}
            </span>
            {version.price > 0 && (
              <span className={`text-lg ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>€</span>
            )}
          </div>
          <div className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
            {version.billing}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 group">
            <div className={`p-2 rounded-lg ${
              isSelected 
                ? 'bg-white/20' 
                : 'bg-gray-100 group-hover:bg-gray-200'
            } transition-colors`}>
              <feature.icon className={`w-4 h-4 ${
                isSelected ? 'text-white' : version.id === 'pro' ? 'text-purple-600' : 'text-blue-600'
              }`} />
            </div>
            <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-700'}`}>
              {feature.text}
            </span>
            {feature.tech && (
              <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                isSelected 
                  ? 'bg-white/20 text-white/80' 
                  : 'bg-green-100 text-green-700'
              }`}>
                DEV
              </span>
            )}
          </div>
        ))}
      </div>
      
      {version.id === 'pro' && (
        <div className={`mt-6 pt-6 border-t ${isSelected ? 'border-white/20' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2 mb-3">
            <Cpu className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-purple-600'}`} />
            <span className={`font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
              AI-Powered Features
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className={`flex items-center gap-2 ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              ATS Score: 95%
            </div>
            <div className={`flex items-center gap-2 ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              SEO Optimized
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Tech Specs Component
const TechSpecs = ({ selectedVersion }) => {
  const specs = {
    basic: {
      'CV Storage': 'No cloud saves',
      'Watermark': 'Always present',
      'Edits Allowed': 'One-time download',
      'Output Format': 'PDF only',
      'Template Access': 'Basic template',
      'Support': 'Community forum'
    },
    pro: {
      'CV Storage': 'Unlimited cloud saves',
      'Watermark': 'Completely removed',
      'Edits Allowed': 'Unlimited forever',
      'Output Format': 'PDF, DOCX, HTML, JSON',
      'Template Access': 'All premium templates',
      'Support': '24/7 Priority assistance',
      'Version History': 'Full backup system',
      'API Access': 'Complete developer API',
      'Collaboration': 'Team sharing features'
    }
  };

  const currentSpecs = selectedVersion ? specs[selectedVersion.id] : {};

  return (
    <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-lg border border-gray-200/50 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${selectedVersion?.id === 'pro' ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}>
          <Terminal className={`w-6 h-6 ${selectedVersion?.id === 'pro' ? 'text-purple-600' : 'text-blue-600'}`} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          Technical Specifications
        </h3>
      </div>
      
      <div className="space-y-4">
        {Object.entries(currentSpecs).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200/30">
            <span className="font-medium text-gray-600">{key}:</span>
            <span className="font-bold text-gray-900">{value}</span>
          </div>
        ))}
      </div>

      {selectedVersion?.id === 'pro' && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-purple-600" />
            <span className="font-bold text-sm text-gray-900">
              Developer Tools Included
            </span>
          </div>
          <div className="text-sm text-purple-600 space-y-1">
            <div>• Python SDK & CLI tools</div>
            <div>• GraphQL playground</div>
            <div>• Webhook testing environment</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced CV Preview Component
const CvPreview = ({ cvData, photoPreview, selectedVersion }) => {
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

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center gap-6 mb-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
          selectedVersion?.id === 'pro' 
            ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
            : 'bg-gradient-to-br from-blue-500 to-cyan-500'
        } shadow-lg`}>
          <FileText className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">
              {cvData.name || 'Untitled Resume'}
            </h3>
            {selectedVersion?.id === 'pro' && (
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                PRO ENHANCED
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm">
            PDF Format • A4 • {selectedVersion?.id === 'pro' ? 'Watermark-free Premium' : 'Basic with Watermark'}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Storage:</span>
            <span className="text-gray-900 font-medium text-sm">
              {selectedVersion?.id === 'pro' ? 'Cloud Saved' : 'Download Only'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Watermark:</span>
            <span className={`font-medium text-sm ${
              selectedVersion?.id === 'pro' ? 'text-green-500' : 'text-orange-500'
            }`}>
              {selectedVersion?.id === 'pro' ? 'Removed' : 'Present'}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Edits:</span>
            <span className={`font-bold text-sm ${
              selectedVersion?.id === 'pro' ? 'text-green-500' : 'text-orange-500'
            }`}>
              {selectedVersion?.id === 'pro' ? 'Unlimited' : 'One-time'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Templates:</span>
            <span className={`font-bold text-sm ${
              selectedVersion?.id === 'pro' ? 'text-purple-500' : 'text-blue-500'
            }`}>
              {selectedVersion?.id === 'pro' ? 'All Premium' : 'Basic Only'}
            </span>
          </div>
        </div>
      </div>

      {selectedVersion?.id === 'pro' && (
        <div className="border-t border-gray-200/30 pt-6">
          <h4 className="font-bold mb-4 text-gray-900">Pro Features Active</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-xs text-gray-700">No Watermark</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Database className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-xs text-gray-700">Cloud Saved</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Zap className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-xs text-gray-700">Unlimited Edits</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Payment Summary Component
const PaymentSummary = ({ cvName, selectedVersion, onPayment, loading }) => {
  if (!selectedVersion) {
    return (
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-xl">
        <div className="text-center py-12">
          <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Select a version to continue</p>
          <p className="text-gray-400 text-sm mt-2">Choose your deployment strategy</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
        <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600">
          {selectedVersion.price === 0 ? 'Free forever' : 'Monthly subscription'}
        </span>
      </div>
      
      <div className="space-y-6 mb-8">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Product:</span>
          <span className="font-bold text-gray-900 max-w-48 truncate">{cvName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">License:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">{selectedVersion.name}</span>
            {selectedVersion.id === 'pro' && (
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                ENTERPRISE
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Billing:</span>
          <span className="font-bold text-gray-900">
            {selectedVersion.price === 0 ? 'Free forever' : 'Monthly subscription'}
          </span>
        </div>
        
        {selectedVersion.id === 'basic' && (
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="font-bold text-gray-900">Basic Version Limitations:</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-gray-700">Watermark on all downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-gray-700">No cloud storage - download only</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-700">Cannot edit after download</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-gray-700">Basic template only</span>
              </div>
            </div>
          </div>
        )}
        
        {selectedVersion.id === 'pro' && (
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-gray-900">Pro Features Included:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-700">No Watermark</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-700">Unlimited Edits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-700">Cloud Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-gray-700">Premium Templates</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold text-gray-900">Total:</span>
            <div className="text-right">
              <span className="text-4xl font-black text-gray-900">
                {selectedVersion.price === 0 ? 'Free' : `${selectedVersion.price} €`}
              </span>
              {selectedVersion.price > 0 && (
                <div className="text-sm text-gray-600">per month</div>
              )}
            </div>
          </div>
          {selectedVersion.id === 'pro' && (
            <p className="text-sm text-green-500 text-right font-medium">
              Cancel anytime • No long-term commitment
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onPayment}
        disabled={loading}
        className={`w-full font-bold py-6 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-[1.02] ${
          selectedVersion.id === 'pro'
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-purple-400 disabled:to-blue-400 text-white shadow-purple-500/25'
            : selectedVersion.price === 0
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-green-400 disabled:to-emerald-400 text-white shadow-green-500/25'
            : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-blue-400 disabled:to-cyan-400 text-white shadow-blue-500/25'
        }`}
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {selectedVersion.price === 0 ? 'Preparing download...' : 'Setting up subscription...'}
          </>
        ) : (
          <>
            {selectedVersion.price === 0 ? (
              <>
                <Download className="w-6 h-6" />
                Download Free Version
              </>
            ) : (
              <>
                <CreditCard className="w-6 h-6" />
                Subscribe for {selectedVersion.price}€/month
              </>
            )}
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        {selectedVersion.price === 0 
          ? 'Free download • No payment required • No registration needed'
          : 'Secured by Stripe • Cancel anytime • PCI DSS Level 1 compliant'
        }
      </p>
    </div>
  );
};

// Version Selection Component
const VersionSelector = ({ selectedVersion, onVersionChange }) => {
  const versions = [
    {
      id: 'basic',
      name: 'Basic Download',
      price: 0,
      priceText: 'Free',
      billing: 'forever',
      recommended: false
    },
    {
      id: 'pro',
      name: 'Pro Unlimited',
      price: 10,
      priceText: '10',
      billing: 'per month',
      recommended: true
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black mb-4 text-gray-900">
          Choose Your Deployment
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Download for free with watermark or subscribe for unlimited editing without watermark
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {versions.map((version) => (
          <VersionCard
            key={version.id}
            version={version}
            isSelected={selectedVersion?.id === version.id}
            onSelect={onVersionChange}
          />
        ))}
      </div>
    </div>
  );
};

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
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
            2
          </div>
          <span className="font-bold text-blue-600">Deploy</span>
        </div>
        <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center font-bold">
            3
          </div>
          <span className="text-gray-400">Download</span>
        </div>
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
  const [selectedVersion, setSelectedVersion] = useState(null);
  const searchParams = useSearchParams();
  
  // Get locale and cvId from URL
  const locale = params.locale;
  const cvId = searchParams.get('cvId') || '12345';
  const defaultVersion = searchParams.get('version') || 'basic';

  useEffect(() => {
    if (!cvId) return;

    const fetchCvData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = {
          id: cvId,
          name: 'Senior Full-Stack Developer',
          cvName: 'Senior Full-Stack Developer Resume',
          photo: null,
          createdAt: new Date().toISOString()
        };

        setCvData(mockData);
        setPhotoPreview(mockData.photo);
        setCvName(mockData.cvName || `Resume #${cvId}`);
        
        if (defaultVersion === 'pro') {
          setSelectedVersion({
            id: 'pro',
            name: 'Pro Unlimited',
            price: 10,
            priceText: '10',
            billing: 'per month',
            recommended: true
          });
        } else {
          setSelectedVersion({
            id: 'basic',
            name: 'Basic Download',
            price: 0,
            priceText: 'Free',
            billing: 'forever',
            recommended: false
          });
        }
      } catch (error) {
        console.error('Error loading CV:', error);
        setFetchError(true);
      }
    };

    fetchCvData();
  }, [cvId, defaultVersion]);

  const handleVersionChange = (version) => {
    setSelectedVersion(version);
  };

 const handlePayment = async () => {
  if (!cvId || !selectedVersion) return;
  
  setLoading(true);
  
  try {
    // If it's the free version, redirect to download page
    if (selectedVersion.price === 0) {
      window.location.href = `/${locale}/downloadfree/${cvId}`;
      return;
    }
    
    console.log('Calling payment API with:', { locale, cvId, version: selectedVersion.id });
    
    // First, try to create the checkout session
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locale,
        cvId,
        version: selectedVersion.id,
        amount: selectedVersion.price
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      
      // Fallback: redirect to a payment page with parameters
      const fallbackUrl = `/payment-fallback?cvId=${cvId}&version=${selectedVersion.id}&amount=${selectedVersion.price}&locale=${locale}`;
      window.location.href = fallbackUrl;
      return;
    }

    const data = await response.json();
    console.log('Session data received:', data);
    
    if (!data.id && !data.url) {
      throw new Error('No session ID or URL returned from API');
    }

    // If we get a direct URL, redirect to it
    if (data.url) {
      window.location.href = data.url;
      return;
    }
    
    // Otherwise, try to load Stripe
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.warn('Stripe publishable key not found, using direct redirect');
      // Fallback to direct redirect if available
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
        return;
      }
      throw new Error('Payment configuration error');
    }
    
    try {
      // Dynamic import with error handling
      const stripeModule = await import('@stripe/stripe-js').catch(err => {
        console.warn('Failed to load Stripe module:', err);
        return null;
      });
      
      if (!stripeModule || !stripeModule.loadStripe) {
        console.warn('Stripe module not available, using fallback');
        // Try direct redirect to Stripe checkout URL
        const checkoutUrl = `https://checkout.stripe.com/pay/${data.id}`;
        window.location.href = checkoutUrl;
        return;
      }

      const stripe = await stripeModule.loadStripe(publishableKey);
      
      if (!stripe) {
        console.warn('Failed to initialize Stripe, using direct redirect');
        window.location.href = data.redirect_url || `/payment-error?reason=stripe-init-failed`;
        return;
      }
      
      console.log('Redirecting to Stripe checkout...');
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      
      if (error) {
        console.error('Stripe redirect error:', error);
        throw new Error(`Stripe error: ${error.message}`);
      }
      
    } catch (stripeError) {
      console.error('Stripe integration error:', stripeError);
      // Final fallback
      const fallbackUrl = `/payment-fallback?cvId=${cvId}&version=${selectedVersion.id}&amount=${selectedVersion.price}&locale=${locale}&error=stripe-failed`;
      window.location.href = fallbackUrl;
    }
    
  } catch (error) {
    console.error('Payment error details:', error);
    
    // User-friendly error handling
    const errorMessage = error.message.includes('fetch') 
      ? 'Network error. Please check your connection and try again.'
      : error.message.includes('Stripe')
      ? 'Payment system temporarily unavailable. Please try again in a few moments.'
      : `Payment error: ${error.message}`;
      
    alert(errorMessage);
    
    // Offer alternative contact method
    if (confirm('Would you like to contact support for manual payment processing?')) {
      const supportEmail = 'support@yoursite.com';
      const subject = `Manual Payment Request - CV ${cvId}`;
      const body = `Hello,\n\nI encountered an error during checkout for:\n- Product: ${cvName}\n- Version: ${selectedVersion.name}\n- Amount: ${selectedVersion.price} Kč\n- CV ID: ${cvId}\n\nPlease assist with manual payment processing.\n\nError details: ${error.message}`;
      
      window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  } finally {
    setLoading(false);
  }
};

  const handleGoBack = () => {
    window.history.back();
  };

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">Unable to load the requested resume</p>
          <button
            onClick={handleGoBack}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50">
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
                <span className="font-medium">Back</span>
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">
                Resume Deployment
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <ProgressIndicator />
        <VersionSelector 
          selectedVersion={selectedVersion}
          onVersionChange={handleVersionChange}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - CV Preview & Tech Specs */}
          <div className="xl:col-span-2 space-y-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Production Preview
              </h2>
              <p className="text-lg text-gray-600">
                Choose your CV access level - download once or edit forever with cloud storage
              </p>
            </div>

            <CvPreview 
              cvData={cvData} 
              photoPreview={photoPreview} 
              selectedVersion={selectedVersion}
            />

            <TechSpecs selectedVersion={selectedVersion} />
          </div>

          {/* Right Column - Payment */}
          <div className="xl:col-span-1">
            <PaymentSummary
              cvName={cvName || 'Resume'}
              selectedVersion={selectedVersion}
              onPayment={handlePayment}
              loading={loading}
            />

            {/* Additional Tech Info */}
            <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-bold text-blue-900">Instant Access</p>
                  <p className="text-sm text-blue-700 mt-1">
                    {selectedVersion?.price === 0 
                      ? 'Free download starts immediately with watermark'
                      : 'Your CV is saved in the cloud forever. Edit anytime, download watermark-free versions with all premium templates and priority support'
                    }
                  </p>
                </div>
              </div>
            </div>

            {selectedVersion?.id === 'pro' && (
              <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-bold text-purple-900">Pro Monthly Benefits</p>
                    <p className="text-sm text-purple-700 mt-1">
                      Edit your CV anytime forever, no watermarks, cloud storage, all premium templates, and continuous updates. Cancel anytime.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}