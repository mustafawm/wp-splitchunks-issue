/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { url } from 'shared/consts';
import httpClient from 'shared/services/api';
import { InventoryPrdocut, ErrResp } from 'shared/types';
import { TransferAcceptProps } from 'shared/schemas/TransferAccept';
import { useUserCompanyGuid } from 'shared/providers/auth';

export function useAcceptTransfer() {
  const { transferGuid } = useParams();
  const companyGuid = useUserCompanyGuid();

  function acceptIt(
    values: TransferAcceptProps,
  ): Promise<Partial<InventoryPrdocut>> {
    return httpClient.post(url.api.company.accept(companyGuid), {
      ...values,
      returnQuantity: 0,
      inventoryTransferRequestGuid: transferGuid,
    });
  }

  return useMutation<any, ErrResp, TransferAcceptProps>(acceptIt);
}
