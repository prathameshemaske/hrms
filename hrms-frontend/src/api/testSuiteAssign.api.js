import api from '../config/axios';

export const assignTestCasesToSuite = async (payload) => {
  const res = await api.post('/test-suites/assign-testcases', payload);
  return res.data;
};
