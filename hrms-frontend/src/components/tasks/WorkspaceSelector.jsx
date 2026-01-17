import { useEffect, useState } from "react";
import { getWorkspaces } from "../../api/tasks.api";

const WorkspaceSelector = ({ value, onChange }) => {
    const [workspaces, setWorkspaces] = useState([]);

    useEffect(() => {
        getWorkspaces().then(setWorkspaces);
    }, []);

    return (
        <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            style={{
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ddd",
                marginBottom: 12,
            }}
        >
            <option value="">All Workspaces</option>
            {workspaces.map((w) => (
                <option key={w.id} value={w.id}>
                    {w.name}
                </option>
            ))}
        </select>
    );
};

export default WorkspaceSelector;
