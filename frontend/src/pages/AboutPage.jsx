import React from 'react';
import { Icon } from '../components/Icon';

export const AboutPage = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
            SIH 2026 • PS 26063
          </span>
          <span className="text-xs text-slate-400">Theme: Smart Education / Polar Science</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          About PolarSetu
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          A Unified Knowledge, Discovery and Outreach Platform for Indian Polar Science
        </p>
      </div>

      {/* Core Gap & Mission */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs text-slate-700 leading-relaxed">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Icon name="layers" size={18} className="text-blue-600" />
          The Core Problem We Are Solving
        </h2>
        <p>
          India's polar and Southern Ocean research programme, managed by the <strong>National Centre for Polar and Ocean Research (NCPOR)</strong>, produces rich expedition reports, datasets, research papers, field photos, and educational updates.
        </p>
        <p>
          Currently, these vital resources live in separate systems:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li><strong>NPDC (National Polar Data Centre):</strong> Holds scientific dataset metadata and raw files.</li>
          <li><strong>NCPOR Digital Repository:</strong> Houses technical expedition reports and publications.</li>
          <li><strong>Institutional Website & Social Media:</strong> Contains public announcements and outreach photos.</li>
        </ul>
        <p>
          Because these systems are not interconnected, a single expedition's complete scientific journey cannot be discovered in one place. Furthermore, turning complex technical findings into student-friendly explainers or social media posts requires manual rewriting from scratch each time.
        </p>
      </div>

      {/* Solution Architecture */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs text-slate-700 leading-relaxed">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Icon name="shield-check" size={18} className="text-emerald-600" />
          The PolarSetu Architecture: Linking + Human-in-the-Loop
        </h2>
        <p>
          PolarSetu acts as an intelligent discovery and outreach layer that connects to existing archives without replacing them:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">1. Knowledge Linking</h3>
            <p className="text-[11px] text-slate-600">
              Anchors expeditions to scientists, datasets, peer-reviewed papers, photos, and public explainers in one unified graph.
            </p>
          </div>

          <div className="p-4 bg-blue-50/60 rounded-lg border border-blue-200 space-y-2">
            <h3 className="font-bold text-blue-950 text-sm">2. AI Drafting Adapter</h3>
            <p className="text-[11px] text-slate-600">
              Extracts text from uploaded documents and automatically drafts plain-language summaries, student explainers, and outreach captions.
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 space-y-2">
            <h3 className="font-bold text-emerald-950 text-sm">3. Human Review Gate</h3>
            <p className="text-[11px] text-emerald-800">
              AI outputs are strictly non-destructive drafts. No content goes public without approval by a verified scientist or reviewer.
            </p>
          </div>
        </div>
      </div>

      {/* Indian Polar Stations Profile */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Icon name="compass" size={18} className="text-sky-600" />
          Indian Polar & Cryospheric Research Bases
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 border border-slate-200 rounded-lg space-y-1">
            <span className="font-bold text-slate-900 text-sm">Bharati Station (Antarctica)</span>
            <p className="text-slate-500 text-[11px]">Larsemann Hills • 69°24'S, 76°11'E • Est. 2012</p>
            <p className="text-slate-600 pt-1">
              State-of-the-art modern research base focusing on glaciology, biology, and ISRO satellite ground telemetry.
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg space-y-1">
            <span className="font-bold text-slate-900 text-sm">Maitri Station (Antarctica)</span>
            <p className="text-slate-500 text-[11px]">Schirmacher Oasis • 70°46'S, 11°44'E • Est. 1988</p>
            <p className="text-slate-600 pt-1">
              Year-round station dedicated to atmospheric sciences, geomagnetism, meteorology, and paleoclimate research.
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg space-y-1">
            <span className="font-bold text-slate-900 text-sm">Himadri Station (Arctic)</span>
            <p className="text-slate-500 text-[11px]">Ny-Ålesund, Svalbard, Norway • 78°55'N • Est. 2008</p>
            <p className="text-slate-600 pt-1">
              India's permanent Arctic research base studying aerosols, black carbon, fjords, and Arctic-Monsoon linkages.
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg space-y-1">
            <span className="font-bold text-slate-900 text-sm">Himansh Station (Himalayas)</span>
            <p className="text-slate-500 text-[11px]">Chandra Basin, Himachal Pradesh • 4,080m • Est. 2016</p>
            <p className="text-slate-600 pt-1">
              High-altitude research facility monitoring glacier mass balance and the Himalayan Third Pole cryosphere.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm">Explore the Live Prototype Records</h3>
          <p className="text-xs text-slate-400">Discover all 12 interconnected sample records, review queues, and explainers.</p>
        </div>
        <button
          onClick={() => onNavigate('explore')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
        >
          Explore Records Now
        </button>
      </div>
    </div>
  );
};
