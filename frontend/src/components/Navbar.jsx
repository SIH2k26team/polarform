import React, { useState } from 'react';
import { Icon } from './Icon';
import { DEMO_USERS } from '../data/mockData';

export const Navbar = ({
  activePage,
  onNavigate,
  currentUser,
  onSwitchUser,
  pendingReviewCount = 0
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'upload', label: 'Upload' },
    {
      id: 'ai-review',
      label: 'AI Draft (Review)',
      badge: pendingReviewCount > 0 ? pendingReviewCount : null,
      highlight: pendingReviewCount > 0
    },
    { id: 'outreach', label: 'Outreach' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'about', label: 'About' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
                <Icon name="polar-logo" className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xl tracking-tight text-slate-900">PolarSetu</span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block leading-none">
                  Unified Indian Polar Science Knowledge Portal
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 relative ${isActive
                      ? 'text-blue-700 bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold leading-none text-white bg-amber-500 rounded-full animate-pulse">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Side Controls / User Profile & Role Selector */}
          <div className="flex items-center gap-3">
            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                title="Switch Demo Role"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-300"
                />
                <div className="hidden lg:block text-xs">
                  <div className="font-semibold text-slate-800 leading-tight truncate max-w-[120px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-blue-600 font-medium">
                    Role: {currentUser.role}
                  </div>
                </div>
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Switch Demo Role
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Test multi-role review workflows & permissions
                    </p>
                  </div>
                  <div className="py-1">
                    {DEMO_USERS.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => onSwitchUser(user)}
                        className={`w-full text-left px-3 py-2 flex items-center gap-3 text-xs hover:bg-slate-50 transition-colors ${currentUser.id === user.id ? 'bg-blue-50/70 border-l-2 border-blue-600 font-medium' : ''
                          }`}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 truncate">{user.name}</p>
                          <p className="text-slate-500 text-[11px] truncate">{user.designation}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                          {user.role}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 pt-1 px-3 mt-1">
                    <button
                      onClick={() => onNavigate('login')}
                      className="w-full text-center py-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Open Login / Authentication Screen
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Action Button */}
            <button
              onClick={() => onNavigate('upload')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <Icon name="upload" size={14} />
              Upload Record
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav strip */}
      <div className="md:hidden border-t border-slate-200 bg-slate-50 px-2 py-1.5 overflow-x-auto flex items-center gap-1 text-xs">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`px-2.5 py-1 rounded whitespace-nowrap font-medium ${activePage === link.id
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-200'
              }`}
          >
            {link.label}
            {link.badge && (
              <span className="ml-1 px-1 bg-amber-500 text-white rounded-full text-[10px]">
                {link.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
};
