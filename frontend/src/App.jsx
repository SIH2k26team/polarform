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

// ── Route Helpers ─────────────────────────────────────────────────────────────
const getRouteFromPath = (pathname, searchStr = '') => {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  const searchParams = new URLSearchParams(searchStr);
  const query = searchParams.get('query') || '';
  const recordId = searchParams.get('id') || '';

  if (cleanPath === '/' || cleanPath === '/home') {
    return { page: 'home', params: {} };
  }
  if (cleanPath === '/explore') {
    return { page: 'explore', params: { query } };
  }
  if (cleanPath.startsWith('/record/')) {
    const id = cleanPath.replace('/record/', '');
    return { page: 'record-details', params: { recordId: id } };
  }
  if (cleanPath === '/record') {
    return { page: 'record-details', params: { recordId } };
  }
  if (cleanPath.startsWith('/student-explainer/')) {
    const id = cleanPath.replace('/student-explainer/', '');
    return { page: 'student-view', params: { recordId: id } };
  }
  if (cleanPath === '/student-view' || cleanPath === '/student-explainer') {
    return { page: 'student-view', params: { recordId } };
  }
  if (cleanPath === '/upload') {
    return { page: 'upload', params: {} };
  }
  if (cleanPath === '/ai-review' || cleanPath === '/review') {
    return { page: 'ai-review', params: { recordId } };
  }
  if (cleanPath === '/outreach') {
    return { page: 'outreach', params: { recordId } };
  }
  if (cleanPath === '/dashboard') {
    return { page: 'dashboard', params: {} };
  }
  if (cleanPath === '/login') {
    return { page: 'login', params: {} };
  }
  if (cleanPath === '/about') {
    return { page: 'about', params: {} };
  }
  if (cleanPath === '/access-denied') {
    return { page: 'access-denied', params: {} };
  }
  return { page: 'home', params: {} };
};

const getPathFromRoute = (pageId, params = {}) => {
  switch (pageId) {
    case 'home':
      return '/';
    case 'explore':
      return params.query ? `/explore?query=${encodeURIComponent(params.query)}` : '/explore';
    case 'record-details':
      return params.recordId ? `/record/${params.recordId}` : '/record';
    case 'student-view':
      return params.recordId ? `/student-explainer/${params.recordId}` : '/student-explainer';
    case 'upload':
      return '/upload';
    case 'ai-review':
      return params.recordId ? `/ai-review?id=${params.recordId}` : '/ai-review';
    case 'outreach':
      return params.recordId ? `/outreach?id=${params.recordId}` : '/outreach';
    case 'dashboard':
      return '/dashboard';
    case 'login':
      return '/login';
    case 'about':
      return '/about';
    case 'access-denied':
      return '/access-denied';
    default:
      return '/';
  }
};

export default function App() {
  const [records, setRecords] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [currentUser, setUserState] = useState(getCurrentUser());
  const initialRoute = getRouteFromPath(window.location.pathname, window.location.search);
  const [activePage, setActivePage] = useState(initialRoute.page);
  const [pageParams, setPageParams] = useState(initialRoute.params);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [toast, setToast] = useState(null);

  // Initialize data & routes on mount and sync with browser history
  useEffect(() => {
    const loadedRecords = getStoredRecords();
    const loadedLogs = getStoredAuditLogs();
    setRecords(loadedRecords);
    setAuditLogs(loadedLogs);

    const currentRoute = getRouteFromPath(window.location.pathname, window.location.search);
    setActivePage(currentRoute.page);
    setPageParams(currentRoute.params);

    if (currentRoute.params.recordId && loadedRecords.length > 0) {
      const found = loadedRecords.find(r => r.id === currentRoute.params.recordId);
      if (found) setSelectedRecord(found);
      else setSelectedRecord(loadedRecords[0]);
    } else if (loadedRecords.length > 0) {
      setSelectedRecord(loadedRecords[0]);
    }

    const handlePopState = () => {
      const popRoute = getRouteFromPath(window.location.pathname, window.location.search);
      setActivePage(popRoute.page);
      setPageParams(popRoute.params);
      if (popRoute.params.recordId) {
        const recs = getStoredRecords();
        const found = recs.find(r => r.id === popRoute.params.recordId);
        if (found) setSelectedRecord(found);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (message, type = 'success', title = '') => {
    setToast({ message, type, title });
    setTimeout(() => setToast(null), 4000);
  };

  // ── Guarded navigation with URL updates ───────────────────────────────────
  const handleNavigate = (pageId, params = {}) => {
    // Check access before routing
    if (!canAccessPage(currentUser, pageId)) {
      setActivePage('access-denied');
      setPageParams({ attempted: pageId });
      window.history.pushState({}, '', '/access-denied');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    let mergedParams = { ...params };
    if (
      (pageId === 'record-details' || pageId === 'student-view' || pageId === 'ai-review' || pageId === 'outreach') &&
      !mergedParams.recordId &&
      selectedRecord
    ) {
      mergedParams.recordId = selectedRecord.id;
    }

    const newUrl = getPathFromRoute(pageId, mergedParams);
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.pushState({}, '', newUrl);
    }

    setActivePage(pageId);
    setPageParams(mergedParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchUser = (newUser) => {
    setCurrentUser(newUser);
    setUserState(newUser);
    showToast(`Switched to: ${newUser.name} (${newUser.role})`, 'info', 'Role Changed');
  };

  const handleSelectRecord = (record) => {
    const target = record || selectedRecord || records[0];
    if (target) setSelectedRecord(target);
    handleNavigate('record-details', { recordId: target?.id });
  };

  const handleOpenStudentView = (record) => {
    const target = record || selectedRecord || records[0];
    if (target) setSelectedRecord(target);
    handleNavigate('student-view', { recordId: target?.id });
  };

  const handleOpenOutreach = (record) => {
    if (!can(currentUser, PERMISSIONS.VIEW_OUTREACH)) {
      showToast('Outreach Studio requires Reviewer or Admin access.', 'error', 'Access Denied');
      return;
    }
    const target = record || selectedRecord || records[0];
    if (target) setSelectedRecord(target);
    handleNavigate('outreach', { recordId: target?.id });
  };

  const handleOpenReview = (record) => {
    if (!can(currentUser, PERMISSIONS.VIEW_REVIEW_GATE)) {
      showToast('The Review Gate requires Researcher, Reviewer, or Admin access.', 'error', 'Access Denied');
      return;
    }
    let target = record;
    if (target) {
      if (isResearcher(currentUser) && !isAuthor(currentUser, target)) {
        showToast('Researchers can inspect and edit AI drafts for their own submissions.', 'info', 'Showing Your Submission');
        const ownRec = records.find(r => isAuthor(currentUser, r));
        if (ownRec) target = ownRec;
      }
    } else {
      if (isResearcher(currentUser)) {
        target = records.find(r => isAuthor(currentUser, r) && (r.status === 'Under Review' || r.status === 'Changes Requested'))
          || records.find(r => isAuthor(currentUser, r));
      } else {
        target = records.find(r => r.status === 'Under Review') || records[0];
      }
    }
    if (target) setSelectedRecord(target);
    handleNavigate('ai-review', { recordId: target?.id });
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

  const isLoginPage = activePage === 'login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {!isLoginPage && (
        <Navbar
          activePage={activePage}
          onNavigate={handleNavigate}
          currentUser={currentUser}
          onSwitchUser={handleSwitchUser}
          pendingReviewCount={pendingReviewCount}
        />
      )}

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

      {!isLoginPage && <Footer onNavigate={handleNavigate} />}
      <NotificationToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
