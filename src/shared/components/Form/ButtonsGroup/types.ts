import { ChangeEvent, ReactElement } from 'react';
import { Option } from 'shared/types';

export type Props = {
  type: 'radio' | 'checkbox';
  name: string;
  labelKey: string;
  valueKey: string;
  url?: string;
  wrapperClassName?: string;
  className?: string;
  label?: string | ReactElement;
  translationKey?: string;
};

export type InputButtonProps = {
  type: 'radio' | 'checkbox';
  options?: Option[];
  name: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  value?: string;
};
