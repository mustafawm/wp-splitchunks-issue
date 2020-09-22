/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Props } from './types';

export default function Button(props: Props) {
  const {
    text,
    disabled,
    loading,
    href,
    dataTestid,
    type = 'button',
    color = 'green',
    className = '',
    activeClassName = '',
    children = null,
    ...btnProps
  } = props;
  const isDisabled = disabled || loading;

  const buttonClass = classNames(
    'utl-btn',
    color === 'green'
      ? 'bg-green-600 hover:bg-green-500 active:bg-green-700'
      : color === 'blue'
      ? 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700'
      : color === 'orange'
      ? 'bg-orange-500 hover:bg-orange-400 active:bg-orange-600'
      : color === 'red'
      ? 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
      : color === 'white'
      ? 'bg-transparen text-black'
      : '',
    { 'opacity-50 cursor-not-allowed': isDisabled },
    className,
  );

  if (href && !disabled) {
    return (
      <NavLink
        end
        {...href} // to & state
        onClick={btnProps.onClick as never}
        className={buttonClass}
        activeClassName={activeClassName}
        title={btnProps.title}
        data-testid={dataTestid}
      >
        {children || text}
      </NavLink>
    );
  }
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={buttonClass}
      data-testid={dataTestid}
      {...btnProps}
    >
      {children || text}
    </button>
  );
}
