import api from '../config/axios';

export const autoMarkAttendance = async () => {
    await api.post('/attendance/auto');
};

export const getMyAttendance = async () => {
    const res = await api.get('/attendance/my');
    return res.data;
};

export const markAttendance = async (payload) => {
    const res = await api.post('/attendance/mark', payload);
    return res.data;
};
