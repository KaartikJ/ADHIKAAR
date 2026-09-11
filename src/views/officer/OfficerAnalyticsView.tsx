import React, { useState } from 'react';

export const OfficerAnalyticsView: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState('Pilot Phase: UP & Bihar');
  const [selectedDistrict, setSelectedDistrict] = useState('All Pilot Districts');
  const [selectedRange, setSelectedRange] = useState('Last 30 Days');
  const [tableFilter, setTableFilter] = useState<'ALL' | 'VERIFIED' | 'REVIEW' | 'BLOCKED'>('ALL');
  const [anomalySearch, setAnomalySearch] = useState('');

  const streamRecords = [
    {
      docId: 'UP-MRT-2026-88192',
      location: 'Meerut / Mawana / Hastinapur',
      khasra: '789',
      ownerEn: 'Rajesh Kumar Singh',
      ownerHi: 'राजेश कुमार सिंह',
      confidence: 99.9,
      status: 'Verified & Synced',
      statusBadge: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      scheme: 'PM-KISAN Linked'
    },
    {
      docId: 'BR-PAT-2026-10492',
      location: 'Patna / Danapur / Khagaul',
      khasra: '142/B',
      ownerEn: 'Shambhu Nath Jha',
      ownerHi: 'शम्भू नाथ झा (कैथी)',
      confidence: 68.4,
      status: 'Flagged: Review',
      statusBadge: 'bg-amber-50 text-amber-800 border-amber-300',
      scheme: 'PM-KISAN Pending'
    },
    {
      docId: 'UP-MZ-2026-39102',
      location: 'Muzaffarnagar / Budhana',
      khasra: '502',
      ownerEn: 'Ram Vilas & Sons',
      ownerHi: 'राम विलास व पुत्रगण',
      confidence: 94.2,
      status: 'DILRMP Validated',
      statusBadge: 'bg-blue-50 text-[#1E3A8A] border-blue-200',
      scheme: 'PMFBY Crop Ins'
    },
    {
      docId: 'BR-GAY-2026-88109',
      location: 'Gaya / Sherghati / Amas',
      khasra: '91',
      ownerEn: 'Bimla Devi & Co-sharer',
      ownerHi: 'बिमला देवी',
      confidence: 42.0,
      status: 'Blocked Conflict',
      statusBadge: 'bg-red-50 text-red-800 border-red-300',
      scheme: 'Disputed Sec 38'
    },
    {
      docId: 'UP-ROH-2026-29184',
      location: 'Rohtas / Sasaram / Chenari',
      khasra: '318',
      ownerEn: 'Mahendra Pratap Singh',
      ownerHi: 'महेंद्र प्रताप सिंह',
      confidence: 97.6,
      status: 'Verified & Synced',
      statusBadge: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      scheme: 'PMAY-G Eligible'
    }
  ];

  const filteredStream = streamRecords.filter((r) => {
    const matchesSearch = 
      r.docId.toLowerCase().includes(anomalySearch.toLowerCase()) ||
      r.ownerEn.toLowerCase().includes(anomalySearch.toLowerCase()) ||
      r.location.toLowerCase().includes(anomalySearch.toLowerCase());
    if (tableFilter === 'VERIFIED') return matchesSearch && r.status.toLowerCase().includes('verified');
    if (tableFilter === 'REVIEW') return matchesSearch && r.status.toLowerCase().includes('review');
    if (tableFilter === 'BLOCKED') return matchesSearch && r.status.toLowerCase().includes('blocked');
    return matchesSearch;
  });

  return (
    <div id="officer-analytics-dss" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col gap-6 font-sans-gov">
      {/* Header & Subtitle */}
      <div className="border-b border-[#cbd5e1] pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Executive Intelligence System</span>
          <span>/</span>
          <span>Decision Support System (DSS)</span>
          <span>/</span>
          <span className="font-bold text-[#0f172a]">DILRMP Modernization Index</span>
        </div>
        <h1 className="font-serif-gov text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
          Executive Digitization & Welfare DSS Dashboard
        </h1>
        <p className="text-xs text-slate-500">
          Cross-database AI OCR audit, cadastral ambiguity detection, and automated welfare distribution trends
        </p>
      </div>

      {/* Universal Filter Strip */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl p-4 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 font-bold text-[#0f172a] bg-slate-50"
          >
            <option>Pilot Phase: UP & Bihar</option>
            <option>Phase 2: Madhya Pradesh & Rajasthan</option>
            <option>All-India Production Rollout</option>
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-slate-700 bg-white"
          >
            <option>All Pilot Districts</option>
            <option>Meerut (UP)</option>
            <option>Patna (BR)</option>
            <option>Muzaffarnagar (UP)</option>
            <option>Gaya (BR)</option>
            <option>Rohtas (BR)</option>
          </select>

          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-slate-700 bg-white"
          >
            <option>Last 30 Days</option>
            <option>Current Fiscal Quarter</option>
            <option>Annual Cycle 2025-26</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          <button
            onClick={() => alert('Active learning batch triggered! Retraining Kaithi-Modi model with 342 user corrections.')}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium font-serif-gov rounded-md text-xs transition-colors shadow-xs"
          >
            Trigger Active Learning Batch
          </button>
          <button
            onClick={() => alert('Exporting DILRMP National Compliance Report (CSV/PDF)...')}
            className="px-3.5 py-2 bg-[#1E3A8A] hover:bg-[#152b66] text-white font-medium font-serif-gov rounded-md text-xs transition-colors shadow-xs"
          >
            Export Compliance Report
          </button>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#cbd5e1] rounded-xl p-4 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Total Documents Processed
          </span>
          <div className="font-serif-gov text-3xl font-bold text-[#0f172a]">
            1,42,890
          </div>
          <span className="text-[11px] text-slate-500">
            Across 5 Pilot Districts • 84 Tehsil Wards
          </span>
        </div>

        <div className="bg-white border border-[#cbd5e1] rounded-xl p-4 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            AI Extraction Accuracy
          </span>
          <div className="font-serif-gov text-3xl font-bold text-emerald-700">
            96.4%
          </div>
          <span className="text-[11px] text-slate-500">
            F1-Score across Kaithi, Modi & Devanagari
          </span>
        </div>

        <div className="bg-white border border-[#cbd5e1] rounded-xl p-4 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Pending Active Review
          </span>
          <div className="font-serif-gov text-3xl font-bold text-amber-800">
            342
          </div>
          <span className="text-[11px] text-slate-500">
            Flagged &lt;70% Confidence for Lekhpal Sign-off
          </span>
        </div>

        <div className="bg-white border border-[#cbd5e1] rounded-xl p-4 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Plots Flagged for Mismatch
          </span>
          <div className="font-serif-gov text-3xl font-bold text-red-700">
            1,240
          </div>
          <span className="text-[11px] text-slate-500">
            Khatauni vs Bhu-Naksha Boundary Variance
          </span>
        </div>
      </div>

      {/* 12-Column Grid: District Progress (7 Cols) + Ambiguity Breakdown (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 7 Cols (District-Wise Progress) */}
        <div className="lg:col-span-7 bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
              District-Wise Digitization & Seeding Progress
            </h3>
            <p className="text-xs text-slate-500">
              Percentage of physical revenue registers scanned, OCR extracted, and linked to ULPIN
            </p>
          </div>

          <div className="flex flex-col gap-4 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-[#0f172a]">Meerut, UP (Target: 32,000 folios)</span>
                <span className="font-mono text-[#1E3A8A]">94.2%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#1E3A8A] h-2.5 rounded-full" style={{ width: '94.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-[#0f172a]">Patna, BR (Target: 41,000 folios)</span>
                <span className="font-mono text-[#1E3A8A]">88.6%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#1E3A8A] h-2.5 rounded-full" style={{ width: '88.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-[#0f172a]">Muzaffarnagar, UP (Target: 26,500 folios)</span>
                <span className="font-mono text-[#1E3A8A]">91.0%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#1E3A8A] h-2.5 rounded-full" style={{ width: '91%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-[#0f172a]">Gaya, BR (Target: 28,000 folios)</span>
                <span className="font-mono text-amber-700">76.4%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '76.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-[#0f172a]">Rohtas, BR (Target: 24,000 folios)</span>
                <span className="font-mono text-emerald-700">82.1%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '82.1%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: 5 Cols (AI OCR & Ambiguity Breakdown) */}
        <div className="lg:col-span-5 bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="font-serif-gov text-lg font-bold text-[#0f172a]">
              AI OCR Ambiguity Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Primary triggers for human-in-the-loop review routing
            </p>
          </div>

          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-medium text-slate-700">Faded / Damaged Handwriting</span>
              <span className="font-bold text-[#0f172a] font-mono">48%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-medium text-slate-700">Regional Script Dialect (Kaithi/Modi)</span>
              <span className="font-bold text-[#0f172a] font-mono">26%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-medium text-slate-700">Cadastral Boundary / Area Mismatch</span>
              <span className="font-bold text-[#0f172a] font-mono">16%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-medium text-slate-700">Missing Seal / Strike-Through Overwrites</span>
              <span className="font-bold text-[#0f172a] font-mono">10%</span>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-[#0f172a]">
            <span className="font-bold text-[#1E3A8A] block mb-0.5">Active Learning Loop</span>
            When an officer corrects a folio entity, the feedback tensor is packaged for the next nightly retraining cycle.
          </div>
        </div>
      </div>

      {/* Automated Welfare Scheme Recommendation Engine */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="font-serif-gov text-xl font-bold text-[#0f172a]">
            Automated Welfare Scheme Recommendation Engine
          </h3>
          <p className="text-xs text-slate-500">
            Predictive seeding linking verified agricultural parcels directly to Direct Benefit Transfer (DBT) schemes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col gap-1">
            <span className="text-xs font-bold text-emerald-900">PM-KISAN Samman Nidhi</span>
            <span className="font-serif-gov text-2xl font-bold text-emerald-800">64,320</span>
            <span className="text-[11px] text-emerald-700">Small & marginal farmers qualified (&lt;2 Ha)</span>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex flex-col gap-1">
            <span className="text-xs font-bold text-[#1E3A8A]">PMAY-Gramin Homestead</span>
            <span className="font-serif-gov text-2xl font-bold text-blue-900">12,180</span>
            <span className="text-[11px] text-slate-600">Homestead parcel title clearances validated</span>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col gap-1">
            <span className="text-xs font-bold text-amber-900">PMFBY Crop Insurance</span>
            <span className="font-serif-gov text-2xl font-bold text-amber-800">41,950</span>
            <span className="text-[11px] text-amber-800">Cadastral plot crop geometry matched</span>
          </div>
        </div>
      </div>

      {/* Live Cross-Validation & Anomaly Stream Table */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-serif-gov text-xl font-bold text-[#0f172a]">
              Live Cross-Validation & Anomaly Stream
            </h3>
            <p className="text-xs text-slate-500">
              Real-time audit log of OCR ingestion, validation checks, and conflict blocks
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              value={anomalySearch}
              onChange={(e) => setAnomalySearch(e.target.value)}
              placeholder="Search stream..."
              className="border border-slate-300 rounded px-2.5 py-1 text-xs text-[#0f172a]"
            />
            <div className="flex items-center gap-1 border border-slate-300 rounded p-0.5 bg-slate-50 text-xs">
              <button
                onClick={() => setTableFilter('ALL')}
                className={`px-2 py-0.5 rounded font-semibold ${tableFilter === 'ALL' ? 'bg-[#1E3A8A] text-white' : 'text-slate-600'}`}
              >
                All
              </button>
              <button
                onClick={() => setTableFilter('VERIFIED')}
                className={`px-2 py-0.5 rounded font-semibold ${tableFilter === 'VERIFIED' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
              >
                Verified
              </button>
              <button
                onClick={() => setTableFilter('REVIEW')}
                className={`px-2 py-0.5 rounded font-semibold ${tableFilter === 'REVIEW' ? 'bg-amber-500 text-slate-900 font-bold' : 'text-slate-600'}`}
              >
                Review
              </button>
              <button
                onClick={() => setTableFilter('BLOCKED')}
                className={`px-2 py-0.5 rounded font-semibold ${tableFilter === 'BLOCKED' ? 'bg-red-600 text-white' : 'text-slate-600'}`}
              >
                Blocked
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f172a] text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Document ID</th>
                <th className="py-2.5 px-3">State / Tehsil / Village</th>
                <th className="py-2.5 px-3">Khasra</th>
                <th className="py-2.5 px-3">Extracted Owner</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3">Validation Status</th>
                <th className="py-2.5 px-3">Scheme Tag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredStream.map((record) => (
                <tr key={record.docId} className="transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer">
                  <td className="py-3 px-3 font-mono font-bold text-[#0f172a] whitespace-nowrap">
                    {record.docId}
                  </td>
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    {record.location}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    {record.khasra}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#0f172a]">{record.ownerEn}</div>
                    <div className="text-[10px] text-slate-500">{record.ownerHi}</div>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-[#0f172a]">
                    {record.confidence}%
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${record.statusBadge}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-700">
                    {record.scheme}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
