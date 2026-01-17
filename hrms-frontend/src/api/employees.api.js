import api from '../config/axios';

export const getAllEmployees = async () => {
    const res = await api.get('/employees');
    return res.data;
};

export const createEmployee = async (payload) => {
    const res = await api.post('/employees', payload);
    return res.data;
};

export const getEmployeeById = async (id) => {
    const res = await api.get(`/employees/${id}`);
    return res.data;
};

export const updateEmployeeStatus = async (id, status) => {
    const res = await api.put(`/employees/${id}/status`, { status });
    return res.data;
};
export const updateEmployee = (id, data) =>
    api.put(`/employees/${id}`, data).then(res => res.data);