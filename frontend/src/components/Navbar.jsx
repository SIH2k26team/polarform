import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './Icon';
import { RoleBadge } from './AccessDenied';
import { DEMO_USERS } from '../data/mockData';
import { can, PERMISSIONS, ROLES } from '../auth/permissions';

export const Navbar = ({
  activePage,
  onNavigate,
  currentUser,
  onSwitchUser,
  pendingReviewCount = 0,
  isLoggedIn = false,
  onLogout
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // If user is NOT signed in, show public links (home, explore, about).
  // After sign in, remove 'about' link and show internal portal links based on role.
  const navLinks = !isLoggedIn
    ? allLinks.filter(link => ['home', 'explore', 'about'].includes(link.id))
    : allLinks.filter(link =>
      link.id !== 'about' && (link.permission === null || can(currentUser, link.permission))
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
                <span className="font-bold text-xl tracking-tight text-slate-900">Polar Nexus</span>
                <p className="text-[11px] text-slate-500 hidden sm:block leading-none">
                  Unified Indian Polar Science Knowledge Portal
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links — role-filtered or home-filtered */}
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

          {/* Right Side: Sign In button when NOT signed in, User Profile when signed in */}
          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <button
                onClick={() => onNavigate('login')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Icon name="log-in" size={16} />
                <span>Sign In</span>
              </button>
            ) : (
              <>
                {/* User Menu */}
                <div className="relative" ref={dropdownRef}>
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

                      {/* Switch Role */}
                      <div className="px-4 pt-2 pb-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Switch Demo Role</p>
                      </div>
                      <div className="py-1">
                        {DEMO_USERS.map((user) => (
                          <button
                            key={user.id}
                            onClick={() => onSwitchUser(user)}
                            className={`w-full text-left px-4 py-2 flex items-center gap-3 text-xs hover:bg-slate-50 transition-colors ${currentUser.id === user.id ? 'bg-blue-50/70 border-l-2 border-blue-600' : ''
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

                      {onLogout && (
                        <div className="border-t border-slate-100 pt-2 px-3 mt-1">
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              onLogout();
                            }}
                            className="w-full text-center py-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center justify-center gap-1.5  rounded transition-colors"
                          >
                            Log Out
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
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
