'use client';

import { useState, useEffect } from 'react';

interface Announcement {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  visible: boolean;
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API or state management
    // For demo purposes, we'll create a mock announcement
    
    // Check if we already showed an announcement in this session
    const hasShownAnnouncement = sessionStorage.getItem('hasShownAnnouncement');
    
    if (!hasShownAnnouncement) {
      // Add mock announcement
      setAnnouncements([
        {
          id: 'planned-maintenance',
          message: 'Planned maintenance: Some TfL API features may be unavailable on Sunday, 12th March between 02:00-04:00.',
          type: 'info',
          visible: true
        }
      ]);
      
      // Mark that we've shown an announcement
      sessionStorage.setItem('hasShownAnnouncement', 'true');
    }
  }, []);

  const dismissAnnouncement = (id: string) => {
    setAnnouncements(prev => 
      prev.map(ann => 
        ann.id === id ? { ...ann, visible: false } : ann
      )
    );
  };

  // If no visible announcements, don't render anything
  if (!announcements.some(ann => ann.visible)) {
    return null;
  }

  return (
    <div 
      id="announcements" 
      className="bg-blue-50 dark:bg-blue-900 border-b border-blue-100 dark:border-blue-800"
      role="region" 
      aria-live="polite"
    >
      {announcements.map(announcement => (
        announcement.visible && (
          <div 
            key={announcement.id}
            className={`container mx-auto px-4 py-3 ${
              announcement.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100' :
              announcement.type === 'error' ? 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100' :
              announcement.type === 'success' ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100' :
              'bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
            }`}
            role="alert"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {announcement.type === 'warning' && (
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {announcement.type === 'info' && (
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                )}
                <p>{announcement.message}</p>
              </div>
              <button 
                type="button" 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => dismissAnnouncement(announcement.id)}
                aria-label="Dismiss announcement"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )
      ))}
    </div>
  );
} 