import { axiosInstance } from "./api";

export const getSections = async () => {
    const { data } = await axiosInstance.get("/section/get");
    
    return data.data;
};

export const createSection = async (name: string) => {
    const { data } = await axiosInstance.post("/section", { name });
    return data;
};