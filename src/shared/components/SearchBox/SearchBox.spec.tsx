/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBox from 'shared/components/SearchBox';
import { Props } from './types';

function WrapperComponent(props: Props) {
  const [term, setTerm] = useState<string>('');

  return (
    <SearchBox
      {...props}
      value={term}
      onChange={(e): void => {
        setTerm(e.target.value);
        props.onChange && props.onChange(e);
      }}
      onCancel={(): void => {
        setTerm('');
        props.onCancel && props.onCancel();
      }}
    />
  );
}

test('<SearchBox /> main functions', () => {
  const onChangeFunc = jest.fn();
  const onCancelFunc = jest.fn();
  const onSearchFunc = jest.fn();

  const { getByText, getByTestId, getByLabelText } = render(
    <WrapperComponent
      onSearch={onSearchFunc}
      onCancel={onCancelFunc}
      onChange={onChangeFunc}
      data-testid="testid"
    />,
  );

  const input = getByTestId('testid') as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'orange' } });
  expect(onChangeFunc).toHaveBeenCalledTimes(1);
  expect(input.value).toBe('orange');

  fireEvent.click(getByText('Search'));
  expect(onChangeFunc).toHaveBeenCalledTimes(1);

  fireEvent.keyDown(input, { key: 'Enter', code: 13 });
  expect(onChangeFunc).toHaveBeenCalledTimes(1);

  fireEvent.click(getByLabelText(/reset/i));
  expect(onCancelFunc).toHaveBeenCalledTimes(1);
  expect(input.value).toBe('');
});
