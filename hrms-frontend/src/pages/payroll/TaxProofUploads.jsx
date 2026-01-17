import { useEffect, useState } from "react";
import api from "../../config/axios";

const TaxProofUploads = () => {
    const [files, setFiles] = useState([]);
    const [type, setType] = useState("80C");

    const upload = async (file) => {
        const form = new FormData();
        form.append("type", type);
        form.append("file", file);

        await api.post("/tax-proofs/upload", form);
        alert("Uploaded");
        load();
    };

    const load = () => {
        api.get("/tax-proofs").then((res) => setFiles(res.data));
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h2>Tax Proof Uploads</h2>

            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="80C">80C</option>
                <option value="80D">80D</option>
                <option value="HRA">HRA</option>
                <option value="HOME_LOAN">Home Loan</option>
            </select>

            <input type="file" onChange={(e) => upload(e.target.files[0])} />

            <ul>
                {files.map((f) => (
                    <li key={f.id}>
                        {f.type} — <a href={f.url} target="_blank">View</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaxProofUploads;
