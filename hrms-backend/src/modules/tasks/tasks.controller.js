const pool = require("../../config/db");

/* ================= CREATE TASK ================= */
exports.createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            due_date,
            assigned_to,
            workspace_id
        } = req.body;

        if (!title || !workspace_id) {
            return res.status(400).json({ error: "Title & workspace required" });
        }

        const result = await pool.query(
            `
      INSERT INTO tasks
      (title, description, priority, due_date, status, created_by, assigned_to, workspace_id)
      VALUES ($1,$2,$3,$4,'TODO',$5,$6,$7)
      RETURNING *
      `,
            [
                title,
                description || null,
                priority || "MEDIUM",
                due_date || null,
                req.user.id,
                assigned_to || null,
                workspace_id
            ]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Create Task Error:", err);
        res.status(500).json({ error: "Create failed" });
    }
};

/* ================= TASK BOARD ================= */
exports.getTaskBoard = async (req, res) => {
    try {
        const workspace = req.query.workspace;

        if (!workspace) {
            return res.status(400).json({ error: "Workspace required" });
        }

        const result = await pool.query(
            `
      SELECT
        t.*,
        e1.full_name AS assigned_to_name,
        e2.full_name AS created_by_name
      FROM tasks t
      LEFT JOIN employees e1 ON e1.id = t.assigned_to
      LEFT JOIN employees e2 ON e2.user_id = t.created_by
      WHERE t.workspace_id = $1
      ORDER BY t.created_at DESC
      `,
            [workspace]
        );

        res.json(result.rows);
    } catch (err) {
        console.error("Task Board SQL Error:", err);
        res.status(500).json({ error: "Failed to load task board" });
    }
};

/* ================= UPDATE STATUS ================= */
exports.updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        await pool.query(
            `UPDATE tasks SET status=$1, updated_at=NOW() WHERE id=$2`,
            [status, taskId]
        );

        res.json({ success: true });
    } catch (err) {
        console.error("Update Status Error:", err);
        res.status(500).json({ error: "Status update failed" });
    }
};
