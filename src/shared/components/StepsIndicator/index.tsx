/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Children } from 'shared/types';
import EclipseNotStarted from 'shared/svgs/EclipseNotStarted.svg';
import EclipseCurrent from 'shared/svgs/EclipseCurrent.svg';
import EclipseComplete from 'shared/svgs/EclipseComplete.svg';
import useIsMobileScreen, {
  SmallMobileWidth,
} from 'shared/hooks/useMobileScreen';
import { StepProps } from './types';

function Step(props: StepProps) {
  const { status, description, isLastStep, id, url = '', screenWidth } = props;
  const withUrl = status === 'complete' && url;
  const dataTestId = `${id}-step`;
  const StatusLink = (props: Children) => (
    <span>
      <NavLink to={url}>{props.children}</NavLink>
    </span>
  );
  const svgClass = 'h-3 w-3 sm:h-5 sm:w-5 fill-current';
  let Icon = <EclipseNotStarted className={svgClass} />;
  let wrapperClass = 'text-gray-500';
  let lineClass = classNames(
    'h-1 bg-gray-500',
    (screenWidth as number) < SmallMobileWidth ? 'w-24' : 'w-32',
    'sm:w-56 md:w-64',
  );

  if (status === 'current') {
    Icon = <EclipseCurrent className={`${svgClass} stroke-current stroke-2`} />;
    wrapperClass = 'text-green-600';
  } else if (status === 'complete') {
    Icon = withUrl ? (
      <StatusLink>
        <EclipseComplete className={svgClass} />
      </StatusLink>
    ) : (
      <EclipseComplete className={svgClass} />
    );
    wrapperClass = 'text-green-600';
    lineClass = lineClass.replace('bg-gray-500', 'bg-green-600');
  }

  return (
    <div className="flex flex-col">
      <span className="flex flex-row items-center">
        <span className={wrapperClass} data-testid={dataTestId}>
          {Icon}
        </span>
        {!isLastStep && <div className={lineClass} />}
      </span>
      <span className="text-xs">
        {withUrl ? <StatusLink>{description}</StatusLink> : description}
      </span>
    </div>
  );
}

export default function StepsIndicator(props: {
  steps: StepProps[];
  className?: string;
}) {
  const { steps = [], className } = props;
  const { width } = useIsMobileScreen();
  const wrapperClassName = `h-12 flex justify-center items-center ${className}`;

  if (!Array.isArray(steps) || !steps.length) {
    return null;
  }
  return (
    <span className={wrapperClassName}>
      {steps.map(step => (
        <Step key={step.id} screenWidth={width} {...step} />
      ))}
    </span>
  );
}
