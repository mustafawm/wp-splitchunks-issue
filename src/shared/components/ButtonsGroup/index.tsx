/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import InputBox from 'shared/components/InputBox';
import LoadingOptions from './Loading';
import { itemIsChecked } from './helpers';
import { Props } from './types';

export default function ButtonsGroup(props: Props) {
  const {
    type,
    options,
    label,
    selected,
    filterCount,
    onChange,
    isLoading,
    className = 'flex justify-between flex-wrap',
    wrapperClassName = '',
    ...divProps
  } = props;

  const buttons = options.map(el => {
    const isChecked = itemIsChecked(selected, String(el.value));
    const counterClass = classNames(
      'px-2 text-xs rounded-md mr-1',
      isChecked ? 'bg-green-100 text-green-900' : 'bg-gray-200 text-gray-900',
    );
    return (
      <span
        key={el.value}
        className="flex justify-between items-center py-2 md:py-0"
      >
        <InputBox
          type={type}
          name={name}
          label={el.label}
          value={el.value}
          onChange={(): void => onChange(el.value)}
          checked={isChecked}
        />
        {filterCount && (
          <span className={counterClass}>
            {el.value in filterCount && filterCount[el.value] > 0
              ? filterCount[el.value]
              : ''}
          </span>
        )}
      </span>
    );
  });

  return (
    <div className={wrapperClassName} {...divProps}>
      <div>{label}</div>
      <div className={className}>
        {isLoading ? <LoadingOptions /> : <>{buttons}</>}
      </div>
    </div>
  );
}
