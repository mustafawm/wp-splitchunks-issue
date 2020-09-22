import React, { ReactElement } from 'react';

type Props = {
  name: string | ReactElement;
  value: string | ReactElement;
  className?: string;
  keyClassName?: string;
  valClassName?: string;
};

export default function FieldValue(props: Props) {
  const {
    name,
    value,
    className = '',
    keyClassName = '',
    valClassName = '',
  } = props;

  return (
    <div className={`flex justify-between my-1 text-gray-700 ${className}`}>
      <span className={`text-black ${keyClassName}`}>{name}</span>
      <span className={`text-black ${valClassName}`}>{value}</span>
    </div>
  );
}
