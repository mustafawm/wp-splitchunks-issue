import React, { useCallback, useMemo } from 'react';
import { url, queryKeys } from 'shared/consts';
import { TransferProduct } from 'shared/types';
import ItemsGrid from 'shared/components/ItemsGrid';
import usePageTitle from 'shared/hooks/usePageTitle';
import { useUserCompanyGuid } from 'shared/providers/auth';
import { Filters } from 'shared/components/FiltersPane/types';
import {
  filterTransfers,
  transfersFiltersCount,
} from 'shared/utils/filter/transfers';
import ItemCard from './ItemCard';
import { useCancelTransfer } from './useApi';

export default function PublishedPage() {
  usePageTitle('navigation.published.title');
  const companyGuid = useUserCompanyGuid();
  const [cancelIt, cancelResult] = useCancelTransfer(companyGuid);
  const fetchUrl = useMemo(
    () => `${url.api.company.transfer(companyGuid)}?for=sender`,
    [companyGuid],
  );

  const handleCancel = useCallback(cancelIt, []);

  return (
    <ItemsGrid<TransferProduct>
      fetchUrl={fetchUrl}
      filterItems={filterTransfers}
      countFilters={transfersFiltersCount}
      queryKey={queryKeys.transfers(companyGuid)}
      delResult={cancelResult}
      filterNames={[
        Filters.status,
        Filters.facility,
        Filters.product,
        Filters.category,
        Filters.quality,
      ]}
    >
      {(transfers = []) =>
        transfers.map(transfer => (
          <ItemCard
            key={transfer.guid}
            transfer={transfer}
            onCancel={handleCancel}
          />
        ))
      }
    </ItemsGrid>
  );
}
