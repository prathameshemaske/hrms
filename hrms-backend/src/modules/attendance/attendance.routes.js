const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const {
    autoMarkPresent,
    getMyAttendance,
    markAttendance,
} = require('./attendance.controller');

router.post('/auto', auth, autoMarkPresent);
router.get('/my', auth, getMyAttendance);

router.post(
    '/mark',
    auth,
    role(['ADMIN']),
    markAttendance
);

module.exports = router;
