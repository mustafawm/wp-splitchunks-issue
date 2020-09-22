/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, queryCache } from 'react-query';
import { url, queryKeys } from 'shared/consts';
import httpClient from 'shared/services/api';
import useFetchOptions from 'shared/hooks/useFetchOptions';
import { InventoryPrdocut, Option, ErrResp } from 'shared/types';

export function useDeleteInventory(companyGuid: string) {
  const productsQueryKey = queryKeys.inventories(companyGuid);

  function deleteIt(product: InventoryPrdocut) {
    return httpClient.delete(
      `${url.api.company.inventory(companyGuid)}/${
        product.companyInventoryGuid
      }`,
    );
  }

  return useMutation<any, ErrResp, InventoryPrdocut>(deleteIt, {
    onMutate: (productObj: InventoryPrdocut) => {
      queryCache.cancelQueries(productsQueryKey);
      const snapshot = queryCache.getQueryData(productsQueryKey);
      queryCache.setQueryData(
        productsQueryKey,
        (prev: InventoryPrdocut[] = []) =>
          prev.filter(
            prod =>
              prod.companyInventoryGuid !== productObj.companyInventoryGuid,
          ),
      );
      return snapshot;
    },
    onError: (error, data, snapshot) =>
      queryCache.setQueryData(productsQueryKey, snapshot),
    onSettled: () => queryCache.invalidateQueries(productsQueryKey),
  });
}

export function useFetchProvinces(): Option[] {
  const { options } = useFetchOptions({
    url: url.api.reference.locationAreas,
    labelKey: 'name',
    valueKey: 'value',
  });

  return options;
}
