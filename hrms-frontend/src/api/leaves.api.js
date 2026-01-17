import api from '../config/axios';

export const getLeaveTypes = async () => {
    const res = await api.get('/leaves/types');
    return res.data;
};

export const applyLeave = async (payload) => {
    const res = await api.post('/leaves', payload);
    return res.data;
};

export const getMyLeaves = async () => {
    const res = await api.get('/leaves/my');
    return res.data;
};

export const getAllLeaves = async () => {
    const res = await api.get('/leaves');
    return res.data;
};

export const updateLeaveStatus = async (id, status) => {
    const res = await api.put(`/leaves/${id}/status`, { status });
    return res.data;
};
