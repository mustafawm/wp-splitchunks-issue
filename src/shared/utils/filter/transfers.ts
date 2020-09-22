import { TransferProduct } from 'shared/types';
import { Filters } from 'shared/components/FiltersPane/types';

export function filterTransfers(
  transfers: TransferProduct[],
  filters: string[],
): TransferProduct[] {
  if (!filters.length) {
    return transfers;
  }
  return transfers.filter(
    t =>
      filters.includes(t?.status) ||
      filters.includes(t?.companyProduct?.qualityCode) ||
      filters.includes(t?.receiverCompanyBusinessType) ||
      filters.includes(t?.companyProduct?.commonProductGuid) ||
      t?.companyProduct?.categories.some(cat => filters.includes(cat.guid)),
  );
}

export function transfersFiltersCount(
  transfers: TransferProduct[] = [],
): Record<Filters, Record<string, number>> {
  const initResult: Record<Filters, Record<string, number>> = {
    [Filters.status]: {},
    [Filters.product]: {},
    [Filters.facility]: {},
    [Filters.category]: {},
    [Filters.quality]: {},
  };

  return transfers.reduce((acc, cur: TransferProduct) => {
    const tStatus = cur?.status;
    const tProduct = cur?.companyProduct?.commonProductGuid;
    const tFacility = cur?.receiverCompanyBusinessType;
    const tCategories = cur?.companyProduct?.categories.map(cat => cat.guid);
    const tQuality = cur?.companyProduct?.qualityCode;

    acc.status[tStatus] = tStatus in acc.status ? acc.status[tStatus] + 1 : 1;
    acc.product[tProduct] =
      tProduct in acc.product ? acc.product[tProduct] + 1 : 1;
    acc.facility[tFacility] =
      tFacility in acc.facility ? acc.facility[tFacility] + 1 : 1;
    acc.quality[tQuality] =
      tQuality in acc.quality ? acc.quality[tQuality] + 1 : 1;
    tCategories.forEach((tCat: string) => {
      acc.category[tCat] = tCat in acc.category ? acc.category[tCat] + 1 : 1;
    });

    return acc;
  }, initResult);
}
