const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const { getBugSummary } = require('./bugReports.controller');
const { getExecutionSummary } = require('./executionReports.controller');

/* ================= BUG DASHBOARD ================= */
router.get(
  '/bugs/summary',
  auth,
  role(['ADMIN', 'QA']),
  getBugSummary
);

/* ================= EXECUTION DASHBOARD ================= */
router.get(
  '/execution-summary',
  auth,
  role(['ADMIN', 'QA']),
  getExecutionSummary
);

module.exports = router;
