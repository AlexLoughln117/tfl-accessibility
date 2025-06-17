declare module 'react-map-gl' {
  import * as React from 'react';
  import * as MapboxGL from 'mapbox-gl';
  
  export interface MapProps {
    initialViewState?: {
      longitude: number;
      latitude: number;
      zoom: number;
    };
    longitude?: number;
    latitude?: number;
    zoom?: number;
    style?: React.CSSProperties;
    mapStyle?: string;
    mapboxAccessToken?: string;
    onLoad?: () => void;
    onMove?: (evt: { viewState: any }) => void;
    children?: React.ReactNode;
  }
  
  export const Map: React.FC<MapProps>;
  
  export interface NavigationControlProps {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  }
  
  export const NavigationControl: React.FC<NavigationControlProps>;
  
  export interface MarkerProps {
    longitude: number;
    latitude: number;
    color?: string;
    anchor?: string;
    children?: React.ReactNode;
  }
  
  export const Marker: React.FC<MarkerProps>;
  
  export interface SourceProps {
    id: string;
    type: string;
    data: any;
    children?: React.ReactNode;
  }
  
  export const Source: React.FC<SourceProps>;
  
  export interface LayerProps {
    id: string;
    type: string;
    layout?: any;
    paint?: any;
  }
  
  export const Layer: React.FC<LayerProps>;
} 