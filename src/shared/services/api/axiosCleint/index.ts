/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import { userManager } from 'shared/services/oidcClient';
import { extractResponseError } from '../helpers';
import { baseURL } from '../consts';

const canceller = axios.CancelToken;

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

/**
 * @description intercepts all axios requests (exl errors) to:
 * - Update config to add auth token
 */
instance.interceptors.request.use(async config => {
  const authedUser = await userManager.getUser();

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `${authedUser?.token_type} ${authedUser?.access_token}`,
    },
  };
});

/**
 * @description intercepts all axios responses (inc errors) to:
 * - Clear user storage & redirect to home page on 401 error(s)
 * - Prevent canceled requests from being treated as errors
 * - Extract error text from error object
 */
instance.interceptors.response.use(
  response => {
    // eslint-disable-next-line no-console
    console.info(
      'Using axios when running Cypress (waiting for full fetch support 🤞)',
    );
    return response.data;
  },
  async error => {
    if (error?.response?.status === 401) {
      await userManager.signinSilent();
    } else if (axios.isCancel(error)) {
      return Promise.resolve();
    }
    return Promise.reject(
      extractResponseError(error.response.data, error.response),
    );
  },
);

export type AxioCancelToken = { cancel(): void; token: any } | undefined;
export { canceller, AxiosRequestConfig };
export default instance;
