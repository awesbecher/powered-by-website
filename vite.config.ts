
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Proper way to disable HTTPS - leave it undefined instead of setting to false
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization"
    }
  },
  plugins: [
    react(),
    // Conditionally use lovable-tagger only in development mode
    // Remove the direct import to avoid build conflicts in production
    mode === 'development' && (() => {
      try {
        // Dynamically import only in dev mode
        const { componentTagger } = require("lovable-tagger");
        return componentTagger();
      } catch (e) {
        console.warn("Lovable tagger not available or incompatible:", e);
        return null;
      }
    })(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Build configuration to make client-side routing work in production
  build: {
    rollupOptions: {},
    outDir: "dist",
    // Ensure that assets are properly loaded despite routing
    assetsDir: "assets",
  },
}));
