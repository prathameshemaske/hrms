const pool = require('../../config/db');

exports.getExecutionSummary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE status = 'PASS') AS pass,
        COUNT(*) FILTER (WHERE status = 'FAIL') AS fail,
        COUNT(*) FILTER (WHERE status = 'BLOCKED') AS blocked,
        COUNT(*) AS total
      FROM test_executions
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Execution Summary Error:', error);
    res.status(500).json({ message: 'Failed to fetch execution summary' });
  }
};
