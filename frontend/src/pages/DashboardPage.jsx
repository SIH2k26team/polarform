import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { StatusBadge, ContentTypeBadge, RegionBadge } from '../components/Badge';

export const DashboardPage = ({
  records,
  auditLogs,
  currentUser,
  onNavigate,
  onSelectRecord,
  onOpenReview,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const totalCount = records.length;
  const pendingRecords = records.filter(r => r.status === 'Under Review' || r.status === 'Draft');
  const publishedRecords = records.filter(r => r.status === 'Published');

  // Filter records created by current user or mock user
  const myUploads = records.filter(r => r.authorName?.includes(currentUser.name.split(' ')[1] || ''));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            User Dashboard & Review Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your submissions, inspect human approval queues, and review the immutable audit log.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('upload')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Icon name="upload" size={14} /> Upload Record
          </button>
        </div>
      </div>

      {/* Main Grid: Left Navigation Sidebar + Right Content matching Reference Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Sidebar Navigation matching Reference UI */}
        <aside className="bg-white rounded-xl border border-slate-200 shadow-xs p-3 space-y-1">
          {[
            { id: 'overview', label: 'Dashboard', icon: 'layers' },
            { id: 'uploads', label: 'My Uploads', icon: 'file-text', count: myUploads.length || 3 },
            { id: 'approvals', label: 'Approvals / Review Queue', icon: 'shield-check', count: pendingRecords.length, alert: pendingRecords.length > 0 },
            { id: 'audit', label: 'Audit Trail Log', icon: 'clock' },
            { id: 'profile', label: 'User Profile & Role', icon: 'user' },
            { id: 'settings', label: 'System Settings', icon: 'sliders' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon name={item.icon} size={15} />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  item.alert ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </aside>

        {/* Right Content Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Top 3 KPI Stats Cards matching Reference Screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Records */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Total Records</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">{totalCount}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Indexed in PolarSetu</p>
              </div>
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Icon name="database" size={22} />
              </div>
            </div>

            {/* Pending Review */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Pending Review</p>
                <p className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1">{pendingRecords.length}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Awaiting human approval</p>
              </div>
              <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Icon name="shield-check" size={22} />
              </div>
            </div>

            {/* Published */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Published</p>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1">{publishedRecords.length}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Active on public portal</p>
              </div>
              <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Icon name="check-circle" size={22} />
              </div>
            </div>
          </div>

          {/* Tab Content 1: Overview / Recent Uploads matching Reference UI */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                    Recent Uploads & Submissions
                  </h3>
                  <p className="text-[11px] text-slate-500">All recent entries across expeditions</p>
                </div>
                <button
                  onClick={() => onNavigate('explore')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  View All ({records.length})
                </button>
              </div>

              {/* Table matching Reference UI */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {records.slice(0, 6).map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <button
                            onClick={() => onSelectRecord(rec)}
                            className="font-semibold text-slate-900 hover:text-blue-600 text-left line-clamp-1"
                          >
                            {rec.title}
                          </button>
                          <span className="text-[11px] text-slate-400 block">{rec.expeditionName.split('(')[0]}</span>
                        </td>
                        <td className="px-4 py-3">
                          <ContentTypeBadge type={rec.contentType} />
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={rec.status} />
                        </td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                          {rec.date}
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          {rec.status === 'Under Review' ? (
                            <button
                              onClick={() => onOpenReview(rec)}
                              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-semibold"
                            >
                              Review
                            </button>
                          ) : (
                            <button
                              onClick={() => onSelectRecord(rec)}
                              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-0.5"
                            >
                              Details <Icon name="chevron-right" size={12} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content 2: Approvals / Review Queue */}
          {activeTab === 'approvals' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
              <div className="p-4 bg-amber-50/70 border-b border-amber-200/80 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Icon name="shield-check" size={16} />
                    Pending Human Review Queue ({pendingRecords.length})
                  </h3>
                  <p className="text-[11px] text-amber-800">
                    Records and AI drafts awaiting verification by a researcher or designated reviewer
                  </p>
                </div>
              </div>

              {pendingRecords.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 space-y-2">
                  <Icon name="check-circle" size={32} className="mx-auto text-emerald-500" />
                  <p className="font-semibold text-slate-700">All submissions have been reviewed!</p>
                  <p>No records currently waiting in the review queue.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {pendingRecords.map((rec) => (
                    <div key={rec.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <ContentTypeBadge type={rec.contentType} />
                          <RegionBadge region={rec.region} />
                          <StatusBadge status={rec.status} />
                        </div>
                        <h4 className="font-bold text-sm text-slate-900">{rec.title}</h4>
                        <p className="text-xs text-slate-500">
                          Uploaded by <strong>{rec.authorName}</strong> • {rec.date}
                        </p>
                      </div>

                      <button
                        onClick={() => onOpenReview(rec)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-2xs"
                      >
                        <Icon name="shield-check" size={14} />
                        Review & Approve
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab Content 3: My Uploads */}
          {activeTab === 'uploads' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
              <h3 className="font-bold text-sm text-slate-900">
                Uploads by {currentUser.name}
              </h3>
              <div className="space-y-3">
                {records.slice(0, 4).map((rec) => (
                  <div key={rec.id} className="p-3 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900">{rec.title}</h4>
                      <p className="text-[11px] text-slate-400">{rec.expeditionName} • {rec.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={rec.status} />
                      <button
                        onClick={() => onSelectRecord(rec)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white rounded text-xs font-medium text-slate-700"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 4: Immutable Audit Trail Log */}
          {activeTab === 'audit' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Icon name="clock" size={15} className="text-blue-600" />
                    Immutable Review Audit Trail
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Timestamped record of all uploads, AI draft generations, and human review sign-offs
                  </p>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                  {auditLogs.length} Events Logged
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-slate-50 transition-colors space-y-1.5 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.action === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' :
                          log.action === 'AI_DRAFTED' ? 'bg-blue-100 text-blue-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {log.action}
                        </span>
                        <span className="font-bold text-slate-900">{log.resourceTitle}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">{log.timestamp}</span>
                    </div>
                    <p className="text-slate-600 text-xs">{log.notes}</p>
                    <div className="text-[11px] text-slate-400">
                      Actor: <strong>{log.userName}</strong> ({log.userRole})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 5: Profile */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-4">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-600" />
                <div>
                  <h3 className="font-bold text-base text-slate-900">{currentUser.name}</h3>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                  <span className="inline-block mt-1 text-xs px-2.5 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded border border-blue-200">
                    Active Role: {currentUser.role}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs space-y-2">
                <p><strong>Designation:</strong> {currentUser.designation}</p>
                <p><strong>Permissions:</strong> Upload, Review Drafts, Edit AI outputs, Sign-off & Publish to Public Repository.</p>
              </div>
            </div>
          )}

          {/* Tab Content 6: Settings */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Prototype Demo Settings</h3>
              <p className="text-xs text-slate-600">
                You can reset the prototype demo data back to initial 12 records and review queues at any time.
              </p>
              <button
                onClick={onResetData}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold"
              >
                Reset Prototype Data to Default
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
