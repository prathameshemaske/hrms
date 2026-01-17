import api from '../config/axios';

export const getBugHistory = async (bugId) => {
  const res = await api.get(`/bugs/${bugId}/history`);
  return res.data;
};
