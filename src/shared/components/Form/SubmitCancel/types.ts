import { FormikProps, FormikValues } from 'formik';

export interface Props extends FormikProps<FormikValues> {
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
}
