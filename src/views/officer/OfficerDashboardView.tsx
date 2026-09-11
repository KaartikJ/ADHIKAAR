import { ArrowRight } from "lucide-react";
import React from 'react';
import { QUEUE_ITEMS, OFFICIAL_ASSETS } from '../../data/mockData';
import { OfficerView } from '../../types';

interface Props {
  onNavigate: (view: OfficerView) => void;
  onOpenRecord: (docId: string) => void;
}

export const OfficerDashboardView: React.FC<Props> = ({
  onNavigate,
  onOpenRecord
}) => {
  return (
    <div id="officer-dashboard" className="w-full flex flex-col font-sans-gov bg-[#f8fafc]">
      {/* 1. Full-Viewport-Width Edge-to-Edge Officer Hero Section */}
      <section 
        id="officer-hero-section"
        className="relative w-full overflow-hidden bg-[#0a1526] text-white py-12 sm:py-16 px-4 sm:px-6"
      >
        {/* Background image: Authentic Cadastral Land Records Artwork */}
        <div 
          className="absolute inset-0 bg-cover bg-center sm:bg-[position:50%_35%] pointer-events-none transform scale-100 transition-all duration-700"
          style={{ 
            backgroundImage: `url(${OFFICIAL_ASSETS.heroBg})` 
          }}
        />
        {/* Fallback image layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center sm:bg-[position:50%_35%] pointer-events-none opacity-90 -z-10"
          style={{ 
            backgroundImage: `url(${OFFICIAL_ASSETS.remoteHeroBg})` 
          }}
        />
        {/* Cinematic Vignette Overlay: Preserves full artwork vibrancy while providing high-contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/65 via-[#0a1628]/35 to-[#0a1628]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,22,40,0.6)_0%,rgba(10,22,40,0.25)_60%,rgba(10,22,40,0.65)_100%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          <p className="text-amber-400 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            केन्द्रीय भूमि रिकॉर्ड सत्यापन कंसोल • DILRMP 2.0
          </p>

          <h1 className="font-serif-gov text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
            Revenue Inspector Verification Workbench
          </h1>

          <p className="text-slate-100 text-xs sm:text-sm md:text-base font-sans max-w-2xl leading-relaxed mb-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-medium">
            Tehsil Mawana, Meerut Division • Authorized DSC Session for Tehsildar Grade A
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('queue')}
              className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-medium px-5 py-2.5 rounded-md text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span>Open Pending Queue (18 Records)</span>
            </button>
            <button
              onClick={() => onNavigate('analytics')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-5 py-2.5 rounded-md text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Executive DSS Analytics</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Flat Full-Width 4-Column Metric Strip */}
      <div 
        id="officer-metrics-strip"
        className="w-full bg-slate-50 border-b border-slate-200 py-4 px-4 sm:px-6"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200/80 rounded-lg p-3.5 flex items-center gap-3.5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="font-serif-gov text-base sm:text-lg font-bold text-[#0f172a] leading-tight">
                1,284 Today
              </h3>
              <p className="font-sans text-xs text-slate-500 mt-0.5">
                Processed across 14 pilot wards (+12%)
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-lg p-3.5 flex items-center gap-3.5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="font-serif-gov text-base sm:text-lg font-bold text-[#1E3A8A] leading-tight">
                98.4% Accuracy
              </h3>
              <p className="font-sans text-xs text-slate-500 mt-0.5">
                Kaithi &amp; Modi OCR Validation Models
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-lg p-3.5 flex items-center gap-3.5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="font-serif-gov text-base sm:text-lg font-bold text-[#0f172a] leading-tight">
                452 Pending
              </h3>
              <p className="font-sans text-xs text-slate-500 mt-0.5">
                Within 15-Day Statutory SLA
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-lg p-3.5 flex items-center gap-3.5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="font-serif-gov text-base sm:text-lg font-bold text-red-700 leading-tight">
                18 Flagged
              </h3>
              <p className="font-sans text-xs text-slate-500 mt-0.5">
                Boundary Overlaps &amp; Discrepancies
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Officer Dashboard Body Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 flex flex-col gap-8">

      {/* Main 12-Column Grid: Verification Queue + Digitization Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 8 Cols (Verification Queue Table) */}
        <div className="lg:col-span-8 bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-serif-gov text-xl font-bold text-[#0f172a]">
                Active Verification Queue
              </h2>
              <p className="text-xs text-slate-500">
                Human-in-the-loop review workbench for pending RoR & deed records
              </p>
            </div>
            <button
              onClick={() => onNavigate('queue')}
              className="text-xs font-medium text-slate-600 transition-colors duration-200 hover:text-[#1E3A8A] hover:underline underline-offset-4 font-serif-gov"
            >
              View All 18 Records <ArrowRight className="w-4 h-4 inline-block ml-1" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-[#0f172a] uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="py-2.5 px-3">Document</th>
                  <th className="py-2.5 px-3">Owner & District</th>
                  <th className="py-2.5 px-3">Record Type</th>
                  <th className="py-2.5 px-3">Confidence</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {QUEUE_ITEMS.map((item) => (
                  <tr key={item.docId} className="transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.thumbnail}
                          alt="Thumbnail"
                          className="w-8 h-10 object-cover rounded border border-slate-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-[#0f172a] font-mono text-[11px]">{item.docId}</span>
                          <span className="text-[10px] text-slate-400">Khasra {item.khasra}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-[#0f172a]">{item.ownerName}</div>
                      <div className="text-[11px] text-slate-500">{item.district}</div>
                    </td>

                    <td className="py-3 px-3 text-slate-700">
                      {item.recordType}
                    </td>

                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded border ${
                        item.status === 'ACTION_REQUIRED'
                          ? 'bg-red-50 text-red-700 border-red-300'
                          : item.status === 'PENDING'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      }`}>
                        {item.confidenceBadge} {item.confidence}%
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenRecord(item.docId)}
                          className="px-2.5 py-1 text-xs font-medium text-[#1E3A8A] border border-[#1E3A8A] rounded-md hover:bg-blue-50 font-serif-gov transition-colors"
                        >
                          Review
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: 4 Cols (Digitization Progress by District) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Progress Card */}
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                Digitization Progress
              </h3>
              <p className="text-xs text-slate-500">
                District-wise DILRMP rollout completion
              </p>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-slate-700">Varanasi District</span>
                  <span className="font-mono font-bold text-[#1E3A8A]">92%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1E3A8A] h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-slate-700">Lucknow Central</span>
                  <span className="font-mono font-bold text-[#1E3A8A]">88%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1E3A8A] h-2 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-slate-700">Kanpur Dehat</span>
                  <span className="font-mono font-bold text-[#1E3A8A]">85%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1E3A8A] h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-slate-700">Agra Division</span>
                  <span className="font-mono font-bold text-amber-700">64%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-2 rounded-full" style={{ width: '64%' }} />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('analytics')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium font-serif-gov text-xs rounded-md transition-colors mt-1"
            >
              View Compliance Report
            </button>
          </div>

          {/* Scheme Insights Card */}
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-3">
            <h3 className="font-serif-gov text-base font-bold text-[#0f172a] border-b border-slate-100 pb-2">
              Automated Welfare Eligibility
            </h3>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                <span className="text-slate-700 font-medium">PM-KISAN DBT Candidates:</span>
                <span className="font-bold text-emerald-700">342 Qualified</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                <span className="text-slate-700 font-medium">PMAY Homestead Grants:</span>
                <span className="font-bold text-[#1E3A8A]">128 Qualified</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                <span className="text-slate-700 font-medium">PMFBY Crop Insurance:</span>
                <span className="font-bold text-slate-800">89 Matched</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
