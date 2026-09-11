import React from 'react';
import { PARCELS, OFFICIAL_ASSETS } from '../data/mockData';

interface Props {
  isOpen: boolean;
  khasra: string;
  onClose: () => void;
}

export const CertifiedNakalModal: React.FC<Props> = ({
  isOpen,
  khasra,
  onClose
}) => {
  if (!isOpen) return null;
  const parcel = PARCELS[khasra] || PARCELS['789'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1d]/80 backdrop-blur-xs p-4 overflow-y-auto font-sans-gov">
      <div className="relative w-full max-w-3xl bg-white border border-[#cbd5e1] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Modal Top Bar */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <img 
              src={OFFICIAL_ASSETS.seal} 
              alt="Seal" 
              className="w-8 h-8 rounded-full border border-slate-400"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-serif-gov text-base font-bold">
                अधिकार अभिलेख (खतौनी नकल) • Certified Electronic RoR Extract
              </span>
              <span className="text-[11px] text-slate-300 block">
                Issued under Section 31 of UP Revenue Code 2006 & DILRMP 2.0
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold p-1 text-base"
          >
            ✕
          </button>
        </div>

        {/* Certificate Body (Official Document Layout) */}
        <div className="p-8 flex flex-col gap-6 text-slate-900 bg-[#fffdfa] border-b border-slate-200">
          {/* Header of Nakal */}
          <div className="text-center flex flex-col items-center gap-1 border-b-2 border-slate-900 pb-4">
            <img 
              src={OFFICIAL_ASSETS.emblem} 
              alt="Emblem" 
              className="h-16 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <h2 className="font-serif-gov text-xl font-bold uppercase tracking-wide">
              उत्तर प्रदेश शासन - राजस्व परिषद
            </h2>
            <h3 className="font-serif-gov text-base font-bold text-[#0f172a]">
              प्रपत्र खतौनी (अधिकार अभिलेख) नकल
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-700 mt-1 font-medium">
              <span>जनपद: <strong>{parcel.district}</strong></span>
              <span>•</span>
              <span>तहसील: <strong>{parcel.subDistrict}</strong></span>
              <span>•</span>
              <span>ग्राम: <strong>हस्तिनापुर (0921)</strong></span>
            </div>
          </div>

          {/* Certificate Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100 p-3 rounded-lg border border-slate-300 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">14-Digit ULPIN</span>
              <span className="font-mono font-bold text-[#1E3A8A]">{parcel.ulpin}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">खसरा संख्या</span>
              <span className="font-mono font-bold text-[#0f172a]">{parcel.khasra}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">खाता संख्या</span>
              <span className="font-mono font-bold text-[#0f172a]">{parcel.khata}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">कुल रकबा</span>
              <span className="font-bold text-[#0f172a]">{parcel.recArea}</span>
            </div>
          </div>

          {/* Official RoR Table */}
          <div className="border-2 border-slate-900 rounded overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-amber-100/60 border-b-2 border-slate-900 font-bold text-center">
                <tr>
                  <th className="py-2 px-3 border-r-2 border-slate-900 w-1/4">खातेदार का नाम व निवास</th>
                  <th className="py-2 px-3 border-r-2 border-slate-900 w-1/4">भोमत्व अधिकार श्रेणी</th>
                  <th className="py-2 px-3 border-r-2 border-slate-900 w-1/4">खसरा संख्या व क्षेत्रफल</th>
                  <th className="py-2 px-3 w-1/4">आदेश व टिप्पणी (Mutation)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 font-sans-gov">
                <tr>
                  <td className="p-3 border-r-2 border-slate-900">
                    <p className="font-bold text-sm text-[#0f172a]">{parcel.owner}</p>
                    <p className="text-slate-600 font-hindi">{parcel.ownerHindi}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{parcel.relation}</p>
                    <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-2 inline-block">
                      Aadhaar Seeded
                    </span>
                  </td>
                  <td className="p-3 border-r-2 border-slate-900">
                    <p className="font-bold text-[#0f172a]">{parcel.titleStatus}</p>
                    <span className="text-[10px] text-slate-500">Non-Agricultural Exemption: Nil</span>
                  </td>
                  <td className="p-3 border-r-2 border-slate-900">
                    <p className="font-mono font-bold text-sm">खसरा: {parcel.khasra}</p>
                    <p className="font-bold text-slate-800 mt-1">{parcel.recArea}</p>
                    <p className="text-[10px] text-slate-500">GIS Geometry: {parcel.gisArea}</p>
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-[#0f172a]">{parcel.mutation}</p>
                    <p className="text-[11px] text-slate-600 mt-1">
                      नामान्तरण आदेश दिनांक: {parcel.verifiedDate}
                    </p>
                    <p className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded inline-block font-medium mt-1">
                      Title Clear — No Encumbrance
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bottom Endorsement & Digital Signature Seal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-slate-900 text-xs">
            {/* QR Code Verification Box */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-slate-900 text-white flex items-center justify-center font-mono font-medium text-[9px] p-1 text-center rounded border border-slate-400">
                NIC QR Verified
              </div>
              <div>
                <span className="font-bold block text-[#0f172a]">Scan for Live Verification</span>
                <span className="text-[10px] text-slate-500 block font-mono">DoLR-UP-MRT-2026-CERT-9812</span>
                <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-medium">256-Bit Encrypted</span>
              </div>
            </div>

            {/* Digital Signature Box */}
            <div className="p-3 bg-blue-50 border border-blue-300 rounded-lg text-right text-xs">
              <span className="text-[10px] font-bold text-blue-900 uppercase block">
                Digitally Signed by Authority
              </span>
              <span className="font-bold text-[#0f172a] block">Officer Sharma (Tehsildar Grade A)</span>
              <span className="text-[11px] text-slate-600 block">Tehsil Mawana, District Meerut</span>
              <span className="text-[10px] font-mono text-slate-500 block">Date: 2026-03-09 09:41:22 IST</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">
            Certified true copy under Information Technology Act, 2000.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium rounded-md transition-colors font-serif-gov"
            >
              Print Nakal
            </button>
            <button
              onClick={() => {
                alert(`Downloaded RoR Nakal PDF for Khasra ${parcel.khasra} (ULPIN: ${parcel.ulpin}) with digital DSC cryptographic stamp.`);
                onClose();
              }}
              className="px-5 py-2 bg-[#1E3A8A] hover:bg-[#152b66] text-white font-medium rounded-md transition-colors shadow-xs font-serif-gov"
            >
              Download Certified PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
