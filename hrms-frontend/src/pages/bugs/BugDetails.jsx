import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getBugById, markBugAsDuplicate } from "../../api/bugs.api";
import { assignBug, getBugAssignmentHistory } from "../../api/bugAssignment.api";
import {
  getAllBugLabels,
  getBugLabels,
  addBugLabels,
  removeBugLabel,
} from "../../api/bugLabels.api";

import api from "../../config/axios";
import useAuth from "../../hooks/useAuth";

import BugComments from "../../components/bugs/BugComments";
import BugHistory from "../../components/bugs/BugHistory";
import BugAttachments from "../../components/bugs/BugAttachments";
import BugStatusWorkflow from "../../components/bugs/BugStatusWorkflow";

const BugDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [bug, setBug] = useState(null);

  const [users, setUsers] = useState([]);
  const [assignee, setAssignee] = useState("");
  const [assignmentHistory, setAssignmentHistory] = useState([]);

  const [allLabels, setAllLabels] = useState([]);
  const [bugLabels, setBugLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);

  const [duplicateOf, setDuplicateOf] = useState("");
  const [duplicateReason, setDuplicateReason] = useState("");

  useEffect(() => {
    getBugById(id).then(setBug).catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!bug?.id) return;

    api.get("/employees").then((res) => setUsers(res.data));
    getBugAssignmentHistory(bug.id).then(setAssignmentHistory);
    getAllBugLabels().then(setAllLabels);
    getBugLabels(bug.id).then(setBugLabels);
  }, [bug?.id]);

  const handleAssign = async () => {
    if (!assignee) return alert("Select user");
    await assignBug(bug.id, assignee);
    setAssignee("");
    setAssignmentHistory(await getBugAssignmentHistory(bug.id));
  };

  const handleAddLabels = async () => {
    if (!selectedLabels.length) return;
    await addBugLabels(bug.id, selectedLabels);
    setBugLabels(await getBugLabels(bug.id));
    setSelectedLabels([]);
  };

  const handleRemoveLabel = async (id) => {
    await removeBugLabel(bug.id, id);
    setBugLabels(await getBugLabels(bug.id));
  };

  const handleDuplicate = async () => {
    if (!duplicateOf) return;
    await markBugAsDuplicate(bug.id, Number(duplicateOf), duplicateReason);
    window.location.reload();
  };

  if (!bug) return <p>Loading...</p>;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>
          #{bug.id} {bug.title}
        </h2>
      </div>

      {/* DUPLICATE INFO */}
      {bug.status === "DUPLICATE" && bug.original_bug_id && (
        <div style={styles.duplicateBox}>
          Duplicate of{" "}
          <Link to={`/bugs/${bug.original_bug_id}`}>
            #{bug.original_bug_id} – {bug.original_bug_title}
          </Link>
        </div>
      )}

      <div style={styles.grid}>
        {/* LEFT */}
        <div>
          <Card title="Description">
            <p style={styles.text}>{bug.description}</p>
          </Card>

          <Card title="Attachments">
            <BugAttachments bugId={id} />
          </Card>

          <Card title="Comments">
            <BugComments bugId={id} />
          </Card>

          <Card title="History">
            <BugHistory bugId={id} />
          </Card>
        </div>

        {/* RIGHT */}
        <div>
          <Card title="Status">
            <BugStatusWorkflow
              bugId={id}
              currentStatus={bug.status}
              onStatusUpdated={(s) => setBug({ ...bug, status: s })}
            />
          </Card>

          <Card title="Details">
            <Meta label="Component" value={bug.component_name || "N/A"} />
            <Meta label="Severity" value={bug.severity} />
            <Meta label="Priority" value={bug.priority} />
          </Card>

          {(user.role === "QA" || user.role === "ADMIN") && (
            <Card title="Assign Bug">
              <select
                style={styles.select}
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              >
                <option value="">Select user</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.email}
                  </option>
                ))}
              </select>
              <button style={styles.primaryBtn} onClick={handleAssign}>
                Assign
              </button>
            </Card>
          )}

          <Card title="Labels">
            <div style={styles.labelWrap}>
              {bugLabels.map((l) => (
                <span key={l.id} style={styles.label}>
                  {l.name}
                  {(user.role === "QA" || user.role === "ADMIN") && (
                    <button
                      style={styles.remove}
                      onClick={() => handleRemoveLabel(l.id)}
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>

            {(user.role === "QA" || user.role === "ADMIN") && (
              <>
                <select
                  multiple
                  style={styles.select}
                  onChange={(e) =>
                    setSelectedLabels(
                      Array.from(e.target.selectedOptions).map((o) => o.value)
                    )
                  }
                >
                  {allLabels.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
                <button style={styles.secondaryBtn} onClick={handleAddLabels}>
                  Add Labels
                </button>
              </>
            )}
          </Card>

          {(user.role === "QA" || user.role === "ADMIN") &&
            bug.status !== "DUPLICATE" && (
              <Card title="Mark as Duplicate">
                <input
                  style={styles.input}
                  type="number"
                  placeholder="Original Bug ID"
                  value={duplicateOf}
                  onChange={(e) => setDuplicateOf(e.target.value)}
                />
                <textarea
                  style={styles.textarea}
                  placeholder="Reason (optional)"
                  value={duplicateReason}
                  onChange={(e) => setDuplicateReason(e.target.value)}
                />
                <button style={styles.dangerBtn} onClick={handleDuplicate}>
                  Mark Duplicate
                </button>
              </Card>
            )}
        </div>
      </div>
    </div>
  );
};

export default BugDetails;

/* ================= STYLES ================= */

const Card = ({ title, children }) => (
  <div style={styles.card}>
    <h4 style={styles.cardTitle}>{title}</h4>
    {children}
  </div>
);

const Meta = ({ label, value }) => (
  <p style={styles.meta}>
    <b>{label}:</b> {value}
  </p>
);

const styles = {
  page: { padding: 24, background: "#f9fafb", minHeight: "100vh" },
  header: { marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 700 },

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 20,
  },

  card: {
    background: "#fff",
    borderRadius: 14,
    padding: 16,
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    marginBottom: 16,
  },
  cardTitle: { fontSize: 16, fontWeight: 600, marginBottom: 10 },

  text: { color: "#374151", lineHeight: 1.6 },

  meta: { fontSize: 14, marginBottom: 6 },

  select: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    marginBottom: 8,
  },
  textarea: {
    width: "100%",
    minHeight: 80,
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    marginBottom: 8,
  },

  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#e5e7eb",
    color: "#111827",
    padding: "6px 14px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    cursor: "pointer",
  },
  dangerBtn: {
    background: "#dc2626",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
  },

  labelWrap: { display: "flex", flexWrap: "wrap", gap: 8 },
  label: {
    background: "#e5e7eb",
    padding: "4px 8px",
    borderRadius: 999,
    fontSize: 12,
  },
  remove: {
    marginLeft: 6,
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  duplicateBox: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
  },
};
