import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { AlertProvider, useAlertFunction } from 'shared/providers/alert';
import Alert from 'shared/components/Alert';

const AlertComponent = ({ msg = '' }) => {
  const toastIt = useAlertFunction();
  useEffect(() => {
    toastIt(msg, 'green');
  }, [msg]);
  return <Alert />;
};

test('<AlertBox />', () => {
  const { getByTestId, queryByRole, rerender } = render(
    <AlertProvider>
      <AlertComponent msg="something" />
    </AlertProvider>,
  );

  expect(getByTestId('alert.message').textContent).toContain('something');

  rerender(
    <AlertProvider>
      <AlertComponent msg="" />
    </AlertProvider>,
  );

  expect(queryByRole('alert')).toHaveClass('hidden');
});
