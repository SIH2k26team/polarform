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

  // Editable Draft Fields
  const [editedExplainerIntro, setEditedExplainerIntro] = useState('');
  const [editedExplainerBody, setEditedExplainerBody] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');

  // Sync state when active record changes
  useEffect(() => {
    if (record) {
      setEditedExplainerIntro(record.aiDraft?.studentExplainer?.intro || '');
      setEditedExplainerBody(record.aiDraft?.studentExplainer?.bodyText || record.description || '');
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
      socialCaption: record.aiDraft?.socialCaption
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

      {/* Record Selector Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="space-y-0.5">
          <label htmlFor="record-selector" className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Icon name="file-text" size={16} className="text-blue-600" />
            Select Record to Review:
          </label>
          <p className="text-[11px] text-slate-500">
            Choose any submission from the queue to inspect plain-language drafts, scientific data, or approve changes.
          </p>
        </div>

        <select
          id="record-selector"
          value={record.id}
          onChange={(e) => {
            const selected = allRecords.find(r => r.id === e.target.value);
            if (selected) {
              setActiveRecordId(selected.id);
              if (onSelectRecord) onSelectRecord(selected);
            }
          }}
          className="w-full sm:w-auto text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs cursor-pointer max-w-xl truncate"
        >
          {myAccessibleRecords.map((r) => (
            <option key={r.id} value={r.id}>
              [{r.status}] {r.title} ({r.region})
            </option>
          ))}
        </select>
      </div>

      {/* Main Stacked Layout */}
      <div className="space-y-6">
        {/* Top Block: Scientific Source & Student Explainer */}
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
                  Plain-Language Summary
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

        {/* Decision Strip */}
        <div className="space-y-6">
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
                    className="px-3.5 py-2 bg-white border border-rose-300 text-rose-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Icon name="x-circle" size={13} />
                    Request Changes
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleApprove}
                  className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="shield-check" size={15} />
                  {isAlreadyPublished ? "Verify & Save" : "Approve & Publish to Repository"}
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

        {/* Change Request Drawer (Reviewer/Admin only) */}
        {showRejectForm && isUserStaff && (
          <div className=" border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
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
            <p className="text-xs leading-relaxed">
              Specify technical corrections or terminology revisions. The record status will be updated to <strong className="text-rose-800">Changes Requested</strong>.
            </p>
            <form onSubmit={handleConfirmReject} className="space-y-3">
              <textarea
                rows={3}
                required
                value={rejectFeedback}
                onChange={(e) => setRejectFeedback(e.target.value)}
                placeholder="State the required modifications..."
                className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
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
                  className="px-4 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Send Feedback to Researcher
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
