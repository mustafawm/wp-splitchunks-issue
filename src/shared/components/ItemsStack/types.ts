/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { ArrayQueryKey, MutationResult } from 'react-query';
import { ErrResp } from 'shared/types';

export type Props<T> = {
  addText: string;
  fetchUrl: string;
  queryKey: ArrayQueryKey;
  children: (props: {
    items: T[];
    isAddingItem: boolean;
    onCancel(): void;
  }) => ReactElement[] | ReactElement | string;
  LoadingPlaceholder: ReactElement;
  deleteResult: MutationResult<any, ErrResp>;
  submitResult: MutationResult<T, ErrResp>;
  submitMsg?: string;
  deleteMsg?: string;
};
