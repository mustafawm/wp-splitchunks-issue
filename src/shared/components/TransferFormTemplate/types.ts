import { ReactElement } from 'react';
import { FormikValues } from 'formik';
import { Props as ProductFieldProps } from 'shared/components/ProductInfo/types';

export type Props = {
  title: string;
  buttonType: 'button' | 'submit' | 'reset';
  buttonDisabled?: boolean;
  isReviewing: boolean;
  onConfirm(values: FormikValues): void;
  onCancel(): void;
  productInfoProps: ProductFieldProps;
  children: ReactElement;
  ProductInfoBottom?: ReactElement;
};
