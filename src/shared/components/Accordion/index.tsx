/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, ReactElement } from 'react';
import Button from 'shared/components/Button';
import Arrow from 'shared/svgs/Arrow.svg';

type Props = {
  name: string;
  title: string | ReactElement | ReactElement[];
  isOpen?: boolean;
  children: any;
  className?: string;
};

export default function Accordion(props: Props) {
  const { title, name, children, className, isOpen = false } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(isOpen);
  const toggle = useCallback(() => setIsExpanded(isOpen => !isOpen), []);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <Button
        color="white"
        onClick={toggle}
        id={`${name}-header`}
        aria-expanded={isExpanded}
        aria-controls={`${name}-body`}
        className={`bg-white border capitalize ${
          isExpanded ? 'border-b-0' : ''
        }`}
      >
        <span className="w-full flex justify-center relative">
          <span className="w-full font-normal">{title}</span>
          <span
            className={`absolute right-0 text-gray-900 ${
              isExpanded ? '' : 'rotate-180'
            }`}
          >
            <Arrow className="w-5 h-5 fill-current" />
          </span>
        </span>
      </Button>
      {isExpanded && (
        <div
          role="region"
          id={`${name}-body`}
          aria-labelledby={`${name}-header`}
          className="border border-t-0 py-2 px-5"
        >
          {children}
        </div>
      )}
    </div>
  );
}
