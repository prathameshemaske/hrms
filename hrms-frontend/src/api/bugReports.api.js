import api from '../config/axios';

export const getBugSummary = async () => {
    const res = await api.get('/reports/bugs/summary');
    return res.data;
};
