import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    componentTagger() // Required by Lovable's visual editor
  ],
  build: {
    target: "esnext",
    outDir: "dist"
  }
});
