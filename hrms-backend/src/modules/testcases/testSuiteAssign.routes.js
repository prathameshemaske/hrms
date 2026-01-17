const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const {
  assignTestCasesToSuite,
} = require('./testSuiteAssign.controller');

router.post(
  '/assign-testcases',
  auth,
  role(['ADMIN', 'QA']),
  assignTestCasesToSuite
);

module.exports = router;
