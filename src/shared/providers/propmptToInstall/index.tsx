/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { Children } from 'shared/types';
import { IBeforeInstallPromptEvent, PromptCtx } from './types';

const PromptToInstall = createContext<PromptCtx>({
  deferredEvt: null,
  invalidateEvt: () => undefined,
});

export function PromptToInstallProvider(props: Children) {
  const [
    deferredEvt,
    setDeferredEvt,
  ] = React.useState<IBeforeInstallPromptEvent | null>(null);

  const invalidateEvt = useCallback(() => {
    setDeferredEvt(null);
  }, []);

  useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredEvt(e);
    };

    window.addEventListener('beforeinstallprompt', ready as any);

    return () => {
      window.removeEventListener('beforeinstallprompt', ready as any);
    };
  }, []);

  return (
    <PromptToInstall.Provider value={{ deferredEvt, invalidateEvt }}>
      {props.children}
    </PromptToInstall.Provider>
  );
}

export function usePromptToInstall() {
  const ctx = useContext(PromptToInstall);
  if (!ctx) {
    throw new Error(
      'Cannot use usePromptToInstall() outside <PromptToInstallProvider />',
    );
  }
  return ctx;
}
