/* eslint-disable no-console */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'focus-visible';
import 'shared/services/i18n';
import 'assets/styles/index.css';
import App from './App';

ReactDOM.render(
  <Suspense fallback={<p />}>
    <App />
  </Suspense>,
  document.getElementById('root'),
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (window.__appConfig?.NODE_ENV === 'test') {
      return;
    }
    navigator.serviceWorker
      .register('/service-worker.js')
      .catch(err => console.log('Error regisering SW', err));
  });
}

if (module.hot) {
  module.hot.accept();
}
