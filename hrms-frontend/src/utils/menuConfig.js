export const MENU_ITEMS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    roles: ["ADMIN", "QA", "EMPLOYEE", "HR"],
  },

  /* ================= BUG TRACKER ================= */
  {
    label: "Bug Tracker",
    path: "/bugs",
    roles: ["ADMIN", "QA"],
  },

  /* ============ TEST MANAGEMENT ============ */
  {
    label: "Test Management",
    path: "/test-cases",
    roles: ["ADMIN", "QA"],
  },
  {
    label: "Test Suites",
    path: "/test-suites",
    roles: ["ADMIN", "QA"],
  },

  /* ================= REPORTS ================= */
  {
    label: "Reports",
    path: "/dashboard", // placeholder until reports module exists
    roles: ["ADMIN", "QA", "EMPLOYEE", "HR"],
  },

  /* ================= EMPLOYEES ================= */
  {
    label: "Employees",
    path: "/employees",
    roles: ["ADMIN", "HR"],
  },

  /* ================= LEAVES ================= */
  {
    label: "Apply Leave",
    path: "/apply-leave",
    roles: ["EMPLOYEE"],
  },
  {
    label: "My Leaves",
    path: "/my-leaves",
    roles: ["EMPLOYEE"],
  },
  {
    label: "Leave Approval",
    path: "/leave-approval",
    roles: ["ADMIN", "HR"],
  },

  /* ================= HOLIDAYS ================= */
  {
    label: "Holidays",
    path: "/holidays",
    roles: ["ADMIN", "QA", "EMPLOYEE", "HR"],
  },

  /* ================= ATTENDANCE ================= */
  {
    label: "My Attendance",
    path: "/attendance",
    roles: ["ADMIN", "QA", "EMPLOYEE", "HR"],
  },
  {
    label: "Mark Attendance",
    path: "/attendance/mark",
    roles: ["ADMIN", "HR"],
  },

  {
    label: "Payroll",
    path: "/payroll",
    roles: ["ADMIN", "HR"],
  },
  {
    label: "My Payslips",
    path: "/my-payslips",
    roles: ["EMPLOYEE"],
  },

  {
    label: "Tasks",
    path: "/tasks",
    roles: ["ADMIN", "QA", "EMPLOYEE", "HR"],
  },

];
