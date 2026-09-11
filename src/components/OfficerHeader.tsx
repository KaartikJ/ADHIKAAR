import React, { useState } from 'react';
import { Search, Bell, LogOut } from 'lucide-react';
import { OFFICIAL_ASSETS } from '../data/mockData';

interface Props {
  onSearchULPIN: (ulpin: string) => void;
  onLogoutClick?: () => void;
  onOpenAuth?: () => void;
  onOpenProfile?: () => void;
  onSwitchToCitizen?: () => void;
}

export const OfficerHeader: React.FC<Props> = ({
  onSearchULPIN,
  onLogoutClick,
  onOpenAuth,
  onOpenProfile,
  onSwitchToCitizen
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleLogout = () => {
    if (onLogoutClick) {
      onLogoutClick();
    } else if (onOpenAuth) {
      onOpenAuth();
    }
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearchULPIN(searchValue.trim());
    }
  };

  return (
    <header id="officer-header" className="sticky top-0 z-40 w-full bg-white border-b border-[#cbd5e1] shadow-xs font-sans-gov">
      <div className="w-full px-6 h-18 flex items-center justify-between gap-4">
        {/* Left: Administrative Brand */}
        <div 
          onClick={onSwitchToCitizen}
          className="flex items-center gap-3 cursor-pointer select-none shrink-0"
          title="Switch to Citizen Portal or Dashboard"
        >
          <img 
            src={OFFICIAL_ASSETS.seal} 
            alt="ADHIKAR Official Government Seal"
            className="w-10 h-10 object-contain rounded-full border border-slate-200 shadow-xs"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = OFFICIAL_ASSETS.remoteSeal;
            }}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col text-left">
            <span 
              className="text-xl font-bold text-[#0f172a] font-serif-gov leading-none tracking-tight"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              ADHIKAR
            </span>
            <span className="text-[11px] text-slate-500 font-medium tracking-normal mt-0.5">
              Land Records Modernization &amp; Intelligent Digitization System
            </span>
          </div>
        </div>

        {/* Center: Wide Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by ULPIN, Khasra, Officer ID, or Event Hash..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="w-full bg-[#f8fafc] hover:bg-white focus:bg-white border border-[#cbd5e1] focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg pl-10 pr-4 py-2 text-xs text-[#0f172a] placeholder:text-slate-400 outline-none transition-all font-sans-gov"
            />
          </div>
        </div>

        {/* Right: Notification Bell, Officer Profile Cluster & Logout */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Notification Bell */}
          <button 
            type="button" 
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="System Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
          </button>

          {/* Officer Profile Cluster */}
          <div 
            onClick={onOpenProfile}
            role="button"
            tabIndex={0}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-all"
            title="Open Officer Clearance & Settings"
          >
            <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-xs">
              OS
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-[#0f172a] leading-tight">Officer Sharma</span>
              <span className="text-[10px] text-slate-500 font-medium">
                Tehsildar (Grade A)
              </span>
            </div>
          </div>

          {/* Logout Action */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
            title="Logout Session"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
