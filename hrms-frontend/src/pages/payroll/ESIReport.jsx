import { useEffect, useState } from "react";
import api from "../../config/axios";

const ESIReport = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("/reports/esi").then(res => setData(res.data));
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h2>ESI Report</h2>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Gross</th>
                        <th>Employee ESI</th>
                        <th>Employer ESI</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(r => (
                        <tr key={r.employee_id}>
                            <td>{r.name}</td>
                            <td>{r.gross}</td>
                            <td>{r.esi_employee}</td>
                            <td>{r.esi_employer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ESIReport;
