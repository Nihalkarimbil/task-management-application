import { axiosInstance } from "./api";

export const getSections = async () => {
    const { data } = await axiosInstance.get("/section/get");
    
    return data.data;
};

export const createSection = async ({ name }: { name: string }) => {
    const response = await axiosInstance.post("/section/add", { name });
    return response.data;
};