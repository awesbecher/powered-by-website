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
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react', 
            'react-dom', 
            'react-router-dom',
            'framer-motion',
          ],
          'ui': [
            '@mui/material',
            '@mui/icons-material',
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
          ],
          'vapi': [
            '@vapi-ai/web'
          ]
        },
        format: 'es'
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for now, but change to true for final production
        drop_debugger: true
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
