import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// get vite mode
const mode = process.env.NODE_ENV || "development";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  server: {
    port: 8080
  },
  build: {
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        format: 'es'
      }
    }
  },
  optimizeDeps: {
    exclude: []
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
