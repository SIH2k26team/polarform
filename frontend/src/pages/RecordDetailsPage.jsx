import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { ContentTypeBadge, RegionBadge, StatusBadge } from '../components/Badge';
import { INITIAL_SCIENTISTS } from '../data/mockData';
import { can, canAccessReview, PERMISSIONS } from '../auth/permissions';
import { RecordChatbot } from '../components/RecordChatbot';

export const RecordDetailsPage = ({
  record,
  allRecords,
  currentUser,
  onNavigate,
  onOpenStudentView,
  onOpenOutreach,
  onOpenReview,
  onSelectRecord,
  onBackToSearch
}) => {
  if (!record) return null;

  const [activeTab, setActiveTab] = useState('overview');
  const scientists = INITIAL_SCIENTISTS;

  // Find related records under the same expedition or region
  const relatedRecords = allRecords.filter(r => r.id !== record.id && (
    r.expeditionId === record.expeditionId || r.region === record.region
  ));

  const relatedDatasets = relatedRecords.filter(r => r.contentType === 'Dataset');
  const relatedReports = relatedRecords.filter(r => r.contentType === 'Report');
  const relatedPhotos = relatedRecords.filter(r => r.contentType === 'Photo' || r.linkedPhotosCount > 0);
  const relatedVideos = relatedRecords.filter(r => r.contentType === 'Video');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Back Link */}
      <button
        onClick={onBackToSearch}
        className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
      >
        <Icon name="arrow-left" size={14} /> Back to Search
      </button>

      {/* Record Title & Badges matching Reference UI */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <RegionBadge region={record.region} />
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
            {record.expeditionName}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Icon name="calendar" size={12} /> {record.date}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <StatusBadge status={record.status} />
            <ContentTypeBadge type={record.contentType} />
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {record.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed">
          {record.description}
        </p>
      </div>

      {/* Main Banner Visual matching Reference UI */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-md max-h-96">
        <img
          src={record.thumbnail}
          alt={record.title}
          className="w-full h-80 sm:h-96 object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white space-y-1">
            <div className="text-xs text-sky-300 font-medium">
              Location: {record.location} • Lead Institution: {record.institution}
            </div>
            <div className="text-xs text-slate-300">
              Verified Scientific Record • Cross-linked to NPDC and DSpace
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Strip */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Icon name="compass" size={16} className="text-blue-600" />
          <span>Quick Views:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenStudentView(record)}
            className="px-2.5 py-1 text-teal-700 hover:text-teal-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Icon name="book-open" size={14} /> Student Explainer
          </button>

          {/* Outreach Studio — Reviewer+ only */}
          {can(currentUser, PERMISSIONS.VIEW_OUTREACH) && (
            <button
              onClick={() => onOpenOutreach(record)}
              className="px-2.5 py-1 text-purple-700 hover:text-purple-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Icon name="share" size={14} /> Outreach Post Studio
            </button>
          )}

          {/* Review Gate — Reviewer/Admin or Author Researcher */}
          {canAccessReview(currentUser, record) && (
            <button
              onClick={() => onOpenReview(record)}
              className="px-2.5 py-1 text-amber-600 hover:text-amber-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Icon name="shield-check" size={14} />
              {currentUser.role === 'Researcher' ? 'Inspect / Edit AI Draft' : 'Review AI Draft'}
            </button>
          )}
        </div>
      </div>

      {/* Layout: Left Content Tabs + Right Related Items (Knowledge Linking Graph) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Tabs & Main Content */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Tabs matching Reference UI */}
          <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/70 px-2 pt-2">
            {[
              { id: 'overview', label: 'Overview', icon: 'file-text' },
              { id: 'dataset', label: 'Dataset', icon: 'database', count: record.linkedDatasetsCount },
              { id: 'reports', label: 'Reports', icon: 'file', count: record.linkedReportsCount },
              { id: 'photos', label: 'Photos', icon: 'image', count: record.linkedPhotosCount },
              { id: 'videos', label: 'Videos', icon: 'video', count: record.linkedVideosCount },
              { id: 'scientists', label: 'Scientists', icon: 'users', count: record.linkedScientistsCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-700 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon name={tab.icon} size={14} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 text-xs text-slate-700">
                {/* About & Executive Summary */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <Icon name="file-text" size={15} className="text-blue-600" />
                    About this Research
                  </h3>
                  <p className="leading-relaxed text-slate-700 bg-slate-50/70 p-3.5 rounded-lg border border-slate-200/80">
                    {record.description}
                  </p>
                </div>

                {/* Scientific Abstract */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <Icon name="layers" size={15} className="text-indigo-600" />
                    Scientific Abstract
                  </h3>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 leading-relaxed font-serif">
                    {record.abstract || record.description}
                  </div>
                </div>

                {/* Research Objectives & Methodology */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <Icon name="compass" size={15} className="text-teal-600" />
                    Objectives & Scope
                  </h3>
                  <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
                    <p className="leading-relaxed">
                      This scientific contribution was conducted under <strong>{record.expeditionName}</strong> in the <strong>{record.region}</strong> region ({record.location}).
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                      <li><strong>Primary Field Goal:</strong> Systematic observational data collection and baseline environmental monitoring for cryospheric and polar sciences.</li>
                      <li><strong>Data Integration:</strong> Formally ingested into the NCPOR polar knowledge graph with direct cross-links to National Polar Data Centre (NPDC) repositories.</li>
                      <li><strong>Scientific Impact:</strong> Provides critical empirical input for climate modeling, ecosystem assessment, and seasonal trend analysis in high-latitude environments.</li>
                    </ul>
                  </div>
                </div>

                {/* Key Technical Information Grid */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <Icon name="shield-check" size={15} className="text-blue-600" />
                    Key Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Location / Base</span>
                      <span className="font-semibold text-slate-800">{record.location}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Region / Domain</span>
                      <span className="font-semibold text-slate-800">{record.region}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Expedition Campaign</span>
                      <span className="font-semibold text-slate-800">{record.expeditionName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Lead Researcher / Author</span>
                      <span className="font-semibold text-slate-800">{record.authorName || "NCPOR Polar Research Team"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Lead Institution</span>
                      <span className="font-semibold text-slate-800">{record.institution}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Date Recorded</span>
                      <span className="font-semibold text-slate-800">{record.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Publication DOI</span>
                      <span className="font-mono text-blue-600">{record.doi || "N/A (Expedition Technical Report)"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Verification Status</span>
                      <span className="font-semibold text-emerald-700">{record.status}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Access Level</span>
                      <span className="font-semibold text-slate-800">Open Access (MoES Data Policy)</span>
                    </div>
                  </div>
                </div>

                {/* Plain-Language AI Summary (if available) */}
                {record.aiDraft?.summary && (
                  <div className="p-4 bg-blue-50/70 rounded-lg border border-blue-200 space-y-1.5">
                    <h4 className="font-bold text-blue-950 text-xs flex items-center gap-1.5">
                      <Icon name="sparkles" size={14} className="text-blue-600" />
                      Executive Plain-Language Summary
                    </h4>
                    <p className="text-slate-700 leading-relaxed text-xs">
                      {record.aiDraft.summary}
                    </p>
                  </div>
                )}

                {/* Topic Keywords */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">Topic Keywords</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {record.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium text-xs border border-slate-200">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Dataset */}
            {activeTab === 'dataset' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-blue-50/60 rounded-lg border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-950 flex items-center gap-1.5">
                      <Icon name="database" size={16} className="text-blue-600" />
                      NPDC Dataset Reference
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono text-[11px]">
                      {record.npdcDatasetId || "NPDC-DS-2022-GLAC-041"}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs">
                    This scientific dataset is indexed in the National Polar Data Centre (NPDC). Polar Nexus provides discovery and links to the dataset record.
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href="https://npdc.ncpor.res.in"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold flex items-center gap-1"
                    >
                      View on NPDC Portal <Icon name="external-link" size={12} />
                    </a>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
                  <div className="p-3 flex justify-between">
                    <span className="text-slate-500">Parameters Measured</span>
                    <span className="font-semibold text-slate-800">{record.parametersCount || "Stable Isotopes, Firn Density, Core Depth"}</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="text-slate-500">Sampling Resolution</span>
                    <span className="font-semibold text-slate-800">5 cm continuous slices</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="text-slate-500">Data Format</span>
                    <span className="font-semibold text-slate-800">CSV, NetCDF-4, GeoTIFF</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Reports */}
            {activeTab === 'reports' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 border border-slate-200 rounded-lg flex items-center justify-between hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Icon name="file-text" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{record.title} (Full PDF)</h4>
                      <p className="text-slate-400 text-[11px]">Technical Expedition Report • 14 Pages • 4.2 MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("Simulated PDF download for demo purposes.")}
                    className="px-3 py-1.5 bg-slate-800 text-white hover:bg-slate-900 rounded font-semibold flex items-center gap-1"
                  >
                    <Icon name="download" size={13} /> Download PDF
                  </button>
                </div>
              </div>
            )}

            {/* Tab 4: Photos */}
            {activeTab === 'photos' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  record.thumbnail,
                  "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=600&q=80",
                  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
                  "https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=600&q=80",
                  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
                  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
                ].map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden border border-slate-200 h-32 bg-slate-100 group relative">
                    <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                      Photo #{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 5: Videos */}
            {activeTab === 'videos' && (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-slate-900 text-white rounded-lg flex items-center justify-center h-48 relative overflow-hidden">
                  <img src={record.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                  <div className="relative text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <Icon name="video" size={22} />
                    </div>
                    <p className="font-semibold text-xs">Expedition Field Video Log</p>
                    <p className="text-[11px] text-slate-300">Duration: 04:35 • 1080p</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 6: Scientists */}
            {activeTab === 'scientists' && (
              <div className="space-y-3">
                {scientists.slice(0, 3).map((sci) => (
                  <div key={sci.id} className="p-3 border border-slate-200 rounded-lg flex items-center gap-3">
                    <img src={sci.avatar} alt={sci.name} className="w-10 h-10 rounded-full object-cover border border-slate-300" />
                    <div className="text-xs">
                      <h4 className="font-bold text-slate-900">{sci.name}</h4>
                      <p className="text-slate-500 text-[11px]">{sci.role} • {sci.institution}</p>
                      <p className="text-blue-600 text-[11px]">{sci.specialization}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Record-Specific AI Chatbot Assistant */}
        <div className="space-y-6">
          {/* Interactive AI Chatbot Window for this Record */}
          <RecordChatbot record={record} />
        </div>
      </div>
    </div>
  );
};
