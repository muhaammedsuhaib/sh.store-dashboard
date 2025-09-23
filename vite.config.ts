import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' // Import tailwindcss plugin

export default defineConfig({
  plugins: [
    // other plugins like react(), vue(), etc.
    tailwindcss(), // Add the tailwindcss plugin
  ],
})