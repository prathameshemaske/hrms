import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTestCaseById } from "../../api/testcases.api";
import LinkedBugs from "../../components/testcases/LinkedBugs";
import TestExecution from "../../components/testcases/TestExecution";

const TestCaseDetails = () => {
  const { id } = useParams();
  const [testCase, setTestCase] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getTestCaseById(id);
      setTestCase(data);
    };
    load();
  }, [id]);

  if (!testCase) {
    return <p style={styles.loading}>Loading test case…</p>;
  }

  return (
    <div style={styles.page}>
      {/* TOP BAR */}
      <div style={styles.topBar}>
        <div>
          <h2 style={styles.title}>{testCase.title}</h2>
          <p style={styles.meta}>Test Case Details</p>
        </div>

        <span style={priorityBadge(testCase.priority)}>
          {testCase.priority}
        </span>
      </div>

      {/* CONTENT GRID */}
      <div style={styles.grid}>
        {/* LEFT CONTENT */}
        <div style={styles.left}>
          <Card title="Precondition">
            {testCase.precondition || "—"}
          </Card>

          <Card title="Test Steps" muted>
            <pre style={styles.pre}>{testCase.steps}</pre>
          </Card>

          <Card title="Expected Result">
            {testCase.expected_result}
          </Card>

          <div style={{ marginTop: 24 }}>
            <LinkedBugs testCaseId={testCase.id} />
          </div>
        </div>

        {/* RIGHT EXECUTION */}
        <div style={styles.right}>
          <div style={styles.executionCard}>
            <div style={styles.executionHeader}>
              <h3 style={styles.executionTitle}>Execution</h3>
              <p style={styles.executionHint}>
                Record result & notes for this test
              </p>
            </div>

            <TestExecution testCase={testCase} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCaseDetails;

/* ================== COMPONENTS ================== */

const Card = ({ title, children, muted }) => (
  <div style={styles.card}>
    <div style={styles.cardHeader}>
      <h4 style={styles.cardTitle}>{title}</h4>
    </div>

    <div
      style={{
        ...styles.cardBody,
        background: muted ? "#f9fafb" : "transparent",
      }}
    >
      {children}
    </div>
  </div>
);

/* ================== STYLES ================== */

const priorityBadge = (priority) => ({
  padding: "6px 14px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  background:
    priority === "HIGH"
      ? "#fee2e2"
      : priority === "MEDIUM"
        ? "#fef3c7"
        : "#e5e7eb",
  color:
    priority === "HIGH"
      ? "#b91c1c"
      : priority === "MEDIUM"
        ? "#92400e"
        : "#374151",
});

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

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#111827",
  },

  meta: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "2.2fr 1fr",
    gap: 24,
    alignItems: "flex-start",
  },

  left: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  right: {
    position: "sticky",
    top: 24,
  },

  card: {
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    overflow: "hidden",
  },

  cardHeader: {
    padding: "14px 18px",
    borderBottom: "1px solid #e5e7eb",
    background: "#fafafa",
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#374151",
  },

  cardBody: {
    padding: 18,
    fontSize: 14,
    lineHeight: 1.7,
    color: "#111827",
  },

  pre: {
    background: "#eef2f7",
    padding: 16,
    borderRadius: 10,
    fontSize: 13,
    lineHeight: 1.6,
    overflowX: "auto",
  },

  executionCard: {
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    padding: 20,
  },

  executionHeader: {
    marginBottom: 16,
  },

  executionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#111827",
  },

  executionHint: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },
};
