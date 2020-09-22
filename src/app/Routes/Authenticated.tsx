import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazyLoad } from 'shared/utils/ui';

const ProfileRoutes = lazyLoad(() => import('app/pages/Profile'));
const SendToFacilityPage = lazyLoad(
  () => import('app/pages/Products/TransferProduct/Form'),
);

export default function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="profile" element={<ProfileRoutes />} />
      <Route path="send" element={<SendToFacilityPage />} />
    </Routes>
  );
}
