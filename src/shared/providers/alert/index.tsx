import React, { createContext, useContext, useState, useMemo } from 'react';
import { Children } from 'shared/types';
import { AlertMessage, AlertFunction, AlertColor } from './types';

const AlertMessageCtx = createContext<AlertMessage | null>(null);
const AlertFunctionCtx = createContext<AlertFunction | null>(null);

export function AlertProvider({ children }: Children) {
  const [alert, setAlert] = useState<AlertMessage>({
    message: '',
    color: 'green',
  });

  const toastIt = (message = '', color: AlertColor = 'green'): void => {
    setAlert({ message, color });
  };

  const alertMsg = useMemo(() => alert, [alert.message, alert.color]);

  return (
    <AlertMessageCtx.Provider value={alertMsg}>
      <AlertFunctionCtx.Provider value={toastIt}>
        {children}
      </AlertFunctionCtx.Provider>
    </AlertMessageCtx.Provider>
  );
}

export function useAlertFunction(): AlertFunction {
  const ctx = useContext(AlertFunctionCtx);
  if (!ctx) {
    throw new Error('Cannot useAlertFunction() outside <AlertProvider />');
  }
  return ctx;
}

export function useAlertMessage(): AlertMessage {
  const ctx = useContext(AlertMessageCtx);
  if (!ctx) {
    throw new Error('Cannot useAlertMessage() outside <AlertProvider />');
  }
  return ctx;
}
