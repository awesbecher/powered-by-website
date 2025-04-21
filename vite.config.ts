import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { componentTagger } from 'lovable-tagger';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    componentTagger()
  ],
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
    include: ['lovable-tagger']
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '/lovable-uploads': path.resolve(__dirname, './public/lovable-uploads')
    }
  }
});
