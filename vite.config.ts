import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon.ico", "robots.txt"],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "SH.SALE - Shop Management Software",
        short_name: "SH.SALE",
        description:
          "SH.SALE is a modern and efficient shop management software to handle inventory, sales, and staff seamlessly.",
        theme_color: "#1e3a8a",
        background_color: "#0f172a",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/logo.svg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo.svg",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/logo.svg",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
