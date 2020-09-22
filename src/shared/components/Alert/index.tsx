import React, { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Button from 'shared/components/Button';
import useOnEscPress from 'shared/hooks/useOnEscPress';
import { useAlertMessage, useAlertFunction } from 'shared/providers/alert';

export default function Alert() {
  const toastIt = useAlertFunction();
  const { message, color } = useAlertMessage();
  const timerRef = useRef<number>();
  const closeIt = useCallback(() => toastIt(''), []);
  const onCloseAction = useCallback(() => {
    window.clearTimeout(timerRef.current);
    closeIt();
  }, []);
  useOnEscPress(onCloseAction);
  useEffect(() => {
    if (message) {
      timerRef.current = window.setTimeout(closeIt, 5000) as number;
    }
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, [message]);

  const msgClass = classNames(
    'fixed top-0 right-0 left-0 p-2 z-30 rounded-sm shadow-md',
    color === 'green'
      ? 'bg-green-200 text-green-900'
      : color === 'red'
      ? 'bg-red-200 text-red-900'
      : color === 'blue'
      ? 'bg-blue-200 text-blue-900'
      : color === 'orange'
      ? 'bg-orange-200 text-orange-900'
      : 'bg-gray-100 text-black',
    !message && 'hidden',
  );

  return (
    <div className={msgClass} role="alert">
      <div className="flex justify-center items-center">
        <div className="truncate-1-line mr-4" data-testid="alert.message">
          {String(message)}
        </div>
        <Button
          text="X"
          color="white"
          onClick={onCloseAction}
          data-testid="alert.button"
          className="absolute right-0"
        />
      </div>
    </div>
  );
}
