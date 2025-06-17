declare module 'next-themes' {
  import { ReactNode } from 'react';
  
  export interface ThemeProviderProps {
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    enableColorScheme?: boolean;
    disableTransitionOnChange?: boolean;
    storageKey?: string;
    themes?: string[];
    value?: {
      theme: string;
      resolvedTheme?: string;
      setTheme: (theme: string) => void;
    };
    children?: ReactNode;
  }
  
  export interface UseThemeProps {
    theme?: string;
    setTheme: (theme: string) => void;
    resolvedTheme?: string;
    themes: string[];
    systemTheme?: 'dark' | 'light';
  }
  
  export function useTheme(): UseThemeProps;
  
  export function ThemeProvider(props: ThemeProviderProps): JSX.Element;
} 