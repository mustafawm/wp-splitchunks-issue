import React from 'react';
import { Route } from 'react-router-dom';
import Register from './Register';

export default function SignUp() {
  return (
    <Route path="register" element={<Register />} />
  );
}
