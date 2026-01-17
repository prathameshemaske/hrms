import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTestSuites } from "../../api/testSuites.api";

const TestSuiteList = () => {
  const [suites, setSuites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getAllTestSuites();
        setSuites(data);
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
        <h2 style={styles.title}>Test Suites</h2>

        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/test-suites/create")}
        >
          + Create Test Suite
        </button>
      </div>

      {/* LIST CARD */}
      <div style={styles.card}>
        {loading && <p style={styles.empty}>Loading test suites…</p>}

        {!loading && suites.length === 0 && (
          <p style={styles.empty}>No test suites found</p>
        )}

        {!loading && suites.length > 0 && (
          <ul style={styles.list}>
            {suites.map((suite) => (
              <li
                key={suite.id}
                style={styles.listItem}
                onClick={() => navigate(`/test-suites/${suite.id}`)}
              >
                <div>
                  <div style={styles.suiteName}>{suite.name}</div>
                  {suite.description && (
                    <div style={styles.suiteDesc}>
                      {suite.description}
                    </div>
                  )}
                </div>

                <span style={styles.chevron}>›</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestSuiteList;

/* ================= STYLES ================= */

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
    color: "#111827",
  },

  primaryBtn: {
    background: "#2563eb",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
  },

  card: {
    background: "#ffffff",
    borderRadius: 14,
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    padding: 8,
  },

  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    borderBottom: "1px solid #e5e7eb",
    cursor: "pointer",
    transition: "background 0.15s",
  },

  suiteName: {
    fontSize: 15,
    fontWeight: 600,
    color: "#111827",
  },

  suiteDesc: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },

  chevron: {
    fontSize: 20,
    color: "#9ca3af",
  },

  empty: {
    textAlign: "center",
    padding: 24,
    color: "#6b7280",
    fontSize: 14,
  },
};
