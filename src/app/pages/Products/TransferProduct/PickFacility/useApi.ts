/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';
import { ErrResp } from 'shared/types';
import { url, queryKeys } from 'shared/consts';
import httpClient from 'shared/services/api';

export function useFetchFacilities() {
  return useQuery<any, ErrResp>({
    queryKey: queryKeys.facilities(),
    queryFn: () => httpClient.get(`${url.api.company.root}?excludeOwner=true`),
  });
}
