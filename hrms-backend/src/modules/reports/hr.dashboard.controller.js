const db = require("../../config/db");

exports.getHrDashboardMetrics = async (req, res) => {
    try {
        const totalEmployees = await db.query(
            "SELECT COUNT(*) FROM employees"
        );

        const activeEmployees = await db.query(
            "SELECT COUNT(*) FROM employees WHERE status = 'ACTIVE'"
        );

        const inactiveEmployees = await db.query(
            "SELECT COUNT(*) FROM employees WHERE status = 'INACTIVE'"
        );

        const presentToday = await db.query(`
      SELECT COUNT(DISTINCT employee_id)
      FROM attendance
      WHERE attendance_date = CURRENT_DATE
      AND status = 'PRESENT'
    `);

        const onLeaveToday = await db.query(`
      SELECT COUNT(DISTINCT employee_id)
      FROM leaves
      WHERE CURRENT_DATE BETWEEN start_date AND end_date
      AND status = 'APPROVED'
    `);

        res.json({
            totalEmployees: Number(totalEmployees.rows[0].count),
            activeEmployees: Number(activeEmployees.rows[0].count),
            inactiveEmployees: Number(inactiveEmployees.rows[0].count),
            presentToday: Number(presentToday.rows[0].count),
            onLeaveToday: Number(onLeaveToday.rows[0].count),
        });
    } catch (err) {
        console.error("HR Dashboard Error:", err);
        res.status(500).json({ message: "Failed to load HR dashboard" });
    }
};
