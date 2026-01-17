import { useEffect, useState } from "react";
import { applyLeave, getLeaveTypes } from "../../api/leaves.api";

const ApplyLeave = () => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        leave_type_id: "",
        start_date: "",
        end_date: "",
        reason: "",
    });

    useEffect(() => {
        getLeaveTypes().then(setTypes);
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await applyLeave(form);
            alert("Leave applied successfully");
            setForm({
                leave_type_id: "",
                start_date: "",
                end_date: "",
                reason: "",
            });
        } catch (err) {
            alert("Failed to apply leave");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                {/* HEADER */}
                <div style={styles.header}>
                    <h2 style={styles.title}>Apply Leave</h2>
                    <p style={styles.subtitle}>
                        Submit your leave request for approval
                    </p>
                </div>

                <form onSubmit={submit}>
                    {/* LEAVE TYPE */}
                    <div style={styles.field}>
                        <label style={styles.label}>Leave Type</label>
                        <select
                            style={styles.select}
                            value={form.leave_type_id}
                            onChange={(e) =>
                                setForm({ ...form, leave_type_id: e.target.value })
                            }
                            required
                        >
                            <option value="">Select leave type</option>
                            {types.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* DATES */}
                    <div style={styles.grid}>
                        <div style={styles.field}>
                            <label style={styles.label}>Start Date</label>
                            <input
                                type="date"
                                style={styles.input}
                                value={form.start_date}
                                onChange={(e) =>
                                    setForm({ ...form, start_date: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>End Date</label>
                            <input
                                type="date"
                                style={styles.input}
                                value={form.end_date}
                                onChange={(e) =>
                                    setForm({ ...form, end_date: e.target.value })
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* REASON */}
                    <div style={styles.field}>
                        <label style={styles.label}>Reason (optional)</label>
                        <textarea
                            style={styles.textarea}
                            placeholder="Brief reason for leave"
                            value={form.reason}
                            onChange={(e) =>
                                setForm({ ...form, reason: e.target.value })
                            }
                        />
                    </div>

                    {/* ACTION */}
                    <div style={styles.actions}>
                        <button
                            type="submit"
                            style={styles.primaryBtn}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Apply Leave"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyLeave;

/* ================= STYLES ================= */

const styles = {
    page: {
        padding: 20,
        background: "#f9fafb",
        minHeight: "100vh",
    },

    card: {
        maxWidth: 560,
        margin: "0 auto",
        background: "#ffffff",
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

    select: {
        width: "100%",
        padding: "8px 10px",
        borderRadius: 6,
        border: "1px solid #d1d5db",
        background: "#fff",
    },

    textarea: {
        width: "100%",
        minHeight: 90,
        padding: "8px 10px",
        borderRadius: 6,
        border: "1px solid #d1d5db",
        resize: "vertical",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
    },

    actions: {
        marginTop: 24,
    },

    primaryBtn: {
        width: "100%",
        background: "#2563eb",
        color: "#fff",
        padding: "10px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 14,
    },
};
