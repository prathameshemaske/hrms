const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const {
  linkBugToTestCase,
  getBugsByTestCase,
  getOpenBugForTestCase,
} = require('./testcase.bug.controller');

router.post(
  '/',
  auth,
  role(['ADMIN', 'QA']),
  linkBugToTestCase
);

router.get(
  '/test-case/:testCaseId',
  auth,
  role(['ADMIN', 'QA']),
  getBugsByTestCase
);

/* ✅ NEW */
router.get(
  '/test-case/:testCaseId/open-bug',
  auth,
  role(['ADMIN', 'QA']),
  getOpenBugForTestCase
);

module.exports = router;
