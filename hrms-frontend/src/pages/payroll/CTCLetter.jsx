import { useEffect, useState } from "react";
import api from "../../config/axios";

const CTCLetter = () => {
    const [employees, setEmployees] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        api.get("/employees").then(res => setEmployees(res.data));
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h2>CTC Letter</h2>

            <select onChange={(e) => setSelected(e.target.value)}>
                <option>Select employee</option>
                {employees.map(e => (
                    <option key={e.id} value={e.id}>{e.full_name}</option>
                ))}
            </select>

            {selected && (
                <button
                    onClick={() =>
                        window.open(
                            `${import.meta.env.VITE_API_URL}/documents/ctc-letter/${selected}`,
                            "_blank"
                        )
                    }
                >
                    Download CTC Letter
                </button>
            )}
        </div>
    );
};

export default CTCLetter;
