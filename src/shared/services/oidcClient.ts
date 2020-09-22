import {
  UserManager,
  User,
  WebStorageStateStore,
  SignoutResponse,
} from 'oidc-client';

const config = {
  authority: window.__appConfig.AUTH_ISSUER,
  client_id: window.__appConfig.AUTH_CLIENT_ID,
  redirect_uri: `${window.location.origin}${window.__appConfig.AUTH_CALLBACK_URI}`,
  post_logout_redirect_uri: window.location.origin,
  response_type: 'code',
  scope: 'openid profile offline_access',
  loadUserInfo: true,
  automaticSilentRenew: true,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

export const userManager = new UserManager(config);

export function startSigninProcess(): Promise<User | void> {
  return userManager.signinRedirect();
}

export function finshSigninProcess(): Promise<User | void> {
  return userManager.signinCallback();
}

export function getUserInfo(): Promise<User | null> {
  return userManager.getUser();
}

export function removeUser(): Promise<void | Error> {
  return userManager.removeUser();
}

export function logOut(id_token_hint: string): Promise<void | SignoutResponse> {
  return userManager.signoutRedirect({ id_token_hint });
}
