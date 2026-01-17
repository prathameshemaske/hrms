import api from '../config/axios';

export const getBugComments = async (bugId) => {
  const res = await api.get(`/bugs/${bugId}/comments`);
  return res.data;
};

export const addBugComment = async (bugId, payload) => {
  const res = await api.post(`/bugs/${bugId}/comments`, payload);
  return res.data;
};
