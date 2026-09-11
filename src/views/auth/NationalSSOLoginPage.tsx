import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Landmark, 
  RotateCw, 
  Volume2, 
  Eye, 
  EyeOff, 
  HelpCircle, 
  CheckCircle2, 
  Globe, 
  Calendar, 
  Phone, 
  Mail, 
  FileText,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  Home,
  ShieldAlert,
  Smartphone
} from 'lucide-react';
import { OFFICIAL_ASSETS } from '../../data/mockData';
import { PortalRole } from '../../types';
import { GovernmentUtilityBar } from '../../components/GovernmentUtilityBar';

interface Props {
  onAuthenticate: (role: PortalRole) => void;
  onNavigateAbout?: () => void;
  onNavigateHelp?: () => void;
  onBackToLanding?: () => void;
  initialRole?: PortalRole;
}

type CitizenAuthMode = 'signin' | 'signup';

export const NationalSSOLoginPage: React.FC<Props> = ({
  onAuthenticate,
  onNavigateAbout,
  onNavigateHelp,
  onBackToLanding,
  initialRole = 'officer'
}) => {
  // Role & Citizen sub-mode state
  const [selectedRole, setSelectedRole] = useState<PortalRole>(initialRole);
  const [citizenMode, setCitizenMode] = useState<CitizenAuthMode>('signin');

  // Form Fields - Citizen Sign In
  const [citizenUid, setCitizenUid] = useState('');
  const [citizenPassword, setCitizenPassword] = useState('');
  const [showCitizenPassword, setShowCitizenPassword] = useState(false);

  // Form Fields - Citizen Sign Up
  const [signupName, setSignupName] = useState('');
  const [signupDob, setSignupDob] = useState('');
  const [signupContact, setSignupContact] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Form Fields - Officer Access
  const [officerEmail, setOfficerEmail] = useState('rev.inspector.mrt@up.nic.in');
  const [officerPassword, setOfficerPassword] = useState('GovPortalPass2026#');
  const [showOfficerPassword, setShowOfficerPassword] = useState(false);

  // Captcha State
  const [captchaCode, setCaptchaCode] = useState('K9X7M2');
  const [captchaInput, setCaptchaInput] = useState('');
  const captchaPool = ['K9X7M2', '4R8Z9P', 'M3X7T1', '8K2V5N', '7W9Y4B', 'P6H3Q8'];

  // Global Accessibility & UI states
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modals
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
  const [showJanParichayModal, setShowJanParichayModal] = useState(false);
  const [showScreenReaderModal, setShowScreenReaderModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotUidInput, setForgotUidInput] = useState('');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleRefreshCaptcha = () => {
    const currentIndex = captchaPool.indexOf(captchaCode);
    const nextIndex = (currentIndex + 1) % captchaPool.length;
    setCaptchaCode(captchaPool[nextIndex]);
    setCaptchaInput('');
    setAuthError(null);
  };

  const handlePlayCaptchaAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const spellout = captchaCode.split('').join(' ');
      const utterance = new SpeechSynthesisUtterance(`Security captcha code is: ${spellout}`);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleOfficerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (captchaInput.trim() && captchaInput.trim().toUpperCase() !== captchaCode) {
      setAuthError('Visual captcha verification failed. Please enter the exact code shown.');
      return;
    }

    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onAuthenticate('officer');
    }, 400);
  };

  const handleCitizenSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (captchaInput.trim() && captchaInput.trim().toUpperCase() !== captchaCode) {
      setAuthError('Visual captcha verification failed. Please enter the exact code shown.');
      return;
    }

    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onAuthenticate('citizen');
    }, 400);
  };

  const handleCitizenSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!signupPassword || signupPassword.length < 6) {
      setAuthError('Password must be at least 6 characters in length.');
      return;
    }

    if (captchaInput.trim() && captchaInput.trim().toUpperCase() !== captchaCode) {
      setAuthError('Visual captcha verification failed. Please enter the exact code shown.');
      return;
    }

    // Trigger OTP Flow
    setOtpSent(true);
    setSuccessMessage(`One-Time Password (OTP) has been dispatched to ${signupContact || 'registered mobile number'}.`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setSuccessMessage('Aadhaar e-KYC registration completed successfully! Logging in...');
      setTimeout(() => {
        onAuthenticate('citizen');
      }, 500);
    }, 600);
  };

  return (
    <div 
      className={`min-h-screen flex flex-col justify-between font-sans-gov selection:bg-[#1E3A8A] selection:text-white ${
        fontSize === 'lg' ? 'text-base' : fontSize === 'sm' ? 'text-xs' : 'text-sm'
      }`}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP GOVERNMENT HEADER BAR                                   */}
      {/* ------------------------------------------------------------- */}
      <GovernmentUtilityBar
        language={language}
        onToggleLanguage={() => setLanguage(prev => prev === 'en' ? 'hi' : 'en')}
        onAdjustFontSize={(delta) => setFontSize(delta < 0 ? 'sm' : delta > 0 ? 'lg' : 'md')}
        onOpenScreenReader={() => setShowScreenReaderModal(true)}
      />

      {/* ------------------------------------------------------------- */}
      {/* 2. WHITE PORTAL HEADER BANNER                                 */}
      {/* ------------------------------------------------------------- */}
      <header 
        id="portal-header-banner"
        className="w-full bg-white border-b border-slate-200 shadow-xs py-3.5 px-4 sm:px-8 z-30 font-sans-gov"
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Round Seal Logo + Title (Clickable to go back to Landing Page) */}
          <div 
            onClick={() => onBackToLanding && onBackToLanding()}
            className={`flex items-center gap-3.5 select-none ${onBackToLanding ? 'cursor-pointer hover:opacity-95' : ''}`}
            title={onBackToLanding ? "Back to ADHIKAR Public Portal Home" : undefined}
          >
            <img 
              src={OFFICIAL_ASSETS.seal} 
              alt="ADHIKAR Official Emblem"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-full border border-slate-200 shadow-2xs"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = OFFICIAL_ASSETS.remoteSeal;
              }}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <span 
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  className="text-xl sm:text-2xl font-bold text-[#1E3A8A] tracking-tight"
                >
                  ADHIKAR (अधिकार)
                </span>
                <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-medium bg-[#0f172a] text-white rounded tracking-wide font-sans-gov">
                  National Gateway
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                Unified Land Record Digitization & Verification Gateway (DILRMP)
              </span>
            </div>
          </div>

          {/* Right: Nav Links & Official Security Badges */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {onBackToLanding && (
              <button
                type="button"
                onClick={onBackToLanding}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-[#1E3A8A] bg-blue-50 hover:bg-blue-100/90 border border-blue-200 rounded-lg transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.98] font-serif-gov"
                title="Back to ADHIKAR Public Landing Page"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1E3A8A]" />
                <span className="hidden xs:inline">Back to Landing Page</span>
                <span className="xs:hidden">Landing Page</span>
              </button>
            )}

            <nav className="hidden lg:flex items-center gap-5 mr-1">
              <button
                type="button"
                onClick={() => onNavigateAbout ? onNavigateAbout() : setShowAboutModal(true)}
                className="text-xs sm:text-sm font-medium text-slate-700 hover:text-[#1E3A8A] transition-colors cursor-pointer font-serif-gov"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => onNavigateHelp ? onNavigateHelp() : setShowHelpModal(true)}
                className="text-xs sm:text-sm font-medium text-slate-700 hover:text-[#1E3A8A] transition-colors cursor-pointer font-serif-gov"
              >
                Help & Support
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 3. LATEST NOTICES TICKER                                       */}
      {/* ------------------------------------------------------------- */}
      <div 
        id="latest-notices-bar"
        className="w-full bg-[#081226] text-white border-y border-blue-950/80 text-xs font-sans-gov flex items-center z-20 overflow-hidden"
      >
        <div className="w-full max-w-[1440px] mx-auto flex items-center">
          <div className="bg-[#0e2147] text-white font-medium px-4 py-2 font-serif-gov tracking-wide text-[11px] sm:text-xs whitespace-nowrap border-r border-blue-900/60 shrink-0">
            Latest Notices
          </div>
          <div className="overflow-hidden whitespace-nowrap px-4 py-1.5 text-[11px] sm:text-xs text-slate-200 flex-1">
            <span className="inline-block animate-pulse font-medium">
              Pilot Districts • Mandatory 2FA integration live for all Revenue Desks • Direct Aadhaar-ULPIN Seeding under DILRMP 2.0 active nationwide • Advisory on RoR Digital Signatures and automated OCR validation
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. MAIN CENTRAL AUTHENTICATION CARD & MAP BACKDROP             */}
      {/* ------------------------------------------------------------- */}
      <main className="flex-1 relative flex items-center justify-center py-12 px-4 overflow-hidden bg-[#0a162e]">
        {/* Background Image: India Map Cadastral GIS Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <img
            src={OFFICIAL_ASSETS.mapBg}
            alt="National Cadastral Map Backdrop"
            className="w-full h-full object-cover opacity-30 mix-blend-screen scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle GIS Grid Pattern */}
          <div className="gis-grid-pattern absolute inset-0 opacity-20" />
          {/* Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a162e]/70 via-transparent to-[#0a162e]/90" />

          {/* Regional Cadastral Hub Pins as seen in the reference designs */}
          <div className="absolute top-[28%] left-[26%] hidden md:flex items-center gap-1.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_#ef4444]" />
            </span>
            <span className="text-[10px] font-bold text-slate-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">Meerut Hub</span>
          </div>

          <div className="absolute top-[38%] left-[44%] hidden md:flex items-center gap-1.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_#ef4444]" />
            </span>
            <span className="text-[10px] font-bold text-slate-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">Bhopal Hub</span>
          </div>

          <div className="absolute top-[42%] left-[70%] hidden md:flex items-center gap-1.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_#ef4444]" />
            </span>
            <span className="text-[10px] font-bold text-slate-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">Kolkata Hub</span>
          </div>

          <div className="absolute top-[68%] left-[34%] hidden md:flex items-center gap-1.5">
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_#ef4444]" />
            </span>
            <span className="text-[10px] font-bold text-slate-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">Bengaluru Hub</span>
          </div>
        </div>

        {/* Central Floating White Card matching Reference Images */}
        <div 
          id="sso-auth-card"
          className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-7 sm:p-8 font-sans-gov my-4 transition-all duration-200 ease-in-out"
        >

          {/* Top Center: Official ADHIKAR Round Seal Logo */}
          <div className="flex flex-col items-center justify-center text-center">
            <img 
              src={OFFICIAL_ASSETS.seal} 
              alt="ADHIKAR Official Seal"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-full border border-slate-200 shadow-2xs mb-2 select-none"
              referrerPolicy="no-referrer"
            />

            {/* Portal Title in Times New Roman */}
            <h1 
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
              className="text-2xl sm:text-[28px] font-bold text-[#0f172a] tracking-tight"
            >
              ADHIKAR
            </h1>

            {/* Hindi Subtitle in warm saffron/amber tone */}
            <p className="text-[#b45309] font-semibold text-xs sm:text-sm mt-0.5 tracking-wide font-sans-gov">
              पारदर्शी भूमि प्रशासन, सुरक्षित अधिकार
            </p>

            {/* Secondary English Subtitle */}
            <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 font-normal">
              Unified Authentication & Access Gateway
            </p>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Primary Role Toggle: Citizen / Farmer vs Officer Access       */}
          {/* ------------------------------------------------------------- */}
          <div className="bg-[#f1f5f9] p-1 rounded-xl flex items-center gap-1 mt-5 border border-slate-200/80">
            {/* Citizen / Farmer Tab */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('citizen');
                setAuthError(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                selectedRole === 'citizen'
                  ? 'bg-white text-[#1E3A8A] font-bold shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Citizen Access</span>
            </button>

            {/* Officer Access Tab */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('officer');
                setAuthError(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                selectedRole === 'officer'
                  ? 'bg-white text-[#1E3A8A] font-bold shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Officer Access</span>
            </button>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Sub-Switcher: Sign In vs Sign Up (Visible for Citizen role)    */}
          {/* ------------------------------------------------------------- */}
          {selectedRole === 'citizen' && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setCitizenMode('signin');
                  setAuthError(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  citizenMode === 'signin'
                    ? 'bg-[#1E3A8A] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setCitizenMode('signup');
                  setAuthError(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  citizenMode === 'signup'
                    ? 'bg-[#1E3A8A] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Notice Banner for Officer Mode */}
          {selectedRole === 'officer' && (
            <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-3.5 py-2.5 text-xs text-[#1e40af] flex items-center gap-2.5 mt-4 shadow-2xs">
              <Lock className="w-4 h-4 shrink-0 text-[#2563eb]" />
              <span className="font-medium text-[11px] sm:text-[12px] leading-tight">
                Restricted to authorized revenue officials (@gov.in / @nic.in)
              </span>
            </div>
          )}

          {/* Dynamic Alert Messages */}
          {authError && (
            <div className="p-2.5 mt-3.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
              <span>{authError}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-2.5 mt-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ============================================================= */}
          {/* CASE A: OFFICER ACCESS FORM                                   */}
          {/* ============================================================= */}
          {selectedRole === 'officer' && (
            <form onSubmit={handleOfficerLogin} className="flex flex-col gap-3.5 mt-4">
              {/* Officer UID / Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans-gov">
                  Officer UID / Gov.in Email <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center border border-slate-200 rounded-lg bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#1E3A8A]/20 focus-within:border-[#1E3A8A] transition-all duration-200 shadow-2xs">
                  <span className="text-slate-400 text-sm font-semibold mr-2 select-none">@</span>
                  <input
                    type="email"
                    required
                    value={officerEmail}
                    onChange={(e) => setOfficerEmail(e.target.value)}
                    placeholder="rev.inspector.mrt@up.nic.in"
                    className="w-full text-xs sm:text-sm text-slate-800 font-sans-gov outline-none placeholder:text-slate-400 bg-transparent"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans-gov">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center border border-slate-200 rounded-lg bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#1E3A8A]/20 focus-within:border-[#1E3A8A] transition-all duration-200 shadow-2xs">
                  <KeyRound className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type={showOfficerPassword ? 'text' : 'password'}
                    required
                    value={officerPassword}
                    onChange={(e) => setOfficerPassword(e.target.value)}
                    placeholder="••••••••••••••"
                    className="w-full text-xs sm:text-sm text-slate-800 font-sans-gov outline-none placeholder:text-slate-400 bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOfficerPassword(!showOfficerPassword)}
                    className="text-slate-400 hover:text-slate-600 transition-colors ml-2 cursor-pointer"
                    title={showOfficerPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showOfficerPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Visual Verification Captcha */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans-gov">
                  Visual Verification Captcha <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center gap-2">
                  {/* Stylized Alphanumeric Captcha Box */}
                  <div 
                    className="bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 font-mono font-bold tracking-widest text-[#0f172a] text-sm select-none flex items-center justify-center relative overflow-hidden shadow-2xs min-w-[90px]"
                    style={{ letterSpacing: '0.2em' }}
                    title="Captcha Image Verification"
                  >
                    <span className="relative z-10 italic">{captchaCode}</span>
                    <div className="absolute inset-0 flex items-center pointer-events-none opacity-40">
                      <div className="w-full h-[1px] bg-slate-500 -rotate-6" />
                    </div>
                  </div>

                  {/* Refresh Button */}
                  <button
                    type="button"
                    onClick={handleRefreshCaptcha}
                    className="border border-slate-200 rounded-lg p-2.5 hover:bg-slate-50 text-slate-600 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                    title="Generate New Captcha Code"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>

                  {/* Audio Button */}
                  <button
                    type="button"
                    onClick={handlePlayCaptchaAudio}
                    className="border border-slate-200 rounded-lg p-2.5 hover:bg-slate-50 text-slate-600 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                    title="Listen to Captcha Code"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Captcha Input */}
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter captcha code *"
                    className="flex-1 min-w-[120px] border border-slate-200 rounded-lg px-2.5 py-2 text-xs uppercase placeholder:text-slate-400 font-sans-gov font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all duration-200 shadow-2xs"
                  />
                </div>
              </div>

              {/* Action Button: Authenticate & Enter */}
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-[#1E3A8A] hover:bg-[#152e75] text-white font-medium font-serif-gov py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide cursor-pointer mt-2 disabled:opacity-75"
              >
                <Lock className="w-4 h-4" />
                <span>{isAuthenticating ? 'Authenticating...' : 'Authenticate & Enter'}</span>
              </button>
            </form>
          )}

          {/* ============================================================= */}
          {/* CASE B: CITIZEN SIGN IN FORM (Matches Reference Image 2)      */}
          {/* ============================================================= */}
          {selectedRole === 'citizen' && citizenMode === 'signin' && (
            <form onSubmit={handleCitizenSignIn} className="flex flex-col gap-3.5 mt-4">
              {/* Aadhaar or UID */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans-gov">
                  Aadhaar or UID <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center border border-slate-200 rounded-lg bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#1E3A8A]/20 focus-within:border-[#1E3A8A] transition-all duration-200 shadow-2xs">
                  <input
                    type="text"
                    required
                    value={citizenUid}
                    onChange={(e) => setCitizenUid(e.target.value)}
                    placeholder="Enter 12-digit Aadhaar / UID"
                    className="w-full text-xs sm:text-sm text-slate-800 font-sans-gov outline-none placeholder:text-slate-400 bg-transparent"
                  />
                </div>
              </div>

              {/* Password with Forgot Password link on the right */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 font-sans-gov">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(true)}
                    className="text-xs text-slate-600 transition-colors duration-200 hover:text-slate-600 transition-colors duration-200 hover:text-[#1E3A8A] hover:underline underline-offset-4 underline-offset-4 font-medium cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative flex items-center border border-slate-200 rounded-lg bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#1E3A8A]/20 focus-within:border-[#1E3A8A] transition-all duration-200 shadow-2xs">
                  <input
                    type={showCitizenPassword ? 'text' : 'password'}
                    required
                    value={citizenPassword}
                    onChange={(e) => setCitizenPassword(e.target.value)}
                    placeholder="••••••••••••••"
                    className="w-full text-xs sm:text-sm text-slate-800 font-sans-gov outline-none placeholder:text-slate-400 bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCitizenPassword(!showCitizenPassword)}
                    className="text-slate-400 hover:text-slate-600 transition-colors ml-2 cursor-pointer"
                    title={showCitizenPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showCitizenPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Visual Verification Captcha */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans-gov">
                  Visual Verification Captcha <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center gap-2">
                  <div 
                    className="bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 font-mono font-bold tracking-widest text-[#0f172a] text-sm select-none flex items-center justify-center relative overflow-hidden shadow-2xs min-w-[90px]"
                    style={{ letterSpacing: '0.2em' }}
                    title="Captcha Image Verification"
                  >
                    <span className="relative z-10 italic">{captchaCode}</span>
                    <div className="absolute inset-0 flex items-center pointer-events-none opacity-40">
                      <div className="w-full h-[1px] bg-slate-500 -rotate-6" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRefreshCaptcha}
                    className="border border-slate-200 rounded-lg p-2.5 hover:bg-slate-50 text-slate-600 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                    title="Generate New Captcha Code"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handlePlayCaptchaAudio}
                    className="border border-slate-200 rounded-lg p-2.5 hover:bg-slate-50 text-slate-600 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                    title="Listen to Captcha Code"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter captcha code *"
                    className="flex-1 min-w-[120px] border border-slate-200 rounded-lg px-2.5 py-2 text-xs uppercase placeholder:text-slate-400 font-sans-gov font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all duration-200 shadow-2xs"
                  />
                </div>
              </div>

              {/* Action Button: Sign In */}
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-[#1E3A8A] hover:bg-[#152e75] text-white font-medium font-serif-gov py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide cursor-pointer mt-2 disabled:opacity-75"
              >
                <span>{isAuthenticating ? 'Signing In...' : 'Sign In'}</span>
              </button>
            </form>
          )}

          {/* ============================================================= */}
          {/* CASE C: CITIZEN SIGN UP FORM (As Requested by User)           */}
          {/* ============================================================= */}
          {selectedRole === 'citizen' && citizenMode === 'signup' && !otpSent && (
            <form onSubmit={handleCitizenSignUpSubmit} className="flex flex-col gap-3 mt-4">
              {/* Name on Aadhaar */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans-gov">
                  Name on Aadhaar <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center border border-slate-200 rounded-lg bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-[#1E3A8A]/20 focus-within:border-[#1E3A8A] transition-all duration-200 shadow-2xs">
                  <User className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Full Name as per Aadhaar card"
                    className="w-full text-xs text-slate-800 font-sans-gov outline-none placeholder:text-slate-400 bg-transparent"
                  />
                </div>
              </div>

              {/* D.O.B on Aadhaar */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans-gov">
                  D.O.B on Aadhaar <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center border border-slate-200 rounded-lg bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-[#1E3A8A]/20 focus-within:border-[#1E3A8A] transition-all duration-200 shadow-2xs">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="date"
                    required
                    value={signupDob}
                    onChange={(e) => setSignupDob(e.target.value)}
                    className="w-full text-xs text-slate-800 font-sans-gov outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Contact number on Aadhaar */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans-gov">
                  Contact number on Aadhaar <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center border border-slate-200 rounded-lg bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-[#1E3A8A]/20 focus-within:border-[#1E3A8A] transition-all duration-200 shadow-2xs">
                  <Phone className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={signupContact}
                    onChange={(e) => setSignupContact(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit registered mobile number"
                    className="w-full text-xs text-slate-800 font-sans-gov outline-none placeholder:text-slate-400 bg-transparent"
                  />
                </div>
              </div>

              {/* Email Address (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans-gov">
                  Email Address (Optional)
                </label>
                <div className="relative flex items-center border border-slate-200 rounded-lg bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-[#1E3A8A]/20 focus-within:border-[#1E3A8A] transition-all duration-200 shadow-2xs">
                  <Mail className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full text-xs text-slate-800 font-sans-gov outline-none placeholder:text-slate-400 bg-transparent"
                  />
                </div>
              </div>

              {/* Password * - Crucial requirement before Send OTP */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans-gov">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center border border-slate-200 rounded-lg bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-[#1E3A8A]/20 focus-within:border-[#1E3A8A] transition-all duration-200 shadow-2xs">
                  <Lock className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create secure 6+ character password"
                    className="w-full text-xs text-slate-800 font-sans-gov outline-none placeholder:text-slate-400 bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="text-slate-400 hover:text-slate-600 transition-colors ml-2 cursor-pointer"
                    title={showSignupPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showSignupPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Visual Verification Captcha */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans-gov">
                  Visual Verification Captcha <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center gap-2">
                  <div 
                    className="bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1.5 font-mono font-bold tracking-widest text-[#0f172a] text-xs select-none flex items-center justify-center relative overflow-hidden shadow-2xs min-w-[80px]"
                    style={{ letterSpacing: '0.2em' }}
                  >
                    <span className="relative z-10 italic">{captchaCode}</span>
                    <div className="absolute inset-0 flex items-center pointer-events-none opacity-40">
                      <div className="w-full h-[1px] bg-slate-500 -rotate-6" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRefreshCaptcha}
                    className="border border-slate-200 rounded-lg p-2 hover:bg-slate-50 text-slate-600 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3" />
                  </button>

                  <button
                    type="button"
                    onClick={handlePlayCaptchaAudio}
                    className="border border-slate-200 rounded-lg p-2 hover:bg-slate-50 text-slate-600 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>

                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Captcha code *"
                    className="flex-1 min-w-[100px] border border-slate-200 rounded-lg px-2 py-1.5 text-xs uppercase placeholder:text-slate-400 font-sans-gov font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              {/* Action Button: Send OTP */}
              <button
                type="submit"
                className="w-full bg-[#1E3A8A] hover:bg-[#152e75] text-white font-medium font-serif-gov py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide cursor-pointer mt-1"
              >
                <Smartphone className="w-4 h-4" />
                <span>Send OTP</span>
              </button>
            </form>
          )}

          {/* OTP Verification Step if Sign Up OTP has been sent */}
          {selectedRole === 'citizen' && citizenMode === 'signup' && otpSent && (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3.5 mt-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                <p className="font-bold mb-0.5">UIDAI Authentication Gateway</p>
                <p>Please enter the 6-digit verification code sent to your registered mobile <strong>+91 {signupContact.slice(0, 3)}****{signupContact.slice(-3)}</strong>.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans-gov">
                  Enter 6-Digit Verification OTP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-center text-lg tracking-widest font-mono font-bold text-[#0f172a] focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] outline-none"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Didn't receive code?</span>
                <button
                  type="button"
                  onClick={() => alert('New OTP requested via UIDAI Gateway.')}
                  className="text-slate-600 transition-colors duration-200 hover:text-[#1E3A8A] hover:underline underline-offset-4 font-semibold"
                >
                  Resend OTP
                </button>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="flex-1 bg-[#1E3A8A] hover:bg-[#152e75] text-white font-bold py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 text-xs tracking-wider"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>{isAuthenticating ? 'Verifying...' : 'Verify & Enter'}</span>
                </button>
              </div>
            </form>
          )}

          {/* ------------------------------------------------------------- */}
          {/* Card Footer Secondary Links                                   */}
          {/* ------------------------------------------------------------- */}
          <div className="flex items-center justify-between pt-4 mt-5 border-t border-slate-100 text-xs text-slate-500 font-sans-gov">
            <button
              type="button"
              onClick={() => setShowGuidelinesModal(true)}
              className="flex items-center gap-1.5 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>User Guidelines</span>
            </button>

            <button
              type="button"
              onClick={() => setShowJanParichayModal(true)}
              className="flex items-center gap-1.5 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Jan Parichay SSO</span>
            </button>
          </div>

          {/* Option to Return to Public Landing Page at Card Bottom */}
          {onBackToLanding && (
            <div className="pt-3.5 mt-3 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={onBackToLanding}
                className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#1E3A8A] text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <Home className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#1E3A8A] transition-colors" />
                <span>Return to ADHIKAR Public Landing Page</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* 5. BOTTOM OFFICIAL GOVERNMENT FOOTER                           */}
      {/* ------------------------------------------------------------- */}
      <footer 
        id="official-portal-footer"
        className="w-full bg-[#060e1e] border-t border-slate-800/80 py-6 px-4 sm:px-8 text-center font-sans-gov text-slate-400 text-xs flex flex-col gap-2 z-30"
      >
        <div className="max-w-[1440px] mx-auto w-full flex flex-col items-center gap-3">
          {/* Official Identity: ADHIKAR Logo next to Bharat Sarkar */}
          <div className="flex items-center gap-3">
            <img 
              src={OFFICIAL_ASSETS.seal} 
              alt="ADHIKAR Official Portal Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full bg-white p-0.5 border border-slate-700 shadow-md flex-shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = OFFICIAL_ASSETS.remoteSeal;
              }}
              referrerPolicy="no-referrer"
            />
            <div className="text-left flex flex-col">
              <span className="font-serif-gov text-sm font-bold text-white tracking-wide flex items-center gap-1.5 leading-none">
                <span>भारत सरकार</span>
                <span className="text-[10px] font-sans px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded font-semibold">
                  अधिकार • ADHIKAR
                </span>
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                Government of India • Digital Land Records Portal
              </span>
            </div>
          </div>

          {/* Hosting & Credits */}
          <p className="text-[12px] text-slate-300 leading-relaxed">
            Designed, Developed, and Hosted by{' '}
            <strong className="text-white font-bold">National Informatics Centre (NIC)</strong>
            {' '}for{' '}
            <strong className="text-white font-bold">Department of Land Resources (DoLR)</strong>
            , Ministry of Rural Development, Government of India.
          </p>

          {/* Policy Links Row */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-slate-400 text-[11px] sm:text-xs my-0.5">
            <button 
              type="button" 
              onClick={() => setShowGuidelinesModal(true)}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Website Policies
            </button>
            <span>|</span>
            <button 
              type="button" 
              onClick={() => setShowGuidelinesModal(true)}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <span>|</span>
            <button 
              type="button" 
              onClick={() => setShowGuidelinesModal(true)}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button 
              type="button" 
              onClick={() => setShowGuidelinesModal(true)}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Audit Compliance
            </button>
            <span>|</span>
            <span className="text-slate-300 font-medium">
              Helpdesk: 1800-11-2026
            </span>
          </div>

          {/* Copyright Row */}
          <p className="text-[11px] text-slate-500">
            © 2026 ADHIKAR Portal. All Rights Reserved. Content Owned and Maintained by Department of Land Resources, Government of India.
          </p>
        </div>
      </footer>

      {/* ------------------------------------------------------------- */}
      {/* 6. MODALS FOR FORGOT PASSWORD & SECONDARY LINKS                */}
      {/* ------------------------------------------------------------- */}
      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 text-xs font-sans-gov animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#1E3A8A]" />
                <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                  Password Recovery Gateway
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowForgotPasswordModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-base p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Enter your registered Aadhaar Number, 14-digit ULPIN, or Mobile Number. An OTP reset link will be transmitted via UIDAI Aadhaar e-KYC.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Aadhaar / Registered Mobile Number
              </label>
              <input
                type="text"
                value={forgotUidInput}
                onChange={(e) => setForgotUidInput(e.target.value)}
                placeholder="e.g. 9842 1044 4102"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
              />
            </div>
            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setSuccessMessage('Password recovery OTP sent to registered mobile number.');
                }}
                className="px-4 py-2 bg-[#1E3A8A] text-white rounded-lg font-bold text-xs hover:bg-[#152e75] cursor-pointer"
              >
                Transmit Reset Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Guidelines Modal */}
      {showGuidelinesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 text-xs font-sans-gov animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1E3A8A]" />
                <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                  National Portal User Guidelines
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowGuidelinesModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-base p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-3 text-slate-700 leading-relaxed max-h-80 overflow-y-auto">
              <p>
                <strong>1. Authorized Access:</strong> Revenue officials must utilize their state NIC email credentials (@gov.in / @nic.in) with hardware token authentication (DSC) where mandated.
              </p>
              <p>
                <strong>2. Citizen Verification:</strong> Citizens can access verified RoR Nakals, mutation tracking, and WebGIS boundary cadastre using linked Aadhaar e-KYC or Jan Parichay SSO.
              </p>
              <p>
                <strong>3. Audit Trail:</strong> In accordance with Section 65B of the Indian Evidence Act, all queries, downloads, and mutations are immutably logged with SHA-256 telemetry.
              </p>
              <p>
                <strong>4. Captcha Verification:</strong> Enter the displayed 6-character alphanumeric sequence. Use the audio assistant button if visual assistance is required.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowGuidelinesModal(false)}
              className="mt-2 w-full bg-[#1E3A8A] text-white font-bold py-2.5 rounded-lg text-xs hover:bg-[#152e75] cursor-pointer"
            >
              Close Guidelines
            </button>
          </div>
        </div>
      )}

      {/* Jan Parichay SSO Modal */}
      {showJanParichayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 text-xs font-sans-gov animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#1E3A8A]" />
                <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                  Jan Parichay (MeriPehchan) SSO
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowJanParichayModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-base p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Jan Parichay is the National Single Sign-On (NSSO) platform of the Government of India that facilitates cross-departmental secure access for citizens and government officials.
            </p>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 font-medium">
              Connected Gateway: DoLR DILRMP 2.0 Auth Node #UP-NIC-04
            </div>
            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowJanParichayModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowJanParichayModal(false);
                  onAuthenticate(selectedRole);
                }}
                className="px-4 py-2 bg-[#1E3A8A] text-white rounded-lg font-bold text-xs hover:bg-[#152e75] cursor-pointer"
              >
                Authenticate via MeriPehchan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen Reader Accessibility Modal */}
      {showScreenReaderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 text-xs font-sans-gov animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                Screen Reader Access (GIGW 3.0)
              </h3>
              <button 
                type="button"
                onClick={() => setShowScreenReaderModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-base p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              This portal conforms to the Guidelines for Indian Government Websites (GIGW 3.0) and WCAG 2.1 Level AA specifications. It supports all standard screen reading software including JAWS, NVDA, and VoiceOver.
            </p>
            <button
              type="button"
              onClick={() => setShowScreenReaderModal(false)}
              className="mt-2 w-full bg-[#1E3A8A] text-white font-bold py-2.5 rounded-lg text-xs hover:bg-[#152e75] cursor-pointer"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}

      {/* About Us Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 text-xs font-sans-gov animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                About DILRMP 2.0 & ADHIKAR Gateway
              </h3>
              <button 
                type="button"
                onClick={() => setShowAboutModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-base p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              The Digital India Land Records Modernization Programme (DILRMP) is an integrated national initiative by the Department of Land Resources (DoLR), Ministry of Rural Development, Government of India. The ADHIKAR portal delivers conclusive land titling, 14-digit Bhu-Aadhaar (ULPIN), drone-orthorectified cadastral maps, and real-time revenue registry synchronization.
            </p>
            <button
              type="button"
              onClick={() => setShowAboutModal(false)}
              className="mt-2 w-full bg-[#1E3A8A] text-white font-bold py-2.5 rounded-lg text-xs hover:bg-[#152e75] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 text-xs font-sans-gov animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                ADHIKAR National Helpdesk & Dispute Support
              </h3>
              <button 
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-base p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-2 text-slate-700">
              <p><strong>National Toll-Free Helpline:</strong> 1800-11-2026 (Mon-Sat, 09:00 - 18:00 IST)</p>
              <p><strong>Official Technical Support:</strong> support-dilrmp@nic.in</p>
              <p><strong>Grievance Redressal:</strong> Grievances can be submitted under Section 38 of the State Land Revenue Codes for boundary disputes and area corrections.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="mt-2 w-full bg-[#1E3A8A] text-white font-bold py-2.5 rounded-lg text-xs hover:bg-[#152e75] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
