-- ==========================================
-- HRMS PLATFORM - COMPLETE BASE SCHEMA
-- ==========================================

-- 1. USERS (Authentication)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'EMPLOYEE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. EMPLOYEES (Core Data)
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    mobile VARCHAR(20),
    dob DATE,
    gender VARCHAR(20),
    pan VARCHAR(20),
    department VARCHAR(100),
    designation VARCHAR(100),
    manager_id INT REFERENCES employees(id),
    joining_date DATE,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    bank_account VARCHAR(50),
    ifsc VARCHAR(20),
    tax_regime VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TEST MANAGEMENT
CREATE TABLE IF NOT EXISTS test_suites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS test_cases (
    id SERIAL PRIMARY KEY,
    test_suite_id INT REFERENCES test_suites(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20),
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS test_executions (
    id SERIAL PRIMARY KEY,
    test_case_id INT REFERENCES test_cases(id) ON DELETE CASCADE,
    status VARCHAR(20), -- PASS, FAIL, BLOCKED
    executed_by INT REFERENCES users(id),
    comments TEXT,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. LEAVES
CREATE TABLE IF NOT EXISTS leaves (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    leave_type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'PENDING',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. ATTENDANCE
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    date DATE DEFAULT CURRENT_DATE,
    check_in TIMESTAMP,
    check_out TIMESTAMP,
    status VARCHAR(20), -- PRESENT, ABSENT, LATE
    UNIQUE(employee_id, date)
);

-- 6. TASKS
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'TODO',
    assigned_to INT REFERENCES employees(id),
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. PAYROLL (From payroll.sql)
CREATE TABLE IF NOT EXISTS employee_salary (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    basic NUMERIC(12,2) NOT NULL,
    hra NUMERIC(12,2) NOT NULL,
    special_allowance NUMERIC(12,2) NOT NULL,
    pf_applicable BOOLEAN DEFAULT true,
    professional_tax NUMERIC(10,2) DEFAULT 200,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payroll_runs (
    id SERIAL PRIMARY KEY,
    month INT NOT NULL,
    year INT NOT NULL,
    run_by INT REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'DRAFT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(month, year)
);

CREATE TABLE IF NOT EXISTS payslips (
    id SERIAL PRIMARY KEY,
    payroll_run_id INT REFERENCES payroll_runs(id),
    employee_id INT REFERENCES employees(id),
    gross_salary NUMERIC(12,2),
    pf NUMERIC(12,2),
    professional_tax NUMERIC(12,2),
    tds NUMERIC(12,2),
    net_salary NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(payroll_run_id, employee_id)
);

-- SEED DATA (To allow login)
INSERT INTO users (email, password, role) 
VALUES ('admin@example.com', 'admin123', 'ADMIN')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (email, password, role) 
VALUES ('employee@example.com', 'employee123', 'EMPLOYEE')
ON CONFLICT (email) DO NOTHING;
