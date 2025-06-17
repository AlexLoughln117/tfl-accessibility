'use client';

import React, { useMemo } from 'react';
import { Journey } from '../../hooks/useJourneyStore';

interface RouteDetailsProps {
  journey: Journey;
}

export default function RouteDetails({ journey }: RouteDetailsProps) {
  const formatDuration = (minutes: number | null): string => {
    if (!minutes) return 'Unknown duration';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} mins`;
  };

  const routeDetails = useMemo(() => {
    if (!journey || !journey.routeDetails) {
      return [];
    }
    return journey.routeDetails;
  }, [journey]);

  const totalAccessible = useMemo(() => {
    if (!journey || !journey.routeDetails) {
      return false;
    }
    return journey.routeDetails.every(leg => leg.stepFree);
  }, [journey]);

  return (
    <div className="route-info mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">
            {journey.startStation} to {journey.endStation}
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total journey time: {formatDuration(journey.duration)}
          </div>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <div className={`text-sm font-medium ${totalAccessible ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
            <span className="inline-flex items-center">
              <svg 
                className="h-5 w-5 mr-1" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
              {totalAccessible ? 'Fully accessible route' : 'Partially accessible route'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="font-medium mb-2">Journey Details</h4>
        <ul className="space-y-4">
          {routeDetails.map((leg: any, index: number) => (
            <li key={index} className="flex">
              <div className="mr-3 relative">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center 
                  ${leg.mode === 'tube' 
                    ? 'bg-red-600 text-white' 
                    : leg.mode === 'walking' || leg.mode === 'walk' 
                      ? 'bg-green-600 text-white'
                      : leg.mode === 'bus'
                        ? 'bg-blue-600 text-white'
                        : 'bg-purple-600 text-white'
                  }`}
                >
                  {leg.mode === 'tube' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 6a3 3 0 013-3h10a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V6z" />
                    </svg>
                  )}
                  {(leg.mode === 'walking' || leg.mode === 'walk') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v4.586l-3.293-3.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L11 8.586V4a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                  {leg.mode === 'bus' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 1h2a1 1 0 011 1v4a1 1 0 01-1 1H9a1 1 0 01-1-1V2a1 1 0 011-1z" />
                      <path d="M8 6h4v5a1 1 0 01-1 1H9a1 1 0 01-1-1V6z" />
                      <path fillRule="evenodd" d="M4 5a3 3 0 013-3h6a3 3 0 013 3v8a3 3 0 01-3 3H7a3 3 0 01-3-3V5zm3-1h6a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                {index < routeDetails.length - 1 && (
                  <div className="absolute left-1/2 top-6 bottom-0 w-0.5 -ml-px h-full bg-gray-300 dark:bg-gray-600"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      {leg.mode === 'tube' || leg.mode === 'dlr' || leg.mode === 'overground'
                        ? `${leg.mode.charAt(0).toUpperCase() + leg.mode.slice(1)} - ${leg.line}`
                        : leg.mode.charAt(0).toUpperCase() + leg.mode.slice(1)
                      }
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {leg.fromStation} to {leg.toStation}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 md:mt-0 flex items-center">
                    <span className="mr-2">{formatDuration(leg.duration)}</span>
                    {leg.stepFree ? (
                      <span className="text-green-600 dark:text-green-400" title="Step-free access">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400" title="Not step-free">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {journey.steps && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <span className="font-medium">Steps: </span> 
            {journey.steps > 1000 
              ? <span className="text-yellow-600 dark:text-yellow-400">High - approximately {journey.steps}</span>
              : <span className="text-green-600 dark:text-green-400">Low - approximately {journey.steps}</span>
            }
          </p>
        </div>
      )}
    </div>
  );
} 