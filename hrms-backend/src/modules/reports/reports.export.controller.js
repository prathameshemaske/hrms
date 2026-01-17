const pool = require('../../config/db');
const { convertToCSV } = require('../../utils/csvExporter');

/**
 * Export Test Execution Report
 */
exports.exportTestExecutions = async (req, res) => {
  const result = await pool.query(`
    SELECT
      te.id,
      tc.title AS test_case,
      te.status,
      te.execution_notes,
      te.executed_at,
      b.title AS linked_bug
    FROM test_executions te
    LEFT JOIN test_cases tc ON tc.id = te.test_case_id
    LEFT JOIN bugs b ON b.id = te.linked_bug_id
    ORDER BY te.executed_at DESC
  `);

  const csv = convertToCSV(result.rows);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="test-executions-report.csv"'
  );

  res.send(csv);
};

/**
 * Export Bug Report
 */
exports.exportBugs = async (req, res) => {
  const result = await pool.query(`
    SELECT
      id,
      title,
      severity,
      priority,
      status,
      project,
      created_at
    FROM bugs
    ORDER BY created_at DESC
  `);

  const csv = convertToCSV(result.rows);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="bug-report.csv"'
  );

  res.send(csv);
};

/**
 * Export Dashboard Summary
 */
exports.exportDashboardSummary = async (req, res) => {
  const [
    testCases,
    executions,
    passed,
    bugs,
    openBugs
  ] = await Promise.all([
    pool.query('SELECT COUNT(*) FROM test_cases'),
    pool.query('SELECT COUNT(*) FROM test_executions'),
    pool.query("SELECT COUNT(*) FROM test_executions WHERE status='PASS'"),
    pool.query('SELECT COUNT(*) FROM bugs'),
    pool.query("SELECT COUNT(*) FROM bugs WHERE status!='CLOSED'")
  ]);

  const totalExecutions = Number(executions.rows[0].count);
  const passedExecutions = Number(passed.rows[0].count);
  const passPercentage =
    totalExecutions === 0
      ? 0
      : ((passedExecutions / totalExecutions) * 100).toFixed(2);

  const data = [
    {
      total_test_cases: testCases.rows[0].count,
      total_executions: totalExecutions,
      pass_percentage: `${passPercentage}%`,
      total_bugs: bugs.rows[0].count,
      open_bugs: openBugs.rows[0].count
    }
  ];

  const csv = convertToCSV(data);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="dashboard-summary.csv"'
  );

  res.send(csv);
};
