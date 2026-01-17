import { useEffect, useState } from "react";
import api from "../../config/axios";

const MyPayslips = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("/payroll/payslips").then((res) => setData(res.data));
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h2>My Payslips</h2>

            <table border="1" cellPadding="8" width="100%">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Gross</th>
                        <th>PF</th>
                        <th>TDS</th>
                        <th>Net</th>
                        <th>PDF</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((p) => (
                        <tr key={p.id}>
                            <td>{p.month}/{p.year}</td>
                            <td>{p.gross_salary}</td>
                            <td>{p.pf}</td>
                            <td>{p.tds}</td>
                            <td><b>{p.net_salary}</b></td>
                            <td>
                                <button
                                    onClick={() =>
                                        window.open(
                                            `${import.meta.env.VITE_API_URL}/payroll/payslip/${p.id}/pdf`,
                                            "_blank"
                                        )
                                    }
                                >
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form-16 Download */}
            <div style={{ marginTop: 20 }}>
                <button
                    onClick={() =>
                        window.open(
                            `${import.meta.env.VITE_API_URL}/payroll/form16/2025`,
                            "_blank"
                        )
                    }
                >
                    Download Form-16
                </button>
            </div>
        </div>
    );
};

export default MyPayslips;
