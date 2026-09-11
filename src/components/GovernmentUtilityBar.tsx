import React, { useState } from 'react';
import { PortalRole } from '../types';

export interface GovernmentUtilityBarProps {
  role?: PortalRole;
  currentRole?: PortalRole;
  onRoleChange?: (role: PortalRole) => void;
  onOpenSSO?: () => void;
  fontSizeMultiplier?: number;
  setFontSizeMultiplier?: React.Dispatch<React.SetStateAction<number>>;
  onAdjustFontSize?: (delta: number) => void;
  language?: 'en' | 'hi';
  setLanguage?: React.Dispatch<React.SetStateAction<'en' | 'hi'>> | ((lang: 'en' | 'hi') => void);
  onToggleLanguage?: () => void;
  highContrast?: boolean;
  setHighContrast?: React.Dispatch<React.SetStateAction<boolean>> | ((val: boolean) => void);
  onToggleContrast?: () => void;
  onOpenScreenReader?: () => void;
}

export const GovernmentUtilityBar: React.FC<GovernmentUtilityBarProps> = ({
  onAdjustFontSize,
  setFontSizeMultiplier,
  language = 'en',
  setLanguage,
  onToggleLanguage,
  onOpenScreenReader
}) => {
  const [internalLang, setInternalLang] = useState<'en' | 'hi'>(language);
  const [showScreenReaderModal, setShowScreenReaderModal] = useState(false);
  const [activeFontLevel, setActiveFontLevel] = useState<'sm' | 'md' | 'lg'>('md');

  const currentLang = language || internalLang;

  const handleFontChange = (level: 'sm' | 'md' | 'lg') => {
    setActiveFontLevel(level);
    if (onAdjustFontSize) {
      if (level === 'sm') onAdjustFontSize(-1);
      else if (level === 'md') onAdjustFontSize(0);
      else if (level === 'lg') onAdjustFontSize(1);
    } else if (setFontSizeMultiplier) {
      if (level === 'sm') setFontSizeMultiplier(0.9);
      else if (level === 'md') setFontSizeMultiplier(1.0);
      else if (level === 'lg') setFontSizeMultiplier(1.1);
    }
  };

  const handleLanguageToggle = () => {
    if (onToggleLanguage) {
      onToggleLanguage();
    } else {
      const nextLang = currentLang === 'en' ? 'hi' : 'en';
      setInternalLang(nextLang);
      if (setLanguage) {
        setLanguage(nextLang);
      }
    }
  };

  const handleScreenReaderClick = () => {
    if (onOpenScreenReader) {
      onOpenScreenReader();
    } else {
      setShowScreenReaderModal(true);
    }
  };

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `National Land Records Modernization Portal, ADHIKAR, Government of India, Ministry of Rural Development. Screen reader access mode active.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      <header
        id="top-government-header"
        className="w-full bg-[#0f172a] text-slate-200 text-xs py-1.5 select-none z-50 border-b border-slate-800/80"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* ------------------------------------------------------------- */}
          {/* Left Alignment (Branding Cluster)                            */}
          {/* ------------------------------------------------------------- */}
          <div className="flex items-center gap-2.5">
          {/* Tricolor Indicator: 3 small CSS circles (saffron, white, green) */}
          <div className="inline-flex items-center gap-1 shrink-0" aria-hidden="true">
            <span 
              className="w-2 h-2 rounded-full inline-block bg-[#ff7722] shadow-[0_0_2px_rgba(255,119,34,0.6)]" 
              title="National Saffron"
            />
            <span 
              className="w-2 h-2 rounded-full inline-block bg-[#ffffff] shadow-[0_0_2px_rgba(255,255,255,0.6)]" 
              title="National White"
            />
            <span 
              className="w-2 h-2 rounded-full inline-block bg-[#138808] shadow-[0_0_2px_rgba(19,136,8,0.6)]" 
              title="National Green"
            />
          </div>

          {/* Title Text matching reference */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-200 whitespace-nowrap">
            <span className="font-bold tracking-wider uppercase text-slate-100">
              GOVERNMENT OF INDIA
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 hidden md:inline">
              Ministry of Rural Development
            </span>
            <span className="text-slate-500 hidden md:inline">|</span>
            <span className="text-slate-300 hidden sm:inline">
              Department of Land Resources (DoLR)
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Right Alignment (Accessibility & Language Cluster)           */}
        {/* ------------------------------------------------------------- */}
        <div className="flex items-center gap-4 text-slate-300 text-[11px] sm:text-xs">
          {/* Font Size Controls: A- | A | A+ inside subtly bordered pill */}
          <div 
            className="border border-slate-600 rounded bg-slate-800/50 px-2 py-0.5 flex items-center gap-1 select-none"
            role="group"
            aria-label="Text Size Controls"
          >
            <button
              type="button"
              onClick={() => handleFontChange('sm')}
              className={`hover:text-white cursor-pointer transition-colors px-0.5 font-semibold ${
                activeFontLevel === 'sm' ? 'text-white underline font-bold' : 'text-slate-300'
              }`}
              title="Decrease Font Size"
            >
              A-
            </button>
            <span className="text-slate-500 text-[10px] select-none">|</span>
            <button
              type="button"
              onClick={() => handleFontChange('md')}
              className={`hover:text-white cursor-pointer transition-colors px-0.5 font-semibold ${
                activeFontLevel === 'md' ? 'text-white underline font-bold' : 'text-slate-300'
              }`}
              title="Default Font Size"
            >
              A
            </button>
            <span className="text-slate-500 text-[10px] select-none">|</span>
            <button
              type="button"
              onClick={() => handleFontChange('lg')}
              className={`hover:text-white cursor-pointer transition-colors px-0.5 font-semibold ${
                activeFontLevel === 'lg' ? 'text-white underline font-bold' : 'text-slate-300'
              }`}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* Screen Reader Access: Audio/Accessibility SVG + Text */}
          <button
            type="button"
            onClick={handleScreenReaderClick}
            className="group flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors text-slate-300 font-medium whitespace-nowrap"
            title="Screen Reader Access Information & Assistance"
          >
            <svg 
              className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-colors shrink-0" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            <span>Screen Reader Access</span>
          </button>

          {/* Faint Vertical Divider */}
          <span className="text-slate-600 select-none" aria-hidden="true">|</span>

          {/* Language Toggle: Translation SVG Icon + "English / हिन्दी" */}
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="group flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors text-slate-300 font-medium whitespace-nowrap"
            title="Toggle Portal Language (English / हिन्दी)"
          >
            <svg 
              className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-colors shrink-0" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m5 8 6 6" />
              <path d="m4 14 6-6 2-3" />
              <path d="M2 5h12" />
              <path d="M7 2h1" />
              <path d="m22 22-5-10-5 10" />
              <path d="M14 18h6" />
            </svg>
            <span>English / हिन्दी</span>
          </button>
        </div>
        </div>
      </header>

      {/* Accessible Screen Reader Information Modal */}
      {showScreenReaderModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="screen-reader-title"
        >
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-slate-800 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-bold">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </div>
                <h3 id="screen-reader-title" className="font-bold text-base text-[#0f172a]">
                  Screen Reader Access
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowScreenReaderModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-600">
              <p>
                The <strong>ADHIKAR Portal</strong> conforms to <strong>W3C Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> standards and GIGW (Guidelines for Indian Government Websites).
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                <p className="font-semibold text-slate-800">Supported Assistive Technologies:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>NVDA (NonVisual Desktop Access) - Free & Open Source</li>
                  <li>JAWS (Job Access With Speech)</li>
                  <li>VoiceOver (macOS / iOS)</li>
                  <li>TalkBack (Android)</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="font-semibold text-[#1E3A8A] mb-1">Text-to-Speech Engine:</p>
                <p className="text-slate-600 mb-2">You can listen to audio assistance for verification codes and page announcements.</p>
                <button
                  type="button"
                  onClick={handleReadAloud}
                  className="bg-[#1E3A8A] hover:bg-[#152e75] text-white text-xs font-bold px-3 py-1.5 rounded shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  <span>Play Portal Introduction Audio</span>
                </button>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowScreenReaderModal(false)}
                className="bg-slate-900 text-white hover:bg-slate-800 font-semibold px-4 py-2 rounded-lg text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
