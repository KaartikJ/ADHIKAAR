import React, { useState } from 'react';
import { AUDIT_LOGS } from '../../data/mockData';

export const AuditLogsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SUCCESS' | 'DENIED'>('ALL');
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const filteredLogs = AUDIT_LOGS.filter((log) => {
    const matchesSearch = 
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm) ||
      log.checksum.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div id="immutable-audit-logs" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col gap-6 font-sans-gov">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#cbd5e1] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Security & Compliance</span>
            <span>/</span>
            <span>Tamper-Evident Ledger</span>
            <span>/</span>
            <span className="font-bold text-[#0f172a]">Access Telemetry</span>
          </div>
          <h1 className="font-serif-gov text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
            Immutable Audit & Access Logs
          </h1>
          <p className="text-xs text-slate-500">
            Chronological cryptographic ledger tracking all Aadhaar authorizations, deed views, and portal downloads
          </p>
        </div>

        <button
          onClick={() => alert('Downloading digitally signed Section 65B Audit Certificate (PDF)...')}
          className="px-4 py-2.5 bg-[#1E3A8A] hover:bg-[#152b66] text-white font-medium text-xs font-serif-gov rounded-md transition-colors shadow-xs"
        >
          Download Secure PDF Log
        </button>
      </div>

      {/* Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#cbd5e1] rounded-xl p-4 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Total Tracked Events
          </span>
          <span className="font-serif-gov text-2xl font-bold text-[#0f172a]">
            14 Recorded
          </span>
          <span className="text-[11px] text-slate-500 block">
            Across 3 Government Integration Gateways
          </span>
        </div>

        <div className="bg-white border border-[#cbd5e1] rounded-xl p-4 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Last Verification
          </span>
          <span className="font-serif-gov text-xl font-bold text-[#0f172a]">
            Today, 11:24 AM IST
          </span>
          <span className="text-[11px] text-slate-500 block">
            Via Jan Parichay National SSO
          </span>
        </div>

        <div className="bg-white border border-[#cbd5e1] rounded-xl p-4 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Cryptographic Integrity
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-medium text-xs">
              SHA-256 Digest Valid
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Zero integrity overrides or chain violations
          </span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl p-4 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by event, IP address, or SHA hash..."
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:ring-1 focus:ring-[#1E3A8A] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1 border border-slate-300 rounded-lg p-0.5 bg-slate-50">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                statusFilter === 'ALL' ? 'bg-[#1E3A8A] text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('SUCCESS')}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                statusFilter === 'SUCCESS' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Success
            </button>
            <button
              onClick={() => setStatusFilter('DENIED')}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                statusFilter === 'DENIED' ? 'bg-red-600 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Denied
            </button>
          </div>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-700 bg-white"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Year-to-Date 2026</option>
            <option>All-Time Archive</option>
          </select>
        </div>
      </div>

      {/* High-Density Audit Table */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f172a] text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Timestamp (IST)</th>
                <th className="py-3 px-4">Event Description</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Access Node / Gateway</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 font-mono">Digest Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-sans-gov">
              {filteredLogs.map((log, idx) => (
                <tr key={idx} className="transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#0f172a] max-w-md">
                    {log.description}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">
                    {log.ip}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {log.device}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                      log.status === 'SUCCESS'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-red-50 text-red-700 border-red-300'
                    }`}>
                      {log.status === 'SUCCESS' ? 'Success' : 'Denied'}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.checksum}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statutory Advisory Notice */}
      <div className="p-4 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-600 leading-relaxed flex flex-col gap-1">
        <span className="font-bold text-[#0f172a] uppercase text-[11px]">
          Statutory Evidentiary Admissibility Notice
        </span>
        <p>
          Logs maintained on this portal are cryptographically hashed using SHA-256 and synchronized with the National e-Governance Division (NeGD) timestamping authority. These records qualify as certified electronic evidence under Section 65B of the Indian Evidence Act, 1872 and the Information Technology Act, 2000.
        </p>
      </div>
    </div>
  );
};
