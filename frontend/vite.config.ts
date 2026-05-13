/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "happy-dom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@shared": path.resolve(__dirname, "../shared/src"),
      "@functions": path.resolve(__dirname, "../functions"),
      "@utils": path.resolve(__dirname, "../functions/utils"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
});
