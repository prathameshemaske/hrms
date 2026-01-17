import { useEffect, useState } from "react";
import { markAttendance } from "../../api/attendance.api";
import { getAllEmployees } from "../../api/employees.api";

const MarkAttendance = () => {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        employee_id: "",
        attendance_date: "",
        status: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllEmployees().then((res) => {
            setEmployees(res || []);
        });
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await markAttendance(form);
            alert("Attendance marked successfully");
            setForm({
                employee_id: "",
                attendance_date: "",
                status: "",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            {/* HEADER */}
            <div style={styles.header}>
                <h2 style={styles.title}>Mark Attendance</h2>
                <p style={styles.subtitle}>Record attendance for employees</p>
            </div>

            {/* FORM CARD */}
            <div style={styles.card}>
                <form onSubmit={submit}>
                    {/* EMPLOYEE */}
                    <div style={styles.field}>
                        <label style={styles.label}>Employee</label>
                        <select
                            style={styles.select}
                            value={form.employee_id}
                            onChange={(e) =>
                                setForm({ ...form, employee_id: e.target.value })
                            }
                            required
                        >
                            <option value="">Select employee</option>
                            {employees.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.full_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* DATE */}
                    <div style={styles.field}>
                        <label style={styles.label}>Attendance Date</label>
                        <input
                            type="date"
                            style={styles.input}
                            value={form.attendance_date}
                            onChange={(e) =>
                                setForm({ ...form, attendance_date: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* STATUS */}
                    <div style={styles.field}>
                        <label style={styles.label}>Status</label>
                        <select
                            style={styles.select}
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            required
                        >
                            <option value="">Select status</option>
                            <option value="PRESENT">PRESENT</option>
                            <option value="ABSENT">ABSENT</option>
                            <option value="LEAVE">LEAVE</option>
                        </select>
                    </div>

                    {/* ACTION */}
                    <div style={styles.actions}>
                        <button type="submit" style={styles.primaryBtn} disabled={loading}>
                            {loading ? "Saving…" : "Save Attendance"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MarkAttendance;

/* ================= STYLES ================= */

const styles = {
    page: {
        padding: 28,
        background: "#f4f6f8",
        minHeight: "100vh",
        overflowX: "hidden",
    },
    header: { marginBottom: 24 },
    title: { fontSize: 24, fontWeight: 700 },
    subtitle: { fontSize: 14, color: "#6b7280" },
    card: {
        maxWidth: 480,
        background: "#ffffff",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    },
    field: { display: "flex", flexDirection: "column", marginBottom: 16 },
    label: { fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#374151" },
    input: {
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #d1d5db",
        fontSize: 14,
    },
    select: {
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #d1d5db",
        fontSize: 14,
        background: "#fff",
    },
    actions: {
        marginTop: 24,
        display: "flex",
        justifyContent: "flex-end",
    },
    primaryBtn: {
        background: "#2563eb",
        color: "#ffffff",
        padding: "10px 20px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
    },
};
