/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import { Input } from 'shared/types';

type Props = Input & {
  label: string;
  wrapperClass?: string;
};

export default function InputBox(props: Props) {
  const {
    type = 'checkbox',
    name,
    value,
    label,
    checked,
    onChange,
    wrapperClass,
    ...inputProps
  } = props;

  const wrapperClassName = classNames(
    'flex items-center my-1 py-1',
    wrapperClass,
  );

  return (
    <span className={wrapperClassName}>
      {/* 👇 makes the whole element clickable */}
      <label
        htmlFor={`${label}-id`}
        className="flex items-start cursor-pointer"
      >
        <Icon type={type} checked={checked} />
        <input
          tabIndex={0}
          type={type}
          name={name}
          value={value}
          id={`${label}-id`}
          checked={checked}
          onChange={onChange}
          className="utl-check-input absolute w-0 opacity-0"
          {...inputProps}
        />
        {/* 👇 for accessibility/CSS puposes */}
        <label
          htmlFor={`${label}-id`}
          className="cursor-pointer px-auto bg-transparent text-black"
        >
          {label}
        </label>
      </label>
    </span>
  );
}
