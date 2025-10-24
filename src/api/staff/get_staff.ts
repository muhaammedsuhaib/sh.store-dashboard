import { useQuery, QueryClient } from "@tanstack/react-query";
import APIClientPrivate from "../../utils/apiClient";

/**
 * Fetch staff data from API
 */
const fetchStaff = async (): Promise<any[]> => {
  const response = await APIClientPrivate.get("/staff");
  return response.data;
};

/**
 * Custom hook to access staff data globally
 */
export const useStaff = () => {
  return useQuery<any[]>({
    queryKey: ["staff"],
    queryFn: fetchStaff,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

/**
 * Utility to manually refetch staff data from outside React (e.g. after CRUD ops)
 */
export const refetchStaff = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["staff"] });
};
