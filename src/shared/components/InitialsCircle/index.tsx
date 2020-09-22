/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import { Div } from 'shared/types';

type Props = { firstName?: string; lastName?: string } & Div;

export default function InitialsCircle(props: Props) {
  const { firstName, lastName, className = '', ...divProps } = props;

  const initials = firstName
    ? `${firstName[0]}${lastName ? lastName[0] : firstName[1]}`
    : 'N/A';
  const css = classNames(
    'rounded-full text-gray-100 flex items-center justify-center bg-blue-600 uppercase',
    className,
  );

  return (
    <div className={css} {...divProps}>
      {initials}
    </div>
  );
}
