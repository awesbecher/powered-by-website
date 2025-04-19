
/// <reference types="vite/client" />

interface Window {
  Tally?: {
    loadEmbeds: () => void;
  };
  pageState?: {
    audioBlob?: string | null;
    gptText?: string | null;
    voiceChoice?: string | null;
    userEmail?: string | null;
  };
}
