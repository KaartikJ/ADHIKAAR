import React, { useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';
import { PortalRole, CitizenView, OfficerView } from './types';
import { OFFICIAL_ASSETS } from './data/mockData';
import { GovernmentUtilityBar } from './components/GovernmentUtilityBar';
import { CitizenHeader } from './components/CitizenHeader';
import { OfficerHeader } from './components/OfficerHeader';
import { OfficerSidebar } from './components/OfficerSidebar';
import { GovernmentFooter } from './components/GovernmentFooter';
import { AuthModal } from './components/AuthModal';
import { NoticeTicker } from "./components/NoticeTicker";
import { CertifiedNakalModal } from './components/CertifiedNakalModal';
import { NationalSSOLoginPage } from './views/auth/NationalSSOLoginPage';
import { LandingPageView } from './views/public/LandingPageView';

// Citizen Views
import { CitizenDashboardView } from './views/citizen/CitizenDashboardView';
import { RecordInspectionView } from './views/citizen/RecordInspectionView';
import { PropertyRegistrationView } from './views/citizen/PropertyRegistrationView';
import { ApplicationTrackingView } from './views/citizen/ApplicationTrackingView';
import { AuditLogsView } from './views/citizen/AuditLogsView';
import { CitizenProfileView } from './views/citizen/CitizenProfileView';
import { WebGISAtlasView } from './views/citizen/WebGISAtlasView';
import { AboutUsView } from './views/citizen/AboutUsView';
import { HelpSupportView } from './views/citizen/HelpSupportView';

// Officer Views
import { OfficerDashboardView } from './views/officer/OfficerDashboardView';
import { OfficerQueueView } from './views/officer/OfficerQueueView';
import { OfficerAnalyticsView } from './views/officer/OfficerAnalyticsView';
import { OfficerProfileView } from './views/officer/OfficerProfileView';
import { OfficerAuditLogsView } from './views/officer/OfficerAuditLogsView';

type AppRoute = '/' | '/login' | '/portal' | '/about' | '/help';

const getInitialRoute = (): AppRoute => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path === '/login') return '/login';
    if (path === '/about') return '/about';
    if (path === '/help') return '/help';
    if (path === '/portal' || path.startsWith('/officer') || path.startsWith('/citizen')) return '/portal';
  }
  return '/';
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getInitialRoute);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<PortalRole>('officer');
  const [citizenView, setCitizenView] = useState<CitizenView>('home');
  const [officerView, setOfficerView] = useState<OfficerView>('dashboard');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNakalOpen, setIsNakalOpen] = useState(false);
  const [selectedKhasra, setSelectedKhasra] = useState<string>('789');
  const [selectedDocId, setSelectedDocId] = useState<string>('UP-MRT-2026-88192');
  const [submittedAppRef, setSubmittedAppRef] = useState<string>('ADH-UP-2026-88192');
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Sync browser URL and handle back/forward navigation
  const navigateTo = (path: AppRoute) => {
    setCurrentRoute(path);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/login') {
        setCurrentRoute('/login');
      } else if (path === '/about') {
        setCurrentRoute('/about');
      } else if (path === '/help') {
        setCurrentRoute('/help');
      } else if (path === '/portal') {
        if (isAuthenticated) {
          setCurrentRoute('/portal');
        } else {
          setCurrentRoute('/login');
        }
      } else {
        setCurrentRoute('/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated]);

  // Global Logout Action: Clears session and redirects directly to Root Landing Page ('/')
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigateTo('/');
  };

  // Toggle Portal Role
  const handleRoleChange = (newRole: PortalRole) => {
    setRole(newRole);
  };

  const handleOpenDocInWorkbench = (docId: string) => {
    setSelectedDocId(docId);
    if (role === 'officer') {
      setOfficerView('inspection');
    } else {
      setCitizenView('inspection');
    }
  };

  const handleSelectParcel = (khasra: string) => {
    setSelectedKhasra(khasra);
  };

  const handleOpenNakalModal = (khasra: string) => {
    setSelectedKhasra(khasra);
    setIsNakalOpen(true);
  };

  // 1. ROUTE: Root Public Landing Page ('/')
  if (currentRoute === '/') {
    return (
      <LandingPageView
        onNavigateToLogin={() => {
          if (isAuthenticated) {
            navigateTo('/portal');
          } else {
            navigateTo('/login');
          }
        }}
        onNavigateAbout={() => {
          navigateTo('/about');
        }}
        onNavigateHelp={() => {
          navigateTo('/help');
        }}
      />
    );
  }

  // 2. ROUTE: Public / Standalone "About Us" and "Help & Support" Pages
  if (currentRoute === '/about' || currentRoute === '/help') {
    return (
      <div 
        className={`min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 ${
          highContrast ? 'contrast-125 saturate-150' : ''
        }`}
        style={{ fontSize: `${16 + fontSizeOffset}px` }}
      >
        {/* Top Government Accessibility Utility Bar */}
        <GovernmentUtilityBar
          language={language}
          setLanguage={setLanguage}
          onToggleLanguage={() => setLanguage(prev => prev === 'en' ? 'hi' : 'en')}
          onAdjustFontSize={(delta) => {
            if (delta === 0) {
              setFontSizeOffset(0);
            } else {
              setFontSizeOffset(prev => Math.max(-2, Math.min(4, prev + delta)));
            }
          }}
        />

        {/* Header: Citizen Header if Authenticated, or Public Header if Unauthenticated */}
        {isAuthenticated ? (
          <CitizenHeader
            currentView={currentRoute === '/about' ? 'about' : 'help'}
            onNavigate={(view) => {
              if (view === 'about') {
                navigateTo('/about');
              } else if (view === 'help') {
                navigateTo('/help');
              } else {
                setCitizenView(view);
                navigateTo('/portal');
              }
            }}
            onLogoutClick={handleLogout}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        ) : (
          <header className="sticky top-0 z-40 w-full bg-white border-b border-[#cbd5e1] shadow-xs font-sans-gov">
            <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
              {/* Left Brand */}
              <div 
                onClick={() => navigateTo('/')}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
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
                    className="text-xl sm:text-2xl font-bold text-[#0f172a] leading-none tracking-tight font-serif-gov"
                  >
                    ADHIKAR
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-normal mt-1">
                    Digital Land Records Portal • Government of India
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
                <button 
                  type="button"
                  onClick={() => navigateTo('/')}
                  className="hover:text-[#1E3A8A] transition-colors cursor-pointer"
                >
                  Home
                </button>
                <button 
                  type="button"
                  onClick={() => navigateTo('/login')}
                  className="hover:text-[#1E3A8A] transition-colors cursor-pointer"
                >
                  Services
                </button>
                <button 
                  type="button"
                  onClick={() => navigateTo('/about')}
                  className={`py-1.5 transition-colors cursor-pointer ${
                    currentRoute === '/about'
                      ? 'text-[#1E3A8A] font-semibold border-b-2 border-[#1E3A8A]'
                      : 'text-slate-700 hover:text-[#0f172a]'
                  }`}
                >
                  About Us
                </button>
                <button 
                  type="button"
                  onClick={() => navigateTo('/help')}
                  className={`py-1.5 transition-colors cursor-pointer ${
                    currentRoute === '/help'
                      ? 'text-[#1E3A8A] font-semibold border-b-2 border-[#1E3A8A]'
                      : 'text-slate-700 hover:text-[#0f172a]'
                  }`}
                >
                  Help &amp; Support
                </button>
              </nav>

              {/* Right CTA */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigateTo('/login')}
                  className="bg-white border border-[#1E3A8A] text-[#1E3A8A] transition-all duration-300 hover:bg-[#1E3A8A] hover:text-white hover:shadow-md px-4 py-2 rounded-md flex items-center gap-2 text-xs sm:text-sm font-semibold cursor-pointer shadow-2xs font-serif-gov"
                  title="Authenticate via Jan Parichay National SSO Gateway"
                >
                  <LogIn className="w-4 h-4 text-[#1E3A8A]" />
                  <span>Sign In / Sign Up</span>
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 w-full">
          {currentRoute === '/about' ? (
            <AboutUsView
              onNavigate={(view) => {
                if (view === 'home') {
                  if (isAuthenticated) {
                    setCitizenView('home');
                    navigateTo('/portal');
                  } else {
                    navigateTo('/');
                  }
                } else if (view === 'help') {
                  navigateTo('/help');
                } else {
                  if (isAuthenticated) {
                    setCitizenView(view);
                    navigateTo('/portal');
                  } else {
                    navigateTo('/login');
                  }
                }
              }}
              isPublic={!isAuthenticated}
            />
          ) : (
            <HelpSupportView
              onNavigate={(view) => {
                if (view === 'home') {
                  if (isAuthenticated) {
                    setCitizenView('home');
                    navigateTo('/portal');
                  } else {
                    navigateTo('/');
                  }
                } else if (view === 'about') {
                  navigateTo('/about');
                } else {
                  if (isAuthenticated) {
                    setCitizenView(view);
                    navigateTo('/portal');
                  } else {
                    navigateTo('/login');
                  }
                }
              }}
              isPublic={!isAuthenticated}
            />
          )}

        </main>

        {/* Government Footer */}
        <GovernmentFooter />
      </div>
    );
  }

  // 3. ROUTE: Jan Parichay National SSO Login Page ('/login')
  if (currentRoute === '/login' || !isAuthenticated) {
    return (
      <NationalSSOLoginPage
        initialRole={role}
        onAuthenticate={(authenticatedRole) => {
          setRole(authenticatedRole);
          setIsAuthenticated(true);
          navigateTo('/portal');
        }}
        onBackToLanding={() => navigateTo('/')}
        onNavigateAbout={() => {
          navigateTo('/about');
        }}
        onNavigateHelp={() => {
          navigateTo('/help');
        }}
      />
    );
  }

  // 3. ROUTE: Authenticated Portal ('/portal')
  return (
    <div 
      className={`min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 ${
        highContrast ? 'contrast-125 saturate-150' : ''
      }`}
      style={{ fontSize: `${16 + fontSizeOffset}px` }}
    >
      {/* 1. Accessibility & Top Government Header */}
      <GovernmentUtilityBar
        language={language}
        setLanguage={setLanguage}
        onToggleLanguage={() => setLanguage(prev => prev === 'en' ? 'hi' : 'en')}
        onAdjustFontSize={(delta) => {
          if (delta === 0) {
            setFontSizeOffset(0);
          } else {
            setFontSizeOffset(prev => Math.max(-2, Math.min(4, prev + delta)));
          }
        }}
      />

      {/* 2. Portal Header depending on Role */}
      {role === 'citizen' ? (
        <CitizenHeader
          currentView={citizenView}
          onNavigate={(view) => setCitizenView(view)}
          onOpenAuth={handleLogout}
          onLogoutClick={handleLogout}
        />
      ) : (
        <OfficerHeader
          onOpenAuth={handleLogout}
          onLogoutClick={handleLogout}
          onOpenProfile={() => setOfficerView('profile')}
          onSwitchToCitizen={() => setRole('citizen')}
          onSearchULPIN={(_ulpin) => {
            setSelectedKhasra('789');
            setOfficerView('inspection');
          }}
        />
      )}

      {/* 3. Notice Ticker */}
      {role === "citizen" && ["dashboard", "inspection", "registration", "tracking", "webgis", "audit"].includes(citizenView) && <NoticeTicker />}
      {role === "officer" && <NoticeTicker />}

      {/* 4. Main Body Layout */}
      {role === 'citizen' ? (
        // CITIZEN LAYOUT: Top Header + Centered Container
        <main className="flex-1 w-full bg-[#f8fafc]">
          {(citizenView === 'home' || citizenView === 'dashboard') && (
            <CitizenDashboardView
              onNavigate={(view) => setCitizenView(view)}
              onSelectParcel={(khasra) => {
                setSelectedKhasra(khasra);
                setCitizenView('inspection');
              }}
              onDownloadNakal={(khasra) => handleOpenNakalModal(khasra)}
            />


          )}
          {citizenView === 'inspection' && (
            <RecordInspectionView
              selectedKhasra={selectedKhasra}
              khasraNo={selectedKhasra}
              onBack={() => setCitizenView('home')}
              onDownloadNakal={() => handleOpenNakalModal(selectedKhasra)}
              onRaiseDispute={(khasra) => {
                alert(`Boundary dispute arbitration notice filed for Khasra #${khasra}. Tehsildar Mawana notified under Section 38 of UP Revenue Code.`);
              }}
            />


          )}
          {citizenView === 'registration' && (
            <PropertyRegistrationView
              onSuccessfulSubmission={(refId) => {
                setSubmittedAppRef(refId);
                setCitizenView('tracking');
              }}
            />


          )}
          {citizenView === 'tracking' && (
            <ApplicationTrackingView
              initialRef={submittedAppRef}
              onLodgeDispute={() => {
                alert('Initiating Section 38 Cadastral Boundary Correction Dispute under UP Revenue Code 2006.');
              }}
            />


          )}
          {citizenView === 'webgis' && (
            <WebGISAtlasView
              selectedKhasra={selectedKhasra}
              onSelectParcel={(khasra) => setSelectedKhasra(khasra)}
              onExportPDF={(khasra) => handleOpenNakalModal(khasra)}
              onOpenAudit={() => setCitizenView('audit')}
            />


          )}
          {citizenView === 'audit' && (
            <AuditLogsView />


          )}
          {citizenView === 'profile' && (
            <CitizenProfileView
              onNavigate={(view) => setCitizenView(view)}
              onSelectParcel={(khasra) => setSelectedKhasra(khasra)}
            />


          )}
          {citizenView === 'about' && (
            <AboutUsView
              onNavigate={(view) => setCitizenView(view)}
            />


          )}
          {citizenView === 'help' && (
            <HelpSupportView
              onNavigate={(view) => setCitizenView(view)}
            />
          )}
        </main>
      ) : (
        // OFFICER LAYOUT: Fixed Left Sidebar + Main Workbench Area
        <div className="flex-1 flex flex-col md:flex-row w-full bg-[#f8fafc]">
          <OfficerSidebar
            currentView={officerView}
            onNavigate={(view) => setOfficerView(view)}
            onNewVerification={() => setOfficerView('queue')}
            queueCount={18}
          />

          <main className="flex-1 overflow-x-hidden">
            {officerView === 'dashboard' && (
              <OfficerDashboardView
                onNavigate={(view) => setOfficerView(view)}
                onOpenRecord={(docId) => handleOpenDocInWorkbench(docId)}
              />
  

            )}
            {officerView === 'queue' && (
              <OfficerQueueView
                onOpenRecord={(docId) => handleOpenDocInWorkbench(docId)}
                onBackToDashboard={() => setOfficerView('dashboard')}
              />
  

            )}
            {officerView === 'inspection' && (
              <RecordInspectionView
                selectedKhasra="789"
                khasraNo="789"
                onBack={() => setOfficerView('dashboard')}
                onDownloadNakal={() => handleOpenNakalModal('789')}
                onRaiseDispute={(khasra) => {
                  alert(`Tehsildar order generated for boundary inspection on Khasra #${khasra}.`);
                }}
              />
  

            )}
            {officerView === 'webgis' && (
              <WebGISAtlasView
                selectedKhasra={selectedKhasra}
                onSelectParcel={(khasra) => setSelectedKhasra(khasra)}
                onExportPDF={(khasra) => handleOpenNakalModal(khasra)}
                onOpenAudit={() => setOfficerView('analytics')}
              />
  

            )}
            {officerView === 'analytics' && (
              <OfficerAnalyticsView />
  

            )}
            {officerView === 'audit' && (
              <OfficerAuditLogsView />
  

            )}
            {officerView === 'profile' && (
              <OfficerProfileView />
  
            )}
          </main>
        </div>
      )}

      {/* 5. Standardized Official Government Footer (Citizen Mode) */}
      {role === 'citizen' && (
        <div className="mt-auto flex flex-col">
          <GovernmentFooter onSelectRole={handleRoleChange} />
        </div>
      )}

      {/* 6. Jan Parichay National SSO Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          setIsAuthOpen(false);
          alert('Jan Parichay e-KYC Session established with 256-bit token.');
        }}
      />

      {/* 7. Certified RoR Nakal Certificate Modal */}
      <CertifiedNakalModal
        isOpen={isNakalOpen}
        khasra={selectedKhasra}
        onClose={() => setIsNakalOpen(false)}
      />
    </div>
  );
}
