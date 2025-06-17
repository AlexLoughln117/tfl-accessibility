'use client';

import React, { useState, useEffect } from 'react';
import { useJourneyStore } from '../../hooks/useJourneyStore';
import RouteDetails from './RouteDetails';
import { Map, Source, Layer, Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapContainer() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const journeyStore = useJourneyStore();
  const { currentJourney, isLoading } = journeyStore;
  const [viewState, setViewState] = useState({
    longitude: -0.1276, // London center
    latitude: 51.5072,
    zoom: 12
  });

  // When journey changes, update the map view
  useEffect(() => {
    if (currentJourney && currentJourney.routeDetails && currentJourney.routeDetails.length > 0) {
      // In a real app, we would get coordinates for stations
      // For demo, we use dummy coordinates
      const startCoords = { longitude: -0.1419, latitude: 51.5011 }; // Westminster
      const endCoords = { longitude: -0.1030, latitude: 51.5114 }; // Liverpool Street
      
      // Center the map between start and end
      setViewState({
        longitude: (startCoords.longitude + endCoords.longitude) / 2,
        latitude: (startCoords.latitude + endCoords.latitude) / 2,
        zoom: 13
      });
    }
  }, [currentJourney]);

  if (!currentJourney || isLoading) {
    return null;
  }

  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

  // Generate GeoJSON for the route
  const routeData = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      // This is a dummy route - in real app would come from TfL directions API
      coordinates: [
        [-0.1419, 51.5011], // Westminster
        [-0.1345, 51.5104], // Trafalgar Square
        [-0.1030, 51.5114]  // Liverpool Street
      ]
    }
  };

  // Accessible and non-accessible segments would have different styles
  const layerStyle = {
    id: 'route',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#3B82F6',
      'line-width': 5
    }
  };

  return (
    <section 
      id="map-container" 
      className="map-wrapper bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-8"
      aria-labelledby="route-title"
    >
      <div className="map-header mb-4">
        <h2 id="route-title" className="route-title text-xl font-semibold">Your Route</h2>
        
        {currentJourney && (
          <RouteDetails journey={currentJourney} />
        )}
      </div>
      
      <div className="map-frame relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="map-container" style={{ width: '100%', height: '100%' }}>
            {/* Map would go here */}
            <div className="map-controls">
              <NavigationControl position="top-right" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="map-accessibility-info mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded text-sm">
        <p>
          <strong>Note:</strong> Map data shows approximate routes. Accessibility information for stations comes from Transport for London.
        </p>
      </div>
    </section>
  );
} 