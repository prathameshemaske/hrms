import api from '../config/axios';

export const getBugComponents = async () => {
    const res = await api.get('/bugs/components');
    return res.data;
};
