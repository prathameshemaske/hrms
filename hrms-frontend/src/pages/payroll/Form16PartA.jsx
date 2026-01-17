import { useEffect, useState } from "react";
import api from "../../config/axios";

const Form16PartA = () => {
    const [data, setData] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        api.get("/form16/part-a", { params: { year } }).then((res) => setData(res.data));
    }, [year]);

    if (!data) return <p>Loading...</p>;

    return (
        <div style={{ padding: 24 }}>
            <h2>Form-16 Part-A</h2>

            <table border="1" cellPadding="8">
                <tbody>
                    <tr><td>Employer</td><td>{data.employer_name}</td></tr>
                    <tr><td>TAN</td><td>{data.tan}</td></tr>
                    <tr><td>PAN</td><td>{data.pan}</td></tr>
                    <tr><td>Total TDS</td><td>{data.total_tds}</td></tr>
                </tbody>
            </table>

            <button onClick={() => window.open(`${import.meta.env.VITE_API_URL}/form16/part-a/${year}/pdf`)}>
                Download Part-A PDF
            </button>
        </div>
    );
};

export default Form16PartA;
