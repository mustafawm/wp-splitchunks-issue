/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, queryCache } from 'react-query';
import { FormikValues } from 'formik';
import { url, queryKeys } from 'shared/consts';
import httpClient from 'shared/services/api';
import { InventoryPrdocut, TransferProduct, ErrResp } from 'shared/types';
import { useUserCompanyGuid } from 'shared/providers/auth';

export function useTransferProduct(transferGuid?: string) {
  const companyGuid = useUserCompanyGuid();
  const transfersQueryKey = queryKeys.transfers(companyGuid);
  const requestUrl = url.api.company.transfer(companyGuid);

  function sendIt(values: FormikValues): Promise<Partial<InventoryPrdocut>> {
    const data = values;
    return transferGuid
      ? httpClient.put(requestUrl, {
          ...values,
          inventoryTransferRequestGuid: transferGuid,
        })
      : httpClient.post(requestUrl, data);
  }

  return useMutation<any, ErrResp, TransferProduct>(sendIt, {
    onMutate: (data: TransferProduct) => {
      queryCache.cancelQueries(transfersQueryKey);
      const snapshot = queryCache.getQueryData(transfersQueryKey);
      queryCache.setQueryData(
        transfersQueryKey,
        (prev: TransferProduct[] = []) => {
          if (transferGuid) {
            return prev.map(t => {
              if (t.inventoryTransferRequestGuid === transferGuid) {
                return data;
              }
              return t;
            });
          }
          return prev;
        },
      );
      return snapshot;
    },
    onError: (error, data, snapshot) =>
      queryCache.setQueryData(transfersQueryKey, snapshot),
    onSettled: () => queryCache.invalidateQueries(transfersQueryKey),
  });
}
