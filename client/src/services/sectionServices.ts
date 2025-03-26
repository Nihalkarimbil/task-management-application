import { axiosInstance } from "./api";

//centrelised api calls for sections
export const getSections = async () => {
    const { data } = await axiosInstance.get("/section/get");
    
    return data.data;
};

export const createSection = async ({ name }: { name: string }) => {
    const response = await axiosInstance.post("/section/add", { name });
    return response.data;
};


export const deleteSection= async(sectionId:string)=>{
    const response= await axiosInstance.put(`/section/delete/${sectionId}`)
    return response.data
}