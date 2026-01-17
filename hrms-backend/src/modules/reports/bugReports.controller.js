const pool = require('../../config/db');

/* Bug summary counts */
const getBugSummary = async (req, res) => {
    try {
        const total = await pool.query(`SELECT COUNT(*) FROM bugs`);

        const byStatus = await pool.query(`
      SELECT status, COUNT(*) 
      FROM bugs 
      GROUP BY status
    `);

        const byPriority = await pool.query(`
      SELECT priority, COUNT(*) 
      FROM bugs 
      GROUP BY priority
    `);

        const byComponent = await pool.query(`
      SELECT c.name AS component, COUNT(*) 
      FROM bugs b
      LEFT JOIN bug_components c ON c.id = b.component_id
      GROUP BY c.name
    `);

        res.json({
            total: Number(total.rows[0].count),
            byStatus: byStatus.rows,
            byPriority: byPriority.rows,
            byComponent: byComponent.rows,
        });
    } catch (error) {
        console.error('Bug Report Error:', error);
        res.status(500).json({ message: 'Failed to fetch bug reports' });
    }
};

module.exports = {
    getBugSummary,
};
