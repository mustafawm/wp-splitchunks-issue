import { useEffect } from 'react';
import { Ref } from 'shared/types';

type Evt = MouseEvent | TouchEvent | KeyboardEvent;
/**
 * Captures clicks outside the ref'd element
 * NOTE: the event listener here is attached to the DOM
 * keep that in mind when you have more than one component using
 * this hook at the same time.
 *
 * @param ref React Ref
 * @param handler function to handle clicking outside the ref
 */
export default function useOnClickOutside(
  ref: Ref,
  handler?: (e: Evt) => void,
): void {
  useEffect(() => {
    function handleEvent(evt: Evt): void {
      if (!ref.current || ref.current.contains(evt.target as Node)) {
        return;
      }
      handler && handler(evt);
    }

    if (handler) {
      document.addEventListener('keypress', handleEvent);
      document.addEventListener('mousedown', handleEvent);
      document.addEventListener('touchstart', handleEvent);
    }

    return (): void => {
      if (handler) {
        document.removeEventListener('keypress', handleEvent);
        document.removeEventListener('mousedown', handleEvent);
        document.removeEventListener('touchstart', handleEvent);
      }
    };
  }, [ref, handler]);
}
