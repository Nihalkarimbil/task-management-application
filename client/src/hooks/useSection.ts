import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
    createSection,
    deleteSection,
    getSections,
} from "../../src/services/sectionServices";

//React Query Hooks for managing sections
export const useSections = () => {
    const queryClient = useQueryClient(); 

    const { data: sections, isLoading, refetch: fetchOn } = useQuery({
        queryKey: ["sections"],
        queryFn: getSections,
    });

    const addSectionMutation = useMutation({
        mutationFn: createSection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sections"] });
        },
    });

    const dltSectionMutation = useMutation({
        mutationFn: deleteSection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sections"] });
        },
    });

    return {
        sections,
        isLoading,
        addSectionMutation,
        fetchOn,
        dltSectionMutation,
    };
};
