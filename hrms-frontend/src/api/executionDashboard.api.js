import api from '../config/axios';

export const getExecutionSummary = async () => {
  const res = await api.get('/reports/execution-summary');
  return res.data;
};
