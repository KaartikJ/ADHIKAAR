import React from 'react';
import { CitizenView } from '../../types';
import { OFFICIAL_ASSETS } from '../../data/mockData';

interface Props {
  onNavigate: (view: CitizenView) => void;
  isPublic?: boolean;
}

export const AboutUsView: React.FC<Props> = ({ onNavigate, isPublic = false }) => {
  return (
    <div id="about-us-view" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col gap-6 font-sans-gov">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-slate-600 transition-colors duration-200 hover:text-[#1E3A8A] hover:underline underline-offset-4 font-bold"
            >
              Home
            </button>
            <span>/</span>
            <span className="font-bold text-[#0f172a]">About DILRMP & ADHIKAR Portal</span>
          </div>
          <h1 className="font-serif-gov text-3xl font-bold text-[#0f172a] mt-1">
            Digital India Land Records Modernization Programme (DILRMP 2.0)
          </h1>
          <p className="text-xs text-slate-500">
            Department of Land Resources (DoLR), Ministry of Rural Development, Government of India
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="px-4 py-2 text-xs font-medium bg-[#1E3A8A] text-white rounded-md hover:bg-[#152b66] transition-all shadow-xs flex items-center gap-1.5 font-serif-gov"
        >
          <span>{isPublic ? 'Return to Home' : 'Return to Dashboard'}</span>
        </button>
      </div>

      {/* Program Mission & Authority Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#cbd5e1] rounded-xl p-6 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded text-[11px] font-medium">
              Statutory Authority
            </span>
            <h2 className="font-serif-gov text-xl font-bold text-[#0f172a]">
              Legislative Mandate & Policy Framework
            </h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            The <strong>Digital India Land Records Modernization Programme (DILRMP)</strong> was launched by the Government of India to digitize and automate all textual and spatial land records across all States and Union Territories. Under the ADHIKAR umbrella (DILRMP 2.0), the system implements an end-to-end integrated land information management system (ILIMS).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-[#0f172a] block mb-1">1. Conclusive Title Guarantee</span>
              <p className="text-slate-600 leading-normal">
                Transitioning from presumptive title (Torrens system principles) to state-backed title guarantee through automated title clearance auditing.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-[#0f172a] block mb-1">2. 14-Digit Bhu-Aadhaar (ULPIN)</span>
              <p className="text-slate-600 leading-normal">
                Every cadastral plot is assigned a globally unique 14-character alphanumeric identifier based on longitude and latitude coordinates of its vertices.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-[#0f172a] block mb-1">3. Automated Revenue-Registry Sync</span>
              <p className="text-slate-600 leading-normal">
                Real-time interconnectivity between Registration offices (NGDRS) and Revenue Tehsil offices for immediate automated mutation initiation.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-[#0f172a] block mb-1">4. AI-Assisted Script Ingestion</span>
              <p className="text-slate-600 leading-normal">
                State-of-the-art optical character recognition tailored for Kaithi, Modi, Urdu, and Devanagari historical settlement registers.
              </p>
            </div>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="bg-white border border-[#cbd5e1] rounded-xl p-6 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <img 
              src={OFFICIAL_ASSETS.seal} 
              alt="National Land Seal"
              className="w-12 h-12 object-contain"
            />
            <div>
              <span className="font-serif-gov font-bold text-[#0f172a] text-base block">Ministry of Rural Development</span>
              <span className="text-[11px] text-slate-500">Government of India</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Executing Agency:</span>
              <span className="font-bold text-[#0f172a]">NIC & DoLR</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Pilot Tehsil:</span>
              <span className="font-bold text-[#0f172a]">Mawana (Meerut, UP)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Security Standard:</span>
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">ISO/IEC 27001 Certified</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Evidence Law Compliance:</span>
              <span className="font-bold text-slate-700">Section 65B IT Act</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
