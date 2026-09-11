import React from 'react';
import { CitizenView } from '../../types';

interface Props {
  onNavigate: (view: CitizenView) => void;
  onSelectParcel: (khasra: string) => void;
}

export const CitizenProfileView: React.FC<Props> = ({
  onNavigate,
  onSelectParcel
}) => {
  return (
    <div id="citizen-profile" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col gap-6 font-sans-gov">
      {/* Header */}
      <div className="border-b border-[#cbd5e1] pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Digital Locker Registry</span>
          <span>/</span>
          <span>Citizen Identity</span>
          <span>/</span>
          <span className="font-bold text-[#0f172a]">Kartik Jain (KJ-2026-UP)</span>
        </div>
        <h1 className="font-serif-gov text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
          Citizen Land Locker & Verified Identity Dossier
        </h1>
        <p className="text-xs text-slate-500">
          Aadhaar e-KYC and Jan Parichay authorized credentials linked to national land registries
        </p>
      </div>

      {/* Grid: Identity Card + Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col: Identity Card (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-[#cbd5e1] rounded-xl p-6 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-5">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
            <div className="w-16 h-16 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-2xl shadow-md border-2 border-slate-200">
              KJ
            </div>
            <div>
              <h3 className="font-serif-gov text-xl font-bold text-[#0f172a]">
                Kartik Jain
              </h3>
              <span className="text-xs text-slate-500 block">
                UIDAI ID: XXXX-XXXX-4102
              </span>
              <span className="mt-1 inline-block px-2 py-0.5 text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-300 rounded">
                Aadhaar e-KYC Verified
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Date of Birth:</span>
              <span className="font-bold text-[#0f172a]">29 May 2006</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Gender:</span>
              <span className="font-bold text-[#0f172a]">Male</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Registered Mobile:</span>
              <span className="font-mono font-bold text-[#0f172a]">+91 98XXXXXX45</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Email Address:</span>
              <span className="font-bold text-[#0f172a]">kartik.jain@gov-connect.in</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Primary Domicile:</span>
              <span className="font-bold text-[#0f172a]">Uttar Pradesh (09)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">e-Pramaan Token:</span>
              <span className="font-mono text-emerald-800 font-medium">Active till 2028</span>
            </div>
          </div>

          {/* Scheme Linkages */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-2 text-xs">
            <span className="font-bold text-[#0f172a] text-[11px] uppercase tracking-wider">
              Integrated Welfare Portals
            </span>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">DigiLocker Land Sync:</span>
              <span className="font-medium text-emerald-800">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">PM-KISAN DBT Beneficiary:</span>
              <span className="font-medium text-emerald-800">Enrolled</span>
            </div>
          </div>
        </div>

        {/* Right Col: Authorized ULPIN Portfolio Table (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-6 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif-gov text-xl font-bold text-[#0f172a]">
                  Authorized Land Parcel Portfolio
                </h3>
                <p className="text-xs text-slate-500">
                  Cadastral land parcels locked and verified in your digital portfolio
                </p>
              </div>
              <button
                onClick={() => onNavigate('registration')}
                className="px-3 py-1.5 bg-[#1E3A8A] text-white text-xs font-medium font-serif-gov rounded-md hover:bg-blue-900 transition-colors shadow-xs"
              >
                + Link New Parcel
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-[#0f172a] uppercase text-[10px] tracking-wider font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Khasra / Plot</th>
                    <th className="py-2.5 px-3">14-Digit ULPIN</th>
                    <th className="py-2.5 px-3">Village / Tehsil</th>
                    <th className="py-2.5 px-3">Area</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer">
                    <td className="py-3 px-3 font-bold text-[#0f172a]">
                      Khasra 789
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#1E3A8A] font-bold">
                      UP-MRT-2026-981240
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      Hastinapur, Mawana
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#0f172a]">
                      2.450 Ha
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded text-[10px] font-medium">
                        Verified
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          onSelectParcel('789');
                          onNavigate('webgis');
                        }}
                        className="text-xs font-medium text-slate-600 transition-colors duration-200 hover:text-[#1E3A8A] hover:underline underline-offset-4"
                      >
                        View Map
                      </button>
                    </td>
                  </tr>

                  <tr className="transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer">
                    <td className="py-3 px-3 font-bold text-[#0f172a]">
                      Khasra 422/A
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#1E3A8A] font-bold">
                      UP-MRT-2026-441092
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      Hastinapur, Mawana
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#0f172a]">
                      0.820 Ha
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded text-[10px] font-medium">
                        Verified
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          onSelectParcel('422/A');
                          onNavigate('webgis');
                        }}
                        className="text-xs font-medium text-slate-600 transition-colors duration-200 hover:text-[#1E3A8A] hover:underline underline-offset-4"
                      >
                        View Map
                      </button>
                    </td>
                  </tr>

                  <tr className="transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer">
                    <td className="py-3 px-3 font-bold text-[#0f172a]">
                      Khasra 108
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-500">
                      14592039485721
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      Mawana Kalan
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#0f172a]">
                      1.150 Ha
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-300 rounded text-[10px] font-medium">
                        Mutation Pending
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onNavigate('tracking')}
                        className="text-xs font-medium text-amber-900 hover:underline"
                      >
                        Track
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
