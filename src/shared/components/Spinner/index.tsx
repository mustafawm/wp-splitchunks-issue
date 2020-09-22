import React from 'react';
import classNames from 'classnames';
import Spinner from 'shared/svgs/Spinner.svg';

export default function LoadingSpinner(props: {
  className?: string;
  svgClassName?: string;
}) {
  const {
    className = 'flex justify-center w-full',
    svgClassName = 'w-20 h-20',
  } = props;
  const wrapperClass = classNames('text-gray-400', className);
  const svgClass = classNames('fill-current', svgClassName);
  return (
    <div className={wrapperClass}>
      <Spinner className={svgClass} />
    </div>
  );
}
