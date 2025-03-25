import { useQuery} from "@tanstack/react-query";
import { getSections } from "../../src/services/sectionServices";

export const useSections = () => {
   
    const { data: sections, isLoading } = useQuery({ queryKey: ["sections"], queryFn: getSections });

    // const addSectionMutation = useMutation(createSection, {
    //     onSuccess: () => queryClient.invalidateQueries(["sections"]),
    // });

    return { sections, isLoading };
};