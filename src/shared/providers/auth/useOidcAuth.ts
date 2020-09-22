import { useEffect, useState, useCallback } from 'react';
import { User } from 'oidc-client';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { url } from 'shared/consts';
import { userManager } from 'shared/services/oidcClient';
// import { useAlertFunction } from 'shared/providers/alert';

export default function useOidc(): [
  User | null,
  (u: User) => void,
  () => void,
] {
  const [authUser, setUser] = useState<User | null>(null);
  // const { t } = useTranslation();
  // const navigate = useNavigate();
  // const toastIt = useAlertFunction();

  const unsetAuthUser = useCallback(async () => {
    await userManager.removeUser();
    setUser(null);
  }, []);

  const setAuthUser = useCallback(async (user: User) => {
    await userManager.storeUser(user);
    setUser(user);
  }, []);

  useEffect(() => {
    (async (): Promise<void> => {
      const user = await userManager.getUser();
      if (user) {
        setUser(user);
      }
    })();

    // function handleExpiredSession(): void {
    //   toastIt(t('app.sessionExpiredMsg'), 'white');
    //   navigate(url.web.base);
    // }

    // userManager.events.addAccessTokenExpired(handleExpiredSession);

    // return (): void => {
    //   userManager.events.removeAccessTokenExpired(handleExpiredSession);
    // };
  }, []);

  return [authUser, setAuthUser, unsetAuthUser];
}
