/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useAlertFunction } from 'shared/providers/alert';
import ButtonsGroup from 'shared/components/ButtonsGroup';
import Label from './Label';
import { Filters, FiltersGroupProps as Props } from './types';

export default function FiltersGroup(props: Props) {
  const {
    options,
    isLoading,
    error,
    onLabelClick,
    mobileActiveFilter,
    filterName,
    label,
    selected,
    filterCount,
    isMobile,
    ...btnGroupProps
  } = props;
  const isOpen = mobileActiveFilter === filterName;
  const toastIt = useAlertFunction();

  // options contains selected filter(s)
  const containsSelected = options.some(opt =>
    Array.isArray(selected)
      ? selected.includes(opt.value)
      : opt.value === selected,
  );

  useEffect(() => {
    if (error) {
      toastIt(error.message, 'red');
    }
  }, [error]);

  const toggleGroup = useCallback(() => {
    onLabelClick(filterName as Filters);
  }, [filterName]);

  const wrapperClass = classNames(isOpen && 'w-11/12 mx-auto bg-ice');
  const groupClass = classNames(
    'flex flex-col justify-between w-full',
    isOpen ? 'block' : 'hidden',
    'md:block',
  );

  // mobile only
  if (!isOpen && mobileActiveFilter) {
    return null;
  }
  return (
    <ButtonsGroup
      {...btnGroupProps}
      selected={selected}
      wrapperClassName={wrapperClass}
      className={groupClass}
      options={options}
      isLoading={isLoading}
      filterCount={filterCount}
      label={
        <Label
          onClick={toggleGroup}
          isOpen={isOpen}
          isMobile={isMobile}
          text={label as string}
          containsSelected={containsSelected}
        />
      }
    />
  );
}
