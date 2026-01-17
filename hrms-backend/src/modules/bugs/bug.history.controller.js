const pool = require('../../config/db');

exports.getBugHistory = async (req, res) => {
  try {
    const { bugId } = req.params;

    const result = await pool.query(
      'SELECT * FROM bug_history WHERE bug_id=$1 ORDER BY created_at DESC',
      [bugId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bug history' });
  }
};
