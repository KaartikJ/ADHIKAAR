import React, { useState } from 'react';
import { OFFICIAL_ASSETS } from '../data/mockData';
import { PortalRole } from '../types';
import { RotateCw, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: PortalRole) => void;
  initialRole?: PortalRole;
}

export const AuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  initialRole = 'citizen'
}) => {
  const [activeTab, setActiveTab] = useState<PortalRole>(initialRole);
  const [authMethod, setAuthMethod] = useState<'aadhaar' | 'parichay'>('aadhaar');
  const [aadhaarInput, setAadhaarInput] = useState('9842 1044 4102');
  const [officerEmail, setOfficerEmail] = useState('rev.inspector.mrt@up.nic.in');
  const [password, setPassword] = useState('••••••••••••');
  const [captchaInput, setCaptchaInput] = useState('7K9P4');
  const [otpStep, setOtpStep] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpStep && activeTab === 'citizen') {
      setOtpStep(true);
      return;
    }
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setOtpStep(false);
      onSuccess(activeTab);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1d]/80 backdrop-blur-xs p-4 overflow-y-auto font-sans-gov">
      <div className="relative w-full max-w-md bg-white border border-[#cbd5e1] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#0f172a] text-white p-5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <img 
              src={OFFICIAL_ASSETS.seal} 
              alt="Government Seal" 
              className="w-10 h-10 object-contain rounded-full border border-slate-400"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-serif-gov text-base font-bold tracking-wide">
                अधिकार • ADHIKAR AUTH GATEWAY
              </h3>
              <p className="text-[11px] text-slate-300">
                National Single Sign-On (Jan Parichay & UIDAI e-Pramaan)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* National Motto Ribbon */}
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-1.5 text-center text-xs font-bold text-amber-950">
          पारदर्शी भूमि प्रशासन, सुरक्षित अधिकार • Transparent Governance
        </div>

        {/* Access Mode Tabs */}
        <div className="flex border-b border-[#cbd5e1] bg-slate-50 font-serif-gov">
          <button
            type="button"
            onClick={() => { setActiveTab('citizen'); setOtpStep(false); }}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'citizen'
                ? 'border-[#1E3A8A] text-[#1E3A8A] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Citizen Access
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('officer'); setOtpStep(false); }}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'officer'
                ? 'border-[#1E3A8A] text-[#1E3A8A] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Officer & Revenue Desk
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLoginSubmit} className="p-6 flex flex-col gap-4 text-xs">
          {activeTab === 'citizen' ? (
            <>
              {/* Auth Mode Toggle */}
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Verification Authority:</span>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1 cursor-pointer font-medium text-slate-700">
                    <input 
                      type="radio" 
                      name="authMethod" 
                      checked={authMethod === 'aadhaar'} 
                      onChange={() => setAuthMethod('aadhaar')}
                      className="accent-[#1E3A8A]" 
                    />
                    Aadhaar e-KYC
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer font-medium text-slate-700">
                    <input 
                      type="radio" 
                      name="authMethod" 
                      checked={authMethod === 'parichay'} 
                      onChange={() => setAuthMethod('parichay')}
                      className="accent-[#1E3A8A]" 
                    />
                    Jan Parichay SSO
                  </label>
                </div>
              </div>

              {!otpStep ? (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-[#0f172a]">
                      Aadhaar Number or 16-Digit Virtual ID (VID)
                    </label>
                    <input
                      type="text"
                      value={aadhaarInput}
                      onChange={(e) => setAadhaarInput(e.target.value)}
                      placeholder="XXXX XXXX XXXX"
                      className="border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:ring-1 focus:ring-[#1E3A8A] focus:outline-none font-mono"
                      required
                    />
                    <span className="text-[10px] text-slate-400">
                      e-KYC consent requested under Aadhaar Act Regulations 2016
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-[#0f172a]">Password / DigiLocker PIN</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:ring-1 focus:ring-[#1E3A8A] focus:outline-none"
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0f172a]">Enter 6-Digit OTP</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-medium">Sent to +91 98XXXXXX45</span>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value)}
                    placeholder="Enter 892104"
                    className="border border-blue-300 rounded-lg px-3 py-2 text-center text-base tracking-widest font-mono font-bold text-[#0f172a] focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
                    required
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Valid for: 04:52</span>
                    <button type="button" className="text-[#1E3A8A] font-semibold hover:underline">
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Officer Form */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#0f172a]">
                  Officer User ID or Official NIC Email
                </label>
                <input
                  type="email"
                  value={officerEmail}
                  onChange={(e) => setOfficerEmail(e.target.value)}
                  placeholder="name.officer@nic.in"
                  className="border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:ring-1 focus:ring-[#1E3A8A] focus:outline-none font-mono"
                  required
                />
                <span className="text-[10px] text-slate-400">
                  Authorized access restricted to Tehsildar & Revenue Inspector cadres
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#0f172a]">Service Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:ring-1 focus:ring-[#1E3A8A] focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#0f172a]">DSC Token Serial (e-Mudhra / USB Key)</label>
                <input
                  type="text"
                  defaultValue="DSC-UP-REV-2026-9810-CERT-OK"
                  disabled
                  className="border border-slate-200 bg-slate-100 rounded-lg px-3 py-1.5 text-xs text-slate-600 font-mono"
                />
              </div>
            </>
          )}

          {/* Security Captcha */}
          <div className="flex flex-col gap-1 pt-1">
            <label className="font-bold text-[#0f172a]">Security Verification Captcha</label>
            <div className="flex items-center gap-2">
              <div className="bg-slate-200 border border-slate-300 px-3 py-2 rounded-lg font-mono text-sm tracking-widest font-extrabold text-slate-800 line-through select-none">
                {captchaInput}
              </div>
              <button
                type="button"
                onClick={() => setCaptchaInput(Math.random().toString(36).substring(2, 7).toUpperCase())}
                className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center justify-center"
                title="Refresh Captcha"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Enter text"
                defaultValue={captchaInput}
                className="flex-1 border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:ring-1 focus:ring-[#1E3A8A] focus:outline-none uppercase font-mono"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full mt-2 bg-[#1E3A8A] hover:bg-[#152b66] text-white font-medium py-2.5 px-4 rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 text-xs font-serif-gov"
          >
            {isAuthenticating ? (
              <span>Authenticating with NIC Gateway...</span>
            ) : otpStep ? (
              <span>Verify OTP & Enter Locker</span>
            ) : activeTab === 'citizen' ? (
              <span>Proceed with Aadhaar 2FA</span>
            ) : (
              <span>Sign In to Revenue Workbench</span>
            )}
          </button>

          <div className="text-center text-[10px] text-slate-400">
            Protected by NIC National Security Operations Center (NSOC)
          </div>
        </form>
      </div>
    </div>
  );
};
