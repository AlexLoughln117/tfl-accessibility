'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useStationStore } from '../../hooks/useStationStore';
import { useJourneyStore } from '../../hooks/useJourneyStore';
import StationSearch from './StationSearch';
import StationSelect from './StationSelect';
import RoutePreferences from './RoutePreferences';
import AccessibilityInfo from '../accessibility/AccessibilityInfo';

export default function JourneyPlanner() {
  const [isLoading, setIsLoading] = useState(false);
  const { startStation, endStation, setStartStation, setEndStation } = useStationStore();
  const { routePreference, showAccessibility, planJourney, resetJourney } = useJourneyStore();
  
  // For demonstration purposes - would come from API
  const [startAccessibility, setStartAccessibility] = useState<string | null>(null);
  const [endAccessibility, setEndAccessibility] = useState<string | null>(null);
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!startStation || !endStation) {
      // Show error
      return;
    }
    
    setIsLoading(true);
    
    try {
      await planJourney(startStation, endStation, routePreference);
      // Journey planned successfully
    } catch (error) {
      // Handle error
      console.error('Error planning journey:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset form
  const handleReset = () => {
    resetJourney();
    setStartStation(null);
    setEndStation(null);
    setStartAccessibility(null);
    setEndAccessibility(null);
  };
  
  // Update accessibility info when stations change
  useEffect(() => {
    if (startStation) {
      // In a real app, this would fetch from an API
      setStartAccessibility(
        startStation.includes('Westminster') 
          ? 'Step-free access from street to platform. Step-free access from platform to train.'
          : 'Partial step-free access. Please check TfL website for details.'
      );
    } else {
      setStartAccessibility(null);
    }
  }, [startStation]);
  
  useEffect(() => {
    if (endStation) {
      // In a real app, this would fetch from an API
      setEndAccessibility(
        endStation.includes('Paddington') 
          ? 'Full step-free access from street to train.'
          : 'Limited step-free access. Assistance may be required.'
      );
    } else {
      setEndAccessibility(null);
    }
  }, [endStation]);
  
  return (
    <section className="journey-planner" aria-labelledby="journey-planner-heading">
      <h2 id="journey-planner-heading" className="text-2xl font-semibold mb-4">Journey Planner</h2>
      
      <div className="accessibility-commitment p-4 bg-blue-50 dark:bg-blue-900 rounded-lg mb-6">
        <p className="flex items-center">
          <span className="inline-block mr-2 text-blue-600 dark:text-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
          <strong>Accessibility Information</strong> - We provide station accessibility details to help you plan your journey
        </p>
      </div>
      
      {/* Station Search */}
      <StationSearch />
      
      <form id="journey-form" onSubmit={handleSubmit} aria-labelledby="journey-planner-heading">
        {/* Start Station */}
        <div className="form-group mb-4">
          <StationSelect
            id="start-station"
            label="Start Station:"
            value={startStation}
            onChange={setStartStation}
            icon="start"
            required
          />
          {showAccessibility && startAccessibility && (
            <AccessibilityInfo message={startAccessibility} id="start-accessibility" />
          )}
        </div>
        
        {/* End Station */}
        <div className="form-group mb-4">
          <StationSelect
            id="end-station"
            label="End Station:"
            value={endStation}
            onChange={setEndStation}
            icon="end"
            required
          />
          {showAccessibility && endAccessibility && (
            <AccessibilityInfo message={endAccessibility} id="end-accessibility" />
          )}
        </div>
        
        {/* Route Preferences */}
        <RoutePreferences />
        
        <div className="accessibility-note p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg mb-6">
          <p className="text-sm">
            <span className="inline-block mr-2 text-yellow-600 dark:text-yellow-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </span>
            <strong>Important:</strong> The Google Maps API doesn't directly support wheelchair-specific routes. We provide station accessibility information, but the routes shown are standard transit routes. Always check with transport providers for specific accessibility features.
          </p>
        </div>
        
        <div className="button-group flex flex-wrap gap-4">
          <button 
            type="submit" 
            id="plan-route" 
            className="primary-button px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            aria-label="Show route"
            disabled={isLoading || !startStation || !endStation}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Show Route
            </span>
          </button>
          
          <button 
            type="button" 
            id="reset-button" 
            className="secondary-button px-6 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label="Reset selections"
            onClick={handleReset}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Reset Route
            </span>
          </button>
        </div>
      </form>
    </section>
  );
} 