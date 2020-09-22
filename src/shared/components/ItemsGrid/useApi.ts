/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';
import { ErrResp } from 'shared/types';
import httpClient from 'shared/services/api';
import { Props } from './types';

export function useFetchGridData({
  queryKey,
  fetchUrl,
}: Pick<Props<any>, 'queryKey' | 'fetchUrl'>) {
  return useQuery<any, ErrResp>({
    queryKey,
    queryFn: () => httpClient.get(fetchUrl),
    config: { refetchOnMount: true, retry: 1 },
  });
}
