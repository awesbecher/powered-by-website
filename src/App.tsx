
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from 'framer-motion';
import { GlobalVoiceChatDialog } from '@/components/GlobalVoiceChatDialog';
import { RouteConfig } from './routes/RouteConfig';
import { queryClient } from './config/queryClient';
import { ThemeProvider, defaultThemeConfig } from './config/themeConfig';

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
