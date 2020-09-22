import { User } from 'oidc-client';
import { AppUser } from 'shared/types';

export type AuthCtx = {
  userProfile: AppUser;
  companyGuid: string;
  setUserProfile(u: Partial<AppUser>): void;
  unsetUserProfile(): void;
  setAuthUser(u: User): void;
  unsetAuthUser(): void;
};
