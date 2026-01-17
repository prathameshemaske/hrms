const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const {
    getHolidays,
    createHoliday,
    deleteHoliday,
} = require('./holiday.controller');

router.get('/', auth, getHolidays);

router.post(
    '/',
    auth,
    role(['ADMIN']),
    createHoliday
);

router.delete(
    '/:id',
    auth,
    role(['ADMIN']),
    deleteHoliday
);

module.exports = router;
