'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import ErrorBoundary from '../components/ui/ErrorBoundary';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary 
      fallback={<div className="p-4">Something went wrong with the application</div>}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  );
} 