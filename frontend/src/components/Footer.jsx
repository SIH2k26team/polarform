import React from 'react';
import { Icon } from './Icon';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white">
                <Icon name="polar-logo" className="w-5 h-5" />
              </div>
              PolarSetu
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Unified Knowledge, Discovery and Outreach Platform for Indian Polar Science. Bridging expeditions, datasets, reports, and public education.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">Platform Navigation</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home / Overview</button></li>
              <li><button onClick={() => onNavigate('explore')} className="hover:text-white transition-colors">Explore All Records</button></li>
              <li><button onClick={() => onNavigate('upload')} className="hover:text-white transition-colors">Upload New Record</button></li>
              <li><button onClick={() => onNavigate('ai-review')} className="hover:text-white transition-colors">AI Draft Review Gate</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">Review Queue & Audit Log</button></li>
            </ul>
          </div>

          {/* Col 3: Polar Stations & Programs */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">Indian Polar Facilities</h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <strong>Bharati Station</strong> (Larsemann Hills, Antarctica)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <strong>Maitri Station</strong> (Schirmacher Oasis, Antarctica)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <strong>Himadri Station</strong> (Ny-Ålesund, Svalbard, Arctic)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <strong>Himansh Station</strong> (Western Himalayas, 4000m+)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© 2026 PolarSetu • Ministry of Earth Sciences (MoES) & NCPOR </p>
        </div>
      </div>
    </footer>
  );
};
