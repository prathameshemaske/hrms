const pool = require('../../config/db');

/* Apply Leave */
exports.applyLeave = async (req, res) => {
  try {
    const { leave_type_id, start_date, end_date, reason } = req.body;

    if (!leave_type_id || !start_date || !end_date) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    await pool.query(
      `INSERT INTO leaves
       (employee_id, leave_type_id, start_date, end_date, reason)
       VALUES ($1,$2,$3,$4,$5)`,
      [req.user.id, leave_type_id, start_date, end_date, reason]
    );

    res.status(201).json({ message: 'Leave applied successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to apply leave' });
  }
};

/* My Leaves */
exports.getMyLeaves = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT l.*, lt.name AS leave_type
       FROM leaves l
       JOIN leave_types lt ON lt.id = l.leave_type_id
       WHERE employee_id = $1
       ORDER BY applied_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaves' });
  }
};

/* All Leaves (ADMIN) */
exports.getAllLeaves = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT l.*, e.name AS employee_name, lt.name AS leave_type
       FROM leaves l
       JOIN employees e ON e.id = l.employee_id
       JOIN leave_types lt ON lt.id = l.leave_type_id
       ORDER BY applied_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaves' });
  }
};

/* Approve / Reject Leave */
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await pool.query(
      `UPDATE leaves
       SET status=$1, approved_by=$2, approved_at=CURRENT_TIMESTAMP
       WHERE id=$3`,
      [status, req.user.id, id]
    );

    res.json({ message: 'Leave status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update leave' });
  }
};

/* Leave Types */
exports.getLeaveTypes = async (req, res) => {
  const result = await pool.query('SELECT * FROM leave_types');
  res.json(result.rows);
};
