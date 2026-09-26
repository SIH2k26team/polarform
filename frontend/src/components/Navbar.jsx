import React, { useState } from 'react';
import { Icon } from './Icon';
import { RoleBadge } from './AccessDenied';
import { DEMO_USERS } from '../data/mockData';
import { can, PERMISSIONS, ROLES } from '../auth/permissions';

export const Navbar = ({
  activePage,
  onNavigate,
  currentUser,
  onSwitchUser,
  pendingReviewCount = 0
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // ── Build nav links based on current user's role ──────────────────────────
  const allLinks = [
    {
      id: 'home',
      label: 'Home',
      permission: null           // always visible
    },
    {
      id: 'explore',
      label: 'Explore',
      permission: null
    },
    {
      id: 'upload',
      label: 'Upload',
      permission: PERMISSIONS.UPLOAD_RECORD
    },
    {
      id: 'ai-review',
      label: 'Review Gate',
      permission: PERMISSIONS.VIEW_REVIEW_GATE,
      badge: pendingReviewCount > 0 ? pendingReviewCount : null,
    },
    {
      id: 'outreach',
      label: 'Outreach',
      permission: PERMISSIONS.VIEW_OUTREACH
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      permission: PERMISSIONS.VIEW_DASHBOARD
    },
    {
      id: 'about',
      label: 'About',
      permission: null
    }
  ];

  // Only show links the current user is allowed to navigate to
  const navLinks = allLinks.filter(link =>
    link.permission === null || can(currentUser, link.permission)
  );

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
                <span className="font-bold text-xl tracking-tight text-slate-900">PolarSetu</span>
                <p className="text-[11px] text-slate-500 hidden sm:block leading-none">
                  Unified Indian Polar Science Knowledge Portal
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links — role-filtered */}
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

          {/* Right Side: User Profile & Role Switcher */}
          <div className="flex items-center gap-3">
            {/* User Menu */}
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
                    {currentUser.role}
                  </div>
                </div>
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50"
                  onClick={() => setShowUserMenu(false)}
                >
                  {/* Current user info */}
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
                    <div className="flex items-center gap-3">
                      <img src={currentUser.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-300" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-xs text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                      <RoleBadge role={currentUser.role} />
                    </div>
                  </div>

                  {/* Role capability summary */}
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Your Access</p>
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      <span className={`flex items-center gap-1 ${can(currentUser, PERMISSIONS.UPLOAD_RECORD) ? 'text-emerald-700' : 'text-slate-300'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${can(currentUser, PERMISSIONS.UPLOAD_RECORD) ? 'bg-emerald-500' : 'bg-slate-200'}`}></span>
                        Upload Records
                      </span>
                      <span className={`flex items-center gap-1 ${can(currentUser, PERMISSIONS.VIEW_REVIEW_GATE) ? 'text-emerald-700' : 'text-slate-300'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${can(currentUser, PERMISSIONS.VIEW_REVIEW_GATE) ? 'bg-emerald-500' : 'bg-slate-200'}`}></span>
                        Review Gate {currentUser.role === 'Researcher' ? '(Own)' : ''}
                      </span>
                      <span className={`flex items-center gap-1 ${can(currentUser, PERMISSIONS.APPROVE_REJECT) ? 'text-emerald-700' : 'text-slate-300'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${can(currentUser, PERMISSIONS.APPROVE_REJECT) ? 'bg-emerald-500' : 'bg-slate-200'}`}></span>
                        Approve / Publish
                      </span>
                      <span className={`flex items-center gap-1 ${can(currentUser, PERMISSIONS.VIEW_OUTREACH) ? 'text-emerald-700' : 'text-slate-300'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${can(currentUser, PERMISSIONS.VIEW_OUTREACH) ? 'bg-emerald-500' : 'bg-slate-200'}`}></span>
                        Outreach Studio
                      </span>
                      <span className={`flex items-center gap-1 ${can(currentUser, PERMISSIONS.VIEW_AUDIT_LOG) ? 'text-emerald-700' : 'text-slate-300'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${can(currentUser, PERMISSIONS.VIEW_AUDIT_LOG) ? 'bg-emerald-500' : 'bg-slate-200'}`}></span>
                        Audit Trail
                      </span>
                      <span className={`flex items-center gap-1 ${can(currentUser, PERMISSIONS.MANAGE_USERS) ? 'text-emerald-700' : 'text-slate-300'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${can(currentUser, PERMISSIONS.MANAGE_USERS) ? 'bg-emerald-500' : 'bg-slate-200'}`}></span>
                        User Management
                      </span>
                    </div>
                  </div>

                  {/* Switch Role */}
                  <div className="px-4 pt-2 pb-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Switch Demo Role</p>
                  </div>
                  <div className="py-1">
                    {DEMO_USERS.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => onSwitchUser(user)}
                        className={`w-full text-left px-4 py-2 flex items-center gap-3 text-xs hover:bg-slate-50 transition-colors ${
                          currentUser.id === user.id ? 'bg-blue-50/70 border-l-2 border-blue-600' : ''
                        }`}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 truncate text-xs">{user.name}</p>
                          <p className="text-slate-400 text-[10px] truncate">{user.designation}</p>
                        </div>
                        <RoleBadge role={user.role} />
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

            {/* Upload Button — only shown to users who can upload */}
            {can(currentUser, PERMISSIONS.UPLOAD_RECORD) && (
              <button
                onClick={() => onNavigate('upload')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <Icon name="upload" size={14} />
                Upload Record
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav strip — role-filtered */}
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
