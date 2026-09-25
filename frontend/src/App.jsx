import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';

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
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleNavigate = (pageId, params = {}) => {
    setActivePage(pageId);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchUser = (newUser) => {
    setCurrentUser(newUser);
    setUserState(newUser);
    showToast(`Switched active profile to: ${newUser.name} (${newUser.role})`, 'info', 'Role Changed');
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
    setSelectedRecord(record || records[0]);
    handleNavigate('outreach');
  };

  const handleOpenReview = (record) => {
    setSelectedRecord(record || records.find(r => r.status === 'Under Review') || records[0]);
    handleNavigate('ai-review');
  };

  // Handler for uploading/creating new record
  const handleRecordCreated = (newRecord) => {
    const updated = [newRecord, ...records];
    setRecords(updated);
    saveStoredRecords(updated);

    // Add Audit Log
    const newLogs = addAuditLog({
      action: 'UPLOADED & AI_DRAFTED',
      resourceId: newRecord.id,
      resourceTitle: newRecord.title,
      userName: currentUser.name,
      userRole: currentUser.role,
      notes: `Uploaded ${newRecord.contentType} document for ${newRecord.expeditionName}. AI draft created and routed to Human Review Gate.`
    });
    setAuditLogs(newLogs);

    setSelectedRecord(newRecord);
    showToast("Record uploaded! AI draft generated and queued for human review.", "success", "Upload Successful");
    handleNavigate('ai-review');
  };

  // Handler for approving and publishing record (Human Review Gate)
  const handleApproveAndPublish = (recordId, notes = '') => {
    const updated = records.map((r) => {
      if (r.id === recordId) {
        return {
          ...r,
          status: 'Published',
          publishedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          aiDraft: {
            ...r.aiDraft,
            reviewedBy: `${currentUser.name} (${currentUser.role})`,
            reviewDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' IST',
            reviewNotes: notes || `Verified by ${currentUser.name}. Approved for public discovery.`
          }
        };
      }
      return r;
    });

    setRecords(updated);
    saveStoredRecords(updated);

    const targetRec = updated.find(r => r.id === recordId);
    if (targetRec) {
      setSelectedRecord(targetRec);
    }

    // Add immutable audit log
    const newLogs = addAuditLog({
      action: 'PUBLISHED',
      resourceId: recordId,
      resourceTitle: targetRec?.title || 'Scientific Record',
      userName: currentUser.name,
      userRole: currentUser.role,
      notes: notes || `Human Review Completed: AI draft approved and published to public portal.`
    });
    setAuditLogs(newLogs);

    showToast("Record successfully approved and published to public portal!", "success", "Human Review Passed");
  };

  // Handler for requesting changes / rejecting draft
  const handleRequestChanges = (recordId, reason = '') => {
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
    if (targetRec) {
      setSelectedRecord(targetRec);
    }

    const newLogs = addAuditLog({
      action: 'CHANGES_REQUESTED',
      resourceId: recordId,
      resourceTitle: targetRec?.title || 'Scientific Record',
      userName: currentUser.name,
      userRole: currentUser.role,
      notes: `Reviewer requested changes: ${reason}`
    });
    setAuditLogs(newLogs);

    showToast("Changes requested. Sent back to researcher for update.", "info", "Review Update");
  };

  // Handler for editing the AI draft
  const handleUpdateDraft = (recordId, updatedDraft) => {
    const updated = records.map((r) => {
      if (r.id === recordId) {
        return {
          ...r,
          aiDraft: updatedDraft
        };
      }
      return r;
    });

    setRecords(updated);
    saveStoredRecords(updated);

    const targetRec = updated.find(r => r.id === recordId);
    if (targetRec) {
      setSelectedRecord(targetRec);
    }

    const newLogs = addAuditLog({
      action: 'DRAFT_EDITED',
      resourceId: recordId,
      resourceTitle: targetRec?.title || 'Scientific Record',
      userName: currentUser.name,
      userRole: currentUser.role,
      notes: "AI draft explainer/social text edited by reviewer."
    });
    setAuditLogs(newLogs);

    showToast("Edited AI draft saved successfully!", "success", "Draft Saved");
  };

  // Reset demo data
  const handleResetData = () => {
    if (confirm("Reset all prototype demo records and audit logs back to initial state?")) {
      const reset = resetToDefaultData();
      setRecords(reset.records);
      setAuditLogs(reset.auditLogs);
      setUserState(reset.currentUser);
      setSelectedRecord(reset.records[0]);
      showToast("Prototype data reset to initial 12 records.", "info", "Reset Complete");
      handleNavigate('home');
    }
  };

  const pendingReviewCount = records.filter(r => r.status === 'Under Review' || r.status === 'Draft').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        pendingReviewCount={pendingReviewCount}
      />

      {/* Main Page Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            records={records}
            onNavigate={handleNavigate}
            onSelectRecord={handleSelectRecord}
            onOpenStudentView={handleOpenStudentView}
            onOpenOutreach={handleOpenOutreach}
          />
        )}

        {activePage === 'explore' && (
          <ExplorePage
            records={records}
            initialQuery={pageParams.query || ''}
            onSelectRecord={handleSelectRecord}
            onOpenStudentView={handleOpenStudentView}
            onOpenOutreach={handleOpenOutreach}
            onOpenReview={handleOpenReview}
          />
        )}

        {activePage === 'upload' && (
          <UploadPage
            currentUser={currentUser}
            onRecordCreated={handleRecordCreated}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'ai-review' && (
          <AIDraftReviewPage
            record={selectedRecord || records.find(r => r.status === 'Under Review') || records[0]}
            currentUser={currentUser}
            onApproveAndPublish={handleApproveAndPublish}
            onRequestChanges={handleRequestChanges}
            onUpdateDraft={handleUpdateDraft}
            onOpenStudentView={handleOpenStudentView}
            onOpenOutreach={handleOpenOutreach}
            onBackToExplore={() => handleNavigate('explore')}
          />
        )}

        {activePage === 'record-details' && (
          <RecordDetailsPage
            record={selectedRecord || records[0]}
            allRecords={records}
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
            record={selectedRecord || records[0]}
            onOpenRecordDetails={handleSelectRecord}
            onOpenOutreach={handleOpenOutreach}
            onBackToSearch={() => handleNavigate('explore')}
          />
        )}

        {activePage === 'outreach' && (
          <SocialPreviewPage
            record={selectedRecord || records[0]}
            allRecords={records}
            onSelectRecord={(r) => setSelectedRecord(r)}
            onOpenRecordDetails={handleSelectRecord}
            onBackToSearch={() => handleNavigate('explore')}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            records={records}
            auditLogs={auditLogs}
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onSelectRecord={handleSelectRecord}
            onOpenReview={handleOpenReview}
            onResetData={handleResetData}
          />
        )}

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
          <AboutPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Feedback Toast */}
      <NotificationToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
