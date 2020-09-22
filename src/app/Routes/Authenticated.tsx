import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazyLoad } from 'shared/utils/ui';

const MapUsed1 = lazyLoad(() => import('app/MapUsed1'));
const MapUsed2 = lazyLoad(
  () => import('app/MapUsed2'),
);

export default function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="profile" element={<MapUsed1 />} />
      <Route path="send" element={<MapUsed2 />} />
    </Routes>
  );
}
