import React, { memo, useState, useEffect } from 'react';
import { DragEndEvent, LeafletEvent } from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import MarkerIcon from './Marker';
import { State, Props } from './types';
import './LeafletSleep';
import 'leaflet/dist/leaflet.css';

const mapUrl = 'map/url';

function LeafLetMap(props: Props) {
  const { lat = 0, lng = 0, zoom = 10, onMarkerMove } = props;
  const [viewport, setViewport] = useState<State>({ lat, lng, zoom });

  useEffect(() => {
    if (lat && lng) {
      setViewport(prev => ({ ...prev, lat, lng }));
    }
  }, [lat, lng]);

  function handleDragEnd(evt: DragEndEvent): void {
    const { lat, lng } = evt.target._latlng;
    onMarkerMove && onMarkerMove(lat, lng);
  }

  function handleZoomChange(evt: LeafletEvent): void {
    setViewport(prev => ({
      ...prev,
      zoom: evt.target._animateToZoom,
    }));
  }

  const position = [viewport.lat, viewport.lng];
  return (
    <Map
      wakeMessage="wake"
      wakeMessageTouch="wake2"
      wakeTime={870}
      className='h-48 z-0'
      zoom={viewport.zoom}
      onzoomend={handleZoomChange}
      center={position as [number, number]}
      attributionControl={false}
    >
      <TileLayer url={mapUrl} />
      <Marker
        draggable
        ondragend={handleDragEnd}
        position={position as [number, number]}
        icon={MarkerIcon}
      />
    </Map>
  );
}

export default memo(LeafLetMap);
export * from './types';
