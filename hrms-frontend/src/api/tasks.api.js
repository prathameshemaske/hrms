import api from "../config/axios";

/* Workspaces */
export const getWorkspaces = async () => {
    const res = await api.get("/tasks/workspaces");
    return res.data;
};

/* Board */
export const getTaskBoard = async (workspaceId) => {
    const res = await api.get("/tasks/board", {
        params: { workspace: workspaceId }
    });
    return res.data;
};

/* Create */
export const createTask = async (payload) => {
    const res = await api.post("/tasks", payload);
    return res.data;
};

/* Update status */
export const updateTaskStatus = async (id, status) => {
    const res = await api.put(`/tasks/${id}/status`, { status });
    return res.data;
};
