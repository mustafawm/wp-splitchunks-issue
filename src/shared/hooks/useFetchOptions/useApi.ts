/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';
import { ErrResp } from 'shared/types';
import httpClient from 'shared/services/api';

export function useFetchData(url: string, reqOptions?: object) {
  return useQuery<any, ErrResp>({
    queryKey: [url],
    queryFn: () => httpClient.get(url, reqOptions),
    config: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  });
}
