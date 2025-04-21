import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { componentTagger } from 'lovable-tagger';

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
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});
