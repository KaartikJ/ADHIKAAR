import React, { useState } from 'react';
import { CitizenView } from '../types';
import { OFFICIAL_ASSETS } from '../data/mockData';
import { Menu, X, Bell, LogOut, ChevronDown } from 'lucide-react';

interface Props {
  currentView: CitizenView;
  onNavigate: (view: CitizenView) => void;
  onLogoutClick?: () => void;
  onOpenAuth?: () => void;
}

export const CitizenHeader: React.FC<Props> = ({
  currentView,
  onNavigate,
  onLogoutClick,
  onOpenAuth
}) => {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuthOrLogout = () => {
    if (onLogoutClick) {
      onLogoutClick();
    } else if (onOpenAuth) {
      onOpenAuth();
    }
  };

  const navItems: { label: string; view?: CitizenView; isDropdown?: boolean }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Services', isDropdown: true },
    { label: 'About Us', view: 'about' },
    { label: 'Help & Support', view: 'help' }
  ];

  const serviceOptions: { title: string; subtitle: string; view: CitizenView; badge: string }[] = [
    {
      title: 'Digitize Legacy Records',
      subtitle: 'Batch OCR processing of historical Kaithi & Modi registers',
      view: 'inspection',
      badge: 'AI Ingest'
    },
    {
      title: 'Property Registration',
      subtitle: 'e-Stamp deed linkage with automated NGDRS sync',
      view: 'registration',
      badge: 'Secure Upload'
    },
    {
      title: 'Application Tracking',
      subtitle: 'End-to-end 5-stage mutation status timeline & SMS/WhatsApp alerts',
      view: 'tracking',
      badge: 'Real-time'
    },
    {
      title: 'Audit Logs',
      subtitle: 'Section 65B immutable security access & verification trail',
      view: 'audit',
      badge: 'SHA-256'
    },
    {
      title: 'WebGIS Cadastral Atlas',
      subtitle: 'Drone-orthorectified parcel polygons with live Bhu-Naksha viewer',
      view: 'webgis',
      badge: 'Spatial GIS'
    }
  ];

  return (
    <header id="citizen-header" className="sticky top-0 z-40 w-full bg-white border-b border-[#cbd5e1] shadow-xs font-sans-gov">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Seal & Title */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer select-none group font-serif-gov"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('home'); }}
        >
          <img 
            src={OFFICIAL_ASSETS.seal} 
            alt="ADHIKAR Official Government Seal"
            className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-full border border-slate-200 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-serif-gov text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight group-hover:text-[#1E3A8A] transition-colors leading-none">
              ADHIKAR
            </span>
            <span className="font-sans-gov text-[11px] sm:text-xs text-slate-500 tracking-normal mt-1">
              Digital Land Records Portal • Government of India
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            if (item.isDropdown) {
              return (
                <div 
                  key={item.label} 
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                    className={`flex items-center gap-1 py-1.5 text-sm font-medium transition-colors ${
                      ['inspection', 'registration', 'tracking', 'audit', 'webgis'].includes(currentView)
                        ? 'text-[#1E3A8A] font-semibold border-b-2 border-[#1E3A8A]'
                        : 'text-slate-700 hover:text-[#0f172a]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-0 w-80 bg-white border border-[#cbd5e1] rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                        Online Land Registry Utilities
                      </div>
                      {serviceOptions.map((opt) => (
                        <button
                          key={opt.view}
                          type="button"
                          onClick={() => {
                            onNavigate(opt.view);
                            setServicesDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 flex flex-col gap-0.5 transition-all duration-200 ease-in-out border-l-4 ${
                            currentView === opt.view ? 'bg-slate-100 text-[#1E3A8A] border-[#1E3A8A]' : 'border-transparent hover:bg-blue-50/50 hover:text-[#1E3A8A] hover:border-l-[#1E3A8A] cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#0f172a]">{opt.title}</span>
                            <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {opt.badge}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 line-clamp-1">{opt.subtitle}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isItemActive = 
              item.view === currentView || 
              (item.view === 'home' && (currentView === 'home' || currentView === 'dashboard'));

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => item.view && onNavigate(item.view)}
                className={`py-1.5 text-sm font-medium transition-colors ${
                  isItemActive
                    ? 'text-[#1E3A8A] font-semibold border-b-2 border-[#1E3A8A]'
                    : 'text-slate-700 hover:text-[#0f172a]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Profile Cluster & Notifications */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notification Button with red dot indicator */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotificationsModal(!showNotificationsModal);
                setUnreadNotifications(0);
              }}
              className="relative p-2 text-slate-600 hover:text-[#0f172a] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Notifications & Alerts"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Notifications Flyout */}
            {showNotificationsModal && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-[#cbd5e1] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in">
                <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0f172a]">Recent Alerts (DILRMP)</span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-medium">All Synced</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  <div className="p-3 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer text-xs">
                    <p className="font-bold text-[#0f172a]">Mutation Review Approved</p>
                    <p className="text-slate-500 text-[11px]">Khasra 789 verified with Tehsildar DSC token.</p>
                    <span className="text-[10px] text-slate-400">10 mins ago</span>
                  </div>
                  <div className="p-3 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer text-xs">
                    <p className="font-bold text-[#0f172a]">ULPIN Geo-Reference Seeding</p>
                    <p className="text-slate-500 text-[11px]">14-digit Bhudhar assigned: UP-MRT-2026-981240.</p>
                    <span className="text-[10px] text-slate-400">2 hours ago</span>
                  </div>
                  <div className="p-3 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer text-xs">
                    <p className="font-bold text-[#0f172a]">e-Kyc Refresh Notice</p>
                    <p className="text-slate-500 text-[11px]">Jan Parichay SSO token valid till Dec 2026.</p>
                    <span className="text-[10px] text-slate-400">1 day ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Badge: KJ Avatar + Kartik Jain / Citizen User */}
          <div 
            onClick={() => onNavigate('profile')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('profile'); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs shadow-xs font-serif-gov">
              KJ
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-[#0f172a] group-hover:text-[#1E3A8A] transition-colors">
                Kartik Jain
              </span>
              <span className="text-[11px] text-slate-500">
                Citizen User
              </span>
            </div>
          </div>

          {/* Logout / SSO Session Component with Door SVG Icon */}
          <button
            type="button"
            onClick={handleAuthOrLogout}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-red-700 transition-colors cursor-pointer ml-1 sm:ml-2 font-serif-gov"
            title="Log out or switch SSO session"
          >
            <LogOut className="w-4 h-4 text-slate-600" />
            <span>Logout</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="text-left py-2 px-3 rounded font-bold text-sm text-[#0f172a] transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer"
          >
            Home / Dashboard
          </button>
          <div className="py-1 px-3 text-[11px] font-bold text-slate-400 uppercase">Services</div>
          {serviceOptions.map((opt) => (
            <button
              key={opt.view}
              type="button"
              onClick={() => { onNavigate(opt.view); setMobileMenuOpen(false); }}
              className="text-left py-1.5 px-3 text-xs text-slate-700 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer flex items-center justify-between"
            >
              <span>{opt.title}</span>
              <span className="text-[10px] text-slate-400">{opt.badge}</span>
            </button>
          ))}
          <div className="border-t border-slate-100 my-1" />
          <button
            type="button"
            onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
            className="text-left py-2 px-3 rounded font-medium text-xs text-slate-700 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer"
          >
            About Us (DILRMP Objectives)
          </button>
          <button
            type="button"
            onClick={() => { onNavigate('help'); setMobileMenuOpen(false); }}
            className="text-left py-2 px-3 rounded font-medium text-xs text-slate-700 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer"
          >
            Help & Support (Grievance Helpdesk)
          </button>
        </div>
      )}
    </header>
  );
};
