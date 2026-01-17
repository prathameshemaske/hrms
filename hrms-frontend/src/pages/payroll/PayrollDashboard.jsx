import { useEffect, useState } from "react";
import api from "../../config/axios";
import SalaryModal from "../../components/payroll/SalaryModal";

const PayrollDashboard = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [payslips, setPayslips] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [locked, setLocked] = useState(false);
    const [selectedPayslip, setSelectedPayslip] = useState(null);

    const loadPayslips = async () => {
        setLoading(true);
        try {
            const [payrollRes, attendanceRes] = await Promise.all([
                api.get("/payroll/payslips", { params: { month, year } }),
                api.get("/attendance/summary", { params: { month, year } })
            ]);

            setPayslips(payrollRes.data);
            setAttendance(attendanceRes.data);
            setLocked(payrollRes.data?.[0]?.is_locked || false);
        } finally {
            setLoading(false);
        }
    };

    const runPayroll = async () => {
        if (locked) return;
        await api.post("/payroll/run", { month, year });
        alert("Payroll run completed");
        loadPayslips();
    };

    const lockPayroll = async () => {
        await api.post("/payroll/lock", { month, year });
        alert("Payroll locked");
        setLocked(true);
    };

    const toggleEmployeeLock = async (p) => {
        await api.post("/payroll/employee-lock", {
            payslip_id: p.id,
            locked: !p.is_employee_locked,
        });
        loadPayslips();
    };

    const getAttendance = (employeeId) => {
        return attendance.find(a => a.employee_id === employeeId) || {
            present: 0,
            paid_leave: 0,
            lop: 0
        };
    };

    const totals = payslips.reduce(
        (acc, p) => {
            acc.gross += Number(p.final_gross || p.gross_salary || 0);
            acc.pf += Number(p.pf || 0);
            acc.tds += Number(p.tds || 0);
            acc.net += Number(p.net_salary || 0);
            return acc;
        },
        { gross: 0, pf: 0, tds: 0, net: 0 }
    );

    useEffect(() => {
        loadPayslips();
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h2>Payroll</h2>

            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <input type="number" min="1" max="12" value={month} onChange={(e) => setMonth(Number(e.target.value))} />
                <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
                <button onClick={loadPayslips}>Load</button>
                <button onClick={runPayroll} disabled={locked}>Run Payroll</button>
                <button onClick={lockPayroll} disabled={locked}>Lock Month</button>

                <span style={{
                    padding: "6px 12px",
                    background: locked ? "#ffdddd" : "#ddffdd",
                    border: "1px solid #ccc",
                }}>
                    {locked ? "LOCKED" : "OPEN"}
                </span>
            </div>

            {loading && <p>Loading...</p>}

            <table border="1" cellPadding="8" width="100%">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Present</th>
                        <th>Paid Leave</th>
                        <th>LOP</th>
                        <th>Final Gross</th>
                        <th>PF</th>
                        <th>TDS</th>
                        <th>Net</th>
                        <th>Lock</th>
                    </tr>
                </thead>

                <tbody>
                    {payslips.map((p) => {
                        const a = getAttendance(p.employee_id);

                        return (
                            <tr
                                key={p.id}
                                style={{
                                    cursor: "pointer",
                                    background: p.is_employee_locked ? "#fff2f2" : "white",
                                }}
                                onClick={() => setSelectedPayslip(p)}
                            >
                                <td>{p.full_name}</td>
                                <td>{a.present}</td>
                                <td>{a.paid_leave}</td>
                                <td>{a.lop}</td>
                                <td>{p.final_gross || p.gross_salary}</td>
                                <td>{p.pf}</td>
                                <td>{p.tds}</td>
                                <td><b>{p.net_salary}</b></td>

                                <td onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => toggleEmployeeLock(p)}
                                        style={{
                                            background: p.is_employee_locked ? "#ffdddd" : "#ddffdd",
                                            border: "1px solid #aaa",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {p.is_employee_locked ? "🔒" : "🔓"}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}

                    <tr style={{ fontWeight: "bold", background: "#f0f0f0" }}>
                        <td>Total</td>
                        <td colSpan="3"></td>
                        <td>{totals.gross}</td>
                        <td>{totals.pf}</td>
                        <td>{totals.tds}</td>
                        <td>{totals.net}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <div style={{ marginTop: 20 }}>
                <button
                    disabled={!locked}
                    onClick={() =>
                        window.open(
                            `${import.meta.env.VITE_API_URL}/payroll/bank-file/${month}/${year}`,
                            "_blank"
                        )
                    }
                >
                    Download Bank Salary File
                </button>
                {!locked && <p>Bank file is available only after payroll is locked.</p>}
            </div>

            {selectedPayslip && (
                <SalaryModal
                    payslip={selectedPayslip}
                    onClose={() => setSelectedPayslip(null)}
                />
            )}
        </div>
    );
};

export default PayrollDashboard;
