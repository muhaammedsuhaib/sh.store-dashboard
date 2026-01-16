import { useQuery, QueryClient } from "@tanstack/react-query";
import APIClientPrivate from "../../utils/apiClient";

/* ================= TYPES ================= */
export interface CategoryStats {
  total_categories_count: number;
  active_categories_count: number;
  parent_categories_count: number;
  subcategories_count: number;
}

/* ================= FETCH FUNCTION ================= */
const fetchCategoriesStats = async (): Promise<CategoryStats> => {
  try {
    const response = await APIClientPrivate.get("/category/stats");
    return response.data.data; // accessing the `data` object from API
  } catch (error: any) {
    console.error("Error fetching category stats:", error);
    throw (
      error.response?.data ||
      new Error("An unexpected error occurred while fetching category stats.")
    );
  }
};

/* ================= REACT QUERY HOOK ================= */
export const useCategoriesStats = () => {
  return useQuery<CategoryStats>({
    queryKey: ["categories_stats"],
    queryFn: fetchCategoriesStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

/* ================= MANUAL REFRESH UTILITY ================= */
export const refetchCategoriesStats = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["categories_stats"] });
};
