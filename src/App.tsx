
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from 'framer-motion';
import { GlobalVoiceChatDialog } from '@/components/shared/GlobalVoiceChatDialog';
import { RouteConfig } from './routes/RouteConfig';
import { queryClient } from './config/queryClient';
import { ThemeProvider, defaultThemeConfig } from './config/themeConfig';
import * as serviceWorker from './serviceWorker';
import { ensureCustomEventSupport } from './utils/eventPolyfill';
import { getVapiInstance } from './services/vapiService';

function App() {
  useEffect(() => {
    // Ensure CustomEvent is supported in all browsers
    ensureCustomEventSupport();
    
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = "module";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    };

    const initScripts = async () => {
      try {
        // Load GPT Engineer script with error handling
        await loadScript("https://cdn.gpteng.co/gptengineer.js");
        console.log("GPT Engineer script loaded successfully");
      } catch (error) {
        console.warn("Could not load GPT Engineer script:", error);
      }
    };

    initScripts();
    
    // Register service worker
    serviceWorker.register();
    
    // Initialize Vapi to ensure it loads properly
    try {
      // Initialize Vapi instance early to ensure it's ready for use
      getVapiInstance();
      console.log("Vapi service initialized on app start");
    } catch (error) {
      console.error("Error in Vapi initialization:", error);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider {...defaultThemeConfig}>
        <AnimatePresence mode="wait" initial={false}>
          <RouteConfig />
        </AnimatePresence>
        <GlobalVoiceChatDialog />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
