
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import { componentTagger } from "lovable-tagger";

// get vite mode
const mode = process.env.NODE_ENV || "development";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure lovable-uploads directory exists
const lovableUploadsDir = resolve(__dirname, './public/lovable-uploads');
if (!fs.existsSync(lovableUploadsDir)) {
  fs.mkdirSync(lovableUploadsDir, { recursive: true });
}

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  server: {
    port: 8080,
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
    exclude: ['lovable-tagger']
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '/lovable-uploads': lovableUploadsDir
    }
  }
});
