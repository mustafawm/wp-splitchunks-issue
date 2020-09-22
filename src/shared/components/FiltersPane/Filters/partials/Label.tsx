import React from 'react';
import classNames from 'classnames';
import Button from 'shared/components/Button';
import { LabelProps as Props } from './types';

export default function Label(props: Props) {
  const { onClick, text, isOpen, containsSelected, isMobile } = props;

  const btnClass = classNames(
    'p-0 border py-1 px-2 font-normal',
    'md:cursor-default md:border-none md:m-0 md:p-0 md:font-bold',
    isOpen ? 'hidden' : 'rounded-full',
    containsSelected ? 'text-green-600' : 'text-gray-900',
    'md:text-gray-900', // always gray on non-mobile screens
  );

  return (
    <span className="w-full">
      {isMobile ? (
        <Button
          text={text}
          className={btnClass}
          onClick={onClick}
          color={isOpen ? 'green' : 'white'}
          dataTestid={`${text}-show`}
        />
      ) : (
        <span className={btnClass}>{text}</span>
      )}
      {isOpen && (
        <span className="flex justify-between">
          <span className="font-semibold text-gray-900 pt-1 pl-1">{text}</span>
          <Button
            text="Ｘ"
            color="white"
            className="text-lg p-0"
            onClick={onClick}
            dataTestid={`${text}-hide`}
          />
        </span>
      )}
    </span>
  );
}
