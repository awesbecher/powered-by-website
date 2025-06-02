import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Toaster } from "@/components/ui/toaster";
import { GlobalVoiceChatDialog } from '@/components/shared/GlobalVoiceChatDialog';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import RouteConfig from './routes/RouteConfig';
import { queryClient } from './config/queryClient';
import { ThemeProvider } from './config/themeConfig';
import * as serviceWorker from './serviceWorker';
import { ensureCustomEventSupport } from './utils/eventPolyfill';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#e33371',
      dark: '#9a0036',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Space Grotesk', sans-serif" },
    h2: { fontFamily: "'Space Grotesk', sans-serif" },
    h3: { fontFamily: "'Space Grotesk', sans-serif" },
    h4: { fontFamily: "'Space Grotesk', sans-serif" },
    h5: { fontFamily: "'Space Grotesk', sans-serif" },
    h6: { fontFamily: "'Space Grotesk', sans-serif" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

export default function App() {
  useEffect(() => {
    ensureCustomEventSupport();
    serviceWorker.register();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <MuiThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider maxSnack={3}>
              <CssBaseline />
              <Router>
                <RouteConfig />
                <GlobalVoiceChatDialog />
                <Toaster />
              </Router>
            </SnackbarProvider>
          </QueryClientProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
