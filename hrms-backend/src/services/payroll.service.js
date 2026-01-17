import db from "../config/db.js";

export const runPayroll = async (month, year, runBy) => {
    const payroll = await db.query(
        `INSERT INTO payroll_runs(month, year, run_by)
     VALUES($1,$2,$3) RETURNING *`,
        [month, year, runBy]
    );

    const employees = await db.query(`
    SELECT e.id, s.basic, s.hra, s.special_allowance, s.pf_applicable, s.professional_tax
    FROM employees e
    JOIN employee_salary s ON s.employee_id = e.id
    WHERE e.status = 'ACTIVE'
  `);

    for (const emp of employees.rows) {
        const gross =
            Number(emp.basic) +
            Number(emp.hra) +
            Number(emp.special_allowance);

        const pf = emp.pf_applicable ? emp.basic * 0.12 : 0;
        const pt = emp.professional_tax;

        // Simplified TDS: 5% above 2.5L yearly
        const yearly = gross * 12;
        const tds = yearly > 250000 ? (yearly * 0.05) / 12 : 0;

        const net = gross - pf - pt - tds;

        await db.query(
            `INSERT INTO payslips
       (payroll_run_id, employee_id, gross_salary, pf, professional_tax, tds, net_salary)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
            [payroll.rows[0].id, emp.id, gross, pf, pt, tds, net]
        );
    }

    return payroll.rows[0];
};

export const lockPayroll = async (month, year) => {
    await db.query(
        `UPDATE payroll_runs SET status='LOCKED'
     WHERE month=$1 AND year=$2`,
        [month, year]
    );
};

export const getPayslips = async (month, year) => {
    return db.query(`
    SELECT p.*, e.full_name
    FROM payslips p
    JOIN payroll_runs r ON r.id = p.payroll_run_id
    JOIN employees e ON e.id = p.employee_id
    WHERE r.month=$1 AND r.year=$2
  `, [month, year]);
};

export const generateForm16 = async (employeeId, fy) => {
    const data = await db.query(`
    SELECT SUM(gross_salary) income, SUM(tds) tax
    FROM payslips
    WHERE employee_id=$1
  `, [employeeId]);

    await db.query(
        `INSERT INTO form16(employee_id, financial_year, total_income, total_tds)
     VALUES($1,$2,$3,$4)`,
        [employeeId, fy, data.rows[0].income, data.rows[0].tax]
    );
};
