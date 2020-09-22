import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { CacheFirst } from 'workbox-strategies/CacheFirst';
import { StaleWhileRevalidate } from 'workbox-strategies/StaleWhileRevalidate';
import cacheNames from 'shared/consts/cacheNames';
import * as navigationPreload from 'workbox-navigation-preload';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

navigationPreload.enable();
const networkOnly = new NetworkOnly();
const navigationHandler = async params => {
  try {
    return await networkOnly.handle(params);
  } catch (error) {
    return caches.match('/offline.html', {
      ignoreSearch: true,
    });
  }
};
registerRoute(new NavigationRoute(navigationHandler));

skipWaiting();
clientsClaim();

registerRoute(
  new RegExp('.+/reference/.+'),
  new StaleWhileRevalidate({
    cacheName: cacheNames.ref.name,
  }),
);
registerRoute(
  /.*(?:googleapis|gstatic)\.com.*$/,
  new CacheFirst({
    cacheName: cacheNames.googleFonts.name,
  }),
);

// TODO or not TODO...
precacheAndRoute(self.__WB_MANIFEST);

self.__WB_DISABLE_DEV_LOGS;
