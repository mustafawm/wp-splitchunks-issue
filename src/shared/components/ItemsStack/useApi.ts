/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, ArrayQueryKey } from 'react-query';
import { ErrResp } from 'shared/types';
import httpClient from 'shared/services/api';

export function useFetchItems(queryKey: ArrayQueryKey, url: string) {
  return useQuery<any, ErrResp>({
    queryKey,
    queryFn: () => httpClient.get(url),
    config: {
      refetchOnMount: true,
      retry: 1,
    },
  });
}
