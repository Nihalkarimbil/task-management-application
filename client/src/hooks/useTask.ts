import { useQuery } from "@tanstack/react-query";
import { getTask } from "@/services/taskService";

export const useTask=()=>{
    const { data: Tasks, isLoading: Loading } = useQuery({ queryKey: ["Tasks"], queryFn: getTask });
    return {Tasks,Loading}
}
