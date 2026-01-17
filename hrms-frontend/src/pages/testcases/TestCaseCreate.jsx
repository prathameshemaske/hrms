import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTestCase } from "../../api/testcases.api";

const TestCaseCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    suite_id: "",
    title: "",
    precondition: "",
    steps: "",
    expected_result: "",
    priority: "MEDIUM",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...form,
        suite_id: form.suite_id ? Number(form.suite_id) : null,
      };

      await createTestCase(payload);
      navigate("/testcases");
    } catch (err) {
      console.error("Create Test Case failed:", err);
      setError("Failed to create test case");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.title}>Create Test Case</h2>
          <p style={styles.subtitle}>
            Define steps, expectations, and priority clearly
          </p>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* SUITE ID */}
          <div style={styles.field}>
            <label style={styles.label}>Test Suite ID (optional)</label>
            <input
              style={styles.input}
              placeholder="Enter suite ID"
              value={form.suite_id}
              onChange={(e) =>
                setForm({ ...form, suite_id: e.target.value })
              }
            />
          </div>

          {/* TITLE */}
          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input
              style={styles.input}
              placeholder="Short test case title"
              required
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
          </div>

          {/* PRECONDITION */}
          <div style={styles.field}>
            <label style={styles.label}>Precondition</label>
            <textarea
              style={styles.textarea}
              placeholder="Any setup required before execution"
              value={form.precondition}
              onChange={(e) =>
                setForm({ ...form, precondition: e.target.value })
              }
            />
          </div>

          {/* STEPS */}
          <div style={styles.field}>
            <label style={styles.label}>Test Steps</label>
            <textarea
              style={styles.textarea}
              placeholder="Step-by-step execution instructions"
              required
              value={form.steps}
              onChange={(e) =>
                setForm({ ...form, steps: e.target.value })
              }
            />
          </div>

          {/* EXPECTED RESULT */}
          <div style={styles.field}>
            <label style={styles.label}>Expected Result</label>
            <textarea
              style={styles.textarea}
              placeholder="What should happen after execution"
              required
              value={form.expected_result}
              onChange={(e) =>
                setForm({ ...form, expected_result: e.target.value })
              }
            />
          </div>

          {/* PRIORITY */}
          <div style={styles.field}>
            <label style={styles.label}>Priority</label>
            <select
              style={styles.select}
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option>HIGH</option>
              <option>MEDIUM</option>
              <option>LOW</option>
            </select>
          </div>

          {/* ACTIONS */}
          <div style={styles.actions}>
            <button
              type="submit"
              disabled={loading}
              style={styles.primaryBtn}
            >
              {loading ? "Creating…" : "Create Test Case"}
            </button>

            <button
              type="button"
              style={styles.secondaryBtn}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestCaseCreate;

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: 24,
    background: "#f9fafb",
    minHeight: "100vh",
  },
  card: {
    maxWidth: 820,
    margin: "0 auto",
    background: "#fff",
    padding: 24,
    borderRadius: 14,
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
    fontSize: 14,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 6,
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
  },
  textarea: {
    width: "100%",
    minHeight: 100,
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    resize: "vertical",
  },
  select: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
  },
  actions: {
    display: "flex",
    gap: 12,
    marginTop: 24,
  },
  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "8px 18px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
  },
  secondaryBtn: {
    background: "#e5e7eb",
    color: "#111827",
    padding: "8px 18px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    cursor: "pointer",
  },
};
