declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
    keywords?: string[];
    authors?: { name: string; url?: string }[];
    creator?: string;
    publisher?: string;
    openGraph?: {
      title?: string;
      description?: string;
      url?: string;
      siteName?: string;
      images?: { url: string; width?: number; height?: number; alt?: string }[];
      locale?: string;
      type?: string;
    };
    twitter?: {
      card?: string;
      title?: string;
      description?: string;
      creator?: string;
      images?: { url: string; alt?: string }[];
    };
    robots?: {
      index?: boolean;
      follow?: boolean;
      nocache?: boolean;
      googleBot?: {
        index?: boolean;
        follow?: boolean;
        noimageindex?: boolean;
      };
    };
    alternates?: {
      canonical?: string;
      languages?: Record<string, string>;
    };
    viewport?: {
      width?: number | 'device-width';
      height?: number | 'device-height';
      initialScale?: number;
      minimumScale?: number;
      maximumScale?: number;
      userScalable?: boolean;
      viewportFit?: 'auto' | 'contain' | 'cover';
    };
  }
}

declare module 'next/font/google' {
  export interface FontOptions {
    weight?: string | string[];
    style?: string | string[];
    subsets?: string[];
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
    variable?: string;
    preload?: boolean;
  }

  export function Inter(options: FontOptions): {
    className: string;
    style: { fontFamily: string };
    variable: string;
  };

  export function Poppins(options: FontOptions): {
    className: string;
    style: { fontFamily: string };
    variable: string;
  };
}

declare module 'next/server' {
  import { NextRequest } from 'next/server';
  
  export { NextRequest };
  
  export class NextResponse {
    static redirect(url: string, init?: ResponseInit): NextResponse;
    static rewrite(destination: string, init?: ResponseInit): NextResponse;
    static next(init?: ResponseInit): NextResponse;
    static json(body: any, init?: ResponseInit): NextResponse;
    
    headers: Headers;
  }
  
  export type NextMiddleware = (
    request: NextRequest,
    event: { signal: AbortSignal }
  ) => Promise<NextResponse | undefined> | NextResponse | undefined;
  
  export interface MiddlewareConfig {
    matcher?: string | string[];
  }
} 