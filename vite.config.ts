import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ✅ Safe import for ESM compatibility with Lovable/Vercel
import lovableTagger from "lovable-tagger";

export default defineConfig({
  plugins: [
    react(),
    // ✅ Proper ESM-compatible plugin use
    lovableTagger.componentTagger?.(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
