import client from './client';
// import upload from './upload';
import { ReqConfig } from '../types';

export default {
  get: (endpoint: string, config?: RequestInit) => {
    return client(endpoint, { method: 'GET', ...config });
  },
  post: (endpoint: string, body: ReqConfig['body'], config?: RequestInit) => {
    return client(endpoint, { method: 'POST', body, ...config });
  },
  put: (endpoint: string, body: ReqConfig['body'], config?: RequestInit) => {
    return client(endpoint, { method: 'PUT', body, ...config });
  },
  patch: (endpoint: string, body: ReqConfig['body'], config?: RequestInit) => {
    return client(endpoint, { method: 'PATCH', body, ...config });
  },
  delete: (endpoint: string, config?: RequestInit) => {
    return client(endpoint, { method: 'DELETE', ...config });
  },
  // upload,
};
