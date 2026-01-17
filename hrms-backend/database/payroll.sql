-- ===============================
-- EMPLOYEE SALARY STRUCTURE
-- ===============================
CREATE TABLE employee_salary (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    basic NUMERIC(12,2) NOT NULL,
    hra NUMERIC(12,2) NOT NULL,
    special_allowance NUMERIC(12,2) NOT NULL,
    pf_applicable BOOLEAN DEFAULT true,
    professional_tax NUMERIC(10,2) DEFAULT 200,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- PAYROLL RUN
-- ===============================
CREATE TABLE payroll_runs (
    id SERIAL PRIMARY KEY,
    month INT NOT NULL,
    year INT NOT NULL,
    run_by INT REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT / LOCKED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(month, year)
);

-- ===============================
-- PAYSLIPS
-- ===============================
CREATE TABLE payslips (
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

-- ===============================
-- FORM 16 (TDS RECORD)
-- ===============================
CREATE TABLE form16 (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    financial_year VARCHAR(20),
    total_income NUMERIC(12,2),
    total_tds NUMERIC(12,2),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
