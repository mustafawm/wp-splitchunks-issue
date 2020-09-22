import { Option, ErrResp } from 'shared/types';

export type Props = {
  url: string;
  labelKey: string;
  valueKey: string;
  translationKey?: string;
};

export type ReturnType = {
  options: Option[];
  isLoading: boolean;
  error: ErrResp | null;
};
