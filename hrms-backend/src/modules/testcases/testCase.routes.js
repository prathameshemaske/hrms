const router = require('express').Router();

const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const {
  createTestCase,
  getAllTestCases,
  getTestCaseById,
} = require('./testCase.controller');

router.post('/', auth, role(['ADMIN', 'QA']), createTestCase);
router.get('/', auth, role(['ADMIN', 'QA']), getAllTestCases);
router.get('/:id', auth, role(['ADMIN', 'QA']), getTestCaseById);

module.exports = router;
