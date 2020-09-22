import { Input } from 'shared/types';

export type Props = Omit<Input, 'onChange' | 'value'> & {
  containerClassName?: string;
  iconClassName?: string;
  value?: string;
  onChange(v: string): void;
};
