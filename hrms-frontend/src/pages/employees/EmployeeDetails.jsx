import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById, updateEmployeeStatus } from "../../api/employees.api";
import api from "../../config/axios";
import useAuth from "../../hooks/useAuth";

const EmployeeDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [employee, setEmployee] = useState(null);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await getEmployeeById(id);
            setEmployee(data);
            setForm({
                full_name: data.full_name || "",
                email: data.email || "",
                mobile: data.mobile || "",
                dob: data.dob || "",
                gender: data.gender || "",
                pan: data.pan || "",
                department: data.department || "",
                designation: data.designation || "",
                joining_date: data.joining_date || "",
                bank_account: data.bank_account || "",
                ifsc: data.ifsc || "",
                tax_regime: data.tax_regime || "NEW",
            });
            setLoading(false);
        };
        load();
    }, [id]);

    const toggleStatus = async () => {
        const newStatus = employee.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        await updateEmployeeStatus(id, newStatus);
        setEmployee({ ...employee, status: newStatus });
    };

    const save = async () => {
        try {
            setSaving(true);

            await api.put(`/employees/${id}`, form);

            const updated = await getEmployeeById(id);
            setEmployee(updated);
            setEdit(false);
            alert("Employee updated");
        } catch (e) {
            alert("Failed to save employee");
        } finally {
            setSaving(false);
        }
    };

    if (loading || !employee) return <p style={{ padding: 24 }}>Loading…</p>;

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h2>{employee.full_name}</h2>
                <span style={statusBadge(employee.status)}>{employee.status}</span>
            </div>

            <div style={styles.card}>
                <div style={styles.grid}>
                    <Field label="Full Name" edit={edit} value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} />
                    <Field label="Email" edit={edit} value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <Field label="Mobile" edit={edit} value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
                    <Field label="DOB" type="date" edit={edit} value={form.dob} onChange={(v) => setForm({ ...form, dob: v })} />
                    <Field label="Gender" edit={edit} value={form.gender} onChange={(v) => setForm({ ...form, gender: v })} />
                    <Field label="PAN" edit={edit} value={form.pan} onChange={(v) => setForm({ ...form, pan: v })} />
                    <Field label="Department" edit={edit} value={form.department} onChange={(v) => setForm({ ...form, department: v })} />
                    <Field label="Designation" edit={edit} value={form.designation} onChange={(v) => setForm({ ...form, designation: v })} />
                    <Field label="Joining Date" type="date" edit={edit} value={form.joining_date} onChange={(v) => setForm({ ...form, joining_date: v })} />
                    <Field label="Bank Account" edit={edit} value={form.bank_account} onChange={(v) => setForm({ ...form, bank_account: v })} />
                    <Field label="IFSC" edit={edit} value={form.ifsc} onChange={(v) => setForm({ ...form, ifsc: v })} />
                    <Field label="Tax Regime" edit={edit} value={form.tax_regime} onChange={(v) => setForm({ ...form, tax_regime: v })} />
                </div>

                <div style={styles.actions}>
                    {edit ? (
                        <>
                            <button style={styles.successBtn} onClick={save} disabled={saving}>
                                {saving ? "Saving…" : "Save"}
                            </button>
                            <button style={styles.secondaryBtn} onClick={() => setEdit(false)}>Cancel</button>
                        </>
                    ) : (
                        <button style={styles.primaryBtn} onClick={() => setEdit(true)}>Edit</button>
                    )}

                    {user.role === "ADMIN" && (
                        <button
                            onClick={toggleStatus}
                            style={employee.status === "ACTIVE" ? styles.dangerBtn : styles.successBtn}
                        >
                            {employee.status === "ACTIVE" ? "Deactivate" : "Activate"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;

/* ---------- Helpers ---------- */

const Field = ({ label, value, edit, onChange, type = "text" }) => (
    <div style={styles.item}>
        <div style={styles.label}>{label}</div>
        {edit ? (
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={styles.input}
            />
        ) : (
            <div style={styles.value}>{value || "—"}</div>
        )}
    </div>
);

const statusBadge = (status) => ({
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    background: status === "ACTIVE" ? "#dcfce7" : "#fee2e2",
    color: status === "ACTIVE" ? "#166534" : "#991b1b",
});

/* ---------- Styles ---------- */

const styles = {
    page: { padding: 28, background: "#f4f6f8", minHeight: "100vh" },
    header: { display: "flex", justifyContent: "space-between", marginBottom: 20 },
    card: { background: "#fff", borderRadius: 16, padding: 24, maxWidth: 800 },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 20 },
    item: { display: "flex", flexDirection: "column", gap: 6 },
    label: { fontSize: 12, color: "#6b7280", fontWeight: 600 },
    value: { fontSize: 15, fontWeight: 500 },
    input: { padding: 10, border: "1px solid #d1d5db", borderRadius: 8 },
    actions: { marginTop: 24, display: "flex", gap: 12 },
    primaryBtn: { background: "#2563eb", color: "#fff", padding: "10px 20px", borderRadius: 8 },
    successBtn: { background: "#16a34a", color: "#fff", padding: "10px 20px", borderRadius: 8 },
    dangerBtn: { background: "#dc2626", color: "#fff", padding: "10px 20px", borderRadius: 8 },
    secondaryBtn: { background: "#e5e7eb", padding: "10px 20px", borderRadius: 8 },
};
