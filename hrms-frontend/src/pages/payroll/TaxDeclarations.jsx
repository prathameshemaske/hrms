import { useEffect, useState } from "react";
import api from "../../config/axios";

const TaxDeclarations = () => {
    const [data, setData] = useState({
        regime: "NEW",
        section_80c: 0,
        section_80d: 0,
        hra_rent: 0,
        landlord_pan: "",
        home_loan_interest: 0,
    });

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setLoading(true);
        api.get("/tax-declarations").then((res) => {
            if (res.data) setData(res.data);
            setLoading(false);
        });
    }, []);

    const save = async () => {
        setSaving(true);
        await api.post("/tax-declarations", data);
        alert("Tax declarations saved");
        setSaving(false);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: 24, maxWidth: 600 }}>
            <h2>My Tax Declarations</h2>

            <label>Tax Regime</label>
            <select
                value={data.regime}
                onChange={(e) => setData({ ...data, regime: e.target.value })}
            >
                <option value="NEW">New Regime</option>
                <option value="OLD">Old Regime</option>
            </select>

            <h4>80C (PPF, LIC, ELSS etc)</h4>
            <input
                type="number"
                value={data.section_80c}
                onChange={(e) => setData({ ...data, section_80c: Number(e.target.value) })}
            />

            <h4>80D (Medical Insurance)</h4>
            <input
                type="number"
                value={data.section_80d}
                onChange={(e) => setData({ ...data, section_80d: Number(e.target.value) })}
            />

            <h4>HRA Rent Paid (Annual)</h4>
            <input
                type="number"
                value={data.hra_rent}
                onChange={(e) => setData({ ...data, hra_rent: Number(e.target.value) })}
            />

            <h4>Landlord PAN</h4>
            <input
                value={data.landlord_pan}
                onChange={(e) => setData({ ...data, landlord_pan: e.target.value })}
            />

            <h4>Home Loan Interest (Section 24)</h4>
            <input
                type="number"
                value={data.home_loan_interest}
                onChange={(e) =>
                    setData({ ...data, home_loan_interest: Number(e.target.value) })
                }
            />

            <div style={{ marginTop: 20 }}>
                <button onClick={save} disabled={saving}>
                    Save Declarations
                </button>
            </div>
        </div>
    );
};

export default TaxDeclarations;
