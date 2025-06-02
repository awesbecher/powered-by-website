import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    
    // Log the error to your error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            p: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            We're sorry for the inconvenience. Please try refreshing the page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReload}
          >
            Refresh Page
          </Button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box sx={{ mt: 4, textAlign: 'left', width: '100%', maxWidth: 800 }}>
              <Typography variant="h6" color="error" gutterBottom>
                Error Details:
              </Typography>
              <pre style={{ overflow: 'auto', padding: 16, background: '#f5f5f5' }}>
                {this.state.error.toString()}
                {'\n\n'}
                {this.state.errorInfo?.componentStack}
              </pre>
            </Box>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}
