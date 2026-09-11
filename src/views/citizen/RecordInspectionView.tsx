import { ArrowLeft } from "lucide-react";
import React, { useState } from 'react';
import { PARCELS, OFFICIAL_ASSETS } from '../../data/mockData';

interface Props {
  selectedKhasra?: string;
  khasraNo?: string;
  onBack?: () => void;
  onDownloadNakal: (khasra: string) => void;
  onRaiseDispute?: (khasra: string) => void;
}

export const RecordInspectionView: React.FC<Props> = ({
  selectedKhasra,
  khasraNo,
  onBack,
  onDownloadNakal,
  onRaiseDispute
}) => {
  const activeKhasra = selectedKhasra || khasraNo || '789';
  const parcel = PARCELS[activeKhasra] || PARCELS['789'];
  const [zoomLevel, setZoomLevel] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [activeBox, setActiveBox] = useState<'khata' | 'khasra' | 'owner' | 'area' | null>(null);
  const [disputeSuccessMessage, setDisputeSuccessMessage] = useState<string | null>(null);

  const handleDispute = (khasra: string) => {
    if (onRaiseDispute) {
      onRaiseDispute(khasra);
    } else {
      setDisputeSuccessMessage(`Boundary dispute arbitration notice filed for Khasra #${khasra}. Tehsildar Mawana notified under Section 38 of UP Revenue Code.`);
      setTimeout(() => setDisputeSuccessMessage(null), 6000);
    }
  };

  return (
    <div id="record-inspection-studio" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col gap-6 font-sans-gov">
      {/* Studio Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#cbd5e1] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="text-slate-600 transition-colors duration-200 hover:text-[#1E3A8A] hover:underline underline-offset-4 font-bold mr-1"
              >
                <ArrowLeft className="w-4 h-4 inline-block mr-1" /> Back to Dashboard
              </button>
            )}
            <span>/</span>
            <span>DILRMP Inspection Studio</span>
            <span>/</span>
            <span>Tehsil Mawana</span>
            <span>/</span>
            <span className="font-bold text-[#0f172a]">Khasra #{parcel.khasra}</span>
          </div>
          <h1 className="font-serif-gov text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
            Historical Ledger Inspection & Extraction Studio
          </h1>
          <p className="text-xs text-slate-500">
            Synchronized dual-pane verification pairing scanned revenue folios with AI-extracted cadastral entities
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {parcel.status === 'verified' ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-full">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-300 rounded-full">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </span>
          )}
        </div>
      </div>

      {disputeSuccessMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-900 font-semibold flex items-center justify-between">
          <span>{disputeSuccessMessage}</span>
          <button type="button" onClick={() => setDisputeSuccessMessage(null)} className="text-emerald-700 hover:text-emerald-900 transition-colors font-bold">✕</button>
        </div>
      )}

      {/* 50/50 Synchronized Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANE: 6 Cols (Historical Scanned Ledger Canvas) */}
        <div className="lg:col-span-6 bg-white border border-[#cbd5e1] rounded-xl overflow-hidden shadow-xs flex flex-col">
          {/* Canvas Controls Bar */}
          <div className="p-3 bg-slate-100 border-b border-[#cbd5e1] flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#0f172a]">Original Folio:</span>
              <span className="text-[11px] font-mono text-slate-600">UP-MWN-1984-KB9</span>
            </div>

            {/* Viewer Controls */}
            <div className="flex items-center gap-1 border border-slate-300 rounded bg-white p-0.5">
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.75, Number((prev - 0.15).toFixed(2))))}
                className="px-2 py-0.5 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] text-slate-700 cursor-pointer font-bold"
                title="Zoom Out"
              >
                -
              </button>
              <span className="px-2 text-[11px] font-mono text-slate-600">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(1.8, Number((prev + 0.15).toFixed(2))))}
                className="px-2 py-0.5 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] text-slate-700 cursor-pointer font-bold"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="px-2 py-0.5 transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] text-slate-700 cursor-pointer font-semibold border-l border-slate-200 text-[10px]"
                title="Reset Zoom"
              >
                100%
              </button>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                  highContrast ? 'bg-amber-400 text-black' : 'transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] text-slate-700 cursor-pointer'
                }`}
                title="High Contrast B&W Document Filter"
              >
                B&W
              </button>
            </div>
          </div>

          {/* Scanned Document Canvas Area with Bounding Boxes */}
          <div className="relative bg-[#334155] p-4 min-h-[580px] max-h-[700px] overflow-auto flex items-center justify-center">
            <div 
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
              className={`relative bg-[#fffdf8] border-2 border-slate-700 shadow-2xl p-6 transition-all duration-150 select-none ${
                highContrast ? 'high-contrast-mode' : ''
              }`}
            >
              {/* Document Background Canvas */}
              <div className="w-[500px] sm:w-[580px] flex flex-col gap-4 text-slate-900 font-serif">
                {/* Official Revenue Board Top Watermark */}
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src={OFFICIAL_ASSETS.seal} 
                      alt="Watermark Seal" 
                      className="w-10 h-10 object-contain opacity-70"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider">उत्तर प्रदेश शासन - राजस्व परिषद</div>
                      <div className="text-[10px] text-slate-700">बोर्ड ऑफ रेवेन्यू, उत्तर प्रदेश • प्रपत्र खतौनी (अधिकार अभिलेख)</div>
                    </div>
                  </div>
                  <div className="text-right text-[10px] font-mono">
                    <div>तहसील: मवाना</div>
                    <div>परगना: हस्तिनापुर</div>
                    <div>ग्राम: हस्तिनापुर (0921)</div>
                  </div>
                </div>

                {/* Ledger Columns Header */}
                <div className="grid grid-cols-4 border-2 border-slate-900 text-center font-bold text-[11px] bg-amber-50/50">
                  <div className="border-r-2 border-slate-900 py-1">१. खाता संख्या</div>
                  <div className="border-r-2 border-slate-900 py-1">२. खसरा संख्या</div>
                  <div className="border-r-2 border-slate-900 py-1">३. खातेदार का नाम व निवास</div>
                  <div className="py-1">४. क्षेत्रफल (हेक्टेयर)</div>
                </div>

                {/* Ledger Content Row with Bounding Boxes */}
                <div className="relative grid grid-cols-4 border-2 border-slate-900 min-h-[300px] text-xs">
                  {/* Col 1: Khata */}
                  <div className="relative border-r-2 border-slate-900 p-3 text-center font-mono font-bold flex flex-col items-center justify-start gap-1">
                    <span className="text-lg">१०२</span>
                    <span className="text-[10px] text-slate-500 font-sans">(102)</span>
                    
                    {/* Bounding Box 1 */}
                    <div 
                      onClick={() => setActiveBox('khata')}
                      className={`absolute inset-2 border-2 rounded cursor-pointer transition-all ${
                        activeBox === 'khata'
                          ? 'border-blue-600 bg-blue-500/20 ring-2 ring-blue-400'
                          : 'border-[#1E3A8A]/50 hover:border-[#1E3A8A] hover:bg-blue-500/20 hover:shadow-md hover:scale-[1.02] transition-all duration-300'
                      }`}
                    >
                      <span className="absolute -top-3 left-1 bg-blue-700 text-white text-[9px] font-medium px-1.5 py-0.5 rounded font-sans">
                        Khata • 92%
                      </span>
                    </div>
                  </div>

                  {/* Col 2: Khasra */}
                  <div className="relative border-r-2 border-slate-900 p-3 text-center font-mono font-bold flex flex-col items-center justify-start gap-1">
                    <span className="text-lg">७८९</span>
                    <span className="text-[10px] text-slate-500 font-sans">(789)</span>

                    {/* Bounding Box 2 */}
                    <div 
                      onClick={() => setActiveBox('khasra')}
                      className={`absolute inset-2 border-2 rounded cursor-pointer transition-all ${
                        activeBox === 'khasra'
                          ? 'border-blue-600 bg-blue-500/20 ring-2 ring-blue-400'
                          : 'border-[#1E3A8A]/50 hover:border-[#1E3A8A] hover:bg-blue-500/20 hover:shadow-md hover:scale-[1.02] transition-all duration-300'
                      }`}
                    >
                      <span className="absolute -top-3 left-1 bg-blue-700 text-white text-[9px] font-medium px-1.5 py-0.5 rounded font-sans">
                        Khasra • 72%
                      </span>
                    </div>
                  </div>

                  {/* Col 3: Landowner */}
                  <div className="relative border-r-2 border-slate-900 p-3 flex flex-col justify-start gap-1">
                    <p className="font-bold text-sm leading-tight text-slate-900">
                      राजेश कुमार सिंह <br />
                      <span className="text-xs font-normal">पुत्र राम स्वरूप सिंह</span>
                    </p>
                    <p className="text-[10px] text-slate-600 italic">
                      निवासी ग्राम हस्तिनापुर
                    </p>

                    {/* Bounding Box 3 */}
                    <div 
                      onClick={() => setActiveBox('owner')}
                      className={`absolute inset-2 border-2 rounded cursor-pointer transition-all ${
                        activeBox === 'owner'
                          ? 'border-emerald-600 bg-emerald-500/20 ring-2 ring-emerald-400'
                          : 'border-emerald-600/50 hover:border-emerald-600 hover:bg-emerald-500/20 hover:shadow-md hover:scale-[1.02] transition-all duration-300'
                      }`}
                    >
                      <span className="absolute -top-3 left-1 bg-emerald-700 text-white text-[9px] font-medium px-1.5 py-0.5 rounded font-sans">
                        Owner Name • 96%
                      </span>
                    </div>
                  </div>

                  {/* Col 4: Area (Ambiguous annotation demonstration) */}
                  <div className="relative p-3 text-center flex flex-col items-center justify-start gap-2">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-red-700 line-through font-mono">२.८५</span>
                      <span className="text-base font-bold font-mono text-slate-900">२.४५०</span>
                      <span className="text-[10px] text-slate-500 font-sans">(2.450 Ha)</span>
                    </div>

                    {/* Bounding Box 4 (Ambiguous Warning) */}
                    <div 
                      onClick={() => setActiveBox('area')}
                      className={`absolute inset-2 border-2 border-dashed rounded cursor-pointer transition-all ${
                        activeBox === 'area'
                          ? 'border-amber-600 bg-amber-500/25 ring-2 ring-amber-400'
                          : 'border-amber-500/60 hover:border-amber-600 hover:bg-amber-500/20 hover:shadow-md hover:scale-[1.02] transition-all duration-300'
                      }`}
                    >
                      <span className="absolute -top-3 left-1 bg-amber-600 text-white text-[9px] font-medium px-1.5 py-0.5 rounded font-sans whitespace-nowrap">
                        Area • 51% (Ambiguous)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-Registrar / Patwari Stamp Footer */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-slate-900 text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="p-1 border border-slate-400 font-mono">AUDIT-HASH-SHA256: 9812A4B8</span>
                    <span className="text-slate-600 font-sans">Verified by Sub-Divisional Magistrate (SDM)</span>
                  </div>
                  <div className="font-bold">
                    हस्ताक्षर राजस्व निरीक्षक / लेखपाल
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left Pane Footer Status */}
          <div className="p-3 bg-slate-50 border-t border-[#cbd5e1] flex items-center justify-between text-[11px] text-slate-600">
            <span>OCR Multi-Script Engine: Kaithi / Modi / Devanagari v3.4</span>
          </div>
        </div>

        {/* RIGHT PANE: 6 Cols (Structured Entity Extraction Form) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Validation Status Banner */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <div>
                <h4 className="font-serif-gov text-base font-bold text-[#0f172a]">
                  Cross-Database Validation Passed
                </h4>
                <p className="text-xs text-slate-600">
                  Record matches UP Bhulekh registry and WGS84 drone-orthorectified boundaries
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded border border-emerald-300">
              {parcel.syncBadge}
            </span>
          </div>

          {/* Section 1: Landowner & Identity Record */}
          <div className={`bg-white border rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 ${
            activeBox === 'owner' ? 'border-[#1E3A8A] ring-2 ring-blue-100' : 'border-[#cbd5e1]'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <h3 className="font-serif-gov text-base font-bold text-[#0f172a]">
                1. Landowner & Identity Record
              </h3>
              <span className="text-[10px] font-medium bg-blue-50 text-[#1E3A8A] border border-blue-200 px-2 py-0.5 rounded">
                Linked via Aadhaar e-KYC
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block">
                  Extracted Primary Owner (English)
                </label>
                <input
                  type="text"
                  readOnly
                  value={parcel.owner}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:ring-2 focus:border-[#1E3A8A] transition-all font-bold text-[#0f172a]"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block">
                  Regional Script (Devanagari)
                </label>
                <input
                  type="text"
                  readOnly
                  value={parcel.ownerHindi}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:ring-2 focus:border-[#1E3A8A] transition-all font-bold text-[#0f172a]"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block">
                  Parentage / Relation
                </label>
                <input
                  type="text"
                  readOnly
                  value={parcel.relation}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:ring-2 focus:border-[#1E3A8A] transition-all text-slate-700"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block">
                  Aadhaar Reference Token
                </label>
                <input
                  type="text"
                  readOnly
                  value="UID-TOK-UP-2026-8819-SEC"
                  className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:ring-2 focus:border-[#1E3A8A] transition-all font-mono text-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Cadastral Parcel Identifiers */}
          <div className={`bg-white border rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 ${
            activeBox === 'khata' || activeBox === 'khasra' ? 'border-[#1E3A8A] ring-2 ring-blue-100' : 'border-[#cbd5e1]'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <h3 className="font-serif-gov text-base font-bold text-[#0f172a]">
                2. Cadastral Parcel Identifiers
              </h3>
              <span className="text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                Cadastral Match
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block">
                  Khasra Number
                </label>
                <input
                  type="text"
                  readOnly
                  value={parcel.khasra}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:ring-2 focus:border-[#1E3A8A] transition-all font-mono font-bold text-[#0f172a]"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block">
                  Khatauni Khata Number
                </label>
                <input
                  type="text"
                  readOnly
                  value={parcel.khata}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:ring-2 focus:border-[#1E3A8A] transition-all font-mono font-bold text-[#0f172a]"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block">
                  Survey Sheet Reference
                </label>
                <input
                  type="text"
                  readOnly
                  value={parcel.surveyRef}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:ring-2 focus:border-[#1E3A8A] transition-all text-slate-700 truncate"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">
                  Unique Land Parcel Identifier (14-Digit ULPIN)
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    readOnly
                    value={parcel.ulpin}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-mono font-bold text-[#1E3A8A]"
                  />
                  <span className="px-2 py-1 bg-slate-200 text-slate-700 text-[10px] font-medium rounded">
                    Geo-Locked
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Area & Boundary Observation */}
          <div className={`bg-white border rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 ${
            activeBox === 'area' ? 'border-amber-500 ring-2 ring-amber-100' : 'border-[#cbd5e1]'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <h3 className="font-serif-gov text-base font-bold text-[#0f172a]">
                3. Area &amp; Boundary Observation
              </h3>
              <span className="text-[10px] font-medium bg-amber-50 text-amber-900 border border-amber-300 px-2 py-0.5 rounded">
                Review Notice: Strike-Through Resolved
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Recorded Area (Khatauni)
                </span>
                <span className="font-serif-gov text-lg font-bold text-[#0f172a] block">
                  {parcel.recArea}
                </span>
                <span className="text-[10px] text-slate-500">
                  Confirmed from 1984 Settlement Folio
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Calculated GIS Area (WGS84)
                </span>
                <span className="font-serif-gov text-lg font-bold text-[#1E3A8A] block">
                  {parcel.gisArea}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">
                  Variance: {parcel.variance} (Within ±0.005 Ha Tolerance)
                </span>
              </div>

              <div className="sm:col-span-2 text-[11px] text-slate-500 bg-amber-50/60 p-2.5 rounded border border-amber-200">
                <span className="font-bold text-amber-900 block mb-0.5">Redressal Note:</span>
                Prior strike-through correction (2.85 to 2.450 Ha) audited under Section 38 of UP Revenue Code 2006. Validated by Tehsildar Mawana under gazetted order #REV-2025-UP-918.
              </div>
            </div>
          </div>

          {/* Sticky Bottom Action Controls */}
          <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-xs border border-[#cbd5e1] rounded-xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-700 font-semibold">
                Title Status: <strong className="text-[#0f172a]">{parcel.titleStatus}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleDispute(parcel.khasra)}
                className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-medium font-serif-gov text-amber-700 bg-white border border-amber-600 rounded-md transition-all duration-300 hover:bg-amber-600 hover:text-white hover:shadow-md hover:scale-[1.02]"
              >
                Raise Boundary Dispute
              </button>
              <button
                onClick={() => onDownloadNakal(parcel.khasra)}
                className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-medium font-serif-gov text-white bg-[#1E3A8A] hover:bg-[#152b66] rounded-md transition-colors shadow-xs"
              >
                Download Certified PDF (RoR)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
