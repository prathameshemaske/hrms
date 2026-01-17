import { useEffect, useState } from "react";
import {
    getTaskBoard,
    getWorkspaces,
    updateTaskStatus
} from "../../api/tasks.api";
import CreateTaskModal from "./CreateTaskModal";

const columns = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [workspaces, setWorkspaces] = useState([]);
    const [workspace, setWorkspace] = useState("");
    const [showCreate, setShowCreate] = useState(false);

    const load = async (ws) => {
        if (!ws) return;
        const data = await getTaskBoard(ws);
        setTasks(data);
    };

    useEffect(() => {
        getWorkspaces().then((w) => {
            setWorkspaces(w);
            if (w.length) {
                setWorkspace(w[0].id);
                load(w[0].id);
            }
        });
    }, []);

    return (
        <div style={styles.page}>
            {/* Header */}
            <div style={styles.header}>
                <select
                    value={workspace}
                    onChange={(e) => {
                        const ws = Number(e.target.value);
                        setWorkspace(ws);
                        load(ws);
                    }}
                    style={styles.select}
                >
                    <option value="">Select Workspace</option>
                    {workspaces.map((w) => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                </select>

                <button
                    style={styles.createBtn}
                    onClick={() => setShowCreate(true)}
                    disabled={!workspace}
                >
                    + Create Task
                </button>
            </div>

            {/* Board */}
            <div style={styles.board}>
                {columns.map((col) => (
                    <div key={col} style={styles.column}>
                        <h4>{col.replace("_", " ")}</h4>

                        {tasks
                            .filter((t) => t.status === col)
                            .map((task) => (
                                <div key={task.id} style={styles.card}>
                                    <b>{task.title}</b>
                                    <p>{task.description}</p>
                                    <small>Assigned: {task.assigned_to_name || "—"}</small>

                                    <div style={styles.actions}>
                                        {columns
                                            .filter((s) => s !== col)
                                            .map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() =>
                                                        updateTaskStatus(task.id, s).then(() => load(workspace))
                                                    }
                                                >
                                                    → {s}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
            </div>

            {showCreate && (
                <CreateTaskModal
                    workspaceId={workspace}
                    onClose={() => setShowCreate(false)}
                    onCreated={() => load(workspace)}
                />
            )}
        </div>
    );
};

export default TaskBoard;

/* ================= STYLES ================= */

const styles = {
    page: { padding: 20 },
    header: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 20
    },
    select: { padding: 8 },
    createBtn: {
        padding: "8px 14px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer"
    },
    board: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16
    },
    column: {
        background: "#f4f6f8",
        padding: 12,
        borderRadius: 8,
        minHeight: "70vh"
    },
    card: {
        background: "#fff",
        padding: 10,
        borderRadius: 6,
        marginBottom: 10,
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
    },
    actions: {
        marginTop: 6,
        display: "flex",
        gap: 4,
        flexWrap: "wrap"
    }
};
