const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const {
  createTestSuite,
  getAllTestSuites,
  getTestSuiteById,
} = require('./testSuite.controller');

/* Create Test Suite */
router.post(
  '/',
  auth,
  role(['ADMIN', 'QA']),
  createTestSuite
);

/* Get All Test Suites */
router.get(
  '/',
  auth,
  role(['ADMIN', 'QA']),
  getAllTestSuites
);

/* Get Test Suite By ID */
router.get(
  '/:id',
  auth,
  role(['ADMIN', 'QA']),
  getTestSuiteById
);

module.exports = router;
