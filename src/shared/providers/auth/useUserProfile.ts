import { useState, useCallback } from 'react';
import storage from 'shared/services/storage';
import { StorageKeys } from 'shared/consts';
import { AppUser } from 'shared/types';
import { userProfileTemplate } from './consts';

/**
 * Reads/sets user (profile) from storage
 */
export default function useUserProfie(): [
  AppUser,
  (u: AppUser) => void,
  () => void,
] {
  const [appUser, setUser] = useState<AppUser>(
    storage.local.getItem(StorageKeys.user) || userProfileTemplate,
  );

  const setAppUser = useCallback((user: AppUser): void => {
    setUser(curUser => {
      const newUser = { ...curUser, ...user };
      storage.local.setItem(StorageKeys.user, newUser);
      return newUser;
    });
  }, []);

  const unsetAppUser = useCallback((): void => {
    storage.local.removeItem(StorageKeys.user);
    setUser(userProfileTemplate);
  }, []);

  return [appUser, setAppUser, unsetAppUser];
}
