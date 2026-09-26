/**
 * AccessDenied — shown when a user navigates to a page they cannot access.
 * Also used inline inside pages to hide role-restricted panels.
 */
import React from 'react';
import { Icon } from './Icon';
import { ROLE_DESCRIPTIONS, ROLES } from '../auth/permissions';

// ─── Full-page access denied wall ────────────────────────────────────────────
export const AccessDeniedPage = ({ currentUser, requiredRole, onNavigate }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-500 mx-auto flex items-center justify-center">
        <Icon name="shield-check" size={28} />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">Access Restricted</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Your current role (<span className="font-semibold text-blue-700">{currentUser?.role || 'Guest'}</span>) does not have permission to view this page.
        </p>
        {requiredRole && (
          <p className="text-xs text-slate-500">
            Required: <span className="font-semibold">{requiredRole}</span> or above.
          </p>
        )}
      </div>

      {/* Role capability reminder */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 text-xs">
        <p className="font-bold text-slate-700 mb-2">What your current role can do:</p>
        <p className="text-slate-600 leading-relaxed">
          {ROLE_DESCRIPTIONS[currentUser?.role] || 'Please log in to access platform features.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => onNavigate('login')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors"
        >
          Switch Role / Login
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

// ─── Inline permission-denied notice (used inside pages for hidden panels) ────
export const AccessDeniedInline = ({ message, role }) => {
  return (
    <div className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
        <Icon name="shield-check" size={15} />
      </div>
      <div>
        <span className="font-semibold text-slate-700 block">
          {message || 'This action requires a higher permission level.'}
        </span>
        {role && (
          <span className="text-[11px] text-slate-400">
            Requires: {role}
          </span>
        )}
      </div>
    </div>
  );
};

// ─── Role Badge (used in Navbar dropdown & Dashboard) ────────────────────────
export const RoleBadge = ({ role, className = '' }) => {
  const styles = {
    [ROLES.PUBLIC]:     'bg-slate-100 text-slate-700 border-slate-200',
    [ROLES.RESEARCHER]: 'bg-blue-50 text-blue-700 border-blue-200',
    [ROLES.REVIEWER]:   'bg-amber-50 text-amber-700 border-amber-200',
    [ROLES.ADMIN]:      'bg-purple-50 text-purple-700 border-purple-200',
  };

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${styles[role] || 'bg-slate-100 text-slate-700 border-slate-200'} ${className}`}>
      {role}
    </span>
  );
};
