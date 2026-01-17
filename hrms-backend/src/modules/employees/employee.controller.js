const pool = require('../../config/db');

/* =========================
   Get all employees
========================= */
exports.getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         id,
         full_name,
         department,
         designation,
         manager_id,
         joining_date,
         status
       FROM employees
       ORDER BY id DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Get Employees Error:', err);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
};

/* =========================
   Create employee
========================= */
exports.createEmployee = async (req, res) => {
  try {
    const {
      full_name,
      department,
      designation,
      manager_id,
      joining_date,
    } = req.body;

    if (!full_name) {
      return res.status(400).json({ message: 'Full name is required' });
    }

    await pool.query(
      `INSERT INTO employees
       (full_name, department, designation, manager_id, joining_date, status)
       VALUES ($1,$2,$3,$4,$5,'ACTIVE')`,
      [
        full_name,
        department || null,
        designation || null,
        manager_id || null,
        joining_date || null,
      ]
    );

    res.status(201).json({ message: 'Employee created successfully' });
  } catch (err) {
    console.error('Create Employee Error:', err);
    res.status(500).json({ message: 'Internal server error while creating employee' });
  }
};

/* =========================
   Get employee by ID
========================= */
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM employees
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get Employee Error:', err);
    res.status(500).json({ message: 'Failed to fetch employee' });
  }
};

/* =========================
   Update employee status
========================= */
exports.updateEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['ACTIVE', 'INACTIVE'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await pool.query(
      `UPDATE employees
       SET status = $1
       WHERE id = $2`,
      [status, id]
    );

    res.json({ message: 'Employee status updated' });
  } catch (err) {
    console.error('Update Status Error:', err);
    res.status(500).json({ message: 'Failed to update status' });
  }
};

/* =========================
   Update employee (MASTER EDIT)
========================= */
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // convert empty strings to NULL (important for DATE fields)
    const clean = (v) => (v === "" ? null : v);

    const full_name = clean(req.body.full_name);
    const email = clean(req.body.email);
    const mobile = clean(req.body.mobile);
    const dob = clean(req.body.dob);
    const gender = clean(req.body.gender);
    const pan = clean(req.body.pan);
    const department = clean(req.body.department);
    const designation = clean(req.body.designation);
    const joining_date = clean(req.body.joining_date);
    const bank_account = clean(req.body.bank_account);
    const ifsc = clean(req.body.ifsc);
    const tax_regime = clean(req.body.tax_regime);

    await pool.query(
      `
      UPDATE employees SET
        full_name = $1,
        email = $2,
        mobile = $3,
        dob = $4,
        gender = $5,
        pan = $6,
        department = $7,
        designation = $8,
        joining_date = $9,
        bank_account = $10,
        ifsc = $11,
        tax_regime = $12,
        updated_at = NOW()
      WHERE id = $13
      `,
      [
        full_name,
        email,
        mobile,
        dob,
        gender,
        pan,
        department,
        designation,
        joining_date,
        bank_account,
        ifsc,
        tax_regime,
        id
      ]
    );

    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    console.error('Update Employee Error:', err);
    res.status(500).json({ message: err.message || 'Failed to update employee' });
  }
};
