import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from 'shared/components/Button';

test('Render Button', () => {
  const func = jest.fn();

  const { getByTestId } = render(
    <Button title="click me" data-testid="testid" onClick={func} />,
  );

  fireEvent.click(getByTestId('testid'));

  expect(func).toHaveBeenCalledTimes(1);
});
