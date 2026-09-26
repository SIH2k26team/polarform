import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { DEMO_USERS } from '../data/mockData';

export const LoginPage = ({
  currentUser,
  onLoginSuccess,
  onNavigate
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('p.sunitha@ncpor.res.in');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedUser = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || DEMO_USERS[1];
    onLoginSuccess(matchedUser);
  };

  const handleQuickLogin = (user) => {
    setEmail(user.email);
    onLoginSuccess(user);
  };

  const handlePublicAccess = () => {
    const publicUser = DEMO_USERS.find(u => u.role === 'Public / Student') || DEMO_USERS[3];
    onLoginSuccess(publicUser);
    onNavigate('explore');
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 sm:p-6 bg-slate-50">
      <div className="max-w-4xl w-full bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Polar Visual Banner */}
        <div className="relative bg-gradient-to-br from-blue-900 via-sky-900 to-slate-900 p-8 text-white flex flex-col justify-between overflow-hidden">
          <div
            className="absolute inset-0 opacity-25 mix-blend-overlay bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80')`
            }}
          ></div>

          <div className="relative space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Icon name="polar-logo" className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight">PolarSetu</span>
                <p className="text-[11px] text-blue-200">Unified Knowledge & Outreach</p>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold leading-snug">
              Making Indian polar science accessible, discoverable and impactful.
            </h2>
            <p className="text-xs text-blue-100 leading-relaxed">
              Unified platform linking Indian Arctic (Himadri), Antarctic (Bharati & Maitri), Southern Ocean and Himalayan (Himansh) research.
            </p>
          </div>

          <div className="relative pt-6 text-[11px] text-blue-200 border-t border-blue-800/60 space-y-1">
            <p className="font-semibold text-white">National Centre for Polar and Ocean Research (NCPOR)</p>
            <p className="text-blue-300">Ministry of Earth Sciences, Govt. of India</p>
          </div>
        </div>

        {/* Right Side: Authentication & Open Public Access */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          {/* Section 1: Free Public / Student / Teacher Access - NO LOGIN REQUIRED */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
              <span className="p-1 bg-emerald-100 rounded-full text-emerald-700">
                <Icon name="check-circle" size={14} />
              </span>
              Students, Teachers & Public Visitors
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              <strong>No login or registration required!</strong> You can freely explore research records, read student explainers, and search expeditions right now.
            </p>
            <button
              type="button"
              onClick={handlePublicAccess}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="book-open" size={14} />
              Continue without Login (Explore & Learn)
            </button>
          </div>

          {/* Section 2: Staff / Researcher / Reviewer Sign-in */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Researcher & Staff Sign-in
                </h3>
                <p className="text-[11px] text-slate-500">Required only for uploading or reviewing scientific records</p>
              </div>
            </div>

            {/* Quick Demo Switcher Buttons */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Instant Demo Access (Click to test roles)
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin(DEMO_USERS[0])}
                  className="p-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-left transition-colors"
                >
                  <p className="text-[11px] font-bold text-slate-800 truncate">Dr. Ramesh</p>
                  <p className="text-[10px] text-blue-600 font-medium">Researcher</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin(DEMO_USERS[1])}
                  className="p-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-left transition-colors"
                >
                  <p className="text-[11px] font-bold text-slate-800 truncate">Dr. Sunitha</p>
                  <p className="text-[10px] text-blue-600 font-medium">Reviewer</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin(DEMO_USERS[2])}
                  className="p-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-left transition-colors"
                >
                  <p className="text-[11px] font-bold text-slate-800 truncate">Dr. Rajeshwar</p>
                  <p className="text-[10px] text-blue-600 font-medium">Admin</p>
                </button>
              </div>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700">Institutional Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. scientist@ncpor.res.in"
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-semibold text-slate-700">Password</label>
                  <span className="text-[10px] text-slate-400">Demo Prototype</span>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
              >
                Sign In to Staff Portal
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
