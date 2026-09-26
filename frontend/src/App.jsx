import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';
import { AccessDeniedPage } from './components/AccessDenied';

import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { UploadPage } from './pages/UploadPage';
import { AIDraftReviewPage } from './pages/AIDraftReviewPage';
import { RecordDetailsPage } from './pages/RecordDetailsPage';
import { StudentExplainerPage } from './pages/StudentExplainerPage';
import { SocialPreviewPage } from './pages/SocialPreviewPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { AboutPage } from './pages/AboutPage';

import {
  getStoredRecords,
  saveStoredRecords,
  getStoredAuditLogs,
  addAuditLog,
  getCurrentUser,
  setCurrentUser,
  resetToDefaultData
} from './data/storage';

import {
  can,
  canAccessPage,
  canAccessReview,
  canEditAIDraft,
  isAuthor,
  isResearcher,
  isStaff,
  PERMISSIONS
} from './auth/permissions';

export default function App() {
  const [records, setRecords] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [currentUser, setUserState] = useState(getCurrentUser());
  const [activePage, setActivePage] = useState('home');
  const [pageParams, setPageParams] = useState({});
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [toast, setToast] = useState(null);

  // Initialize data on mount
  useEffect(() => {
    const loadedRecords = getStoredRecords();
    const loadedLogs = getStoredAuditLogs();
    setRecords(loadedRecords);
    setAuditLogs(loadedLogs);
    if (loadedRecords.length > 0) {
      setSelectedRecord(loadedRecords[0]);
    }
  }, []);

  const showToast = (message, type = 'success', title = '') => {
    setToast({ message, type, title });
    setTimeout(() => setToast(null), 4000);
  };

  // ── Guarded navigation ────────────────────────────────────────────────────
  const handleNavigate = (pageId, params = {}) => {
    // Check access before routing
    if (!canAccessPage(currentUser, pageId)) {
      setActivePage('access-denied');
      setPageParams({ attempted: pageId });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setActivePage(pageId);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchUser = (newUser) => {
    setCurrentUser(newUser);
    setUserState(newUser);
    showToast(`Switched to: ${newUser.name} (${newUser.role})`, 'info', 'Role Changed');
  };

  const handleSelectRecord = (record) => {
    setSelectedRecord(record);
    handleNavigate('record-details');
  };

  const handleOpenStudentView = (record) => {
    setSelectedRecord(record || records[0]);
    handleNavigate('student-view');
  };

  const handleOpenOutreach = (record) => {
    if (!can(currentUser, PERMISSIONS.VIEW_OUTREACH)) {
      showToast('Outreach Studio requires Reviewer or Admin access.', 'error', 'Access Denied');
      return;
    }
    setSelectedRecord(record || records[0]);
    handleNavigate('outreach');
  };

  const handleOpenReview = (record) => {
    if (!can(currentUser, PERMISSIONS.VIEW_REVIEW_GATE)) {
      showToast('The Review Gate requires Researcher, Reviewer, or Admin access.', 'error', 'Access Denied');
      return;
    }
    if (record) {
      if (isResearcher(currentUser) && !isAuthor(currentUser, record)) {
        showToast('Researchers can inspect and edit AI drafts for their own submissions.', 'info', 'Showing Your Submission');
        const ownRec = records.find(r => isAuthor(currentUser, r));
        if (ownRec) setSelectedRecord(ownRec);
      } else {
        setSelectedRecord(record);
      }
    } else {
      if (isResearcher(currentUser)) {
        const ownPending = records.find(r => isAuthor(currentUser, r) && (r.status === 'Under Review' || r.status === 'Changes Requested'))
          || records.find(r => isAuthor(currentUser, r));
        if (ownPending) setSelectedRecord(ownPending);
      } else {
        const pending = records.find(r => r.status === 'Under Review') || records[0];
        if (pending) setSelectedRecord(pending);
      }
    }
    handleNavigate('ai-review');
  };

  // ── Upload / Create ───────────────────────────────────────────────────────
  const handleRecordCreated = (newRecord) => {
    if (!can(currentUser, PERMISSIONS.UPLOAD_RECORD)) {
      showToast('You do not have permission to upload records.', 'error', 'Access Denied');
      return;
    }
    const updated = [newRecord, ...records];
    setRecords(updated);
    saveStoredRecords(updated);

    const newLogs = addAuditLog({
      action: 'UPLOADED & AI_DRAFTED',
      resourceId: newRecord.id,
      resourceTitle: newRecord.title,
      userName: currentUser.name,
      userRole: currentUser.role,
      notes: `Uploaded ${newRecord.contentType} for ${newRecord.expeditionName}. AI draft created and routed to Review Gate.`
    });
    setAuditLogs(newLogs);

    setSelectedRecord(newRecord);
    showToast('Record uploaded! AI draft generated. Inspect and refine your draft below.', 'success', 'Upload Successful');

    // Researchers, Reviewers, and Admins can immediately view the AI draft in Review Gate
    if (can(currentUser, PERMISSIONS.VIEW_REVIEW_GATE)) {
      handleNavigate('ai-review');
    } else {
      handleNavigate('explore');
    }
  };

  // ── Approve & Publish (Reviewer / Admin only) ─────────────────────────────
  const handleApproveAndPublish = (recordId, notes = '') => {
    if (!can(currentUser, PERMISSIONS.APPROVE_REJECT)) {
      showToast('Only Reviewers and Admins can approve records.', 'error', 'Access Denied');
      return;
    }
    const updated = records.map((r) => {
      if (r.id === recordId) {
        return {
          ...r,
          status: 'Published',
          publishedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          aiDraft: {
            ...r.aiDraft,
            reviewedBy: `${currentUser.name} (${currentUser.role})`,
            reviewDate: new Date().toLocaleDateString('en-IN', {
              day: '2-digit', month: 'short', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            }) + ' IST',
            reviewNotes: notes || `Verified by ${currentUser.name}. Approved for public discovery.`
          }
        };
      }
      return r;
    });

    setRecords(updated);
    saveStoredRecords(updated);
    const targetRec = updated.find(r => r.id === recordId);
    if (targetRec) setSelectedRecord(targetRec);

    const newLogs = addAuditLog({
      action: 'PUBLISHED',
      resourceId: recordId,
      resourceTitle: targetRec?.title || 'Scientific Record',
      userName: currentUser.name,
      userRole: currentUser.role,
      notes: notes || 'Human Review Completed: AI draft approved and published.'
    });
    setAuditLogs(newLogs);
    showToast('Record approved and published to the public portal!', 'success', 'Human Review Passed');
  };

  // ── Request Changes / Reject (Reviewer / Admin only) ─────────────────────
  const handleRequestChanges = (recordId, reason = '') => {
    if (!can(currentUser, PERMISSIONS.APPROVE_REJECT)) {
      showToast('Only Reviewers and Admins can request modifications.', 'error', 'Access Denied');
      return;
    }
    const updated = records.map((r) => {
      if (r.id === recordId) {
        return {
          ...r,
          status: 'Changes Requested',
          aiDraft: {
            ...r.aiDraft,
            reviewedBy: `${currentUser.name} (${currentUser.role})`,
            reviewNotes: reason || 'Reviewer requested changes to draft.'
          }
        };
      }
      return r;
    });

    setRecords(updated);
    saveStoredRecords(updated);
    const targetRec = updated.find(r => r.id === recordId);
    if (targetRec) setSelectedRecord(targetRec);

    const newLogs = addAuditLog({
      action: 'CHANGES_REQUESTED',
      resourceId: recordId,
      resourceTitle: targetRec?.title || 'Scientific Record',
      userName: currentUser.name,
      userRole: currentUser.role,
      notes: `Reviewer requested changes: ${reason}`
    });
    setAuditLogs(newLogs);
    showToast('Changes requested. Sent back to researcher for update.', 'info', 'Review Update');
  };

  // ── Edit AI Draft (Reviewer / Admin / Author-Researcher) ───────────────────
  const handleUpdateDraft = (recordId, updatedDraft) => {
    const targetRec = records.find(r => r.id === recordId);
    if (!targetRec || !canEditAIDraft(currentUser, targetRec)) {
      showToast('You do not have permission to edit this AI draft.', 'error', 'Access Denied');
      return;
    }
    const updated = records.map((r) =>
      r.id === recordId ? { ...r, aiDraft: updatedDraft } : r
    );
    setRecords(updated);
    saveStoredRecords(updated);
    const updatedTarget = updated.find(r => r.id === recordId);
    if (updatedTarget) setSelectedRecord(updatedTarget);

    const isUserAuthor = isAuthor(currentUser, targetRec);
    const newLogs = addAuditLog({
      action: 'DRAFT_EDITED',
      resourceId: recordId,
      resourceTitle: targetRec?.title || 'Scientific Record',
      userName: currentUser.name,
      userRole: currentUser.role,
      notes: isUserAuthor
        ? 'Author refined AI-generated student explainer / outreach draft content.'
        : 'AI draft explainer/social text edited by reviewer.'
    });
    setAuditLogs(newLogs);
    showToast('AI draft saved successfully!', 'success', 'Draft Saved');
  };

  // ── Reset Demo Data ───────────────────────────────────────────────────────
  const handleResetData = () => {
    if (confirm('Reset all prototype demo records and audit logs back to initial state?')) {
      const reset = resetToDefaultData();
      setRecords(reset.records);
      setAuditLogs(reset.auditLogs);
      setUserState(reset.currentUser);
      setSelectedRecord(reset.records[0]);
      showToast('Prototype data reset to initial 12 records.', 'info', 'Reset Complete');
      handleNavigate('home');
    }
  };

  // ── Pending Review count for Navbar badge ─────────────────────────────────
  const pendingReviewCount = isStaff(currentUser)
    ? records.filter(r => r.status === 'Under Review' || r.status === 'Draft').length
    : isResearcher(currentUser)
      ? records.filter(r => isAuthor(currentUser, r) && (r.status === 'Under Review' || r.status === 'Changes Requested')).length
      : 0;

  // ── Explore records: Public users only see Published ones ─────────────────
  const visibleRecords = can(currentUser, PERMISSIONS.VIEW_REVIEW_QUEUE)
    ? records                                       // reviewers & admins see all
    : can(currentUser, PERMISSIONS.UPLOAD_RECORD)
      ? records.filter(r =>
          r.status === 'Published' ||
          isAuthor(currentUser, r)
        )                                           // researcher sees published + own records
      : records.filter(r => r.status === 'Published'); // public sees published only

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        pendingReviewCount={pendingReviewCount}
      />

      <main className="flex-1">
        {/* ── Access Denied Wall ── */}
        {activePage === 'access-denied' && (
          <AccessDeniedPage
            currentUser={currentUser}
            onNavigate={handleNavigate}
          />
        )}

        {/* ── Public Pages ── */}
        {activePage === 'home' && (
          <HomePage
            records={visibleRecords}
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onSelectRecord={handleSelectRecord}
            onOpenStudentView={handleOpenStudentView}
            onOpenOutreach={handleOpenOutreach}
          />
        )}

        {activePage === 'explore' && (
          <ExplorePage
            records={visibleRecords}
            currentUser={currentUser}
            initialQuery={pageParams.query || ''}
            onSelectRecord={handleSelectRecord}
            onOpenStudentView={handleOpenStudentView}
            onOpenOutreach={handleOpenOutreach}
            onOpenReview={handleOpenReview}
          />
        )}

        {activePage === 'record-details' && (
          <RecordDetailsPage
            record={selectedRecord || visibleRecords[0]}
            allRecords={visibleRecords}
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onOpenStudentView={handleOpenStudentView}
            onOpenOutreach={handleOpenOutreach}
            onOpenReview={handleOpenReview}
            onSelectRecord={handleSelectRecord}
            onBackToSearch={() => handleNavigate('explore')}
          />
        )}

        {activePage === 'student-view' && (
          <StudentExplainerPage
            record={selectedRecord || visibleRecords[0]}
            onOpenRecordDetails={handleSelectRecord}
            onOpenOutreach={handleOpenOutreach}
            onBackToSearch={() => handleNavigate('explore')}
          />
        )}

        {/* ── Researcher+ Pages ── */}
        {activePage === 'upload' && (
          can(currentUser, PERMISSIONS.UPLOAD_RECORD) ? (
            <UploadPage
              currentUser={currentUser}
              onRecordCreated={handleRecordCreated}
              onNavigate={handleNavigate}
            />
          ) : (
            <AccessDeniedPage
              currentUser={currentUser}
              requiredRole="Researcher"
              onNavigate={handleNavigate}
            />
          )
        )}

        {/* ── Review Gate (Reviewer, Admin, Researcher own) ── */}
        {activePage === 'ai-review' && (
          can(currentUser, PERMISSIONS.VIEW_REVIEW_GATE) ? (
            <AIDraftReviewPage
              record={selectedRecord || records[0]}
              allRecords={records}
              currentUser={currentUser}
              onApproveAndPublish={handleApproveAndPublish}
              onRequestChanges={handleRequestChanges}
              onUpdateDraft={handleUpdateDraft}
              onOpenStudentView={handleOpenStudentView}
              onOpenOutreach={handleOpenOutreach}
              onSelectRecord={(rec) => setSelectedRecord(rec)}
              onBackToExplore={() => handleNavigate('explore')}
              onNavigate={handleNavigate}
            />
          ) : (
            <AccessDeniedPage
              currentUser={currentUser}
              requiredRole="Researcher, Reviewer, or Admin"
              onNavigate={handleNavigate}
            />
          )
        )}

        {activePage === 'outreach' && (
          <SocialPreviewPage
            record={selectedRecord || records[0]}
            allRecords={visibleRecords}
            currentUser={currentUser}
            onSelectRecord={(r) => setSelectedRecord(r)}
            onOpenRecordDetails={handleSelectRecord}
            onBackToSearch={() => handleNavigate('explore')}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            records={records}
            visibleRecords={visibleRecords}
            auditLogs={auditLogs}
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onSelectRecord={handleSelectRecord}
            onOpenReview={handleOpenReview}
            onResetData={handleResetData}
          />
        )}

        {/* ── Auth & About ── */}
        {activePage === 'login' && (
          <LoginPage
            currentUser={currentUser}
            onLoginSuccess={(user) => {
              handleSwitchUser(user);
              handleNavigate('dashboard');
            }}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <NotificationToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
