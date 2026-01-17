import api from '../config/axios';

export const getBugs = async () => {
  const res = await api.get('/bugs');
  return res.data;
};

export const createBug = async (payload) => {
  const res = await api.post('/bugs', payload);
  return res.data;
};

export const updateBugStatus = async (bugId, status) => {
  const res = await api.put(`/bugs/${bugId}/status`, { status });
  return res.data;
};

export const getBugById = async (id) => {
  const res = await api.get(`/bugs/${id}`);
  return res.data;
};

export const closeBug = async (bugId) => {
  const res = await api.put(`/bugs/${bugId}/close`);
  return res.data;
};

export const getAllBugs = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await api.get(`/bugs?${params}`);
  return res.data;
};

export const markBugAsDuplicate = async (bugId, duplicateOfBugId, reason) => {
  const res = await api.put(`/bugs/${bugId}/duplicate`, {
    duplicateOfBugId,
    reason,
  });
  return res.data;
};


