import { userManager } from 'shared/services/oidcClient';
import { baseURL } from '../consts';
import { extractResponseError } from '../helpers';

// https://github.com/github/fetch/issues/89#issuecomment-256610849
export default async function uploadResource(
  url: string,
  opts: {
    method: string;
    data: ReadableStream<Uint8Array>;
  },
  onProgress?: (e: ProgressEvent<EventTarget>['target']) => void,
) {
  const authedUser = await userManager.getUser();

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(opts.method, `${baseURL}/${url}`);
    xhr.setRequestHeader('Accept', 'multipart/form-data');
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.setRequestHeader(
      'Authorization',
      `${authedUser?.token_type} ${authedUser?.access_token}`,
    );

    xhr.onload = evt => resolve(evt.target.response);
    xhr.onerror = reject;

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200 && (xhr.status >= 400 || xhr.status <= 599)) {
          reject(extractResponseError(xhr.response, xhr));
        }
      }
    };

    xhr.onreadystatechange;

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress;
    }
    xhr.send(opts.data);
  });
}
