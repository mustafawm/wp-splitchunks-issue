/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { ErrResp } from 'shared/types';
import { MutationResult, ArrayQueryKey } from 'react-query/types';
import { Filters } from 'shared/components/FiltersPane/types';

export type Props<T> = {
  fetchUrl: string;
  queryKey: ArrayQueryKey;
  filterItems(items: T[], filters: string[]): T[];
  countFilters(items: T[]): any;
  currentFilters?: string[];
  filterNames: Filters[];
  children: (items: T[]) => ReactElement[] | ReactElement | string;
  delResult: MutationResult<any, ErrResp>;
  filtersPaneClass?: string;
};
