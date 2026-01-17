import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

/* Auth */
import Login from "./pages/auth/Login";

/* Layout */
import ProtectedLayout from "./components/layout/ProtectedLayout";

/* Dashboard */
import Dashboard from "./pages/dashboard/Dashboard";

/* Employees */
import EmployeeList from "./pages/employees/EmployeeList";
import EmployeeCreate from "./pages/employees/EmployeeCreate";
import EmployeeDetails from "./pages/employees/EmployeeDetails";

/* Test Management */
import TestSuiteList from "./pages/testcases/TestSuiteList";
import TestSuiteCreate from "./pages/testcases/TestSuiteCreate";
import TestSuiteDetails from "./pages/testcases/TestSuiteDetails";
import TestCaseList from "./pages/testcases/TestCaseList";
import TestCaseCreate from "./pages/testcases/TestCaseCreate";
import TestCaseDetails from "./pages/testcases/TestCaseDetails";

/* Leaves */
import ApplyLeave from "./pages/leaves/ApplyLeave";
import MyLeaves from "./pages/leaves/MyLeaves";
import LeaveApproval from "./pages/leaves/LeaveApproval";

/* Holidays */
import HolidayList from "./pages/holidays/HolidayList";

/* Attendance */
import MyAttendance from "./pages/attendance/MyAttendance";
import MarkAttendance from "./pages/attendance/MarkAttendance";

/* Bugs */
import BugList from "./pages/bugs/BugList";
import BugCreate from "./pages/bugs/BugCreate";
import BugDetails from "./pages/bugs/BugDetails";

/* Payroll */
import PayrollDashboard from "./pages/payroll/PayrollDashboard";
import MyPayslips from "./pages/payroll/MyPayslips";

/* Tasks */
import TaskBoard from "./pages/tasks/TaskBoard";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* All logged-in pages must be inside layout */}
      <Route
        element={user ? <ProtectedLayout /> : <Navigate to="/login" />}
      >
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Employees */}
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/create" element={<EmployeeCreate />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />

        {/* Test Management */}
        <Route path="/test-suites" element={<TestSuiteList />} />
        <Route path="/test-suites/create" element={<TestSuiteCreate />} />
        <Route path="/test-suites/:id" element={<TestSuiteDetails />} />
        <Route path="/test-cases" element={<TestCaseList />} />
        <Route path="/test-cases/create" element={<TestCaseCreate />} />
        <Route path="/test-cases/:id" element={<TestCaseDetails />} />

        {/* Bugs */}
        <Route path="/bugs" element={<BugList />} />
        <Route path="/bugs/create" element={<BugCreate />} />
        <Route path="/bugs/:id" element={<BugDetails />} />

        {/* Leaves */}
        <Route path="/apply-leave" element={<ApplyLeave />} />
        <Route path="/my-leaves" element={<MyLeaves />} />
        <Route path="/leave-approval" element={<LeaveApproval />} />

        {/* Holidays */}
        <Route path="/holidays" element={<HolidayList />} />

        {/* Attendance */}
        <Route path="/attendance" element={<MyAttendance />} />
        <Route path="/attendance/mark" element={<MarkAttendance />} />

        {/* Payroll */}
        <Route path="/payroll" element={<PayrollDashboard />} />
        <Route path="/my-payslips" element={<MyPayslips />} />

        {/* Tasks */}
        <Route path="/tasks" element={<TaskBoard />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
