-- ===============================
-- WORKSPACES (Asana Projects)
-- ===============================
CREATE TABLE task_workspaces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- TASKS
-- ===============================
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    workspace_id INT REFERENCES task_workspaces(id) ON DELETE CASCADE,

    status VARCHAR(30) NOT NULL DEFAULT 'TODO',
    priority VARCHAR(20) DEFAULT 'MEDIUM',

    assigned_to INT REFERENCES employees(id),
    created_by INT REFERENCES employees(id),

    due_date DATE,

    related_bug_id INT,
    related_test_case_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- TASK COMMENTS
-- ===============================
CREATE TABLE task_comments (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    user_id INT REFERENCES employees(id),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
