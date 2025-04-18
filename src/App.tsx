
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from 'framer-motion';
import { GlobalVoiceChatDialog } from '@/components/shared/GlobalVoiceChatDialog';
import { RouteConfig } from './routes/RouteConfig';
import { queryClient } from './config/queryClient';
import { ThemeProvider, defaultThemeConfig } from './config/themeConfig';

// Ensure script is loaded properly
React.useEffect(() => {
  // Check if GPT Engineer script needs to be loaded
  if (!document.querySelector('script[src="https://cdn.gpteng.co/gptengineer.js"]')) {
    const script = document.createElement('script');
    script.src = "https://cdn.gpteng.co/gptengineer.js";
    script.type = "module";
    script.async = true;
    document.head.appendChild(script);
    console.log("GPT Engineer script added dynamically");
  }
}, []);

function App() {
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
