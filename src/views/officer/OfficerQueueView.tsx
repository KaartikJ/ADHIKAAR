import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { QUEUE_ITEMS } from '../../data/mockData';

interface Props {
  onOpenRecord: (docId: string) => void;
  onBackToDashboard: () => void;
}

export const OfficerQueueView: React.FC<Props> = ({
  onOpenRecord,
  onBackToDashboard
}) => {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'ACTION_REQUIRED' | 'VERIFIED'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const filtered = QUEUE_ITEMS.filter((item) => {
    const matchesSearch = 
      item.docId.toLowerCase().includes(search.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      item.khasra.includes(search);
    const matchesFilter = filter === 'ALL' || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleSelectAll = () => {
    if (selectedDocs.length === filtered.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(filtered.map(f => f.docId));
    }
  };

  const toggleDoc = (docId: string) => {
    setSelectedDocs(prev => 
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  return (
    <div id="officer-queue" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col gap-6 font-sans-gov">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#cbd5e1] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Revenue Desk</span>
            <span>/</span>
            <span>Human-in-the-Loop Workbench</span>
            <span>/</span>
            <span className="font-bold text-[#0f172a]">Verification Queue</span>
          </div>
          <h1 className="font-serif-gov text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
            Pending RoR &amp; Deed Verification Queue
          </h1>
          <p className="text-xs text-slate-500">
            Records requiring officer inspection, Kaithi/Modi entity sign-off, or cadastral conflict resolution
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-slate-300 rounded-md hover:bg-slate-50 text-slate-700 font-serif-gov transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Filter and Bulk Action Bar */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl p-4 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Document ID, Landowner, or Khasra..."
            className="w-full sm:w-72 border border-slate-300 rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:ring-1 focus:ring-[#1E3A8A]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end w-full sm:w-auto">
          <div className="flex items-center gap-1 border border-slate-300 rounded-lg p-0.5 bg-slate-50">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                filter === 'ALL' ? 'bg-[#1E3A8A] text-white' : 'text-slate-600'
              }`}
            >
              All (18)
            </button>
            <button
              onClick={() => setFilter('PENDING')}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                filter === 'PENDING' ? 'bg-amber-500 text-slate-900 font-bold' : 'text-slate-600'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('ACTION_REQUIRED')}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                filter === 'ACTION_REQUIRED' ? 'bg-red-600 text-white font-bold' : 'text-slate-600'
              }`}
            >
              Action Required
            </button>
            <button
              onClick={() => setFilter('VERIFIED')}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                filter === 'VERIFIED' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600'
              }`}
            >
              Verified
            </button>
          </div>

          {selectedDocs.length > 0 && (
            <button
              onClick={() => alert(`Batch verified ${selectedDocs.length} records with Tehsildar DSC token!`)}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium font-serif-gov rounded-md transition-colors shadow-xs"
            >
              Batch Verify ({selectedDocs.length})
            </button>
          )}
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f172a] text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedDocs.length === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="accent-[#1E3A8A]"
                  />
                </th>
                <th className="py-3 px-3">Document Record</th>
                <th className="py-3 px-3">Landowner</th>
                <th className="py-3 px-3">Jurisdiction</th>
                <th className="py-3 px-3">Record Type</th>
                <th className="py-3 px-3">AI Confidence</th>
                <th className="py-3 px-3">Submission</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((item) => {
                const isSelected = selectedDocs.includes(item.docId);
                return (
                  <tr key={item.docId} className={`transition-all duration-200 ease-in-out hover:bg-blue-50/50 hover:text-[#1E3A8A] cursor-pointer ${isSelected ? 'bg-blue-50/40' : ''}`}>
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleDoc(item.docId)}
                        className="accent-[#1E3A8A]"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.thumbnail}
                          alt="Thumbnail"
                          className="w-9 h-11 object-cover rounded border border-slate-300"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-mono font-bold text-[#0f172a]">{item.docId}</div>
                          <div className="text-[10px] text-slate-500">Khasra #{item.khasra}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-bold text-[#0f172a]">
                      {item.ownerName}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {item.district}
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      {item.recordType}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        item.status === 'ACTION_REQUIRED'
                          ? 'bg-red-50 text-red-700 border-red-300'
                          : item.status === 'PENDING'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      }`}>
                        {item.confidenceBadge} {item.confidence}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {item.submissionDate}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onOpenRecord(item.docId)}
                        className="px-3 py-1.5 bg-[#1E3A8A] hover:bg-[#152b66] text-white rounded-md font-medium font-serif-gov transition-colors text-xs"
                      >
                        Open Review Workbench
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
