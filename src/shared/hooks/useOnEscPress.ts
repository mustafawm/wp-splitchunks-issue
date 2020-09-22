import { useEffect } from 'react';

export default function useOnEscPress(handleEscPress?: () => void): void {
  const onEsc = (evt: KeyboardEvent): void => {
    if (evt.keyCode === 27) {
      handleEscPress && handleEscPress();
    }
  };

  useEffect(() => {
    if (handleEscPress) {
      document.addEventListener('keydown', onEsc, false);
    }

    return (): void => {
      if (handleEscPress) {
        document.removeEventListener('keydown', onEsc, false);
      }
    };
  }, []);
}
