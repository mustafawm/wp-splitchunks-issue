/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import Caret from 'shared/svgs/Caret.svg';

type Props = {
  className?: string;
  onClick?(): void;
  ariaLabel?: string;
};

function Btn(props: Props) {
  const className = classNames(
    'absolute top-0 mt-16 z-10 bg-transparent border-none cursor-pointer text-gray-100',
    props.className,
  );

  return (
    <button
      onClick={props.onClick}
      className={className}
      aria-label={props.ariaLabel}
    >
      <Caret className="w-5 h-5 fill-current" />
    </button>
  );
}

export function PrevArrow(props: Props) {
  const css = classNames('rotate-90 left-0', props.className);
  return <Btn {...props} className={css} ariaLabel="previous image" />;
}

export function NextArrow(props: Props) {
  const css = classNames('rotate-270 right-0', props.className);
  return <Btn {...props} className={css} ariaLabel="next image" />;
}
