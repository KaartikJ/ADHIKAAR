import React, { useState } from 'react';

export const OfficerProfileView: React.FC = () => {
  const [email, setEmail] = useState('officer.sharma@up.nic.in');
  const [phone, setPhone] = useState('+91 94120XXXXX');
  const [authMethod, setAuthMethod] = useState('Hardware USB DSC Token + Jan Parichay 2FA');
  const [alertFrequency, setAlertFrequency] = useState('Immediate for &lt;70% OCR flags');
  const [requireBiometrics, setRequireBiometrics] = useState(true);
  const [requireDSCOverride, setRequireDSCOverride] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div id="officer-profile" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col gap-6 font-sans-gov">
      {/* Header */}
      <div className="border-b border-[#cbd5e1] pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Revenue Administration</span>
          <span>/</span>
          <span>Credential Directory</span>
          <span>/</span>
          <span className="font-bold text-[#0f172a]">Officer Sharma (GOI-UP-REV-84920)</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
          <h1 className="font-serif-gov text-2xl sm:text-3xl font-bold text-[#0f172a]">
            Officer Profile & Revenue Clearance Credentials
          </h1>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-md text-xs font-medium w-fit">
            Active Clearance - DILRMP Secure
          </span>
        </div>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-900 font-bold flex items-center justify-between">
          <span>Settings and Security Credentials saved successfully to NIC Central Directory!</span>
          <span className="text-[10px] text-emerald-700 font-medium">Synced</span>
        </div>
      )}

      {/* Main Grid: Jurisdiction + Security Clearance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Territorial Jurisdiction */}
        <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
              Territorial Jurisdiction
            </h3>
            <p className="text-xs text-slate-500">
              Assigned geographic jurisdiction for cadastral verification and mutation clearance
            </p>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Assigned State:</span>
              <span className="font-bold text-[#0f172a]">Uttar Pradesh (09)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Revenue District:</span>
              <span className="font-bold text-[#0f172a]">Meerut</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Sub-Division / Tehsil:</span>
              <span className="font-bold text-[#0f172a]">Mawana & Hastinapur Blocks</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Tehsil Node ID:</span>
              <span className="font-mono font-bold text-[#1E3A8A]">UP-MAW-2026-99</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Cadastral Plots in Charge:</span>
              <span className="font-bold text-[#0f172a]">14,892 Verified Plots</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Gazetted Order Ref:</span>
              <span className="font-mono text-slate-700">REV-GO-412/2024 (DoLR)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Security & Verification Clearance */}
        <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
              Security & Verification Clearance
            </h3>
            <p className="text-xs text-slate-500">
              Role-Based Access Control (RBAC) levels and cryptographic keys
            </p>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Access Tier:</span>
              <span className="font-bold text-[#1E3A8A]">Level 3 RBAC - Tehsildar</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">DILRMP Master Write:</span>
              <span className="font-medium text-emerald-800">Authorized</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Cadastral Geometry Override:</span>
              <span className="font-medium text-emerald-800">Authorized</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Digital Signature Token (DSC):</span>
              <span className="font-mono text-slate-800">e-Mudhra Serial #DSC-89104-UP</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">DSC Certificate Expiry:</span>
              <span className="font-bold text-slate-700">18 Oct 2027 (Valid)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">2-Factor Authentication:</span>
              <span className="font-medium text-emerald-800">Mandatory - Enforced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Audit & Processing Metrics */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-3">
        <h3 className="font-serif-gov text-lg font-bold text-[#0f172a] border-b border-slate-100 pb-2">
          Operational Audit &amp; Performance Metrics (Quarter 1, 2026)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-1">
            <span className="text-slate-500 uppercase text-[10px] font-bold">Total Records Verified</span>
            <span className="font-serif-gov text-2xl font-bold text-[#0f172a]">1,284</span>
            <span className="text-emerald-800 font-medium text-[11px]">Completed 100% of SLA</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-1">
            <span className="text-slate-500 uppercase text-[10px] font-bold">Average Verification Accuracy</span>
            <span className="font-serif-gov text-2xl font-bold text-[#1E3A8A]">98.4%</span>
            <span className="text-slate-500 text-[11px]">Optimal Quality Audit</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-1">
            <span className="text-slate-500 uppercase text-[10px] font-bold">Pending Action Queue</span>
            <span className="font-serif-gov text-2xl font-bold text-red-700">18 Records</span>
            <span className="text-red-700 font-medium text-[11px]">Action Required Today</span>
          </div>
        </div>
      </div>

      {/* Profile & Security Settings Form */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl p-6 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-serif-gov text-xl font-bold text-[#0f172a]">
            Profile & Security Settings
          </h3>
          <p className="text-xs text-slate-500">
            Configure authentication preferences, notification routing, and cryptographic signing defaults
          </p>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#0f172a] block mb-1">Official NIC Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-[#0f172a] font-mono focus:ring-1 focus:ring-[#1E3A8A]"
              />
            </div>

            <div>
              <label className="font-bold text-[#0f172a] block mb-1">Registered Mobile Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-[#0f172a] font-mono focus:ring-1 focus:ring-[#1E3A8A]"
              />
            </div>

            <div>
              <label className="font-bold text-[#0f172a] block mb-1">Primary Authentication Method</label>
              <input
                type="text"
                value={authMethod}
                onChange={(e) => setAuthMethod(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:ring-1 focus:ring-[#1E3A8A]"
              />
            </div>

            <div>
              <label className="font-bold text-[#0f172a] block mb-1">Alert Notification Frequency</label>
              <input
                type="text"
                value={alertFrequency}
                onChange={(e) => setAlertFrequency(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:ring-1 focus:ring-[#1E3A8A]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={requireBiometrics}
                onChange={(e) => setRequireBiometrics(e.target.checked)}
                className="accent-[#1E3A8A] w-4 h-4 rounded"
              />
              <span>Require biometric confirmation for boundary modification requests &gt;0.05 Ha</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={requireDSCOverride}
                onChange={(e) => setRequireDSCOverride(e.target.checked)}
                className="accent-[#1E3A8A] w-4 h-4 rounded"
              />
              <span>Enforce hardware USB DSC token presence for any record override</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => alert('Changes discarded.')}
              className="px-4 py-2 text-xs font-medium border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 font-serif-gov transition-colors"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-medium bg-[#1E3A8A] hover:bg-[#152b66] text-white rounded-md font-serif-gov transition-colors shadow-xs"
            >
              Save Settings &amp; Security Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
