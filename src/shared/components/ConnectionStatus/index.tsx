import React, { useEffect, useState } from 'react';

export default function BrowserConnectionStatus(
  props = {
    message: 'You are not connected to the internet',
  },
) {
  const { message } = props;
  const [showMsg, setShowMsg] = useState(!window.navigator.onLine);

  useEffect(() => {
    const onOnline = (): void => setShowMsg(false);
    const onOffline = (): void => setShowMsg(true);

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return (): void => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (!showMsg) {
    return null;
  }
  return (
    <div
      role="alert"
      className="fixed top-0 right-0 left-0 z-30 max-w-xs mx-auto flex justify-center bg-red-600 text-white"
    >
      {message}
    </div>
  );
}
