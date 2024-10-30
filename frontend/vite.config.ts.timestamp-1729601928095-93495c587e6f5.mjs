// vite.config.ts
import { lingui } from "file:///Users/edgar/Desktop/Edgar/Github/workos/node_modules/.pnpm/@lingui+vite-plugin@4.12.0_typescript@5.6.3_vite@5.4.8_@types+node@22.7.5_/node_modules/@lingui/vite-plugin/dist/index.cjs";
import react from "file:///Users/edgar/Desktop/Edgar/Github/workos/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.1_vite@5.4.8_@types+node@22.7.5_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { defineConfig } from "file:///Users/edgar/Desktop/Edgar/Github/workos/node_modules/.pnpm/vitest@2.1.2_@types+node@22.7.5/node_modules/vitest/dist/config.js";
var __vite_injected_original_dirname = "/Users/edgar/Desktop/Edgar/Github/workos";
var vite_config_default = defineConfig({
  plugins: [
    react({
      plugins: [["@lingui/swc-plugin", {}]]
    }),
    lingui()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  test: {
    include: ["./tests/**/*.{test,spec}.{tsx,ts}"],
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZWRnYXIvRGVza3RvcC9FZGdhci9HaXRodWIvd29ya29zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZWRnYXIvRGVza3RvcC9FZGdhci9HaXRodWIvd29ya29zL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9lZGdhci9EZXNrdG9wL0VkZ2FyL0dpdGh1Yi93b3Jrb3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBsaW5ndWkgfSBmcm9tIFwiQGxpbmd1aS92aXRlLXBsdWdpblwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZXN0L2NvbmZpZ1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KHtcbiAgICAgIHBsdWdpbnM6IFtbXCJAbGluZ3VpL3N3Yy1wbHVnaW5cIiwge31dXVxuICAgIH0pLFxuICAgIGxpbmd1aSgpXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIilcbiAgICB9XG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBpbmNsdWRlOiBbXCIuL3Rlc3RzLyoqLyoue3Rlc3Qsc3BlY30ue3RzeCx0c31cIl0sXG4gICAgZW52aXJvbm1lbnQ6IFwianNkb21cIixcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIHNldHVwRmlsZXM6IFwiLi90ZXN0cy9zZXR1cC50c1wiXG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUyxTQUFTLGNBQWM7QUFDalUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUg3QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixTQUFTLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7QUFBQSxJQUN0QyxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osU0FBUyxDQUFDLG1DQUFtQztBQUFBLElBQzdDLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFBQSxJQUNULFlBQVk7QUFBQSxFQUNkO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
