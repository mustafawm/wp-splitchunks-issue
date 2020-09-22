import { useEffect, useState } from 'react';

export default function useUserLocation(
  defaultVals = [0, 0],
): [number, number] {
  const [coords, setCoords] = useState<[number, number]>(
    defaultVals as [number, number],
  );
  useEffect(() => {
    // on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setCoords([coords.latitude, coords.longitude]);
      });
    } else {
      // eslint-disable-next-line no-console
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return coords;
}
