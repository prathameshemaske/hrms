import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEmployees } from "../../api/employees.api";
import useAuth from "../../hooks/useAuth";

const EmployeeList = () => {
    const { user } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getAllEmployees();
            setEmployees(data);
            setLoading(false);
        };
        load();
    }, []);

    return (
        <div style={styles.page}>
            {/* HEADER */}
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Employees</h2>
                    <p style={styles.subtitle}>
                        Manage organization employees
                    </p>
                </div>

                {user.role === "ADMIN" && (
                    <Link to="/employees/create">
                        <button style={styles.primaryBtn}>
                            + Add Employee
                        </button>
                    </Link>
                )}
            </div>

            {/* LIST CARD */}
            <div style={styles.card}>
                {loading && <p style={styles.empty}>Loading employees…</p>}

                {!loading && employees.length === 0 && (
                    <p style={styles.empty}>No employees found</p>
                )}

                {!loading && employees.length > 0 && (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Department</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.id} style={styles.row}>
                                    <td>
                                        <Link
                                            to={`/employees/${emp.id}`}
                                            style={styles.nameLink}
                                        >
                                            {emp.full_name}
                                        </Link>
                                    </td>
                                    <td>{emp.designation || "—"}</td>
                                    <td>{emp.department || "—"}</td>
                                    <td>
                                        <span style={statusBadge(emp.status)}>
                                            {emp.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default EmployeeList;

/* ================= STYLES ================= */

const statusBadge = (status) => ({
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    background:
        status === "ACTIVE" ? "#dcfce7" : "#fee2e2",
    color:
        status === "ACTIVE" ? "#166534" : "#991b1b",
});

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
        marginBottom: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 700,
    },

    subtitle: {
        fontSize: 14,
        color: "#6b7280",
    },

    primaryBtn: {
        background: "#2563eb",
        color: "#ffffff",
        padding: "10px 18px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
    },

    card: {
        background: "#ffffff",
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
    },

    row: {
        borderBottom: "1px solid #e5e7eb",
    },

    nameLink: {
        fontWeight: 600,
        color: "#2563eb",
        textDecoration: "none",
    },

    empty: {
        textAlign: "center",
        padding: 24,
        color: "#6b7280",
    },
};
