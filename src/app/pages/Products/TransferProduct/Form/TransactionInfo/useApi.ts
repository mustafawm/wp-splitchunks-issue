/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import { useQuery, queryCache } from 'react-query';
import { ErrResp, TransferProduct } from 'shared/types';
import { url, queryKeys } from 'shared/consts';
import httpClient from 'shared/services/api';

export function useFetchTransferDetails(urlTransferGuid?: string) {
  const { companyGuid } = useParams();

  return useQuery<any, ErrResp>({
    queryKey: queryKeys.transfer(urlTransferGuid as string),
    queryFn: () =>
      httpClient.get(
        `${url.api.company.transfer(companyGuid as string)}/${urlTransferGuid}`,
      ),
    config: {
      enabled: Boolean(urlTransferGuid),
      refetchOnWindowFocus: false,
      initialData: () => {
        const transfers: TransferProduct[] =
          queryCache.getQueryData(queryKeys.transfers(companyGuid)) || [];
        return transfers.find(tr => tr.guid === urlTransferGuid);
      },
      initialStale: true,
    },
  });
}
