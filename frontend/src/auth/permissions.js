/**
 * PolarSetu — Frontend Role-Based Access Control (RBAC)
 *
 * Single source of truth for who can do what.
 * All pages and components import from here.
 *
 * Roles (lowest → highest privilege):
 *   public      → Student / General visitor
 *   researcher  → NCPOR field scientist / data submitter
 *   reviewer    → Designated scientific reviewer / outreach officer
 *   admin       → Platform administrator
 */

// ─── Role Definitions ─────────────────────────────────────────────────────────
export const ROLES = {
  PUBLIC:     'Public / Student',
  RESEARCHER: 'Researcher',
  REVIEWER:   'Reviewer',
  ADMIN:      'Admin',
};

// ─── Permission Keys ──────────────────────────────────────────────────────────
export const PERMISSIONS = {
  // Search & Discovery — open to everyone
  SEARCH_PUBLISHED:    'search_published',
  VIEW_RECORD_DETAILS: 'view_record_details',
  VIEW_STUDENT_VIEW:   'view_student_view',

  // Upload & Edit
  UPLOAD_RECORD:       'upload_record',
  EDIT_OWN_RECORD:     'edit_own_record',

  // AI Drafting
  GENERATE_AI_DRAFT:   'generate_ai_draft',
  EDIT_OWN_AI_DRAFT:   'edit_own_ai_draft',

  // Review Gate (core safety feature)
  VIEW_REVIEW_GATE:    'view_review_gate',
  VIEW_REVIEW_QUEUE:   'view_review_queue',
  REVIEW_SUBMISSION:   'review_submission',
  APPROVE_REJECT:      'approve_reject',
  EDIT_AI_DRAFT:       'edit_ai_draft',

  // Outreach Studio
  VIEW_OUTREACH:       'view_outreach',

  // Dashboard & Audit
  VIEW_DASHBOARD:      'view_dashboard',
  VIEW_AUDIT_LOG:      'view_audit_log',

  // Admin-only
  MANAGE_USERS:        'manage_users',
  MANAGE_ALL_RECORDS:  'manage_all_records',
};

// ─── Role → Permissions Map ───────────────────────────────────────────────────
const ROLE_PERMISSIONS = {
  [ROLES.PUBLIC]: [
    PERMISSIONS.SEARCH_PUBLISHED,
    PERMISSIONS.VIEW_RECORD_DETAILS,
    PERMISSIONS.VIEW_STUDENT_VIEW,
  ],

  [ROLES.RESEARCHER]: [
    PERMISSIONS.SEARCH_PUBLISHED,
    PERMISSIONS.VIEW_RECORD_DETAILS,
    PERMISSIONS.VIEW_STUDENT_VIEW,
    PERMISSIONS.UPLOAD_RECORD,
    PERMISSIONS.EDIT_OWN_RECORD,
    PERMISSIONS.GENERATE_AI_DRAFT,
    PERMISSIONS.VIEW_REVIEW_GATE,      // Can access Review Gate for own records
    PERMISSIONS.EDIT_OWN_AI_DRAFT,     // Can refine AI draft of own submissions
    PERMISSIONS.VIEW_DASHBOARD,        // Can see own uploads & submissions
  ],

  [ROLES.REVIEWER]: [
    PERMISSIONS.SEARCH_PUBLISHED,
    PERMISSIONS.VIEW_RECORD_DETAILS,
    PERMISSIONS.VIEW_STUDENT_VIEW,
    PERMISSIONS.UPLOAD_RECORD,
    PERMISSIONS.GENERATE_AI_DRAFT,
    PERMISSIONS.VIEW_REVIEW_GATE,      // Review Gate access
    PERMISSIONS.VIEW_REVIEW_QUEUE,     // Can view full review queue
    PERMISSIONS.REVIEW_SUBMISSION,     // Full scientific review capability
    PERMISSIONS.APPROVE_REJECT,        // Can approve / request modifications
    PERMISSIONS.EDIT_AI_DRAFT,         // Can edit AI drafts of all submissions
    PERMISSIONS.VIEW_OUTREACH,
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_AUDIT_LOG,
  ],

  [ROLES.ADMIN]: [
    PERMISSIONS.SEARCH_PUBLISHED,
    PERMISSIONS.VIEW_RECORD_DETAILS,
    PERMISSIONS.VIEW_STUDENT_VIEW,
    PERMISSIONS.UPLOAD_RECORD,
    PERMISSIONS.EDIT_OWN_RECORD,
    PERMISSIONS.GENERATE_AI_DRAFT,
    PERMISSIONS.VIEW_REVIEW_GATE,
    PERMISSIONS.VIEW_REVIEW_QUEUE,
    PERMISSIONS.REVIEW_SUBMISSION,
    PERMISSIONS.APPROVE_REJECT,
    PERMISSIONS.EDIT_AI_DRAFT,
    PERMISSIONS.VIEW_OUTREACH,
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_AUDIT_LOG,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_ALL_RECORDS,
  ],
};

