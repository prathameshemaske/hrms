import api from '../config/axios';

export const bulkExecuteTestSuite = async (payload) => {
  const res = await api.post('/test-suites/bulk-execute', payload);
  return res.data;
};
