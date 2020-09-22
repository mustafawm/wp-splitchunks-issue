import { ComponentType } from 'react';
import { renderHook, cleanup } from '@testing-library/react-hooks';
import { UserRole } from 'shared/types';
import { url, StorageKeys } from 'shared/consts';
import storage from 'shared/services/storage';
import { useAuth } from 'shared/providers/auth';
import { userProfileTemplate } from 'shared/providers/auth/consts';
import { oidc_user } from './data';
import ContextWrapper from './ContextWrapper';

beforeEach(() => {
  storage.local.removeItem(StorageKeys.user);
  window.localStorage.removeItem(StorageKeys.auth);
});
afterEach(() => {
  cleanup();
});

describe('<AuthProvider> authentication workflow', () => {
  test(`Redirects unauthed users to ${url.web.base}`, () => {
    window.history.pushState({}, 'Testing', url.web.products);
    renderHook(useAuth, { wrapper: ContextWrapper as ComponentType });
    expect(window.location.pathname).toEqual(url.web.base);
  });

  test(`Redirects to ${url.web.checkProfile} if isProfileComplete: undefined`, async () => {
    window.localStorage.setItem(StorageKeys.auth, JSON.stringify(oidc_user));
    storage.local.setItem(StorageKeys.user, {
      ...userProfileTemplate,
      isProfileComplete: undefined,
    });
    const { waitForNextUpdate } = renderHook(useAuth, {
      wrapper: ContextWrapper as ComponentType,
    });
    await waitForNextUpdate();
    expect(
      window.location.pathname.endsWith(url.web.checkProfile),
    ).toBeTruthy();
  });

  test(`Redirects to ${url.web.signup} if isProfileComplete: false`, async () => {
    window.localStorage.setItem(StorageKeys.auth, JSON.stringify(oidc_user));
    storage.local.setItem(StorageKeys.user, {
      ...userProfileTemplate,
      isProfileComplete: false,
    });
    const { waitForNextUpdate } = renderHook(useAuth, {
      wrapper: ContextWrapper as ComponentType,
    });
    await waitForNextUpdate();
    expect(window.location.pathname).toEqual(url.web.signup);
  });

  test('Redirects to home page (as per role) if isProfileComplete: true', async () => {
    window.history.pushState({}, 'Testing', `${url.web.signup}`);
    window.localStorage.setItem(StorageKeys.auth, JSON.stringify(oidc_user));
    storage.local.setItem(StorageKeys.user, {
      ...userProfileTemplate,
      isProfileComplete: true,
      role: UserRole.Farmer,
    });
    const { waitForNextUpdate } = renderHook(useAuth, {
      wrapper: ContextWrapper as ComponentType,
    });
    await waitForNextUpdate();
    expect(window.location.pathname.endsWith(url.web.products)).toBeTruthy();
  });

  test('Does not redirect authed users when they are on a non-[sign(in|up)] page', async () => {
    const currentUrl = url.web.products;
    window.history.pushState({}, 'Testing', currentUrl);
    window.localStorage.setItem(StorageKeys.auth, JSON.stringify(oidc_user));
    storage.local.setItem(StorageKeys.user, {
      ...userProfileTemplate,
      isProfileComplete: true,
      role: UserRole.Farmer,
    });
    const { waitForNextUpdate } = renderHook(useAuth, {
      wrapper: ContextWrapper as ComponentType,
    });
    await waitForNextUpdate();
    expect(window.location.pathname).toEqual(currentUrl);
  });
});