// ─── Core Permission Check ────────────────────────────────────────────────────

/**
 * Returns true if the given user has the requested permission.
 * @param {object} user  - currentUser object from state/storage
 * @param {string} perm  - one of the PERMISSIONS constants
 */
export const can = (user, perm) => {
  if (!user?.role) return false;
  const allowed = ROLE_PERMISSIONS[user.role] || [];
  return allowed.includes(perm);
};

/**
 * Returns true if user's role is in the provided list.
 * @param {object} user
 * @param {string[]} roles - array of ROLES values
 */
export const hasRole = (user, roles) => {
  if (!user?.role) return false;
  return roles.includes(user.role);
};

// ─── Author & Ownership Helpers ──────────────────────────────────────────────

/**
 * Checks whether the given user is the author/submitter of the record.
 * @param {object} user
 * @param {object} record
 * @returns {boolean}
 */
export const isAuthor = (user, record) => {
  if (!user || !record) return false;
  const userLastName = user.name?.split(' ').slice(-1)[0]?.toLowerCase() || '';
  const authorName = (record.authorName || '').toLowerCase();
  const authorId = record.authorId || '';
  return (
    (userLastName && authorName.includes(userLastName)) ||
    (authorId && authorId === user.id) ||
    (user.name && authorName.includes(user.name.toLowerCase()))
  );
};

/**
 * Checks whether the user can access the Review Gate for a given record.
 * Reviewer and Admin can access any record.
 * Researcher can access their own submitted records.
 * @param {object} user
 * @param {object} record
 * @returns {boolean}
 */
export const canAccessReview = (user, record) => {
  if (!user) return false;
  if (isAdmin(user) || isReviewer(user)) return true;
  if (isResearcher(user)) {
    if (!record) return true; // General access to review gate page
    return isAuthor(user, record);
  }
  return false;
};

/**
 * Checks whether the user can edit the AI draft of a record.
 * @param {object} user
 * @param {object} record
 * @returns {boolean}
 */
export const canEditAIDraft = (user, record) => {
  if (!user) return false;
  if (can(user, PERMISSIONS.EDIT_AI_DRAFT)) return true;
  if (isResearcher(user) && isAuthor(user, record)) return true;
  return false;
};

/**
 * Checks whether the user can approve/publish or request changes on records.
 * @param {object} user
 * @returns {boolean}
 */
export const canApproveRecord = (user) => {
  return can(user, PERMISSIONS.APPROVE_REJECT);
};

// ─── Page-Level Access Map ────────────────────────────────────────────────────
// Maps page IDs (used in handleNavigate) to the permission required to view them.
export const PAGE_ACCESS = {
  'upload':     PERMISSIONS.UPLOAD_RECORD,
  'ai-review':  PERMISSIONS.VIEW_REVIEW_GATE,
  'outreach':   PERMISSIONS.VIEW_OUTREACH,
  'dashboard':  PERMISSIONS.VIEW_DASHBOARD,
};

/**
 * Check if a user is allowed to navigate to a given page.
 * @param {object} user
 * @param {string} pageId
 * @returns {boolean}
 */
export const canAccessPage = (user, pageId) => {
  const required = PAGE_ACCESS[pageId];
  if (!required) return true;            // public page — always allowed
  return can(user, required);
};

// ─── Helpful Role Shorthand Checks ───────────────────────────────────────────
export const isPublic     = (user) => user?.role === ROLES.PUBLIC;
export const isResearcher = (user) => user?.role === ROLES.RESEARCHER;
export const isReviewer   = (user) => user?.role === ROLES.REVIEWER;
export const isAdmin      = (user) => user?.role === ROLES.ADMIN;
export const isStaff      = (user) => hasRole(user, [ROLES.REVIEWER, ROLES.ADMIN]);

// ─── Friendly Role Description (for UI) ──────────────────────────────────────
export const ROLE_DESCRIPTIONS = {
  [ROLES.PUBLIC]:     'Browse and search published polar science records and student explainers.',
  [ROLES.RESEARCHER]: 'Upload records, add metadata, inspect & refine own AI drafts.',
  [ROLES.REVIEWER]:   'Review AI drafts across all submissions, approve/reject, and export outreach packs.',
  [ROLES.ADMIN]:      'Full access: manage users, records, review queue, and audit trail.',
};
