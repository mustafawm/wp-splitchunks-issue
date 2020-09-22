import { ReactElement } from 'react';
import { Option } from 'shared/types';

export type Props = {
  type: 'radio' | 'checkbox';
  options: Option[];
  selected: string | string[];
  onChange(v: string): void;
  filterCount?: Record<string, number>;
  wrapperClassName?: string;
  className?: string;
  label?: string | ReactElement;
  isLoading?: boolean;
};

export type InputButtonProps = {
  type: 'radio' | 'checkbox';
  options?: Option[];
  name: string;
  onChange(value: string): void;
  value: string | string[];
};
