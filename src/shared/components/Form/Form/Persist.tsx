/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';
import storage from 'shared/services/storage';
import useExtractFormikState from './useExtractFormikState';
import { Persist } from '../types';

export default function FormikPersist(props: Persist): null {
  const { name, type = 'session', ignoreFields = [] } = props;
  const stateRef = useRef<Record<string, any>>({});
  const [state, setState] = useExtractFormikState();

  stateRef.current = state;

  useEffect(() => {
    const storedState = storage[type].getItem(name);

    if (storedState) {
      setState(storedState);
    }

    return (): void => {
      Object.keys(stateRef.current).forEach(key => {
        ignoreFields.forEach(field => {
          delete stateRef.current[key][field];
        });
      });

      storage[type].setItem(name, stateRef.current);
    };
  }, []);

  return null;
}
