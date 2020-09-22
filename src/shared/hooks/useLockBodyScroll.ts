import { useLayoutEffect, useRef } from 'react';

export default function useLockBodyScroll(): void {
  const stylesRef = useRef<Record<string, string>>({});

  useLayoutEffect(() => {
    // store current height/overflow styles
    const styles = window.getComputedStyle(document.body);
    (stylesRef.current.height = styles.height),
      (stylesRef.current.overflow = styles.overflow),
      // Prevent scrolling
      (document.body.style.height = '100%');
    document.body.style.overflow = 'hidden';

    // Reset height/scroll
    return (): void => {
      document.body.style.height = stylesRef.current.height;
      document.body.style.overflow = stylesRef.current.overflow;
    };
  }, []);
}
