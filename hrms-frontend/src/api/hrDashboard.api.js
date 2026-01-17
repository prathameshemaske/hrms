import api from '../config/axios';

export const getHrDashboardSummary = async () => {
    const res = await api.get('/reports/hr/summary');
    return res.data;
};
