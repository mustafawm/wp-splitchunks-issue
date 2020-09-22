import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Accordion from 'shared/components/Accordion';

const Component = () => (
  <Accordion name="test" title="my title">
    <div>something</div>
  </Accordion>
);

test('<Accordion />', () => {
  const { getByRole, queryByRole, rerender } = render(<Component />);

  expect(queryByRole('region')).toBeNull();
  expect(getByRole('button')).toHaveTextContent(/my title/i);
  fireEvent.click(getByRole('button'));
  rerender(<Component />);
  expect(queryByRole('region')).toHaveTextContent(/something/i);
});
