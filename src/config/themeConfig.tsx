import React, { ReactNode } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

export const defaultThemeConfig = {
  attribute: 'class',
  defaultTheme: 'dark',
  enableSystem: true,
  disableTransitionOnChange: false
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <NextThemeProvider {...defaultThemeConfig}>
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
