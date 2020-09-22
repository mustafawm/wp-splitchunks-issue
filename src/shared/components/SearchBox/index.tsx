/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import classNames from 'classnames';
import Button from 'shared/components/Button';
import Magnifier from 'shared/svgs/Magnifier.svg';
import { Props } from './types';

export default function SearchBox(props: Props) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  // extract all custom props so only valid HTML <input /> props are ...gathered
  const {
    onSearch,
    onCancel,
    triggerOnEnter = false,
    inputRef,
    className,
    ...inputProps
  } = props;

  function handleFocus(evt: React.FocusEvent<HTMLInputElement>): void {
    setIsFocused(true);
    props.onFocus && props.onFocus(evt);
  }
  function handleBlur(evt: React.FocusEvent<HTMLInputElement>): void {
    setIsFocused(false);
    props.onBlur && props.onBlur(evt);
  }
  function handleKeyPress(evt: React.KeyboardEvent<HTMLInputElement>): void {
    if (triggerOnEnter && evt.key === 'Enter') {
      onSearch && onSearch();
      return;
    }
    props.onKeyPress && props.onKeyPress(evt);
  }

  const containerCss = classNames(
    'flex h-16 py-6 items-center justify-center shadow rounded-sm',
    className,
    {
      'border-gray-300': isFocused,
    },
  );
  const resetBtnCss = classNames('text-gray-900 mr-2 p-0', {
    hidden: !props.value || !onCancel,
  });

  return (
    <div className={containerCss}>
      <div className="flex w-full items-center">
        <span className="text-green-600">
          <Magnifier className="w-6 h-6 ml-4 fill-current" />
        </span>
        <input
          inputMode="search"
          aria-label="Search products"
          className="h-full w-11/12 px-3 focus:outline-none text-xs sm:text-xl"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          ref={inputRef}
          {...inputProps}
        />
      </div>
      <div className="flex flex-row-reverse mr-4">
        {onSearch && <Button text="Search" onClick={onSearch} />}
        <Button
          text="X"
          color="white"
          onClick={onCancel}
          title="reset search"
          className={resetBtnCss}
          aria-label="Reset search filters"
        />
      </div>
    </div>
  );
}
