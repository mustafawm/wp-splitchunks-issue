/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { ErrResp, InventoryPrdocut } from 'shared/types';
import { url, queryKeys } from 'shared/consts';
import httpClient from 'shared/services/api';

export function useTraceInventory() {
  const { inventoryGuid } = useParams();
  return useQuery<any, ErrResp>({
    queryKey: queryKeys.trace(inventoryGuid),
    queryFn: () =>
      httpClient.get(`${url.api.blockchain.inventory(inventoryGuid)}`),
    config: {
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  });
}

export function useFetchInventoryData() {
  const { inventoryGuid } = useParams();
  return useQuery<InventoryPrdocut, ErrResp>({
    queryKey: queryKeys.traceInvDetail(inventoryGuid),
    queryFn: () =>
      httpClient.get(`${url.api.blockchain.invDetail(inventoryGuid)}`),
    config: {
      retry: 0,
      refetchOnMount: false,
    },
  });
}
