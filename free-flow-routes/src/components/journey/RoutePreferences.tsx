'use client';

import { useJourneyStore } from '../../hooks/useJourneyStore';

export default function RoutePreferences() {
  const { 
    routePreference, 
    showAccessibility, 
    setRoutePreference, 
    setShowAccessibility 
  } = useJourneyStore();

  return (
    <div className="mb-6">
      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Route Preference:
        </legend>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="best-route"
              name="route-preference"
              value="best"
              checked={routePreference === 'best'}
              onChange={() => setRoutePreference('best')}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="best-route" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Best route
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="fewer-transfers"
              name="route-preference"
              value="fewer_transfers"
              checked={routePreference === 'fewer_transfers'}
              onChange={() => setRoutePreference('fewer_transfers')}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="fewer-transfers" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Fewer transfers
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="less-walking"
              name="route-preference"
              value="less_walking"
              checked={routePreference === 'less_walking'}
              onChange={() => setRoutePreference('less_walking')}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="less-walking" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Less walking
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="wheelchair-accessible"
              name="wheelchair-accessible"
              checked={showAccessibility}
              onChange={(e) => setShowAccessibility(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="wheelchair-accessible" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Show accessibility info
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  );
} 