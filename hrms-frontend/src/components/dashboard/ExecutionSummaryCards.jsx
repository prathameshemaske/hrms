import { useEffect, useState } from "react";
import api from "../../config/axios";

const ExecutionSummaryCards = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/test-executions/summary");
        setData(res.data || {});
      } catch (err) {
        console.error("Failed to load execution summary", err);
        setError(true);
      }
    };

    load();
  }, []);

  // ❌ API failed → show safe error (NO CRASH)
  if (error) {
    return (
      <div style={styles.errorCard}>
        Execution summary not available
      </div>
    );
  }

  // ⏳ Still loading
  if (!data) {
    return <p>Loading execution summary...</p>;
  }

  const total = Number(data.total) || 0;
  const pass = Number(data.pass) || 0;
  const fail = Number(data.fail) || 0;
  const blocked = Number(data.blocked) || 0;

  const passPct = total ? ((pass / total) * 100).toFixed(1) : "0.0";
  const failPct = total ? ((fail / total) * 100).toFixed(1) : "0.0";
  const blockedPct = total ? ((blocked / total) * 100).toFixed(1) : "0.0";

  return (
    <div style={styles.container}>
      <div style={{ ...styles.card, background: "#e8f5e9" }}>
        <h3>PASS</h3>
        <p>{pass}</p>
        <b>{passPct}%</b>
      </div>

      <div style={{ ...styles.card, background: "#ffebee" }}>
        <h3>FAIL</h3>
        <p>{fail}</p>
        <b>{failPct}%</b>
      </div>

      <div style={{ ...styles.card, background: "#fff8e1" }}>
        <h3>BLOCKED</h3>
        <p>{blocked}</p>
        <b>{blockedPct}%</b>
      </div>
    </div>
  );
};

export default ExecutionSummaryCards;

/* ================= STYLES ================= */

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  card: {
    flex: 1,
    minWidth: 200,
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    fontWeight: 600,
  },
  errorCard: {
    padding: "16px",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: "10px",
    fontWeight: 600,
    marginTop: "16px",
  },
};
