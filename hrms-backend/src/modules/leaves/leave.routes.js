const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  getLeaveTypes,
} = require('./leave.controller');

router.get('/types', auth, getLeaveTypes);

router.post('/', auth, role(['EMPLOYEE', 'QA']), applyLeave);
router.get('/my', auth, getMyLeaves);

router.get('/', auth, role(['ADMIN']), getAllLeaves);
router.put('/:id/status', auth, role(['ADMIN']), updateLeaveStatus);

module.exports = router;
