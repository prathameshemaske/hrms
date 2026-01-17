import { useState } from "react";
import api from "../../config/axios";

const SalaryModal = ({ payslip, onClose }) => {
    const [pf, setPf] = useState(payslip.pf);
    const [tds, setTds] = useState(payslip.tds);
    const [pt, setPt] = useState(payslip.professional_tax || 0);
    const [bonus, setBonus] = useState(payslip.bonus || 0);
    const [arrears, setArrears] = useState(payslip.arrears || 0);
    const [saving, setSaving] = useState(false);
    const [calculating, setCalculating] = useState(false);

    const baseGross = Number(payslip.gross_salary);
    const totalGross = baseGross + Number(bonus) + Number(arrears);
    const net = totalGross - Number(pf) - Number(tds) - Number(pt);

    // 🔥 Auto-TDS Engine
    const autoCalculateTDS = async () => {
        setCalculating(true);
        try {
            const res = await api.post("/payroll/calculate-tds", {
                employee_id: payslip.employee_id,
                annual_gross: totalGross * 12,
                pf_annual: pf * 12,
                bonus_annual: bonus * 12,
                arrears_annual: arrears * 12,
            });

            setTds(Number(res.data.monthly_tds));
        } finally {
            setCalculating(false);
        }
    };

    const saveAll = async () => {
        setSaving(true);

        await api.post("/payroll/override", {
            payslip_id: payslip.id,
            pf,
            tds,
            professional_tax: pt,
        });

        await api.post("/payroll/bonus-arrears", {
            payslip_id: payslip.id,
            bonus,
            arrears,
        });

        setSaving(false);
        alert("Salary updated");
        onClose();
    };

    return (
        <div style={overlay}>
            <div style={modal}>
                <h3>{payslip.full_name} — Salary Control</h3>

                <table border="1" cellPadding="8" width="100%">
                    <tbody>
                        <tr>
                            <td>Base Gross</td>
                            <td>{baseGross}</td>
                        </tr>

                        <tr>
                            <td>Bonus</td>
                            <td>
                                <input
                                    type="number"
                                    value={bonus}
                                    disabled={payslip.is_employee_locked}
                                    onChange={(e) => setBonus(Number(e.target.value))}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Arrears</td>
                            <td>
                                <input
                                    type="number"
                                    value={arrears}
                                    disabled={payslip.is_employee_locked}
                                    onChange={(e) => setArrears(Number(e.target.value))}
                                />
                            </td>
                        </tr>

                        <tr style={{ background: "#f0f0f0" }}>
                            <td><b>Total Gross</b></td>
                            <td><b>{totalGross}</b></td>
                        </tr>

                        <tr>
                            <td>PF</td>
                            <td>
                                <input
                                    type="number"
                                    value={pf}
                                    disabled={payslip.is_employee_locked}
                                    onChange={(e) => setPf(Number(e.target.value))}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>TDS</td>
                            <td>
                                <input
                                    type="number"
                                    value={tds}
                                    disabled={payslip.is_employee_locked}
                                    onChange={(e) => setTds(Number(e.target.value))}
                                />
                                {!payslip.is_employee_locked && (
                                    <button
                                        onClick={autoCalculateTDS}
                                        disabled={calculating}
                                        style={{ marginLeft: 8 }}
                                    >
                                        {calculating ? "Calculating..." : "Auto-Calculate"}
                                    </button>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td>Professional Tax</td>
                            <td>
                                <input
                                    type="number"
                                    value={pt}
                                    disabled={payslip.is_employee_locked}
                                    onChange={(e) => setPt(Number(e.target.value))}
                                />
                            </td>
                        </tr>

                        <tr style={{ fontWeight: "bold" }}>
                            <td>Net Salary</td>
                            <td>{net}</td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
                    {!payslip.is_employee_locked && (
                        <button onClick={saveAll} disabled={saving}>
                            Save Changes
                        </button>
                    )}

                    {payslip.is_employee_locked && (
                        <span style={{ color: "red" }}>Employee is locked</span>
                    )}

                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const modal = {
    background: "#fff",
    padding: 20,
    width: 450,
    borderRadius: 6,
};

export default SalaryModal;
