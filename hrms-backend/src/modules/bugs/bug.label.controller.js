const pool = require('../../config/db');

/* Get all labels */
exports.getAllLabels = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM bug_labels ORDER BY name'
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch labels' });
    }
};

/* Add labels to a bug */
exports.addLabelsToBug = async (req, res) => {
    try {
        const { bugId } = req.params;
        const { labelIds } = req.body; // array

        if (!Array.isArray(labelIds)) {
            return res.status(400).json({ message: 'labelIds must be an array' });
        }

        for (const labelId of labelIds) {
            await pool.query(
                `INSERT INTO bug_label_map (bug_id, label_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
                [bugId, labelId]
            );
        }

        res.json({ message: 'Labels added successfully' });
    } catch (error) {
        console.error('Add Labels Error:', error);
        res.status(500).json({ message: 'Failed to add labels' });
    }
};

/* Get labels for a bug */
exports.getLabelsByBug = async (req, res) => {
    try {
        const { bugId } = req.params;

        const result = await pool.query(
            `SELECT l.*
       FROM bug_labels l
       JOIN bug_label_map blm ON blm.label_id = l.id
       WHERE blm.bug_id = $1`,
            [bugId]
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bug labels' });
    }
};

/* Remove label from bug */
exports.removeLabelFromBug = async (req, res) => {
    try {
        const { bugId, labelId } = req.params;

        await pool.query(
            `DELETE FROM bug_label_map
       WHERE bug_id = $1 AND label_id = $2`,
            [bugId, labelId]
        );

        res.json({ message: 'Label removed from bug' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove label' });
    }
};
