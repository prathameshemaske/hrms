const pool = require('../../config/db');

/* Get All Components */
exports.getAllComponents = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM bug_components ORDER BY name'
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch components' });
    }
};
