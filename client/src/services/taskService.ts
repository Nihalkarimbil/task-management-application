import { axiosInstance } from "./api";

export const getTask = async () => {
    const { data } = await axiosInstance.get("/task/get");
   
    return data.data;
};