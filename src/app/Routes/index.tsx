import React from 'react';
import { lazyLoad } from 'shared/utils/ui';

const AuthenticatedApp = lazyLoad(() => import('./Authenticated'));
const UnAuthenticatedApp = lazyLoad(() => import('./UnAuthenticated'));

export default function AppRoutes() {
  const random = Math.random() * 10;

  // if authed
  if (random < 6) {
    return <AuthenticatedApp />;
  }
  return <UnAuthenticatedApp />;
}
