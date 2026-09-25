import React, { useState, useMemo } from 'react';
import { Icon } from '../components/Icon';
import { ContentTypeBadge, RegionBadge, StatusBadge } from '../components/Badge';

export const ExplorePage = ({
  records,
  initialQuery = '',
  onSelectRecord,
  onOpenStudentView,
  onOpenOutreach,
  onOpenReview
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedExpedition, setSelectedExpedition] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const contentTypes = ['All', 'Report', 'Dataset', 'Photo', 'Video', 'Explainer'];
  const regions = ['All', 'Antarctica', 'Arctic', 'Southern Ocean', 'Himalayas'];
  const expeditions = [
    'All',
    '42nd Indian Scientific Expedition to Antarctica',
    '41st Indian Scientific Expedition to Antarctica',
    'Indian Arctic Expedition 2023 (Himadri Summer Campaign)',
    '11th Indian Southern Ocean Expedition (SOE-11)',
    'Himansh Cryosphere Research Expedition (Chhota Shigri)'
  ];

  // Filtering Logic
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      // Text search match
      const q = query.toLowerCase().trim();
      const matchesText = !q || (
        rec.title.toLowerCase().includes(q) ||
        rec.description.toLowerCase().includes(q) ||
        rec.expeditionName.toLowerCase().includes(q) ||
        rec.tags.some(t => t.toLowerCase().includes(q)) ||
        (rec.authorName && rec.authorName.toLowerCase().includes(q)) ||
        (rec.location && rec.location.toLowerCase().includes(q))
      );

      // Type match
      const matchesType = selectedType === 'All' || rec.contentType === selectedType;

      // Region match
      const matchesRegion = selectedRegion === 'All' || rec.region === selectedRegion;

      // Expedition match
      const matchesExpedition = selectedExpedition === 'All' || rec.expeditionName === selectedExpedition;

      return matchesText && matchesType && matchesRegion && matchesExpedition;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return (b.id > a.id ? 1 : -1);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [records, query, selectedType, selectedRegion, selectedExpedition, sortBy]);

  const clearFilters = () => {
    setQuery('');
    setSelectedType('All');
    setSelectedExpedition('All');
    setSelectedRegion('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Explore Polar Science
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Search across expeditions, datasets, reports, photos and verified public explainers
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Icon name="search" size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by keyword, topic, station name, scientist, or DOI..."
          className="w-full pl-10 pr-24 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-14 pr-2 flex items-center text-slate-400 hover:text-slate-600 text-xs"
          >
            Clear
          </button>
        )}
        <div className="absolute inset-y-0 right-1 pr-1 flex items-center">
          <span className="text-xs font-semibold px-2.5 py-1.5 bg-slate-100 text-slate-600 rounded">
            {filteredRecords.length} found
          </span>
        </div>
      </div>

      {/* Layout: Left Sidebar Filters + Right Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Filters Panel */}
        <aside className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Icon name="filter" size={14} />
              Filters
            </h3>
            {(selectedType !== 'All' || selectedRegion !== 'All' || selectedExpedition !== 'All' || query) && (
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Reset all
              </button>
            )}
          </div>

          {/* Filter 1: Content Type */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Content Type
            </label>
            <div className="space-y-1">
              {contentTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer py-1"
                >
                  <input
                    type="radio"
                    name="contentType"
                    checked={selectedType === type}
                    onChange={() => setSelectedType(type)}
                    className="text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                  />
                  <span>{type === 'All' ? 'All Content Types' : type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 2: Region */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700">
              Region / Domain
            </label>
            <div className="space-y-1">
              {regions.map((region) => (
                <label
                  key={region}
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer py-1"
                >
                  <input
                    type="radio"
                    name="region"
                    checked={selectedRegion === region}
                    onChange={() => setSelectedRegion(region)}
                    className="text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                  />
                  <span>{region === 'All' ? 'All Regions' : region}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 3: Expedition Selector */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700">
              Expedition
            </label>
            <select
              value={selectedExpedition}
              onChange={(e) => setSelectedExpedition(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {expeditions.map((exp) => (
                <option key={exp} value={exp}>
                  {exp === 'All' ? 'All Expeditions' : exp}
                </option>
              ))}
            </select>
          </div>

          {/* Help note */}
          <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-100 text-[11px] text-blue-800 space-y-1">
            <div className="font-semibold flex items-center gap-1">
              <Icon name="info" size={13} />
              Cross-linked discovery
            </div>
            <p className="text-slate-600">
              Opening any record shows its linked dataset, technical reports, and photos.
            </p>
          </div>
        </aside>

        {/* Right Search Results Column */}
        <main className="lg:col-span-3 space-y-4">
          {/* Top Bar: Count & Sort */}
          <div className="flex items-center justify-between bg-white p-3.5 rounded-lg border border-slate-200">
            <div className="text-xs font-semibold text-slate-700">
              Search Results ({filteredRecords.length})
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 rounded px-2 py-1 text-xs focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Results List Cards matching Reference UI */}
          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Icon name="search" size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-800">No records found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No polar records matched your search filters. Try clearing your search query or choosing another region.
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-300 hover:shadow-xs transition-all flex flex-col sm:flex-row gap-4 group"
                >
                  {/* Thumbnail */}
                  <div 
                    onClick={() => onSelectRecord(rec)}
                    className="sm:w-44 h-32 rounded-lg bg-slate-100 overflow-hidden shrink-0 cursor-pointer relative"
                  >
                    <img
                      src={rec.thumbnail}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-1.5 left-1.5">
                      <ContentTypeBadge type={rec.contentType} />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <RegionBadge region={rec.region} />
                        <span className="text-[11px] text-slate-400 font-medium">
                          {rec.expeditionName.split('(')[0].trim()}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] text-slate-400">
                          {rec.date}
                        </span>
                        <div className="ml-auto">
                          <StatusBadge status={rec.status} />
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onSelectRecord(rec)}
                        className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {rec.title}
                      </h3>

                      {/* Snippet */}
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {rec.description}
                      </p>
                    </div>

                    {/* Footer Row: Tags & Actions */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {rec.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-2">
                        {rec.status === 'Under Review' && (
                          <button
                            onClick={() => onOpenReview(rec)}
                            className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-medium transition-colors flex items-center gap-1"
                          >
                            <Icon name="shield-check" size={12} />
                            Review Draft
                          </button>
                        )}
                        <button
                          onClick={() => onOpenStudentView(rec)}
                          className="px-2 py-1 text-teal-700 hover:bg-teal-50 rounded text-xs font-medium transition-colors"
                        >
                          Student Explainer
                        </button>
                        <button
                          onClick={() => onOpenOutreach(rec)}
                          className="px-2 py-1 text-purple-700 hover:bg-purple-50 rounded text-xs font-medium transition-colors"
                        >
                          Outreach Pack
                        </button>
                        <button
                          onClick={() => onSelectRecord(rec)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          Details <Icon name="chevron-right" size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
