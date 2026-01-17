import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import TestSuiteDetails from '../pages/testcases/TestSuiteDetails';
import BugReport from "../pages/bug-report/BugReport";
import TestManagement from "../pages/test-management/TestManagement";
import Reports from "../pages/reports/Reports";
import MyAttendance from "../pages/attendance/MyAttendance";

import ProtectedLayout from '../components/layout/ProtectedLayout';
import useAuth from '../hooks/useAuth';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  const protectedRoute = (component) =>
    user ? (
      <ProtectedLayout>{component}</ProtectedLayout>
    ) : (
      <Navigate to="/login" />
    );

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={protectedRoute(<Dashboard />)}
        />

        <Route
          path="/test-suites/:id"
          element={protectedRoute(<TestSuiteDetails />)}
        />

        <Route path="/bug-report" element={<BugReport />} />
        <Route path="/test-management" element={<TestManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/attendance" element={<MyAttendance />} />

        {/* Default */}
        <Route
          path="*"
          element={<Navigate to={user ? '/dashboard' : '/login'} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
