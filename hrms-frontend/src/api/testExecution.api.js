import api from '../config/axios';

export const executeTestCase = async (payload) => {
  const res = await api.post('/test-executions', payload);
  return res.data;
};

export const getExecutionsByTestCase = async (testCaseId) => {
  const res = await api.get(`/test-executions/${testCaseId}`);
  return res.data;
};
