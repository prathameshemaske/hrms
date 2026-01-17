const pool = require('../../config/db');

/* Auto mark present (on login) */
exports.autoMarkPresent = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date().toISOString().split('T')[0];

        const emp = await pool.query(
            `SELECT id FROM employees WHERE user_id = $1`,
            [userId]
        );

        if (emp.rows.length === 0) return res.json();

        const employeeId = emp.rows[0].id;

        await pool.query(
            `INSERT INTO attendance (employee_id, attendance_date, status)
       VALUES ($1,$2,'PRESENT')
       ON CONFLICT DO NOTHING`,
            [employeeId, today]
        );

        res.json();
    } catch (err) {
        console.error('Auto attendance error:', err);
        res.status(500).json();
    }
};

/* My attendance */
exports.getMyAttendance = async (req, res) => {
    try {
        const emp = await pool.query(
            `SELECT id FROM employees WHERE user_id = $1`,
            [req.user.id]
        );

        if (emp.rows.length === 0) return res.json([]);

        const result = await pool.query(
            `SELECT * FROM attendance
       WHERE employee_id = $1
       ORDER BY attendance_date DESC`,
            [emp.rows[0].id]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch attendance' });
    }
};

/* Admin: mark attendance */
exports.markAttendance = async (req, res) => {
    try {
        const { employee_id, attendance_date, status } = req.body;

        if (!employee_id || !attendance_date || !status) {
            return res.status(400).json({ message: 'Missing fields' });
        }

        await pool.query(
            `INSERT INTO attendance
       (employee_id, attendance_date, status, marked_by)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (employee_id, attendance_date)
       DO UPDATE SET status=$3, marked_by=$4, marked_at=CURRENT_TIMESTAMP`,
            [employee_id, attendance_date, status, req.user.id]
        );

        res.json({ message: 'Attendance marked' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to mark attendance' });
    }
};
