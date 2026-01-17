const pool = require('../../config/db');
const { isValidTransition } = require('./bugStatus.rules');

/* =========================
   Create Bug
========================= */
const createBug = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      severity,
      project,
      component_id,
    } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // ✅ Enforce required fields
    if (!priority || !severity || !component_id) {
      return res.status(400).json({
        message: 'Priority, Severity and Component are required',
      });
    }

    const result = await pool.query(
      `INSERT INTO bugs
       (title, description, priority, severity, project, component_id, reported_by, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'OPEN')
       RETURNING id`,
      [
        title,
        description,
        priority,
        severity,
        project || 'HRMS',
        component_id,
        req.user.id,
      ]
    );

    res.status(201).json({
      message: 'Bug created successfully',
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error('Create Bug Error:', error);
    res.status(500).json({ message: 'Bug creation failed' });
  }
};

/* =========================
   Get All Bugs (Search / Filter / Sort)
========================= */
/* =========================
   Get All Bugs (Search / Filter / Sort) – FIXED
========================= */
const getAllBugs = async (req, res) => {
  try {
    const {
      search,
      status,
      priority,
      severity,
      componentId,
      labelId,
      sortBy = 'created_at',
      order = 'DESC',
    } = req.query;

    let query = `
      SELECT DISTINCT
        b.*,
        c.name AS component_name,
        u.email AS assigned_to_email
      FROM bugs b
      LEFT JOIN bug_components c ON c.id = b.component_id
      LEFT JOIN users u ON u.id = b.assigned_to
      LEFT JOIN bug_label_map blm ON blm.bug_id = b.id
      WHERE 1=1
    `;

    const values = [];

    /* 🔍 Search by title or ID */
    if (search) {
      values.push(`%${search}%`);
      query += ` AND (b.title ILIKE $${values.length} OR CAST(b.id AS TEXT) ILIKE $${values.length})`;
    }

    /* 🎯 Filters */
    if (status) {
      values.push(status);
      query += ` AND b.status = $${values.length}`;
    }

    if (priority) {
      values.push(priority);
      query += ` AND b.priority = $${values.length}`;
    }

    if (severity) {
      values.push(severity);
      query += ` AND b.severity = $${values.length}`;
    }

    if (componentId) {
      values.push(componentId);
      query += ` AND b.component_id = $${values.length}`;
    }

    if (labelId) {
      values.push(labelId);
      query += ` AND blm.label_id = $${values.length}`;
    }

    /* ↕️ Safe sorting */
    const allowedSortFields = ['created_at', 'priority', 'severity', 'status'];
    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : 'created_at';

    const safeOrder = order === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY b.${safeSortBy} ${safeOrder}`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Get Bugs Error:', error);
    res.status(500).json({ message: 'Failed to fetch bugs' });
  }
};



/* =========================
   Get Bug By ID
========================= */
const getBugById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        b.*,
        c.name AS component_name
       FROM bugs b
       LEFT JOIN bug_components c ON c.id = b.component_id
       WHERE b.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get Bug Error:', error);
    res.status(500).json({ message: 'Failed to fetch bug' });
  }
};

/* =========================
   Update Bug Status (STRICT)
========================= */
const updateBugStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status: newStatus } = req.body;

    if (!newStatus) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const bugResult = await pool.query(
      'SELECT status FROM bugs WHERE id = $1',
      [id]
    );

    if (bugResult.rows.length === 0) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    const currentStatus = bugResult.rows[0].status;

    if (!isValidTransition(currentStatus, newStatus)) {
      return res.status(400).json({
        message: `Invalid status transition: ${currentStatus} → ${newStatus}`,
      });
    }

    await pool.query(
      `UPDATE bugs
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [newStatus, id]
    );

    res.json({
      message: `Bug status updated: ${currentStatus} → ${newStatus}`,
    });
  } catch (error) {
    console.error('Update Bug Status Error:', error);
    res.status(500).json({ message: 'Failed to update bug status' });
  }
};

/* =========================
   Auto Close Bug
========================= */
const closeBug = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `UPDATE bugs
       SET status = 'CLOSED',
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [id]
    );

    res.json({ message: 'Bug closed successfully' });
  } catch (error) {
    console.error('Close Bug Error:', error);
    res.status(500).json({ message: 'Failed to close bug' });
  }
};

/* =========================
   Mark Bug as Duplicate
========================= */

const markBugAsDuplicate = async (req, res) => {
  try {
    const { id } = req.params;
    const { duplicateOfBugId, reason } = req.body;

    if (id === duplicateOfBugId) {
      return res.status(400).json({
        message: 'Bug cannot be duplicate of itself',
      });
    }

    // Check original bug exists
    const originalBug = await pool.query(
      'SELECT id FROM bugs WHERE id = $1',
      [duplicateOfBugId]
    );

    if (originalBug.rows.length === 0) {
      return res.status(404).json({ message: 'Original bug not found' });
    }

    await pool.query(
      `UPDATE bugs
       SET status = 'DUPLICATE',
           duplicate_of_bug_id = $1,
           duplicate_reason = $2,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3`,
      [duplicateOfBugId, reason || null, id]
    );

    res.json({ message: 'Bug marked as duplicate' });
  } catch (error) {
    console.error('Mark Duplicate Error:', error);
    res.status(500).json({ message: 'Failed to mark bug as duplicate' });
  }
};


/* =========================
   EXPORTS
========================= */
module.exports = {
  createBug,
  getAllBugs,
  getBugById,
  updateBugStatus,
  closeBug,
  markBugAsDuplicate, // 👈 ADD
};


