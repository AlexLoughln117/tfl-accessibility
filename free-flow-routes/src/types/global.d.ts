// Global Type Declarations

declare module 'mapbox-gl/dist/mapbox-gl' {
  export * from 'mapbox-gl';
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_TFL_APP_ID?: string;
    NEXT_PUBLIC_TFL_APP_KEY?: string;
    NEXT_PUBLIC_MAPBOX_TOKEN?: string;
    NEXT_PUBLIC_APP_URL?: string;
  }
}

// Extend Window interface for analytics
interface Window {
  gtag?: (
    command: string,
    action: string,
    params?: {
      [key: string]: any;
    }
  ) => void;
} 