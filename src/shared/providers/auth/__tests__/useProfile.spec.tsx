import { ComponentType } from 'react';
import { StorageKeys } from 'shared/consts';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import { useProfile } from 'shared/providers/auth';
import { userProfileTemplate } from 'shared/providers/auth/consts';
import ContextWrapper from './ContextWrapper';
import { oidc_user } from './data';

describe('useProfile() app user', () => {
  beforeAll(() => {
    window.localStorage.setItem(StorageKeys.auth, JSON.stringify(oidc_user));
  });
  afterAll(() => {
    window.localStorage.removeItem(StorageKeys.auth);
  });
  afterEach(() => {
    cleanup();
  });

  it('setUserProfile() & unsetUserProfile()', async () => {
    const { waitForNextUpdate, result } = renderHook(useProfile, {
      wrapper: ContextWrapper as ComponentType,
    });
    await waitForNextUpdate();
    expect(result.current.userProfile.guid).toBe('');
    expect(result.current.userProfile.isProfileComplete).toBeFalsy();
    act(() => {
      result.current.setUserProfile({
        ...userProfileTemplate,
        guid: 'DUMMY_GUID',
        isProfileComplete: true,
      });
    });
    expect(result.current.userProfile.guid).toBe('DUMMY_GUID');
    expect(result.current.userProfile.isProfileComplete).toBeTruthy();
    act(() => {
      result.current.unsetUserProfile();
    });
    expect(result.current.userProfile.guid).toBe('');
    expect(result.current.userProfile.isProfileComplete).toBeFalsy();
  });
});
