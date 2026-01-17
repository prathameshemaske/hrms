const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const {
  bulkExecuteTestSuite,
} = require('./testSuiteExecution.controller');

router.post(
  '/bulk-execute',
  auth,
  role(['ADMIN', 'QA']),
  bulkExecuteTestSuite
);

module.exports = router;
