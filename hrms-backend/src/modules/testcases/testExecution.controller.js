const pool = require("../../config/db");

/* ================= EXECUTE TEST ================= */

exports.executeTest = async (req, res) => {
  try {
    const {
      test_case_id,
      executed_by,
      status,
      execution_notes,
      linked_bug_id,
    } = req.body;

    await pool.query(
      `
      INSERT INTO test_executions
      (test_case_id, executed_by, status, execution_notes, linked_bug_id)
      VALUES ($1,$2,$3,$4,$5)
      `,
      [test_case_id, executed_by, status, execution_notes, linked_bug_id]
    );

    res.json({ message: "Test executed successfully" });
  } catch (err) {
    console.error("Execute test failed", err);
    res.status(500).json({ error: "Failed to execute test" });
  }
};

/* ================= EXECUTION HISTORY ================= */

exports.getExecutionHistory = async (req, res) => {
  try {
    const testCaseId = req.params.testCaseId;

    const result = await pool.query(
      `
      SELECT *
      FROM test_executions
      WHERE test_case_id = $1
      ORDER BY executed_at DESC
      `,
      [testCaseId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Execution history error", err);
    res.status(500).json({ error: "Failed to load execution history" });
  }
};

/* ================= DASHBOARD SUMMARY ================= */

exports.getExecutionSummary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*)::int AS total,
        COALESCE(SUM(CASE WHEN status = 'PASS' THEN 1 ELSE 0 END),0)::int AS pass,
        COALESCE(SUM(CASE WHEN status = 'FAIL' THEN 1 ELSE 0 END),0)::int AS fail,
        COALESCE(SUM(CASE WHEN status = 'BLOCKED' THEN 1 ELSE 0 END),0)::int AS blocked
      FROM test_executions
    `);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Execution summary error", err);
    res.status(500).json({ error: "Failed to load execution summary" });
  }
};
