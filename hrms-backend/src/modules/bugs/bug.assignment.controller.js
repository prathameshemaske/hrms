const pool = require('../../config/db');

/* Assign / Reassign Bug */
exports.assignBug = async (req, res) => {
    try {
        const { bugId } = req.params;
        const { assignedTo } = req.body;

        if (!assignedTo) {
            return res.status(400).json({ message: 'assignedTo is required' });
        }

        // Check bug exists
        const bug = await pool.query(
            'SELECT id FROM bugs WHERE id = $1',
            [bugId]
        );

        if (bug.rows.length === 0) {
            return res.status(404).json({ message: 'Bug not found' });
        }

        // Update bug
        await pool.query(
            `UPDATE bugs
       SET assigned_to = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
            [assignedTo, bugId]
        );

        // Insert history
        await pool.query(
            `INSERT INTO bug_assignment_history
       (bug_id, assigned_to, assigned_by)
       VALUES ($1, $2, $3)`,
            [bugId, assignedTo, req.user.id]
        );

        res.json({ message: 'Bug assigned successfully' });
    } catch (error) {
        console.error('Assign Bug Error:', error);
        res.status(500).json({ message: 'Failed to assign bug' });
    }
};

/* Get Assignment History */
exports.getAssignmentHistory = async (req, res) => {
    try {
        const { bugId } = req.params;

        const result = await pool.query(
            `SELECT h.*, u.email AS assigned_to_email
       FROM bug_assignment_history h
       LEFT JOIN users u ON u.id = h.assigned_to
       WHERE h.bug_id = $1
       ORDER BY h.assigned_at DESC`,
            [bugId]
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch assignment history' });
    }
};
