import React, { memo, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { DragEndEvent, LeafletEvent } from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import MarkerIcon from './Marker';
import { mapUrl } from './consts';
import { State, Props } from './types';
import './LeafletSleep';
import 'leaflet/dist/leaflet.css';

function LeafLetMap(props: Props) {
  const { lat = 0, lng = 0, zoom = 10, className, onMarkerMove } = props;
  const [viewport, setViewport] = useState<State>({ lat, lng, zoom });
  const { t } = useTranslation();

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

  const mapCss = classNames('h-48 z-0', className);
  const position = [viewport.lat, viewport.lng];
  return (
    <Map
      wakeMessage={t('form.address.map.wakeMsg')}
      wakeMessageTouch={t('form.address.map.wakeMsgTouch')}
      wakeTime={870}
      className={mapCss}
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
