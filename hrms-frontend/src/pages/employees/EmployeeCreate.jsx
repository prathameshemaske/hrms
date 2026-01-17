import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../../api/employees.api";

const EmployeeCreate = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        // Core (already supported)
        full_name: "",
        department: "",
        designation: "",
        joining_date: "",

        // Extended
        email: "",
        mobile: "",
        dob: "",
        gender: "",
        pan: "",
        bank_account: "",
        ifsc: "",
        tax_regime: "NEW",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.full_name || !form.joining_date) {
            alert("Full name and joining date are required");
            return;
        }

        try {
            setLoading(true);

            // send only what backend expects + new safe fields
            await createEmployee({
                full_name: form.full_name,
                department: form.department,
                designation: form.designation,
                joining_date: form.joining_date,

                email: form.email,
                mobile: form.mobile,
                dob: form.dob,
                gender: form.gender,
                pan: form.pan,
                bank_account: form.bank_account,
                ifsc: form.ifsc,
                tax_regime: form.tax_regime,
            });

            alert("Employee created successfully");
            navigate("/employees");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to create employee");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h2 style={styles.title}>Add Employee</h2>
                <p style={styles.subtitle}>Personal, job & payroll info</p>
            </div>

            <div style={styles.card}>
                <form onSubmit={handleSubmit}>

                    {/* BASIC */}
                    <Field label="Full Name *">
                        <input name="full_name" value={form.full_name} onChange={handleChange} style={styles.input} />
                    </Field>

                    <Field label="Department">
                        <input name="department" value={form.department} onChange={handleChange} style={styles.input} />
                    </Field>

                    <Field label="Designation">
                        <input name="designation" value={form.designation} onChange={handleChange} style={styles.input} />
                    </Field>

                    <Field label="Joining Date *">
                        <input type="date" name="joining_date" value={form.joining_date} onChange={handleChange} style={styles.input} />
                    </Field>

                    {/* PERSONAL */}
                    <h4 style={styles.section}>Personal</h4>

                    <Field label="Email">
                        <input name="email" value={form.email} onChange={handleChange} style={styles.input} />
                    </Field>

                    <Field label="Mobile">
                        <input name="mobile" value={form.mobile} onChange={handleChange} style={styles.input} />
                    </Field>

                    <Field label="Date of Birth">
                        <input type="date" name="dob" value={form.dob} onChange={handleChange} style={styles.input} />
                    </Field>

                    <Field label="Gender">
                        <select name="gender" value={form.gender} onChange={handleChange} style={styles.input}>
                            <option value="">Select</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </Field>

                    <Field label="PAN">
                        <input name="pan" value={form.pan} onChange={handleChange} style={styles.input} />
                    </Field>

                    {/* PAYROLL */}
                    <h4 style={styles.section}>Payroll</h4>

                    <Field label="Bank Account">
                        <input name="bank_account" value={form.bank_account} onChange={handleChange} style={styles.input} />
                    </Field>

                    <Field label="IFSC">
                        <input name="ifsc" value={form.ifsc} onChange={handleChange} style={styles.input} />
                    </Field>

                    <Field label="Tax Regime">
                        <select name="tax_regime" value={form.tax_regime} onChange={handleChange} style={styles.input}>
                            <option value="NEW">New</option>
                            <option value="OLD">Old</option>
                        </select>
                    </Field>

                    <div style={styles.actions}>
                        <button type="button" style={styles.secondaryBtn} onClick={() => navigate(-1)}>
                            Cancel
                        </button>

                        <button type="submit" style={styles.primaryBtn} disabled={loading}>
                            {loading ? "Creating…" : "Create Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Field = ({ label, children }) => (
    <div style={styles.field}>
        <label style={styles.label}>{label}</label>
        {children}
    </div>
);

export default EmployeeCreate;

/* STYLES */
const styles = {
    page: { padding: 28, background: "#f4f6f8", minHeight: "100vh" },
    header: { marginBottom: 24 },
    title: { fontSize: 24, fontWeight: 700 },
    subtitle: { fontSize: 14, color: "#6b7280" },
    card: { maxWidth: 520, background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" },
    field: { display: "flex", flexDirection: "column", marginBottom: 14 },
    label: { fontSize: 13, fontWeight: 600, marginBottom: 6 },
    input: { padding: "10px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 },
    section: { marginTop: 20, color: "#2563eb" },
    actions: { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 },
    primaryBtn: { background: "#2563eb", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none", fontWeight: 600 },
    secondaryBtn: { background: "#e5e7eb", color: "#111827", padding: "10px 20px", borderRadius: 8, border: "1px solid #d1d5db" },
};
