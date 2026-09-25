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
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Polar Visual Banner matching Reference Screenshot */}
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
              className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-colors ${
                !isSignUp ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-colors ${
                isSignUp ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-400 hover:text-slate-700'
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

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-[11px] text-slate-400">OR</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <button
              type="button"
              onClick={() => handleQuickLogin(DEMO_USERS[0])}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Continue with Google (Demo)
            </button>
          </form>

          {/* Quick Demo Role Selector */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Quick 1-Click Demo Login
            </span>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleQuickLogin(user)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-left transition-colors"
                >
                  <p className="font-bold text-[11px] text-slate-800 truncate">{user.name}</p>
                  <p className="text-[10px] text-blue-600 font-medium">{user.role}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
