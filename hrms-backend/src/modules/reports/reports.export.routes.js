const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const {
  exportTestExecutions,
  exportBugs,
  exportDashboardSummary
} = require('./reports.export.controller');

// ADMIN + QA
router.get('/test-executions', auth, role(['ADMIN', 'QA']), exportTestExecutions);
router.get('/bugs', auth, role(['ADMIN', 'QA']), exportBugs);

// ADMIN + QA + EMPLOYEE
router.get(
  '/dashboard-summary',
  auth,
  role(['ADMIN', 'QA', 'EMPLOYEE']),
  exportDashboardSummary
);

module.exports = router;
