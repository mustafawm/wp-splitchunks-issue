import { userManager } from 'shared/services/oidcClient';
import { extractResponseError } from '../helpers';
import { baseURL } from '../consts';
import { ReqHeaders, ReqConfig } from '../types';

export default async function client(endpoint: string, reqConfig: ReqConfig) {
  const authedUser = await userManager.getUser();
  const headers: ReqHeaders = {
    Authorization: `${authedUser?.token_type} ${authedUser?.access_token}`,
  };
  const controller = new AbortController();
  const config = {
    signal: controller.signal,
    ...reqConfig,
    headers: {
      ...headers,
      ...(reqConfig.headers
        ? reqConfig.headers
        : { 'Content-Type': 'application/json; charset=utf-8' }),
    },
  };
  if (
    config.body &&
    typeof config.body === 'object' &&
    config.headers['Content-Type']?.includes('application/json')
  ) {
    config.body = JSON.stringify(config.body);
  }

  const promise = window
    .fetch(`${baseURL}/${endpoint}`, config as RequestInit)
    .then(async response => {
      if (response.status === 401) {
        await userManager.signinSilent();
        return {};
      }

      let data = {};
      try {
        data = await response.json();
      } catch (e) {}

      if (response.ok) {
        return data;
      }
      return Promise.reject(extractResponseError(data, response));
    });

  promise.cancel = controller.abort;

  return promise;
}
