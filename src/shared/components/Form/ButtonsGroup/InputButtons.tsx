import React, { memo } from 'react';
import InputBox from 'shared/components/InputBox';
import { InputButtonProps as Props } from './types';

const itemIsChecked = (
  fieldValue: string | string[],
  itemValue: string,
): boolean =>
  Array.isArray(fieldValue)
    ? fieldValue.includes(itemValue)
    : fieldValue === itemValue;

function InputButtons(props: Props) {
  const { type, name, options = [], value = '', onChange } = props;

  const buttons = options.map(el => (
    <InputBox
      key={el.value}
      type={type}
      name={name}
      label={el.label}
      value={el.value}
      onChange={onChange}
      checked={itemIsChecked(value, String(el.value))}
    />
  ));
  return <>{buttons}</>;
}

export default memo(InputButtons);
