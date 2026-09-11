import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface Props {
  onSuccessfulSubmission: (refId: string) => void;
}

export const PropertyRegistrationView: React.FC<Props> = ({
  onSuccessfulSubmission
}) => {
  const [deedType, setDeedType] = useState('Sale Deed (Bikri Patra)');
  const [ulpinInput, setUlpinInput] = useState('14592039485721');
  const [eStampNumber, setEStampNumber] = useState('IN-UP9810248102914K');
  const [sroCode, setSroCode] = useState('SRO-MAW-04 (Mawana Sub-District)');
  const [hasConsent1, setHasConsent1] = useState(true);
  const [hasConsent2, setHasConsent2] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    pages: number;
    hash: string;
  } | null>({
    name: 'Sale_Deed_Khasra_789_Mawana_Registered_2026.pdf',
    size: '8.4 MB',
    pages: 14,
    hash: 'SHA-256: 4f9e1b2c3d8a7f6e0b2a9128cf341098'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsent1 || !hasConsent2) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = 'ADH-UP-2026-' + Math.floor(10000 + Math.random() * 90000);
      setSubmittedRef(generatedRef);
      onSuccessfulSubmission(generatedRef);
    }, 800);
  };

  return (
    <div id="property-registration" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col gap-6 font-sans-gov">
      {/* Header */}
      <div className="border-b border-[#cbd5e1] pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>DILRMP Registration Linkage</span>
          <span>/</span>
          <span>NGDRS Gateway</span>
          <span>/</span>
          <span className="font-bold text-[#0f172a]">e-Deed Verification</span>
        </div>
        <h1 className="font-serif-gov text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
          Property Registration & Deed Modernization
        </h1>
        <p className="text-xs text-slate-500">
          Seamless National Generic Document Registration System (NGDRS) interoperability for instant cadastral validation
        </p>
      </div>

      {submittedRef && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <div className="font-serif-gov text-lg font-bold text-emerald-900">
              Deed Ingested Successfully! Reference #{submittedRef}
            </div>
            <p className="text-xs text-emerald-800">
              Your registered deed has been dispatched to the Revenue Inspector workbench for automated OCR entity extraction.
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-md font-serif-gov">
            Dispatched to Queue
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Section 1: Verified Citizen Identity & Cadastral Clearance */}
        <div className="bg-white border border-[#cbd5e1] rounded-xl p-6 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                1. Verified Citizen Identity &amp; Cadastral Clearance
              </h2>
              <p className="text-xs text-slate-500">
                Data pre-populated from UIDAI e-Pramaan authentication
              </p>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
              e-Pramaan / Aadhaar Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#0f172a] block mb-1">Target State</label>
              <input 
                type="text" 
                readOnly 
                value="Uttar Pradesh (State Code: 09)" 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-[#0f172a] block mb-1">District &amp; Tehsil</label>
              <input 
                type="text" 
                readOnly 
                value="Meerut • Mawana Sub-Division" 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-[#0f172a] block mb-1">
                Target 14-Digit ULPIN (Bhu-Aadhaar)
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={ulpinInput}
                  onChange={(e) => setUlpinInput(e.target.value)}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 font-mono font-bold text-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] focus:outline-none"
                />
                <span className="absolute right-2 top-2 text-[10px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Match
                </span>
              </div>
            </div>

            <div>
              <label className="font-bold text-[#0f172a] block mb-1">Deed Category</label>
              <select
                value={deedType}
                onChange={(e) => setDeedType(e.target.value)}
                className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-1 focus:ring-[#1E3A8A] focus:outline-none"
              >
                <option>Sale Deed (Bikri Patra)</option>
                <option>Partition Deed (Batwara Patra)</option>
                <option>Gift Deed (Daan Patra)</option>
                <option>Succession / Warisan Transfer</option>
                <option>Mortgage Clearance Release</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[#0f172a] block mb-1">e-Stamp Certificate Number</label>
              <input 
                type="text" 
                value={eStampNumber}
                onChange={(e) => setEStampNumber(e.target.value)}
                className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 font-mono text-[#0f172a] focus:ring-1 focus:ring-[#1E3A8A] focus:outline-none uppercase"
              />
            </div>

            <div>
              <label className="font-bold text-[#0f172a] block mb-1">Sub-Registrar Office (SRO)</label>
              <input 
                type="text" 
                value={sroCode}
                onChange={(e) => setSroCode(e.target.value)}
                className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-1 focus:ring-[#1E3A8A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Secure Deed Document Upload */}
        <div className="bg-white border border-[#cbd5e1] rounded-xl p-6 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-serif-gov text-lg font-bold text-[#0f172a]">
                2. Secure Deed Document Upload
              </h2>
              <p className="text-xs text-slate-500">
                Uploaded files are stored in an ISO 27001 certified tamper-evident government vault
              </p>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-medium bg-blue-50 text-[#1E3A8A] border border-blue-200 rounded">
              ISO 27001 Vault
            </span>
          </div>

          {/* Upload Dropzone */}
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files?.[0]) {
                const f = e.dataTransfer.files[0];
                setUploadedFile({
                  name: f.name,
                  size: (f.size / (1024 * 1024)).toFixed(1) + ' MB',
                  pages: 12,
                  hash: 'SHA-256: 7d9a1f2c3b8e4f1a5b8c9d0e'
                });
              }
            }}
            className="border-2 border-dashed border-slate-300 hover:border-[#1E3A8A] rounded-xl p-8 bg-[#f8fafc] text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.pdf';
              input.onchange = (e) => {
                const target = e.target as HTMLInputElement;
                if (target.files?.[0]) {
                  const f = target.files[0];
                  setUploadedFile({
                    name: f.name,
                    size: (f.size / (1024 * 1024)).toFixed(1) + ' MB',
                    pages: 14,
                    hash: 'SHA-256: 4f9e1b2c3d8a7f6e0b2a9128'
                  });
                }
              };
              input.click();
            }}
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1E3A8A] flex items-center justify-center border border-blue-200 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-6 h-6 text-[#1E3A8A]" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#0f172a]">
              Drag and drop your registered deed PDF, or click to browse
            </p>
            <span className="text-[11px] text-slate-500">
              Supports scanned PDFs up to 25 MB • Optical Character Recognition (OCR) will extract Kaithi, Modi, and Devanagari text
            </span>
          </div>

          {/* Active File Card */}
          {uploadedFile && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 font-bold flex items-center justify-center text-xs border border-red-200">
                  PDF
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#0f172a]">{uploadedFile.name}</span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span>{uploadedFile.size}</span>
                    <span>•</span>
                    <span>{uploadedFile.pages} Pages</span>
                    <span>•</span>
                    <span className="text-emerald-800 font-medium">Virus Scan Passed</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{uploadedFile.hash}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => alert(`Document Preview:\n${uploadedFile.name}\n${uploadedFile.hash}\n\nAll cryptographic signatures verified.`)}
                  className="px-3 py-1.5 border border-slate-300 rounded-md font-medium text-slate-700 hover:bg-white font-serif-gov transition-colors text-xs"
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => setUploadedFile(null)}
                  className="px-3 py-1.5 border border-red-200 text-red-700 hover:bg-red-50 rounded-md font-medium font-serif-gov transition-colors text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Checkpoints & Submit */}
        <div className="bg-white border border-[#cbd5e1] rounded-xl p-6 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-serif-gov text-lg font-bold text-[#0f172a]">
              3. Statutory Declarations & Verification Checkpoints
            </h2>
            <p className="text-xs text-slate-500">
              Enforced under Section 65B of Indian Evidence Act and DILRMP SOP v3.2
            </p>
          </div>

          <div className="flex flex-col gap-3 text-xs text-slate-700">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input 
                type="checkbox" 
                checked={hasConsent1}
                onChange={(e) => setHasConsent1(e.target.checked)}
                className="mt-0.5 accent-[#1E3A8A] w-4 h-4 rounded"
                required
              />
              <span>
                I hereby declare that the attached deed represents an authentic registered instrument and give consent for automated OCR extraction, spatial cadastral overlap verification, and Aadhaar-ULPIN cross-seeding.
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input 
                type="checkbox" 
                checked={hasConsent2}
                onChange={(e) => setHasConsent2(e.target.checked)}
                className="mt-0.5 accent-[#1E3A8A] w-4 h-4 rounded"
                required
              />
              <span>
                I affirm that this parcel does not have any pending judicial stay orders under Section 229B / Section 144 of the UP Revenue Code, and all title assertions are made under penalty of law.
              </span>
            </label>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => alert('Draft saved successfully in your local Digital Locker.')}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 rounded-md font-medium text-slate-700 hover:bg-slate-50 font-serif-gov transition-colors text-xs"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !uploadedFile}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#1E3A8A] hover:bg-[#152b66] text-white font-medium rounded-md font-serif-gov transition-colors text-xs shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? 'Ingesting into Revenue Pipeline...' : 'Submit Deed for Cadastral & OCR Verification'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
