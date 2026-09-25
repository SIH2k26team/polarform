import React from 'react';
import { Icon } from './Icon';

export const NotificationToast = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border text-sm ${
        isSuccess ? 'bg-white text-slate-800 border-emerald-200 ring-1 ring-emerald-500/20' :
        isError ? 'bg-white text-slate-800 border-rose-200 ring-1 ring-rose-500/20' :
        'bg-white text-slate-800 border-blue-200 ring-1 ring-blue-500/20'
      }`}>
        <div className={`p-1 rounded-full shrink-0 ${
          isSuccess ? 'bg-emerald-100 text-emerald-600' :
          isError ? 'bg-rose-100 text-rose-600' :
          'bg-blue-100 text-blue-600'
        }`}>
          <Icon name={isSuccess ? 'check' : isError ? 'x-circle' : 'info'} size={18} />
        </div>
        <div className="flex-1 pr-2">
          {toast.title && <h5 className="font-semibold text-xs text-slate-900 mb-0.5">{toast.title}</h5>}
          <p className="text-xs text-slate-600">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
        >
          <Icon name="x-circle" size={14} />
        </button>
      </div>
    </div>
  );
};
