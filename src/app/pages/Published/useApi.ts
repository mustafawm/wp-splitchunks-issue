/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, queryCache } from 'react-query';
import { url, queryKeys } from 'shared/consts';
import { TransferProduct, TransferStatus, ErrResp } from 'shared/types';
import httpClient from 'shared/services/api';

export function useCancelTransfer(companyGuid: string) {
  const transfersQueryKey = queryKeys.transfers(companyGuid);

  function cancelIt(transfer: TransferProduct) {
    const reqUrl =
      transfer.status === TransferStatus.Publish
        ? `${url.api.company.publish(companyGuid)}/${transfer.guid}`
        : `${url.api.company.transfer(companyGuid)}/${transfer.guid}`;

    return httpClient.delete(reqUrl);
  }

  return useMutation<any, ErrResp, TransferProduct>(cancelIt, {
    onMutate: transferObj => {
      queryCache.cancelQueries(transfersQueryKey);
      const snapshot = queryCache.getQueryData(transfersQueryKey);
      queryCache.setQueryData(
        transfersQueryKey,
        (prev: TransferProduct[] = []) =>
          prev.filter(t => t.guid !== transferObj.guid),
      );
      return snapshot;
    },
    onError: (error, data, snapshot) =>
      queryCache.setQueryData(transfersQueryKey, snapshot),
    onSettled: () => queryCache.invalidateQueries(transfersQueryKey),
  });
}
