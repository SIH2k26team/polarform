import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { ContentTypeBadge, RegionBadge, StatusBadge } from '../components/Badge';

export const HomePage = ({
  records,
  onNavigate,
  onSelectRecord,
  onOpenStudentView,
  onOpenOutreach
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onNavigate('explore', { query: searchQuery });
  };

  const publishedRecords = records.filter(r => r.status === 'Published');
  const featuredRecords = publishedRecords.slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 via-sky-900 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 overflow-hidden rounded-b-2xl shadow-md">
        {/* Polar backdrop visual effect */}
        <div 
          className="absolute inset-0 opacity-25 mix-blend-overlay bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80')`
          }}
        ></div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-medium backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            National Centre for Polar and Ocean Research (NCPOR) Portal
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            PolarSetu
          </h1>
          <p className="text-base sm:text-xl text-blue-100 max-w-2xl mx-auto font-normal">
            A Unified Knowledge, Discovery and Outreach Platform for Indian Polar Science
          </p>
          <p className="text-xs sm:text-sm text-sky-200 tracking-wide font-medium">
            Research. Explore. Learn. Share.
          </p>

          {/* Central Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mt-6">
            <div className="relative flex items-center shadow-lg rounded-xl overflow-hidden bg-white">
              <div className="pl-4 text-slate-400">
                <Icon name="search" size={20} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for expeditions, datasets, scientists, reports..."
                className="w-full py-3.5 px-3 text-slate-800 text-sm focus:outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <span>Search</span>
                <Icon name="search" size={16} />
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-sky-200">
              <span className="text-sky-300">Popular topics:</span>
              {['Ice Core 2022', 'Maitri Station', 'Himadri Arctic', 'Larsemann Penguins', 'Southern Ocean'].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => onNavigate('explore', { query: tag })}
                  className="bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-white border border-white/15 transition-colors text-[11px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* 3 Core Action Cards matching Reference UI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Discover */}
          <div 
            onClick={() => onNavigate('explore')}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Icon name="search" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
                Discover
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Explore expeditions, datasets, technical reports, photos and scientific papers in one place.
              </p>
              <div className="mt-3 inline-flex items-center text-xs font-semibold text-blue-600 group-hover:underline gap-1">
                Explore Repository <Icon name="chevron-right" size={14} />
              </div>
            </div>
          </div>

          {/* Card 2: Learn */}
          <div 
            onClick={() => {
              const explainerRec = records.find(r => r.id === 'rec-001') || publishedRecords[0];
              onOpenStudentView(explainerRec);
            }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Icon name="book-open" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-teal-600 transition-colors">
                Learn
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Get student-friendly explainers, key takeaways, glossary terms and expedition timelines.
              </p>
              <div className="mt-3 inline-flex items-center text-xs font-semibold text-teal-600 group-hover:underline gap-1">
                Open Student Explainer <Icon name="chevron-right" size={14} />
              </div>
            </div>
          </div>

          {/* Card 3: Share */}
          <div 
            onClick={() => {
              const shareRec = records.find(r => r.id === 'rec-003') || publishedRecords[0];
              onOpenOutreach(shareRec);
            }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Icon name="share" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-purple-600 transition-colors">
                Share
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Turn verified polar science into ready-to-use social captions, media packs, and web articles.
              </p>
              <div className="mt-3 inline-flex items-center text-xs font-semibold text-purple-600 group-hover:underline gap-1">
                Open Outreach Studio <Icon name="chevron-right" size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Linking & Problem-Solution Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-100 rounded-xl p-6 border border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 uppercase tracking-wide">
                <Icon name="layers" size={14} />
                Knowledge Graph Architecture
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Bridging India's Scattered Polar Science Records
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Previously, datasets lived in NPDC, reports sat in digital libraries, and social updates were posted manually. 
                <strong> PolarSetu connects all pieces together:</strong>
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700 pt-1">
                <span className="bg-white px-2.5 py-1 rounded border border-slate-200">Expedition</span>
                <span className="text-slate-400">↔</span>
                <span className="bg-white px-2.5 py-1 rounded border border-slate-200">Scientists</span>
                <span className="text-slate-400">↔</span>
                <span className="bg-white px-2.5 py-1 rounded border border-slate-200">Reports</span>
                <span className="text-slate-400">↔</span>
                <span className="bg-white px-2.5 py-1 rounded border border-slate-200">Datasets</span>
                <span className="text-slate-400">↔</span>
                <span className="bg-white px-2.5 py-1 rounded border border-slate-200">Photos & Videos</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">42+</div>
                <div className="text-xs font-medium text-slate-800">Antarctic Expeditions</div>
                <div className="text-[11px] text-slate-500">From 1st ISEA (1981) to 42nd</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-cyan-600">4 Stations</div>
                <div className="text-xs font-medium text-slate-800">Polar & Cryo Bases</div>
                <div className="text-[11px] text-slate-500">Bharati, Maitri, Himadri, Himansh</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-indigo-600">100%</div>
                <div className="text-xs font-medium text-slate-800">Human Review Gate</div>
                <div className="text-[11px] text-slate-500">AI outputs never auto-published</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-teal-600">Crossref</div>
                <div className="text-xs font-medium text-slate-800">Public API Connected</div>
                <div className="text-[11px] text-slate-500">Real DOI citation metadata</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Verified Research Records */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Featured Polar Discoveries</h2>
            <p className="text-xs text-slate-500">Peer-reviewed and verified records with connected datasets and media</p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View All ({records.length}) <Icon name="chevron-right" size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRecords.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={rec.thumbnail}
                  alt={rec.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <ContentTypeBadge type={rec.contentType} />
                  <RegionBadge region={rec.region} />
                </div>
                <div className="absolute bottom-2 right-2">
                  <StatusBadge status={rec.status} />
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Icon name="calendar" size={12} />
                    {rec.date} • {rec.institution}
                  </div>
                  <h3
                    onClick={() => onSelectRecord(rec)}
                    className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2"
                  >
                    {rec.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {rec.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {rec.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons matching User Journeys */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onSelectRecord(rec)}
                    className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    Details & Graph <Icon name="chevron-right" size={12} />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenStudentView(rec)}
                      className="text-[11px] px-2 py-1 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded font-medium transition-colors"
                      title="Read Student Explainer"
                    >
                      Student View
                    </button>
                    <button
                      onClick={() => onOpenOutreach(rec)}
                      className="text-[11px] px-2 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded font-medium transition-colors"
                      title="Outreach Post Pack"
                    >
                      Outreach
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Human Review Gate Architecture Visual (Safety First) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
              <Icon name="shield-check" size={18} />
            </span>
            <div>
              <h3 className="font-bold text-sm text-slate-900">How PolarSetu Protects Scientific Accuracy</h3>
              <p className="text-xs text-slate-500">AI drafts suggestions, but a human must approve before publishing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                Upload & Extract
              </div>
              <p className="text-slate-500 text-[11px]">
                Researcher uploads PDF report, dataset link, or photos with basic coordinates.
              </p>
            </div>

            <div className="p-3.5 bg-blue-50/50 rounded-lg border border-blue-200/60 space-y-1">
              <div className="font-bold text-blue-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                AI Suggests Draft
              </div>
              <p className="text-slate-600 text-[11px]">
                AI suggests tags, plain-language student summary, and social caption pack.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 space-y-1">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">3</span>
                Human Review Gate
              </div>
              <p className="text-amber-800 text-[11px]">
                Reviewer verifies accuracy, edits draft, and signs off with audit timestamp.
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-200 space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">4</span>
                Unified Publishing
              </div>
              <p className="text-emerald-800 text-[11px]">
                Record goes live in Search, Student Explainer, and Outreach Studio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
