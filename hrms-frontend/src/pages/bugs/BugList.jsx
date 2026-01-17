import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/axios";
import useAuth from "../../hooks/useAuth";
import { getBugComponents } from "../../api/bugComponents.api";
import { getAllBugLabels } from "../../api/bugLabels.api";

const BugList = () => {
  const { user } = useAuth();

  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [severity, setSeverity] = useState("");
  const [componentId, setComponentId] = useState("");
  const [labelId, setLabelId] = useState("");

  // Sorting
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("DESC");

  const [components, setComponents] = useState([]);
  const [labels, setLabels] = useState([]);

  const hasActiveFilters =
    search ||
    status ||
    priority ||
    severity ||
    componentId ||
    labelId ||
    sortBy !== "created_at" ||
    order !== "DESC";

  const loadBugs = async (overrideParams = {}) => {
    try {
      setLoading(true);
      const res = await api.get("/bugs", {
        params: {
          search,
          status,
          priority,
          severity,
          componentId,
          labelId,
          sortBy,
          order,
          ...overrideParams,
        },
      });
      setBugs(res.data);
    } catch (e) {
      console.error("Failed to load bugs", e);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearch("");
    setStatus("");
    setPriority("");
    setSeverity("");
    setComponentId("");
    setLabelId("");
    setSortBy("created_at");
    setOrder("DESC");

    loadBugs({
      search: "",
      status: "",
      priority: "",
      severity: "",
      componentId: "",
      labelId: "",
      sortBy: "created_at",
      order: "DESC",
    });
  };

  useEffect(() => {
    loadBugs();
    getBugComponents().then(setComponents).catch(() => { });
    getAllBugLabels().then(setLabels).catch(() => { });
  }, []);

  const count = (s) => bugs.filter((b) => b.status === s).length;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.pageTitle}>Bug Tracker</h2>

        {(user?.role === "QA" || user?.role === "ADMIN") && (
          <Link to="/bugs/create" style={styles.createBtn}>
            + Create Bug
          </Link>
        )}
      </div>

      {/* KPI ROW */}
      <div style={styles.kpiRow}>
        <Kpi label="Total Bugs" value={bugs.length} />
        <Kpi label="Open" value={count("OPEN")} />
        <Kpi label="In Progress" value={count("IN_PROGRESS")} />
        <Kpi label="Closed" value={count("CLOSED")} />
      </div>

      {/* FILTER BAR */}
      <div style={styles.filterBar}>
        <input
          style={styles.input}
          placeholder="Search by title or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select style={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="FIXED">Fixed</option>
          <option value="REOPENED">Reopened</option>
          <option value="CLOSED">Closed</option>
        </select>

        <select style={styles.select} value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Priority</option>
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
        </select>

        <select style={styles.select} value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="">Severity</option>
          <option value="BLOCKER">Blocker</option>
          <option value="CRITICAL">Critical</option>
          <option value="MAJOR">Major</option>
          <option value="MINOR">Minor</option>
        </select>

        <select style={styles.select} value={componentId} onChange={(e) => setComponentId(e.target.value)}>
          <option value="">Component</option>
          {components.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select style={styles.select} value={labelId} onChange={(e) => setLabelId(e.target.value)}>
          <option value="">Label</option>
          {labels.map((l) => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>

        <select style={styles.select} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Created</option>
          <option value="priority">Priority</option>
        </select>

        <select style={styles.select} value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="DESC">Newest</option>
          <option value="ASC">Oldest</option>
        </select>

        <button onClick={loadBugs} style={styles.applyBtn}>
          Apply
        </button>

        {hasActiveFilters && (
          <button onClick={handleClear} style={styles.clearBtn}>
            Clear
          </button>
        )}
      </div>

      {/* BUG LIST */}
      <div style={styles.listCard}>
        {loading && <p style={styles.empty}>Loading bugs…</p>}
        {!loading && bugs.length === 0 && <p style={styles.empty}>No bugs found</p>}

        {bugs.map((bug) => (
          <Link key={bug.id} to={`/bugs/${bug.id}`} style={styles.row}>
            <div>
              <div style={styles.rowTitle}>
                #{bug.id} {bug.title}
              </div>
              <div style={styles.rowMeta}>
                {bug.component_name || "General"} •{" "}
                {bug.assigned_to_email || "Unassigned"}
              </div>
            </div>

            <div style={styles.badges}>
              <span style={statusBadge(bug.status)}>
                {bug.status.replace("_", " ")}
              </span>
              <span style={priorityBadge(bug.priority)}>
                {bug.priority}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BugList;

/* ---------------- */

const Kpi = ({ label, value }) => (
  <div style={styles.kpi}>
    <div style={styles.kpiLabel}>{label}</div>
    <div style={styles.kpiValue}>{value}</div>
  </div>
);

const statusBadge = (status) => ({
  padding: "6px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  background:
    status === "OPEN"
      ? "#fee2e2"
      : status === "IN_PROGRESS"
        ? "#fef3c7"
        : "#e5e7eb",
  color:
    status === "OPEN"
      ? "#b91c1c"
      : status === "IN_PROGRESS"
        ? "#92400e"
        : "#374151",
});

const priorityBadge = (p) => ({
  padding: "6px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  background: "#eef2ff",
  color:
    p === "P1"
      ? "#b91c1c"
      : p === "P2"
        ? "#c2410c"
        : "#374151",
});

const styles = {
  page: { padding: 24, background: "#f9fafb", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", marginBottom: 14 },
  pageTitle: { fontSize: 22, fontWeight: 700 },
  createBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 6,
    textDecoration: "none",
    fontWeight: 500,
  },
  kpiRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    marginBottom: 16,
  },
  kpi: {
    background: "#fff",
    padding: "16px 20px",
    borderRadius: 14,
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  },
  kpiLabel: { color: "#6b7280", fontSize: 14 },
  kpiValue: { fontSize: 28, fontWeight: 700 },
  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    background: "#fff",
    padding: 14,
    borderRadius: 14,
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    marginBottom: 16,
  },
  input: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    minWidth: 220,
  },
  select: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
  },
  applyBtn: {
    background: "#111827",
    color: "#fff",
    padding: "6px 16px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
  },
  clearBtn: {
    background: "#e5e7eb",
    color: "#111827",
    padding: "6px 16px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    cursor: "pointer",
  },
  listCard: {
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 20px",
    borderBottom: "1px solid #e5e7eb",
    textDecoration: "none",
    color: "#111827",
  },
  rowTitle: { fontSize: 16, fontWeight: 600 },
  rowMeta: { fontSize: 13, color: "#6b7280", marginTop: 4 },
  badges: { display: "flex", gap: 10 },
  empty: { padding: 24, textAlign: "center", color: "#6b7280" },
};
