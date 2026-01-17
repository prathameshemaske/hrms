const pool = require("../../config/db");

exports.getWorkspaces = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT
        workspace_id AS id,
        'Workspace ' || workspace_id AS name
      FROM tasks
      WHERE workspace_id IS NOT NULL
      ORDER BY workspace_id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Workspace error", err);
    res.status(500).json({ error: "Failed to load workspaces" });
  }
};
