import { MapProps } from 'react-leaflet';

export type Props = {
  lat?: number;
  lng?: number;
  onMarkerMove?(lat: number, lng: number): void;
} & Omit<MapProps, 'children'>;

export type State = {
  lat: number;
  lng: number;
  zoom: number;
};
