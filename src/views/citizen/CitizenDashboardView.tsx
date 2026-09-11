import { ArrowRight } from "lucide-react";
import React, { useState } from 'react';
import { CitizenView } from '../../types';
import { OFFICIAL_ASSETS, NOTICES, PARCELS } from '../../data/mockData';

interface Props {
  onNavigate: (view: CitizenView) => void;
  onSelectParcel: (khasra: string) => void;
  onDownloadNakal: (khasra: string) => void;
}

export const CitizenDashboardView: React.FC<Props> = ({
  onNavigate,
  onSelectParcel,
  onDownloadNakal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchQuery.includes('789') || searchQuery.toLowerCase().includes('mrt')) {
        onSelectParcel('789');
        onNavigate('inspection');
      } else if (searchQuery.includes('422')) {
        onSelectParcel('422/A');
        onNavigate('webgis');
      } else {
        onNavigate('tracking');
      }
    }
  };

  return (
    <div id="citizen-dashboard" className="w-full flex flex-col font-sans-gov bg-[#f8fafc]">
      {/* 1. Full-Viewport-Width Edge-to-Edge Hero Section */}
      <section 
        id="citizen-hero-section"
        className="relative w-full overflow-hidden bg-[#0a1526] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6"
      >
        {/* Background image: Authentic Cadastral Land Records Artwork (Surveyor, Registers & Sunrise) */}
        <div 
          className="absolute inset-0 bg-cover bg-center sm:bg-[position:50%_35%] pointer-events-none transform scale-100 transition-all duration-700"
          style={{ 
            backgroundImage: `url(${OFFICIAL_ASSETS.heroBg})` 
          }}
        />
        {/* Fallback image layer in case of path resolution */}
        <div 
          className="absolute inset-0 bg-cover bg-center sm:bg-[position:50%_35%] pointer-events-none opacity-90 -z-10"
          style={{ 
            backgroundImage: `url(${OFFICIAL_ASSETS.remoteHeroBg})` 
          }}
        />
        {/* Cinematic Vignette Overlay: Preserves full artwork vibrancy while providing high-contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/65 via-[#0a1628]/35 to-[#0a1628]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,22,40,0.6)_0%,rgba(10,22,40,0.25)_60%,rgba(10,22,40,0.65)_100%)] pointer-events-none" />

        {/* Content Alignment: Perfectly Centered */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Subtitle 1 (Top): Hindi golden/amber text */}
          <p className="text-amber-400 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            पारदर्शी भूमि प्रशासन, सुरक्षित अधिकार
          </p>

          {/* Main Title: Large crisp white Times New Roman font */}
          <h1 className="font-serif-gov text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
            Welcome to your Digital Land Locker, Kartik
          </h1>

          {/* Description: Two lines of centered, light gray/slate-200 Arial text */}
          <div className="flex flex-col gap-1 text-slate-100 text-xs sm:text-sm md:text-base font-sans leading-relaxed max-w-3xl mb-7 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            <p className="font-medium">
              Intelligent Land Records Digitization &amp; Validation • Linked to Aadhaar &amp; ULPIN
            </p>
            <p className="text-slate-200">
              Access authenticated Records of Rights (RoR), track mutation cases, and inspect parcel boundaries directly from your national locker.
            </p>
          </div>

          {/* Integrated Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl flex items-center justify-center">
            <div className="flex w-full items-stretch shadow-xl rounded-md overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Khasra, Khatauni, or ULPIN..."
                className="bg-white text-slate-800 px-4 py-3 sm:py-3.5 rounded-l-md w-full max-w-lg text-sm sm:text-base placeholder-slate-400 focus:outline-none font-sans"
              />
              <button
                type="submit"
                className="bg-[#1E3A8A] hover:bg-blue-900 text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-r-md flex items-center gap-2 font-medium text-sm sm:text-base transition-colors shrink-0 cursor-pointer"
              >
                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 1114 0z" />
                </svg>
                <span>Search / खोजें</span>
              </button>
            </div>
          </form>

          {/* Quick Query Helpers */}
          <div className="flex items-center gap-2 flex-wrap justify-center text-[11px] text-slate-300 pt-3">
            <span className="text-slate-400">Quick searches:</span>
            <button
              type="button"
              onClick={() => {
                onSelectParcel('789');
                onNavigate('inspection');
              }}
              className="text-slate-200 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Khasra #789 (Ag Plot)
            </button>
            <span className="text-slate-500">•</span>
            <button
              type="button"
              onClick={() => {
                onSelectParcel('422/A');
                onNavigate('webgis');
              }}
              className="text-slate-200 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Khasra #422/A (WebGIS)
            </button>
            <span className="text-slate-500">•</span>
            <button
              type="button"
              onClick={() => onNavigate('tracking')}
              className="text-slate-200 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Mutation #UP-2026-88192
            </button>
          </div>
        </div>
      </section>

      {/* 2. Flat Full-Width 4-Column Metric Strip */}
      <div 
        id="citizen-metrics-strip"
        className="w-full bg-slate-50 border-b border-slate-200 py-4 px-4 sm:px-6"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1: 2 Linked Properties */}
          <div 
            onClick={() => {
              const el = document.getElementById('verified-properties-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white border border-slate-200/80 rounded-lg p-3.5 flex items-center gap-3.5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group"
            title="Click to view Linked Properties"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
              <svg className="w-5 h-5 text-slate-700 group-hover:text-[#1E3A8A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="font-serif-gov text-base sm:text-lg font-bold text-[#0f172a] leading-tight group-hover:text-[#1E3A8A] transition-colors">
                2 Linked Properties
              </h3>
              <p className="font-sans text-xs text-slate-500 mt-0.5">
                Aadhaar Verified &amp; Seeding Active
              </p>
            </div>
          </div>

          {/* Metric 2: 1 Pending Application */}
          <div 
            onClick={() => onNavigate('tracking')}
            className="bg-white border border-slate-200/80 rounded-lg p-3.5 flex items-center gap-3.5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group"
            title="Click to track Pending Application"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
              <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="font-serif-gov text-base sm:text-lg font-bold text-[#0f172a] leading-tight group-hover:text-amber-800 transition-colors">
                1 Pending Application
              </h3>
              <p className="font-sans text-xs text-slate-500 mt-0.5">
                Mutation Request (#UP-2026)
              </p>
            </div>
          </div>

          {/* Metric 3: 0 Active Disputes */}
          <div 
            onClick={() => onNavigate('tracking')}
            className="bg-white border border-slate-200/80 rounded-lg p-3.5 flex items-center gap-3.5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group"
            title="Click to view Dispute & Clearance Status"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="font-serif-gov text-base sm:text-lg font-bold text-[#0f172a] leading-tight group-hover:text-emerald-800 transition-colors">
                0 Active Disputes
              </h3>
              <p className="font-sans text-xs text-slate-500 mt-0.5">
                All Titles Clear &amp; Encumbrance Free
              </p>
            </div>
          </div>

          {/* Metric 4: 14-Digit ULPIN Active */}
          <div 
            onClick={() => {
              onSelectParcel('789');
              onNavigate('inspection');
            }}
            className="bg-white border border-slate-200/80 rounded-lg p-3.5 flex items-center gap-3.5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group"
            title="Click to inspect Geo-Locked ULPIN Folio"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
              <svg className="w-5 h-5 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="font-serif-gov text-base sm:text-lg font-bold text-[#0f172a] leading-tight group-hover:text-[#1E3A8A] transition-colors">
                14-Digit ULPIN Active
              </h3>
              <p className="font-sans text-xs text-slate-500 mt-0.5">
                Bhudhar Geo-Referenced
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Body Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 flex flex-col gap-8">

      {/* 3. Running Ticker Notice Strip */}
      <div className="bg-[#0f172a] text-white rounded-xl border border-slate-700 p-2.5 flex items-center gap-3 overflow-hidden shadow-xs">
        <div className="bg-amber-400 text-slate-900 font-bold px-2.5 py-1 rounded text-[11px] shrink-0 uppercase tracking-wider">
          नवीनतम सूचनाएं / Notices
        </div>
        <div className="overflow-hidden whitespace-nowrap flex-1 text-xs text-slate-200">
          <div className="animate-marquee inline-block font-medium">
            {NOTICES.join('  •••  ')}
          </div>
        </div>
      </div>

      {/* 4. My Verified Properties Section */}
      <section id="verified-properties-section" className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2">
          <div>
            <h2 className="font-serif-gov text-2xl font-bold text-[#0f172a]">
              My Verified Properties (Khatauni & Land Locker)
            </h2>
            <p className="text-xs text-slate-500">
              Authenticated land titles linked to your Aadhaar & Jan Parichay identity
            </p>
          </div>
          <button
            onClick={() => onNavigate('webgis')}
            className="text-xs font-bold text-slate-600 transition-colors duration-200 hover:text-[#1E3A8A] hover:underline underline-offset-4"
          >
            View all in WebGIS Atlas <ArrowRight className="w-4 h-4 inline-block ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Khasra 789 */}
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-mono text-slate-400">ULPIN: {PARCELS['789'].ulpin}</span>
                  <h3 className="font-serif-gov text-xl font-bold text-[#0f172a]">
                    Khasra No. 789 — Agricultural Plot
                  </h3>
                  <span className="text-xs text-slate-600 font-medium">
                    Village: Hastinapur, Tehsil: Mawana, District: Meerut (UP)
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[10px] font-medium">
                    Aadhaar Linked
                  </span>
                  <span className="px-2 py-0.5 bg-blue-50 text-[#1E3A8A] border border-blue-200 rounded text-[10px] font-medium">
                    {PARCELS['789'].syncBadge}
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Recorded Area</span>
                  <span className="font-bold text-[#0f172a]">{PARCELS['789'].recArea}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Khata / Ledger</span>
                  <span className="font-bold text-[#0f172a]">Khata No. {PARCELS['789'].khata}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Title Ownership</span>
                  <span className="font-bold text-emerald-800">Clear / Joint Bhumidhar</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Landowner</span>
                  <span className="font-bold text-[#0f172a]">{PARCELS['789'].owner}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Mutation Order</span>
                  <span className="font-bold text-[#0f172a]">{PARCELS['789'].mutation}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">OCR Confidence</span>
                  <span className="font-bold text-emerald-700">99.9% High Fidelity</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2 flex-wrap">
              <button
                onClick={() => {
                  onSelectParcel('789');
                  onNavigate('inspection');
                }}
                className="px-3.5 py-2 text-xs font-medium text-[#1E3A8A] border border-[#1E3A8A] rounded-md hover:bg-blue-50 font-serif-gov transition-colors"
              >
                Inspect Historical Folio
              </button>
              <button
                onClick={() => onDownloadNakal('789')}
                className="px-4 py-2 text-xs font-medium bg-[#1E3A8A] hover:bg-[#152b66] text-white rounded-md font-serif-gov transition-colors shadow-xs"
              >
                Download RoR (Nakal)
              </button>
            </div>
          </div>

          {/* Card 2: Khasra 422/A */}
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-mono text-slate-400">ULPIN: {PARCELS['422/A'].ulpin}</span>
                  <h3 className="font-serif-gov text-xl font-bold text-[#0f172a]">
                    Khasra No. 422/A — Homestead Parcel
                  </h3>
                  <span className="text-xs text-slate-600 font-medium">
                    Village: Hastinapur, Tehsil: Mawana, District: Meerut (UP)
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[10px] font-medium">
                    Aadhaar Linked
                  </span>
                  <span className="px-2 py-0.5 bg-blue-50 text-[#1E3A8A] border border-blue-200 rounded text-[10px] font-medium">
                    {PARCELS['422/A'].syncBadge}
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Recorded Area</span>
                  <span className="font-bold text-[#0f172a]">{PARCELS['422/A'].recArea}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Khata / Ledger</span>
                  <span className="font-bold text-[#0f172a]">Khata No. {PARCELS['422/A'].khata}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Title Ownership</span>
                  <span className="font-bold text-emerald-800">Sole Owner (Residential)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Landowner</span>
                  <span className="font-bold text-[#0f172a]">{PARCELS['422/A'].owner}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Encumbrance</span>
                  <span className="font-bold text-emerald-700">Nil (Clear Title)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Spatial Match</span>
                  <span className="font-bold text-emerald-700">0.000 Ha Variance</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2 flex-wrap">
              <button
                onClick={() => {
                  onSelectParcel('422/A');
                  onNavigate('webgis');
                }}
                className="px-3.5 py-2 text-xs font-medium text-[#1E3A8A] border border-[#1E3A8A] rounded-md hover:bg-blue-50 font-serif-gov transition-colors"
              >
                Open in Bhu-Naksha
              </button>
              <button
                onClick={() => onDownloadNakal('422/A')}
                className="px-4 py-2 text-xs font-medium bg-[#1E3A8A] hover:bg-[#152b66] text-white rounded-md font-serif-gov transition-colors shadow-xs"
              >
                Download RoR (Nakal)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Online Services & Digital Utilities (5 Grid Cards) */}
      <section className="flex flex-col gap-4">
        <div className="border-b border-[#cbd5e1] pb-2">
          <h2 className="font-serif-gov text-2xl font-bold text-[#0f172a]">
            Online Services & Digital Utilities
          </h2>
          <p className="text-xs text-slate-500">
            Citizen self-service tools for digital record validation, deed registration, and spatial mapping
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Service 1 */}
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between gap-4 hover:border-[#1E3A8A] transition-colors">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-blue-50 text-[#1E3A8A] border border-blue-200 rounded text-[10px] font-medium">
                  AI OCR Ingest
                </span>
                <span className="text-[11px] font-mono text-slate-400">Service #01</span>
              </div>
              <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                Digitize Legacy Records
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload and batch-process physical registers with high-throughput AI trained on historical scripts (Kaithi, Modi, Urdu, Devanagari) to extract Khata, Khasra, and owner metadata.
              </p>
            </div>
            <button
              onClick={() => onNavigate('inspection')}
              className="w-full bg-[#1E3A8A] hover:bg-[#152b66] text-white font-medium py-2 rounded-md text-xs font-serif-gov transition-colors"
            >
              Open Batch Processor
            </button>
          </div>

          {/* Service 2 */}
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between gap-4 hover:border-[#1E3A8A] transition-colors">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-blue-50 text-[#1E3A8A] border border-blue-200 rounded text-[10px] font-medium">
                  Application Timeline
                </span>
                <span className="text-[11px] font-mono text-slate-400">Service #02</span>
              </div>
              <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                Application Tracking
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                End-to-end transparent workflow for mutation requests, partition filings, and land classification reviews with automated WhatsApp & SMS milestone notifications.
              </p>
            </div>
            <button
              onClick={() => onNavigate('tracking')}
              className="w-full bg-[#1E3A8A] hover:bg-[#152b66] text-white font-medium py-2 rounded-md text-xs font-serif-gov transition-colors"
            >
              Track Application Status
            </button>
          </div>

          {/* Service 3 */}
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between gap-4 hover:border-[#1E3A8A] transition-colors">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-blue-50 text-[#1E3A8A] border border-blue-200 rounded text-[10px] font-medium">
                  NGDRS Interop
                </span>
                <span className="text-[11px] font-mono text-slate-400">Service #03</span>
              </div>
              <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                Property Registration Linkage
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                National Generic Document Registration System (NGDRS) interoperability. Verify registered deeds against real-time revenue databases before monetary transaction.
              </p>
            </div>
            <button
              onClick={() => onNavigate('registration')}
              className="w-full bg-[#1E3A8A] hover:bg-[#152b66] text-white font-medium py-2 rounded-md text-xs font-serif-gov transition-colors"
            >
              Verify &amp; Submit Deed
            </button>
          </div>

          {/* Service 4 */}
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between gap-4 hover:border-[#1E3A8A] transition-colors">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-blue-50 text-[#1E3A8A] border border-blue-200 rounded text-[10px] font-medium">
                  Dual-Pane Workbench
                </span>
                <span className="text-[11px] font-mono text-slate-400">Service #04</span>
              </div>
              <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                Record Inspection Studio
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Synchronized dual-pane review studio pairing historical scanned revenue folios with AI-extracted bounding boxes and field validation alerts.
              </p>
            </div>
            <button
              onClick={() => {
                onSelectParcel('789');
                onNavigate('inspection');
              }}
              className="w-full bg-[#1E3A8A] hover:bg-[#152b66] text-white font-medium py-2 rounded-md text-xs font-serif-gov transition-colors"
            >
              Open Inspection Studio
            </button>
          </div>

          {/* Service 5 */}
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between gap-4 hover:border-[#1E3A8A] transition-colors">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-blue-50 text-[#1E3A8A] border border-blue-200 rounded text-[10px] font-medium">
                  Bhu-Naksha Cadastre
                </span>
                <span className="text-[11px] font-mono text-slate-400">Service #05</span>
              </div>
              <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                WebGIS Cadastral Atlas
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interactive cadastral boundary navigation (Bhu-Naksha), overlaying drone-orthorectified layers with legal RoR records, perimeter coordinates, adjoining neighbors, and discrepancy heatmaps.
              </p>
            </div>
            <button
              onClick={() => onNavigate('webgis')}
              className="w-full bg-[#1E3A8A] hover:bg-[#152b66] text-white font-medium py-2 rounded-md text-xs font-serif-gov transition-colors"
            >
              Launch WebGIS Atlas
            </button>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};
