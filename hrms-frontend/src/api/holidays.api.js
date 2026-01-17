import api from "../config/axios";

export const getAllHolidays = async (year) => {
    const res = await api.get("/holidays", {
        params: year ? { year } : {},
    });
    return res.data;
};

export const createHoliday = async (payload) => {
    const res = await api.post("/holidays", payload);
    return res.data;
};

export const deleteHoliday = async (id) => {
    const res = await api.delete(`/holidays/${id}`);
    return res.data;
};
