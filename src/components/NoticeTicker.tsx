import React from 'react';

export const NoticeTicker: React.FC = () => {
  return (
    <div className="bg-[#111625] text-white text-xs sm:text-sm py-2.5 px-4 sm:px-6 shadow-xs overflow-hidden border-b border-[#1f2937]">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center gap-4">
        <div className="bg-amber-500 text-black text-xs font-serif-gov font-bold px-3 py-1 shrink-0 uppercase tracking-wider whitespace-nowrap">
          सूचना/NOTICE
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full flex items-center">
          <div className="inline-block animate-marquee hover:[animation-play-state:paused] pl-4 text-xs font-sans text-white whitespace-nowrap">
            Update: Phase-IV Drone Survey flight logs uploaded for Meerut &amp; Hapur districts under SVAMITVA / DILRMP GIS survey &bull; Circular: All Tehsildar workbenches enabled for Automated Mutation &amp; e-Sign integration &bull; Advisory: Land record linking with 14-digit ULPIN (Bhu-Aadhaar) mandatory for agricultural subsidies &bull; Notice: 24x7 Citizen Grievance Portal Operational under DoLR guidelines
          </div>
        </div>
      </div>
    </div>
  );
};
