import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTestSuiteById } from "../../api/testSuites.api";
import { getAllTestCases } from "../../api/testcases.api";
import { assignTestCasesToSuite } from "../../api/testSuiteAssign.api";
import BulkExecuteSuite from "../../components/testcases/BulkExecuteSuite";

const TestSuiteDetails = () => {
  const { id } = useParams();
  const [suite, setSuite] = useState(null);
  const [allTestCases, setAllTestCases] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const suiteData = await getTestSuiteById(id);
      const testCases = await getAllTestCases();

      setSuite(suiteData);
      setAllTestCases(testCases);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const toggleSelect = (tcId) => {
    setSelected((prev) =>
      prev.includes(tcId)
        ? prev.filter((id) => id !== tcId)
        : [...prev, tcId]
    );
  };

  const handleAssign = async () => {
    if (selected.length === 0) {
      alert("Select at least one test case");
      return;
    }

    await assignTestCasesToSuite({
      testSuiteId: suite.id,
      testCaseIds: selected,
    });

    setSelected([]);
    loadData();
    alert("Test cases added to suite");
  };

  if (!suite) return <p style={styles.loading}>Loading test suite…</p>;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>{suite.name}</h2>
          {suite.description && (
            <p style={styles.subtitle}>{suite.description}</p>
          )}
        </div>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {/* LEFT COLUMN */}
        <div>
          {/* ASSIGN TEST CASES */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Add Test Cases</h3>

            <div style={styles.assignActions}>
              <button
                style={styles.primaryBtn}
                onClick={handleAssign}
                disabled={selected.length === 0}
              >
                Add Selected ({selected.length})
              </button>
            </div>

            <div style={styles.list}>
              {allTestCases.map((tc) => (
                <label key={tc.id} style={styles.listItem}>
                  <input
                    type="checkbox"
                    checked={selected.includes(tc.id)}
                    onChange={() => toggleSelect(tc.id)}
                  />
                  <span style={styles.tcTitle}>{tc.title}</span>
                </label>
              ))}
            </div>
          </div>

          {/* TEST CASES IN SUITE */}
          <div style={{ ...styles.card, marginTop: 24 }}>
            <h3 style={styles.cardTitle}>Test Cases in this Suite</h3>

            {suite.test_cases.length === 0 && (
              <p style={styles.empty}>No test cases added yet.</p>
            )}

            {suite.test_cases.length > 0 && (
              <ul style={styles.simpleList}>
                {suite.test_cases.map((tc) => (
                  <li key={tc.id} style={styles.simpleItem}>
                    {tc.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={styles.right}>
          <div style={styles.executionCard}>
            <h3 style={styles.executionTitle}>Bulk Execution</h3>
            <p style={styles.executionHint}>
              Execute all test cases in this suite
            </p>

            <BulkExecuteSuite testSuiteId={suite.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSuiteDetails;

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: 28,
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  loading: {
    padding: 24,
    color: "#6b7280",
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 24,
    alignItems: "flex-start",
  },

  card: {
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    padding: 20,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    color: "#111827",
  },

  assignActions: {
    marginBottom: 12,
  },

  primaryBtn: {
    background: "#2563eb",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
  },

  list: {
    maxHeight: 320,
    overflowY: "auto",
    borderTop: "1px solid #e5e7eb",
    marginTop: 12,
    paddingTop: 8,
  },

  listItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 0",
    cursor: "pointer",
  },

  tcTitle: {
    fontSize: 14,
    color: "#111827",
  },

  simpleList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  simpleItem: {
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb",
    fontSize: 14,
  },

  empty: {
    fontSize: 14,
    color: "#6b7280",
  },

  right: {
    position: "sticky",
    top: 24,
  },

  executionCard: {
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    padding: 20,
  },

  executionTitle: {
    fontSize: 16,
    fontWeight: 700,
  },

  executionHint: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 16,
  },
};
