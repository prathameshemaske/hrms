const pool = require('../../config/db');

/* Link Bug to Test Case */
exports.linkBugToTestCase = async (req, res) => {
  try {
    const { testCaseId, bugId } = req.body;

    if (!testCaseId || !bugId) {
      return res.status(400).json({
        message: 'testCaseId and bugId are required',
      });
    }

    await pool.query(
      `INSERT INTO test_case_bugs (test_case_id, bug_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [testCaseId, bugId]
    );

    res.json({ message: 'Bug linked to test case' });
  } catch (error) {
    console.error('Link Bug Error:', error);
    res.status(500).json({ message: 'Failed to link bug' });
  }
};

/* Get Bugs linked to a Test Case */
exports.getBugsByTestCase = async (req, res) => {
  try {
    const { testCaseId } = req.params;

    const result = await pool.query(
      `SELECT b.*
       FROM bugs b
       JOIN test_case_bugs tcb ON tcb.bug_id = b.id
       WHERE tcb.test_case_id = $1`,
      [testCaseId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch linked bugs' });
  }
};

/* ✅ NEW: Get existing OPEN bug for a Test Case */
exports.getOpenBugForTestCase = async (req, res) => {
  try {
    const { testCaseId } = req.params;

    const result = await pool.query(
      `SELECT b.*
       FROM bugs b
       JOIN test_case_bugs tcb ON tcb.bug_id = b.id
       WHERE tcb.test_case_id = $1
         AND b.status = 'OPEN'
       LIMIT 1`,
      [testCaseId]
    );

    if (result.rows.length === 0) {
      return res.json(null);
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Check Open Bug Error:', error);
    res.status(500).json({ message: 'Failed to check open bug' });
  }
};
