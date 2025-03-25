import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createSection, getSections } from "../../src/services/sectionServices";

export const useSections = () => {
    
    const queryClient = new QueryClient();
    const { data: sections, isLoading ,refetch:fetchOn} = useQuery({
        queryKey: ["sections"],
        queryFn: getSections,
    });
    const addSectionMutation = useMutation({
        mutationFn: createSection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sections"] }); // Refresh sections after adding
        },
    });
    return { sections, isLoading ,addSectionMutation,fetchOn};
};
