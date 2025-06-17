'use client';

import { FallbackProps } from 'react-error-boundary';

/**
 * A user-friendly error display component to use with react-error-boundary
 */
export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div 
      role="alert" 
      className="p-6 mx-auto my-8 max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-red-200 dark:border-red-900"
    >
      <div className="flex items-center mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-red-500 mr-3" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Something went wrong</h2>
      </div>
      
      <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-800">
        <p className="text-sm text-red-800 dark:text-red-300 font-mono whitespace-pre-wrap break-words">
          {error.message || 'An unexpected error occurred'}
        </p>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Sorry about that! We've encountered an error while trying to process your request. 
        You can try again or return to the home page.
      </p>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try Again
        </button>
        
        <a
          href="/"
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Return Home
        </a>
        
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
} 