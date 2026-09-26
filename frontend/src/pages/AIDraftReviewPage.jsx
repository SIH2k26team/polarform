import React, { useState, useEffect } from 'react';
import { Icon } from '../components/Icon';
import { StatusBadge, ContentTypeBadge, RegionBadge } from '../components/Badge';
import { AccessDeniedPage } from '../components/AccessDenied';
import { can, isResearcher, isReviewer, isAdmin, isAuthor, PERMISSIONS } from '../auth/permissions';

export const AIDraftReviewPage = ({
  record: initialRecord,
  allRecords = [],
  currentUser,
  onApproveAndPublish,
  onRequestChanges,
  onUpdateDraft,
  onOpenStudentView,
  onOpenOutreach,
  onSelectRecord,
  onBackToExplore,
  onNavigate
}) => {
  // ── Access check: Reviewer, Admin, or Researcher ─────────────────────────
  if (!can(currentUser, PERMISSIONS.VIEW_REVIEW_GATE)) {
    return (
      <AccessDeniedPage
        currentUser={currentUser}
        requiredRole="Researcher, Reviewer, or Admin"
        onNavigate={onBackToExplore}
      />
    );
  }

  const isUserResearcher = isResearcher(currentUser);
  const isUserStaff = isReviewer(currentUser) || isAdmin(currentUser);

  // For researchers, filter accessible records to only their own
  const myAccessibleRecords = isUserResearcher
    ? allRecords.filter(r => isAuthor(currentUser, r))
    : allRecords;

  // Determine current active record
  // If researcher and initialRecord is not theirs, pick their first accessible record
  let currentRecord = initialRecord;
  if (isUserResearcher && initialRecord && !isAuthor(currentUser, initialRecord)) {
    currentRecord = myAccessibleRecords[0] || null;
  }
  if (!currentRecord && myAccessibleRecords.length > 0) {
    currentRecord = myAccessibleRecords[0];
  }

  const [activeRecordId, setActiveRecordId] = useState(currentRecord?.id || null);

  useEffect(() => {
    if (currentRecord?.id) {
      setActiveRecordId(currentRecord.id);
    }
  }, [currentRecord?.id]);

  // If activeRecordId changed, find the record
  const record = allRecords.find(r => r.id === activeRecordId) || currentRecord;

  // Form & Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectFeedback, setRejectFeedback] = useState('Please clarify the baseline measurement depth figures and confirm station coordinates.');
  
  // Verification Checklist State (Reviewer / Admin)
  const [checkedData, setCheckedData] = useState(true);
  const [checkedLanguage, setCheckedLanguage] = useState(true);
  const [checkedCitation, setCheckedCitation] = useState(true);

  // Editable Draft Fields
  const [editedExplainerIntro, setEditedExplainerIntro] = useState('');
  const [editedExplainerBody, setEditedExplainerBody] = useState('');
  const [editedCaption, setEditedCaption] = useState('');
  const [editedHook, setEditedHook] = useState('');
  const [editedHashtags, setEditedHashtags] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');

  // Sync state when active record changes
  useEffect(() => {
    if (record) {
      setEditedExplainerIntro(record.aiDraft?.studentExplainer?.intro || '');
      setEditedExplainerBody(record.aiDraft?.studentExplainer?.bodyText || record.description || '');
      setEditedCaption(record.aiDraft?.socialCaption?.body || '');
      setEditedHook(record.aiDraft?.socialCaption?.hook || '❄️ Polar Science Discovery Update');
      setEditedHashtags(record.aiDraft?.socialCaption?.hashtags?.join(' ') || '#PolarScience #Antarctica #NCPOR #MoES');
      setReviewNotes(
        `Verified scientific claims against ${record.expeditionName}. Plain-language summary and parameters approved.`
      );
      setIsEditing(false);
    }
  }, [record?.id]);

  // If no record found at all
  if (!record) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
          <Icon name="shield-check" size={28} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">
          {isUserResearcher ? 'No Submissions Found for Your Account' : 'No Submissions in Review Queue'}
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          {isUserResearcher
            ? 'As a Researcher, your uploaded records and their AI drafts will appear here for you to inspect and refine before review.'
            : 'There are currently no records pending review in the queue.'}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          {isUserResearcher && onNavigate && (
            <button
              onClick={() => onNavigate('upload')}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5"
            >
              <Icon name="upload" size={14} /> Upload a Research Record
            </button>
          )}
          <button
            onClick={onBackToExplore}
            className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors"
          >
            Go to Explore Records
          </button>
        </div>
      </div>
    );
  }

  const handleSaveEdits = () => {
    const updatedDraft = {
      ...record.aiDraft,
      studentExplainer: {
        ...record.aiDraft?.studentExplainer,
        intro: editedExplainerIntro,
        bodyText: editedExplainerBody
      },
      socialCaption: {
        ...record.aiDraft?.socialCaption,
        hook: editedHook,
        body: editedCaption,
        hashtags: editedHashtags.split(' ').map(t => t.startsWith('#') ? t : `#${t}`).filter(Boolean)
      }
    };
    onUpdateDraft(record.id, updatedDraft);
    setIsEditing(false);
  };

  const handleApprove = () => {
    onApproveAndPublish(record.id, reviewNotes);
  };

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (rejectFeedback.trim()) {
      onRequestChanges(record.id, rejectFeedback.trim());
      setShowRejectForm(false);
    }
  };

  const isAlreadyPublished = record.status === 'Published';
  const isOwnRecord = isAuthor(currentUser, record);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={onBackToExplore}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
        >
          <Icon name="arrow-left" size={13} /> Back to Records Queue
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Review Status:</span>
          <StatusBadge status={record.status} />
        </div>
      </div>

      {/* Role-Specific Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isUserResearcher ? 'bg-blue-600' : 'bg-amber-500'}`}></span>
              <h1 className="text-xl font-bold text-slate-900">
                {isUserResearcher
                  ? 'Author AI Draft Inspection & Editing Gate'
                  : 'Scientific Review & Approval Gate'}
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {isUserResearcher
                ? 'Inspect and edit the advisory student explainer and outreach pack generated for your submission before final reviewer sign-off.'
                : 'Verify scientific parameters, review plain-language student summaries, and authorize publication to the national portal.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span>{isUserResearcher ? 'Author:' : 'Reviewer:'}</span>
            <strong className="text-slate-900">{currentUser.name}</strong>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
              isUserResearcher
                ? 'bg-blue-100 text-blue-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {currentUser.role} {isUserResearcher ? '(Author View)' : ''}
            </span>
          </div>
        </div>

        {/* Submissions Switcher Strip */}
        {myAccessibleRecords.length > 1 && (
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {isUserResearcher ? 'My Submissions:' : 'Submissions Queue:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {myAccessibleRecords.map((r) => {
                const isSelected = r.id === record.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setActiveRecordId(r.id);
                      if (onSelectRecord) onSelectRecord(r);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className="truncate max-w-[160px]">{r.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {r.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Notice for Changes Requested (if applicable) */}
      {record.status === 'Changes Requested' && record.aiDraft?.reviewNotes && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
            <Icon name="x-circle" size={18} />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-amber-900">Reviewer Feedback / Modifications Requested</h4>
            <p className="text-amber-800 leading-relaxed font-medium">
              "{record.aiDraft.reviewNotes}"
            </p>
            {isUserResearcher && (
              <p className="text-amber-700 text-[11px]">
                You can edit the AI draft text below and click <strong>Save Draft Edits</strong> to update your submission.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Change Request Drawer (Reviewer/Admin only) */}
      {showRejectForm && isUserStaff && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <Icon name="x-circle" size={15} className="text-rose-600" />
              Request Modifications from Submitter
            </h3>
            <button
              type="button"
              onClick={() => setShowRejectForm(false)}
              className="text-xs text-rose-600 hover:text-rose-800 font-medium"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-rose-800 leading-relaxed">
            Specify technical corrections or terminology revisions. The record status will be updated to <strong>Changes Requested</strong>.
          </p>
          <form onSubmit={handleConfirmReject} className="space-y-3">
            <textarea
              rows={3}
              required
              value={rejectFeedback}
              onChange={(e) => setRejectFeedback(e.target.value)}
              placeholder="State the required modifications..."
              className="w-full text-xs p-3 bg-white border border-rose-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRejectForm(false)}
                className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-medium"
              >
                Dismiss
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Send Feedback to Researcher
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Two Column Layout: Student Explainer (Left) & Outreach Pack (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Scientific Source & Student Explainer */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ContentTypeBadge type={record.contentType} />
              <RegionBadge region={record.region} />
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Submitter: <strong>{record.authorName || 'NCPOR Scientist'}</strong> {isOwnRecord ? '(You)' : ''}
            </span>
          </div>

          <div className="p-5 space-y-5 flex-1">
            {/* Record Title & Expedition */}
            <div className="space-y-1">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {record.title}
              </h2>
              <p className="text-xs text-slate-500">
                {record.expeditionName} • {record.location}
              </p>
            </div>

            {/* Plain Language Explainer Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Icon name="book-open" size={14} className="text-blue-600" />
                  Plain-Language Summary (Student View)
                </h3>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium border border-blue-200">
                  Advisory Draft
                </span>
              </div>

              {isEditing ? (
                <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Introductory Hook</label>
                    <textarea
                      rows={2}
                      value={editedExplainerIntro}
                      onChange={(e) => setEditedExplainerIntro(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Explainer Body</label>
                    <textarea
                      rows={5}
                      value={editedExplainerBody}
                      onChange={(e) => setEditedExplainerBody(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                  {record.aiDraft?.studentExplainer?.intro && (
                    <p className="font-semibold text-slate-900 italic border-l-2 border-blue-500 pl-2.5">
                      "{record.aiDraft.studentExplainer.intro}"
                    </p>
                  )}
                  <p>
                    {record.aiDraft?.studentExplainer?.bodyText || record.aiDraft?.summary || record.description}
                  </p>
                </div>
              )}
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Icon name="check-circle" size={14} className="text-emerald-600" />
                Key Scientific Takeaways
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {(record.aiDraft?.studentExplainer?.keyTakeaways || [
                  "Ice core layers preserve ancient atmospheric data and past temperature trends.",
                  "Crucial for predicting future climate changes and global sea-level rise.",
                  "Indian polar data links high-latitude changes to the Indian Monsoon."
                ]).map((k, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Outreach Pack & Decision Strip */}
        <div className="space-y-6">
          {/* Outreach Media Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Icon name="share" size={14} className="text-purple-600" />
                Public Outreach & Social Pack
              </h3>
              <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-medium border border-purple-200">
                Official Media Kit
              </span>
            </div>

            <div className="p-5 space-y-4">
              {/* Social Preview */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                    PS
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-xs text-slate-900">PolarSetu India</span>
                      <span className="text-[10px] text-blue-500 font-bold">✓</span>
                    </div>
                    <span className="text-[10px] text-slate-400">@PolarSetu • Official Outreach Channel</span>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Headline Hook</label>
                      <input
                        type="text"
                        value={editedHook}
                        onChange={(e) => setEditedHook(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Post Caption Body</label>
                      <textarea
                        rows={3}
                        value={editedCaption}
                        onChange={(e) => setEditedCaption(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-800 space-y-1.5 leading-relaxed">
                    <p className="font-bold text-slate-900">
                      {record.aiDraft?.socialCaption?.hook || "❄️ Polar Science Discovery Update"}
                    </p>
                    <p className="text-slate-700">
                      {record.aiDraft?.socialCaption?.body || record.aiDraft?.summary || record.description}
                    </p>
                    <p className="text-blue-600 font-medium text-[11px]">
                      {record.aiDraft?.socialCaption?.hashtags?.join(' ') || "#PolarScience #Antarctica #NCPOR #MoES"}
                    </p>
                  </div>
                )}

                {/* Media Image */}
                <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-100 max-h-40">
                  <img
                    src={record.thumbnail}
                    alt={record.title}
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>

              {/* Reviewer Verification Checklist (Shown to Reviewer/Admin only) */}
              {isUserStaff && (
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2 text-xs">
                  <p className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
                    Reviewer Verification Checklist:
                  </p>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkedData}
                        onChange={(e) => setCheckedData(e.target.checked)}
                        className="rounded text-blue-600"
                      />
                      <span className="text-slate-700">Scientific metadata & expedition station parameters verified</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkedLanguage}
                        onChange={(e) => setCheckedLanguage(e.target.checked)}
                        className="rounded text-blue-600"
                      />
                      <span className="text-slate-700">Plain-language summary is accurate and age-appropriate for students</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkedCitation}
                        onChange={(e) => setCheckedCitation(e.target.checked)}
                        className="rounded text-blue-600"
                      />
                      <span className="text-slate-700">DOI / NPDC dataset linkage and authorship confirmed</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Decision Box: Distinct for Reviewer/Admin vs Researcher */}
          {isUserStaff ? (
            /* Reviewer / Admin Decision Box */
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Reviewer Decision & Audit Sign-off
              </h3>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-700">
                  Audit Trail Sign-off Remarks
                </label>
                <input
                  type="text"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Enter verification notes..."
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {isEditing ? (
                    <button
                      type="button"
                      onClick={handleSaveEdits}
                      className="px-3.5 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Icon name="check-circle" size={13} />
                      Save Edits
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Icon name="edit" size={13} />
                      Edit Text
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowRejectForm(true)}
                    className="px-3.5 py-2 bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Icon name="x-circle" size={13} />
                    Request Changes
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={!checkedData || !checkedLanguage}
                  className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="shield-check" size={15} />
                  {isAlreadyPublished ? "Re-Verify & Save" : "Approve & Publish to Repository"}
                </button>
              </div>
            </div>
          ) : (
            /* Researcher / Author Polish & Save Box */
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Author Draft Management
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    You can polish the AI-generated plain-language summary and social text for your submission.
                  </p>
                </div>
                <StatusBadge status={record.status} />
              </div>

              {/* Status Note */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <Icon name="shield-check" size={14} className="text-blue-600" />
                  Review Gate Safety Note
                </p>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Final approval and publication to the public repository is authorized by designated scientific reviewers (NCPOR Reviewers / Admins).
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEdits}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Icon name="check-circle" size={14} />
                      Save Draft Changes
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Icon name="edit" size={14} />
                    Edit AI Draft Text
                  </button>
                )}

                <button
                  type="button"
                  onClick={onBackToExplore}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                >
                  Back to Explore
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
