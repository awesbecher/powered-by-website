
import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from 'framer-motion';
import { GlobalVoiceChatDialog } from '@/components/GlobalVoiceChatDialog';
import { RouteConfig } from './routes/RouteConfig';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
      gcTime: 30 * 60 * 1000, // Cache is kept for 30 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
