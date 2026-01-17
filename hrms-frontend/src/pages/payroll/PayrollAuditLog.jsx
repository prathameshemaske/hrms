import { useEffect, useState } from "react";
import api from "../../config/axios";

const PayrollAuditLog = () => {
    const [logs, setLogs] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const res = await api.get("/payroll/audit-logs", {
                params: { month, year },
            });
            setLogs(res.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLogs();
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h2>Payroll Audit Log</h2>

            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <input
                    type="number"
                    min="1"
                    max="12"
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                />
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                />
                <button onClick={loadLogs}>Load</button>
            </div>

            {loading && <p>Loading...</p>}

            <table border="1" cellPadding="8" width="100%">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Employee</th>
                        <th>Month</th>
                        <th>Action</th>
                        <th>Old Value</th>
                        <th>New Value</th>
                        <th>Changed By</th>
                    </tr>
                </thead>

                <tbody>
                    {logs.map((l) => (
                        <tr key={l.id}>
                            <td>{new Date(l.changed_at).toLocaleString()}</td>
                            <td>{l.employee_name}</td>
                            <td>{l.month}/{l.year}</td>
                            <td>{l.action}</td>
                            <td>{l.old_value ?? "-"}</td>
                            <td>{l.new_value ?? "-"}</td>
                            <td>{l.changed_by}</td>
                        </tr>
                    ))}

                    {logs.length === 0 && !loading && (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
                                No audit records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PayrollAuditLog;
