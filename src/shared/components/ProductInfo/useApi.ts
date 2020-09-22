import { useLocation } from 'react-router-dom';
import { Location } from 'history';
import { InventoryPrdocut } from 'shared/types';
import { useFetchInventory } from 'shared/hooks/useFetchInventory';

export function useProduct(
  companyGuid: string,
  inventoryGuid: string,
  propProduct?: InventoryPrdocut,
) {
  const { state } = useLocation() as Location<{ product?: InventoryPrdocut }>;
  return useFetchInventory(
    companyGuid,
    inventoryGuid,
    propProduct || state?.product,
  );
}
