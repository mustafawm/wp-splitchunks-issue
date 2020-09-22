/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, queryCache } from 'react-query';
import { url, queryKeys } from 'shared/consts';
import { TransferProduct, TransferStatus, ErrResp } from 'shared/types';
import httpClient from 'shared/services/api';

export function useRejectTransfer(companyGuid: string) {
  const requestsQueryKey = queryKeys.requests(companyGuid);

  function rejectIt(inventoryTransferRequestGuid: string) {
    return httpClient.post(`${url.api.company.reject(companyGuid)}`, {
      inventoryTransferRequestGuid,
    });
  }

  return useMutation<any, ErrResp, string>(rejectIt, {
    onMutate: (guid: string) => {
      queryCache.cancelQueries(requestsQueryKey);
      const snapshot = queryCache.getQueryData(requestsQueryKey);
      queryCache.setQueryData(
        requestsQueryKey,
        (prev: TransferProduct[] = []) =>
          prev.map(transfer => {
            if (transfer.guid === guid) {
              return {
                ...transfer,
                status: TransferStatus.ReceiverRejected,
              };
            }
            return transfer;
          }),
      );
      return snapshot;
    },
    onError: (error, data, snapshot) =>
      queryCache.setQueryData(requestsQueryKey, snapshot),
    onSettled: () => queryCache.invalidateQueries(requestsQueryKey),
  });
}
