import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import APIClientPrivate from "../../utils/apiClient";
import type {
  CategoriesParams,
  CategoryLabel,
  CategoryStats,
} from "../../types/category";

/* ======================================================
   COMMON CONFIGS
====================================================== */

/**
 * Multipart request configuration
 * Used for create & update category (image upload support)
 */
const multipartConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

/* ======================================================
   CREATE CATEGORY
====================================================== */

/**
 * Create category API call
 * @param {FormData} data - Category form data
 * @returns {Promise<any>} - API response
 */
const createCategory = async (data: FormData): Promise<any> => {
  try {
    const response = await APIClientPrivate.post(
      "/category",
      data,
      multipartConfig,
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Failed to create category.");
  }
};

/**
 * 🧠 React Query hook to create a category
 * Automatically refreshes category list after success
 */
const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

/* ======================================================
   UPDATE CATEGORY
====================================================== */

/**
 * Update category API call
 * Expects `id` inside FormData
 * @param {FormData} formData - Category update payload
 * @returns {Promise<any>} - API response
 */
const updateCategory = async (formData: FormData): Promise<any> => {
  try {
    const id = formData.get("id");

    if (!id) {
      throw new Error("Category ID is required for update.");
    }

    const response = await APIClientPrivate.put(
      `/category/${id}`,
      formData,
      multipartConfig,
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Failed to update category.");
  }
};

/**
 * 🧠 React Query hook to update category
 * Automatically refreshes category list after success
 */
const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

/* ======================================================
   GET SINGLE CATEGORY
====================================================== */

/**
 * Fetch single category by ID
 * @param {string} id - Category ID
 * @returns {Promise<any>} - Category data
 */
const getCategory = async (id: string): Promise<any> => {
  try {
    const response = await APIClientPrivate.get(`/category/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("Failed to fetch category.");
  }
};

/**
 * 🧠 React Query hook to get a single category
 */
const useGetCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    enabled: !!id, // prevents API call if id is empty
  });
};

/* ======================================================
   GET CATEGORY LIST (WITH FILTERS)
====================================================== */

/**
 * Fetch categories with optional filters
 * @param {CategoriesParams} params - Filter & pagination params
 * @returns {Promise<any>} - Category list
 */
const fetchCategories = async (params?: CategoriesParams): Promise<any> => {
  try {
    const response = await APIClientPrivate.get("/category", {
      params,
    });
    return response.data;
  } catch (error: any) {
    console.error("Fetch categories error:", error);
    throw error.response?.data || new Error("Failed to fetch categories.");
  }
};

/**
 * 🧠 React Query hook for category list
 * Handles caching, refetching & filters
 */
const useCategories = (params?: CategoriesParams) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => fetchCategories(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * 🔄 Manual refetch utility (non-hook usage)
 */
const refetchCategories = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["categories"] });
};

/* ======================================================
   CATEGORY STATS
====================================================== */

/**
 * Fetch category statistics
 * @returns {Promise<CategoryStats>}
 */
const fetchCategoryStats = async (): Promise<CategoryStats> => {
  const response = await APIClientPrivate.get("/category/stats");
  return response.data.data;
};

/**
 * 🧠 React Query hook for category stats
 */
const useCategoryStats = () => {
  return useQuery<CategoryStats>({
    queryKey: ["categoryStats"],
    queryFn: fetchCategoryStats,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

/**
 * 🔄 Manual refetch utility for stats
 */
const refetchCategoryStats = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["categoryStats"] });
};

/* ======================================================
   CATEGORY LABELS
====================================================== */

/**
 * Fetch category labels
 * @returns {Promise<CategoryLabel[]>}
 */
const fetchCategoryLabels = async (): Promise<CategoryLabel[]> => {
  const response = await APIClientPrivate.get("/category/labels");
  return response.data.data;
};

/**
 * 🧠 React Query hook for category labels
 */
const useCategoryLabels = () => {
  return useQuery<CategoryLabel[]>({
    queryKey: ["categoryLabels"],
    queryFn: fetchCategoryLabels,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

/**
 * 🔄 Manual refetch utility for labels
 */
const refetchCategoryLabels = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["categoryLabels"] });
};

/* ======================================================
   EXPORTS
====================================================== */

export {
  useCreateCategory,
  useUpdateCategory,
  useGetCategory,
  useCategories,
  refetchCategories,
  useCategoryStats,
  refetchCategoryStats,
  useCategoryLabels,
  refetchCategoryLabels,
};
