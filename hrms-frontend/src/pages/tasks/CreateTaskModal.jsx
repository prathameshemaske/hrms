import { useEffect, useState } from "react";
import { createTask } from "../../api/tasks.api";
import api from "../../config/axios";

const CreateTaskModal = ({ workspaceId, onClose, onCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [due, setDue] = useState("");
    const [assignee, setAssignee] = useState("");
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        api.get("/employees").then(res => setEmployees(res.data));
    }, []);

    const submit = async () => {
        if (!title) {
            alert("Title required");
            return;
        }

        await createTask({
            title,
            description,
            priority,
            due_date: due || null,
            assigned_to: assignee || null,
            workspace_id: workspaceId
        });

        onCreated();
        onClose();
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h3>Create Task</h3>

                <input
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <select onChange={e => setPriority(e.target.value)} value={priority}>
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                </select>

                <input type="date" onChange={e => setDue(e.target.value)} />

                <select onChange={e => setAssignee(e.target.value)}>
                    <option value="">Assign to</option>
                    {employees.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.full_name}
                        </option>
                    ))}
                </select>

                <div style={styles.actions}>
                    <button onClick={submit}>Create</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModal;

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        width: 320,
        display: "flex",
        flexDirection: "column",
        gap: 8
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 10
    }
};
