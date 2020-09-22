import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Children } from 'shared/types';
import { AuthProvider } from 'shared/providers/auth';
import { AlertProvider } from 'shared/providers/alert';

export default function Context(props: Children) {
  return (
    <BrowserRouter>
      <AlertProvider>
        <AuthProvider>{props.children}</AuthProvider>
      </AlertProvider>
    </BrowserRouter>
  );
}
