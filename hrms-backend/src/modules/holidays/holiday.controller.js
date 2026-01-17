const pool = require('../../config/db');

/* Get holidays (year-wise optional) */
exports.getHolidays = async (req, res) => {
    try {
        const { year } = req.query;

        let query = `SELECT * FROM holidays`;
        const values = [];

        if (year) {
            query += ` WHERE year = $1`;
            values.push(year);
        }

        query += ` ORDER BY holiday_date`;

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch holidays' });
    }
};

/* Create holiday (ADMIN) */
exports.createHoliday = async (req, res) => {
    try {
        const { name, holiday_date } = req.body;

        if (!name || !holiday_date) {
            return res.status(400).json({ message: 'Required fields missing' });
        }

        const year = new Date(holiday_date).getFullYear();

        await pool.query(
            `INSERT INTO holidays (name, holiday_date, year)
       VALUES ($1,$2,$3)`,
            [name, holiday_date, year]
        );

        res.status(201).json({ message: 'Holiday added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add holiday' });
    }
};

/* Delete holiday (ADMIN) */
exports.deleteHoliday = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(`DELETE FROM holidays WHERE id = $1`, [id]);
        res.json({ message: 'Holiday deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete holiday' });
    }
};
