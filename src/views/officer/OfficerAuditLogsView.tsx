import React, { useState, useMemo } from 'react';
import { 
  Lock, 
  Search, 
  Download, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  FileSpreadsheet, 
  Copy, 
  Check, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export interface AuditRecord {
  id: string;
  timestamp: string;
  officerName: string;
  officerId: string;
  cadre: string;
  jurisdiction: string;
  actionTitle: string;
  actionHighlight?: string;
  actionDetail: string;
  ip: string;
  node: string;
  category: 'mutation' | 'geometry' | 'ocr' | 'inspection' | 'ulpin' | 'dss' | 'dispute';
  status: 'completed' | 'flagged' | 'pending';
  hash: string;
  certificateNo: string;
  dscSerial: string;
}

const INITIAL_AUDIT_RECORDS: AuditRecord[] = [
  {
    id: 'EVT-2024-10-89101',
    timestamp: '25-OCT-2024 11:14:22 IST',
    officerName: 'Officer Sharma',
    officerId: 'GOI-UP-REV-89028',
    cadre: 'Tehsildar',
    jurisdiction: 'Mawana, Meerut (UP)',
    actionTitle: 'Approved RoR Nakal & e-Signed Mutation',
    actionHighlight: '#MUT-2024-8841 (Khasra 789)',
    actionDetail: 'Verified succession lineage via Jan Parichay e-Sign with DSC Class-3 token.',
    ip: '117.245.9.8',
    node: 'UP-NOD-04',
    category: 'mutation',
    status: 'completed',
    hash: '7e8f2390a14b58e990c743de5f9b1836c21e07b8a54d6f41e0c29b7a4c38e912',
    certificateNo: 'CERT-65B-2024-998124',
    dscSerial: 'CCA-INDIA-2024-88912-A1'
  },
  {
    id: 'EVT-2024-10-89098',
    timestamp: '25-OCT-2024 10:48:50 IST',
    officerName: 'Er. V. Sharma',
    officerId: 'GOI-UP-REV-72150',
    cadre: 'GIS Lead',
    jurisdiction: 'Survey Directorate, Meerut',
    actionTitle: 'Cadastral Boundary Geometry Override on',
    actionHighlight: 'Khasra 422/A-East (+0.032 Ha adjustment)',
    actionDetail: 'Adjusted drone orthophoto polygon coordinates following physical benchmark survey.',
    ip: '117.245.9.8',
    node: 'GIS-CON-02',
    category: 'geometry',
    status: 'flagged',
    hash: '4b29a008ef12ca49301298ef91823abce84102938475619283746592837499d1',
    certificateNo: 'CERT-65B-2024-998109',
    dscSerial: 'CCA-INDIA-2024-72150-G3'
  },
  {
    id: 'EVT-2024-10-89074',
    timestamp: '25-OCT-2024 09:22:45 IST',
    officerName: 'Officer Sharma',
    officerId: 'GOI-UP-REV-89028',
    cadre: 'Tehsildar',
    jurisdiction: 'Mawana, Meerut (UP)',
    actionTitle: 'Manual OCR Text Correction:',
    actionHighlight: 'Owner name transliteration verified for Khata 102',
    actionDetail: 'Replaced Kaithi archaic script discrepancy with Devanagari standardized legal title.',
    ip: '117.245.9.8',
    node: 'UP-NOD-04',
    category: 'ocr',
    status: 'completed',
    hash: 'd983ca4100ba9876543210fedcba9876543210abcdef0123456789abcdef7f24',
    certificateNo: 'CERT-65B-2024-998088',
    dscSerial: 'CCA-INDIA-2024-88912-A1'
  },
  {
    id: 'EVT-2024-10-88991',
    timestamp: '23-OCT-2024 16:20:10 IST',
    officerName: 'Kanungo R. P. Yadav',
    officerId: 'GOI-UP-REV-90151',
    cadre: 'Revenue Inspector',
    jurisdiction: 'Hastinapur Circle',
    actionTitle: 'Field Inspection Report Uploaded & Geotagged for Application',
    actionHighlight: '#APPL-UP-2024-88592',
    actionDetail: 'Seema Stambh boundary verification complete with dual GPS coordinates verified on-site.',
    ip: '45.112.4.6',
    node: 'Mobile Node',
    category: 'inspection',
    status: 'completed',
    hash: 'a318ef902b415678901234567890abcdef1234567890abcdef1234567890556c',
    certificateNo: 'CERT-65B-2024-997950',
    dscSerial: 'CCA-INDIA-2024-90151-M1'
  },
  {
    id: 'EVT-2024-10-88942',
    timestamp: '24-OCT-2024 15:45:02 IST',
    officerName: 'Officer Sharma',
    officerId: 'GOI-UP-REV-89028',
    cadre: 'Tehsildar',
    jurisdiction: 'Mawana, Meerut (UP)',
    actionTitle: 'Direct ULPIN Seeding: Linked Aadhaar vault token to Parcel',
    actionHighlight: 'UP-MRT-2026-901240',
    actionDetail: 'Bhu-Aadhaar 14-digit geo-referenced key minted with zero biometric storage compliance.',
    ip: '117.245.9.8',
    node: 'UP-NOD-04',
    category: 'ulpin',
    status: 'completed',
    hash: '890cdba145ef0123456789abcdef0123456789abcdef0123456789abcdef010b',
    certificateNo: 'CERT-65B-2024-997811',
    dscSerial: 'CCA-INDIA-2024-88912-A1'
  },
  {
    id: 'EVT-2024-10-88890',
    timestamp: '23-OCT-2024 12:50:33 IST',
    officerName: 'Dr. K. Verma, IAS',
    officerId: 'GOI-UP-ADM-10101',
    cadre: 'Director',
    jurisdiction: 'State DILRMP Directorate, Lucknow',
    actionTitle: 'Bulk DSS Saturation Trigger: Executed',
    actionHighlight: 'PM-KISAN & PMAY-G Welfare Registry Cross-Sync',
    actionDetail: 'Synchronized 14,200 land holdings with PFMS direct beneficiary transfer ledger.',
    ip: '10.0.7.12',
    node: 'SEC-APEX-01',
    category: 'dss',
    status: 'completed',
    hash: '12abf89010cd45678901234567890abcdef1234567890abcdef123456789044ee',
    certificateNo: 'CERT-65B-2024-997645',
    dscSerial: 'CCA-INDIA-2024-10101-DIR'
  },
  {
    id: 'EVT-2024-10-88812',
    timestamp: '22-OCT-2024 12:35:18 IST',
    officerName: 'Patwari Suresh Chand',
    officerId: 'GOI-UP-REV-63182',
    cadre: 'Village Patwari',
    jurisdiction: 'Hastinapur Gram',
    actionTitle: 'Attempted Plot Area Reduction beyond 5% tolerance limit on',
    actionHighlight: 'Khasra 512 (Disputed)',
    actionDetail: 'Automated DILRMP spatial validator tripped rule 18-A. Action automatically frozen for SDM review.',
    ip: '117.245.9.8',
    node: 'Field Node',
    category: 'dispute',
    status: 'flagged',
    hash: '99ba43ef010245678901234567890abcdef1234567890abcdef123456789088ab',
    certificateNo: 'CERT-65B-2024-997502',
    dscSerial: 'CCA-INDIA-2024-63182-P2'
  }
];

export const OfficerAuditLogsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventCategory, setSelectedEventCategory] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('current-month');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeRecord, setActiveRecord] = useState<AuditRecord | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Filter logic
  const filteredRecords = useMemo(() => {
    return INITIAL_AUDIT_RECORDS.filter(record => {
      // Search term
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch = !query || 
        record.officerName.toLowerCase().includes(query) ||
        record.officerId.toLowerCase().includes(query) ||
        record.actionTitle.toLowerCase().includes(query) ||
        (record.actionHighlight && record.actionHighlight.toLowerCase().includes(query)) ||
        record.jurisdiction.toLowerCase().includes(query) ||
        record.ip.includes(query) ||
        record.node.toLowerCase().includes(query) ||
        record.hash.toLowerCase().includes(query);

      // Event category
      const matchesCategory = selectedEventCategory === 'all' || record.category === selectedEventCategory;

      // Status
      const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedEventCategory, selectedStatus]);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const handleDownloadCSV = () => {
    const headers = ['Timestamp', 'Officer ID', 'Officer Name', 'Cadre', 'Jurisdiction', 'Action Description', 'IP Address', 'Cryptographic Node', 'SHA-256 Hash', 'Section 65B Certificate'];
    const rows = filteredRecords.map(r => [
      `"${r.timestamp}"`,
      `"${r.officerId}"`,
      `"${r.officerName}"`,
      `"${r.cadre}"`,
      `"${r.jurisdiction}"`,
      `"${r.actionTitle} ${r.actionHighlight || ''} - ${r.actionDetail}"`,
      `"${r.ip}"`,
      `"${r.node}"`,
      `"${r.hash}"`,
      `"${r.certificateNo}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DILRMP_Officer_System_Audit_Log_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice('Audit report generated and saved as CSV (Section 65B Admissible).');
    setShowExportModal(false);
    setTimeout(() => setExportNotice(null), 4000);
  };

  const handleDownloadPDF = () => {
    setExportNotice('Digital Certificate Signed PDF generated with e-Pramaan time-stamp seal.');
    setShowExportModal(false);
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div id="officer-audit-logs-view" className="flex-1 bg-slate-50 p-6 flex flex-col gap-6 font-sans-gov text-slate-600">
      {/* Export Success Notification Banner */}
      {exportNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-lg shadow-sm flex items-center justify-between text-xs font-sans-gov">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{exportNotice}</span>
          </div>
          <button 
            type="button" 
            onClick={() => setExportNotice(null)}
            className="text-emerald-700 hover:text-emerald-950 font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 1. Page Header & Subtitle */}
      <div className="flex flex-col gap-1.5">
        <h1 
          className="text-3xl font-bold tracking-tight text-[#0f172a] font-serif-gov"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          Officer System Audit Logs
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-5xl">
          Immutable chronological tracking of administrative actions, ULPIN cadastral modifications, and multi-tiered officer approvals under the Information Technology (IT) Act, 2000 and DILRMP governance protocols.
        </p>
      </div>

      {/* 2. Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Left Side: Search & Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative min-w-[260px] flex-1 sm:flex-initial sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by Officer ID, Name, or ULPIN..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-lg text-xs text-[#0f172a] placeholder:text-slate-400 outline-none transition-colors"
            />
            {searchTerm && (
              <button 
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                title="Clear filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dropdown 1: Administrative Events */}
          <div className="relative">
            <select
              value={selectedEventCategory}
              onChange={(e) => setSelectedEventCategory(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-white border border-slate-200 text-xs text-slate-700 py-2 pl-3 pr-8 rounded-lg outline-none cursor-pointer focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-colors font-medium"
            >
              <option value="all">All Administrative Events</option>
              <option value="mutation">RoR Approvals &amp; e-Signs</option>
              <option value="geometry">Cadastral Boundary Overrides</option>
              <option value="ocr">Manual OCR Corrections</option>
              <option value="inspection">Field Inspection Reports</option>
              <option value="ulpin">Direct ULPIN Seeding</option>
              <option value="dss">Bulk DSS Registry Operations</option>
              <option value="dispute">Flagged Boundary Disputes</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Dropdown 2: Time Range */}
          <div className="relative">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-white border border-slate-200 text-xs text-slate-700 py-2 pl-3 pr-8 rounded-lg outline-none cursor-pointer focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-colors font-medium"
            >
              <option value="current-month">Current Month - Oct 2024</option>
              <option value="last-month">Previous Month - Sep 2024</option>
              <option value="q2">Q2 FY 2024-25 (Jul - Sep)</option>
              <option value="fy-full">Full Financial Year 2024-25</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Dropdown 3: Status */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-white border border-slate-200 text-xs text-slate-700 py-2 pl-3 pr-8 rounded-lg outline-none cursor-pointer focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-colors font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed &amp; Signed</option>
              <option value="flagged">Action Required (Flagged)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Right Side: Primary Action Button */}
        <button
          type="button"
          onClick={() => setShowExportModal(true)}
          className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5 text-amber-300" />
          <span>Download Tamper-Proof Audit Report (PDF / CSV)</span>
        </button>
      </div>

      {/* 3. Executive KPI Cards (3-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: TOTAL OFFICER ACTIONS */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              TOTAL OFFICER ACTIONS
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-sans">
              [COMPLETED &amp; RECORDED]
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span 
                className="text-3xl font-bold text-[#0f172a] font-serif-gov leading-none"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                1,482
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Recorded Events
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Logged in Current Financial Cycle
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-emerald-700 font-bold">+8.4%</span>
            <span>vs previous cycle • Zero ledger gaps detected</span>
          </div>
        </div>

        {/* Card 2: CADASTRAL OVERRIDE ALERTS */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              CADASTRAL OVERRIDE ALERTS
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-300 rounded font-sans">
              Action Required
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span 
                className="text-3xl font-bold text-amber-700 font-serif-gov leading-none"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                3
              </span>
              <span className="text-xs font-semibold text-amber-800">
                Flagged Geometry Anomalies
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Boundary Geometry Overrides Flagged
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-800 font-medium pt-2 border-t border-slate-100">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>2 pending SDM ratification • 1 under legal review</span>
          </div>
        </div>

        {/* Card 3: CRYPTOGRAPHIC DIGEST STATUS */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              CRYPTOGRAPHIC DIGEST STATUS
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded font-sans">
              Verified 100%
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div 
              className="text-2xl font-bold text-[#0f172a] font-serif-gov leading-none"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              SHA-256 Validated
            </div>
            <p className="text-xs text-slate-500">
              e-Pramaan Time-Stamp Authority
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-mono">
            <span className="text-slate-400 font-sans">Last sealed digest:</span>
            <span 
              onClick={() => handleCopyHash('a04be03bc89f71298ef91823abce84102938475619283746592837499d1e')}
              className="bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded border border-slate-200 text-slate-700 cursor-pointer font-bold transition-colors"
              title="Click to copy full SHA-256 hash"
            >
              a04be03b...4d1e (11:30:04 IST)
            </span>
          </div>
        </div>
      </div>

      {/* 4. Audit Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
        {/* Table Header Controls Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-50/50">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 
              className="text-sm font-bold tracking-wider uppercase text-[#0f172a] font-serif-gov"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              ADMINISTRATIVE ACTION HISTORY
            </h2>
            <span className="px-2.5 py-0.5 bg-[#0f172a] text-white text-[11px] font-bold rounded-full">
              Showing 1 to {filteredRecords.length} of 1,482 Officer Action Events
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-700">Cryptographic Node:</span>
            <span className="font-mono text-emerald-800 font-bold">UP-NOD-04 (Synced)</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr 
                className="bg-slate-100/80 border-b border-slate-200 text-slate-700 tracking-wider text-[11px] font-bold uppercase font-serif-gov"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                <th className="py-3 px-4 w-44">TIMESTAMP (IST)</th>
                <th className="py-3 px-4 w-52">OFFICER ID &amp; NAME</th>
                <th className="py-3 px-4 w-48">JURISDICTION / CADRE</th>
                <th className="py-3 px-4">ACTION DESCRIPTION</th>
                <th className="py-3 px-4 w-44">IP / NODE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-sans-gov">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <p className="font-semibold text-sm">No audit records found matching your filters.</p>
                    <button
                      type="button"
                      onClick={() => { setSearchTerm(''); setSelectedEventCategory('all'); setSelectedStatus('all'); }}
                      className="mt-2 text-xs text-[#1E3A8A] font-bold underline cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => {
                  const isFlagged = record.status === 'flagged';
                  return (
                    <tr 
                      key={record.id}
                      onClick={() => setActiveRecord(record)}
                      className={`transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer ${
                        isFlagged ? 'bg-amber-50/25' : ''
                      }`}
                    >
                      {/* TIMESTAMP (IST) */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap align-top">
                        {record.timestamp}
                      </td>

                      {/* OFFICER ID & NAME */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-[#0f172a] text-xs">
                            {record.officerName}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {record.officerId} <span className="font-sans text-slate-600">({record.cadre})</span>
                          </span>
                        </div>
                      </td>

                      {/* JURISDICTION / CADRE */}
                      <td className="py-3.5 px-4 text-slate-700 text-xs align-top">
                        <span className="font-medium text-slate-700 block">
                          {record.jurisdiction}
                        </span>
                      </td>

                      {/* ACTION DESCRIPTION */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex flex-col gap-0.5 text-xs">
                          <p className="text-slate-800 leading-snug">
                            <span className="font-semibold text-[#0f172a]">{record.actionTitle}</span>{' '}
                            {record.actionHighlight && (
                              <span className={`font-bold ${
                                isFlagged ? 'text-amber-800 bg-amber-100/70 px-1 py-0.5 rounded' : 'text-[#1E3A8A] font-mono'
                              }`}>
                                {record.actionHighlight}
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {record.actionDetail}
                          </p>
                        </div>
                      </td>

                      {/* IP / NODE */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap align-top">
                        <div className="flex flex-col">
                          <span className="text-slate-700 font-semibold">{record.ip}</span>
                          <span className="text-[10px] text-slate-400 font-sans">({record.node})</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Bar */}
        <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 bg-white">
          <span>
            Showing <strong className="text-slate-700 font-bold">1-{filteredRecords.length}</strong> of <strong className="text-slate-700 font-bold">1,482</strong> records
          </span>

          <div className="flex items-center gap-1.5 select-none">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`w-7 h-7 flex items-center justify-center rounded font-bold transition-colors ${
                currentPage === 1 
                  ? 'bg-[#0f172a] text-white' 
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`w-7 h-7 flex items-center justify-center rounded font-bold transition-colors ${
                currentPage === 2 
                  ? 'bg-[#0f172a] text-white' 
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`w-7 h-7 flex items-center justify-center rounded font-bold transition-colors ${
                currentPage === 3 
                  ? 'bg-[#0f172a] text-white' 
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              3
            </button>
            <span className="px-1 text-slate-400 font-bold">...</span>
            <button
              type="button"
              onClick={() => setCurrentPage(21)}
              className={`w-7 h-7 flex items-center justify-center rounded font-bold transition-colors ${
                currentPage === 21 
                  ? 'bg-[#0f172a] text-white' 
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              21
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(22)}
              className={`w-7 h-7 flex items-center justify-center rounded font-bold transition-colors ${
                currentPage === 22 
                  ? 'bg-[#0f172a] text-white' 
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              22
            </button>
            <button
              type="button"
              disabled={currentPage === 22}
              onClick={() => setCurrentPage(p => Math.min(22, p + 1))}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* 5. Statutory Officer Audit Compliance Notice */}
      <div 
        id="statutory-officer-audit-notice"
        className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-md flex items-start gap-3 shadow-xs"
      >
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1 text-xs leading-relaxed">
          <span className="font-bold tracking-wide text-amber-950 uppercase">
            STATUTORY OFFICER AUDIT COMPLIANCE NOTICE:
          </span>
          <p className="text-amber-900">
            Under Section 65B of the Indian Evidence Act (1872) and the Information Technology (IT) Act 2000, all officer actions, manual record overrides, and biometric sign-offs constitute an immutable public record. Unauthorized tampering, unnotified cadastral overrides, or fraudulent ledger modifications are strictly monitored and subject to administrative disciplinary proceedings and Section 43/66 legal penalties.
          </p>
        </div>
      </div>

      {/* 6. Bottom Government Sub-Footer */}
      <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-2 flex-wrap text-center sm:text-left">
          <span className="font-serif-gov font-bold text-slate-700">ADHIKAR</span>
          <span>•</span>
          <span>© 2024 ADHIKAR - Government of India | Department of Land Resources</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hover:text-slate-800 cursor-pointer transition-colors">Privacy Policy</span>
          <span>|</span>
          <span className="hover:text-slate-800 cursor-pointer transition-colors">Terms of Service</span>
          <span>|</span>
          <span className="hover:text-slate-800 cursor-pointer transition-colors">Contact Support</span>
        </div>
      </div>

      {/* 7. Cryptographic Record Inspection Modal */}
      {activeRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-2xl w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#0f172a] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div className="flex flex-col">
                  <span 
                    className="font-bold text-sm font-serif-gov"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    Cryptographic Audit Event Certificate
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono">
                    {activeRecord.id} • Section 65B Electronic Evidence Admissible
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveRecord(null)}
                className="text-slate-300 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex flex-col gap-4 text-xs max-h-[75vh] overflow-y-auto font-sans-gov">
              {/* Event Overview Box */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-sm">{activeRecord.actionTitle} {activeRecord.actionHighlight}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded font-sans ${
                    activeRecord.status === 'flagged' 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {activeRecord.status === 'flagged' ? 'Action Required' : 'Completed & Recorded'}
                  </span>
                </div>
                <p className="text-slate-600">{activeRecord.actionDetail}</p>
              </div>

              {/* Two-Column Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Officer &amp; Cadre</span>
                  <span className="font-bold text-slate-800">{activeRecord.officerName}</span>
                  <span className="text-slate-500 font-mono text-[11px]">{activeRecord.officerId} ({activeRecord.cadre})</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Jurisdiction</span>
                  <span className="font-semibold text-slate-800">{activeRecord.jurisdiction}</span>
                  <span className="text-slate-500 text-[11px]">Revenue Sub-Division Directorate</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Timestamp (IST)</span>
                  <span className="font-mono text-slate-800 font-bold">{activeRecord.timestamp}</span>
                  <span className="text-slate-500 text-[10px]">NTP Synced with NPL National Standard</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Origin Node &amp; IP</span>
                  <span className="font-mono text-slate-800 font-bold">{activeRecord.ip}</span>
                  <span className="text-slate-500 text-[11px]">Cluster Node: {activeRecord.node}</span>
                </div>
              </div>

              {/* SHA-256 Digest Box */}
              <div className="flex flex-col gap-1 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold text-[10px] uppercase">SHA-256 Immutable Hash Digest</span>
                  <button
                    type="button"
                    onClick={() => handleCopyHash(activeRecord.hash)}
                    className="flex items-center gap-1 text-[11px] text-slate-600 transition-colors duration-200 hover:text-[#1E3A8A] hover:underline underline-offset-4 font-bold"
                  >
                    {copiedHash === activeRecord.hash ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Hash</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-2.5 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded break-all select-all">
                  {activeRecord.hash}
                </div>
              </div>

              {/* Statutory Section 65B Admissibility */}
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg flex flex-col gap-1 text-[11px] text-blue-900">
                <div className="flex items-center justify-between font-bold">
                  <span>Certificate ID: {activeRecord.certificateNo}</span>
                  <span>DSC: {activeRecord.dscSerial}</span>
                </div>
                <p className="text-blue-800/80 leading-relaxed text-[10px]">
                  This record is generated by an automated electronic logging mechanism operating under the custody of the Central Land Records Repository, Government of India.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 p-3 px-4 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveRecord(null)}
                className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Download Report Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-md w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#0f172a] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <span 
                  className="font-bold text-sm font-serif-gov"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Generate Tamper-Proof Audit Report
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="text-slate-300 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4 text-xs font-sans-gov">
              <p className="text-slate-600 leading-relaxed">
                Export verified audit logs under the Digital India Land Records Modernization Programme (DILRMP). Each generated bundle contains the full cryptographic chain of custody and DSC metadata.
              </p>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleDownloadCSV}
                  className="w-full p-3 border border-slate-200 hover:border-[#1E3A8A] hover:bg-blue-50/40 rounded-lg flex items-center justify-between text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 group-hover:text-[#1E3A8A]">
                        Tabular Audit Log (.CSV)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Compatible with MS Excel, NIC DILRMP Analytics &amp; Court Evidence
                      </span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-[#1E3A8A]" />
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="w-full p-3 border border-slate-200 hover:border-[#1E3A8A] hover:bg-blue-50/40 rounded-lg flex items-center justify-between text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-blue-700 shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 group-hover:text-[#1E3A8A]">
                        Cryptographic Signed Ledger (.PDF)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Includes Section 65B Digital Certificate &amp; QR Code Verification
                      </span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-[#1E3A8A]" />
                </button>
              </div>
            </div>

            <div className="bg-slate-100 p-3 px-4 border-t border-slate-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded text-slate-700 font-semibold text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
