import api from '../config/axios';

export const getDashboardSummary = async () => {
  const res = await api.get('/reports/dashboard-summary');
  return res.data;
};

export const getTestPassPercentage = async () => {
  const res = await api.get('/reports/test-pass-percentage');
  return res.data;
};

export const getDefectDensity = async () => {
  const res = await api.get('/reports/defect-density');
  return res.data;
};
