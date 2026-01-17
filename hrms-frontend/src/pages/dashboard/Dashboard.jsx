import { useEffect, useState } from "react";
import ExecutionSummaryCards from "../../components/dashboard/ExecutionSummaryCards";
import HrSummaryCards from "../../components/dashboard/HrSummaryCards";
import useAuth from "../../hooks/useAuth";
import { getBugSummary } from "../../api/bugReports.api";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [bugData, setBugData] = useState(null);
  const [bugError, setBugError] = useState(false);

  useEffect(() => {
    const loadBugDashboard = async () => {
      try {
        const data = await getBugSummary();
        setBugData(data);
      } catch (err) {
        console.error("Bug dashboard failed", err);
        setBugError(true);
      }
    };

    if (user?.role === "QA" || user?.role === "ADMIN") {
      loadBugDashboard();
    }
  }, [user]);

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Dashboard</h2>
          <p style={styles.subtitle}>
            Logged in as <b>{user?.role}</b>
          </p>
        </div>

        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* ================= EXECUTION / HR SUMMARY ================= */}
      <div style={styles.section}>
        <ExecutionSummaryCards />
        <HrSummaryCards />
      </div>

      {/* ================= BUG DASHBOARD ================= */}
      {(user?.role === "QA" || user?.role === "ADMIN") && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Bug Dashboard</h3>

          {bugError && (
            <p style={styles.error}>Failed to load bug metrics</p>
          )}

          {!bugData && !bugError && (
            <p style={styles.loading}>Loading bug metrics…</p>
          )}

          {bugData && (
            <>
              {/* TOTAL + STATUS */}
              <div style={styles.grid}>
                <Tile
                  title="Total Bugs"
                  value={bugData.total}
                  color="#2563eb"
                />

                {bugData.byStatus.map((s) => (
                  <Tile
                    key={s.status}
                    title={`${s.status} Bugs`}
                    value={s.count}
                    color={statusColor(s.status)}
                  />
                ))}
              </div>

              {/* BY PRIORITY */}
              <h4 style={styles.subTitle}>By Priority</h4>
              <div style={styles.grid}>
                {bugData.byPriority.map((p) => (
                  <Tile
                    key={p.priority}
                    title={`Priority ${p.priority}`}
                    value={p.count}
                    color="#7c3aed"
                  />
                ))}
              </div>

              {/* BY COMPONENT */}
              <h4 style={styles.subTitle}>By Component</h4>
              <div style={styles.grid}>
                {bugData.byComponent.map((c) => (
                  <Tile
                    key={c.component}
                    title={c.component || "Unassigned"}
                    value={c.count}
                    color="#16a34a"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

/* ================= TILE ================= */

const Tile = ({ title, value, color }) => (
  <div style={{ ...styles.tile, borderLeft: `5px solid ${color}` }}>
    <p style={styles.tileTitle}>{title}</p>
    <p style={styles.tileValue}>{value}</p>
  </div>
);

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: 28,
    background: "#f4f6f8",
    minHeight: "100vh",
    overflowX: "hidden",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: 700,
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },

  logoutBtn: {
    background: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: 8,
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: 600,
  },

  section: {
    marginBottom: 32,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 16,
  },

  subTitle: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 15,
    fontWeight: 600,
    color: "#374151",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },

  tile: {
    background: "#ffffff",
    padding: 18,
    borderRadius: 14,
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  },

  tileTitle: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: 600,
    margin: 0,
  },

  tileValue: {
    fontSize: 28,
    fontWeight: 700,
    marginTop: 6,
    color: "#111827",
  },

  loading: {
    color: "#6b7280",
  },

  error: {
    color: "#dc2626",
    fontWeight: 600,
  },
};

/* ================= COLORS ================= */

const statusColor = (status) => {
  switch (status) {
    case "OPEN":
      return "#dc2626";
    case "IN_PROGRESS":
      return "#f59e0b";
    case "FIXED":
      return "#16a34a";
    case "CLOSED":
      return "#2563eb";
    case "DUPLICATE":
      return "#6b7280";
    default:
      return "#374151";
  }
};
