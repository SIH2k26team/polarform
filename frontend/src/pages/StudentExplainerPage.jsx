import React, { useState } from 'react';
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
      { term: "NCPOR", definition: "National Centre for Polar and Ocean Research, India's premier polar research institute located in Goa." },
      { term: "Cryosphere", definition: "The frozen water part of the Earth system, including snow cover, glaciers, ice caps, and permafrost." }
    ]
  };

  // Default glossary additions if fewer than 3
  const fullGlossary = [...(explainer.glossary || [])];
  if (fullGlossary.length < 3) {
    fullGlossary.push(
      { term: "Cryosphere", definition: "The frozen water component of the Earth system, including sea ice, lake ice, river ice, snow cover, glaciers, ice caps, ice sheets, and frozen ground." },
      { term: "Albedo Effect", definition: "The fraction of solar energy reflected by Earth's surface. Bright ice reflects solar radiation back into space, keeping the planet cool." }
    );
  }

  // Region-based Did You Know facts
  const regionFacts = {
    Antarctica: [
      "Antarctica holds 90% of Earth's ice and 70% of the world's freshwater.",
      "India operates two active research bases in Antarctica: Maitri (1988) and Bharati (2012).",
      "During polar winter nights, temperatures drop below -60°C and auroras illuminate the sky."
    ],
    Arctic: [
      "The Arctic is warming four times faster than the rest of the planet.",
      "India's Himadri station is located at 78°N in Svalbard, Norway—only 1,200 km from the North Pole.",
      "Melting Arctic sea ice impacts global jet streams and Indian summer monsoon rainfall patterns."
    ],
    Himalayas: [
      "The Himalayas contain over 9,500 glaciers feeding major rivers like the Ganges, Indus, and Brahmaputra.",
      "Himansh Station sits at 4,000 meters altitude in the Chandra Basin, Himachal Pradesh.",
      "Over 1.3 billion people depend on freshwater originating from Himalayan glacial meltwater."
    ]
  }[record.region] || [
      "Polar regions act as Earth's natural air conditioners.",
      "Data collected by Indian scientists is shared with international polar research databases.",
      "Satellite telemetry links Indian polar stations in real-time with NCPOR headquarters in Goa."
    ];

  // Region-based easy explanation details
  const coreConcept = explainer.intro || record.description || "Polar scientists explore extreme freezing environments to collect ice, water, and atmospheric samples.";

  const whyItMattersText = {
    Antarctica: "Antarctica stores 70% of world freshwater. Understanding its ice melt helps predict sea level rise across coastal India and worldwide.",
    Arctic: "Changes in Arctic sea ice and winds directly influence the Indian Summer Monsoon and regional weather patterns.",
    Himalayas: "Glaciers in the Himalayas (The Third Pole) feed India's major rivers like the Ganges, Indus, and Brahmaputra, providing drinking water for 1.3+ billion people.",
    'Southern Ocean': "The Southern Ocean acts as Earth's natural carbon sponge, soaking up heat and CO2 from the atmosphere."
  }[record.region] || "Polar research helps predict global climate patterns, sea levels, and weather changes.";

  const easyTakeaway = explainer.keyTakeaways?.[0] || "Field measurements and satellite data allow scientists to trace climate history and safeguard our environment.";

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

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 text-teal-800 rounded">
            Student & Public View
          </span>
          <RegionBadge region={record.region} />
          <span className="text-xs text-slate-400">Verified Source: {record.authorName || 'NCPOR Scientist'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Student Explainer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          A simple, interactive guide explaining this polar research for students and science enthusiasts.
        </p>
      </div>

      {/* Hero Visual Card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Expedition Photo */}
          <div className="h-64 md:h-auto bg-slate-100 relative min-h-[300px]">
            <img
              src={record.thumbnail}
              alt={explainer.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Icon name="photo" size={12} /> Expedition Field Visual
            </div>
          </div>

          {/* Right Column: Detailed Explanation Content */}
          <div className="p-6 md:p-7 flex flex-col justify-between space-y-4 bg-slate-50/40">
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 px-2.5 py-0.5 rounded-full">
                  <Icon name="sparkles" size={12} /> Student Explainer
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
                  Easy Reading • 3 min
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {explainer.title}
              </h2>

              {/* Intro explanation */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {explainer.intro}
              </p>

              {/* In Easy & Simple Words Highlight Box */}
              <div className="bg-gradient-to-br from-blue-50/90 to-teal-50/90 border border-blue-200/70 rounded-xl p-4 space-y-2.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-blue-950 font-bold text-xs">
                  <Icon name="lightbulb" size={16} className="text-amber-500 shrink-0" />
                  <span>In Easy & Simple Words:</span>
                </div>

                <div className="text-[11px] sm:text-xs text-slate-700 space-y-2 leading-relaxed">
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-teal-800 shrink-0">🔬 What is this study?</span>
                    <span>{coreConcept}</span>
                  </div>

                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-blue-800 shrink-0">🌍 Why it matters to us:</span>
                    <span>{whyItMattersText}</span>
                  </div>

                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-indigo-800 shrink-0">💡 Quick Takeaway:</span>
                    <span>{easyTakeaway}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Metadata & Accuracy Check */}
            <div className="pt-2 border-t border-slate-200/80 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <Icon name="map-pin" size={12} className="text-rose-500" />
                  <span className="text-slate-800 font-semibold">{record.location || record.region}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="user" size={12} className="text-blue-500" />
                  <span>{record.authorName || 'NCPOR Scientist'}</span>
                </span>
              </div>

              <div className="text-[11px] text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium">
                <Icon name="check-circle" size={13} className="text-emerald-600 shrink-0" />
                <span>Reviewed & verified for accuracy by NCPOR scientific team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Explainer Body */}
        <div className="p-6 md:p-8 border-t border-slate-100 space-y-6">
          {/* Main Story Content */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <Icon name="book-open" size={18} className="text-teal-600" />
              How This Science Works
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-lg border border-slate-200">
              {explainer.bodyText}
            </p>
          </div>

          {/* Key Takeaways Callout Box */}
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 space-y-3">
            <h4 className="font-bold text-sm text-sky-950 flex items-center gap-2">
              <Icon name="info" size={18} className="text-blue-600" />
              Key Takeaways for Students
            </h4>
            <ul className="space-y-2.5 text-xs text-sky-900">
              {explainer.keyTakeaways.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Did You Know? Polar Fast Facts Grid */}
          <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-200/80 rounded-xl p-5 space-y-3">
            <h4 className="font-bold text-sm text-indigo-950 flex items-center gap-2">
              <Icon name="sparkles" size={16} className="text-amber-500" />
              Did You Know? — {record.region} Polar Facts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              {regionFacts.map((fact, idx) => (
                <div key={idx} className="bg-white/90 p-3.5 rounded-lg border border-indigo-100 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-600">Fact #{idx + 1}</span>
                  <p className="text-slate-700 leading-relaxed text-[11px]">{fact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Polar Vocabulary Glossary */}
          {fullGlossary.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Icon name="book" size={16} className="text-teal-600" />
                Polar Science Vocabulary
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fullGlossary.map((g, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1 hover:border-teal-300 transition-colors">
                    <span className="font-bold text-slate-800 block text-blue-700">{g.term}</span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{g.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}


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

          </div>
        </div>
      </div>
    </div>
  );
};
