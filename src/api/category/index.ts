import { useMutation, useQuery } from "@tanstack/react-query";
import APIClientPrivate from "../../utils/apiClient";

/**
 * Create category API call
 * @param {any} data - The category payload
 * @returns {Promise<any>} - API response data
 */
const createCategory = async (data: any): Promise<any> => {
  try {
    const response: any = await APIClientPrivate.post("/category", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};

/**
 * 🧠 useCreateCategory React Query Hook
 */
const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
  });
};

/**
 * Update category API call
 * @param {any} formData - The category payload with id
 * @returns {Promise<any>} - API response data
 */
const updateCategory = async (formData: any): Promise<any> => {
  try {
    const id = formData.get("id");
    const response: any = await APIClientPrivate.put(
      `/category/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};

/**
 * 🧠 useUpdateCategory React Query Hook
 */
const useUpdateCategory = () => {
  return useMutation({
    mutationFn: updateCategory,
  });
};

/**
 * Get single category by ID API call
 * @param {string} id - Category ID
 * @returns {Promise<any>} - API response data
 */
const getCategory = async (id: string): Promise<any> => {
  try {
    const response: any = await APIClientPrivate.get(`/category/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};

/**
 * 🧠 useGetCategory React Query Hook
 */
const useGetCategory = (id: string) => {
  return useQuery({
    queryKey: ["getCategory", id],
    queryFn: () => getCategory(id),
  });
};

export { useGetCategory, useCreateCategory, useUpdateCategory };
