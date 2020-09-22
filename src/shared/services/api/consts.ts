export const baseURL =
  process.env.NODE_ENV === 'production' ||
  !window.__appConfig.API_URL?.includes('localhost')
    ? window.__appConfig.API_URL
    : '/api';
