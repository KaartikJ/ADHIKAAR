import React, { useState } from 'react';
import { CitizenView } from '../../types';

interface Props {
  onNavigate: (view: CitizenView) => void;
  isPublic?: boolean;
}

export const HelpSupportView: React.FC<Props> = ({ onNavigate, isPublic = false }) => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [khasraNumber, setKhasraNumber] = useState('');
  const [description, setDescription] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketSubject && description) {
      setTicketSubmitted(true);
    }
  };

  return (
    <div id="help-support-view" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col gap-6 font-sans-gov">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-slate-600 transition-colors duration-200 hover:text-[#1E3A8A] hover:underline underline-offset-4 font-bold"
            >
              Home
            </button>
            <span>/</span>
            <span className="font-bold text-[#0f172a]">Grievance Redressal & Helpdesk</span>
          </div>
          <h1 className="font-serif-gov text-3xl font-bold text-[#0f172a] mt-1">
            Citizen Helpdesk & Land Dispute Support
          </h1>
          <p className="text-xs text-slate-500">
            Official toll-free assistance, Tehsil contact directories, and dispute grievance lodging under UP Revenue Code 2006
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="px-4 py-2 text-xs font-medium bg-[#1E3A8A] text-white rounded-md hover:bg-[#152b66] transition-all shadow-xs font-serif-gov"
        >
          {isPublic ? 'Return to Home' : 'Return to Dashboard'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Contact Channels */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-3">
            <span className="text-xs font-bold text-[#0f172a] uppercase tracking-wider border-b border-slate-100 pb-2">
              National Helpdesk
            </span>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex flex-col gap-1">
              <span className="text-slate-500">Toll-Free Helpline:</span>
              <span className="font-mono text-base font-bold text-[#1E3A8A]">1800-11-2026</span>
              <span className="text-[10px] text-slate-500">Hours: Mon - Sat (09:00 - 18:00 IST)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex flex-col gap-1">
              <span className="text-slate-500">Official Support Email:</span>
              <span className="font-mono text-xs font-bold text-slate-800">support-dilrmp@nic.in</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex flex-col gap-1">
              <span className="text-slate-500">Local Tehsil Node:</span>
              <span className="font-bold text-[#0f172a]">Tehsil Mawana, District Meerut</span>
              <span className="text-[11px] text-slate-500">Office of the Sub-Divisional Magistrate (SDM)</span>
            </div>
          </div>
        </div>

        {/* Right: Grievance Lodging Form */}
        <div className="lg:col-span-2 bg-white border border-[#cbd5e1] rounded-xl p-6 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-serif-gov text-xl font-bold text-[#0f172a]">
              Lodge an Official Land Record Grievance
            </h2>
            <p className="text-xs text-slate-500">
              Grievances are tracked under Section 38 arbitration timelines with SMS token confirmation
            </p>
          </div>

          {ticketSubmitted ? (
            <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs flex flex-col gap-2">
              <span className="font-bold text-emerald-900 text-sm">
                Grievance Registered Successfully
              </span>
              <p className="text-emerald-800">
                Ticket Reference <strong>#GRV-2026-UP-49102</strong> has been logged into the Tehsildar Mawana queue. An acknowledgment notice has been dispatched to your linked mobile number.
              </p>
              <button
                type="button"
                onClick={() => {
                  setTicketSubmitted(false);
                  setTicketSubject('');
                  setKhasraNumber('');
                  setDescription('');
                }}
                className="self-start mt-2 px-3 py-1.5 bg-[#1E3A8A] text-white rounded-md font-medium text-xs hover:bg-[#152b66] transition-all font-serif-gov"
              >
                Lodge Another Grievance
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Grievance Category *</label>
                  <select
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-[#0f172a]"
                  >
                    <option value="">Select Category...</option>
                    <option value="Area Discrepancy">Area Discrepancy / Strike-Through Correction</option>
                    <option value="Spelling / Name Error">Spelling Error in Landowner Name</option>
                    <option value="Cadastral Map Boundary">Cadastral Map (Bhu-Naksha) Boundary Shift</option>
                    <option value="Mutation Delay">Delay in Mutation Clearance</option>
                    <option value="ULPIN Seeding">ULPIN / Bhu-Aadhaar Incorrectly Linked</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Khasra No. / ULPIN (Optional)</label>
                  <input
                    type="text"
                    value={khasraNumber}
                    onChange={(e) => setKhasraNumber(e.target.value)}
                    placeholder="e.g. 789 or UP-MRT-2026-981240"
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-[#0f172a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Detailed Description of Discrepancy *</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Describe the discrepancy with respect to the 1984 Settlement register or recent deed..."
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-[#0f172a]"
                />
              </div>

              <button
                type="submit"
                className="self-start px-6 py-2.5 bg-[#1E3A8A] text-white font-medium rounded-md hover:bg-[#152b66] transition-all shadow-xs font-serif-gov"
              >
                Submit Grievance to Tehsildar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
