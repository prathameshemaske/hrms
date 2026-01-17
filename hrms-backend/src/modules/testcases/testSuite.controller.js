const pool = require('../../config/db');

/* Create Test Suite */
const createTestSuite = async (req, res) => {
  try {
    const { name, description } = req.body;

    const result = await pool.query(
      `INSERT INTO test_suites (name, description, created_by)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, description || '', req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create Test Suite Error:', error);
    res.status(500).json({ message: 'Failed to create test suite' });
  }
};

/* Get All Test Suites */
const getAllTestSuites = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM test_suites ORDER BY created_at DESC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get All Test Suites Error:', error);
    res.status(500).json({ message: 'Failed to fetch test suites' });
  }
};

/* Get Test Suite By ID */
const getTestSuiteById = async (req, res) => {
  try {
    const { id } = req.params;

    const suiteResult = await pool.query(
      'SELECT * FROM test_suites WHERE id = $1',
      [id]
    );

    if (suiteResult.rows.length === 0) {
      return res.status(404).json({ message: 'Test suite not found' });
    }

    const testCasesResult = await pool.query(
      'SELECT * FROM test_cases WHERE test_suite_id = $1',
      [id]
    );

    res.json({
      ...suiteResult.rows[0],
      test_cases: testCasesResult.rows || [],
    });
  } catch (error) {
    console.error('Get Test Suite Error:', error);
    res.status(500).json({ message: 'Failed to fetch test suite' });
  }
};

/* ✅ EXPORTS — THIS IS CRITICAL */
module.exports = {
  createTestSuite,
  getAllTestSuites,
  getTestSuiteById,
};
