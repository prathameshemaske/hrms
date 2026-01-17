import { useEffect, useState } from "react";
import api from "../../config/axios";

const HrSummaryCards = () => {
    const [data, setData] = useState(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await api.get("/reports/hr-dashboard");
                setData(res.data);
            } catch (err) {
                console.warn("HR dashboard API not ready yet");
                setFailed(true);
            }
        };

        load();
    }, []);

    if (failed) {
        return (
            <div style={{ marginTop: 20, color: "#6b7280" }}>
                HR metrics not available yet
            </div>
        );
    }

    if (!data) {
        return <p>Loading HR metrics…</p>;
    }

    return (
        <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
            <Card title="Employees" value={data.employees || 0} />
            <Card title="Present" value={data.present || 0} />
            <Card title="On Leave" value={data.on_leave || 0} />
        </div>
    );
};

const Card = ({ title, value }) => (
    <div
        style={{
            background: "#fff",
            padding: 16,
            borderRadius: 10,
            minWidth: 160,
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
    >
        <p style={{ color: "#6b7280", fontSize: 13 }}>{title}</p>
        <h3 style={{ marginTop: 6 }}>{value}</h3>
    </div>
);

export default HrSummaryCards;
