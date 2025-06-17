/**
 * Analytics functions for tracking user interactions and app performance
 * 
 * This is a lightweight analytics implementation that can be connected
 * to a real analytics provider (Google Analytics, Plausible, etc.)
 */

// Initialize analytics - would normally connect to your provider
export function initAnalytics(): void {
  // In production, this would initialize your analytics provider
  if (process.env.NODE_ENV === 'production') {
    console.log('Analytics initialized in production mode');
  }
}

// Log page views
export function trackPageView(url: string): void {
  if (process.env.NODE_ENV === 'production') {
    console.log(`Page view: ${url}`);
    // Example GA4 implementation:
    // window.gtag('event', 'page_view', { page_path: url });
  }
}

// Track journey planning 
export function trackJourneyPlan(startStation: string, endStation: string, preference: string): void {
  if (process.env.NODE_ENV === 'production') {
    console.log(`Journey planned: ${startStation} to ${endStation} (${preference})`);
    // Example GA4 implementation:
    // window.gtag('event', 'journey_planned', {
    //   start_station: startStation,
    //   end_station: endStation,
    //   preference: preference
    // });
  }
}

// Track accessibility features used
export function trackAccessibilityFeature(feature: string): void {
  if (process.env.NODE_ENV === 'production') {
    console.log(`Accessibility feature used: ${feature}`);
    // Example GA4 implementation:
    // window.gtag('event', 'accessibility_feature_used', {
    //   feature: feature
    // });
  }
}

// Track errors
export function trackError(errorType: string, errorMessage: string): void {
  if (process.env.NODE_ENV === 'production') {
    console.error(`Error tracked: ${errorType} - ${errorMessage}`);
    // Example GA4 implementation:
    // window.gtag('event', 'app_error', {
    //   error_type: errorType,
    //   error_message: errorMessage
    // });
  }
}

// Performance tracking
export function trackPerformance(metric: string, value: number): void {
  if (process.env.NODE_ENV === 'production') {
    console.log(`Performance metric: ${metric} - ${value}ms`);
    // Example GA4 implementation:
    // window.gtag('event', 'performance', {
    //   metric: metric,
    //   value: value
    // });
  }
}

// Track user preferences
export function trackPreference(preference: string, value: any): void {
  if (process.env.NODE_ENV === 'production') {
    console.log(`User preference: ${preference} - ${value}`);
    // Example GA4 implementation:
    // window.gtag('event', 'user_preference', {
    //   preference: preference,
    //   value: String(value)
    // });
  }
} 