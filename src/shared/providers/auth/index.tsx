import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Children, UserRole } from 'shared/types';
import { url } from 'shared/consts';
import useOidcAuth from './useOidcAuth';
import useUserProfile from './useUserProfile';
import { AuthCtx } from './types';

const Auth = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: Children) {
  const navigate = useNavigate();
  const [authUser, setAuthUser, unsetAuthUser] = useOidcAuth();
  const [userProfile, setUserProfile, unsetUserProfile] = useUserProfile();

  const urlPathname = window.location.pathname;

  useEffect(() => {
    const isOnLogin = urlPathname.endsWith(url.web.login);
    const isOnLogOut = urlPathname.endsWith(url.web.logout);
    const isOnNotAuthed = urlPathname.endsWith(url.web.not_authed);
    const isOnLanding = urlPathname === url.web.base;
    const isOnCheckProfile = urlPathname.endsWith(url.web.checkProfile);
    const isOnSignUp = urlPathname.includes(url.web.signup);
    const isOnTrace = urlPathname.includes(url.web.trace);
    const isOnSignInUpLand =
      isOnLanding || isOnSignUp || isOnCheckProfile || isOnLogin;

    const profileStatus = userProfile?.isProfileComplete; // undefined || boolean

    if (profileStatus === true) {
      // if (!authUser?.access_token) {
      //   navigate(url.web.login);
      // } else
      if (isOnNotAuthed) {
        // they must have done something, leave 'em there
      } else if (isOnSignInUpLand) {
        navigate(url.web.products);
      }
    } else if (authUser?.access_token) {
      if (profileStatus === undefined && !isOnCheckProfile) {
        navigate(url.web.checkProfile);
      } else if (profileStatus === false && !(isOnSignUp || isOnLogOut)) {
        navigate(url.web.signup);
      }
    } else if (!(isOnSignInUpLand || isOnTrace)) {
      navigate(url.web.base);
    }
  }, [authUser?.expires_at, userProfile?.isProfileComplete, urlPathname]);

  return (
    <Auth.Provider
      value={{
        userProfile: userProfile,
        companyGuid: userProfile?.companyInfo?.guid,
        setUserProfile: useCallback(setUserProfile, []),
        unsetUserProfile: useCallback(unsetUserProfile, []),
        setAuthUser: useCallback(setAuthUser, []),
        unsetAuthUser: useCallback(unsetAuthUser, []),
      }}
    >
      {children}
    </Auth.Provider>
  );
}

// oidc user
export function useAuth(): Pick<AuthCtx, 'setAuthUser' | 'unsetAuthUser'> {
  const ctx = useContext(Auth);
  if (!ctx) {
    throw new Error('Cannot useAuth() outside <AuthProvider />');
  }
  return {
    setAuthUser: useCallback(ctx.setAuthUser, []),
    unsetAuthUser: useCallback(ctx.unsetAuthUser, []),
  };
}

// app user
export function useProfile(): Pick<
  AuthCtx,
  'userProfile' | 'setUserProfile' | 'unsetUserProfile'
> {
  const ctx = useContext(Auth);
  if (!ctx) {
    throw new Error('Cannot useProfile() outside <AuthProvider />');
  }
  return {
    userProfile: ctx.userProfile,
    setUserProfile: useCallback(ctx.setUserProfile, []),
    unsetUserProfile: useCallback(ctx.unsetUserProfile, []),
  };
}

// user company guid
export function useUserCompanyGuid(): string {
  const ctx = useContext(Auth);
  if (!ctx) {
    throw new Error('Cannot useCompanyGuid() outside <AuthProvider />');
  }
  return ctx.companyGuid;
}

export function useUserMustBe(roles: UserRole[] = []): void {
  const ctx = useProfile();
  const navigate = useNavigate();

  if (!ctx) {
    throw new Error('Cannot useUserMustBe() outside <AuthProvider />');
  }
  if (!roles.length) {
    throw new Error('useUserMustBe: role is required');
  }
  const pathname = window.location.pathname;
  useEffect(() => {
    if (!roles.includes(ctx.userProfile.role)) {
      navigate(url.web.not_authed, {
        state: { pathname },
      });
    }
  }, [pathname]);
}

export function useUserRoleIs(roles: UserRole[]): boolean {
  const ctx = useProfile();

  if (!ctx) {
    throw new Error('Cannot useUserRole() outside <AuthProvider />');
  }

  return roles.includes(ctx.userProfile.role);
}
