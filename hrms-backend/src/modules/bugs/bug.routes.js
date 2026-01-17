const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

/* Controllers */
const {
  createBug,
  getAllBugs,
  getBugById,
  updateBugStatus,
  closeBug,
  markBugAsDuplicate, // ✅ FIX 1: IMPORT IT
} = require('./bug.controller');

const {
  getAllComponents,
} = require('./bug.component.controller');

const {
  assignBug,
  getAssignmentHistory,
} = require('./bug.assignment.controller');

const {
  getAllLabels,
  addLabelsToBug,
  getLabelsByBug,
  removeLabelFromBug,
} = require('./bug.label.controller');


// ===============================
// COMPONENTS (STATIC)
// ===============================
router.get(
  '/components',
  auth,
  role(['ADMIN', 'QA', 'EMPLOYEE']),
  getAllComponents
);


// ===============================
// LABELS (STATIC)
// ===============================
router.get(
  '/labels',
  auth,
  role(['ADMIN', 'QA', 'EMPLOYEE']),
  getAllLabels
);

router.post(
  '/:bugId/labels',
  auth,
  role(['ADMIN', 'QA']),
  addLabelsToBug
);

router.get(
  '/:bugId/labels',
  auth,
  role(['ADMIN', 'QA', 'EMPLOYEE']),
  getLabelsByBug
);

router.delete(
  '/:bugId/labels/:labelId',
  auth,
  role(['ADMIN', 'QA']),
  removeLabelFromBug
);


// ===============================
// ASSIGNMENT
// ===============================
router.put(
  '/:bugId/assign',
  auth,
  role(['ADMIN', 'QA']),
  assignBug
);

router.get(
  '/:bugId/assignment-history',
  auth,
  role(['ADMIN', 'QA']),
  getAssignmentHistory
);


// ===============================
// DUPLICATE HANDLING
// ===============================
router.put(
  '/:id/duplicate',
  auth,
  role(['ADMIN', 'QA']),
  markBugAsDuplicate
);


// ===============================
// STATUS / LIFECYCLE
// ===============================
router.put(
  '/:id/status',
  auth,
  role(['ADMIN', 'QA']),
  updateBugStatus
);

router.put(
  '/:id/close',
  auth,
  role(['ADMIN', 'QA']),
  closeBug
);


// ===============================
// BUG CRUD (DYNAMIC – LAST)
// ===============================
router.post(
  '/',
  auth,
  role(['ADMIN', 'QA']),
  createBug
);

router.get(
  '/',
  auth,
  role(['ADMIN', 'QA']),
  getAllBugs
);

router.get(
  '/:id',
  auth,
  role(['ADMIN', 'QA']),
  getBugById
);

module.exports = router;
