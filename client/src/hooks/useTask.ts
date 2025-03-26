import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { addTask, getTask } from "@/services/taskService";

export const useTask = () => {
    const queryClient = new QueryClient();
    const { data: Tasks, isLoading: Loading } = useQuery({ queryKey: ["Tasks"], queryFn: getTask });
    const addTaskMutation = useMutation({
        mutationFn: addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Tasks"] });
        },
    });
    return { Tasks, Loading, addTaskMutation }
}
