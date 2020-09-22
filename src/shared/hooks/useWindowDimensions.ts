import { useEffect, useState } from 'react';

function getDimensions(): [number, number] {
  return [
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
  ];
}

export default function useWindowDimensions(): [number, number] {
  const [dimensions, setDimensions] = useState(getDimensions);

  useEffect(() => {
    function onResize(): void {
      setDimensions(getDimensions);
    }
    window.addEventListener('resize', onResize);
    return (): void => window.removeEventListener('resize', onResize);
  }, []);

  return dimensions;
}
