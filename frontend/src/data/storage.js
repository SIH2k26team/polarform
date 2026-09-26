// LocalStorage persistence controller for PolarSetu
import { INITIAL_RECORDS, INITIAL_EXPEDITIONS, INITIAL_AUDIT_LOGS, DEMO_USERS, INITIAL_SCIENTISTS } from './mockData';

const STORAGE_KEYS = {
  RECORDS: 'polarsetu_records_v1',
  AUDIT_LOGS: 'polarsetu_audit_logs_v1',
  EXPEDITIONS: 'polarsetu_expeditions_v1',
  CURRENT_USER: 'polarsetu_current_user_v1'
};

export const getStoredRecords = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.RECORDS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load records from storage', e);
  }
  // Initialize with initial records
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(INITIAL_RECORDS));
  return INITIAL_RECORDS;
};

export const saveStoredRecords = (records) => {
  try {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save records to storage', e);
  }
};

export const getStoredAuditLogs = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load audit logs', e);
  }
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
  return INITIAL_AUDIT_LOGS;
};

export const addAuditLog = (logEntry) => {
  const current = getStoredAuditLogs();
  const newLog = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' IST',
    ...logEntry
  };
  const updated = [newLog, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save audit log', e);
  }
  return updated;
};

export const getStoredExpeditions = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPEDITIONS);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  localStorage.setItem(STORAGE_KEYS.EXPEDITIONS, JSON.stringify(INITIAL_EXPEDITIONS));
  return INITIAL_EXPEDITIONS;
};

export const getCurrentUser = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  // Default to Public / General User (no login required)
  const defaultUser = DEMO_USERS[0];
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
  return defaultUser;
};

export const setCurrentUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } catch (e) {}
};

export const resetToDefaultData = () => {
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(INITIAL_RECORDS));
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
  localStorage.setItem(STORAGE_KEYS.EXPEDITIONS, JSON.stringify(INITIAL_EXPEDITIONS));
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEMO_USERS[0]));
  return {
    records: INITIAL_RECORDS,
    auditLogs: INITIAL_AUDIT_LOGS,
    expeditions: INITIAL_EXPEDITIONS,
    currentUser: DEMO_USERS[0]
  };
};
