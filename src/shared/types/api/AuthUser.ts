import { AppUser } from './AppUser';

export type AuthUser = {
  id_token: string;
  session_state: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  scope: string;
  profile: {
    s_hash: string;
    sid: string;
    sub: string;
    auth_time: number;
    idp: string;
    amr: string[];
    name?: string;
    given_name?: string;
    family_name?: string;
    website?: string;
    preferred_username?: string;
  };
  expires_at: number;
  state?: object;
  app_user?: AppUser;
};
