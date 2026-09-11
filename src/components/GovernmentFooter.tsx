import React from 'react';
import { OFFICIAL_ASSETS } from '../data/mockData';

export const GovernmentFooter: React.FC = () => {
  return (
    <footer id="gov-footer" className="w-full bg-[#0f172a] text-slate-300 border-t border-slate-800 pt-12 pb-8 font-sans-gov mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 flex flex-col gap-10">
        {/* Top Tier: Identity & Official Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800 text-xs">
          {/* Col 1: Official Identity & About */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <img 
                src={OFFICIAL_ASSETS.seal} 
                alt="ADHIKAR Official Portal Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-full bg-white p-0.5 border border-slate-700 shadow-md flex-shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = OFFICIAL_ASSETS.remoteSeal;
                }}
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-serif-gov text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                  <span>भारत सरकार</span>
                  <span className="text-[10px] font-sans px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded font-semibold">
                    अधिकार
                  </span>
                </span>
                <span className="text-xs text-slate-400">
                  Government of India
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Digital India Land Records Modernization Programme (DILRMP). A centralized initiative powered by the Department of Land Resources (DoLR), Ministry of Rural Development.
            </p>
          </div>

          {/* Col 2: Land Records Portals */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1">
              National Registry Portals
            </span>
            <ul className="flex flex-col gap-1.5 text-slate-400 text-[11px]">
              <li><span className="hover:text-white cursor-pointer transition-colors">National Generic Document Registration (NGDRS)</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Unique Land Parcel ID (ULPIN / Bhu-Aadhaar)</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Bhu-Naksha Cadastral WebGIS Suite</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">UP Bhulekh & Revenue Board (Bhuiyan)</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Jan Parichay National Single Sign-On</span></li>
            </ul>
          </div>

          {/* Col 3: Policy & Legal Framework */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1">
              Statutory Compliance
            </span>
            <ul className="flex flex-col gap-1.5 text-slate-400 text-[11px]">
              <li><span className="hover:text-white cursor-pointer transition-colors">IT Act 2000 & Section 65B Admissibility</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Digital Personal Data Protection (DPDP) Act</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Guidelines for Indian Government Websites (GIGW 3.0)</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Hyperlinking & Privacy Policies</span></li>
            </ul>
          </div>

          {/* Col 4: Grievance & Technical Support */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1">
              Toll-Free Grievance Helpdesk
            </span>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex flex-col gap-1 text-[11px]">
              <span className="text-slate-400">National Helpline:</span>
              <span className="text-base font-bold text-emerald-400 font-mono">1800-11-2026</span>
              <span className="text-slate-400 text-[10px]">(Mon - Sat, 09:00 AM - 06:00 PM IST)</span>
              <span className="text-slate-400 mt-1">Grievance Portal:</span>
              <span className="text-blue-400 underline cursor-pointer text-[10px]">support-dilrmp@nic.in</span>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Hosting */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
          <div className="text-center sm:text-left">
            <span>
              Designed, Developed and Hosted by National Informatics Centre (NIC).
            </span>
          </div>

          <div className="text-center sm:text-right">
            <span>
              © 2026 Ministry of Rural Development, Government of India. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
