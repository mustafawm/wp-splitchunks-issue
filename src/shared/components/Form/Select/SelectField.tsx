/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { useField } from 'formik';
import Select from 'shared/components/Select';
import { Option, SelectFieldProps, OptionField } from './types';
import FormField from '../Field';

type Props = { field: object } & SelectFieldProps;

function SelectField(props: Props) {
  const {
    name,
    label,
    wrapperClassName,
    options,
    defaultValue,
    isMulti = false,
    ...selectProps
  } = props;
  const [field, , helpers] = useField(name);
  const setFieldValue = useCallback(helpers.setValue, []);
  const fieldVal = useMemo(() => field.value, [field.value]);

  useEffect(() => {
    if (defaultValue) {
      setFieldValue(defaultValue);
    }
  }, [defaultValue]);

  const onChange = (option: OptionField): void => {
    const value = !option
      ? ''
      : isMulti
      ? (option as Option[]).map((item: Option) => item.value)
      : (option as Option).value;

    setFieldValue(value);
  };

  const getValue = (): Option | Option[] | undefined => {
    if (fieldVal && Array.isArray(options)) {
      return isMulti
        ? options.filter(opt => fieldVal.includes(opt.value))
        : options.find(opt => opt.value == fieldVal);
    }
    return isMulti ? [props.defaultValue] : props.defaultValue || ('' as any);
  };

  return (
    <FormField name={name} label={label} wrapperClassName={wrapperClassName}>
      <Select
        name={name}
        value={getValue()}
        onChange={onChange}
        isMulti={isMulti}
        options={options}
        {...selectProps}
      />
    </FormField>
  );
}

export default memo(SelectField);
