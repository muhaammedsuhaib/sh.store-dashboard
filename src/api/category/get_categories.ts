import { useQuery, QueryClient } from "@tanstack/react-query";
import APIClientPrivate from "../../utils/apiClient";
/**
 * 🔹 Fetch categories from API
 * @returns {Promise<any[]>} - List of categories
 */
const fetchCategories = async (): Promise<any> => {
  try {
    const response = await APIClientPrivate.get("/category");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    throw (
      error.response?.data ||
      new Error("An unexpected error occurred while fetching categories.")
    );
  }
};

/**
 * 🔹 React Query hook for fetching and caching categories
 */
export const useCategories = () => {
  return useQuery<any>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * 🔹 Utility to manually refetch categories from outside React (e.g. after CRUD ops)
 * @param {QueryClient} queryClient - React Query Client instance
 */
export const refetchCategories = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["categories"] });
};
