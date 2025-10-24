// ----------------- Base URLs ----------------- //
export const API_URL: string =
  import.meta.env.VITE_API_URL ||
  "https://sh-store-backend.vercel.app/api";

export const BASE_URL: string =
  import.meta.env.VITE_BASE_URL ||
  "https://sh-store-backend.vercel.app/";

// ----------------- Token Key ----------------- //
export const TOKEN_KEY = "token";

// ----------------- Token Handlers ----------------- //
export const setLoginToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getLoginToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const clearLoginToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/";
  }
};

export const isUserLoggedIn = (): boolean => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem(TOKEN_KEY);
  }
  return false;
};
