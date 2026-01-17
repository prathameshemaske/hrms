import api from '../config/axios';

export const getAllTestSuites = async () => {
  const res = await api.get('/test-suites');
  return res.data;
};

export const getTestSuiteById = async (id) => {
  const res = await api.get(`/test-suites/${id}`);
  return res.data;
};

export const createTestSuite = async (payload) => {
  const res = await api.post('/test-suites', payload);
  return res.data;
};
