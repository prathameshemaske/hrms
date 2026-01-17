import { useEffect, useState } from "react";
import api from "../../config/axios";

const SalaryHistory = () => {
    const [data, setData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        api
            .get("/salary-history", { params: { year } })
            .then((res) => setData(res.data));
    }, [year]);

    return (
        <div style={{ padding: 24 }}>
            <h2>Salary History</h2>

            <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>
            </select>

            <table border="1" cellPadding="8" width="100%" style={{ marginTop: 15 }}>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Gross</th>
                        <th>PF</th>
                        <th>TDS</th>
                        <th>Bonus</th>
                        <th>Arrears</th>
                        <th>Net</th>
                        <th>Payslip</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((r) => (
                        <tr key={r.id}>
                            <td>{r.month}/{r.year}</td>
                            <td>{r.gross}</td>
                            <td>{r.pf}</td>
                            <td>{r.tds}</td>
                            <td>{r.bonus}</td>
                            <td>{r.arrears}</td>
                            <td><b>{r.net}</b></td>
                            <td>
                                <button
                                    onClick={() =>
                                        window.open(
                                            `${import.meta.env.VITE_API_URL}/salary-history/${r.id}/pdf`,
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
        </div>
    );
};

export default SalaryHistory;
