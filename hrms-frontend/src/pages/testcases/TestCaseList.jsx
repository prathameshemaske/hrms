import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTestCases } from "../../api/testcases.api";

const TestCaseList = () => {
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getAllTestCases();
        setTestCases(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>Test Management</h2>

        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/test-cases/create")} // ✅ FIXED
        >
          + Create Test Case
        </button>
      </div>

      {/* TABLE CARD */}
      <div style={styles.card}>
        {loading && <p style={styles.empty}>Loading test cases…</p>}
        {!loading && testCases.length === 0 && (
          <p style={styles.empty}>No test cases found</p>
        )}

        {!loading && testCases.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {testCases.map((tc) => (
                <tr
                  key={tc.id}
                  style={styles.row}
                  onClick={() => navigate(`/test-cases/${tc.id}`)} // ✅ FIXED
                >
                  <td style={styles.td}>
                    <div style={styles.titleCell}>{tc.title}</div>
                  </td>
                  <td style={styles.td}>
                    <span style={priorityBadge(tc.priority)}>
                      {tc.priority}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {new Date(tc.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TestCaseList;

/* ================= STYLES ================= */

const priorityBadge = (priority) => ({
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  background:
    priority === "P1"
      ? "#fee2e2"
      : priority === "P2"
        ? "#fef3c7"
        : "#e5e7eb",
  color:
    priority === "P1"
      ? "#b91c1c"
      : priority === "P2"
        ? "#92400e"
        : "#374151",
});

const styles = {
  page: {
    padding: 24,
    background: "#f9fafb",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
  },
  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    padding: 16,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    fontSize: 13,
    color: "#6b7280",
    fontWeight: 600,
    padding: "10px 12px",
    borderBottom: "1px solid #e5e7eb",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: 14,
  },
  row: {
    cursor: "pointer",
    transition: "background 0.15s",
  },
  titleCell: {
    fontWeight: 600,
    color: "#111827",
  },
  empty: {
    textAlign: "center",
    padding: 20,
    color: "#6b7280",
  },
};
