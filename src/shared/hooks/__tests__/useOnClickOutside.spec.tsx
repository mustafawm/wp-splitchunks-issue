import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import useOnClickOutside from 'shared/hooks/useOnClickOutside';

const onClickOutside = jest.fn();
const Component = () => {
  const ref = useRef(null);
  useOnClickOutside(ref, onClickOutside);

  return (
    <span data-testid="test">
      <div ref={ref}>something</div>
    </span>
  );
};

test('useOnClickOutside() calls handler on mousedown/touchstart', () => {
  const { getByTestId } = render(<Component />);

  fireEvent.mouseDown(getByTestId('test'));
  expect(onClickOutside).toHaveBeenCalledTimes(1);

  fireEvent.touchStart(getByTestId('test'));
  expect(onClickOutside).toHaveBeenCalledTimes(2);
});
