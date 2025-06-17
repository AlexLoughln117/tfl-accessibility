'use client';

import React, { useEffect, useState } from 'react';
import { useStationStore } from '../../hooks/useStationStore';
import { getStationAccessibility, StationAccessibility } from '../../lib/api/tfl';
import { getAccessibilityColorClasses, getAccessibilitySummary } from '../../lib/api/accessibility';

interface StationSelectProps {
  id: string;
  label: string;
  value: string | null;
  onChange: (stationId: string | null) => void;
  icon: 'start' | 'end';
  required?: boolean;
}

export default function StationSelect({
  id,
  label,
  value,
  onChange,
  icon,
  required = false
}: StationSelectProps) {
  const stationStore = useStationStore();
  const filteredStations = stationStore.getFilteredStations();
  const [stationAccessibility, setStationAccessibility] = useState<StationAccessibility | null>(null);
  const [isLoadingAccessibility, setIsLoadingAccessibility] = useState(false);

  // When a station is selected, fetch its accessibility info
  useEffect(() => {
    const fetchAccessibility = async () => {
      if (!value) {
        setStationAccessibility(null);
        return;
      }
      
      setIsLoadingAccessibility(true);
      
      try {
        const accessibilityData = await getStationAccessibility(value);
        setStationAccessibility(accessibilityData);
      } catch (error) {
        console.error('Error fetching station accessibility:', error);
      } finally {
        setIsLoadingAccessibility(false);
      }
    };
    
    fetchAccessibility();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stationId = e.target.value || null;
    onChange(stationId);
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="input-with-icon">
        {icon === 'start' ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
              clipRule="evenodd" 
            />
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M3 6a3 3 0 013-3h10a1 1 0 011 1v1a1 1 0 01-1 1H6a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1v-1a1 1 0 011-1h3a1 1 0 011 1v3a3 3 0 01-3 3H6a3 3 0 01-3-3V6z" 
              clipRule="evenodd" 
            />
          </svg>
        )}
        <select
          id={id}
          value={value || ''}
          onChange={handleChange}
          className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          aria-label={`Select ${label.toLowerCase()}`}
          required={required}
        >
          <option value="">Select a station</option>
          {filteredStations.map((station: any) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </div>
      
      {value && isLoadingAccessibility && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Loading accessibility information...
        </div>
      )}
      
      {value && stationAccessibility && (
        <div className={`mt-1 text-xs p-2 rounded-md ${
          stationAccessibility.stepFreeToStation 
            ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100' 
            : 'bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
        }`}>
          <div className="flex">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1 flex-shrink-0" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                clipRule="evenodd" 
              />
            </svg>
            <div>
              <span className="font-medium">Accessibility: </span>
              {stationAccessibility.stepFreeToStation ? (
                <>
                  <div className="font-medium">Step-free access available</div>
                  <div>{stationAccessibility.details}</div>
                </>
              ) : (
                <>
                  <div className="font-medium">Limited step-free access</div>
                  <div>{stationAccessibility.details || 'No detailed information available.'}</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 