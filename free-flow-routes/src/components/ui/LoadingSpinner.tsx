'use client';

import React, { useState, useEffect } from 'react';
import { useJourneyStore } from '../../hooks/useJourneyStore';

export default function LoadingSpinner() {
  const [loadingMessage, setLoadingMessage] = useState('Searching for accessible paths...');
  const [progress, setProgress] = useState(0);
  const journeyStore = useJourneyStore();
  const { isLoading } = journeyStore;
  
  // Messages to cycle through during loading
  const loadingMessages = [
    'Searching for accessible paths...',
    'Finding step-free stations...',
    'Calculating optimal routes...',
    'Checking accessibility features...',
    'Almost there...'
  ];

  useEffect(() => {
    // Reset progress when loading state changes
    if (isLoading) {
      setProgress(0);
      setLoadingMessage(loadingMessages[0]);
    }
    
    let messageIndex = 0;
    let progressValue = 0;
    let progressInterval: number | null = null;
    
    if (isLoading) {
      // Update progress every 150ms
      progressInterval = setInterval(() => {
        progressValue += 2;
        if (progressValue >= 100) {
          if (progressInterval) clearInterval(progressInterval);
        } else {
          setProgress(progressValue);
          
          // Change message every 20% progress
          if (progressValue % 20 === 0) {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            setLoadingMessage(loadingMessages[messageIndex]);
          }
        }
      }, 150);
      
      return () => {
        if (progressInterval) clearInterval(progressInterval);
      };
    }
  }, [isLoading, loadingMessages]);

  if (!isLoading) {
    return null;
  }

  return (
    <div 
      id="loading-spinner" 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      aria-live="assertive" 
      aria-atomic="true" 
      role="status"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <div className="mr-4 text-blue-600 dark:text-blue-400" aria-hidden="true">
            <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Finding Your Route</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400" aria-live="polite">{loadingMessage}</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-200 ease-in-out" 
            style={{ width: `${progress}%` }}
            role="progressbar" 
            aria-valuenow={progress} 
            aria-valuemin={0} 
            aria-valuemax={100}
          ></div>
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          This may take a moment as we find the most accessible route
        </p>
      </div>
    </div>
  );
} 