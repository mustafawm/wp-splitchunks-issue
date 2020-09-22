import useWindowDimensions from './useWindowDimensions';

const MinMediaWidth = 760;
export const SmallMobileWidth = 350;

export default function useIsMobileScreen(minWidth = MinMediaWidth) {
  const [width, height] = useWindowDimensions();

  const isMobile = width <= minWidth;

  return {
    isMobile,
    isPortrait: isMobile && height > width,
    width,
    height,
  };
}
