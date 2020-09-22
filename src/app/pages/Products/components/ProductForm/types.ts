import { FormProps } from 'shared/components/Form';
import { initialValues } from './consts';

export type Props = Omit<
  FormProps,
  'children' | 'initialValues' | 'onSubmit'
> & {
  title: string;
  initialValues?: typeof initialValues;
};
