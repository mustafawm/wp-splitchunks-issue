import { useState, useEffect } from 'react';
import storage from 'shared/services/storage';

export default function useDataLength(storageName: string, len: number) {
  const [dataLen, setDataLen] = useState(
    len || (() => storage.local.getItem(storageName)),
  );

  useEffect(() => {
    if (len) {
      storage.local.setItem(storageName, len);
      setDataLen(len);
    }
  }, [storageName, len]);

  return dataLen || 2;
}
