import axiosClient from './axiosCleint';
import fetchClient from './fetchClient';

// TODO https://docs.cypress.io/api/commands/route2.html
const httpClient = window.__appConfig?.USE_AXIOS ? axiosClient : fetchClient;

export default httpClient;
