import React from 'react';
import { Icon } from '../components/Icon';
import { RegionBadge } from '../components/Badge';

export const StudentExplainerPage = ({
  record,
  onOpenRecordDetails,
  onOpenOutreach,
  onBackToSearch
}) => {
  if (!record) return null;

  const explainer = record.aiDraft?.studentExplainer || {
    title: `Understanding ${record.title}`,
    intro: "A student-friendly look at how Indian polar scientists study our planet's climate and ecosystems.",
    bodyText: record.description,
    keyTakeaways: [
      "Scientific measurements reveal crucial trends in polar climate systems.",
      "Data gathered from expeditions helps predict global sea levels and monsoon behavior.",
      "Indian polar research stations provide front-row seats to understanding Earth's changes."
    ],
    glossary: [
      { term: "Polar Science", definition: "The scientific study of Earth's freezing Arctic, Antarctic, and high mountain regions." },
      { term: "NCPOR", definition: "National Centre for Polar and Ocean Research, India's premier polar research institute located in Goa." }
    ]
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Student Explainer link copied to clipboard!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Back link */}
      <button
        onClick={onBackToSearch}
        className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
      >
        <Icon name="arrow-left" size={14} /> Back to Search / Records
      </button>

      {/* Header matching Reference Screenshot */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-teal-100 text-teal-800 rounded">
            Student & Public View
          </span>
          <RegionBadge region={record.region} />
          <span className="text-xs text-slate-400">Verified Source: {record.authorName || 'NCPOR Scientist'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Student Explainer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          A simple explanation of this research for students and curious minds.
        </p>
      </div>

      {/* Hero Visual Card matching Reference UI */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-64 md:h-auto bg-slate-100 relative">
            <img
              src={record.thumbnail}
              alt={explainer.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {explainer.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {explainer.intro}
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Checked for accuracy by NCPOR scientific reviewers</span>
            </div>
          </div>
        </div>

        {/* Explainer Story Body */}
        <div className="p-6 md:p-8 border-t border-slate-100 space-y-6">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">How This Science Works</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {explainer.bodyText}
            </p>
          </div>

          {/* Key Takeaways Callout Box matching Reference UI */}
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 space-y-3">
            <h4 className="font-bold text-sm text-sky-950 flex items-center gap-2">
              <Icon name="info" size={18} className="text-blue-600" />
              Key Takeaways
            </h4>
            <ul className="space-y-2 text-xs text-sky-900">
              {explainer.keyTakeaways.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Polar Glossary */}
          {explainer.glossary && explainer.glossary.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Icon name="book" size={16} className="text-teal-600" />
                Polar Science Vocabulary
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {explainer.glossary.map((g, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-800 block text-blue-700">{g.term}</span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{g.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expedition Journey Timeline */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Icon name="clock" size={16} className="text-indigo-600" />
              From Field Expedition to Verified Discovery
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block">1. Field Sampling</span>
                <p className="text-[11px] text-slate-500 mt-1">Collected at {record.location}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block">2. Lab Analysis</span>
                <p className="text-[11px] text-slate-500 mt-1">Processed at NCPOR Goa facility</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block">3. Peer Review</span>
                <p className="text-[11px] text-slate-500 mt-1">Human reviewed and fact-checked</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="font-bold text-emerald-800 block">4. Public Explainer</span>
                <p className="text-[11px] text-emerald-700 mt-1">Shared for Indian students</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onOpenRecordDetails(record)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <Icon name="file-text" size={14} /> View Verified Scientific Source Record
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Icon name="copy" size={13} /> Copy Link
            </button>
            <button
              onClick={() => onOpenOutreach(record)}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Icon name="share" size={13} /> Outreach Pack
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
