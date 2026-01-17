import { useEffect, useState } from "react";
import api from "../../config/axios";

const OfferLetter = () => {
    const [candidates, setCandidates] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        api.get("/candidates").then(res => setCandidates(res.data));
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h2>Offer Letter</h2>

            <select onChange={(e) => setSelected(e.target.value)}>
                <option>Select candidate</option>
                {candidates.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>

            {selected && (
                <button
                    onClick={() =>
                        window.open(
                            `${import.meta.env.VITE_API_URL}/documents/offer-letter/${selected}`,
                            "_blank"
                        )
                    }
                >
                    Download Offer Letter
                </button>
            )}
        </div>
    );
};

export default OfferLetter;
