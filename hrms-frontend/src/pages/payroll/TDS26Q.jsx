import { useEffect, useState } from "react";
import api from "../../config/axios";

const TDS26Q = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("/tds/26q").then((res) => setData(res.data));
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h2>TDS Challan (26Q)</h2>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>PAN</th>
                        <th>TDS</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((r) => (
                        <tr key={r.pan}>
                            <td>{r.name}</td>
                            <td>{r.pan}</td>
                            <td>{r.tds}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => window.open(`${import.meta.env.VITE_API_URL}/tds/26q/file`)}>
                Download 26Q File
            </button>
        </div>
    );
};

export default TDS26Q;
