import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target:'https://43164c0e5cd8.ngrok-free.app/' , // backend origin
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
