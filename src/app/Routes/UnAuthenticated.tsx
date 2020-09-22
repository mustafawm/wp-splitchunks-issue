import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MapUsed3 from 'app/MapUsed3';

export default function UnauthenticatedRoutes() {
  return (
      <Routes>
        <Route path="signup" element={<MapUsed3 />} />
      </Routes>
  );
}
