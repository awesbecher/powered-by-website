
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

function App() {
  useEffect(() => {
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
