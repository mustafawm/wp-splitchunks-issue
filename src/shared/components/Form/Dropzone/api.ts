/* eslint-disable @typescript-eslint/no-explicit-any */
import { url } from 'shared/consts';
import { till } from 'shared/utils/api';
import httpClient from 'shared/services/api';

export async function sendFile(file: any, uploadType: 'image' | 'file') {
  const data = new FormData();
  data.append('file', file);

  return await till(
    httpClient.post(
      url.api.services[uploadType === 'image' ? 'imageUpload' : 'fileUpload'],
      data,
      {
        headers: {
          Accept: 'multipart/form-data',
        },
      },
    ),
  );
}
