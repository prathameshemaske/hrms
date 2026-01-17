import api from '../config/axios';

export const assignBug = async (bugId, assignedTo) => {
    const res = await api.put(`/bugs/${bugId}/assign`, { assignedTo });
    return res.data;
};

export const getBugAssignmentHistory = async (bugId) => {
    const res = await api.get(`/bugs/${bugId}/assignment-history`);
    return res.data;
};
