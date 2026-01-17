import { useEffect, useState } from "react";
import { getMyAttendance } from "../../api/attendance.api";

const MyAttendance = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    // Manual log form
    const [form, setForm] = useState({
        date: "",
        checkIn: "",
        checkOut: "",
        notes: "",
    });

    useEffect(() => {
        loadAttendance();
    }, []);

    const loadAttendance = async () => {
        setLoading(true);
        try {
            const data = await getMyAttendance();
            setRecords(data);
        } finally {
            setLoading(false);
        }
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();

        alert("Manual time logging will be implemented soon.");

        // Keep form filled OR reset — UX choice
        // Resetting feels cleaner:
        setForm({
            date: "",
            checkIn: "",
            checkOut: "",
            notes: "",
        });
    };

    return (
        <div style={styles.page}>
            {/* HEADER */}
            <div style={styles.header}>
                <h2 style={styles.title}>My Attendance</h2>
                <p style={styles.subtitle}>
                    View attendance records and manual time logging
                </p>
            </div>

            {/* GRID */}
            <div style={styles.grid}>
                {/* ATTENDANCE TABLE */}
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Attendance Records</h3>

                    {loading && <p style={styles.empty}>Loading…</p>}

                    {!loading && records.length === 0 && (
                        <p style={styles.empty}>No attendance records found</p>
                    )}

                    {!loading && records.length > 0 && (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((r) => (
                                    <tr key={r.id}>
                                        <td>{r.attendance_date}</td>
                                        <td>
                                            <span style={statusBadge(r.status)}>
                                                {r.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* MANUAL TIME LOG */}
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Manual Time Logging</h3>

                    <form onSubmit={handleManualSubmit}>
                        <div style={styles.field}>
                            <label>Date</label>
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) =>
                                    setForm({ ...form, date: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div style={styles.row}>
                            <div style={styles.field}>
                                <label>Check In</label>
                                <input
                                    type="time"
                                    value={form.checkIn}
                                    onChange={(e) =>
                                        setForm({ ...form, checkIn: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div style={styles.field}>
                                <label>Check Out</label>
                                <input
                                    type="time"
                                    value={form.checkOut}
                                    onChange={(e) =>
                                        setForm({ ...form, checkOut: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div style={styles.field}>
                            <label>Notes (optional)</label>
                            <textarea
                                placeholder="Reason for manual entry"
                                value={form.notes}
                                onChange={(e) =>
                                    setForm({ ...form, notes: e.target.value })
                                }
                            />
                        </div>

                        <button style={styles.primaryBtn} type="submit">
                            Save Manual Entry
                        </button>

                        <p style={styles.notice}>
                            ⚠️ Manual time logging will be implemented soon.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyAttendance;

/* ================= STYLES ================= */

const statusBadge = (status) => ({
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    background:
        status === "PRESENT"
            ? "#dcfce7"
            : status === "ABSENT"
                ? "#fee2e2"
                : "#e5e7eb",
    color:
        status === "PRESENT"
            ? "#166534"
            : status === "ABSENT"
                ? "#991b1b"
                : "#374151",
});

const styles = {
    page: {
        padding: 28,
        background: "#f4f6f8",
        minHeight: "100vh",
    },

    header: {
        marginBottom: 24,
    },

    title: {
        fontSize: 24,
        fontWeight: 700,
    },

    subtitle: {
        fontSize: 14,
        color: "#6b7280",
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
        padding: 20,
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 16,
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
    },

    empty: {
        textAlign: "center",
        padding: 20,
        color: "#6b7280",
    },

    field: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        marginBottom: 12,
        fontSize: 14,
    },

    row: {
        display: "flex",
        gap: 12,
    },

    primaryBtn: {
        background: "#2563eb",
        color: "#ffffff",
        padding: "10px 16px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        marginTop: 8,
    },

    notice: {
        marginTop: 10,
        fontSize: 12,
        color: "#9ca3af",
    },
};
