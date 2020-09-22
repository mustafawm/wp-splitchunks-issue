/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import { useQuery, queryCache } from 'react-query';
import { ErrResp, InventoryPrdocut } from 'shared/types';
import { url, queryKeys } from 'shared/consts';
import httpClient from 'shared/services/api';
import { useUserCompanyGuid } from 'shared/providers/auth';

/**
 * Fetch product details using:
 * - companyGuid from user profile
 * - inventoryGuid from URL param
 */
export function useFetchInventory(
  companyIdParam?: string,
  inventoryIdParam?: string,
  inventory?: InventoryPrdocut,
) {
  const { productGuid } = useParams();
  const userCompanyGuid = useUserCompanyGuid();

  const companyGuid = companyIdParam || userCompanyGuid;
  const inventoryGuid = inventoryIdParam || productGuid;

  return useQuery<any, ErrResp>({
    queryKey: queryKeys.productDetails(inventoryGuid),
    queryFn: () =>
      httpClient.get(
        `${url.api.company.inventory(companyGuid)}/${inventoryGuid}`,
      ),
    config: {
      enabled: Boolean(companyGuid && inventoryGuid),
      refetchOnWindowFocus: false,
      initialData: () => {
        if (inventory) {
          return inventory;
        }
        const inventories: InventoryPrdocut[] =
          queryCache.getQueryData(queryKeys.inventories(companyGuid)) || [];
        return inventories?.find(
          inv => inv.companyInventoryGuid === inventoryGuid,
        );
      },
      initialStale: true,
    },
  });
}
