/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useEffect } from 'react';
import useFetchOptions from 'shared/hooks/useFetchOptions';
import SelectField from './SelectField';
import { FormSelectProps as Props } from './types';
import { useField } from 'formik';

export default function FormSelect(props: Props) {
  const {
    url,
    name,
    label,
    valueKey,
    labelKey,
    className,
    ...selectProps
  } = props;
  const [, , helpers] = useField(name);

  const { options, isLoading, error } = useFetchOptions({
    url,
    labelKey,
    valueKey,
  });

  useEffect(() => {
    if (error) {
      helpers.setError(error?.message);
    } else {
      helpers.setError('');
    }
  }, [error?.message]);

  const selectOpts = useMemo(() => options, [options, isLoading]);

  return (
    <SelectField
      name={name}
      label={label}
      wrapperClassName={className}
      options={selectOpts}
      isLoading={isLoading}
      {...selectProps}
    />
  );
}
