const pool = require('../../config/db');

/* Create Test Case */
exports.createTestCase = async (req, res) => {
  try {
    const {
      suite_id,
      title,
      precondition,
      steps,
      expected_result,
      priority,
    } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    await pool.query(
      `INSERT INTO test_cases
       (suite_id, title, precondition, steps, expected_result, priority, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        suite_id || null,
        title,
        precondition,
        steps,
        expected_result,
        priority || 'MEDIUM',
        req.user.id,
      ]
    );

    res.status(201).json({ message: 'Test case created successfully' });
  } catch (error) {
    console.error('Create Test Case Error:', error);
    res.status(500).json({ message: 'Failed to create test case' });
  }
};

/* Get All Test Cases */
exports.getAllTestCases = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM test_cases ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch test cases' });
  }
};

/* Get Test Case By ID */
exports.getTestCaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM test_cases WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Test case not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get Test Case By ID Error:', error);
    res.status(500).json({ message: 'Failed to fetch test case' });
  }
};
