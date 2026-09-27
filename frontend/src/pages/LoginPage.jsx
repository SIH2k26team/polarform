import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { DEMO_USERS } from '../data/mockData';

export const LoginPage = ({
  currentUser,
  onLoginSuccess,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('p.sunitha@ncpor.res.in');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');

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
    onNavigate('explore');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-[820px] min-h-[560px] bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left: Branding Panel */}
        <div className="relative bg-gradient-to-br from-blue-500 via-blue-350 to-blue-900 p-8 flex flex-col justify-center items-center text-center text-white">
          {/* Subtle BG overlay */}
          <div
            className="absolute inset-0 opacity-15 mix-blend-overlay bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80')`
            }}
          ></div>

          <div className="relative space-y-4">
            <div className="flex items-center justify-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Icon name="polar-logo" className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight">Polar Nexus</span>
            </div>

            <p className="text-sm text-blue-100 leading-relaxed max-w-[240px] mx-auto">
              Join the mission to make Indian polar science accessible, discoverable and impactful.
            </p>
          </div>


        </div>

        {/* Right: Auth Form */}
        <div className="p-6 sm:p-8 flex flex-col justify-center">

          {/* Login / Sign Up Tabs */}
          <div className="flex mb-6 border-b border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 pb-2.5 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'login'
                ? 'text-blue-600 border-blue-600'
                : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 pb-2.5 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'signup'
                ? 'text-blue-600 border-blue-600'
                : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm transition-colors"
            >
              {activeTab === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {activeTab === 'login' && (
            <p className="mt-3 text-center text-[11px] text-blue-500 hover:text-blue-700 cursor-pointer">
              Forgot password?
            </p>
          )}



          {/* Quick Demo Switcher — kept for SIH prototype */}
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Demo Quick Access
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickLogin(DEMO_USERS[0])}
                className="p-1.5 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-left transition-colors"
              >
                <p className="text-[10px] font-bold text-slate-700 truncate">Dr. Ramesh</p>
                <p className="text-[9px] text-blue-500 font-medium">Researcher</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin(DEMO_USERS[1])}
                className="p-1.5 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-left transition-colors"
              >
                <p className="text-[10px] font-bold text-slate-700 truncate">Dr. Sunitha</p>
                <p className="text-[9px] text-blue-500 font-medium">Reviewer</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin(DEMO_USERS[2])}
                className="p-1.5 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg text-left transition-colors"
              >
                <p className="text-[10px] font-bold text-slate-700 truncate">Dr. Rajeshwar</p>
                <p className="text-[9px] text-blue-500 font-medium">Admin</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
