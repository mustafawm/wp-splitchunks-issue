/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, memo } from 'react';
import Map, { Props as MapProps } from 'shared/components/Map';


const MapField = memo((props: MapProps) => <Map {...props} />);

export default function FormMapField(props) {

  const [lat, lng] =  [100, 100];

  const handleMarkerMove = useCallback((lat: number, lng: number): void => {
    console.log('done');
  }, []);

  return (
    <MapField
      lat={lat}
      lng={lng}
      onMarkerMove={handleMarkerMove}
      {...props}
    />
  );
}
