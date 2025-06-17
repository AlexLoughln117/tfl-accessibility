'use client';

import { useState, useEffect, useCallback } from 'react';
import { useStationStore } from '../../hooks/useStationStore';
import { getAllStations } from '../../lib/api/tfl';

export default function StationSearch() {
  const { 
    stations, 
    setStations, 
    stationsLoading, 
    setStationsLoading, 
    stationsError, 
    setStationsError,
    searchQuery,
    setSearchQuery
  } = useStationStore();

  // Load stations on component mount
  useEffect(() => {
    const fetchStations = async () => {
      // Don't fetch if we already have stations
      if (stations.length > 0) {
        return;
      }
      
      setStationsLoading(true);
      setStationsError(null);
      
      try {
        const stationsData = await getAllStations();
        setStations(stationsData);
      } catch (error) {
        console.error('Error fetching stations:', error);
        setStationsError('Failed to load stations. Please try again later.');
      } finally {
        setStationsLoading(false);
      }
    };
    
    fetchStations();
  }, [stations.length, setStations, setStationsLoading, setStationsError]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, [setSearchQuery]);

  return (
    <div className="search-container mb-6">
      <label htmlFor="station-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Search Stations:
      </label>
      <div className="input-with-icon">
        <svg 
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
            clipRule="evenodd" 
          />
        </svg>
        <input
          type="text"
          id="station-search"
          placeholder="Enter station name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          aria-label="Search for stations"
          disabled={stationsLoading}
        />
      </div>
      
      {stationsLoading && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Loading stations...
        </div>
      )}
      
      {stationsError && (
        <div className="text-sm text-red-600 dark:text-red-400 mt-2">
          {stationsError}
        </div>
      )}
    </div>
  );
} 