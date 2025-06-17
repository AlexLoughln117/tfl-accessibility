import React from 'react';
import { render, screen } from '@testing-library/react';
import MapContainer from '../components/map/MapContainer';
import { useJourneyStore } from '../hooks/useJourneyStore';
import type { JourneyState } from '../hooks/useJourneyStore';

// Mock the useJourneyStore hook
jest.mock('../hooks/useJourneyStore');

// Mock react-map-gl since we can't use Mapbox token in tests
jest.mock('react-map-gl', () => ({
  Map: () => <div data-testid="map-mock" />,
  Source: () => <div />,
  Layer: () => <div />,
  Marker: () => <div />,
  NavigationControl: () => <div />
}));

// Define a type for the mocked store
type MockedJourneyStore = ReturnType<typeof useJourneyStore>;

describe('MapContainer', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  
  it('should not render map when no journey is available', () => {
    // Setup the mock return value for useJourneyStore
    (useJourneyStore as unknown as jest.MockedFunction<() => JourneyState>).mockReturnValue({
      currentJourney: null,
      isLoading: false,
      journeyHistory: [],
      routePreference: 'best',
      showAccessibility: true,
      error: null,
      setRoutePreference: jest.fn(),
      setShowAccessibility: jest.fn(),
      planJourney: jest.fn(),
      resetJourney: jest.fn(),
      saveJourneyToHistory: jest.fn(),
      clearHistory: jest.fn(),
      removeJourneyFromHistory: jest.fn()
    });
    
    render(<MapContainer />);
    expect(screen.queryByTestId('map-mock')).not.toBeInTheDocument();
  });
  
  it('should not render map when in loading state', () => {
    // Setup the mock return value for useJourneyStore
    (useJourneyStore as unknown as jest.MockedFunction<() => JourneyState>).mockReturnValue({
      currentJourney: {
        startStation: 'Kings Cross',
        endStation: 'Westminster',
        routeDetails: [],
        duration: 25,
        distance: 3.5,
        steps: 0
      },
      isLoading: true,
      journeyHistory: [],
      routePreference: 'best',
      showAccessibility: true,
      error: null,
      setRoutePreference: jest.fn(),
      setShowAccessibility: jest.fn(),
      planJourney: jest.fn(),
      resetJourney: jest.fn(),
      saveJourneyToHistory: jest.fn(),
      clearHistory: jest.fn(),
      removeJourneyFromHistory: jest.fn()
    });
    
    render(<MapContainer />);
    expect(screen.queryByTestId('map-mock')).not.toBeInTheDocument();
  });
  
  it('should render map when journey is available', () => {
    // Setup the mock return value for useJourneyStore
    (useJourneyStore as unknown as jest.MockedFunction<() => JourneyState>).mockReturnValue({
      currentJourney: {
        startStation: 'Kings Cross',
        endStation: 'Westminster',
        routeDetails: [
          {
            mode: 'tube',
            line: 'Victoria',
            fromStation: 'Kings Cross',
            toStation: 'Green Park',
            duration: 10,
            stepFree: true
          },
          {
            mode: 'tube',
            line: 'Jubilee',
            fromStation: 'Green Park',
            toStation: 'Westminster',
            duration: 5,
            stepFree: true
          }
        ],
        duration: 15,
        distance: 2.5,
        steps: 0
      },
      isLoading: false,
      journeyHistory: [],
      routePreference: 'best',
      showAccessibility: true,
      error: null,
      setRoutePreference: jest.fn(),
      setShowAccessibility: jest.fn(),
      planJourney: jest.fn(),
      resetJourney: jest.fn(),
      saveJourneyToHistory: jest.fn(),
      clearHistory: jest.fn(),
      removeJourneyFromHistory: jest.fn()
    });
    
    render(<MapContainer />);
    expect(screen.getByText('Journey from Kings Cross to Westminster')).toBeInTheDocument();
  });
}); 