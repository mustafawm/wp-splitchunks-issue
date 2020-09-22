import { ComponentType } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useUserMustBe } from 'shared/providers/auth';
import { StorageKeys, url } from 'shared/consts';
import { UserRole } from 'shared/types';
import ContextWrapper from './ContextWrapper';
import { oidc_user } from './data';
import { userProfileTemplate } from '../consts';

describe('useUserMustBe()', () => {
  beforeAll(() => {
    window.localStorage.setItem(StorageKeys.auth, JSON.stringify(oidc_user));
  });
  afterAll(() => {
    window.localStorage.removeItem(StorageKeys.auth);
  });

  it('Redirects to user access denied page when trying to access different role url', async () => {
    window.history.pushState({}, 'Testing', url.web.published);
    window.localStorage.setItem(
      StorageKeys.user,
      JSON.stringify({
        ...userProfileTemplate,
        isProfileComplete: true,
        role: UserRole.PackhouseUnit,
      }),
    );
    const { waitForNextUpdate } = renderHook(
      () => useUserMustBe([UserRole.Farmer]),
      {
        wrapper: ContextWrapper as ComponentType,
      },
    );
    await waitForNextUpdate();
    expect(window.location.pathname).toMatch(url.web.not_authed);
  });

  it('Does not redirect when user accessing their own role url', async () => {
    window.history.pushState({}, 'Testing', url.web.products);
    window.localStorage.setItem(
      StorageKeys.user,
      JSON.stringify({
        ...userProfileTemplate,
        isProfileComplete: true,
        role: UserRole.Farmer,
      }),
    );
    const { waitForNextUpdate } = renderHook(
      () => useUserMustBe([UserRole.Farmer]),
      {
        wrapper: ContextWrapper as ComponentType,
      },
    );
    await waitForNextUpdate();
    expect(window.location.pathname).not.toMatch(url.web.not_authed);
  });
});
