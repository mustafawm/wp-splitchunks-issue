/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, queryCache } from 'react-query';
import { url, queryKeys } from 'shared/consts';
import { InventoryPrdocut, ErrResp } from 'shared/types';
import httpClient from 'shared/services/api';
import { PublishProps } from 'shared/schemas/Publish';
import { useUserCompanyGuid } from 'shared/providers/auth';

export function usePublishProduct() {
  const companyGuid = useUserCompanyGuid();
  const transfersQueryKey = queryKeys.transfers(companyGuid);
  const productsQueryKey = queryKeys.inventories(companyGuid);

  function publishIt(values: PublishProps) {
    return httpClient.post(url.api.company.publish(companyGuid), {
      ...values,
      marketplaces: [values.marketplaces],
    });
  }

  return useMutation<any, ErrResp, PublishProps>(publishIt, {
    onMutate: (reqParams: PublishProps) => {
      queryCache.cancelQueries(productsQueryKey);
      const snapshot = queryCache.getQueryData(productsQueryKey);
      queryCache.setQueryData(
        productsQueryKey,
        (prev: InventoryPrdocut[] = []) => {
          return prev.map(inv => {
            if (inv.companyInventoryGuid === reqParams.companyInventoryGuid) {
              return {
                ...inv,
                quantity: String(
                  Number(inv.quantity) - Number(reqParams.quantity),
                ),
              };
            }
            return inv;
          });
        },
      );
      return snapshot;
    },
    onError: (error, data, snapshot) =>
      queryCache.setQueryData(transfersQueryKey, snapshot),
    onSettled: () => {
      queryCache.invalidateQueries(transfersQueryKey);
      queryCache.invalidateQueries(productsQueryKey);
    },
  });
}
