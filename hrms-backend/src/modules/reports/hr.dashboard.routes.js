const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const {
    getHrDashboardMetrics,
} = require('./hr.dashboard.controller');

router.get(
    '/hr/summary',
    auth,
    role(['ADMIN', 'HR']),
    getHrDashboardMetrics
);

module.exports = router;
