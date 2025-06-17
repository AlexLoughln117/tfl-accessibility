import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Station } from '../lib/api/tfl';

interface StationState {
  // Station data
  stations: Station[];
  startStation: string | null;
  endStation: string | null;
  stationsLoading: boolean;
  stationsError: string | null;
  searchQuery: string;
  
  // Actions
  setStations: (stations: Station[]) => void;
  setStartStation: (stationId: string | null) => void;
  setEndStation: (stationId: string | null) => void;
  setStationsLoading: (loading: boolean) => void;
  setStationsError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  getFilteredStations: () => Station[];
  getStationById: (id: string) => Station | undefined;
}

export const useStationStore = create<StationState>(
  persist(
    (set, get) => ({
      // Initial state
      stations: [],
      startStation: null,
      endStation: null,
      stationsLoading: false,
      stationsError: null,
      searchQuery: '',
      
      // Actions
      setStations: (stations: Station[]) => set({ stations }),
      
      setStartStation: (stationId: string | null) => set({ startStation: stationId }),
      
      setEndStation: (stationId: string | null) => set({ endStation: stationId }),
      
      setStationsLoading: (loading: boolean) => set({ stationsLoading: loading }),
      
      setStationsError: (error: string | null) => set({ stationsError: error }),
      
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      
      getFilteredStations: () => {
        const state = get() as StationState;
        const { stations, searchQuery } = state;
        
        if (!searchQuery.trim()) {
          return stations;
        }
        
        const query = searchQuery.toLowerCase().trim();
        return stations.filter((station: Station) => 
          station.name.toLowerCase().includes(query)
        );
      },
      
      getStationById: (id: string) => {
        const state = get() as StationState;
        return state.stations.find((station: Station) => station.id === id);
      }
    }),
    {
      name: 'station-store',
      partialize: (state: StationState) => ({ 
        startStation: state.startStation,
        endStation: state.endStation
      })
    }
  )
); 