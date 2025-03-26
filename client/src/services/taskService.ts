import { Task } from "@/ui/taskCreateModal";
import { axiosInstance } from "./api";
;

//centrelised api calls for Tasks
export const getTask = async () => {
    const { data } = await axiosInstance.get("/task/get");
   
    return data.data;
};

export const addTask=async(task:Task)=>{
    const response= await axiosInstance.post("task/add", task)
    return response.data
}


