import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import { lazyLoad } from 'shared/utils/ui';
import SignUp from 'app/pages/LogInOutRegister/SignUp';
// const SignUp = lazyLoad(() => import(''));

export default function UnauthenticatedRoutes() {
  return (
      <Routes>
        <Route path="signup" element={<SignUp />} />
      </Routes>
  );
}
