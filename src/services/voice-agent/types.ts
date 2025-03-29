
// Types for voice agent services

export interface TranscriptionResult {
  text: string;
  language?: string;
}

export interface KnowledgeChunk {
  text: string;
  source?: string;
  relevance?: number;
}

export interface ResponseGeneration {
  text: string;
}

export interface SpeechGeneration {
  audioUrl: string;
}

// Language codes for Whisper API
export const supportedLanguages = {
  english: 'en',
  german: 'de',
  portuguese: 'pt',
  chinese: 'zh',
  japanese: 'ja',
  french: 'fr',
  spanish: 'es',
  hindi: 'hi',
  italian: 'it',
  korean: 'ko',
  dutch: 'nl',
  polish: 'pl',
  russian: 'ru',
  swedish: 'sv',
  turkish: 'tr',
};
