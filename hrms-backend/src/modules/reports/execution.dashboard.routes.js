const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const {
  getExecutionSummary,
} = require('./execution.dashboard.controller');

router.get(
  '/execution-summary',
  auth,
  role(['ADMIN', 'QA']),
  getExecutionSummary
);

module.exports = router;
