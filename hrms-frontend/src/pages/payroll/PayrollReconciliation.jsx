import { useEffect, useState } from "react";
import api from "../../config/axios";

const PayrollReconciliation = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        api.get("/payroll/reconciliation").then((res) => setData(res.data));
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div style={{ padding: 24 }}>
            <h2>Payroll Reconciliation</h2>

            <table border="1" cellPadding="8">
                <tbody>
                    <tr><td>Total Salary Paid</td><td>{data.salary_paid}</td></tr>
                    <tr><td>Total TDS</td><td>{data.tds}</td></tr>
                    <tr><td>PF Payable</td><td>{data.pf}</td></tr>
                    <tr><td>Bank File Total</td><td>{data.bank_total}</td></tr>
                </tbody>
            </table>

            {data.salary_paid !== data.bank_total && (
                <p style={{ color: "red" }}>Mismatch detected!</p>
            )}
        </div>
    );
};

export default PayrollReconciliation;
