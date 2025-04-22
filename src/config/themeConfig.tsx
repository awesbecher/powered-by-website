
import React, { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes'; // Fix import

interface ThemeConfigProps {
  children: ReactNode;
}

export const ThemeConfig: React.FC<ThemeConfigProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
};

export default ThemeConfig;
