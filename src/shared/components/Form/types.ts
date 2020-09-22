/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import {
  FieldAttributes,
  FormikConfig,
  FormikProps,
  FormikValues,
} from 'formik';
import { Props as SubmitCancelProps } from './SubmitCancel/types';

export type SingleFieldProps = FieldAttributes<any> & {
  label: string;
  type?: string;
  children?: ReactElement;
  error?: string;
  wrapperClassName?: string;
};

export type Persist = {
  name: string;
  type?: 'local' | 'session';
  ignoreFields?: string[];
};

export interface FormProps
  extends FormikConfig<FormikValues>,
    Pick<SubmitCancelProps, 'onCancel' | 'submitText' | 'cancelText'> {
  title?: string;
  persist?: Persist;
  className?: string;
  useDefaultButtons?: boolean;
  submitOnEnter?: boolean;
  children:
    | ReactElement
    | ReactElement[]
    | ((p: FormikProps<FormikValues>) => ReactElement[] | ReactElement);
  CustomButtons?: (p: SubmitCancelProps) => ReactElement[] | ReactElement;
}

export type FormikFieldProps = FormikProps<FormikValues>;
