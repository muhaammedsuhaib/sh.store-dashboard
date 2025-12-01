import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// 🔹 PWA registration (must be at the top)
import { registerSW } from "virtual:pwa-register";
registerSW({
  onNeedRefresh() {},
  // onOfflineReady() {},
});

import "./index.css";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// 🔹 React Query Client
const queryClient = new QueryClient();

// 🔹 Render App
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);
