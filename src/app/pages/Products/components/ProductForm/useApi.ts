/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, queryCache, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { url, queryKeys } from 'shared/consts';
import { InventoryPrdocut, ErrResp } from 'shared/types';
import httpClient from 'shared/services/api';

export function useSubmitInventory(companyGuid: string) {
  const isOnCombinePage = window.location.pathname.endsWith('combine');
  const productsQueryKey = queryKeys.inventories(companyGuid);

  function submitIt(values: InventoryPrdocut) {
    const data = { ...values };
    if (data?.companyInventoryGuid.length !== 36) {
      delete data.companyInventoryGuid;
    }
    if (isOnCombinePage) {
      return httpClient.post(url.api.company.combine(companyGuid), data);
    }
    return httpClient.put(url.api.company.inventory(companyGuid), data);
  }

  return useMutation<any, ErrResp, InventoryPrdocut>(submitIt, {
    onMutate: (data: InventoryPrdocut) => {
      queryCache.cancelQueries(productsQueryKey);
      const snapshot = queryCache.getQueryData(productsQueryKey);
      queryCache.setQueryData(
        productsQueryKey,
        (prev: InventoryPrdocut[] = []) => {
          if (data.companyInventoryGuid) {
            return prev.map(prod => {
              if (prod.companyInventoryGuid === data.companyInventoryGuid) {
                return data;
              }
              return prod;
            });
          }
          data.companyInventoryGuid = Date().toLocaleString();
          return [...prev, data];
        },
      );
      return snapshot;
    },
    onError: (error, data, snapshot) =>
      queryCache.setQueryData(productsQueryKey, snapshot),
    onSettled: () => queryCache.invalidateQueries(productsQueryKey),
  });
}

export function useFetchProductDetails(companyGuid: string) {
  const { productGuid } = useParams();

  return useQuery<any, ErrResp>({
    queryKey: queryKeys.inventory(productGuid as string),
    queryFn: () =>
      httpClient.get(
        `${url.api.company.inventory(companyGuid)}/${productGuid}`,
      ),
    config: {
      refetchOnWindowFocus: false,
      enabled: Boolean(productGuid),
      initialData: () => {
        const inventories: InventoryPrdocut[] =
          queryCache.getQueryData(queryKeys.inventories(companyGuid)) || [];
        return inventories.find(
          inv => inv.companyInventoryGuid === productGuid,
        );
      },
      initialStale: true,
    },
  });
}
