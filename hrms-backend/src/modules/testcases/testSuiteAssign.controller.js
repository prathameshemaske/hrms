const pool = require('../../config/db');

/* Assign Test Cases to Test Suite */
exports.assignTestCasesToSuite = async (req, res) => {
  try {
    const { testSuiteId, testCaseIds } = req.body;

    if (!testSuiteId || !Array.isArray(testCaseIds)) {
      return res.status(400).json({ message: 'Invalid payload' });
    }

    await pool.query(
      `UPDATE test_cases
       SET test_suite_id = $1
       WHERE id = ANY($2::int[])`,
      [testSuiteId, testCaseIds]
    );

    res.json({ message: 'Test cases assigned to suite' });
  } catch (error) {
    console.error('Assign Test Cases Error:', error);
    res.status(500).json({ message: 'Failed to assign test cases' });
  }
};
