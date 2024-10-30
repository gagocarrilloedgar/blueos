import { lingui } from "@lingui/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [["@lingui/swc-plugin", {}]]
    }),
    lingui()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  test: {
    include: ["./tests/**/*.{test,spec}.{tsx,ts}"],
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts"
  }
});
