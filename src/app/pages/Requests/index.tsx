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
import { useRejectTransfer } from './useApi';

export default function RequestsPage() {
  usePageTitle('navigation.requests.title');
  const companyGuid = useUserCompanyGuid();
  const [rejectIt, declineResult] = useRejectTransfer(companyGuid);

  const fetchUrl = useMemo(
    () => `${url.api.company.transfer(companyGuid)}?for=receiver`,
    [companyGuid],
  );

  const handleDecline = useCallback((guid: string) => {
    rejectIt(guid);
  }, []);

  return (
    <ItemsGrid<TransferProduct>
      fetchUrl={fetchUrl}
      filterItems={filterTransfers}
      countFilters={transfersFiltersCount}
      queryKey={queryKeys.requests(companyGuid)}
      delResult={declineResult}
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
            onDiscard={() => handleDecline(transfer.guid)}
          />
        ))
      }
    </ItemsGrid>
  );
}
