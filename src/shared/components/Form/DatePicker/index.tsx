/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useCallback } from 'react';
import { useField } from 'formik';
import DatePicker from 'shared/components/DatePicker/Native';
import FormField from '../Field';
import { SingleFieldProps } from '../types';

type Props = SingleFieldProps;

const DateField = memo((props: Props) => <DatePicker {...props} />);

export default function DatePickerField(props: Props) {
  const {
    name,
    label,
    wrapperClassName = 'w-full',
    ...datePickerProps
  } = props;
  const [field, , helpers] = useField(name);
  const handleDateChange = useCallback(helpers.setValue, []);
  const handleBlur = useCallback(() => {
    helpers.setTouched(true);
    helpers.setError(field.value ? '' : 'validation.required');
  }, [field.value]);
  const fieldVal = (field.value || '').split('T')[0];

  return (
    <FormField label={label} name={name} wrapperClassName={wrapperClassName}>
      <DateField
        id={name}
        value={fieldVal}
        onChange={handleDateChange}
        onBlur={handleBlur}
        {...datePickerProps}
      />
    </FormField>
  );
}
