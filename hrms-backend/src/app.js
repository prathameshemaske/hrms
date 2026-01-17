const express = require('express');
const app = express();
const cors = require('cors');

// =======================
// Middleware
// =======================
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('HRMS Backend is running');
});

// =======================
// Routes
// =======================

// Auth & HRMS
app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/employees', require('./modules/employees/employee.routes'));
app.use('/api/leaves', require('./modules/leaves/leave.routes'));

// Bugs
app.use('/api/bugs', require('./modules/bugs/bug.routes'));

// Test Management
app.use('/api/test-suites', require('./modules/testcases/testSuite.routes'));
app.use('/api/test-cases', require('./modules/testcases/testCase.routes'));
app.use('/api/test-executions', require('./modules/testcases/testExecution.routes'));
app.use('/api/testcase-bugs', require('./modules/testcases/testcase.bug.routes'));


// Reports (mounted ONCE, clean structure)
app.use('/api/reports', require('./modules/reports/reports.routes'));
app.use('/api/reports/export', require('./modules/reports/reports.export.routes'));
app.use('/api/reports/dashboard', require('./modules/reports/execution.dashboard.routes'));

// Holidays
app.use('/api/holidays', require('./modules/holidays/holiday.routes'));

// Attendance
app.use('/api/attendance', require('./modules/attendance/attendance.routes'));

// =======================
// Static uploads
// =======================
app.use('/uploads', express.static('uploads'));

// =========================
//  🔥 EXECUTION SUMMARY (TEMP DIRECT FIX)
// ========================= */

app.get('/api/reports/execution-summary', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE status = 'PASS') AS pass,
        COUNT(*) FILTER (WHERE status = 'FAIL') AS fail,
        COUNT(*) FILTER (WHERE status = 'BLOCKED') AS blocked,
        COUNT(*) AS total
      FROM test_executions
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Execution Summary Error:', error);
    res.status(500).json({ message: 'Failed to fetch execution summary' });
  }
});

app.use(
  '/api/test-suites',
  require('./modules/testcases/testSuiteExecution.routes')
);

app.use(
  '/api/test-suites',
  require('./modules/testcases/testSuiteAssign.routes')
);

app.use('/api/test-suites', require('./modules/testcases/testSuite.routes'));

app.use(
  '/api/reports',
  require('./modules/reports/hr.dashboard.routes')
);

app.use('/api/tasks', require('./modules/tasks/tasks.routes'));


app.use("/api/tasks/workspaces", require("./modules/tasks/workspaces.routes"));


module.exports = app;
