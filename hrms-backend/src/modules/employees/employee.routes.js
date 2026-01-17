const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

const {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployeeStatus,
    updateEmployee
} = require('./employee.controller');

/* List employees */
router.get('/', auth, role(['ADMIN', 'QA']), getAllEmployees);

/* Create employee */
router.post('/', auth, role(['ADMIN']), createEmployee);

/* Get employee by ID */
router.get('/:id', auth, role(['ADMIN', 'QA']), getEmployeeById);

/* Update employee master */
router.put('/:id', auth, role(['ADMIN']), updateEmployee);

/* Update status */
router.put('/:id/status', auth, role(['ADMIN']), updateEmployeeStatus);

module.exports = router;
