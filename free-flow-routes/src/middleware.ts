import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add security headers
  const securityHeaders = {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    // Add Content Security Policy for production
    ...(process.env.NODE_ENV === 'production' 
      ? { 
          'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.mapbox.com; style-src 'self' 'unsafe-inline' *.mapbox.com; img-src 'self' data: blob: *.mapbox.com; connect-src 'self' *.tfl.gov.uk api.mapbox.com events.mapbox.com; font-src 'self' data:;" 
        } 
      : {})
  };

  // Set headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Add response time tracking on the server
  const startTime = Date.now();
  response.headers.set('Server-Timing', `responseTime;dur=${Date.now() - startTime}`);
  
  return response;
}

// Only run middleware on these paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 