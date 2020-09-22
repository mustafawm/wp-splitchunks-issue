import { ComponentType } from 'react';
import { StorageKeys } from 'shared/consts';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import useOidc from 'shared/providers/auth/useOidcAuth';
import ContextWrapper from './ContextWrapper';
import { oidc_user } from './data';

describe('useOidc()', () => {
  afterAll(() => {
    window.localStorage.removeItem(StorageKeys.auth);
  });
  afterEach(() => {
    cleanup();
  });

  it('auth user defaults to null', () => {
    window.localStorage.removeItem(StorageKeys.auth);
    const { result } = renderHook(useOidc, {
      wrapper: ContextWrapper as ComponentType,
    });
    expect(result.current[0]).toBeNull();
  });

  it('reads user from localStorage', async () => {
    window.localStorage.setItem(StorageKeys.auth, JSON.stringify(oidc_user));
    const { result, waitForNextUpdate } = renderHook(useOidc, {
      wrapper: ContextWrapper as ComponentType,
    });
    expect(result.current[0]?.access_token).toBe(undefined);
    await waitForNextUpdate();
    expect(result.current[0]?.access_token).toBe(oidc_user.access_token);
  });

  it('usetAuthUser resets to null', async () => {
    window.localStorage.setItem(StorageKeys.auth, JSON.stringify(oidc_user));
    const { result, waitForNextUpdate } = renderHook(useOidc, {
      wrapper: ContextWrapper as ComponentType,
    });
    await waitForNextUpdate();
    expect(result.current[0]?.access_token).toBe(oidc_user.access_token);
    act(() => {
      result.current[2]();
    });
    await waitForNextUpdate();
    expect(result.current[0]).toBeNull();
  });
});
