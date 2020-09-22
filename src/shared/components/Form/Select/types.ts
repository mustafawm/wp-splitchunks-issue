import { ValueType, Props as SelectProps } from 'react-select';
import { FieldProps } from 'formik';
import { SingleFieldProps } from '../types';

export { SelectProps, FieldProps };
export type Option = {
  label: string;
  value: string;
};
export type OptionField = ValueType<Option | Option[]>;
export type SelectFieldProps = SingleFieldProps & FieldProps & SelectProps;

export type FormSelectProps = {
  url: string;
  labelKey: string;
  valueKey: string;
  options?: Option[];
} & SelectFieldProps;
