import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createBug } from "../../api/bugs.api";
import { uploadBugAttachment } from "../../api/bugAttachments.api";
import { getBugComponents } from "../../api/bugComponents.api";

import useAuth from "../../hooks/useAuth";

const BugCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "HIGH",
    priority: "P1",
    project: "HRMS",
    component_id: "",
  });

  const [components, setComponents] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getBugComponents()
      .then(setComponents)
      .catch(() => setError("Failed to load components"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.component_id) {
      setError("Please select a component");
      return;
    }

    setLoading(true);

    try {
      const response = await createBug({
        ...form,
        reported_by: user.id,
      });

      const bugId = response.id || response.bugId;

      for (const file of files) {
        await uploadBugAttachment(bugId, file);
      }

      navigate(`/bugs/${bugId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create bug");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.title}>Create Bug</h2>
          <p style={styles.subtitle}>
            Report a new issue with clear details
          </p>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* TITLE */}
          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input
              style={styles.input}
              placeholder="Short summary of the issue"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              style={styles.textarea}
              placeholder="Steps to reproduce, expected vs actual result"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
          </div>

          {/* ROW: COMPONENT / SEVERITY / PRIORITY */}
          <div style={styles.grid3}>
            <div>
              <label style={styles.label}>Component</label>
              <select
                style={styles.select}
                value={form.component_id}
                onChange={(e) =>
                  setForm({ ...form, component_id: e.target.value })
                }
                required
              >
                <option value="">Select Component</option>
                {components.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={styles.label}>Severity</label>
              <select
                style={styles.select}
                value={form.severity}
                onChange={(e) =>
                  setForm({ ...form, severity: e.target.value })
                }
              >
                <option>BLOCKER</option>
                <option>CRITICAL</option>
                <option>HIGH</option>
                <option>MEDIUM</option>
                <option>LOW</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Priority</label>
              <select
                style={styles.select}
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
              >
                <option>P1</option>
                <option>P2</option>
                <option>P3</option>
              </select>
            </div>
          </div>

          {/* ATTACHMENTS */}
          <div style={styles.field}>
            <label style={styles.label}>Attachments</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles([...e.target.files])}
            />
          </div>

          {/* ACTIONS */}
          <div style={styles.actions}>
            <button
              type="submit"
              disabled={loading}
              style={styles.primaryBtn}
            >
              {loading ? "Creating…" : "Create Bug"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              style={styles.secondaryBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BugCreate;

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: 24,
    background: "#f9fafb",
    minHeight: "100vh",
  },
  card: {
    maxWidth: 820,
    background: "#ffffff",
    margin: "0 auto",
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
    minHeight: 120,
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
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginBottom: 16,
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
