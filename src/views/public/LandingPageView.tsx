import React, { useState } from 'react';
import { 
  LogIn, 
  ChevronDown, 
  FileText, 
  ScanText, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Landmark, 
  FileCheck2, 
  Map, 
  ArrowRight, 
  Volume2, 
  Globe, 
  ShieldCheck, 
  Lock, 
  ExternalLink,
  Info,
  HelpCircle,
  Menu,
  X,
  Phone,
  Mail
} from 'lucide-react';
import { NoticeTicker } from "../../components/NoticeTicker";
import { OFFICIAL_ASSETS } from '../../data/mockData';

interface Props {
  onNavigateToLogin: () => void;
  onNavigateAbout?: () => void;
  onNavigateHelp?: () => void;
}

export const LandingPageView: React.FC<Props> = ({
  onNavigateToLogin,
  onNavigateAbout,
  onNavigateHelp
}) => {
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Play Screen Reader speech
  const handleScreenReader = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = "Welcome to ADHIKAR, Digital Land Records Modernization Programme portal by Government of India. Press Enter Unified Portal or Sign In to access your land records, mutation tracking, and GIS cadastral maps.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Screen Reader speech synthesis is available in your browser.");
    }
  };

  const handleFontSize = (delta: number) => {
    if (delta === 0) {
      setFontSizeOffset(0);
    } else {
      setFontSizeOffset(prev => Math.max(-2, Math.min(4, prev + delta)));
    }
  };

  // Service cards data matching reference image
  const services = [
    {
      id: 'legacy',
      icon: ScanText,
      iconBg: 'bg-blue-50 text-[#1E3A8A] border border-blue-200/60',
      title: 'Digitize Legacy Records',
      description: 'Upload and batch-process physical registers with high-throughput AI trained on historical scripts (Kaithi, Modi, Devanagari) with automatic field extraction.',
      statusBadge: 'AI Extraction Active',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200/70',
      hasPulse: true,
      actionText: 'Begin Process'
    },
    {
      id: 'tracking',
      icon: Clock,
      iconBg: 'bg-slate-100 text-slate-700 border border-slate-200',
      title: 'Application Tracking',
      description: 'End-to-end transparent workflow for mutation requests (Dakhil-Kharij), objections filing, algorithmic notices, and immutable audit logs.',
      statusBadge: 'SLA: 15-30 Days',
      statusColor: 'text-slate-600 bg-slate-100 border-slate-200',
      hasPulse: false,
      actionText: 'Track Status'
    },
    {
      id: 'registration',
      icon: Landmark,
      iconBg: 'bg-indigo-50 text-indigo-800 border border-indigo-200/60',
      title: 'Property Registration Linkage',
      description: 'National Generic Document Registration System (NGDRS) interoperability. Instant validation of e-stamps, encumbrance certificates, and mortgage charge entries.',
      statusBadge: 'NGDRS Verified',
      statusColor: 'text-blue-800 bg-blue-50 border-blue-200',
      hasPulse: false,
      actionText: 'Verify Deed'
    },
    {
      id: 'verification',
      icon: FileCheck2,
      iconBg: 'bg-amber-50 text-amber-900 border border-amber-200/60',
      title: 'Record Verification',
      description: 'Human-in-the-loop review workbench for Revenue Inspectors and Tehsildars to audit OCR-flagged low-confidence records against source scans.',
      statusBadge: '342 In Queue',
      statusColor: 'text-amber-800 bg-amber-50 border-amber-200',
      hasPulse: false,
      actionText: 'Open Workbench'
    },
    {
      id: 'webgis',
      icon: Map,
      iconBg: 'bg-purple-50 text-purple-800 border border-purple-200/60',
      title: 'WebGIS Atlas',
      description: 'Interactive cadastral boundary navigation (Bhu-Naksha), overlaying drone-orthorectified layers with geo-coordinates and Unique Land Parcel Identification Numbers (ULPIN).',
      statusBadge: '14-Digit ULPIN',
      statusColor: 'text-purple-800 bg-purple-50 border-purple-200',
      hasPulse: false,
      actionText: 'Launch WebGIS'
    }
  ];

  return (
    <div 
      className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-[#1E3A8A] selection:text-white"
      style={{ fontSize: `${16 + fontSizeOffset}px` }}
    >
      {/* ========================================================================= */}
      {/* 1. TOP GOVERNMENT HEADER (Ultra-compact dark bar)                          */}
      {/* ========================================================================= */}
      <div className="bg-[#0f172a] text-xs py-1.5 px-4 sm:px-6 text-slate-300 border-b border-slate-800 select-none">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* Left: CSS-based tricolor dots + Ministry Title */}
          <div className="flex items-center gap-2.5">
            {/* CSS-based Tricolor dots */}
            <div className="flex items-center gap-1 shrink-0" aria-label="Indian National Flag Tricolor Accent">
              <span className="w-2 h-2 rounded-full bg-[#FF9933] inline-block shadow-2xs" />
              <span className="w-2 h-2 rounded-full bg-white inline-block shadow-2xs" />
              <span className="w-2 h-2 rounded-full bg-[#138808] inline-block shadow-2xs" />
            </div>

            <span className="font-bold tracking-wider text-[11px] sm:text-xs text-slate-200 uppercase whitespace-nowrap">
              GOVERNMENT OF INDIA - MINISTRY OF RURAL DEVELOPMENT
            </span>
          </div>

          {/* Right: Accessibility Controls & Language Selector */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
            {/* Font Resize Controls */}
            <div className="hidden sm:flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={() => handleFontSize(-1)}
                className="px-1.5 py-0.5 hover:text-white rounded border border-transparent hover:border-slate-700 transition-colors font-bold"
                title="Decrease Font Size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => handleFontSize(0)}
                className="px-1.5 py-0.5 hover:text-white rounded border border-transparent hover:border-slate-700 transition-colors font-bold"
                title="Reset Font Size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => handleFontSize(1)}
                className="px-1.5 py-0.5 hover:text-white rounded border border-transparent hover:border-slate-700 transition-colors font-bold"
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            <span className="hidden sm:inline text-slate-700">|</span>

            {/* Screen Reader Access */}
            <button
              type="button"
              onClick={handleScreenReader}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Activate Screen Reader Accessibility Audio"
            >
              <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Screen Reader</span>
            </button>

            <span className="text-slate-700">|</span>

            {/* Language Selector */}
            <button
              type="button"
              onClick={() => setLanguage(prev => prev === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 text-slate-300 hover:text-white font-medium transition-colors cursor-pointer"
              title="Switch Language (English / हिन्दी)"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{language === 'en' ? 'English' : 'हिन्दी'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN NAVBAR (White background, sticky top)                             */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          {/* Left: ADHIKAR Seal & Title */}
          <div className="flex items-center gap-3 select-none">
            <img 
              src={OFFICIAL_ASSETS.seal} 
              alt="ADHIKAR Government Seal"
              className="w-11 h-11 object-contain rounded-full border border-slate-200 shadow-xs"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = OFFICIAL_ASSETS.remoteSeal;
              }}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col text-left">
              <span 
                className="text-xl sm:text-2xl font-bold text-[#0f172a] leading-none tracking-tight"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                ADHIKAR
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-normal mt-1">
                Digital Land Records Portal • Government of India
              </span>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a 
              href="#home" 
              className="text-[#1E3A8A] font-bold border-b-2 border-[#1E3A8A] pb-1 transition-all"
            >
              Home
            </a>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#1E3A8A] transition-colors cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {servicesDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  {services.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => {
                        setServicesDropdownOpen(false);
                        onNavigateToLogin();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer hover:text-[#1E3A8A] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="font-medium">{srv.title}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigateAbout ? onNavigateAbout() : setShowAboutModal(true)}
              className="hover:text-[#1E3A8A] transition-colors cursor-pointer"
            >
              About Us
            </button>

            <button
              type="button"
              onClick={() => onNavigateHelp ? onNavigateHelp() : setShowHelpModal(true)}
              className="hover:text-[#1E3A8A] transition-colors cursor-pointer"
            >
              Help &amp; Support
            </button>
          </nav>

          {/* Right: Sign In / Sign Up CTA Outline Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="bg-white border border-[#1E3A8A] text-[#1E3A8A] transition-all duration-300 hover:bg-[#1E3A8A] hover:text-white hover:shadow-md px-3 sm:px-4 py-2 rounded-md flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold cursor-pointer shadow-2xs"
              title="Authenticate via Jan Parichay National SSO Gateway"
            >
              <LogIn className="w-4 h-4 text-[#1E3A8A]" />
              <span className="hidden xs:inline">Sign In / Sign Up</span>
              <span className="xs:hidden">Sign In</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-600 hover:text-[#0f172a] hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-md flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-[#1E3A8A] rounded-md bg-blue-50"
            >
              Home
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToLogin();
              }}
              className="text-left px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer rounded-md"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateAbout) {
                  onNavigateAbout();
                } else {
                  setShowAboutModal(true);
                }
              }}
              className="text-left px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer rounded-md"
            >
              About Us
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateHelp) {
                  onNavigateHelp();
                } else {
                  setShowHelpModal(true);
                }
              }}
              className="text-left px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer rounded-md"
            >
              Help &amp; Support
            </button>
          </div>
        )}
      </header>

      <NoticeTicker />

      {/* ========================================================================= */}
      {/* 3. HERO SECTION (Edge-to-Edge with dark navy overlay)                     */}
      {/* ========================================================================= */}
      <section 
        id="home"
        className="relative w-full bg-[#0a1526] text-white overflow-hidden py-20 sm:py-28 px-4 sm:px-6"
      >
        {/* Background Image: Composite cadastral artwork (surveyor, aerial fields, vintage books) */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat sm:bg-[position:50%_35%] pointer-events-none z-0"
          style={{ 
            backgroundImage: `url(${OFFICIAL_ASSETS.heroBg})` 
          }}
        />
        {/* Fallback image layer */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat sm:bg-[position:50%_35%] pointer-events-none opacity-90 -z-10"
          style={{ 
            backgroundImage: `url(${OFFICIAL_ASSETS.heroBg})` 
          }}
        />

        {/* Lightened Navy Overlay: Reveals background artwork clearly while preserving high text contrast */}
        <div className="absolute inset-0 bg-[#0f172a]/85 pointer-events-none z-0" />

        {/* Content Container (Relative z-10 for high contrast legibility) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
          {/* Amber Subtitle */}
          <p className="text-amber-400 font-semibold text-xs sm:text-sm md:text-base tracking-wider uppercase mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            पारदर्शी भूमि प्रशासन, सुरक्षित अधिकार
          </p>

          {/* Main Title: Large crisp white Times New Roman */}
          <h1 
            className="font-serif-gov text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            Where Land Information Converges
          </h1>

          {/* Subtitle in Arial */}
          <p 
            className="text-slate-100 text-base sm:text-lg md:text-xl font-medium mb-3 max-w-2xl leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Intelligent Land Records Digitization &amp; Validation
          </p>

          {/* Description text in Arial */}
          <p 
            className="text-slate-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Automated OCR, multilingual document parsing, and high-precision GIS parcel verification safeguarding proprietary ownership across Indian states.
          </p>

          {/* Primary CTA: Enter Unified Portal (Times New Roman for button text) */}
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-7 py-3.5 rounded-md hover:shadow-xl transition-all duration-300 ease-in-out flex items-center gap-2.5 text-sm sm:text-base font-semibold shadow-lg cursor-pointer group hover:scale-102 font-serif-gov"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            <LogIn className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
            <span>Enter Unified Portal / पोर्टल में प्रवेश करें</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. METRICS STRIP (4-Column White Background Strip)                        */}
      {/* ========================================================================= */}
      <section className="w-full bg-white border-b border-slate-200 shadow-2xs">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {/* Stat 1 */}
          <div className="flex items-center gap-3.5 pt-4 lg:pt-0 pl-0 lg:pl-4 first:pl-0">
            <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
              <FileText className="w-5 h-5 text-slate-700" />
            </div>
            <div className="flex flex-col text-left">
              <span 
                className="text-2xl font-bold text-[#0f172a] leading-none tracking-tight"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                1,42,890+
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1">
                Records Digitized
              </span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3.5 pt-4 lg:pt-0 pl-0 lg:pl-6">
            <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
              <ScanText className="w-5 h-5 text-slate-700" />
            </div>
            <div className="flex flex-col text-left">
              <span 
                className="text-2xl font-bold text-[#0f172a] leading-none tracking-tight"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                96.4%
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1">
                OCR Extraction Accuracy
              </span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3.5 pt-4 lg:pt-0 pl-0 lg:pl-6">
            <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
              <Layers className="w-5 h-5 text-slate-700" />
            </div>
            <div className="flex flex-col text-left">
              <span 
                className="text-2xl font-bold text-[#0f172a] leading-none tracking-tight"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                18 Districts
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1">
                Active Pilot (UP &amp; Bihar)
              </span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-3.5 pt-4 lg:pt-0 pl-0 lg:pl-6">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 border border-emerald-200/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex flex-col text-left">
              <span 
                className="text-2xl font-bold text-[#0f172a] leading-none tracking-tight flex items-center gap-1.5"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                342+
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1">
                Pending Field Verifications
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. ONLINE SERVICES & DIGITAL UTILITIES GRID                               */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 sm:py-16 w-full">
        {/* Section Header */}
        <div className="text-left mb-8">
          <h2 
            className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            Online Services &amp; Digital Utilities
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal mt-1.5 max-w-3xl">
            Access critical land administration services, GIS parcels, and title validation protocols.
          </p>
        </div>

        {/* 3-Column Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={onNavigateToLogin}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-[#1E3A8A] group flex flex-col justify-between"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onNavigateToLogin(); }}
              >
                <div>
                  {/* Top-Left SVG Icon in soft container */}
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105 ${service.iconBg}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Times New Roman Card Title */}
                  <h3 
                    className="text-lg font-bold text-[#0f172a] group-hover:text-[#1E3A8A] transition-colors leading-snug"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    {service.title}
                  </h3>

                  {/* Arial Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5 font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Card Footer with Divider */}
                <div className="border-t border-slate-100 pt-3.5 mt-5 flex items-center justify-between text-xs">
                  {/* Left Status Badge */}
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-medium text-[11px] border ${service.statusColor}`}>
                    {service.hasPulse && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                    {service.statusBadge}
                  </span>

                  {/* Right Action Link */}
                  <span className="font-semibold text-[#1E3A8A] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    <span>{service.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 7. GLOBAL FOOTER                                                          */}
      {/* ========================================================================= */}
      <footer className="bg-[#0f172a] text-slate-300 pt-12 pb-8 border-t border-slate-800 font-sans">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          {/* Main 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800/80">
            {/* Column 1: Brand & NIC Credit */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-3 select-none mb-3">
                <img 
                  src={OFFICIAL_ASSETS.seal} 
                  alt="Emblem"
                  className="w-10 h-10 object-contain rounded-full border border-slate-700 bg-white/5"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = OFFICIAL_ASSETS.remoteSeal;
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span 
                    className="text-xl font-bold text-white leading-none tracking-tight"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    ADHIKAR
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium mt-1">
                    Digital Land Records Modernization Programme (DILRMP)
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-2">
                Designed, developed and hosted by the National Informatics Centre (NIC), Ministry of Electronics &amp; Information Technology, for the Department of Land Resources, Government of India.
              </p>
            </div>

            {/* Column 2: Important Links */}
            <div className="flex flex-col text-left">
              <h4 
                className="text-sm font-bold text-white mb-3 uppercase tracking-wider text-slate-200"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Important Links
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <a 
                    href="https://digitalindia.gov.in" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Digital India Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-600" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://india.gov.in" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>National Portal of India</span>
                    <ExternalLink className="w-3 h-3 text-slate-600" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://rural.nic.in" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Ministry of Rural Development</span>
                    <ExternalLink className="w-3 h-3 text-slate-600" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://bhuvan.nrsc.gov.in" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Survey of India (Bhuvan Geo-Portal)</span>
                    <ExternalLink className="w-3 h-3 text-slate-600" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Support & Verification */}
            <div className="flex flex-col text-left">
              <h4 
                className="text-sm font-bold text-white mb-3 uppercase tracking-wider text-slate-200"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Support &amp; Verification
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>Toll-Free Grievance: 1800-11-2026</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Helpdesk: support-dilrmp@gov.in</span>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onNavigateToLogin}
                    className="hover:text-white transition-colors text-left"
                  >
                    Officer Training Modules
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Horizontal Links & Copyright */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            {/* Statutory Links & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-2 w-full">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-[11px] sm:text-xs">
                <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <span className="text-slate-700">|</span>
                <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
                <span className="text-slate-700">|</span>
                <a href="#accessibility" className="hover:text-white transition-colors">Accessibility Statement</a>
                <span className="text-slate-700">|</span>
                <a href="#hyperlinking" className="hover:text-white transition-colors">Hyperlinking Policy</a>
                <span className="text-slate-700">|</span>
                <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
                <span className="text-slate-700">|</span>
                <a href="#sitemap" className="hover:text-white transition-colors">Sitemap</a>
              </div>
              <p className="text-[11px] text-slate-500">
                &copy; 2024 Department of Land Resources, Ministry of Rural Development, Government of India.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 8. OPTIONAL ABOUT US & HELP MODALS                                        */}
      {/* ========================================================================= */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 
                className="text-xl font-bold text-[#0f172a]"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                About ADHIKAR Portal
              </h3>
              <button
                type="button"
                onClick={() => setShowAboutModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                <strong>ADHIKAR</strong> (Automated Document Handling, Intelligent Khasra Alignment &amp; Records) is the flagship digital transformation platform executed under the Digital India Land Records Modernization Programme (DILRMP).
              </p>
              <p>
                It bridges archaic physical cadastral registers (Kaithi, Modi, Devanagari) with modern GIS cadastral maps (Bhu-Naksha) using state-of-the-art optical character recognition, automated mutation validation, and 14-digit Unique Land Parcel Identification Numbers (ULPIN / Bhu-Aadhaar).
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAboutModal(false)}
                className="px-4 py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded hover:bg-blue-800"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 
                className="text-xl font-bold text-[#0f172a]"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Help &amp; Citizen Support
              </h3>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                Need assistance with Khasra verification, e-Khatoni copy generation, or Jan Parichay Single Sign-On credentials?
              </p>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2 text-xs">
                <p><strong>National Toll-Free Helpline:</strong> 1800-11-2026 (Mon-Sat, 9:00 AM - 6:00 PM IST)</p>
                <p><strong>Technical Desk:</strong> support-dilrmp@gov.in</p>
                <p><strong>District Tehsil Desk:</strong> Contact your local Sub-Divisional Magistrate (SDM) / Tehsildar revenue desk.</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded hover:bg-blue-800"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
