import { useQuery, QueryClient } from "@tanstack/react-query";
import APIClientPrivate from "../../utils/apiClient";

interface CategoriesParams {
  search?: string;
  status?: string;
  parent?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

/**
 * 🔹 Fetch categories from API with optional filters
 */
const fetchCategories = async (params?: CategoriesParams): Promise<any> => {
  try {
    const response = await APIClientPrivate.get("/category", { params });
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
export const useCategories = (params?: CategoriesParams) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => fetchCategories(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

/**
 * 🔹 Utility to manually refetch categories from outside React
 */
export const refetchCategories = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["categories"] });
};
