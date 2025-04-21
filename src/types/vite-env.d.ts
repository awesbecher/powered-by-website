/// <reference types="vite/client" />

declare module 'vite-tsconfig-paths' {
  import { Plugin } from 'vite'
  export default function tsconfigPaths(): Plugin
}

declare module 'lovable-tagger' {
  import { Plugin } from 'vite'
  export function componentTagger(): Plugin
}

interface ImportMeta {
  readonly url: string
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // Add other env variables as needed
} 