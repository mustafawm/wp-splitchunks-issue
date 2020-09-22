import React from 'react';
import { Route } from 'react-router-dom';
import Map from 'shared/components/Form/Map';

export default function MapUsed3() {
  return (
    <Route path="register" element={<Map />} />
  );
}
