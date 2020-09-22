import { Business, UserRole } from 'shared/types';
import url from './url';

export { url };
export { default as langs } from './langs';
export { default as cacheNames } from './cacheNames';
export { default as queryKeys } from './queryKeys';
export { default as fileTypes } from './fileTypes';

export const StorageKeys = {
  user: 'user_profile',
  hasPromptediOS: 'asked_ios_install',
  lang: 'lang',
  // named/set by oidc-client
  auth: 'AUTH',
};

export const BusinessTypeUserRoleMap: Record<Business, UserRole> = {
  [Business.Farm]: UserRole.Farmer,
  [Business.ProcessingUnit]: UserRole.ProcessingUnit,
  [Business.PackhouseUnit]: UserRole.PackhouseUnit,
};

// https://stackoverflow.com/a/29696509/2535267
const ua = window.navigator.userAgent;
const iOS = !!ua.match(/iP(ad|od|hone)/i);
const webkit = !!ua.match(/WebKit/i);
const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

export const BROWSER = {
  isStandAlone: window.matchMedia('(display-mode: standalone)').matches,
  isSafari: Boolean(window?.safari),
  isSafariMobile: iOSSafari,
  isChrome: Boolean(window?.chrome),
  isFireFox: /Firefox/i.test(ua),
  canShare: typeof navigator.share === 'function',
};
