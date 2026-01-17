import api from '../config/axios';

export const getAllBugLabels = async () => {
    const res = await api.get('/bugs/labels');
    return res.data;
};

export const getBugLabels = async (bugId) => {
    const res = await api.get(`/bugs/${bugId}/labels`);
    return res.data;
};

export const addBugLabels = async (bugId, labelIds) => {
    const res = await api.post(`/bugs/${bugId}/labels`, { labelIds });
    return res.data;
};

export const removeBugLabel = async (bugId, labelId) => {
    const res = await api.delete(`/bugs/${bugId}/labels/${labelId}`);
    return res.data;
};
