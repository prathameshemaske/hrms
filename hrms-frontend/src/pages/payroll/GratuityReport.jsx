import { useEffect, useState } from "react";
import api from "../../config/axios";

const GratuityReport = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("/reports/gratuity").then(res => setData(res.data));
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h2>Gratuity Register</h2>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Years</th>
                        <th>Last Basic</th>
                        <th>Gratuity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(r => (
                        <tr key={r.employee_id}>
                            <td>{r.name}</td>
                            <td>{r.years}</td>
                            <td>{r.basic}</td>
                            <td>{r.gratuity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GratuityReport;
