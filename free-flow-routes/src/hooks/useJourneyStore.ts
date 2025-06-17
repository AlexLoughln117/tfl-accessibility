import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Station } from '../lib/api/tfl';

// Define more precise types
export type RoutePreference = 'best' | 'fewer_transfers' | 'less_walking';

export interface RouteDetail {
  mode: string;
  line?: string;
  fromStation: string;
  toStation: string;
  duration: number;
  stepFree: boolean;
}

export interface Journey {
  startStation: string | null;
  endStation: string | null;
  routeDetails: RouteDetail[] | null;
  duration: number | null;
  distance: number | null;
  steps: number | null;
  timestamp?: number; // Added for tracking when journey was created
}

export interface JourneyState {
  // Journey data
  currentJourney: Journey | null;
  journeyHistory: Journey[];
  
  // Preferences
  routePreference: RoutePreference;
  showAccessibility: boolean;
  
  // Status
  isLoading: boolean; // Added loading state
  error: string | null; // Added error state
  
  // Actions
  setRoutePreference: (pref: RoutePreference) => void;
  setShowAccessibility: (show: boolean) => void;
  planJourney: (start: string, end: string, preference: RoutePreference) => Promise<void>;
  resetJourney: () => void;
  saveJourneyToHistory: (journey: Journey) => void;
  clearHistory: () => void; // Added for clearing history
  removeJourneyFromHistory: (index: number) => void; // Added for removing specific journeys
}

// Create the store
export const useJourneyStore = create<JourneyState>(
  persist(
    (set, get) => ({
      // Initial state
      currentJourney: null,
      journeyHistory: [],
      routePreference: 'best' as RoutePreference,
      showAccessibility: true,
      isLoading: false,
      error: null,
      
      // Actions
      setRoutePreference: (pref: RoutePreference) => set({ routePreference: pref }),
      
      setShowAccessibility: (show: boolean) => set({ showAccessibility: show }),
      
      planJourney: async (start: string, end: string, preference: RoutePreference) => {
        set({ isLoading: true, error: null });
        
        try {
          // This would be replaced with an actual API call to TfL
          await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
          
          // Sample journey data - in a real app, this would come from the API
          const journey: Journey = {
            startStation: start,
            endStation: end,
            routeDetails: [
              {
                mode: 'tube',
                line: 'Jubilee',
                fromStation: 'Start Station',
                toStation: 'Connection Station',
                duration: 15,
                stepFree: true
              },
              {
                mode: 'tube',
                line: 'Central',
                fromStation: 'Connection Station',
                toStation: 'End Station',
                duration: 12,
                stepFree: false
              }
            ],
            duration: 27,
            distance: 8.5,
            steps: 0,
            timestamp: Date.now()
          };
          
          set({ currentJourney: journey, isLoading: false });
          const state = get();
          state.saveJourneyToHistory(journey);
        } catch (error) {
          console.error('Error planning journey:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to plan journey',
            isLoading: false 
          });
        }
      },
      
      resetJourney: () => set({ currentJourney: null }),
      
      saveJourneyToHistory: (journey: Journey) => {
        set((state: JourneyState) => ({
          journeyHistory: [journey, ...state.journeyHistory].slice(0, 10) // Keep only last 10 journeys
        }));
      },
      
      clearHistory: () => set({ journeyHistory: [] }),
      
      removeJourneyFromHistory: (index: number) => {
        set((state: JourneyState) => ({
          journeyHistory: state.journeyHistory.filter((_: any, i: number) => i !== index)
        }));
      }
    }),
    {
      name: 'journey-store', // name of the item in the storage
      partialize: (state: JourneyState) => ({ 
        // Only persist these fields
        journeyHistory: state.journeyHistory,
        routePreference: state.routePreference,
        showAccessibility: state.showAccessibility
      })
    }
  )
); 