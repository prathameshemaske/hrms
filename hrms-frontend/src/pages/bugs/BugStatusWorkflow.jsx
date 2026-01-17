import { useEffect, useState } from "react";
import { updateBugStatus } from "../../api/bugs.api";
import useAuth from "../../hooks/useAuth";

const STATUS_OPTIONS = ["OPEN", "IN_PROGRESS", "CLOSED"];

const BugStatusWorkflow = ({ bugId, currentStatus, onStatusUpdated }) => {
  const { user } = useAuth();

  const [status, setStatus] = useState(currentStatus || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ SAFE ROLE CHECK
  const canUpdate =
    user?.role === "ADMIN" || user?.role === "QA";

  // ✅ KEEP STATUS IN SYNC WITH PROPS
  useEffect(() => {
    if (currentStatus) {
      setStatus(currentStatus);
    }
  }, [currentStatus]);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setError("");
    setLoading(true);

    try {
      await updateBugStatus(bugId, newStatus);
      onStatusUpdated?.(newStatus);
    } catch (err) {
      console.error(err);
      setError("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h4>Status</h4>

      {canUpdate ? (
        <select
          value={status}
          onChange={handleChange}
          disabled={loading}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      ) : (
        <p>{status ? status.replace("_", " ") : "-"}</p>
      )}

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default BugStatusWorkflow;

/* ================= STYLES ================= */

const styles = {
  container: {
    marginBottom: 20,
  },
  error: {
    color: "red",
    fontSize: 13,
    marginTop: 6,
  },
};
