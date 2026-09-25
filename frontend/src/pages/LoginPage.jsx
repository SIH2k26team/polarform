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

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-3xl h-800px w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Polar Visual Banner  */}
        <div className="relative bg-gradient-to-br from-blue-900 via-sky-900 to-slate-900 p-8 text-white flex flex-col justify-between overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80')`
            }}
          ></div>

          <div className="relative space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Icon name="polar-logo" className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight">PolarSetu</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
              Join the mission to make polar science accessible, discoverable and impactful.
            </h2>
            <p className="text-xs text-blue-100 leading-relaxed">
              Unified platform linking Indian Arctic, Antarctic, Southern Ocean and Himalayan research.
            </p>
          </div>

          <div className="relative pt-8 text-[11px] text-blue-200 border-t border-blue-800/60">
            <p>National Centre for Polar and Ocean Research (NCPOR)</p>
            <p className="text-blue-300">Ministry of Earth Sciences, Govt. of India</p>
          </div>
        </div>

        {/* Right Side: Login / Sign Up Form matching Reference UI */}
        <div className="p-8 flex flex-col justify-center space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-colors ${!isSignUp ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-colors ${isSignUp ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Demo Prototype: Use any demo role below for instant login."); }} className="text-[11px] text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              {isSignUp ? "Create Account" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
