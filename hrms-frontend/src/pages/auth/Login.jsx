import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth.api";
import useAuth from "../../hooks/useAuth";
import { autoMarkAttendance } from "../../api/attendance.api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      login(data.token, data.user);

      try {
        await autoMarkAttendance();
      } catch {
        console.warn("Auto attendance failed");
      }

      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-10 py-4 bg-white dark:bg-background-dark">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-8">
            <svg viewBox="0 0 48 48" fill="currentColor">
              <path d="M24 4C25.8 14.2 33.8 22.2 44 24 33.8 25.8 25.8 33.8 24 44 22.2 33.8 14.2 25.8 4 24 14.2 22.2 22.2 14.2 24 4Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            HRMS Portal
          </h2>
        </div>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          Enterprise Edition v2.4
        </span>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] bg-white dark:bg-[#1a2130] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">
                corporate_fare
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Access your employee dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email / Employee ID
              </label>
              <input
                className="w-full mt-1 h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#242d3d] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20"
                placeholder="e.g. name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a className="text-primary text-xs font-semibold hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                className="w-full mt-1 h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#242d3d] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Keep me logged in
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-lg font-bold shadow-lg shadow-primary/20"
            >
              {loading ? "Logging in..." : "Login to Portal"}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-[#1a2130] px-3 text-gray-500">
                  OR SIGN IN WITH
                </span>
              </div>
            </div>

            {/* SSO Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="border rounded-lg py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800">
                Google
              </button>
              <button type="button" className="border rounded-lg py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800">
                Microsoft
              </button>
            </div>

            <p className="text-xs text-center text-gray-400 mt-6">
              By logging in, you agree to our{" "}
              <span className="underline">Terms of Service</span> and{" "}
              <span className="underline">Privacy Policy</span>.
            </p>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center">
        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <span>Contact Support</span>
          <span>Knowledge Base</span>
          <span>System Status</span>
        </div>
        <p className="mt-4 text-xs text-gray-400">
          © 2024 HRMS Enterprise Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Login;
