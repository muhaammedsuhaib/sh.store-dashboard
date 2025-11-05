import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { APIClient } from "../../utils/apiClient";

// ----------------- Types ----------------- //
interface LoginPayload {
  phone: string;
  password: string;
  remember_me?: boolean;
}

interface SignupPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface ApiResponse<T = any> {
  message: string;
  data?: T;
}

// ----------------- User Login API ----------------- //
const userLogin = async (data: LoginPayload): Promise<ApiResponse> => {
  try {
    const response = await APIClient.post<ApiResponse>("/auth/login", data);
    return response.data;
  } catch (error: any) {
    // Throw detailed error if available, else generic
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};

// React Query Hook for Login
const useUserLogin = (): UseMutationResult<ApiResponse, any, LoginPayload> => {
  return useMutation({
    mutationFn: userLogin,
  });
};

// ----------------- User Signup API ----------------- //
const userSignup = async (data: SignupPayload): Promise<ApiResponse> => {
  try {
    const response = await APIClient.post<ApiResponse>("/auth/create", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};

// React Query Hook for Signup
const useUserSignup = (): UseMutationResult<
  ApiResponse,
  any,
  SignupPayload
> => {
  return useMutation({
    mutationFn: userSignup,
  });
};

// ----------------- Export Hooks ----------------- //
export { useUserLogin, useUserSignup };
