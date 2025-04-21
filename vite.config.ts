import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Lovable tagger must use dynamic import for ESM compatibility
let componentTagger;
try {
  const taggerModule = await import("lovable-tagger");
  componentTagger = taggerModule.componentTagger;
} catch (error) {
  console.warn("lovable-tagger failed to load:", error);
}

export default defineConfig({
  plugins: [
    react(),
    ...(componentTagger ? [componentTagger()] : [])
  ],
});
