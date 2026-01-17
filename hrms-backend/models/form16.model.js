import db from "../config/db.js";

export const getForm16Data = async (employeeId, year) => {
    const salary = await db.query(`
    SELECT
      SUM(gross_salary) as gross,
      SUM(pf) as pf,
      SUM(professional_tax) as pt,
      SUM(tds) as tds,
      SUM(net_salary) as net
    FROM payroll
    WHERE employee_id = $1 AND year = $2
  `, [employeeId, year]);

    return salary.rows[0];
};
