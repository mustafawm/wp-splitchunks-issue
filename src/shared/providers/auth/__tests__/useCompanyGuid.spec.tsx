import { ComponentType } from 'react';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import { StorageKeys } from 'shared/consts';
import { useUserCompanyGuid, useProfile } from 'shared/providers/auth';
import ContextWrapper from './ContextWrapper';
import { oidc_user } from './data';
import { userProfileTemplate } from '../consts';

describe('useCompanyGuid()', () => {
  beforeAll(() => {
    window.localStorage.setItem(StorageKeys.auth, JSON.stringify(oidc_user));
  });
  afterAll(() => {
    window.localStorage.removeItem(StorageKeys.auth);
  });
  afterEach(() => {
    cleanup();
  });

  const useHook = () => {
    const profileCtx = useProfile();
    const companyGuid = useUserCompanyGuid();
    return { profileCtx, companyGuid };
  };

  it('returns user companyGuid or empty string', async () => {
    const { waitForNextUpdate, result } = renderHook(useHook, {
      wrapper: ContextWrapper as ComponentType,
    });
    await waitForNextUpdate();
    expect(result.current.companyGuid).toBe('');
    act(() => {
      result.current.profileCtx.setUserProfile({
        ...userProfileTemplate,
        companyInfo: {
          ...userProfileTemplate.companyInfo,
          guid: 'DUMMY_COMPANY_GUID',
        },
      });
    });
    expect(result.current.companyGuid).toBe('DUMMY_COMPANY_GUID');
  });
});
