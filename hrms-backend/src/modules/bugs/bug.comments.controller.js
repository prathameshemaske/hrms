const pool = require('../../config/db');

/* Add Comment */
exports.addComment = async (req, res) => {
  try {
    const { bugId } = req.params;
    const { comment } = req.body;

    await pool.query(
      `INSERT INTO bug_comments (bug_id, comment, commented_by)
       VALUES ($1, $2, $3)`,
      [bugId, comment, req.user.id]
    );

    res.json({ message: 'Comment added' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment' });
  }
};

/* Get Comments */
exports.getCommentsByBug = async (req, res) => {
  try {
    const { bugId } = req.params;

    const result = await pool.query(
      'SELECT * FROM bug_comments WHERE bug_id=$1 ORDER BY created_at DESC',
      [bugId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};
