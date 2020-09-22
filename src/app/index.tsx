import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './Routes';

ReactDOM.render(
  <Suspense fallback={<p />}>
    <App />
  </Suspense>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
