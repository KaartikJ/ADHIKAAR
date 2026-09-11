import React from 'react';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  Map, 
  BarChart3, 
  ShieldCheck, 
  UserCheck, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { OfficerView } from '../types';

interface Props {
  currentView: OfficerView;
  onNavigate: (view: OfficerView) => void;
  onNewVerification?: () => void;
  queueCount?: number;
}

export const OfficerSidebar: React.FC<Props> = ({
  currentView,
  onNavigate,
  onNewVerification,
  queueCount = 19
}) => {
  const menuItems: { 
    label: string; 
    view: OfficerView; 
    icon: React.ComponentType<{ className?: string }>; 
    badge?: string;
    badgeStyle?: string;
  }[] = [
    { label: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
    { 
      label: 'Verification Queue', 
      view: 'queue', 
      icon: ClipboardCheck, 
      badge: '19', 
      badgeStyle: 'bg-amber-100 text-amber-800 border border-amber-300' 
    },
    { label: 'Records Atlas', view: 'webgis', icon: Map },
    { label: 'Analytics & Trends', view: 'analytics', icon: BarChart3 },
    { label: 'System Audit Logs', view: 'audit', icon: ShieldCheck },
    { label: 'Officer Profile', view: 'profile', icon: UserCheck }
  ];

  const handleNewVerificationClick = () => {
    if (onNewVerification) {
      onNewVerification();
    } else {
      onNavigate('queue');
    }
  };

  return (
    <aside 
      id="officer-sidebar" 
      className="w-64 shrink-0 bg-white border-r border-[#cbd5e1] min-h-[calc(100vh-4.5rem)] flex flex-col justify-between py-5 font-sans-gov"
    >
      <div className="flex flex-col gap-5 px-4">
        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleNewVerificationClick}
          className="w-full bg-[#1E3A8A] hover:bg-[#152b66] text-white font-medium py-2.5 px-4 rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 text-xs font-serif-gov cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Verification</span>
        </button>

        {/* Menu Navigation */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = currentView === item.view;
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.view)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs text-left transition-all ${
                  isActive
                    ? 'text-[#1E3A8A] font-bold bg-slate-50 border-l-4 border-[#1E3A8A] shadow-xs'
                    : 'text-slate-600 font-medium transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] border-l-4 border-transparent hover:border-l-[#1E3A8A] cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1E3A8A]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeStyle || 'bg-slate-100 text-slate-700'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

    </aside>
  );
};
