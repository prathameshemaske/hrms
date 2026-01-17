const pool = require('../../config/db');

exports.bulkExecuteTestSuite = async (req, res) => {
  try {
    const { testSuiteId, status, executionNotes, executedBy } = req.body;

    if (!testSuiteId || !status || !executedBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Get all test cases in the suite
    const testCases = await pool.query(
      `SELECT id FROM test_cases WHERE test_suite_id = $1`,
      [testSuiteId]
    );

    if (testCases.rows.length === 0) {
      return res.status(404).json({ message: 'No test cases found in suite' });
    }

    // Insert execution for each test case
    for (const tc of testCases.rows) {
      await pool.query(
        `INSERT INTO test_executions
         (test_case_id, executed_by, status, execution_notes)
         VALUES ($1, $2, $3, $4)`,
        [tc.id, executedBy, status, executionNotes || 'Bulk execution']
      );
    }

    res.json({
      message: 'Bulk execution completed',
      totalExecuted: testCases.rows.length,
    });
  } catch (error) {
    console.error('Bulk Execute Error:', error);
    res.status(500).json({ message: 'Bulk execution failed' });
  }
};
