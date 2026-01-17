import api from '../config/axios';

export const getAllTestCases = async () => {
  const res = await api.get('/test-cases');
  return res.data;
};

export const getTestCaseById = async (id) => {
  const res = await api.get(`/test-cases/${id}`);
  return res.data;
};

export const createTestCase = async (payload) => {
  const res = await api.post('/test-cases', payload);
  return res.data;
};
