const pool = require('../../config/db');

/* Upload Attachment */
exports.uploadAttachment = async (req, res) => {
  try {
    const { bugId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    await pool.query(
      `INSERT INTO bug_attachments (bug_id, file_path)
       VALUES ($1, $2)`,
      [bugId, req.file.path]
    );

    res.json({ message: 'Attachment uploaded' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload attachment' });
  }
};

/* Get Attachments */
exports.getBugAttachments = async (req, res) => {
  try {
    const { bugId } = req.params;

    const result = await pool.query(
      'SELECT * FROM bug_attachments WHERE bug_id=$1',
      [bugId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attachments' });
  }
};
