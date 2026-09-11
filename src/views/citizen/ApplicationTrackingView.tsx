import React, { useState } from 'react';
import { PARCELS } from '../../data/mockData';

interface Props {
  initialRef?: string;
  onLodgeDispute: () => void;
}

export const ApplicationTrackingView: React.FC<Props> = ({
  initialRef = 'ADH-UP-2026-88192',
  onLodgeDispute
}) => {
  const [trackingId, setTrackingId] = useState(initialRef);
  const [whatsAppActive, setWhatsAppActive] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('+91 98XXXXXX45');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const parcel = PARCELS['789'];

  const stages = [
    {
      title: 'Stage 1: Document Ingested & SHA-256 Checksum Verified',
      subtitle: 'Batch REG-UP-MWN-419 authenticated via Jan Parichay e-Sign',
      timestamp: '02 Mar 2026, 10:14 AM IST',
      completed: true,
      badge: 'Ingest Verified'
    },
    {
      title: 'Stage 2: AI Entity Extraction & Multi-Script OCR',
      subtitle: '98.4% Confidence in Kaithi & Modi script revenue entities',
      timestamp: '02 Mar 2026, 10:18 AM IST',
      completed: true,
      badge: 'OCR Resolved'
    },
    {
      title: 'Stage 3: Cross-Database Validation & GIS Boundary Match',
      subtitle: 'Georeferenced Polygon UP-GIS-MST-0921 overlaid with 0.000 Ha variance',
      timestamp: '03 Mar 2026, 14:30 PM IST',
      completed: true,
      badge: 'GIS Matched'
    },
    {
      title: 'Stage 4: Tehsildar Review & Field Inspector Sign-Off',
      subtitle: 'Revenue Inspector Lekhpal field verification report accepted with DSC token',
      timestamp: '05 Mar 2026, 16:20 PM IST',
      completed: true,
      badge: 'Officer Cleared'
    },
    {
      title: 'Stage 5: State LRMS & National DILRMP 2.0 Repository Sync',
      subtitle: 'Publishing updated RoR Khatauni folio to Bhulekh central database',
      timestamp: 'Scheduled Today, 18:00 PM IST',
      completed: false,
      badge: 'Final Sync in Progress'
    }
  ];

  return (
    <div id="application-tracking" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col gap-6 font-sans-gov">
      {/* Header */}
      <div className="border-b border-[#cbd5e1] pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>DILRMP Application Lifecycle</span>
          <span>/</span>
          <span>Mutation & Title Tracking</span>
          <span>/</span>
          <span className="font-bold text-[#0f172a] font-mono">{trackingId}</span>
        </div>
        <h1 className="font-serif-gov text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
          Track Land Record Modernization & Digitization Status
        </h1>
        <p className="text-xs text-slate-500">
          Real-time 5-stage verification tracker for revenue deeds, mutation requests, and cadastral alignments
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl p-4 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Application Reference ID (e.g. ADH-UP-2026-88192)..."
            className="w-full bg-[#f8fafc] border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-mono text-[#0f172a] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
          />
        </div>
        <button
          onClick={() => setShowConfirmation(true)}
          className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#1E3A8A] text-[#1E3A8A] transition-all duration-300 hover:bg-[#1E3A8A] hover:text-white hover:shadow-md font-medium text-xs font-serif-gov rounded-md shadow-xs"
        >
          Fetch Dossier
        </button>
      </div>

      {/* Main Grid: Timeline + WhatsApp Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Timeline & Dossier (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Active Dossier Header Card */}
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-3">
            <div className="flex items-start justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Target Land Parcel Dossier
                </span>
                <h3 className="font-serif-gov text-xl font-bold text-[#0f172a]">
                  Khasra No. {parcel.khasra} • ULPIN: {parcel.ulpin}
                </h3>
                <span className="text-xs text-slate-600">
                  Village: Hastinapur, Tehsil: Mawana, District: Meerut (UP)
                </span>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-md text-xs font-medium">
                Human Verification Completed
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-lg">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Application Ref</span>
                <span className="font-mono font-bold text-[#0f172a]">{trackingId}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Filing Date</span>
                <span className="font-bold text-[#0f172a]">02 Mar 2026</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Assigned Tehsildar</span>
                <span className="font-bold text-[#0f172a]">Officer Sharma (Grade A)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">SLA Target Date</span>
                <span className="font-bold text-emerald-700">12 Mar 2026 (On Track)</span>
              </div>
            </div>
          </div>

          {/* 5-Stage Timeline Sequence */}
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-6 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-6">
            <h3 className="font-serif-gov text-lg font-bold text-[#0f172a] border-b border-slate-100 pb-2">
              Administrative Validation Sequence
            </h3>

            <div className="relative flex flex-col gap-6 pl-6 border-l-2 border-[#1E3A8A]/30">
              {stages.map((stage, idx) => (
                <div key={stage.title} className="relative flex flex-col gap-1">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[31px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                    stage.completed 
                    ? 'bg-emerald-600 text-white border-white shadow-xs' 
                    : 'bg-amber-400 text-slate-900 border-white animate-pulse'
                  }`}>
                    {stage.completed ? '✓' : idx + 1}
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="font-bold text-sm text-[#0f172a]">{stage.title}</h4>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                      stage.completed
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}>
                      {stage.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">{stage.subtitle}</p>
                  <span className="text-[10px] text-slate-400 font-mono">{stage.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: WhatsApp / SMS Gateway & Alerts (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Instant WhatsApp Updates Simulator */}
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif-gov text-base font-bold text-[#0f172a]">
                  Instant WhatsApp Updates
                </h3>
                <span className="text-[11px] text-slate-500">Official DILRMP Citizen Bot</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-medium rounded border border-emerald-200">
                Live Linked
              </span>
            </div>

            {/* Simulated Mobile Chat Window */}
            <div className="bg-[#0b141a] text-slate-100 rounded-xl p-3.5 flex flex-col gap-3 font-sans-gov text-xs shadow-inner">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-[10px]">
                  GOI
                </div>
                <div>
                  <div className="font-bold text-xs text-white">ADHIKAR DILRMP Services</div>
                  <div className="text-[10px] text-emerald-400">Official Government Business Account</div>
                </div>
              </div>

              {/* Message Bubble */}
              <div className="bg-[#005c4b] text-white p-3 rounded-lg rounded-tl-xs text-[11px] leading-relaxed shadow-sm">
                <p className="font-bold text-amber-200 mb-1">
                  नमस्ते Kartik Jain,
                </p>
                <p>
                  Your Land Record Mutation Application <strong>#{trackingId}</strong> for Khasra <strong>#789 (Mawana)</strong> has cleared <strong>Stage 4: Tehsildar Sign-Off</strong>.
                </p>
                <p className="mt-1.5 text-[10px] text-emerald-200">
                  Digital DSC Token Applied: <code>UP-REV-DSC-98124</code>. Final Bhulekh synchronization scheduled.
                </p>
                <div className="text-right text-[9px] text-slate-300 mt-1">16:22 • Read</div>
              </div>
            </div>

            {/* Notification Subscription Form */}
            <div className="flex flex-col gap-2 pt-1">
              <label className="text-[11px] font-bold text-[#0f172a]">
                Registered Mobile for Dispatch
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
              />
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 mt-1">
                <input
                  type="checkbox"
                  checked={whatsAppActive}
                  onChange={(e) => setWhatsAppActive(e.target.checked)}
                  className="accent-[#1E3A8A]"
                />
                <span>Receive push milestones on WhatsApp &amp; SMS</span>
              </label>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2 text-xs">
            <span className="font-bold text-[#0f172a]">Revenue Inspector Office Mawana</span>
            <p className="text-slate-500 text-[11px]">
              If your application exceeds the statutory 15-day SLA timeline, contact the Sub-Divisional Officer at Tehsil Mawana.
            </p>
            <span className="font-mono text-slate-700 text-[11px]">Toll-Free: 1800-11-2026</span>
          </div>
        </div>
      </div>

      {/* Discrepancy Redressal Banner at Bottom */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif-gov text-base font-bold text-amber-950">
            Encountered a Cadastral or Ownership Discrepancy?
          </h4>
          <p className="text-xs text-amber-800">
            You may lodge a formal boundary objection under Section 38 of the UP Revenue Code 2006.
          </p>
        </div>
        <button
          onClick={onLodgeDispute}
          className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-medium text-xs font-serif-gov rounded-md transition-colors shadow-xs"
        >
          Lodge Dispute / Correction Request
        </button>
      </div>
    </div>
  );
};
